// pages/mine/local/local.js
import {
  getMusicBanner,
  getRecommendSongs,
} from '../../../utils/music.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    titles: [
      { title: '喜欢的音乐', icon: '../../../assets/mime/mimelike.png' },
      { title: '最近播放', icon: '../../../assets/mime/nearest.png' },
      { title: '下载管理', icon: '../../../assets/mime/down.png' }
    ],
    recommendSongs: [],
    //本地音乐
    localMusic:[],
    //最近播放
    nearestPlay:[],
    //下载管理
    downLoadMusic:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

    _getBannersData() {
      getMusicBanner().then(res => {
        this.setData({
          banners: res.banners
        })
      })
    },
    _getRecommendSongs() {
      getRecommendSongs().then(res => {
        this.setData({
          recommendSongs: res.result
        })
      })
    },
  }, 
  lifetimes: {
    created: function () {
      // 1.请求网络数据
      this._getBannersData()
      this._getRecommendSongs()
    }
  },
})
