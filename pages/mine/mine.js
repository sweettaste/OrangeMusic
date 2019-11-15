// pages/mine/mine.js
const WxNotificationCenter = require("../../utils/WxNotificationCenter.js");
const app = getApp();
const backgroundAudioManager = app.globalData.backgroundAudioManager;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currIndex: 0,
    clientHeight:0.0,
    titles:['我的','推荐'],
    // 底部播放模板
    music: {},
    playing: false,

  },
  // -------------- 数据请求方法 -------------------
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { currPlaying, playing } = app.globalData;
    this.setData({
      music: currPlaying,
      playing
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
    console.log("----")
    // 处理播放栏
    // WxNotificationCenter.addNotification("music", (res) => {
    //   console.log(res)
    //   this.setData({
    //     music: res.currPlaying,
    //     playing: res.playing,
    //     isShow: res.music_list.length
    //   });
    // }, this);
    const { currPlaying, playing } = app.globalData;
    this.setData({
      music: currPlaying,
      playing
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
  //当用户点击标题的时候切换
  handleTitleClick(event){
    const index = event.detail.index
    this.setData({
      currIndex:index
    });
  }
  ,
  //当swiper的current改变就触发change绑定的事件
  handleCurrentChange(event) {
    const index = event.detail.current;
    const recomm = this.selectComponent('#recommend');
    recomm.setData({
       currIndex: index
     })
  },
  //  palyIconChange(event){
  //     let {playing} = this.data;
  //     //如果当前palying为false就改为TRUE
  //     if(playing){
  //       //为true将暂停播放
  //         backgroundAudioManager.pause();
  //         playing = false;
  //         console.log('暂停播放');
  //     } else {
  //       //反之
  //         backgroundAudioManager.play();
  //         playing = true;
  //       console.log('开始播放');
  //     }
  //     //更新界面
  //     app.globalData.playing = playing;
  //     this.setData({
  //       playing
  //     });
  // },
  //切换模板的播放
  changePlay(event){
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
  //去播放页面
  toPlay(event){
    const id = event.currentTarget.dataset.id;
    console.log(event)
    wx.navigateTo({
      url: '../play/play?id=' + id
    }) 
  }

})