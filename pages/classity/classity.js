const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    leftData: [],
    rightData: [],
    selectIndex: 0,
    inputValue: '',
    // merchandiseCategories:[]//分类名称

  },
  talk(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  onshow() {
    if (this.data.inputValue) {
      wx.navigateTo({
        url: `/pages/list/list?text=${this.data.inputValue}`,
      })
    } else {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 跳转详情
  skipDetails(e) {
    wx.navigateTo({
      url: `/pages/details/details?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.index, '11111')
    this.setData({
      selectIndex: options.index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function() {
    //请求上面的分类名称
    request.shopAll({

    }).then((res) => {
      this.setData({
        leftData: res.data.data
      })
    })

    // 分类商品  右边展示的
    request.shopList({

    }).then((res) => {
      this.setData({
        list: res.data.data
      })
    })

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
  toDetails(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  onClick(e) {
  
    // 点击分类获取下标
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
  
    // 根据id查找categoryid
    let temp = [];
    this.data.list.forEach(e => {
      if (id == e.categoryId) {
        temp.push(e)
        this.setData({
          rightData: temp
        })
      } else {
        // var arr="暂无商品"
        // console.log('没有数据')
        // this.setData({
        //   rightData:[]
        // })
      }
    })

    this.setData({
      selectIndex: index
    })

  }


})