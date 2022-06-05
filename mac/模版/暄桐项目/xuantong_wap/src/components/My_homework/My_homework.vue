<template>
  <div id="app" style="overflow: auto;-webkit-overflow-scrolling : touch;">
    <article class="nav-title My_homeWork_nav" v-if="!this.$flag">
      <mt-header title="我的作业">
        <a href="javascript:void(0);" slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    </article>
    <img
      src="../../../static/img/back.png"
      style="position:fixed;left:5px;top:0.4rem"
      class="gu_nav_title_img_top"
      v-if="this.$flag"
      @click="goBack"
    />
    <div class="pl-30 pr-30" @click="ReplyOll" @touchmove="ReplyOll">
      <!--mobile_content 固定底部的话+add -->
      <article class="My_homework">
        <mt-navbar
          style="padding-top:0"
          v-model="My_homework"
          class="Haveclass_menuList Haveclass_menuLei My_homeworkTab"
          :class="{My_homeworkTabWX:this.$flag}"
        >
          <mt-tab-item id="1">已提交</mt-tab-item>
          <mt-tab-item id="2">已评阅</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="My_homework">
          <mt-tab-container-item id="1">
            <div class="mobile_content">
              <article :class="!this.$flag?'dis_flow_root mt-30':'dis_flow_root dis_flow_root_lei'">
                <MyHomeWorkList
                  key="1"
                  @showCityName="updateCity"
                  :data="newArrData"
                  v-if="myHomeWorkList&&myHomeWorkList.length >0"
                  @myHomeWorkParent="myHomeWorkParent"
                  @replyFlag="replyFlag"
                />
                <div class="gu_clear_guide" v-else>
                  <img src="../../../static/img/null-My_discussion.png" alt />
                  <p class="fz12 mt-15 c9">暂时没有哦~</p>
                </div>
              </article>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div class="mobile_content">
              <article :class="!this.$flag?'dis_flow_root mt-30':'dis_flow_root dis_flow_root_lei'">
                <MyHomeWorkList
                  key="2"
                  @showCityName="updateCity"
                  :data="newArrData"
                  v-if="userHomeWprkFlag"
                  @myHomeWorkParent="myHomeWorkParent"
                  @replyFlag="replyFlag"
                />
                <div class="gu_clear_guide" v-else>
                  <img src="../../../static/img/null-My_discussion.png" alt />
                  <p class="fz12 mt-15 c9">暂时没有哦~</p>
                </div>
              </article>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </article>
    </div>
    <ReplyMore
      v-if="replyIdFlag"
      @replyFlags="replyFlags"
      :teaname="teaname"
      :replyIds="replyIds"
      :courseId="courseId"
      @myHomeWorkParent="myHomeWorkParent"
      ref="replyMore"
    />
    <ScrollBottom
      @timer="timer"
      v-show="myHomeWorkList&&myHomeWorkList.length>0"
      :moreTit="moreTit"
      ref="mychild"
    />
  </div>
</template>
<script>
import { userclasshourTime, formData } from "../../public/index";
import ScrollBottom from "@/component/ScrollBottom";
import { mapState, mapActions } from "vuex";
import MyHomeWorkList from "@/component/myHomeWork/myHomeWorkAllList";
import ReplyMore from "@/component/myHomeWork/ReplyMores";
import { getMd5 } from "@/public/index";
export default {
  name: "myhomework",
  data() {
    return {
      My_homework: "0",
      moreTit: "加载更多",
      Timingopen: null,
      replyIds: null,
      replyIdFlag: false,
      newArrData: null,
      userHomeWprkFlag: false,
      teaname: "",
      courseId: null,
      newArrDataLength: null
    };
  },
  computed: {
    ...mapState({
      //我的作业数据
      myHomeWorkList: state => state.myHomeWorkStore.myHomeWorkList,
      pageIndex: state => state.myHomeWorkStore.pageIndex,
      typeKey: state => state.myHomeWorkStore.typeKey
    })
  },
  components: {
    MyHomeWorkList,
    ScrollBottom,
    ReplyMore
  },
  watch: {
    My_homework(val, oldVal) {
      this.changeGetZero();
      this.moreTit = "加载更多";
      this.$refs.mychild.get();
      window.localStorage.setItem("myHomeWorkVal", val);
      if (val == "1") {
        this.changeGetKey(1);
        this.getMyHomeWorkAction(this.disposedata2(1));
      } else if (val == "2") {
        this.changeGetKey(2);
        this.getMyHomeWorkAction(this.disposedata2(2));
      }
      // 弃用
      // else{
      //     this.changeGetKey(2)
      //     this.getMyHomeWorkAction(this.disposedata2(2))
      // }
    },
    myHomeWorkList(newData, oldData) {
      //console.log(newData,"newData")
      //console.log(oldData,"oldData")
      this.newArrData = [...newData];
      this.newArrData.forEach((item, index) => {
        if (item.userHomeWorkCommnetResponseVos.length > 0) {
          this.userHomeWprkFlag = true;
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/index/indexwode") {
      next(vm => {
        vm.My_homework = "1";
      });
    }
    next();
  },
  methods: {
    formData,
    //点全局隐藏
    ReplyOll() {
      //console.log(this.replyIdFlag,'99999')
      if (this.replyIdFlag) {
        this.replyIdFlag = false;
      }
    },
    replyFlag(id, name, courseId) {
      this.teaname = name;
      this.courseId = courseId;
      this.replyIds = id;
      this.replyIdFlag = true;
      //console.log('999999999')
      this.$nextTick(() => {
        this.$refs.replyMore.focus();
      });
    },
    replyFlags() {
      this.replyIdFlag = false;
    },
    ...mapActions({
      //我的作业方法
      getMyHomeWorkAction: "myHomeWorkStore/getMyHomeWorkAction",
      changeGetPage: "myHomeWorkStore/changeGetPage",
      changeGetZero: "myHomeWorkStore/changeGetZero",
      changeGetKey: "myHomeWorkStore/changeGetKey"
    }),
    //触发刷新作业列表
    myHomeWorkParent() {
      if (this.My_homework == "1") {
        this.changeGetKey(1);
        this.getMyHomeWorkAction(this.disposedata2(1));
      } else if (this.My_homework == "2") {
        this.changeGetKey(2);
        this.getMyHomeWorkAction(this.disposedata2(2));
      }
    },
    goBack() {
      this.$router.push({
        path: "/index/indexwode"
      });
      // this.$router.back(-1)
    },
    //处理作业数据
    disposedata2(typeKey) {
      let data = {
        courseId: 0,
        pageIndex: 1,
        typeKey,
        typeId: 0,
        token: ""
      };
      return data;
    },
    //加载更多
    timer(fn) {
      if (this.moreTit == "暂时都在这里了...") {
        return;
      }
      fn = null; //关闭滚动条
      let that = this;
      this.moreTit = "正在加载...";
      this.Timingopen = setInterval(() => {
        //console.log('tabid')
        that.changeGetPage();
        that.getMoreList();
      }, 1000);
    },
    getMoreList() {
      clearInterval(this.Timingopen);
      let that = this;
      this.$axios
        .post("userhomework/list", {
          courseId: 0,
          pageIndex: this.pageIndex,
          typeKey: this.typeKey,
          typeId: 0,
          token: ""
        })
        .then(res => {
          let newarr = res.data.result.userHomeWorkResponseVos;
          if (newarr.length == 0) {
            this.moreTit = "暂时都在这里了...";
            this.$refs.mychild.gets();
            return;
          } else {
            newarr.forEach((item, i) => {
              item.createTime = that.formData(
                item.createTime,
                "uat",
                "add",
                false
              );
              if (item.content) {
                //截取p标签
                if (item.content.slice(0, 3) == "<p>") {
                  item.content = item.content.slice(3, item.content.length - 4);
                }
                //截取最后的br
                if (item.content.substring(item.content.length - 4) == "<br>") {
                  item.content = item.content.slice(0, item.content.length - 4);
                }
                //截取最后的空格
                if (
                  item.content.substring(item.content.length - 6) == "&nbsp;"
                ) {
                  item.content = item.content.slice(0, item.content.length - 6);
                }
              }
              item.ifShow = false;
              item.userHomeWorkCommnetResponseVos.forEach(val => {
                val.createTime = that.formData(
                  val.createTime,
                  "uat",
                  "add",
                  false
                );
                if (val.content) {
                  //截取p标签
                  if (val.content.slice(0, 3) == "<p>") {
                    val.content = val.content.slice(3, val.content.length - 4);
                  }

                  //截取最后的br
                  if (val.content.substring(val.content.length - 4) == "<br>") {
                    val.content = val.content.slice(0, val.content.length - 4);
                  }
                  //截取最后的空格
                  if (
                    val.content.substring(val.content.length - 6) == "&nbsp;"
                  ) {
                    val.content = val.content.slice(0, val.content.length - 6);
                  }
                }
                //回复老师数据
                val.homeworkReviewReplies.forEach(Reval => {
                  if (Reval.replyContent) {
                    //截取p标签
                    if (Reval.replyContent.slice(0, 3) == "<p>") {
                      Reval.replyContent = Reval.replyContent.slice(
                        3,
                        Reval.replyContent.length - 4
                      );
                    }
                    //截取最后的br
                    if (
                      Reval.replyContent.substring(
                        Reval.replyContent.length - 4
                      ) == "<br>"
                    ) {
                      Reval.replyContent = Reval.replyContent.slice(
                        0,
                        Reval.replyContent.length - 4
                      );
                    }
                    //截取最后的空格
                    if (
                      Reval.replyContent.substring(
                        Reval.replyContent.length - 6
                      ) == "&nbsp;"
                    ) {
                      Reval.replyContent = Reval.replyContent.slice(
                        0,
                        Reval.replyContent.length - 6
                      );
                    }
                  }
                  Reval.ifShow = false;
                });
                val.ifShow = false;
              });
              this.myHomeWorkList.push(item);
            });
            this.moreTit = "加载更多";
            this.$refs.mychild.get();
          }
        });
    },
    updateCity(id) {
      this.myHomeWorkList.forEach((item, index) => {
        if (item.homeworkFinishId == id) {
          this.$set(this.myHomeWorkList[index], "ifShow", true);
        }
      });
    }
  },
  async mounted() {
    this.changeGetZero();
    this.changeGetKey(0);
    await this.getMyHomeWorkAction(this.disposedata2(1));
    this.My_homework = window.localStorage.getItem("myHomeWorkVal");
    this.newArrData = [...this.myHomeWorkList];
    this.newArrData.forEach((item, index) => {
      if (item.userHomeWorkCommnetResponseVos.length > 0) {
        this.userHomeWprkFlag = true;
      }
    });
  }
};
</script>
<style lang='scss' scoped>
.Haveclass_menuList {
  padding: 0rem 1.25rem;
}
.dis_flow_root_lei {
  margin-top: 4.3rem !important;
}
.mobile_content article:last-child {
  margin-bottom: 0rem;
}
#app {
  display: flex;
  flex-direction: column;
  .pl-30.pr-30 {
    flex: 1;
  }
}
.Haveclass_menuList.My_homeworkTab {
  width: 100%;
  position: fixed;
  top: 1.8rem;
  left: 0;
  z-index: 10;
  padding: 0rem 1.75rem 0 1.75rem;
  box-sizing: border-box;
  .mint-tab-item-label {
    font-size: 1rem !important;
  }
}
.mint-tab-item.is-selected {
  border-bottom: none !important;
  position: relative;
  color: #c4a57f !important;
  &::after {
    content: "";
    position: absolute;
    width: 4rem;
    height: 0.2rem;
    border-radius: 3px;
    background: #c4a57f;
    bottom: 0.3rem;
    left: 50%;
    margin-left: -2rem;
  }
}
.mt-30 {
  margin-top: 6.38rem;
}
.My_homeWork_nav {
  width: 100%;
  position: fixed;
  top: 0rem;
  left: 0;
  z-index: 10;
}
.My_homeworkTabWX {
  margin-top: -1.9rem;
  padding-top: 0.8rem;
  height: 3.2rem;
}

.Define_footFixed.chat_footer {
  display: flex;
  align-items: center;
  #editorElem {
    flex: 1;
    outline: none;
    border: none;
    margin-left: 1rem;
  }
  input {
    flex: 1;
    outline: none;
    border: none;
    margin-left: 1rem;
  }
  button {
    // position:static;
    position: absolute;
    top: 0;
  }
  .mint-button::after {
    position: static;
  }
}
.Define_footFixed {
  height: auto;
}
</style>
<style lang="scss">
.app-homework-h4 {
  width: 100%;
  // height: 1.1875rem;
}
.app-homework-c {
  display: inline-block;
  // height:  1.1875rem;
  p {
    color: black;
  }
  img {
    width: 1rem !important;
    height: 1rem !important;
    margin-left: 0.2rem;
    margin-right: 0.1rem;
  }
}
</style>



