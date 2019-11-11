// pages/searchs/input/input.js
const {getMusic} = require('../../../utils/audio.js')
const app = getApp();
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
    //搜索的值
    searchValue:'',
    // 搜索建议
    suggest:[],
    //是否显示搜索结果
    isShow:false,
    showSuggest:false,
    singleloading: true,
    //歌曲列表
    singleList: [],
    // 歌单列表
    playList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击搜索按钮
    getSearchName(event){
      //判断输入框的内容是否为空
      if(this.data.searchValue != ''){
           this.searchSongs();
      }else{
        wx.showToast({
          title: '您还未输入内容',
          icon:'none',
        })
      }

    },
    searchSongs(){
      //请求歌曲数据
      getMusic(this.data.searchValue, (res) => {
        //请求成功获取歌曲列表
        const songs = res.data.result.songs;
        this.setData({
          isShow: true,
          singleList: songs
        })
      }
      )
    },
    //实时监听搜索框
    inputname(event){
        //获得输入框内容
        const value = event.detail.value;
        //修改搜索的值
        this.setData({
          searchValue:value
        })

    },
    //选择播放的歌曲
    playMusic(event){
      //获取请求播放的id与下标
      const {id,index} = event.currentTarget.dataset;
      //给全局歌单列表获取当前歌曲列表
      //设置全局属性
      app.globalData.music_list = this.data.singleList;
      app.globalData.index_music = index;
      //跳转到播放界面
      wx.navigateTo({
        url: '../../../../play/play?id='+id
      }) 
    }
  }
})
