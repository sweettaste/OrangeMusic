// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      let {id} = options
      if( id == 1){
        this.data.pageUrl = '../verify/verify'
      }else{
        this.data.pageUrl = '../loginshort/loginshort'
      }
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
  getPersonInfo(event){
    console.log(event)
    let {tel,shortcode,imagecode} = event.detail.value;
    if(tel && shortcode && imagecode){
      //提交
      
    }else{
      wx.showToast({
        title: '输入项不能为空',
        icon:'none'
      })
    }
  },
  getVerifyCode(event){
    console.log(event)
  },
  toVerify(){
    wx.navigateTo({
      url: this.data.pageUrl,
    })
  }
})