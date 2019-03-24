Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: [
      { title: "本周最热", qs: "sort=collectorCount&duration=last-seven-days&" },
      { title: "最新发布", qs: "sort=created&duration=all&" },
      { title: "最多收藏", qs: "sort=collectorCount&duration=all&" },
    ],
    minor: [
      { title: "全部", code:"" },
      { title: "男生", code: "male" ,qsName:"gender" },
      { title: "女生", code: "female", qsName: "gender" },
      { title: "玄幻", qsName: "tag" },
      { title: "都市", qsName: "tag" },
      { title: "科幻", qsName: "tag" },
      { title: "重生", qsName: "tag" },
    ],
    activeType: 0,
    activeMinor: 0,
    page: 1,
    limit: 20,
    books: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在拼命加载中...',
      mask: true,
    })
    this.getData()
  },
  typeItemTap(event) {
    let data = event.currentTarget.dataset;
    this.setData({
      activeType: data.index,
      page: 1,
      books: []
    }, this.getData);

  },
  minorItemTap(event) {
    let data = event.currentTarget.dataset;
    this.setData({
      activeMinor: data.index,
      page: 1,
      books: [],
    }, this.getData);
  },
  getData(){
    let { minor, activeMinor, limit,start} = this.data;
    let overQs = "";
    if (activeMinor>0){
      console.log(minor[activeMinor].qsName)
      overQs = minor[activeMinor].qsName + "=" + (minor[activeMinor].qsName == "gender" ? minor[activeMinor].code : minor[activeMinor].title) + "&"
    }
    wx.request({
      url: 'https://api.zhuishushenqi.com/book-list?' + this.data.type[this.data.activeType].qs + overQs + "limit=" + limit + "&start=0",
      success:res=>{
        this.setData({
          books: res.data.bookLists
        },()=>{
          wx.hideLoading()
        })
      }
    })
  },
  //跳转到书单详情页面
  getItemDetailInfo(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/bookList/bookList?id='+id,
    })
  },
})