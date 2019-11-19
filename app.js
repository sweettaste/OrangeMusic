//app.js
var WxNotificationCenter = require("./utils/WxNotificationCenter.js");
const { getMusicUrl, getDetail, getLyric} = require('./utils/audio.js');
const util = require('./utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //音频播放
  playAudio(th) {
    console.log(this.globalData);
    console.log(this.globalData.currPlaying);
      const {currPlaying,backgroundAudioManager} = this.globalData;
      //该界面名字
      backgroundAudioManager.title = currPlaying.name;
      //背景图片
      backgroundAudioManager.coverImgUrl = currPlaying.al.picUrl;
      backgroundAudioManager.singer = currPlaying.ar[0].name;
      //默认为空字符串，当设置了新的 src 时，会自动开始播放
    console.log(currPlaying.url)
      backgroundAudioManager.src = currPlaying.url;
      //监听背景音频进入可播放状态事件。 但不保证后面可以流畅播放
      backgroundAudioManager.onCanplay(() => {
        //播放音乐
        backgroundAudioManager.play();
    })
    //音频播放
    backgroundAudioManager.onPlay(() => {
      this.globalData.playing = true;
      th.setData({
        playing: true
      });
      //通知广播模式
      WxNotificationCenter.postNotificationName('music', {
        playing: true,
        music_list: this.globalData.music_list,
        currPlaying: this.globalData.currPlaying
      });
    });
    //音频暂停播放
    backgroundAudioManager.onPause(() => {
      this.globalData.playing = false;
      //更新play页面的界面
      th.setData({
        playing: false
      });
      //通知广播模式
      WxNotificationCenter.postNotificationName('music', {
        playing: true,
        music_list: this.globalData.music_list,
        currPlaying: this.globalData.currPlaying
      });
      //在后台继续播放
      wx.getBackgroundAudioPlayerState({
        complete: (res) => {
          const position = res.currPostion;
           this.globalData.currPostion = position ? position:0; 
        }
      })
    });
    //监听停止播放事件
    backgroundAudioManager.onStop( () => {
      this.globalData.playing = false;
      //更新play的playing
      th.setData({
        playing:false
      });
    });
    //音频播放自然结束事件
    backgroundAudioManager.onEnded(() => {
      const glob = this.globalData;
      //更改状态
      this.globalData.playing = false;
      //刷新播放界面
      th.setData({
        playing:false
      });
      //单曲循环
      if (glob.playMode === 2){
        //重新播放
        this.playAudio(th);
      }else{
        this.playNext(1,th);
      }
    })
  },
  //切换
  playNext(id,th){
    const glob = this.globalData;
    //当前music_list为空
    const { music_list, currPlaying , palyMode} = glob;
    let playIndex = 0;
   if(palyMode == 3){
     //随机播放下一首
     playIndex = Math.floor(Math.random() * music_list.length);
   }else{
     //从当前列表里找
     for(let [key,value] of music_list.entries()){
       //如果歌曲列表的id跟当前正在播放的id一样
       if(value.id === currPlaying.id){
          playIndex = key;
       }
     }
     //加或减
     playIndex += id;
     //判断是否到了最后一首
     if (playIndex >= music_list.length-1){
       playIndex = 0; 
     }else if(playIndex < 0){
        playIndex = music_list.length -1 ;
     }
   }
    //更改当前将要播放歌曲
    glob.currPlaying = music_list[playIndex];
    //更改当前播放歌曲在列表中的index
    glob.index_music = playIndex;
    //请求资源
    this.palyMusic(glob.currPlaying.id,th);
  },
  //播放音乐
  palyMusic(id,$this) {
    //获取歌曲详细
    getDetail(id,(res) => {
      if (res.statusCode == 200) {
        //获得当前播放歌曲
        const song = res.data.songs[0];
        //全局设置播放当前歌曲
        this.globalData.currPlaying = song;
        //将播放的歌曲加到最近播放里
        if( this.indexOf(this.globalData.nearestPlay,song.id) < 0){
            this.globalData.nearestPlay.push(song)
        }
        if (!this.globalData.music_list.length) {
          // 将歌曲添加到播放列表
          this.globalData.music_list.push(song);
        }
        //刷新播放页面
        $this.setData({
          //更新当前歌曲信息
          music: song,
          //获取歌曲总时长并转换格式
          duration: util.formatTime(this.globalData.currPlaying.dt),
          //设置进度条最大值为当前播放歌曲的时间
          sliderMax: Math.floor(this.globalData.currPlaying.dt)
        })
        //获取歌曲url
        getMusicUrl(this.globalData.currPlaying.id, (url) => {
          this.globalData.currPlaying.url = url;
          this.updateMusic($this);
          //调用app.playAudio播放音乐
          this.playAudio($this);
        }, () => this.playNext(1, $this));
        //设置当前界面标题
        wx.setNavigationBarTitle({
          title: `${this.globalData.currPlaying.name}-${this.globalData.currPlaying.ar[0].name}`,
        })
        //获取歌词 
        getLyric(id,(res) => {
         // const lyric = res.data.lrc.lyric;
          let lyric = util.parse_lrc(res.data.lrc && res.data.lrc.lyric ? res.data.lrc.lyric : '')
          res.data.lrc = lyric.now_lrc;
          res.data.scroll = lyric.scroll ? 1 : 0;
          $this.setData({
            lyricList: res.data,  
          })
        })
      }
    })
  },
  //更新music信息
  updateMusic($this){
    //判断一下music的ID是否跟当前播放歌曲的id相同
    if ($this.data.music.id === this.globalData.currPlaying.id ){
        return;
      }else{
      music: this.globalData.currPlaying 
      }
    $this.setData({
      music: this.globalData.currPlaying,
      duration: util.formatTime(this.globalData.currPlaying.dt),
      sliderMax: Math.floor(this.globalData.currPlaying.dt),
    });
  },
  //判断当前id是否在列表里
  indexOf( obj , value){
    for(let k in obj.length){
      if(obj[k].id == value){
        return k;
      }
    }
    return -1;
  },
  //初始化配置
  globalData: {
      music_list:[],//歌曲播放列表
      index_music:0,//当前播放歌曲在播放列表中的index
      currPlaying:{},//当前播放歌曲
      currTime:'00:00',//当前歌曲播放到什么时间
      playMode:1,//播放类型 1 列表循环 2 单曲循环 3 随机播放
      playing:false,//是否正在播放默认为false
      currPostion:0,//记录播放位置
      nearestPlay:[],//最近播放记录
      likeMusic:[],//喜欢的歌曲
      backgroundAudioManager: wx.getBackgroundAudioManager()//获取全局唯一的背景音频管理器
  }
})