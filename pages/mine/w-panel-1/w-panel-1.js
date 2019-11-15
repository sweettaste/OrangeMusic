// pages/discover/childCpns/w-panel-1/w-panel-1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '默认数据'
    },
    datalist: {
      type: Array,
      value: []
    }
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
    songsList(event){
      console.log(event)
    }

  }
})
