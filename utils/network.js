// 封装request
export default function request(options){
  return new Promise((resolve , reject) => {
    wx.request({
      url: options.url,
      method:options.method || 'get',
      data:options.data ||{},
      success: res => {
        resolve(res.data)
        // 处理Session不一致问题
        wx.removeStorageSync('SESSION_ID')
        wx.setStorageSync('SESSION_ID', res.header["Set-Cookie"])
      },
      reject: reject
    })
  })
}