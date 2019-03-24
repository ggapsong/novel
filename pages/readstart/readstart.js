// pages/readstart/readstart.js
Page({
  data: {
    isShow:false,
    footerShow:false,
    source:[], // 书源列表
    sourceIndex:0, // 当前选中的书源
    sourceText: [], // 书源的文字（因为showActionSheet需要一个类似这样（['A', 'B', 'C']）的数组，而source的每一项是对象  ）
    chapter:0, //当前章节
    chapters:[], // 所有章节
    chapterContent:{},
    scrollTop:0
  },
  childShow(){
    this.setData({
      isShow: !this.data.isShow,
    })
  },
  onLoad(options){
    this.getSource(options) // 请求所有的书源 返回值是书源的列表，第一项是正版源。
  },
  showAll(){
    this.setData({
      footerShow: !this.data.footerShow,
      isShow:false,
    })
  },
  changeSource(){
    var _this = this;
    wx.showActionSheet({
      itemList: this.data.sourceText,
      success(res) {
        _this.setData({
          sourceIndex:res.tapIndex
        })
      }
    })
  },
  getSource(options){
    var _this = this;
    wx.request({
      url: "https://api.zhuishushenqi.com/atoc?view=summary&book=" + options.id,
      success(res) {
        var arr = [];
        for (let i = 0; i < res.data.length; i++) {
          arr[i] = res.data[i].name
        }
        _this.setData({
          source: res.data,
          sourceText: arr
        }, _this.getChapters)
      }
    })
  },
  getChapters(){
    var _this = this;
    var sourceId = this.data.source[this.data.sourceIndex]._id; // 书源id
    wx.request({
      url: `https://api.zhuishushenqi.com/btoc/${sourceId}?view=chapters`,
      success(res){
        _this.setData({
          chapters: res.data.chapters
        }, _this.getNowChapter)
      }
    })
  },
  getNowChapter(){
    var _this = this;
    var link = this.data.chapters[this.data.chapter].link;
    wx.request({
      url: 'https://chapterup02.zhuishushenqi.com/chapter/'+link,
      success(res){
        _this.setData({
          chapterContent:res.data,
          scrollTop:0
        });
        wx.setNavigationBarTitle({
          title: res.data.chapter.title
        });
      }
    })
  },
  preChapter(){
    if(this.data.chapter==0){
      wx.showToast({
        title: '已经是第一章了',
        icon: 'none',
        duration: 2000
      })
    }else{
      this.setData({
        chapter:this.data.chapter-1
      },this.getNowChapter)
    }
  },
  nextChapter() {
    if (this.data.chapter == this.data.chapters.length-1) {
      wx.showToast({
        title: '已经是最后一章了',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        chapter: this.data.chapter + 1
      }, this.getNowChapter)
    }
  }
})