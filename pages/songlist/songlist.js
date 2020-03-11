const { getSongsList } = require('../../utils/audio.js');
const app = getApp();
const backgroundAudioManager = app.globalData.backgroundAudioManager;
Page({
  data: {
    //歌单详情信息
    songsInfo:[],
    music: {},
    playing: false,
  },
  onLoad: function (options) {
    const { id } = options;
    this.songsList(id);
    //初始化数据
    this.setData({
      music: app.globalData.currPlaying,
      playing:app.globalData.playing
      
    })
  },
   //根据id请求歌单详情
  songsList(id){
    getSongsList(id, (res) => {
      console.log(res)
        this.setData({
          songsInfo: res.playlist,
        })
    })
  },
  //播放歌曲
  playMusic(event){
    let id = event.currentTarget.dataset.id;
    //更改当前列表的歌曲
    app.globalData.music_list = this.data.songsInfo.tracks;
    app.palyMusic(id,this);
    //刷新当前页面
    this.setData({
      music: app.globalData.currPlaying,
      playing: app.globalData.playing
    })
  },
  //播放全部
  playAll(event){
    //更改当前列表的歌曲
    app.globalData.music_list = this.data.songsInfo.tracks;
    app.palyMusic(app.globalData.music_list[0].id,this);
    //刷新页面
    this.setData({
      music:app.globalData.currPlaying,
      playing: app.globalData.currPlaying
    })
  },
  //去播放界面
  toPlay(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../play/play?id='+id,
    })
  },
  //切换模板的播放
  changePlay(event) {
    let { playing } = this.data;
    //如果当前palying为false就改为TRUE
    if (playing) {
      //为true将暂停播放
      backgroundAudioManager.pause();
      playing = false;
      console.log('暂停播放');
      //更新界面
      app.globalData.playing = playing;
      this.setData({
        playing
      });
    } else {
      //反之
      backgroundAudioManager.play();
      playing = true;
      console.log('开始播放');
      //更新界面
      app.globalData.playing = playing;
      this.setData({
        playing
      });
    }
  }
})