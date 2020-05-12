//index.js
//获取应用实例
const request = require('../../utils/request.js')
const app = getApp();


Page({
  data: {
    bannerData: [], //轮播,
    merchandiseCategories: [], //商品类别
    list: [], //所有的商品
    showList: [], //展示列表
    recommendShop: [], //商品推荐
    lopList: [], //全民砍价
    groupBooking: [] //拼团


  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {},
  onReady() {

    // 请求轮播图
    request.banner({
      type: 'index'
    }).then((res) => {
      this.setData({
        bannerData: res.data.data
      })
    })
    //商品分类
    request.shopAll({

    }).then((res) => {
      this.setData({
        merchandiseCategories: res.data.data
      })
    })
    //请求商品列表 渲染全民拼团 限时秒杀等
    request.shopList({

    }).then((res) => {
      this.setData({
        list: res.data.data
      })
      let temp = [];
      let sub = [];
      let pintuan = []
      this.data.list.forEach(e => {
        if (e.recommendStatusStr === '推荐') {
          temp.push(e)
        } else if (e.kanjia === true) {
          sub.push(e)
        } else if (e.pingtuan === true) {
          pintuan.push(e)
        }

      })
      this.setData({
        recommendShop: temp,
        lopList: sub,
        groupBooking: pintuan
      })
    })

  },
  toClassIty(e) {
    // 点击跳转分类页面
    console.log(e.currentTarget.dataset.index)
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    wx.reLaunch({
      url: `/pages/classity/classity?index=${index}`,

    });


  },
  // 跳转详情页面
  toDetails(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }


})