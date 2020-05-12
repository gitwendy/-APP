const app = getApp()
Page({
  data: {
    originalArr:[],//存储原有数组
    showArr:[],//展示所满足条件数组
    cutIcon:false, //切换布局icon
    conditionArr:['综合','新品','销量','价格'], //条件数组
    conditionIndex:0, //选中条件的下标 默认0
    listIcon:false,//请求数据加载动画
    inputValue:'', //存储文本框值
  },
  onLoad: function (options) {
    let tempArr = []
    wx.request({
      url: 'https://api.it120.cc/mwz/shop/goods/list',
      success: e => {
        e.data.data.forEach(element=>{
          if(element.name.indexOf(options.text) != -1){
            tempArr.push(element)
          }
        })
        this.setData({
          showArr:tempArr,
          listIcon:!this.data.listIcon,
          originalArr:e.data.data
        })
      }
    })
    // console.log(options.text)
  },
  alertICon(){
    this.setData({
      cutIcon:!this.data.cutIcon
    })
  },
  // 存储文本框的值
  talk(e){
    this.setData({
      inputValue:e.detail.value
    })
  },
   // 查询列表
   onshow(){
    if(this.data.inputValue){
      let tempArr = []
      this.data.originalArr.forEach(element=>{
        if(element.name.indexOf(this.data.inputValue) != -1){
          tempArr.push(element)
        }
      })
      this.setData({
        showArr:tempArr
      })
    }else{
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 更改选中条件的下标
  clickCondition(e){
    this.setData({
      conditionIndex:e.currentTarget.dataset.index
    })
  },
  // 跳转详情页
  skipDetails(e){
    wx.navigateTo({
      url: `/pages/details/details?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 添加数据到购物车
  addShoppingCart(e){
    wx.getStorage({
      key: 'storeShoppingData',
      success:(res)=> app.packagingStorage({boole:true,shoppingCartData:JSON.parse(res.data),gainData:e.currentTarget.dataset.obj}),
      fail:()=> app.packagingStorage({ boole:false, gainData:e.currentTarget.dataset.obj}) 
    })
    // console.log(e.currentTarget.dataset.obj)
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  }
})