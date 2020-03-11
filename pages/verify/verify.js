// pages/verify/verify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.data.phone = options.phone

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
  verify(event){
    console.log(event)
    let {shortcode,pwd} = event.detail.value;
    let mobile = this.data.phone;
    if(shortcode && pwd){
      //发请求验证
      // wx.navigateTo({
      //   url: '../personal/personal',
      // })
      wx.request({
        url: 'https://orange.wxlspace.com/api/register',
        data:{
          mobile,
          password:pwd,
          verifyCode: shortcode
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': wx.getStorageSync('SESSION_ID')
        },
        method: "POST",
        success: (res) => {
          console.log(res.data)
          if(res.data.status === 200){
            wx.navigateTo({
              url: '../login/login',
            })
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            })
            

          }
        }

      })
    }else{
      wx.showToast({
        title: '输入项不能为空',
        icon:'none'
      })
    }
  }
})