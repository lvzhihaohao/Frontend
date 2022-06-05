<template>
  <div>
    <div
      class="clear"
      :class="index==newData.length-1?'app-homeWorkList-lv':''"
      v-for="(item,index) in newData"
      :key="index"
    >
      <div class="My_homeworkBody">
        <div
          class="fz18 c30 chanjieH3"
          v-if="types!='chanjie'"
        >{{item.classhourName}}{{item.homeworkTitle}}</div>
        <div class="fz18 c30 chanjieH3" v-else>{{item.nickName}}</div>
        <p class="fz15 c9" v-if="types!= 'chanjie'">
          来自
          <span class="c4a5">{{item.courseName}}</span>
        </p>
        <!-- 默认展开文本 -->
        <p
          :class="item.ifShow||item.contentNum<=148?'fz15 c9 app-lv-homerPs':'fz15 c9 app-lv-homerP'"
        >
          <span class="spanPre" v-html="item.content"></span>
        </p>
        <p
          v-if="item.contentNum>=148&&!item.ifShow"
          @click="htmlShows(item.homeworkFinishId)"
          class="app-lv-homerP-cha fz12"
        >展开</p>
        <p
          v-if="item.ifShow"
          @click="htmlHides(item.homeworkFinishId)"
          class="app-lv-homerP-cha fz12"
        >收起</p>
        <div class="dis_flow_root mt-10">
          <ul class="My_homeworkList My_homework">
            <li v-for="(val,ind) in item.picList" :key="ind" @click="showImg(val)">
              <img
                v-lazy="val.homeworkThumbUri"
                :key="val.id"
                alt
                style="object-fit: cover;paddingTop:.2rem"
              />
            </li>
          </ul>
          <p class="dis_flow_root pinlunBetten">
            <time class="fz12 c9">{{item.createTime}}</time>
            <span class="fz15 fr cb19" v-if="item.isSun != undefined">
              <mt-button
                v-if="!(item.isSun)"
                class="btn_drop app-h5-ins iBox"
                @click="sunWork(item.homeworkFinishId)"
              >晒作业</mt-button>
              <i class="iBox" style="letter-spacing:.1rem" v-if="(item.isSun)">已晒出</i>
            </span>
          </p>
          <ul class="mt-24">
            <li class="mb-20" v-for="(value,key) in item.userHomeWorkCommnetResponseVos" :key="key">
              <div class="fz15 mb-15">
                <p
                  :class="value.ifShow||value.contentNum<=148?'fz15 paddTop c30 mb-10 app-lv-teach-h4s':'fz15 paddTop c30 mb-10 app-lv-teach-h4'"
                >
                  <span class="c4a5">助教老师说：</span>
                  <br />
                  <span style="color:#444" v-html="value.content"></span>
                </p>
                <div class="imgBox">
                  <img
                    class="Boximgs"
                    v-for="(items,indexs) in value.picList"
                    :key="indexs"
                    :src="items.homeworkPictureUri"
                    alt
                    @click="showImg(items)"
                  />
                </div>
                <p
                  v-if="value.contentNum>=148&&!value.ifShow"
                  @click="ponseVosShows(value.reviewId)"
                  class="app-lv-homerP-cha fz12"
                >展开</p>
                <p
                  v-if="value.ifShow"
                  @click="ponseVosHides(value.reviewId)"
                  class="app-lv-homerP-cha fz12"
                >收起</p>
              </div>
              <div
                class="fz15 c4a5 mb-15 app-homework-h4"
                v-for="(tea,index) in value.homeworkReviewReplies"
                :key="index"
              >
                <div class="app-homework-div">我：</div>
                <br />
                <p
                  style="color:#999!important;paddingTop:.3rem"
                  :class="tea.ifShow||tea.contentNum<=100?'app-homework-cs':'app-homework-c'"
                  v-html="tea.replyContent"
                ></p>
                <p
                  v-if="tea.contentNum>=100&&!tea.ifShow"
                  @click="TeaHtmlShows(tea.id)"
                  class="app-lv-homerP-cha fz12"
                >展开</p>
                <p v-if="tea.ifShow" @click="TeaHtmlHides(tea.id)" class="app-lv-homerP-cha fz12">收起</p>
              </div>
              <div>
                <p class="huifu">
                  <span class="fz12 c9">{{value.userNickName}}助教 {{value.createTime}}</span>
                  <span
                    class="fz12 cb19 fr"
                    @click.stop="reply(value.reviewId,value.userNickName,item.courseId)"
                  >回复</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <img :src="imgUrl" alt />
    </mt-popup>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "shop",
  data() {
    return {
      htmlShowID: null, //展开Id
      htmlShow: true, //展开收起
      popupVisible: false,
      imgUrl: "",
      newData: null
    };
  },
  props: {
    replyFlag: {
      type: null
    },
    data: {
      type: null,
      require: true
    },
    types: {
      type: null
    }
  },
  mounted() {
    // //console.log(this.newData[0],"-45-")
    //
    if (this.data) {
      this.newData = [...this.data];
    }
  },
  computed: {
    ...mapState({
      MySubmitTypeWorkSunData: state =>
        state.chanJieDetailMySubmitTypeWorkStore.MySubmitTypeWorkSunData
    })
  },
  watch: {
    newData(newData, oldData) {
      if (newData !== oldData) {
        this.newData = newData;
      }
    },
    data(val, old) {
      this.newData = [...val];
    }
  },
  methods: {
    ...mapActions({
      //点击晒作业
      getMySubmitTypeWorkSunAction:
        "chanJieDetailMySubmitTypeWorkStore/getMySubmitTypeWorkSunAction"
    }),
    TeaHtmlShows(id) {
      let dataIfShow = this.newData.map((item, index) => {
        if (item.userHomeWorkCommnetResponseVos.length > 0) {
          item.userHomeWorkCommnetResponseVos.forEach((txt, ind) => {
            if (txt.homeworkReviewReplies.length > 0) {
              txt.homeworkReviewReplies.forEach((itemTxt, indexInd) => {
                if (itemTxt.id == id) {
                  this.$set(
                    this.newData[index].userHomeWorkCommnetResponseVos[ind]
                      .homeworkReviewReplies[indexInd],
                    "ifShow",
                    true
                  );
                }
              });
            }
          });
        }
        return item;
      });

      this.newData = [...dataIfShow];
      //console.log(dataIfShow)
    },
    TeaHtmlHides(id) {
      let dataIfShow = this.newData.map((item, index) => {
        if (item.userHomeWorkCommnetResponseVos.length > 0) {
          item.userHomeWorkCommnetResponseVos.forEach((txt, ind) => {
            if (txt.homeworkReviewReplies.length > 0) {
              txt.homeworkReviewReplies.forEach((itemTxt, indexInd) => {
                if (itemTxt.id == id) {
                  this.$set(
                    this.newData[index].userHomeWorkCommnetResponseVos[ind]
                      .homeworkReviewReplies[indexInd],
                    "ifShow",
                    false
                  );
                }
              });
            }
          });
        }
        return item;
      });

      this.newData = [...dataIfShow];
    },
    //展开
    htmlShows(id) {
      this.htmlShowID = id;
      let dataIfShow = this.newData.map((item, index) => {
        if (item.homeworkFinishId == id) {
          this.$set(this.newData[index], "ifShow", true);
          //    item.ifShow=true
        }
        return item;
      });
      this.newData = [...dataIfShow];
      // this.$emit('showCityName',id)
    },
    //收起
    htmlHides(id) {
      this.htmlShowID = id;
      let dataIfShow = this.newData.map((item, index) => {
        if (item.homeworkFinishId == id) {
          this.$set(this.newData[index], "ifShow", false);
        }
        return item;
      });
      this.newData = [...dataIfShow];
      // this.$emit('showCityName',id)
    },
    ponseVosShows(id) {
      //console.log(id)
      this.htmlShowID = id;
      //console.log(this.newData)
      let dataIfShow = this.newData.map((item, index) => {
        item.userHomeWorkCommnetResponseVos.forEach((val, ind) => {
          if (val.reviewId == id) {
            this.$set(
              this.newData[index].userHomeWorkCommnetResponseVos[ind],
              "ifShow",
              true
            );
          }
        });
        return item;
      });
      this.newData = [...dataIfShow];
      // let dataIfShow = this.newData[0].userHomeWorkCommnetResponseVos.map((item,index)=>{
      //     //console.log(item.reviewId)
      //     if(item.reviewId==id){
      //         this.$set(this.newData[0].userHomeWorkCommnetResponseVos[index],'ifShow',true)
      //     }
      //     return  item
      // })
    },
    ponseVosHides(id) {
      this.htmlShowID = id;
      let dataIfShow = this.newData.map((item, index) => {
        item.userHomeWorkCommnetResponseVos.forEach((val, ind) => {
          if (val.reviewId == id) {
            this.$set(
              this.newData[index].userHomeWorkCommnetResponseVos[ind],
              "ifShow",
              false
            );
          }
        });
        return item;
      });
      this.newData = [...dataIfShow];
    },
    showImg(item) {
      //console.log(item,"123----")
      this.ShowViewer(item.homeworkPictureUri);
    },
    reply(id, name, courseId) {
      let names = "回复" + name + "助教";
      // //console.log(id,'idsss')
      this.$emit("replyFlag", id, names, courseId);
    },
    async sunWork(id) {
      await this.getMySubmitTypeWorkSunAction(this.disposedata1(id));
      if (this.MySubmitTypeWorkSunData.msg == "请求成功") {
        this.$Toast("晒作业成功");
      } else {
        this.$Toast(this.MySubmitTypeWorkSunData.msg);
      }
      if (this.types == "chanjie") {
        this.$emit("myTypeHomeWorkParent");
      } else {
        this.$emit("myHomeWorkParent");
      }
    },
    //处理公共数据1  我的作业进行晒作业数据
    disposedata1(id) {
      let data = {
        homeworkFinishId: id,
        courseType: 0,
        token: ""
      };
      return data;
    }
  }
};
</script>
<style  lang='scss'>
.app-homeWorkList-lv {
  // background: yellow;
  .My_homeworkBody::after {
    display: none;
  }
  padding-bottom: 2rem;
}
// .mobile_content {
//     background: red !important;
//     .dis_flow_root{
//         background: yellow !important;
//             .clear:first-child{
//                  background: green !important;
//             }
//     }
// }
</style>

<style lang='scss' scoped>
.imgBox {
  display: flex;
  flex-wrap: wrap;
}
.Boximgs {
  width: 6.5rem;
  height: 6.5rem;
  object-fit: cover;
  padding: 0.2rem 0.1rem 0;
  box-sizing: border-box;
}
.pinlunBetten {
  span {
    margin-top: 0.2rem;
  }
}
.paddTop {
  padding-top: 0.5rem;
}
.huifu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.app-lv-teach-h4 {
  letter-spacing: 0.5px;
  line-height: 1.5rem !important;
  height: auto;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6; //   color: #555  !important;
  font-size: 0.9375rem;
}
.app-lv-teach-h4s {
  letter-spacing: 0.5px;
  line-height: 1.5rem !important;
  height: auto; //   color: #555  !important;
  font-size: 0.9375rem;
}
.app-lv-homerP {
  letter-spacing: 0.5px;
  line-height: 1.5rem !important;
  height: auto;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  color: #999 !important;
  font-size: 0.9375rem;
}
.app-lv-homerPs {
  letter-spacing: 0.5px;
  line-height: 1.5rem !important;
  height: auto;
  color: #999 !important;
  font-size: 0.9375rem;
}
.app-lv-homerP-cha {
  line-height: 1.5rem;
  letter-spacing: 0.5px;
  color: #07767a;
  text-align: right;
}
.spanPre {
  white-space: pre;
  word-break: break-all;
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
.app-lv-homerPs {
  letter-spacing: 0.5px;
  line-height: 1.5rem;
  height: auto;
  color: #999 !important;
  font-size: 0.9375rem;
}
// img{
//       width: 22px !important;
//             height: 22px !important;
// }
.app-homework-c p {
  color: black !important;
}
.app-h5-ins {
  background: #c4a57f;
  color: white;
}
.My_homeworkBody {
  padding-top: 1rem;
}
.My_homeworkBody .My_homeworkList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.dis_flow_root {
  width: 100%;
}
.My_homeworkList li img {
  width: 6.5rem;
  height: 6.5rem;
}
.iBox {
  font-style: normal;
}
.app-homework-h4 {
  width: 100%; // max-height: 3.475rem;
  // position: relative;
}
.app-homework-div {
  float: left; // position: absolute;
  // top: 0.1rem;
}
.app-homework-c {
  // margin-left: 30px;
  display: inline-block; // min-height: 1.1875rem;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.5rem;
  p {
    color: black !important;
  }
  img {
    //  1.3
    width: 1.175rem !important;
    height: 1.175rem !important;
  }
}
.app-homework-cs {
  display: inline-block;
  width: 100%;
  color: black !important;
  line-height: 1.5rem;
  img {
    //  1.3
    width: 1.175rem !important;
    height: 1.175rem !important;
  }
}
</style>