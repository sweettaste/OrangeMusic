// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userPic:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   choosePic(){
     wx.showActionSheet({
       itemList: ['从相册选取'],
       itemColor:'#000',
       success: (res) => {
           wx.chooseImage({
               count:1,
               sourceType:['album'],
               success : (res) => {
                 console.log(res)
                 let path = res.tempFilePaths;
                 this.setData({
                   userPic:path
                 })
               }
           })
         }
     })
   },
  getPersonalInfo(event){
    console.log(event)
    let {username,pwd,repwd} = event.detail.value;
    if(username && pwd && repwd ){
      wx.uploadFile({
        //服务器接口
        url: '',
        filePath: this.data.userPic,
        name: 'info',
        formData: {
          "userName": username,
          "pwd": pwd,
          "rePwd": repwd
        },
        header: {
          'content-type': 'multipart/form-data'
        },
        //接口调用成功
        success: (res) => {
          console.log(res)
          //将res转成json格式
          //刷新界面、获取图片得网络路劲
        }
      })
    }else{
      wx.showToast({
        title: '输入内容不能为空',
        icon:'none',
        duration: 2000
      })
    }
  }
})