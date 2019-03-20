//index.js
//获取应用实例
const app = getApp();

Page({
  data:{
    female:[],
    male:[],
    picture:[],
    press:[],

  },
  onLoad(){
    wx.showLoading({
      title: '正在拼命加载中...',
      mask:true,
    })
    wx.request({
      url: 'https://api.zhuishushenqi.com/cats/lv2/statistics',
      success:(res)=>{
        this.setData({
          female: res.data.female,
          male: res.data.male,
          picture: res.data.picture,
          press: res.data.press
        })
        wx.hideLoading()
      }
    })
  },
  jumpClassifyInfoPage(event){
    let data = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/classifyInfo/classifyInfo?gender=${data.gender}&major=${data.major}`,
    })
  }
})
