//app.js
App({
  APPID: 'wxe4bead0ad89b83e4',//小程序appid
  SECRET: 'a7aa85e0f33d3f67743bb41151f56d5e',//小程序密钥
  MessageCenterURL:'http://mc.t.nxin.com/message/sendGroup', //消息中心接口URL
  BaseServicesURL: 'https://sc.t.nxin.com', //基础服务接口URL
  SystemID:'35',//消息中心分配的系统ID
  CertCode:'B9854c',//消息中心分配的认证码
  GoodsClassifyAxis: '$921$922',//货品分类编码
  STATUS: '1',//审核状态
  onLaunch: function () {
    var that = this;
    //微信登录，获取用户的信息
    wx.login({
      success: function (res) {
        if (res.code) {
          var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.APPID + '&secret=' + that.SECRET + '&js_code=' + res.code + '&grant_type=authorization_code';
          //发起网络请求
          wx.request({
            url: url,
            method: 'GET',
            success: function (res) {
              console.log(res);
              that.setData({
                weekDataList: res.data.dataList
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });


    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    boId:'1253643',
    IS_LOGIN:true,
  }
})
