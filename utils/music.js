import request from './network.js'
// url: 'http://123.207.32.32:9000/banner?type=2'
// url: 'http://123.207.32.32:9000/personalized?limit=6'
// url: 'https://orange.wxlspace.com/sms'
import baseUrl from './baseUrl.js'
export function getCode(){
  return request ({
    url:'https://orange.wxlspace.com/sms'
  })
}
export function getMusicBanner() {
  return request({
    url: `${baseUrl}banner?type=1`
  })
}

export function getRecommendSongs() {
  return request({
    url: `${baseUrl}personalized?limit=6`
  })
}