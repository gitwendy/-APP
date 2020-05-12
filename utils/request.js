const config = require('./config.js')
module.exports = {



  
  //轮播图
  banner: (data) => {
    return config('/banner/list', "get", data)
  },
  //商品分类
  shopAll: (data) => {
    return config('shop/goods/category/all', 'get',data)
  },
  //商品列表

  shopList:(data)=>{
    return config('shop/goods/list','post',data)
  },
  discounts:()=>{
    return config('discounts/coupons','get')
  },
  // https://api.it120.cc/zhangcy/shop/goods/detail?id=399357
  //商品详情
  shopDetail(data){
    return config('shop/goods/detail','get',data)
  },
  shopCartList:(data)=>{
    return config ('shopping-cart/info','get',data)
  },
  //收藏

  favList:(data)=>{
    return config('shop/goods/fav/list','post',data)
  },



}