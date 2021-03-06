// pages/itemDetailInfo/itemDetailInfo.js
Page({
  data: {
    datas:[]
  },

  onLoad: function (options) {
    let id = options.id;
    let _this = this
    wx.showLoading({
      title: '正在拼命加载中...',
    })
    wx.request({
      url: 'https://api.zhuishushenqi.com/book/'+id,
      success: function(res) {
        _this.setData({
          datas:res.data
        })
        wx.hideLoading()
      },
      fail: function(res) {},
    })
  },
  readstart(event){
    var data = event.target.dataset;
    wx.navigateTo({
      url: '/pages/readstart/readstart?id='+data.id,
    })
  }
})