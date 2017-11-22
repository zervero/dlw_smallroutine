var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sell: 'top-hoverd-btn',
    buy: '',
    mineSellArray: [],
    mineBuyArray: [],
    pageNum: 1,
    getMore: true,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMySupplyList();
    this.getMyAskedList();
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
    this.getMoreEggList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.getMore) {
      this.data.pageNum++;
      this.getMoreEggList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 用户点击我的出售
   */
  toSell: function () {

    this.updateBtnStatus('sell');

  },
  /**
   * 用户点击我的求购
   */
  toBuy: function () {

    this.updateBtnStatus('buy');
  },

  updateBtnStatus: function (k) {

    this.setData({
      sell: this.getHoverd('sell', k),
      buy: this.getHoverd('buy', k),
    });
  },
  getHoverd: function (src, dest) {
    // console.log((src == dest ? 'top-hoverd-btn' : ''));
    return (src == dest ? 'top-hoverd-btn' : '');
  },

  /**
   *  跳转发布 求购/出售 信息 
   */
  pubBindTap: function (e) {
     
      wx.navigateTo({
        url: '../pub/choosePub'
      })
   
  },
  /**
   * 点击编辑
   */
  editPubBindTap: function (e) {
    var iteminfo = e.currentTarget.dataset.iteminfo;
    console.log(JSON.stringify(iteminfo));
    if (this.data.sell =='top-hoverd-btn'){
      var temp = "teme1=" + iteminfo.title + "&teme2=" + iteminfo.countSpec + "&teme3=" + iteminfo.count + "&teme4=" + iteminfo.addr + "&teme5=" + iteminfo.supplyMemo + "&teme6=" + iteminfo.supplyPersonName + "&teme7=" + iteminfo.supplyPersonTel;
      wx.navigateTo({
        url: "../pub/pubSell?" + temp,
      })
    }else if(this.data.buy == 'top-hoverd-btn'){
      var temp = "teme1=" + iteminfo.title + "&teme2=" + iteminfo.countSpec + "&teme3=" + iteminfo.count + "&teme4=" + iteminfo.produceArea + "&teme5=" + iteminfo.memo + "&teme6=" + iteminfo.memberName + "&teme7=" + iteminfo.memberTel;
      wx.navigateTo({
        url: "../pub/pubBuy?" + temp,
      })
    }
  },

  /**
   * 点击删除
   */
  minePubBindTap: function (e) {
    var iteminfo = e.currentTarget.dataset.iteminfo;
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    wx.showModal({
      title: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: app.BaseServicesURL + '/api/purchase/asked/delPurchase',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              "accessToken": iteminfo.accessToken,
              "purchaseId": iteminfo.purchaseId,
              "timeStamp": timestamp,
            },

            success: function (res) {
              console.log(res);
              if (res.data.code == 0) {
                if (res.data.data) {
                  that.setData({
                    getMore: true,
                  })

                  var datalist = that.data.mineBuyArray.concat(res.data.data);
                  that.setData({
                    mineBuyArray: datalist,
                  })


                } else {
                  that.setData({
                    getMore: false,
                  })

                }

              }
              else {
                console.log('请求失败');
              }
            },
            fail: function (res) {
              console.log('请求失败');
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 点击更新
   */
  minePubBindTap: function (e) {
    var iteminfo = e.currentTarget.dataset.iteminfo;
     
    wx.showModal({
      title: '确定更新吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 查询我所发布的所有求购信息
   */
  getMyAskedList: function () {
    var that = this;
    wx.request({
      url: app.BaseServicesURL + '/api/supplyAsked/getMyAskedList',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "boId": app.globalData.boId,
        "goodsClassifyAxis": app.GoodsClassifyAxis,
        "status": app.STATUS,
        "pageNum": that.data.pageNum,
      },
      
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          if (res.data.data) {
            that.setData({
              getMore: true,
            })

            var datalist = that.data.mineBuyArray.concat(res.data.data);
            that.setData({
              mineBuyArray: datalist,
            })


          } else {
            that.setData({
              getMore: false,
            })

          }

        }
        else {
          console.log('请求失败');
        }
      },
      fail: function (res) {
        console.log('请求失败');
      }
    });
  },

  /**
   * 查询我所发布的所有供应信息
   */
  getMySupplyList: function () {
    var that = this;
    wx.request({
      url: app.BaseServicesURL + '/api/supplyAsked/getMySupplyList',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "boId": app.globalData.boId,
        "goodsClassifyAxis": app.GoodsClassifyAxis,
        "status": app.STATUS,
        "pageNum": that.data.pageNum,
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          if (res.data.data) {
            that.setData({
              getMore: true,
            })

            var datalist = that.data.mineSellArray.concat(res.data.data);
            that.setData({
              mineSellArray: datalist,
            })


          } else {
            that.setData({
              getMore: false,
            })

          }

        }
        else {
          console.log('请求失败');
        }
      },
      fail: function (res) {
        console.log('请求失败');
      }
    });
  },

  getMoreEggList:function(){
    
  },
})