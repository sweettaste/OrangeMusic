// pages/songlist/songlist.js
const { getRecommendList, getTopList } = require('../../utils/audio.js');
const app = getApp();
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
      //获取id,获取type 0 代表推荐歌单 1代表排行榜
    const { id, type} = options;
      if(type == 0 ){
        this.recommendsData(id);
      }else if(type == 1){
        this.topData(id)
      }
    //初始化数据
    this.setData({
      music: app.globalData.currPlaying
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
    console.log(event);
  },
  //播放全部
  playAll(event){
    //更改当前列表的歌曲
    app.globalData.music_list = this.data.songsInfo.tracks;
    console.log(app.globalData.music_list)
    //播放
    let playIndex = Math.floor(Math.random() * music_list.length);
    //app.playMusic(app.globalData.music_list[playIndex].id,this);
    //刷新页面
    this.setData({
      music:app.globalData.currPlaying
    })
  }
})