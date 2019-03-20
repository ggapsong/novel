Page({
  data:{
    type: [
      { title: "男生", code: "female" },
      { title: "女生", code: "male" },
      ],
    minor: ["最热榜"], 
    activeType: 0,
    activeMinor: 0,
    list:[]
  },
  onLoad: function (options){
    this.getMajor()
    this.getData()
  },
  //顶部导航男生女生的切换
  typeItemTap(event) {
    let data = event.currentTarget.dataset;
    this.setData({
      activeType: data.index,
    });
  },
  // 左侧导航的点击切换
  minorItemTap(event){
    let data = event.currentTarget.dataset;
    this.setData({
      activeMinor:data.index
    })
  },
  //获取左侧导航的详细信息
  getMajor(){
    let _this = this
    wx.request({
      url: 'https://api.zhuishushenqi.com/ranking/gender',
      success: res => {
        console.log(res.data)
        _this.setData({
          list: res.data.female

        })
        console.log(this.data.list)
      }
    })
  },
  //获取数据
  getData(e){
    console.log(e)
    // let 
    // wx.request({
    //   url: 'http://api.zhuishushenqi.com/ranking/',
    // })
  }
})