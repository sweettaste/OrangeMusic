// pages/register/register.js
const {getCode} = require('../../utils/audio.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageUrl:'',
      code:'',
      phone:''
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
    this.getImageCode()
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getPersonInfo(event){
    console.log(event)
    let { tel, imgcode} = event.detail.value;
    this.data.phone = tel;
    if (tel && imgcode){
      //提交
      getCode(tel, imgcode);
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
    console.log(this.data.phone)
    // url: '../play/play?id=' + id
    wx.navigateTo({
      url: `../verify/verify?phone=${this.data.phone}`
    })
  },
  //请求图片验证码
  getImageCode(){   
    const $this = this;
    wx.request({
      url: `http://orange.wxlspace.com/captcha?random= ${Math.random()}`,
      responseType: 'arraybuffer',
      success: (res) => {
        //处理session不一致
        wx.removeStorageSync('SESSION_ID');
        let base64 = wx.arrayBufferToBase64(res.data);
        base64 = 'data:image/jpg;base64,' + base64;
        $this.setData({
          code: base64
        })
        wx.setStorageSync('SESSION_ID', res.header["Set-Cookie"]);
      }
    })
  }
})