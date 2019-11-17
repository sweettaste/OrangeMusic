// pages/play/list/list.js
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
      music_list:{
        type:Array,
        value:'暂无歌曲'
      },
      music:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //列表操作
    _cancelDrawer(){
      this.drawer.hideDrawer();
    },
    _confirmDrawer(){
      this.drawer.hideDrawer();
    },
    showDrawer(event){
      this.drawer.showDrawer();
    }
  }
})
