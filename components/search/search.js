// components/search/search.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //当input获取焦点
      handleSearch(event){
          console.log(event);
          //跳转到搜索页
          wx.navigateTo({
            url: '../../pages/searchs/searchs',
          })

      }
  }
})
