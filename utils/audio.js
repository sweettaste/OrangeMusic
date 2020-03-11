// const music = require('music.js');
import request from './network.js'
import baseUrl from './baseUrl.js'
const app = getApp();
// const baseUrl = 'https://netease.lzcdev.xyz/' ;
// const musicUrl = 'http://orange.wxlspace.com/'; 


//获取歌曲列表
 export function getMusic(searchValue,success){
  wx.request({
    url: `${baseUrl}search?keywords=` + searchValue,
    header: { 'Content-Type': 'application/json' },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: (res) => {
      console.log(res)
      if (res.data.code === 200) {
        success(res)
      }
    },
    fail: function (res) {
      console.log(res)
    }
  })
 }
//获取歌曲url
 export function getMusicUrl (id,success,fail,complete)   {
  request({
    url: `${baseUrl}song/url`,
    data: {
      id,
      br: 128000
    }
  }).then( res => {
        if (res.code === 200) {
          const data = res.data[0];
          if (!data.url) { // 没有歌曲url， 自动播放下一首
           fail();
          } else {
            success(data.url);
          }
        }
  })
}
//获取歌曲详细信息
export function getDetail(id, success){
  wx.request({
    url: `${baseUrl}song/detail`,
    // url: `${musicUrl}api/song/${id}`,
    data:{
      "ids":id
    },
    header:{
      'Content-Type': 'application/json'
    },
    success(res){
      //请求成功回调app的success
      console.log(res)
       if(res.data.code === 200){
         success(res);
       }
    }
  })
}
  //获取歌词
export function getLyric(id,success){
  wx.request({
    url: `${baseUrl}lyric`,
    data:{
      id
    },
    success(res){
      if (res.data.code === 200) {
        success(res);
      }
    }
  })
} 
//获取所有榜单
  export function getAllTopList(success){
    request({
      url: `${baseUrl}toplist/detail`
    }).then( res => {
      if(res.code === 200){
        success(res.list)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  //获取排行榜列表
  export function getTopList(id,success){
    request({
      url: `${baseUrl}top/list`,
      data: {
        "idx": id
      },
      header: {
        'Content-Type': 'application/json'
      }
    }).then( res => {
      console.log(res)
        if (res.code === 200) {
          success(res);
        }
    })
  }
  //根据id获取歌单
export function getSongsList(id, success){
  request({
    url: `${baseUrl}playlist/detail`,
    data: {
      id
    },
    header: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
      if (res.code === 200) {
          success(res);
      }
  })
}
//注册验证
export function getCode(tel,imgCode){
  console.log(tel,imgCode)
  wx.request({
    url: `${musicUrl}sms`,
    data:{
      'phone':tel,
      'verifyCode':imgCode
    },
    header:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync('SESSION_ID')
    },
    method: "POST",
    success(res){
      console.log(res)
    },
    fail(err){
      console.log(err)
    }
  })
}
//请求token
export function getToken(tel, pwd, success){
  wx.request({
    url: `${musicUrl}api/login`,
    data: {
      mobile: tel,
      password: pwd,
      type: 0
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync('SESSION_ID')
    },
    success: (res) => {
      if (res.data.result && res.data.status === 200) {
        wx.removeStorageSync('AccessToken');
        //异步存储返回的token
        wx.setStorageSync('AccessToken', res.data.result.token);
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })
        success(res.data.result.mobile);
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'error',
          duration: 2000
        })
      }
    },
    method: 'POST'
  })
}


