// pages/bookList/bookList.js
Page({
  data: {
    author:[],
    bookLists:[],
    desc:"",
    title:""
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '正在拼命加载中...',
    })
    let id = options.id;
      wx.request({
        url: 'https://api.zhuishushenqi.com/book-list/' + id,
        success: res => {
          this.setData({
            bookLists: res.data.bookList.books,
            author:res.data.bookList.author,
            desc: res.data.bookList.desc,
            title: res.data.bookList.title
          })
          wx.hideLoading()
        },
        
      })
  },
  //跳转到详情页面
  getItemDetailInfo(e) {
    let id = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '/pages/itemDetailInfo/itemDetailInfo?id=' + id,
    });
  },
})
