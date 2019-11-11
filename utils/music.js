import request from './network.js'

export function getMusicBanner() {
  return request({
    url: 'http://123.207.32.32:9000/banner?type=2'
  })
}

export function getRecommendSongs() {
  return request({
    url: 'http://123.207.32.32:9000/personalized?limit=6'
  })
}

export function getRecommendRadio() {
  return request({
    url: 'http://123.207.32.32:9000/personalized/djprogram'
  })
}
export function baseUrl(){
  return request({
    url:'https://netease.lzcdev.xyz/'
  })
}