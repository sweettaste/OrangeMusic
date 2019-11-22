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
    this.drawer = this.selectComponent('#drawer');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      //模板刷新
      this.setData({
        music:app.globalData.currPlaying,
        playing:app.globalData.playing,
        nearestPlay: app.globalData.nearestPlay
      })
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
  playList(event) {
    console.log(event)
    let id = event.currentTarget.dataset.id;
    if ((!app.globalData.currPlaying.url) || (app.globalData.currPlaying.id != id)) {
      app.palyMusic(id, this);
    } else {
      //收起列表
      this._cancelDrawer();
    }
  },
  //去播放界面
  toPlay(event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../play/play?id=' + id,
    })
  },
})