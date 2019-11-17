// components/recommend/recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  
    currIndex:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击切换下标
    handleItemClick(event){
      console.log(event)
      //获取当前事件的index
      const index = event.currentTarget.dataset.index;
      //修改index
        this.setData({
          currIndex:index
        })
        //通知我的页面事件
      this.triggerEvent("titleClick",{index},{})
    },
    //点击跳转到登陆界面
    handleLogin(event){
      console.log(event);
    }
  }
})
