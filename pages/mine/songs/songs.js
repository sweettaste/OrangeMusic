// pages/mine/songs/songs.js
//引入封装的发送请求部分
import {
  getMusicBanner,
  getRecommendSongs
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
    //轮播图
     banners:[],
     //推荐标题
     recommTitle:[
       { "title": "每日推荐","icon":"recommend.png"},
       {"title":"排行榜","icon":"musics_rank.png"},
       { "title": "歌单", "icon":"song.png"}
     ],
     //推荐歌单
     title:'推荐歌单',
    recommendSongs: [], 


  },

  /**
   * 组件的方法列表
   */
  methods: {
    //请求数据的方法
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
  pageLifetimes: {
    show: function () {
      console.log('show')
    }
  },
  lifetimes: {
    created: function () {
      // 1.请求网络数据
      this._getBannersData()
      this._getRecommendSongs()
    }

  }
})
