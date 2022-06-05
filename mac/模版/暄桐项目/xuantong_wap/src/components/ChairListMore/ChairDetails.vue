<template>
  <div id="chairDetails" style="overflow: auto;-webkit-overflow-scrolling : touch;">
    <article class="nav-title" v-if="!this.$flag">
      <mt-header title="视频详情">
        <a href="javascript:void(0);" slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    </article>
    <div :class="this.$flag?'content':'content padd3'">
      <!--mobile_content 固定底部的话+add -->
      <article class="My_ChairList">
        <img
          src="../../../static/img/back.png"
          class="gu_nav_title_img"
          v-if="this.$flag"
          @click="goBack"
        />
        <div class="videoContent">
          <Videos v-if="flag" :data="chairMoreListDetail" :url="Rurl" :index="0" />
          <div class="evaluation">
            <h3 class="fz18 pt-15 c000 fw0 app-z-fonS">{{chairMoreListDetail.courseName}}</h3>
            <div class="fz15 c5 pt-10 abstract">
              <section v-if="htmlShow" class="noActive fz15 c9">
                {{ chairMoreListDetail.courseAbstract&&chairMoreListDetail.courseAbstractNum>30?chairMoreListDetail.courseAbstract.slice(0,30):chairMoreListDetail.courseAbstract }}
                <span
                  v-if="htmlShow&&chairMoreListDetail.courseAbstractNum>30"
                >...</span>
                <span
                  v-if="htmlShow&&chairMoreListDetail.courseAbstractNum>30"
                  class="fz15 c077"
                  @click="htmlShows"
                >{{htmlShow == true ?'展开' :'收起'}}</span>
              </section>
              <section v-if="!htmlShow" class="active fz15 c9">
                {{chairMoreListDetail.courseAbstract}}
                <span class="zhanweifu"></span>
              </section>
              <span
                v-if="!htmlShow"
                class="fz15 c077 unfold"
                @click="htmlShows"
              >{{htmlShow == true ?'展开' :'收起'}}</span>
            </div>
            <section class="mt-5 flexon borderNone">
              <time class="fz15 c9">{{chairMoreListDetail.publishTime}}</time>
              <span>
                <i class="kankan">
                  <img src="../../../static/img/kankan.png" alt />
                </i>
                <p class="fz15 c9 dis_in_block">{{chairMoreListDetail.clickVolume}}</p>
              </span>
              <span @click="RepalBottom">
                <i class="messCou">
                  <img src="../../../static/img/messCou.png" alt />
                </i>
                <p class="fz15 c9 dis_in_block">{{chairMoreListDetail.commentNum}}</p>
              </span>
              <div class="attention">
                <span v-if="chairMoreListDetail.isLiked" @click="giveLike()">
                  <i class="starClick">
                    <img src="../../../static/img/starClick.png" alt />
                  </i>
                  <p class="fz15 c9 dis_in_block">{{chairMoreListDetail.likeNum}}</p>
                </span>
                <span v-else @click="giveLike()">
                  <i style="color:#999" class="star">
                    <img src="../../../static/img/star.png" alt />
                  </i>
                  <p class="fz15 c9 dis_in_block">{{chairMoreListDetail.likeNum}}</p>
                </span>
              </div>
            </section>
            <!-- <section class=" mt-5">
                                    <time class="fz15 c9">{{chairMoreListDetail.publishTime}}</time>
                                    <p class=" dis_inline fr">
                                        <span>
                                            <i class="iconfont icon-yulan"></i>
                                            {{chairMoreListDetail.clickVolume}}
                                        </span>
                                        <span>
                                            <i class="iconfont icon-pinglun"></i>
                                            {{chairMoreListDetail.commentNum}}
                                        </span>
                                        <span v-if='chairMoreListDetail.isLiked' @click='giveLike()'>
                                            <i class="iconfont icon-xihuanActive"></i>
                                            {{chairMoreListDetail.likeNum}}
                                        </span>
                                        <span v-else @click='giveLike()'>
                                            <i class="iconfont icon-xihuan"></i>
                                            {{chairMoreListDetail.likeNum}}
                                        </span>
                                    </p>
            </section>-->
          </div>
        </div>
        <!--评论区-->
        <!-- <div class="">pl-30 pr-30  去掉是因为整体布局 - width  -->
        <!--evaluation 全部评价 -->
        <div class="commentsBorder" v-if="discussList.size">
          <DiscussList
            ref="discussList"
            @faterfocus="faterfocus"
            :data="discussList"
            :id="chairMoreListDetail.discussionId"
            @chairParent="chairParent"
          />
        </div>
        <!-- </div> -->
      </article>
    </div>
    <footer>
      <discussListRich
        ref="RichText"
        :InitReply="InitReply"
        :replayText="replayText"
        :sendText="sendText"
      />
    </footer>
  </div>
</template>
<script>
import discussListRich from "@/component/editer/RichText";
import { mapState, mapActions } from "vuex";
import DiscussList from "@/component/chanJieDetail/discussList";
import Videos from "@/component/video_old.vue";
export default {
  name: "homework",
  data() {
    return {
      discussFlag: true,
      sendText: "发表",
      replayText: "说说你的想法吧", //用于存储名字,
      htmlShow: true,
      flag: false,
      Rurl: ""
    };
  },
  components: {
    DiscussList,
    Videos,
    discussListRich
  },
  beforeRouteEnter(to, from, next) {
    let chairDetailsUrl = window.localStorage.getItem("chairDetailsUrl");
    if (
      from.path == "/chanjiedetaildiscussall" ||
      from.path == "/" ||
      from.path == "/phonelogin" ||
      from.path == "/emaillogin"
    ) {
      if (chairDetailsUrl) {
        window.localStorage.setItem("chairDetailsUrl", chairDetailsUrl);
      }
    } else {
      window.localStorage.setItem("chairDetailsUrl", from.path);
    }
    next();
  },
  computed: {
    ...mapState({
      //免费视频详情数据
      chairMoreListDetail: state =>
        state.chairListMoreStore.chairMoreListDetail,
      //免费视频点赞返回数据
      coursefreeGiveLikeData: state => state.indexStore.coursefreeGiveLikeData,
      //帖子讨论列表数据
      discussList: state => state.chanJieDetailDiscussStore.discussList
    })
  },
  methods: {
    //带@子集评论
    faterfocus(name) {
      //console.log(name, "namenamename");
      if (name) {
        this.replayText = name;
      }
      this.$refs.RichText.focus();
    },
    //处理数据发送
    InitReply(html, length) {
      //console.log(html,'html')
      // return
      this.$refs.discussList.InitReply(html, length);
      this.replayText = "说说你的想法吧";
    },
    //禁止页面滑动
    auto() {
      this.$refs.RichText.auto();
    },
    RepalBottom() {
      this.replayText = "说说你的想法吧";
      this.$refs.RichText.focus();
      //    this.$refs.discussList.BackFour()
    },
    ...mapActions({
      //免费视频详情方法
      getChairListMoreDetailAction:
        "chairListMoreStore/getChairListMoreDetailAction",
      //免费视频点赞
      getIndexCoursefreeGiveLikeAction:
        "indexStore/getIndexCoursefreeGiveLikeAction",
      //课程帖子列表
      getDiscussListAction: "chanJieDetailDiscussStore/getDiscussListAction"
    }),
    // 回复 点赞 触发视频列表
    chairParent() {
      this.getDiscussListAction(this.disposedata3());
    },
    goBack() {
      let chairDetailsUrl = window.localStorage.getItem("chairDetailsUrl");
      this.$router.push({
        path: chairDetailsUrl
      });
    },
    //处理公共数据3 帖子讨论列表(课程帖子列表)
    disposedata3() {
      let data = {
        id: this.chairMoreListDetail.discussionId,
        pageIndex: 1,
        token: ""
      };
      return data;
    },
    //处理视频详情数据
    disposedata2() {
      let id = window.localStorage.getItem("chairDetailId");
      let data = {
        courseFreeId: this.$route.query.id || id,
        token: ""
      };
      return data;
    },
    async giveLike() {
      await this.getIndexCoursefreeGiveLikeAction(this.disposedata2());
      if (this.coursefreeGiveLikeData.msg == "请求成功") {
        this.getChairListMoreDetailAction(this.disposedata2());
      } else if (this.coursefreeGiveLikeData.code == 600001) {
        this.$Toast(this.coursefreeGiveLikeData.msg);
      }
    },
    htmlShows() {
      this.htmlShow = !this.htmlShow;
    }
  },
  async mounted() {
    if (this.$flag) {
      document.getElementsByClassName("My_ChairList")[0].style =
        "padding-top:2.4rem";
    }
    if (this.$route.query.id) {
      window.localStorage.setItem("chairDetailId", this.$route.query.id);
    }
    //console.log(this.chairMoreListDetail);
    await this.getChairListMoreDetailAction(this.disposedata2());
    window.localStorage.setItem(
      "chairDetailDiscussId",
      this.chairMoreListDetail.discussionId
    );
    await this.getDiscussListAction(this.disposedata3());
    
     this.$nextTick(()=>{
        this.$axios
        .post("/utility/getUrl", {
          key: this.chairMoreListDetail.courseVideoUri
        })
        .then(res => {
          this.Rurl = res.data.result;
          //console.log(this.Rurl, "5555555555555");
          //   this.videoObj =  this.data;
          this.flag = true;
        });
    })
  }
};
</script>
<style lang='scss' scoped>
.borderNone{
  span{
    i{
      img{
        border-radius: 0%!important;
      }
    }
  }
}
.nav-title {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  z-index: 20;
}
.padd3 {
  padding-top: 3rem;
}
#chairDetails {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; 
  overflow: hidden;
  .content {
    flex: 1; // overflow: auto;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  footer {
    width: 100%;
    height: 3rem;
    flex-shrink: 0;
  }
}
.zhanweifu {
  width: 2rem;
  display: inline-block;
}
.mobile_content article:last-child {
  margin-bottom: 0rem;
}
.commentsBorder {
  border-top: none;
}
.fz15.c5.mt-10.abstract {
  .fz15.c9.noActive {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #555 !important;
    opacity: 0.8;
  }
  .fz15.c9.active {
    overflow-x: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: none !important;
    color: #555 !important;
    opacity: 0.8;
  }
}
.unfold {
  float: right;
  position: relative;
  display: flex;
  background: #fff;
  text-align: center;
  top: -1.3rem;
  right: 0rem;
  line-height: 1.5rem;
  background: #fff;
}
.flexon {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .attention {
    display: inline-block;
  }
  time {
    opacity: 0.6;
  }
  span {
    display: flex;
    align-items: center;
    i {
      padding: 0 0.5rem;
      height: 1rem;
      width: 1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.My_ChairList .videoContent video {
  height: 14rem !important;
}
.My_ChairList {
  position: relative;
  .gu_nav_title_img {
    width: 1.2rem;
    height: 1.2rem;
  }
}
</style>


