// const music = require('music.js');
// const request = require('network.js');

const baseUrl = 'https://netease.lzcdev.xyz/' ;
 
//获取歌曲列表
 export function getMusic(searchValue,success){
  wx.request({
    url: `${baseUrl}search`,
    data: { "keywords": searchValue },
    header: { 'Content-Type': 'application/json' },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: (res) => {
      if (res.data.code === 200) {
        success(res)
      }
    },
    fail: function (res) {
      console.log(res)
    },
    complete: function (res) {
      console.log(res)
    },
  })
 }

//获取歌曲url
 export function getMusicUrl (id,success,fail,complete)   {
   wx.request({
     url: `${baseUrl}song/url`,
    data: {
      id,
      br: 128000
    },
    success: (res) => {
      if (res.data.code === 200) {
      const data = res.data.data[0];
      if (!data.url) { // 没有歌曲url， 自动播放下一首
        fail && fail();
      } else {
        success && success(data.url);
      }
    }
    }
  })
}