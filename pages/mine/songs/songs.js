import {
  getMusicBanner,
  getRecommendSongs
} from '../../../utils/music.js';
Component({
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
     recommendSongs: [] 
  },
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
    selectClick(event){
      const id = event.currentTarget.dataset.id;
      //去每日推荐
      if( id === 0){
        wx.navigateTo({
          url: '../../../../everyrec/everyrec',
        })
      }else if( id === 1 ){
        //跳转到排行榜
        wx.navigateTo({
          url: '../../../../top/top'
        })
      }else{
        //去歌单

      }
      
    }
  
    
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
