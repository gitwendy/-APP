// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    Info: "",
    wxlogin: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  goLogin() {
    this.setData({
      wxlogin: false
    })
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
  getInformation(e) {
    wx.login({
      success: (res) => {
        console.log('获取code', res);
        let code = res.code;
        wx.getUserInfo({
          success(result) {
            // 用户详细信息
            console.log('获取用户详细信息', result)
            let eee = result.encryptedData;
            let ivv = result.iv;
               wx.request({
          url: 'https://api.it120.cc/mwz/user/wxapp/login',
          method: "POST",
          // 在这里我们要传递一个code参数
          data: {
            code: code
          },
          header: {
            'content-type': "application/x-www-form-urlencoded",

          },
          success(result) {
            console.log('获取token', result.data);
            wx.setStorageSync('angeltoken', result.data.data.token)
          }
        });
            // 注册
            // wx.request({
            //   url: 'https://api.it120.cc/mwz/user/wxapp/register/complex',
            //   method: 'POST',
            //   header: {
            //     'content-type': "application/x-www-form-urlencoded",

            //   },
            //   data: {
            //     code: code,
            //     encryptedData: eee,
            //     iv: ivv

            //   },
            //   success(res) {
            //     wx.login({
            //       success: (res) => {
            //         // let code = res.code;
            //         console.log('888',res)
            //         wx.request({
            //           url: 'https://api.it120.cc/abc/user/wxapp/register/complex',
            //           data: {
            //             code: res.code,
            //             autoReg: true
            //           },
            //           method: 'POST',
            //           success(result) {
            //             console.log('ahhaha获取token', result)
            //           }

            //         })
            //       },

            //     })

            //   }
            // })
          },


        })
        // wx.request({
        //   url: 'https://api.it120.cc/mwz/user/wxapp/login',
        //   method: "POST",
        //   // 在这里我们要传递一个code参数
        //   data: {
        //     code: code
        //   },
        //   header: {
        //     'content-type': "application/x-www-form-urlencoded",

        //   },
        //   success(result) {
        //     console.log('获取token', result.data);
        //     wx.setStorageSync('angeltoken', result.data.data.token)
        //   }
        // });
        // 如果我们要完成注册的话，首先通过wx.login 拿到code，然后我们 
        //获取用户信息，拿到encyptedata和iv


      }
    })




    // console.log(e.detail.userInfo);
    this.setData({
      userInfo: e.detail.userInfo
    })
    console.log(this.data.userInfo)
  },
  function() {

  },
  meCollect() {
    wx.reLaunch({
      url: '/pages/collect/collect',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  //退出登录
  logOut() {
    console.log(wx.getStorageSync('angeltoken'));
    wx.removeStorageSync('angeltoken')
    wx.showToast({
      title: '为您退出登录',
    });
    // wx.login({
    //   success: (res) => {
    //     console.log('获取code', res);
    //     let code = res.code;
    //     wx.request({
    //       url: 'https://api.it120.cc/mwz/user/wxapp/login',
    //       method: "POST",
    //       // 在这里我们要传递一个code参数
    //       data: {
    //         code: code
    //       },
    //       header: {
    //         'content-type': "application/x-www-form-urlencoded",

    //       },
    //       success(result) {
    //         console.log('获取token', result.data);
    //         // wx.setStorageSync('angeltoken', result.data.data.token)
    //       }
    //     });
    //     // 如果我们要完成注册的话，首先通过wx.login 拿到code，然后我们 
    //     //获取用户信息，拿到encyptedata和iv


    //   }
    // })
    this.setData({
      userInfo: []
    })

  }
})