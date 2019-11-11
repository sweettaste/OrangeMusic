// pages/mine/mine.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currIndex: 0,
    clientHeight:0.0,
    titles:['我的','推荐']

  },
  // -------------- 数据请求方法 -------------------
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取屏幕宽度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          clientHeight: res.windowHeight
        });
      }
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
  }
})