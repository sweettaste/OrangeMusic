// pages/play/paly.js
const { getMusicUrl, getLyric} = require('../../utils/audio.js');
const util = require('../../utils/util.js');
const app = getApp();
const backgroundAudioManager = app.globalData.backgroundAudioManager;
Page({
  data: {
    //歌曲信息
    music:{},
    //当前播放进度
    currTime:'00:00',
    //总时长
    duration:'00:00',
    //是否显示歌词
    showLyric:false,
    //歌曲是否在播放
    playing:false,
    //歌曲列表
    musicList:[],
    //歌词列表
    lyricList: [], 
    //歌词index
    currLrcIndex:[],
    //当前播放歌曲index
    currIndex:0,
    //进度条滑块最大值
    sliderMax:0,
    //当前滑块值
    sliderValue:0,
    //播放类型
    playMode:1,
    //播放模式
    playModeIcon:[{
      id: 1,
      name: '列表循环',
      icon: '../../assets/play/list_cir.png'
    },
      {
        id: 2,
        name: '单曲循环',
        icon: '../../assets/play/single_cir.png'
      },
      {
        id: 3,
        name: '随机播放',
        icon: '../../assets/play/random.png'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取id
    const id = options.id;
    //初始化
    this.setData({
      playing: app.globalData.playing,
      musicList: app.globalData.music_list,
      playMode: app.globalData.playMode,
    });
    //如果当前歌曲没有url或者换一首歌
   if((!app.globalData.currPlaying.url) || (app.globalData.currPlaying.id != id)){
     app.palyMusic(id,this);
   }else{
     //继续当前状态
     this.setData({
       music:app.globalData.currPlaying,
       duration:util.formatTime(app.globalData.currPlaying.dt),
       sliderMax:Math.floor(app.globalData.currPlaying.dt)
     });
     // 设置当前界面标题
     wx.setNavigationBarTitle({
       title: `${app.globalData.currPlaying.name}-${app.globalData.currPlaying.ar[0].name}`,
     });
     //获取歌词 
     getLyric(app.globalData.currPlaying.id, (res) => {
       // const lyric = res.data.lrc.lyric;
       let lyric = util.parse_lrc(res.data.lrc && res.data.lrc.lyric ? res.data.lrc.lyric : '')
       console.log(lyric);
       res.data.lrc = lyric.now_lrc;
       res.data.scroll = lyric.scroll ? 1 : 0;
       this.setData({
         lyricList: res.data,
       })
     })
   }
  },
  onReady: function () {
    this.drawer = this.selectComponent('#drawer');
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //监听背景音频播放进度更新事件，只有小程序在前台时会回调
    backgroundAudioManager.onTimeUpdate(() => {
      let currLrcIndex = 0;
      //获取当前音频的播放位置
      if (this.data.showLyric){
        for(let k in this.data.lyricList.lrc){
          const value = this.data.lyricList.lrc[k];
          if (value.lrc_sec <= backgroundAudioManager.currentTime){
            currLrcIndex = k;
          }
        }
      }
      //更新进度条，更新当前播放进度
      // console.log(this.data.currLrcIndex)
      // console.log(currLrcIndex)
      this.setData({
        currLrcIndex: currLrcIndex,
        sliderValue: Math.floor(backgroundAudioManager.currentTime*1000),
        currTime: util.formatTime(Math.floor(backgroundAudioManager.currentTime * 1000))
      })
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage:  () => {

  },
  //暂停或播放事件
  //播放状态改变
  palyIconChange(event){
      let {playing} = this.data;
      //如果当前palying为false就改为TRUE
      if(playing){
        //为true将暂停播放
          backgroundAudioManager.pause();
          playing = false;
          console.log('暂停播放');
      } else {
        //反之
          backgroundAudioManager.play();
          playing = true;
        console.log('开始播放');
      }
      //更新界面
      app.globalData.playing = playing;
      this.setData({
        playing
      });
  },
  //进度条
  sliderValue(){

  },
  //播放上一首
  playPrev(event){
     app.playNext(-1,this);
  },
  //播放下一首
  playNext(event){
    app.playNext(1, this);
  },
  //切换播放模式
  changeIcon(event){
      let {playMode,playModeIcon} = this.data;
    console.log(this.data)
      playMode ++;
      playMode = playMode > (playModeIcon.length) ? 1:playMode;
      //全局设置播放模式
      app.globalData.playMode = playMode;
      //刷新当前页面
      this.setData({
        playMode
      });
      //弹出提示框
      wx.showToast({
        title: playModeIcon[ playMode -1 ].name,
        duration:1000,
        icon:"none"
      })
  },
  //切换显示
  toggleLyric(event){
    let showLyric = this.data.showLyric;
    console.log(this.data.lyricList)
    this.setData({
      showLyric:!showLyric
    })
  },
  //歌曲列表
  //列表操作
  _cancelDrawer() {
    console.log("列表收起")
    this.drawer.hideDrawer();
  },
  _confirmDrawer() {
    console.log("列表收起")
    this.drawer.hideDrawer();
  },
  showDrawer(event) {
    console.log("列表展开")
    this.drawer.showDrawer();
  },
  //列表跳转指定某一首歌曲
  playList(event){
    console.log(event)
    let id = event.currentTarget.dataset.id;
    if ((!app.globalData.currPlaying.url) || (app.globalData.currPlaying.id != id)) {
      app.palyMusic(id, this);
    } else {
        //收起列表
      _cancelDrawer();
  }
  }
})