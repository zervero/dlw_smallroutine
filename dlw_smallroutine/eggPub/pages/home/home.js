var city = require('../../utils/city.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据 和 变量
   */
  data: {
    index: 0,
    eggArray: ['全部种类','褐壳蛋', '粉壳蛋', '白壳蛋', '地方品种'],
    areaArray: [],
    sellArray: [],
    buyArray: [],
    firstCityArray: [],
    secondCityArray: [],
    selectEggColor: '',
    selectArea: '',
    sell: 'top-hoverd-btn',
    buy: '',
    source: '2',
    pageNum: 1,
    getMore:true,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEggList();
    var first = city.firstCityArray();
    var second = city.secondCityArray(0);
    console.log("callBindViewTap++++", first, second);
    this.setData({
      firstCityArray: first,
      secondCityArray: second,
    });
    var tempArray = [];
    tempArray[0] = this.data.firstCityArray;
    tempArray[1] = this.data.secondCityArray;
    this.setData({
      areaArray: tempArray,
    })
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
    this.getEggList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.getMore){
      this.data.pageNum++;
      this.getEggList();
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 用户点击我要卖蛋
   */
  toSell: function () {

    this.updateBtnStatus('sell');
    this.setData({
      source: '2',
      sellArray: [],
      buyArray: [],
      pageNum: 1, 
    }),
    this.getEggList();
  },
  /**
   * 用户点击我要买蛋
   */
  toBuy: function () {

    this.updateBtnStatus('buy');
    this.setData({
      source: '1',
      sellArray: [],
      buyArray: [],
      pageNum: 1,
    }),
    this.getEggList();
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
   * 事件处理
   * 
   */
  bindViewTap: function () {

  },

  /**
   * 点击我要发布响应函数
   */
  pubBindTap: function () {
    if (app.globalData.IS_LOGIN){
      wx.navigateTo({
        url: '../pub/choosePub',
      })
    }else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
    
  },
  /**
   * 点击我的发布
   */
  minePubBindTap: function () {
    if (app.globalData.IS_LOGIN) {
      wx.navigateTo({
        url: '../pub/minePubs',
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
    
  },
  /**
   * 点击更多
   */
  morePubBindTap: function () {
    wx.navigateTo({
      url: '../supply/supply'
    })
  },
  /**
   * 拨打电话
   */
  callBindViewTap: function (e) {
    console.log("callBindViewTap++++", e.currentTarget.dataset.phonenumber);
    var phoneNumber = e.currentTarget.dataset.phonenumber;
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },
  /**
   * 供需详情
   */
  supplybindViewTap: function (e) {
    console.log("supplybindViewTap++++", e.currentTarget.dataset.iteminfo);
    var iteminfo = e.currentTarget.dataset.iteminfo;
    wx.navigateTo({
      url: '../pub/sellBuyInfo?iteminfo=' + JSON.stringify(iteminfo),
    })
  },

  /**
   * 更改蛋壳颜色
   */
  goSelectEggColor: function (e) {
    console.log('picker发送选择改变，selectEggColor携带值为', this.data.eggArray[e.detail.value])
    if (e) {
      this.setData({
        selectEggColor: this.data.eggArray[e.detail.value],
        sellArray: [],
        buyArray: [],
      })

      this.getEggList();
    }
  },

  /**
   * 更改地区
   */
  goSelectArea: function (e) {
    console.log('picker发送选择改变，selectArea携带值为', e.detail.value)
    if (e) {
      var tempArea;
      if (this.data.secondCityArray[e.detail.value[1]]){
        tempArea = this.data.firstCityArray[e.detail.value[0]] + " " + this.data.secondCityArray[e.detail.value[1]];
      }else {
        tempArea = this.data.firstCityArray[e.detail.value[0]];
      }
      this.setData({
        selectArea: tempArea,
        sellArray: [],
        buyArray: [],
      });
      this.getEggList();
    }
  },
  /**
   * 
   */
  citycolumnchange:function (e){
    console.log('picke送选择改变，citycolumnchange', e.detail.value)
    if (e && e.detail.column == 0) {
      var second = city.secondCityArray(e.detail.value);
      if(second){
        var tempArray = [];
        tempArray[0] = this.data.firstCityArray;
        tempArray[1] = second;
        console.log('tempArray', tempArray)
        this.setData({
          secondCityArray: second,
          areaArray: tempArray,
        })
      }
      
    }
  },
  /**
   * 获取求购/供应信息
   * 
   */
  getEggList: function () {
    var that = this;
    wx.request({
      url: app.BaseServicesURL + '/api/supplyAsked/getList',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "addr": that.data.selectArea == "全国" ? "" : that.data.selectArea,
        "eggColor": that.data.selectEggColor == "全部种类" ? "" : that.data.selectEggColor,
        "goodsClassifyAxis": app.GoodsClassifyAxis,
        "status": app.STATUS,
        "source": that.data.source,
        "pageNum": that.data.pageNum,
      },
      success: function (res) {
        console.log(res);
        if(res.data.code==0){
          if (res.data.data) {
            that.setData({
              getMore: true,
            })
            if (that.data.source=='1'){
              var datalist = that.data.buyArray.concat(res.data.data);
              that.setData({
                buyArray: datalist,
              })
            } else if (that.data.source == '2') {
              var datalist = that.data.sellArray.concat(res.data.data);
              that.setData({
                sellArray: datalist,
              })
            }
            
          }else {
            that.setData({
              getMore: false,
            })
            
          }
          
        }
        else{
          console.log('请求失败');
        }
      },
      fail: function (res) {
        console.log('请求失败');
      }
    });

  }
})