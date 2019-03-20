Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:[
      { title: "热门", code: "hot" },
      { title: "新书", code: "new" },
      { title: "好评", code: "reputation" },
      { title: "完结", code: "over" }
    ],
    minor:["全部"],
    activeType:0,
    activeMinor:0,
    page:1,
    limit:20,
    books:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在拼命加载中...',
      mask: true,
    })
    this.getMinorArr();//请求子分类
    this.getData();//请求数据
  },
  getMinorArr(){
    let _this = this;
    wx.request({
      url: 'https://api.zhuishushenqi.com/cats/lv2',
      success: function (res) {
        if (res.data.ok) {
          let gender = res.data[_this.options.gender];
          for (let i = 0; i < gender.length; i++) {
            if (gender[i].major == _this.options.major) {
              _this.setData({
                minor: [..._this.data.minor, ...gender[i].mins]
              });
              break;
            }
          }
        }
      }
    });
  },
  typeItemTap(event){
    let data = event.currentTarget.dataset;
    this.setData({
      activeType:data.index,
      page:1,
      books:[]
    }, this.getData);
    
  },
  minorItemTap(event) {
    let data = event.currentTarget.dataset;
    this.setData({
      activeMinor: data.index,
      page:1,
      books:[]
    }, this.getData);

  },
  getData(){
    let _this = this;
    let minor = this.data.minor[this.data.activeMinor] == "全部" ? "" : this.data.minor[this.data.activeMinor];
    wx.request({
      url: `https://api.zhuishushenqi.com/book/by-categories?gender=${this.options.gender}&type=${this.data.type[this.data.activeType].code}&major=${this.options.major}&minor=${minor}&start=${(this.data.page-1)*this.data.limit}&limit=${this.data.limit}`,
      success(res){
        _this.setData({
          page:_this.data.page+1,
          books: [..._this.data.books, ...res.data.books]
        })
        wx.hideLoading()
      }
    })
  },
  // 跳转到每部小说的详情页面
  getItemDetailInfo(e){
    let id = e.currentTarget.dataset.id
    wx:wx.navigateTo({
      url: '/pages/itemDetailInfo/itemDetailInfo?id='+id,
    });
  },
  lower(){
    console.log(11111)
  }
})