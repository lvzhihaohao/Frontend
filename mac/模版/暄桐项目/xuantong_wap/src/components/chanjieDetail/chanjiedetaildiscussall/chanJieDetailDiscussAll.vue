<template>
  <div id="chanJieDetailDiscussAll">
    <article class="nav-title" v-if="!this.$flag">
      <mt-header :title="title" fixed>
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
            style="top:1rem;left:.78rem;width:1.25rem;height:1.25rem;position:fixed"
          />
    <section>
    <div class="content fz15" v-if="queryObj">
      <!--evaluation 全部评价 -->
      <div class="mobile_content pl-30 pr-30" @touchmove="auto" style="padding-bottom:3rem">
        <article class="dis_flow_root">
          <!--evaluation 全部评价 -->
          
          <div class="My_ChairList-evaluation ml-30 mr-30 app-z-My_ChairList-evaluation">
            <ul>
              <li>
                <img :src="queryObj.discussHeadUri" />
                <div class="app-z-replyInfo">
                  <p class="app-z-icon">
                    <span class="c9 app-Name">{{queryObj.discussUser}}</span>
                    <span class="app-z-icon-name">
                      <span
                        class="fr fz12 c9 ml-20"
                        @click="replyPeopleReply(queryObj.discussUser,queryObj.courseDiscussionCommentId,queryObj.discussUserId,queryObj.courseDiscussionCommentId,false,queryObj)"
                      >
                        <i class="messCou">
                          <img
                            style="width:1rem;height:1rem"
                            src="../../../../static/img/messCou.png"
                            alt
                          />
                        </i>
                        {{(queryObj.courseDiscussionReplyResponseVos &&
                        queryObj.courseDiscussionReplyResponseVos.length)||""}}
                      </span>
                      <span class="fr fz12 c9 ml-20" v-if="queryObj.isLiked">
                        <i
                          class="starClick"
                          @click="replyGiveLike(queryObj.courseDiscussionCommentId)"
                        >
                          <img
                            style="width:1rem;height:1rem"
                            src="../../../../static/img/starClick.png"
                            alt
                          />
                        </i>
                        {{queryObj.likeNum||""}}
                      </span>
                      <span
                        class="fr fz12 c9 ml-20"
                        @click="replyGiveLike(queryObj.courseDiscussionCommentId)"
                        v-else
                      >
                        <i class="star">
                          <img
                            style="width:1rem;height:1rem"
                            src="../../../../static/img/star.png"
                            alt
                          />
                        </i>
                        {{queryObj.likeNum||""}}
                      </span>
                      
                    </span>
                  </p>
                  <p
                    class="fz15 c30 boxell"
                    style="margin-bottom:.625rem;line-height:1.5rem;letter-spacing: 0.5px;"
                    v-html="queryObj.content"
                  >{{queryObj.content}}</p>
                  <p>
                    <time class="fz12 c9">{{queryObj.createTime}}</time>
                  </p>
                  <p>
                    <a href="javascript:void(0);" class="c4a5 fz15" @click="seeAll">查看原文</a>
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div class="Reply_dialogue">
            <ul>
              <li v-for="(item,index) in queryObj.courseDiscussionReplyResponseVos" :key="index">
                <img :src="item.discussHeadUri" :key="item.courseDiscussionCommentId"/>
                <div class="app-z-replyInfo">
                  <p class="app-z-icon"> 
                    <span
                      @click="replyPeopleReply(item.discussUser,item.courseDiscussionCommentId,item.discussUserId,item.courseDiscussionCommentId,true,item)"
                      class="c9"
                    >
                      {{item.discussUser}}
                      <span class="c4a5 app-z-mllrr">回复：</span>
                      {{item.beReplyUser}}
                    </span>
                    <span
                      class="fr fz12 c9 ml-20 app-z-icon-name"
                      v-if="item.isLiked"
                      @click="giveLike(item.courseDiscussionCommentId)"
                    >
                      <i class="starClick">
                        <img
                          style="width:1rem;height:1rem"
                          src="../../../../static/img/starClick.png"
                          alt
                        />
                      </i>
                      {{item.likeNum||""}}
                    </span>
                    <span
                      class="fr fz12 c9 ml-20 "
                      v-else
                      @click="giveLike(item.courseDiscussionCommentId)"
                    >
                      <i class="star">
                        <img
                          style="width:1rem;height:1rem"
                          src="../../../../static/img/star.png"
                          alt
                        />
                      </i>
                      {{item.likeNum||""}}
                    </span>
                  </p>
                  <p
                    @click="replyPeopleReply(item.discussUser,item.courseDiscussionCommentId,item.discussUserId,item.courseDiscussionCommentId,true,item)"
                    :class="item.ifShow||item.contentNum<=148?'app-lv-sundetaps':'app-lv-sundetap'"
                  >
                    <span v-html="item.content"></span>
                  </p>
                  <p
                    v-if="item.contentNum>=148&&!item.ifShow"
                    @click="CommentIdHtmlShows(item.courseDiscussionCommentId)"
                    class="app-lv-sundetap-cha fz12"
                  >展开</p>
                  <p
                    v-if="item.ifShow"
                    @click="CommentIdHtmlHides(item.courseDiscussionCommentId)"
                    class="app-lv-sundetap-cha fz12"
                  >收起</p>
                  <p>
                    <time class="fz12 c9">{{item.createTime}}</time>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </article>
      </div>
      
    </div>
    <div class="gu_clear_guide" v-else>
      <img src="../../../../static/img/null-My_discussion.png" alt />
      <p class="fz15 mt-15 c3c">暂时没有哦~</p>
    </div>
    </section>
    <footer>
      <!-- 评价 -->
      <discussListRich
        :sendText="sendText"
        ref="RichText"
        :InitReply="InitReply"
        :replayText="replayText"
      />
    </footer>
    <mt-popup v-model="popupVisible" position="bottom">
      <div v-if="types == 'chanjie'">
        <div class="popupBox" v-if="UserId == userInfo.studentId">
          <mt-button @click="InitName" class="sure">回复</mt-button>
          <mt-button v-if="DetailFlag" @click="handleRemove" class="sure">删除</mt-button>
        </div>
        <div class="popupBox" v-else>
          <mt-button class="sure" @click="goMyChatMessage">私信</mt-button>
          <mt-button @click="InitName" class="sure">回复</mt-button>
        </div>
      </div>
      <div class="popupBox" v-else>
        <mt-button @click="InitName" class="sure">回复</mt-button>
        <!-- <mt-button @click="privateLetter" class="sure" v-if="UserId !== userInfo.studentId">私信</mt-button> -->
      </div>
    </mt-popup>
  </div>
</template>
<script>
import discussListRich from "@/component/editer/RichText";
import { getUserInfoCookie } from "../../../public/index";
import { mapActions, mapState } from "vuex";
export default {
  name: "chanjiedetaildiscussall",
  data() {
    return {
      discussFlag:true,
      sendText: "发表",
      htmlShowID: null,
      htmlShow: true,
      queryObj: {},
      title: "",
      replayId: "", //存储回复id
      replayName: "", //用于存储名字,
      replayText: "说说你的想法吧", //用于存储名字,
      UserId: "", //用于判断是否是用户所回复
      removeId: "", //用于删除回复
      userInfo: {}, // 获取个人信息
      popupVisible: false, //控制弹窗
      types: "", //控制是否可以删除的type
      DetailFlag: false, //删除评论还是回复   false评论  true回复
      Private: "", //进入站内信
      myChatMessage:false,
    };
  },
  beforeRouteEnter (to,from,next) {
       if (from.path == "/mychatmessage") {
        next(vm=>{
          vm.myChatMessage = true
        })
      }
        next()
    },
  watch: {
     popupVisible:function(newValue, oldValue){
        if(newValue){
            this.discussFlag = false
        }else{
          this.discussFlag = true
        }
     }
    },
  computed: {
    ...mapState({
      // 回复他人回复数据
      discussReplyPeopleData: state =>
        state.chanJieDetailDiscussStore.discussReplyPeopleData,
      //评论他人点赞数据
      discussReplyGiveLikeData: state =>
        state.chanJieDetailDiscussStore.discussReplyGiveLikeData,
      //评论他人回复点赞数据
      discussCommentGiveLikeData: state =>
        state.chanJieDetailDiscussStore.discussCommentGiveLikeData,
      //删除回复数据
      chanJieDetailHomeWorkSunRemoveReplyData: state =>
        state.chanJieDetailDiscussStore.chanJieDetailHomeWorkSunRemoveReplyData,
      //帖子讨论列表数据
      discussList: state => state.chanJieDetailDiscussStore.discussList
    })
  },
  mounted() {
    if (this.$flag) {
      document.getElementsByClassName("content")[0].style = "margin-top:0rem;";
    } else {
      document.getElementsByClassName("content")[0].style =
        "margin-top:3.5625rem;";
    }
    if (
      getUserInfoCookie() !== undefined &&
      getUserInfoCookie() !== "undefined"
    ) {
      this.userInfo = JSON.parse(getUserInfoCookie());
    }
    // let obj = JSON.parse(window.localStorage.getItem("Allreplies"));
    // //console.log(obj,'obj')
    //  this.queryObj = obj;
    //  this.types = this.$route.query.type;
    if (
      this.$route.query.val != undefined &&
      JSON.stringify(this.$route.query.val).length > 17
    ) {
      this.queryObj = this.$route.query.val;
      this.types = this.$route.query.type;
      window.localStorage.setItem(
        "DiscussAllObj",
        JSON.stringify(this.queryObj)
      );
      window.localStorage.setItem(
        "DiscussAllTieZiType",
        this.$route.query.type
      );
    } else {
      this.queryObj = JSON.parse(window.localStorage.getItem("DiscussAllObj"));
      this.types = window.localStorage.getItem("DiscussAllTieZiType");
    }
    if (this.queryObj) {
      this.title =
        "共有" +
        this.queryObj.courseDiscussionReplyResponseVos.length +
        "条回复";
    }
    //console.log(this.queryObj.courseDiscussionReplyResponseVos);
  },
  methods: {
    auto() {
      this.$refs.RichText.blurs();
    },
    CommentIdHtmlShows(id) {
      let dataIfShow = this.queryObj.courseDiscussionReplyResponseVos.map(
        (item, index) => {
          if (item.courseDiscussionCommentId == id) {
            this.$set(
              this.queryObj.courseDiscussionReplyResponseVos[index],
              "ifShow",
              true
            );
          }
          return item;
        }
      );
      //console.log(this.queryObj.courseDiscussionReplyResponseVos);
      this.queryObj.courseDiscussionReplyResponseVos = [...dataIfShow];
    },
    CommentIdHtmlHides(id) {
      let dataIfShow = this.queryObj.courseDiscussionReplyResponseVos.map(
        (item, index) => {
          if (item.courseDiscussionCommentId == id) {
            this.$set(
              this.queryObj.courseDiscussionReplyResponseVos[index],
              "ifShow",
              false
            );
          }
          return item;
        }
      );
      //console.log(this.queryObj.courseDiscussionReplyResponseVos);
      this.queryObj.courseDiscussionReplyResponseVos = [...dataIfShow];
    },
    //展开
    htmlShows(id) {
      this.htmlShowID = id;
      this.htmlShow = false;
    },
    //收起
    htmlHides() {
      this.htmlShowID = null;
      this.htmlShow = true;
    },
    ...mapActions({
      //帖子讨论列表
      getDiscussListAction: "chanJieDetailDiscussStore/getDiscussListAction",
      // 回复他人回复
      getDiscussReplyPeopleAction:
        "chanJieDetailDiscussStore/getDiscussReplyPeopleAction",
      //评论他人点赞
      getDiscussReplyGiveLikeAction:
        "chanJieDetailDiscussStore/getDiscussReplyGiveLikeAction",
      //评论他人回复点赞
      getDiscussCommentGiveLikeAction:
        "chanJieDetailDiscussStore/getDiscussCommentGiveLikeAction",
      //删除回复
      getChanJieDetailHomeWorkSunRemoveReplyAction:
        "chanJieDetailDiscussStore/getChanJieDetailHomeWorkSunRemoveReplyAction"
    }),
    goMyChatMessage() {
      this.$router.push({
        name: "mymessageall",
        params: {
          info: this.Private,
          iswork:'SunListAll'
        }
      });
    },
    //私信
    privateLetter() {
      let info = window.localStorage.getItem("Privateletter");
      //  //console.log( JSON.parse(info))
      this.$router.push({
        name: "mymessageall",
        params: {
          info: JSON.parse(info),
          iswork:'SunListAll'
        }
      });
      // this.$router.push({
      //   path: "/mychatmessage"
      // });
    },
    //查看原文
    seeAll() {
      if (this.types == "chanjie") {
        this.$router.push({
          path: "/chanjiedetaildiscuss"
        });
      } else {
        this.$router.push({
          path: "/chairdetails",
          query: {
            type: "FreeVideo"
          }
        });
      }
    },
    goBack() {
      if(this.myChatMessage){
          this.$router.push({
            path: '/chanjiedetaildiscuss'
          });
          return
      }
      this.$router.back(-1);
    },
    // 点击评论人昵称  input 获取焦点
    replyPeopleReply(name, id, UserId, removeId, Flag, item) {
      this.Private = item;
      //console.log("item", item);
      //console.log(id, UserId);
      // //console.log(queryObj,'queryObjqueryObjqueryObj')
      // this.popupVisible = true;
      this.DetailFlag = Flag;
      this.replayId = id;
      this.replayName = name;
      this.UserId = UserId;
      this.removeId = removeId;
      if (this.types == "chanjie") {
        this.popupVisible = true;
      } else {
        this.InitName();
      }
    },
    //评论他人回复点赞
    async giveLike(id) {
      await this.getDiscussCommentGiveLikeAction(this.disposedata3(id));
      if (this.discussCommentGiveLikeData.msg == "请求成功") {
        await this.getDiscussListAction(this.disposedata1());
        this.discussList.courseDiscussionCommentResponseVos.forEach(item => {
          if (
            item.courseDiscussionCommentId ==
            this.queryObj.courseDiscussionCommentId
          ) {
            this.queryObj = item;
            window.localStorage.setItem(
              "DiscussAllObj",
              JSON.stringify(this.queryObj)
            );
          }
        });
      } else if (this.discussCommentGiveLikeData.code == 600001) {
        this.$Toast(this.discussCommentGiveLikeData.msg);
      }
    },
    //评论他人点赞
    async replyGiveLike(id) {
      await this.getDiscussReplyGiveLikeAction(this.disposedata3(id));
      if (this.discussReplyGiveLikeData.msg == "请求成功") {
        await this.getDiscussListAction(this.disposedata1());
        this.discussList.courseDiscussionCommentResponseVos.forEach(item => {
          if (
            item.courseDiscussionCommentId ==
            this.queryObj.courseDiscussionCommentId
          ) {
            this.queryObj = item;
            window.localStorage.setItem(
              "DiscussAllObj",
              JSON.stringify(this.queryObj)
            );
          }
        });
      } else if (this.discussReplyGiveLikeData.code == 600001) {
        this.$Toast(this.discussReplyGiveLikeData.msg);
      }
    },
    //处理昵称
    InitName() {
      this.replayText = "@" + this.replayName;
      this.popupVisible = false;
      this.$refs.RichText.focus();
    },
    //处理回复
    async InitReply(html, length) {
      if (this.replayText.indexOf("@") != -1) {
        //回复
        await this.getDiscussReplyPeopleAction(
          this.disposedata2(this.replayId, this.replayName, html, length)
        );
      } else {
        //评论
        await this.getDiscussReplyPeopleAction(
          this.disposedata2(
            this.queryObj.courseDiscussionCommentId,
            this.queryObj.discussUser,
            html,
            length
          )
        );
      }
      //成功刷新
      if (this.discussReplyPeopleData.msg == "请求成功") {
        this.$Toast("评论成功");
        await this.getDiscussListAction(this.disposedata1());
        this.discussList.courseDiscussionCommentResponseVos.forEach(item => {
          if (
            item.courseDiscussionCommentId ==
            this.queryObj.courseDiscussionCommentId
          ) {
            this.queryObj = item;
            window.localStorage.setItem(
              "DiscussAllObj",
              JSON.stringify(this.queryObj)
            );
          }
        });
      } else {
        this.$Toast(this.discussReplyPeopleData.msg);
      }
    },
    //处理公共数据1  刷新帖子列表数据
    disposedata1() {
      let id = "";
      let DiscussId = window.localStorage.getItem("DiscussId");
      let chairDetailDiscussId = window.localStorage.getItem(
        "chairDetailDiscussId"
      );
      if (this.types == "chanjie") {
        id = DiscussId;
      } else {
        id = chairDetailDiscussId;
      }
      let data = {
        id,
        pageIndex: 1,
        token: ""
      };
      return data;
    },
    //处理公共数据2  评论他人回复数据
    disposedata2(id, name, html, length) {
      let isCourseDiscussion;
      if (this.types == "chanjie") {
        isCourseDiscussion = true;
      } else {
        isCourseDiscussion = false;
      }
      let chanJieId = window.localStorage.getItem("chanJieId");
      let tieZiId = "";
      let DiscussId = window.localStorage.getItem("DiscussId");
      let chairDetailDiscussId = window.localStorage.getItem(
        "chairDetailDiscussId"
      );
      if (this.types == "chanjie") {
        tieZiId = DiscussId;
      } else {
        tieZiId = chairDetailDiscussId;
      }
      // let html=this.editor.txt.html()
      let data = {
        isCourseDiscussion: isCourseDiscussion,
        courseId: chanJieId,
        // content: this.editorContent,
        content: html,
        discussionId: String(this.$route.query.tieZiId) || String(tieZiId),
        replyId: this.queryObj.courseDiscussionCommentId,
        token: "",
        beReplyUser: name,
        contentNum: length
      };
      return data;
    },
    //处理公共数据3  他人回复点赞 评论他人点赞  公用
    disposedata3(id) {
      let data = {
        id,
        token: ""
      };
      return data;
    },
    //处理公共数据4 删除回复
    disposedata4(id) {
      let data = {
        homeworkFinishId: id,
        token: ""
      };
      return data;
    },
    //删除帖子 回复
    async handleRemove() {
      this.popupVisible = false;
      if (!this.DetailFlag) {
      } else {
        await this.getChanJieDetailHomeWorkSunRemoveReplyAction(
          this.disposedata4(this.replayId)
        );
        if (this.chanJieDetailHomeWorkSunRemoveReplyData.msg == "请求成功") {
          this.$Toast("删除成功");
          await this.getDiscussListAction(this.disposedata1());
          this.discussList.courseDiscussionCommentResponseVos.forEach(item => {
            if (
              item.courseDiscussionCommentId ==
              this.queryObj.courseDiscussionCommentId
            ) {
              this.queryObj = item;
              window.localStorage.setItem(
                "DiscussAllObj",
                JSON.stringify(this.queryObj)
              );
            }
          });
        } else {
          this.$Toast("删除失败");
        }

        // this.$axios.post('/userhomeworksun/delDiscussionReply',{token:'',
        // homeworkFinishId:this.replayId}).then(res=>{
        //     if(res.data.result){
        //        this.$Toast("删除成功");
        //        this.ADB()

        //  this.discussList.courseDiscussionCommentResponseVos.forEach(item => {
        //     if (
        //       item.courseDiscussionCommentId ==
        //       this.queryObj.courseDiscussionCommentId
        //     ) {
        //       this.queryObj = item;
        //       window.localStorage.setItem(
        //         "DiscussAllObj",
        //         JSON.stringify(this.queryObj)
        //       );
        //     }
        //   });
        //     }else{
        //         this.$Toast("删除失败");
        //     }
        // })
      }
      // await this.getChanJieDetailHomeWorkSunRemoveReplyAction(
      //   this.disposedata4(this.removeId)
      // );
      // if (this.chanJieDetailHomeWorkSunRemoveReplyData.msg == "请求成功") {
      //   this.$Toast("删除成功");
      //   await this.getDiscussListAction(this.disposedata1());
      //   this.discussList.courseDiscussionCommentResponseVos.forEach(item => {
      //     if (
      //       item.courseDiscussionCommentId ==
      //       this.queryObj.courseDiscussionCommentId
      //     ) {
      //       this.queryObj = item;
      //       window.localStorage.setItem(
      //         "DiscussAllObj",
      //         JSON.stringify(this.queryObj)
      //       );
      //     }
      //   });
      // } else {
      //   this.$Toast("删除失败");
      // }
    }
  },
  components: {
    discussListRich
  }
};
</script>
<style lang="scss" scoped>
.app-lv-sundetap {
  letter-spacing: 0.5px;
  line-height: 1.5rem;
  height: auto;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  color: #555 !important;
  font-size: 0.9375rem;
}
.app-lv-sundetaps {
  letter-spacing: 0.5px;
  line-height: 1.5rem;
  height: auto;
  color: #555 !important;
  font-size: 0.9375rem;
}
.app-lv-sundetap-cha {
  line-height: 1.5rem;
  letter-spacing: 0.5px;
  color: #07767a;
  text-align: right;
}
.app-z-icon {
  .app-Name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .app-z-icon-name {
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
      i {
        flex-shrink: 0;
      }
    }
  }
  .app-z-mllrr {
    margin-left: 0.3rem;
  }
  i {
    font-size: 1.1875rem;
    margin-right: 0.375rem;
  }
  .icon-pinglun {
    font-size: 1.2rem;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.app-z-My_ChairList-evaluation {
  padding-top: 0;
  margin: 0px -30px;
  padding: 1.25rem 1.5625rem 1.25rem 1.5625rem;
  li {
    padding-bottom: 0;
    & > img {
      width: 2.8125rem;
      height: 2.8125rem;
      border-radius: 50%;
    }
  }
}
.Reply_dialogue {
  .app-z-replyInfo {
    width: calc(100% - 2.8125rem - 0.625rem);
    margin-top: 0.3125rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1.375rem;
  }
}

#chanJieDetailDiscussAll {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  section {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.fz15.c30 {
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
}
.mint-popup-bottom {
  width: 100%;
  // height:10rem;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popupBox {
  width: 100%;
  
  .sure {
    width: 100%;
    text-align: center;
    line-height: 2.5rem;
    font-size: 1rem;
    color: #000;
  }
}
.gu_box {
  display: inline-block;
  width: 82%;
  color: #ccc;
  .gu_p {
    position: absolute;
    left: 3.5rem;
    top: 0.2rem;
    z-index: 1000;
    border: 0;
    color: #ccc;
  }
}
.dis_flow_root {
  position: relative;
  .gu_nav_title_img {
    left: 0.6rem;
    top: 0.6rem;
  }
}
</style>
<style scoped>
/** 富文本框的-表情宽度 **/
.w-e-toolbar .w-e-menu {
  padding: 0px;
}
.w-e-icon-happy {
  font-size: 1.5625rem;
}
.w-e-toolbar .w-e-menu i {
  position: relative;
  left: 22px;
  top: -8px;
}
/** -- end - -- */

.w-e-item img {
  width: auto;
  height: auto;
}

p img {
  width: auto;
}
.w-e-text p {
  margin: 14px 0 10px 0px;

  /* 可以滑动查看内容 */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-y: auto;
}
.w-e-text img {
  width: auto;
  height: auto;
}
.Reply_dialogue {
  padding: 1.25rem 1.5625rem 1.25rem 1.5625rem !important;
  /* -webkit-overflow-scrolling : touch;  */
}
.Reply_dialogue ul li {
  display: flex;
}
.Reply_dialogue ul li > img {
  float: none;
}
.Reply_dialogue ul li > img + div {
  float: none;
}
#app {
  /* overflow: scroll; */
  -webkit-overflow-scrolling: touch;
}
</style>

