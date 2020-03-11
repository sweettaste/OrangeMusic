import { getAllTopList } from '../../utils/audio.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goveList:[],
    recommendList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getAllTopList(res => {
      // this.data.goveList = res.slice(0,4);
      console.log(res)

      // this.data.recommendList = res.slice(4)
      this.setData({
        goveList: res.slice(0, 4),
        recommendList: res.slice(4,10)
      })
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
  //点击官方榜
  clickGove(event){
    //根据id请求歌曲
    console.log(event)
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../songlist/songlist?id='+id+'&type=1',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})