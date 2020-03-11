// pages/login/login.js
const app = getApp();
const util = require('../../utils/util.js');
const { getToken } = require('../../utils/audio.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置当前界面标题
    wx.setNavigationBarTitle({
      title: `登录`,
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
  //发送验证码
  getTel(event){
    console.log(event)
    let{tel,pwd} = event.detail.value;
    if(util.phone(tel)){
      if(!pwd){
        wx.showToast({
          title: '密码不能为空',
          icon:'none'
        });
      }else{
          //发送请求
        getToken(tel, pwd, (mobile)=>{
          // app.globalData.mobile = mobile;
          app.globalData.mobile = mobile;
          wx.navigateTo({
            url: '../mine/mine'
          })
          // wx.navigateTo({
          //   url: '../register/register?id=' + id,
          //})
        });

      }
    }else{
      wx.showToast({
        title: '账号不符合要求',
        icon:'none'
      })
    }
  },
  //注册都需要发送短信
  register(event){
    let {id} = event.currentTarget.dataset;
      wx.navigateTo({
        url: '../register/register?id='+id,
      })
  },
  // rePassword(event){
  //   console.log(event)
  //   wx.navigateTo({
  //     url: '../loginshort/loginshort',
  //   })
  // }


})