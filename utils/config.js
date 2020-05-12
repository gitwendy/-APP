// 我们先设置一个请求的基础接口地址
const baseUrl = 'https://api.it120.cc/mwz/'
module.exports = (url, method, data = {}) => {
  wx.showLoading({
    title: '正在拼命加载',
    mask: true,
    success: function (res) {},
    fail: function (res) {},
  })
  // let token=wx.getStorageSync('angeltoken')
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // token: 'd16359a9-45b8-4a5c-bed7-499b0d70e26a',
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: resolve,
      fail: reject,
      complete: wx.hideLoading
    })
  })
}