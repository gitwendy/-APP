// pages/shopcart/shopcart.js
const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    //购物车数组
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   let token=wx.getStorageSync('angeltoken')
    wx.request({
      url: 'https://api.it120.cc/mwz/shopping-cart/info',
      data: {
        token: token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (result) => {
        console.log(result.data.data);
        this.setData({
          shopList: result.data.data.items,
        })
        this.totalPrice();
        console.log(this.data.shopList)
      }

    });

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  totalPrice() {
    let num = 0;
    this.data.shopList.forEach(e => {
      console.log(e)
      num += e.number * e.price

    })
    console.log(num)
    this.setData({
      totalPrice: num
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  prev(e) {
    // e.currentTarget.dataset.id.number -= 1;
    let index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: "https://api.it120.cc/mwz/shopping-cart/modifyNumber",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        key: this.data.shopList[index].key,
        number: 1,
        // token: "92578073-ca9a-408e-831a-d3a7f33d38cc"
        token: wx.getStorageSync('angeltoken'),

      },
      success: (result) => {
        console.log(result.data.data);
        // this.data.shopList=[];
        // this.data.shopList.splice(index,1)
        this.data.shopList[index].number -= 1;

        this.setData({
          shopList: this.data.shopList
        })
        console.log('shanchu', this.data.shopList)
      }


    });
    this.totalPrice();

  },
  next(e) {
    let index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: "https://api.it120.cc/mwz/shopping-cart/modifyNumber",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        key: this.data.shopList[index].key,
        number: 1,
        // token: "92578073-ca9a-408e-831a-d3a7f33d38cc"
        token: wx.getStorageSync('angeltoken'),

      },
      success: (result) => {
        console.log(result.data.data);
        // this.data.shopList=[];
        // this.data.shopList.splice(index,1)
        this.data.shopList[index].number++;

        this.setData({
          shopList: this.data.shopList
        })
        console.log('shanchu', this.data.shopList)
      }


    });
    this.totalPrice();

  },
  //删除某一条记录
  del(e) {
    // console.log(e.currentTarget.dataset.key);
    let index = e.currentTarget.dataset.index

    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: "https://api.it120.cc/mwz/shopping-cart/remove",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        key: this.data.shopList[index].key,
        // token: "92578073-ca9a-408e-831a-d3a7f33d38cc"
        token: wx.getStorageSync('angeltoken'),
      },
      success: (result) => {
        console.log(result.data.data);
        // this.data.shopList=[];
        this.data.shopList.splice(index, 1)

        this.setData({
          shopList: this.data.shopList
        })
        console.log('shanchu', this.data.shopList)
      }


    });
    this.totalPrice();
  },

})