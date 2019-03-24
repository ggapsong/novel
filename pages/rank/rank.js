Page({
  data:{
    type: [
      { title: "男生", code: "male" },
      { title: "女生", code: "female" },
    ],
    activeMinor: 0,
    id:"",
    data:{
      female: [],
      male: "",
    },
    books:[],
    show:"male",
  },
  onLoad: function (options){
    this.getMajor();
    // this.getData();
    wx.showLoading({
      title: '拼命加载中',
    })

  },
  //顶部导航男生女生的切换
  typeItemTap(event) {
    let data = event.currentTarget.dataset;
    this.setData({
      show: data.show,
      id: this.data.data[data.show][0]._id,
      activeMinor:0
    },this.getData);
  },
  // 左侧导航的点击切换
  minorItemTap(event){
    let data = event.currentTarget.dataset;
    this.setData({
      activeMinor:data.index,
      id:data.id
    }, this.getData)
  },
  //获取左侧导航的详细信息
  getMajor(){
    let _this = this
    wx.request({
      url: 'https://api.zhuishushenqi.com/ranking/gender',
      success: res => {
        _this.setData({
          id: res.data.male[0]._id,
          data:res.data
        },this.getData)
        wx.hideLoading()
      }
    })
  },
  // 获取数据
  getData(){
    wx.request({
      url: 'https://api.zhuishushenqi.com/ranking/'+this.data.id,
      success:res=>{
        
        this.setData({
          books: res.data.ranking.books
        })
      }
    })
  },
  getItemDetailInfo(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/itemDetailInfo/itemDetailInfo?id='+id,
    })
  }
})