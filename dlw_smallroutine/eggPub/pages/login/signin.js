//获取应用实例
var app = getApp();
var md5 = require('../../utils/MD5.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  /**
   * 获取验证码
   */
  primary: function (e) {
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);

    var accessToken = md5.hexMD5(app.CertCode + timestamp);
    
    console.log("MD5加密后为：" + accessToken);

    var phoneNumber = 13264440353;
    var smsCode = 1234;

    var message = "<ShortMessage><sendSort>SMS</sendSort><sendType>PRIVATE_SINGLE</sendType>< isGroup>0</isGroup><phoneNumber>" + phoneNumber + "</phoneNumber><message>蛋联网鸡蛋交易价格验证码" + smsCode +"，请您在五分钟之内输入，如遇 到问题请拨打4008105353（手机免长途费）！</message><messageSendDescribe>速度</messageSendDescribe><remarks>说明</remarks><verificationCode>"+smsCode+"</verificationCode></ShortMessage>";

    wx.request({
      url: MessageCenterURL,
      data: {
        timestamp: timestamp,
        systemId: app.SystemID,
        accessToken: accessToken,
        message: message,
      },
      method: 'POST',
      success: function (res) {
        console.log(res);

        that.setData({
          
        })
      }
    })
  }
})