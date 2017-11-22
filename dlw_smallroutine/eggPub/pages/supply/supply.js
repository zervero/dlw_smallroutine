Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    areaArray: ['全国', '北京市', '天津市', '地方品种'],
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  callBindViewTap: function () {
    wx.showModal({
      title: '提示',
      content: '确定拨打电话：17701095770吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.makePhoneCall({
            phoneNumber: '17701095770'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 点击我要发布响应函数
   */
  pubBindTap: function () {
    wx.showActionSheet({
      itemList: ['我要出售', '我要求购'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../pub/pubSell'
          })
        } else if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../pub/pubBuy'
          })
        }

      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 点击我的发布
   */
  minePubBindTap: function () {
    wx.navigateTo({
      url: '../pub/minePubs'
    })
  },
  supplybindViewTap: function () {
    wx.navigateTo({
      url: '../pub/sellBuyInfo',
    })
  },
})