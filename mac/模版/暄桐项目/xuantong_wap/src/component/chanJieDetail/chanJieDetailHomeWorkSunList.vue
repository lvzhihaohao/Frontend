<template>
  <div class="My_ChairList-evaluation">
    <!-- <div class='gu_allLike'>
                        <h4 style='display:inline-block' class="fz15 c5">全部评价({{data.total}})</h4>
                        <span><i class="iconfont icon-xihuan mr-5"></i>{{data.allNum}}</span>
    </div>-->
    <ul style="padding-bottom:1.5rem;">
      <li
        v-for="(item,index) in chanJieDetailHomeWorkSunList.courseDiscussionResponseVos"
        :key="index"
        @click="goDiscuss(item.courseDiscussionId,item)"
      >
        <article>
          <img v-lazy="item.discussHeadUri" :key="item.courseDiscussionId" style="object-fit: cover" alt />
        </article>
        <div>
          <div class="pos_r">
            <div class="c9 pos_r_boxLeijc">
              <!-- 小山 -->
              <div class="pos_r_leftLeijc">
                <div class="boxElss">{{item.discussUser}}</div>
                <img
                  src="../../../static/mobile_img/checkPoint_praise2.png"
                  style="width:1.125rem;height:1.2rem;margin-left:1.5rem;opacity: 0.8;"
                  v-if="item.starNum>0"
                />
                <span style="margin-left: .2rem;line-height: 1.4rem;" class="fz12" v-if="item.starNum>0">
                  <!-- <span class="fz14">+</span> -->
                  {{item.starNum}}
                </span>
              </div>
              <i
                class="fr c9 iconfont icon-more"
                @click.stop="showLetter(item.discussUserId,item.courseDiscussionId,item)"
              ></i>
            </div>
            <div :class="item.contentNum>=156?'c9 gu_c9 app-lv-sunp':'c9 gu_c9 app-lv-sunp-height'" style="marginTop:.8rem">
              <img
                src="../../../static/icon/zhiding.png"
                v-if="item.isTop==1"
                style="width: 2.5rem;height: 0.8rem;object-fit: contain;"
              />
              <span class="spanPre" v-html="item.content"></span>
              <!-- <span v-if="item.contentNum>=156">....</span> -->
            </div>
            <p v-if="item.contentNum>=156" class="app-lv-sunp-cha-right">查看全文</p>
            <!-- <ul class="More-model" v-if='LetterIndex==index && flag'>     
                                            <li v-if=' item.discussUserId == userInfo.studentId'
                                                @click.stop='removeTieZi(item.courseDiscussionId)'>
                                                <a href="javascript:void(0);">
                                                    <span class="fz15 c4a5">
                                                        <i class="iconfont icon-siliao c4a5"></i>
                                                        删除
                                                    </span>
                                                </a>
                                            </li>   
                                            <li v-else @click.stop='goMyChatMessage'>
                                                <router-link to="/">
                                                    <span class="fz15 c9">私信</span>
                                                </router-link>
                                            </li>                                                       
            </ul>-->
          </div>
          <p class="fz15 c30">{{item.title}}</p>
          <div class="gu_imgBox">
            <img
              v-for="(val,ind) in item.courseDiscussionPictures"
              :key="ind"
              :src="val.discussionThumbUri"
              @click.stop="showImg(val,item)"
              style="margin-right:0.31rem"
            />
          </div>
          <p>
            <time class="fz12 c9">{{item.createTime}}</time>
            <span class="c9 fz12 pingjiaActive" v-if="item.starNum>0">
              <!-- <i class="iconfont icon-pingjiaActive c4a5"></i>+{{item.starNum}} -->
            </span>
            <!-- <span class="fr fz12 c9 ml-20"><i class="iconfont icon-pinglun mr-5"></i>{{item.clickNum}}</span> -->
          </p>
          <div class="gu_giveLike_Pinglun app-z-star" style="position: relative;">
            <span class="fz13 c9" style="position: absolute; left: 0;">浏览量 {{item.clickNum}}</span>
            <!-- pingjiaActive -->
            <span class="c9 fz12" style="display:inline-block">
              <span>
                <img style="width:1rem;height:1rem" src="../../../static/img/messCou.png" />&nbsp;
                <!-- <i class="iconfont icon-pinglun"></i> -->
                {{item.discussionNum||""}}
              </span>
            </span>
            <span class="fr fz12 c9 ml-20" v-if="item.isLiked">
              <img
                style="width:1rem;height:1rem"
                @click.stop="giveLike(item.courseDiscussionId,item)"
                src="../../../static/img/starClick.png"
              />
              <!-- <i class="iconfont icon-xihuanActive mr-5" 
              @click.stop='giveLike(item.courseDiscussionId,item)'></i>-->
              &nbsp;{{item.likeNum||""}}
            </span>
            <span class="fr fz12 c9 ml-20" v-else>
              <img
                style="width:1rem;height:1rem"
                @click.stop="giveLike(item.courseDiscussionId,item)"
                src="../../../static/img/star.png"
              />
              <!-- <i class="iconfont icon-xihuan mr-5" 
              @click.stop='giveLike(item.courseDiscussionId,item)'></i>-->
              &nbsp;{{item.likeNum||""}}
            </span>
          </div>
        </div>
      </li>
    </ul>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <img :src="imgUrl" alt />
    </mt-popup>
    <mt-popup v-model="popupVisible1" position="bottom" class="App-popup">
      <div class="popupBox" v-if="UserId == userInfo.studentId">
        <mt-button @click="removeTieZi" class="sure">删除</mt-button>
      </div>
      <div class="popupBox" v-else>
        <mt-button @click="goMyChatMessage" class="sure">私信</mt-button>
      </div>
    </mt-popup>
    <ScrollBottom
      @timer="timer"
      :moreTit="chairListMore"
      :FiexTop="FiexTop"
      :FiexTopAdd="FiexTopAdd"
      ref="mychild"
    />
  </div>
</template>
<script>
import { computingTime } from "../../public/utils";
import ScrollBottom from "@/component/ScrollBottom";
import { getUserInfoCookie } from "../../public/index";
import { mapActions, mapState } from "vuex";
export default {
  name: "chanjiehomeworksunlist",
  props: {
    data: {
      type: null,
      require: true
    },
    typeSun: {
      type: null
    },
    FiexTop: {
      type: null
    },
    FiexTopAdd: {
      type: null
    }
  },
  components: {
    ScrollBottom
  },
  data() {
    return {
      popupVisible: false, //控制弹窗
      popupVisible1: false, //控制弹窗
      imgUrl: "",
      userInfo: {}, // 获取个人信息
      UserId: "", //用户Id
      DiscussionId: "", //帖子id
      Private: null,
      moreTit: "加载更多",
      Timingopen: null,
      index: 1,
      DisShowFlag: false //有查看全文
    };
  },
  computed: {
    ...mapState({
      chairListMore: state => state.chairListMoreStore.sunMore,
      //帖子点赞数据
      chanJieDetailHomeWorkSunTieZiGiveLikeData: state =>
        state.chanJieDetailStore.chanJieDetailHomeWorkSunTieZiGiveLikeData,
      //删除帖子数据
      chanJieDetailHomeWorkSunRemoveTieZiData: state =>
        state.chanJieDetailStore.chanJieDetailHomeWorkSunRemoveTieZiData,
      //单阶晒作业
      chanJieDetailHomeWorkSunList: state =>
        state.chanJieDetailStore.chanJieDetailHomeWorkSunList,
      SunIndex: state => state.chanJieDetailStore.SunIndex
    })
  },
  mounted() {
    this.index = 1;
    this.userInfo = JSON.parse(getUserInfoCookie());
  },
  methods: {
    computingTime,
    //加载更多
    timer(fn) {
      if (this.moreTit == "暂时都在这里了...") {
        return;
      }
      fn = null; //关闭滚动条
      let that = this;
      that.getchangesunMore("正在加载...");
      that.Timingopen = setInterval(function() {
        that.getMoreList();
      }, 1000);
    },
    getMoreList() {
      clearInterval(this.Timingopen);
      this.getChangeSunIndex();
      let chanJieId = window.localStorage.getItem("chanJieId");
      this.$axios.post("/coursediscussion/listforweb", {
          courseId: this.$route.query.id || chanJieId,
          courseType: 1,
          pageIndex: this.SunIndex,
          token: "",
          sortType: this.typeSun
        }).then(res => {
          //console.log(res);
          let newarr = res.data.result.courseDiscussionResponseVos;
          if (newarr.length == 0) {
            this.getchangesunMore("暂时都在这里了...");
            this.$refs.mychild.gets();
            return;
          } else {
            newarr.forEach((item, i) => {
              //截取p标签
              if(item.content){

              if (item.content.slice(0, 3) == "<p>") {
                (item.content = item.content.slice(3, item.content.length - 4)),
                  item.content.length;
              }
              if (item.content.substring(item.content.length - 4) == "<br>") {
                item.content = item.content.slice(0, item.content.length - 4);
              }
              //截取最后的空格
              if (item.content.substring(item.content.length - 6) == "&nbsp;") {
                item.content = item.content.slice(0, item.content.length - 6);
              }
              }

              item.createTime = this.computingTime(item.createTime);
              this.data.courseDiscussionResponseVos.push(item);
            });
            this.getchangesunMore("加载更多");
            this.$refs.mychild.get();
          }
        });
    },
    ...mapActions({
      //帖子点赞方法
      getChanJieDetailHomeWorkSunTieZiGiveLikeAction:
        "chanJieDetailStore/getChanJieDetailHomeWorkSunTieZiGiveLikeAction",
      //删除帖子
      getChanJieDetailHomeWorkSunRemoveTieZiAction:
        "chanJieDetailStore/getChanJieDetailHomeWorkSunRemoveTieZiAction",
      //page
      getChangeSunIndex: "chanJieDetailStore/getChangeSunIndex",
      getchangesunMore: "chairListMoreStore/getchangesunMore"
    }),
    showImg(item, items) {
      items.clickNum++;
      this.$axios
        .post("/coursediscussion/addBrowseNum", {
          id: items.courseDiscussionId
        })
        .then(res => {
          //console.log(res.data);
        });
      this.ShowViewer(item.discussionOriginalPicture);
    },
    //私信点开
    showLetter(id, DiscussionId, item) {
      this.popupVisible1 = true;
      this.UserId = id;
      this.DiscussionId = DiscussionId;
      this.Private = item;
      //console.log("我是什么数据", this.Private);
    },
    //帖子点赞
    async giveLike(id, item) {
      await this.getChanJieDetailHomeWorkSunTieZiGiveLikeAction(
        this.disposedata2(id)
      );
      if (this.chanJieDetailHomeWorkSunTieZiGiveLikeData.msg == "请求成功") {
        item.isLiked = true;
        item.likeNum++;
      } else if (
        this.chanJieDetailHomeWorkSunTieZiGiveLikeData.code == 600001
      ) {
        this.$Toast(this.chanJieDetailHomeWorkSunTieZiGiveLikeData.msg);
      }
    },
    //删除帖子
    async removeTieZi() {
      await this.getChanJieDetailHomeWorkSunRemoveTieZiAction(
        this.disposedata1()
      );
      if (this.chanJieDetailHomeWorkSunRemoveTieZiData.msg == "请求成功") {
        this.$Toast("删除成功");
        this.popupVisible1 = false;
        this.$emit("homeWorkSunParent");
      } else {
        this.$Toast("删除失败");
      }
    },
    //进入聊天
    goMyChatMessage() {
      //console.log(this.Private, "objobj");
      //mychatmessage
      //mymessageall
      this.$router.push({
        name: "mymessageall",
        params: {
          info: this.Private,
          iswork:'Sun'
        }
      });
    },
    //去往讨论页面
    goDiscuss(id, item) {
      item.clickNum++;
      this.$axios
        .post("/coursediscussion/addBrowseNum", {
          id: item.courseDiscussionId
        })
        .then(res => {
          //console.log(res.data);
        });
      this.Private = item;
      // //console.log(this.Private,'this.Privatethis.Private')
      // return
      window.localStorage.setItem(
        "Privateletter",
        JSON.stringify(this.Private)
      );
      this.$router.push({
        path: "/chanjiedetaildiscuss",
        query: {
          id
        }
      });
    },
    //处理公共数据2  帖子删除数据
    disposedata1(id) {
      let data = {
        homeworkFinishId: this.DiscussionId,
        token: ""
      };
      return data;
    },
    //处理公共数据2  帖子点赞数据
    disposedata2(id) {
      let data = {
        id,
        token: ""
      };
      return data;
    }
  }
};
</script>
<style lang='scss' scoped>
.pos_r_boxLeijc{
    display: flex;
    justify-content: space-between;
}
.pos_r_leftLeijc{
    display: flex;
}
.boxElss {
  max-width: 9rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
}
.app-lv-sunp-cha-right {
  line-height: 1.7rem;
  letter-spacing: 0.5px;
  color: #07767a;
  text-align: left;
}
.App-popup {
  // background: red;
  width: 100%;
  text-align: center;
  height: 3rem;
  line-height: 3rem;
}
.app-lv-sunp-height{
  height: auto;
   color: #555 !important;
  letter-spacing: 0.5px;
  line-height: 1.5rem;
  .spanPre{
    white-space:pre;
    white-space: pre-wrap;           /* css-3 */
    white-space: -moz-pre-wrap;      /* Mozilla, since 1999 */
    white-space: -pre-wrap;          /* Opera 4-6 */
    white-space: -o-pre-wrap;        /* Opera 7 */
    word-wrap: break-word;           /* Internet Explorer 5.5+ */
    height: auto;
    display: block;
  }
}
.app-lv-sunp {
  letter-spacing: 0.5px;
  line-height: 1.5rem;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:8;
  word-break:break-all;
  text-overflow:ellipsis;
  overflow:hidden;
  min-height: 12rem;
  color: #555 !important;
  word-break: break-all;
  .spanPre{
    white-space:pre;
    white-space: pre-wrap;           /* css-3 */
    white-space: -moz-pre-wrap;      /* Mozilla, since 1999 */
    white-space: -pre-wrap;          /* Opera 4-6 */
    white-space: -o-pre-wrap;        /* Opera 7 */
    word-wrap: break-word;           /* Internet Explorer 5.5+ */
    height: auto;
    display: block;
  }
}
.app-lv-sunp-cha {
  line-height: 1.5rem;
  letter-spacing: 0.5px;
  color: #07767a;
  text-align: right;
}
.app-z-star {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.My_ChairList-evaluation ul li > div p.fz15.c30 + div img {
  width: 31%;
  margin-right: 0.5px;
  font-size: 0;
  object-fit: cover;
}
.gu_imgBox {
  margin-bottom: 1rem;
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 0.18rem;
  }
}
.gu_allLike {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.More-model {
  position: absolute;
  bottom: -1rem;
}
.My_ChairList-evaluation ul li > article {
  width: 2.8125rem;
  height: 2.8125rem;
  border-radius: 100%;
  float: left;
  margin-right: 0.625rem;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
  }
}
.My_ChairList-evaluation ul li > img {
  object-fit: cover;
}
.My_ChairList-evaluation ul li > img {
  transform: translateY(-0.5rem);
  object-fit: cover;
}
.c9.gu_c9.mt-10 {
  color: #555 !important;
  margin-top: 0.83rem !important;
}
.c9.fz12.pingjiaActive {
  margin-left: 0.68rem;
  i {
    display: inline-block;
    transform: translateY(-0.1rem);
  }
  .My_ChairList-evaluation ul li > article {
    width: 2.8125rem;
    height: 2.8125rem;
    border-radius: 100%;
    float: left;
    margin-right: 0.625rem;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .My_ChairList-evaluation ul li > img {
    object-fit: cover;
  }
  .My_ChairList-evaluation ul li > img {
    transform: translateY(-0.5rem);
    object-fit: cover;
  }
  .c9.gu_c9.mt-10 {
    color: #333 !important;
    margin-top: 0.83rem !important;
  }
  .c9.fz12.pingjiaActive {
    margin-left: 0.68rem;
    i {
      display: inline-block;
      transform: translateY(-0.1rem);
    }
  }
  .gu_giveLike_Pinglun {
    text-align: right;
    line-height: 1.4rem;
    .iconfont.icon-pinglun {
      display: inline-block;
      font-size: 1.2rem;
      margin-right: 0.375rem;
      transform: translateY(-0.1rem) !important;
    }
    .iconfont.icon-xihuan.mr-5 {
      font-size: 1.1875rem;
      margin-right: 0.375rem;
    }
    .iconfont.icon-xihuanActive {
      font-size: 1.1875rem;
    }
  }
  .My_ChairList-evaluation ul li > div > p {
    margin-bottom: 0.93rem;
  }
  .mint-popup {
    background: red !important;
  } // .mint-popup .mint-popup-bottom {
  //     width: 100%;
  //     height: 3.0625rem;
  //     line-height: 3.0625rem;
  //     padding-top: .2rem;
  //     background:red !important
  // }
  .popupBox {
    width: 100%;
    .sure {
      width: 100%;
      text-align: center;
      line-height:  2.5rem;
      font-size: 1rem;;
      color: #000;
    }
  }
}
</style>