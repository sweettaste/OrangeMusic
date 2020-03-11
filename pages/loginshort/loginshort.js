const { VerifyCode} = require('../../utils/audio.js');
Page({
  data: {
  },
  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow: function () {
  },
  getVerifyCode(event){
    console.log(event)
    let code = event.detail.value.shortcode;
    //发送请求
    VerifyCode(code);
  }
})