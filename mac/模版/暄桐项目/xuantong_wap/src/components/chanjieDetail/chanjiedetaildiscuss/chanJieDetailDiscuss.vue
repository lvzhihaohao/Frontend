<template>
  <div id="chanJieDetailDiscuss" style="overflow: auto;-webkit-overflow-scrolling : touch;">
    <article class="nav-title" v-if="!this.$flag">
      <mt-header title="讨论" fixed>
        <a href="javascript:void(0);" slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    </article>
   
    <img
     :style="{'z-index':discussFlag?'1':'0'}"
      src="../../../../static/img/back.png"
      v-if="this.$flag"
      @click="goBack"
      style="top:1rem;left:.78rem;width:1.25rem;height:1.25rem;position:fixed;"
    />
    <section>
      <article class="Chanjie pl-30 pr-30" style="marginTop:0;paddingTop:2.5rem" @touchmove="auto">
        <!--evaluation 全部评价  二级评论信息-->
        <div class="My_ChairList-evaluation">
          <ul v-if="chanJieDetailDiscussData">
            <li>
              <!-- <img src="../../../../static/mobile_img/Classroom_teacher3.png"
              :data-src='chanJieDetailDiscussData.discussHeadUri'>-->
              <img style="object-fit: cover;    border-radius: 50%;" :src="chanJieDetailDiscussData.discussHeadUri" />
              <div>
                <p style="position: relative;">
                  <span class="c9">
                    {{ chanJieDetailDiscussData.discussUser}}
                    <!-- 小山 -->
                    <!-- <span class="c9 fz12 pingjiaActive " v-if="chanJieDetailDiscussData.discussionNum>0"> -->
                    <img
                      src="../../../../static/mobile_img/checkPoint_praise2.png"
                      v-if="chanJieDetailDiscussData.starNum>0"
                      style="width:1.125rem;height:1.2rem;position: absolute;margin-left:0.5rem;opacity: 0.8;"
                    />
                    <span style="margin-left: 1.8rem;    line-height: 1.4rem;" v-if="chanJieDetailDiscussData.starNum>0" class="fz12">
                      <!-- <span class="fz14">+</span> -->
                      {{chanJieDetailDiscussData.starNum}}
                    </span>
                    <!-- </span> -->
                  </span>
                  <i class="fr c9 iconfont icon-more" @click="showLetter"></i>
                  <!-- <ul class="More-model" v-if='flag'>     
                                    <li v-if='chanJieDetailDiscussData.discussUserId == userInfo.studentId'
                                        @click.stop='removeTieZi(chanJieDetailDiscussData.courseDiscussionId)'>
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
                </p>
                <!-- <div class="fz15 c30 app-lv-dico3y" v-if="!DisShowWf">
                
              <span
                class="app-lv-dico3y-sp"
                style="display:block"
                v-html="chanJieDetailDiscussData.content"
              ></span>
                </div>-->
                <p class="fz15 c30 app-lv-dico3y2 spanPre" v-html="chanJieDetailDiscussData.content"></p>
                <!-- <p v-if="DisShowFlag"  class="app-lv-show-p" @click="applvshowp">展开<p>
                <p v-if="DisShowWf"  class="app-lv-show-p" @click="applvhide">收起<p>-->
                <div v-if="chanJieDetailDiscussData" class="app-z-evaluation-imgList">
                  <img
                    :src="item.discussionThumbUri"
                    v-for="(item,index) in chanJieDetailDiscussData.courseDiscussionPictures"
                    :key="index"
                    :data-src="item.discussionThumbUri"
                    @click="showImg(item)"
                  />
                </div>
                <p class="mt-15 app-z-pingjiaActive">
                  <time class="fz12 c9">{{chanJieDetailDiscussData.createTime}}</time>
                  <!-- <i class="iconfont icon-pingjiaActive c4a5 app-z-iconfont"></i> -->

                  <span class="app-z-parise">
                    <span class="c9 fz12 pingjiaActive" @click="RepalBottom">
                      <!-- <i class="iconfont icon-pinglun"></i>  -->
                      <img style="width:1rem;height:1rem" src="../../../../static/img/messCou.png" />
                      &nbsp;
                      {{chanJieDetailDiscussData.discussionNum||""}}
                    </span>
                    <span class="fr fz12 c9 ml-20" v-if="chanJieDetailDiscussData.isLiked">
                      <!-- <i
                    class="iconfont icon-xihuanActive mr-5"
                    @click.stop="giveLike(chanJieDetailDiscussData.courseDiscussionId)"
                      ></i>-->
                      <img
                        style="width:1rem;height:1rem"
                        @click.stop="giveLike(chanJieDetailDiscussData.courseDiscussionId)"
                        src="../../../../static/img/starClick.png"
                      />
                      &nbsp;
                      {{chanJieDetailDiscussData.likeNum||""}}
                    </span>

                    <span class="fr fz12 c9 ml-20" v-else>
                      <!-- <i
                    class="iconfont icon-xihuan mr-5"
                    @click.stop="giveLike(chanJieDetailDiscussData.courseDiscussionId)"
                      ></i>-->
                      <img
                        style="width:1rem;height:1rem"
                        @click.stop="giveLike(chanJieDetailDiscussData.courseDiscussionId)"
                        src="../../../../static/img/star.png"
                      />
                      &nbsp;
                      {{chanJieDetailDiscussData.likeNum||""}}
                    </span>
                  </span>
                  <!-- <span class="fr fz12 c9 ml-20"><i class="iconfont icon-xihuanActive mr-5"></i>1129</span>
                  <span class="fr fz12 c9 ml-20"><i class="iconfont icon-pinglun mr-5"></i>996</span>-->
                </p>
              </div>
            </li>
          </ul>
        </div>
      </article>
      <!-- 分割线灰色 -->
      <!-- 评论内容-评论区  三级回复信息-->
      <div class="commentsBorder commentsBorderLeijc">
        <DiscussList
          ref="discussList"
          v-if="discussList.size"
          @faterfocus="faterfocus"
          :data="discussList"
          @changediscussFlag="changediscussFlag"
          @discussParent="discussParent"
          :types="types"
          :id="chanJieDetailDiscussData && chanJieDetailDiscussData.courseDiscussionId"
        />
      </div>
    </section>
    <!-- 图片放大框 -->
    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
        <img :src="imgUrl" alt />
    </mt-popup>
      <!-- 底部弹出框 -->
      <mt-popup v-model="popupVisible1" position="bottom">
        <div class="popupBox" v-if="chanJieDetailDiscussData.discussUserId == userInfo.studentId">
          <mt-button
            @click="removeTieZi(chanJieDetailDiscussData.courseDiscussionId)"
            class="sure"
          >删除</mt-button>
        </div>
        <div class="popupBox" v-else>
          <mt-button @click="goMyChatMessage" class="sure">私信</mt-button>
        </div>
      </mt-popup>
      
    <footer v-if="discussFlag"> 
      <!-- 评论组件 -->
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
import { getUserInfoCookie } from "@/public/index";
import DiscussList from "@/component/chanJieDetail/discussList";
export default {
  name: "chanjiedetaildiscuss",
  computed: {
    ...mapState({
      //帖子详情数据
      chanJieDetailDiscussData: state =>
        state.chanJieDetailDiscussStore.chanJieDetailDiscussData,
      //帖子讨论列表数据
      discussList: state => state.chanJieDetailDiscussStore.discussList,
      //删除帖子数据
      chanJieDetailHomeWorkSunRemoveTieZiData: state =>
        state.chanJieDetailStore.chanJieDetailHomeWorkSunRemoveTieZiData
    })
  },
  data() {
    return {
      discussFlag:true,
      sendText: "发表",
      replayText: "说说你的想法吧", //用于存储名字,
      imgUrl: "",
      popupVisible: false, //控制弹窗显示隐藏
      popupVisible1: false, //控制弹窗显示隐藏
      userInfo: {},
      types: "chanjie",
      DiscussId: "", //讨论id
      DisShowFlag: false, //展开
      DisShowWf: false ,//收起
      myChatMessage:false
    };
  },
  components: { 
    DiscussList,
    discussListRich
  },
  mounted() {
    if (this.$flag) {
      document.getElementsByClassName("Chanjie")[0].style = "margin-top:0;";
    } else {
      document.getElementsByClassName("Chanjie")[0].style =
        "margin-top:2.5rem;";
    }
    if (this.$route.query.id) {
      this.DiscussId = this.$route.query.id;
      window.localStorage.setItem("DiscussId", this.$route.query.id);
    } else {
      this.DiscussId = window.localStorage.getItem("DiscussId");
    }
    //帖子详情
    this.getChanJieDetailDiscussAction(this.disposedata2(this.DiscussId * 1));
    //评论列表
    this.getDiscussListAction(this.disposedata3(this.DiscussId * 1));
    this.userInfo = JSON.parse(getUserInfoCookie());
    // let that = this
    // setTimeout(()=>{
    //   if(document.getElementsByClassName('app-lv-dico3y-sp')[0].childNodes[0].clientHeight/16>4.5){
    //       that.DisShowFlag = true
    //   }
    // },200)
  },
  beforeRouteEnter(to, from, next) {
    let chanjieDetailDiscussUrl = window.localStorage.getItem(
      "chanjieDetailDiscussUrl"
    );
    if (from.path == "/chanjiedetaildiscussall") {
      if (chanjieDetailDiscussUrl) {
        window.localStorage.setItem(
          "chanjieDetailDiscussUrl",
          chanjieDetailDiscussUrl
        );
      }
    }
    if (from.path == "/mychatmessage" || from.path == "/chanjiedetaildiscussall") {
      //console.log('vm.myChatMessagevm.myChatMessage')
      next(vm=>{
        vm.myChatMessage = true
     })
          
    } else {
      window.localStorage.setItem("chanjieDetailDiscussUrl", from.path);
    }
    next();
  },
  methods: {
    changediscussFlag(tyep){
      //console.log(tyep,'tyeptyeptyeptyeptyep')
      this.discussFlag = tyep
    },
    //带@子集评论
    faterfocus(name) {
      //console.log(name, "namenamename");
      if (name) {
        this.replayText = name;
      }
      this.$nextTick(()=>{
         this.$refs.RichText.focus();
      })
      if(this.$refs){
        
      }
      //console.log(this.$refs)
     

    },
    //处理数据发送
    InitReply(html, length) {
      this.$refs.discussList.InitReply(html, length);
      this.replayText = '说说你的想法吧'
      this.getDiscussionNum(this.DiscussId)
    },
    //禁止页面滑动
    auto() {
      // this.$refs.RichText.auto(); 
      this.$refs.RichText.blurs()
    },
    //父级不带@评论
    RepalBottom() {
      this.replayText = "说说你的想法吧";
      this.$refs.RichText.focus();
      // //console.log(this.$refs.discussList.BackFour())
    },
    applvshowp() {
      this.DisShowFlag = false;
      this.DisShowWf = true;
      //console.log(
      //   (document.getElementsByClassName("app-lv-dico3y")[0].style.height =
      //     "auto")
      // );
    },
    applvhide() {
      this.DisShowFlag = true;
      this.DisShowWf = false;
    },
    ...mapActions({
      //帖子点赞
      praisePost: "chanJieDetailDiscussStore/praisePost",
      //帖子详情
      getChanJieDetailDiscussAction:
        "chanJieDetailDiscussStore/getChanJieDetailDiscussAction",
      //帖子讨论列表
      getDiscussListAction: "chanJieDetailDiscussStore/getDiscussListAction",
      //删除帖子
      getChanJieDetailHomeWorkSunRemoveTieZiAction:"chanJieDetailStore/getChanJieDetailHomeWorkSunRemoveTieZiAction",
        getActionLive:"chanJieDetailStore/getActionLive",
        getDiscussionNum:"chanJieDetailStore/getDiscussionNum",
    }),
    // 点赞 回复 删除 触发刷新列表数据
    discussParent() {
      this.getDiscussListAction(this.disposedata3(this.DiscussId));
      this.getChanJieDetailDiscussAction(this.disposedata2(this.DiscussId * 1));
    },
    showImg(item) {
      // this.popupVisible = true;
      // this.imgUrl = item.discussionThumbUri
      this.ShowViewer(item.discussionThumbUri);
    },
    // 弹出回复框
    showLetter() {
      this.popupVisible1 = true;
    },

    goBack() {
      //console.log('999')
      let chanjieDetailDiscussUrl = window.localStorage.getItem(
        "chanjieDetailDiscussUrl"
      );
      if(this.myChatMessage){
         //console.log('999999999999999999999')
          this.$router.push({
          path: '/chanjiedetail'
        });
        return
      }
      // 暂时弃用
      // this.$router.push({
      //   path: '/chanjiedetail'
      // });
      this.$router.back();
    },
    //去往系统消息页面
    goMyChatMessage() {
      //console.log(
      //   JSON.parse(window.localStorage.getItem("Privateletter"), "obj")
      // );
      this.$router.push({
        name: "mymessageall",
        params: {
          info: JSON.parse(window.localStorage.getItem("Privateletter")),
          iswork:'SunList'
        }
      });
    },
    // 删除帖子
    async removeTieZi(id) {
      await this.getChanJieDetailHomeWorkSunRemoveTieZiAction(
        this.disposedata1(id)
      );
      if (this.chanJieDetailHomeWorkSunRemoveTieZiData.msg == "请求成功") {
        this.$Toast({
          message: "删除成功",
          duration: 1000
        });
        setTimeout(() => {
          this.$router.back(-1);
        }, 10);
      } else {
        this.$Toast("删除失败");
      }
    },
    //帖子点赞
    giveLike(id) {
      this.$axios
        .post("/coursediscussion/praise", { id, token: "" })
        .then(res => {
          this.getActionLive(id)
          if (res.data.code == 0) {
            this.getChanJieDetailDiscussAction(
              this.disposedata2(this.DiscussId * 1)
            );
          }
          this.$Toast(res.data.msg);
        });
    },
    //处理公共数据2  帖子删除数据
    disposedata1(id) {
      let data = {
        homeworkFinishId: id,
        token: ""
      };
      return data;
    },
    //处理公共数据2  帖子详情数据
    disposedata2(id) {
      let data = {
        id: this.$route.query.id || id,
        token: ""
      };
      return data;
    },
    //处理公共数据3 帖子讨论列表
    disposedata3(id) {
      let data = {
        id: this.$route.query.id || id,
        pageIndex: 1,
        token: ""
      };
      return data;
    }
  }
};
</script>
<style lang="scss" scoped>
.spanPre{
  height: auto;
    white-space:pre;
    word-break: break-all;
    white-space: pre-wrap;           /* css-3 */
    white-space: -moz-pre-wrap;      /* Mozilla, since 1999 */
    white-space: -pre-wrap;          /* Opera 4-6 */
    white-space: -o-pre-wrap;        /* Opera 7 */
    word-wrap: break-word;           /* Internet Explorer 5.5+ */
    display:block;
}
.app-lv-dico3y2 {
  letter-spacing: 0.5px;
  line-height: 1.5rem;
}
.app-lv-dico3y {
  letter-spacing: 0.5px;
  line-height: 1.5rem;
  max-height: 4.6rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.app-lv-show-p {
  color: #07767a;
  text-align: right;
}
.mint-popup.mint-popup-bottom {
  width: 100%;
  height: 3.0625rem;
  line-height: 3.0625rem;
  padding-top: 0.2rem;
}
.popupBox {
  width: 100%;
  
  .sure {
    width: 100%;
  
    text-align: center;
    line-height: 2.5rem;
    font-size: 1rem;;
    color: #000;
  }
}
#chanJieDetailDiscuss {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .nav-title {
    flex-shrink: 0;
  }
  section {
    flex: 1;
    overflow-y: auto;
  }
  footer {
    height: 3rem;
    flex-shrink: 0;
  }
  .commentsBorder {
    padding-top: 12px;
  }
}
.app-z-evaluation-imgList {
  & > img {
    width: 5rem !important;
    height: 5rem;
    object-fit: cover;
    border-radius: 0.18rem;
    margin-right: 0.31rem;
  }
}

.app-z-pingjiaActive {
  .app-z-iconfont {
    display: inline-block;
    -webkit-transform: translateY(-0.1rem);
    transform: translateY(-0.1rem);
  }
  .app-z-parise {
    // float: right;
    margin-top: 0.9375rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span {
      display: flex;
      align-items: center;
    }
    i {
      font-size: 1.1875rem;
      margin-right: 0.375rem;
    }
    .icon-pinglun {
      font-size: 1.2rem;
    }
    .icon-pinglun {
    }
  }
  .pingjiaActive {
    margin-left: 0.5rem;
  }
}
.icon-pinglun {
  font-size: 1.2rem;
}
</style>

