// pages/details/details.js
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsObj: {}, //页面展示对象
    detailsLoadimg: false, //详情页加载动画布尔值
    Icon: true, //icon收藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    wx.request({
      url: `https://api.it120.cc/mwz/shop/goods/detail?id=${options.id}`,
      success: (res) => {
        //  console.log(res.data.data)
        WxParse.wxParse('article', 'html', res.data.data.content, this, 5);
        this.setData({
          detailsLoadimg: true,
          detailsObj: res.data.data
        })
        console.log(this.data.detailsObj)
      },
    })
    // console.log(111)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  addShoppingCart(e) {
    console.log(e.currentTarget.dataset.id.pics[0].goodsId);
    // let arr = e.currentTarget.dataset.id.pics;
    let id = e.currentTarget.dataset.id.pics[0].goodsId;
    // let token = '92578073-ca9a-408e-831a-d3a7f33d38cc'

    console.log(id);
    wx.request({
      url: `https://api.it120.cc/mwz/shopping-cart/add?goodsId=${id}`,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('angeltoken'),
        number: 1,

      },
      success: (res) => {
        console.log(res);
        if (res.data.code == 30002) {
          wx.showToast({
            title: res.data.msg,
          })
        } else {
          wx.showToast({
            title: '加入成功',
          })
        }
      }
    })

  },
  //添加收藏
  toCollect(e) {
    let id = e.currentTarget.dataset.item.pics[0].goodsId;
    // let token = '92578073-ca9a-408e-831a-d3a7f33d38cc'
    wx.request({
      url: `https://api.it120.cc/mwz/shop/goods/fav/add?goodsId=${id}`,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('angeltoken'),
        id,

      },
      success: (res) => {
        console.log(res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '您点击了收藏'
          })

          // } else {
          //   wx.showToast({
          //     title: '你取消了收藏'
          //   })
        }
      }
    })
  }
})