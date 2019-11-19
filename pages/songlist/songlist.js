// pages/songlist/songlist.js
const { getRecommendList, getTopList } = require('../../utils/audio.js');
const app = getApp();
const backgroundAudioManager = app.globalData.backgroundAudioManager;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //歌单详情信息
    songsInfo:[],
    music: {},
    playing: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      //获取id,获取type 0 代表推荐歌单 1代表排行榜 2代表心动歌单
    const { id, type} = options;
      if(type == 0 ){
        this.recommendsData(id);
      }else if(type == 1){
        this.topData(id)
      }else if(type == 2){
        this.likeData();
      }
    //初始化数据
    this.setData({
      music: app.globalData.currPlaying,
      playing:app.globalData.playing
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.setData({
        music:app.globalData.currPlaying
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  recommendsData(id){
    //请求推荐歌曲
    getRecommendList(id, (res) => {
      console.log(res)
        this.setData({
          songsInfo: res.data.playlist,
        })
    })
  },
  //排行榜列表
  topData(id){
    getTopList(id,(res) => {
      console.log(res)
        this.setData({
          songsInfo: res.data.playlist,
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
    console.log(app.globalData.music_list)
    //let length = app.globalData.music_list.length;
    //播放
    // let playIndex = Math.floor(Math.random() * length);
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
  },
  //喜欢的音乐
  likeData(){
    console.log(app.globalData.likeMusic)
    //获取用户的头像、昵称
    //手动添加数据
    let info = {
      coverImgUrl:'../../assets/mime/likes.png',
      name : '我喜欢的音乐',
      tracks: app.globalData.likeMusic

    }
    // this.data.songsInfo.coverImgUrl = "../../assets/mime/likes.png";
    // this.data.songsInfo.name = "我喜欢的音乐";
    // this.data.songsInfo.tracks = app.globalData.likeMusic; 
   // let songsInfo = ;
    //刷新页面
    console.log(this.data.songsInfo)
    this.setData({
      songsInfo: info
    })
  }
})