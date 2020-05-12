// pages/collect/collect.js
const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    favList: [] //收藏列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


    let token = wx.getStorageSync('angeltoken');


    wx.request({
      url: "https://api.it120.cc/mwz/shop/goods/fav/list",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        // key: this.data.shopList[index].key,
        page: 1,
        pageSize: 50,
        token: token
      },
      success: (result) => {
        // console.log(result.data.data);
        // this.data.shopList=[];

        this.setData({
          favList: result.data.data
        })
        console.log('fav', this.data.favList)
      }


    });
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
  favdel(e) {
    let index = e.currentTarget.dataset.index;
    let goodsId = e.currentTarget.dataset.item.goodsId;
    let id = e.currentTarget.dataset.item.id;
    let token = wx.getStorageSync('angeltoken');


    wx.request({

      url: "https://api.it120.cc/mwz/shop/goods/fav/delete",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        goodsId: goodsId,
        id: id,
        token: token
      },
      success: (result) => {

        this.data.favList.splice(index, 1)

        this.setData({
          favList: this.data.favList
        })
        console.log('删除收藏后的', this.data.favList)
      }


    });
  }
})