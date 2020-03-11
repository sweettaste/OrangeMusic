// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let mobile = app.globalData.mobile;
    console.log(app.globalData.mobile)
    this.setData({
      mobile
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
  // getdetail(){
  //   if(){}
  // }

  
})