// 封装request
export default function request(options){
  return new Promise((resolve , reject) => {
    wx.request({
      url: options.url,
      method:options.method || 'get',
      data:options.data ||{},
      success: res => {
        resolve(res.data)
      },
      reject: reject
    })
  })
}