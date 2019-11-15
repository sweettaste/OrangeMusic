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