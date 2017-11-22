Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    colorArray: ['白壳蛋', '褐壳蛋', '粉壳蛋', '地方品种'],
    specArray: ['筐', '箱', '斤','件'],
    areaArray: ['全国', '北京市', '天津市', '地方品种'],
    defaultArray:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var tempArray = [];
    tempArray.push(options.teme1);
    tempArray.push(options.teme2);
    tempArray.push(options.teme3);
    tempArray.push(options.teme4);
    tempArray.push(options.teme5);
    tempArray.push(options.teme6);
    tempArray.push(options.teme7);
    console.log(tempArray);
    this.setData({
      defaultArray:tempArray,
    });
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
  bindBack: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
})