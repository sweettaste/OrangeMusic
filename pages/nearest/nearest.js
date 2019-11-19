// pages/nearest/nearest.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music:{},
    nearestPlay:[],
    playing:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //初始化数据globalData
      this.setData({
        music:app.globalData.currPlaying,
        nearestPlay:app.globalData.nearestPlay,
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  playMusic(event){
    let id = event.currentTarget.dataset.id;
    app.palyMusic(id, this);
    //刷新当前页面
    this.setData({
      music: app.globalData.currPlaying,
      playing: app.globalData.playing
    })
  }
})