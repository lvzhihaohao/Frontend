<template>
  <!-- style="overflow:hidden" -->
  <div id="app" style="height:auto;overflow:hidden;">
    <article class="nav-title" v-if="!this.$flag">
      <mt-header title="晒作业" fixed>
        <a href="javascript:void(0);" slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    </article>
    <img
      style="position: fixed;top:.2rem;left:.2rem"
      src="../../../../static/img/back.png"
      class="gu_nav_title_img_top"
      v-if="this.$flag"
      @click="goBack"
    />
    <div class="pl-27 pr-27">
      <article class="mt-40">
        <div class="BaskhomeWork-Content">
          <RichText
            ref="richTextTxt"
            :InitReply="InitReply"
            :replayText="placeholderText"
            :replayFlag="true"
            :placeholderFlag="true"
            :sendText="sendText"
          />
          <div class="fileHomeWork_img">
            <div class style="display:flex;flex-wrap: wrap;overflow: hidden;marginTop:1rem">
              <span v-for="(item,index) in imgArr" :key="index">
                <i @click="removeImg(index)" v-if="item.filePath!='loading'">&#10005;</i>
                <img :src="item.thumbUrl" v-lazy="item.thumbUrl" :key="index" alt />
              </span>
              <span v-show="imgArr.length<9">
                <input
                  multiple
                  type="file"
                  accept="image/*"
                  class="fileHomeWorkBtn"
                  @change="updateImg"
                  ref="ipt"
                />
              </span>
            </div>
            <span class="app-remmber-sun-title" style="marginBottom:5rem;">最多9张图片</span>
          </div>
        </div>
      </article>
    </div>
    <div v-show="checkImgLogo" class="checkImgmodel">
      <div class="checkImgMinmodel">
        <img src="../../../../static/img/816.gif" alt />
        <span>上传中</span>
      </div>
    </div>
  </div>
</template>
<script>
import RichText from "@/component/editer/RichTextPush";
import axios from "axios";
import {
  sumitImageFile,
  getUserInfoCookie,
  getMd5
} from "../../../public/index";
import { mapActions, mapState } from "vuex";
export default {
  name: "chanjiedetailbaskhomework",
  data() {
    return {
      sendText: "发表",
      imgArr: [],
      length: 0,
      imgArrFlag: true,
      count: 0, //记录上传图片数量
      thumbUrlADC: "",
      checkImgLogo: false,
      placeholderText: `跟同学分享一下你的作业吧`
    };
  },
  components: {
    RichText
  },
  computed: {
    ...mapState({
      //晒作业返回数据
      chanJieDetailBaskHomeWorkData: state =>
        state.chanJieDetailBaskHomeWorkStore.chanJieDetailBaskHomeWorkData
    })
  },
  watch: {
    imgArr(newVal, oldVal) {
      if (newVal.length <= 9) {
        this.imgArrFlag = true;
      } else {
        this.imgArrFlag = false;
      }
    }
  },
  created() {
    this.thumbUrlADC = require("../../../../static/img/816.gif");
  },
  mounted() {
    window.scrollTo(0, 0);
    if (this.$flag) {
      document.getElementsByClassName("pl-27")[0].style = "margin-top:0";
    } else {
      document.getElementsByClassName("pl-27")[0].style =
        "margin-top:2.5625rem";
    }
  },
  methods: {
    ...mapActions({
      //晒作业方法
      getChanJieDetailBaskHomeWorkAction:
        "chanJieDetailBaskHomeWorkStore/getChanJieDetailBaskHomeWorkAction",
      //单阶晒作业
      getChanJieDetailHomeWorkSunAction:
        "chanJieDetailStore/getChanJieDetailHomeWorkSunAction"
    }),
    //返回
    goBack() {
      this.$router.back(-1);
    },
    //删除上传图片
    removeImg(index) {
      this.imgArr.splice(index, 1);
    },
    imgUpLoad(allFile, indexCount) {
      this.checkImgLogo = true;
      if (indexCount >= allFile.length) {
        this.$refs.ipt.value = "";
        this.checkImgLogo = false;
        return;
      }
      let file = allFile[indexCount];
      let reader = new FileReader();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      reader.readAsDataURL(file); //用文件加载器加载文件
      reader.onload = e => {
        let img = new Image();
        img.src = e.target.result;
        img.onload = async () => {
          // size:18 width:15 long:12  1600*1200  正规比例
          let picWidth = Math.ceil((img.width / 1600) * 15);
          let picLong = Math.ceil((img.height / 1200) * 12);
          let wordSize = Math.ceil((img.height / 1200) * 18);
          if (wordSize <= 13) {
            wordSize = 13;
          }
          // const datas = sumitImageFile(reader.result)
          let formData = new FormData();
          formData.append("profile", file);
          formData.append("nickName", JSON.parse(getUserInfoCookie()).nickName);
          formData.append("picWidth", picWidth);
          formData.append("picLong", picLong);
          formData.append("wordSize", wordSize);
          formData.append("isLocalThumb", true);
          let n = this.imgArr.length;
          this.imgArr[n] = {
            filePath: "loading"
          };
          this.imgArr = [...this.imgArr];
          this.imgArr.splice(9);
          //console.log("---")
          if (this.imgArr.length <= 9) {
            //console.log(datas.get("profile"))
            let res = await axios
              .post(
                "/utility/uploadPicture",
                formData,
                { timeout: 600000 },
                config
              )
              .then(res => {
                let that = this;
                that.imgArr[n].filePath = res.data.result.filePath;
                that.imgArr[n].index = indexCount;
                that.imgArr[n].thumbUrl = res.data.result.thumbUrl;
                that.imgArr[n].discussionOriginalPicture =
                  res.data.result.localThumbUrl;
                setTimeout(() => {
                  indexCount++;
                  this.checkImgLogo = false;
                  that.imgUpLoad(allFile, indexCount);
                }, 300);
                this.imgArr = [...this.imgArr];
              })
              .catch(data => {
                this.checkImgLogo = false;
                this.$router.push({
                  path: "/ImageError"
                });
                this.$Toast("上传失败");
                return;
              });
            if (this.imgArr.length >= 9) {
              this.checkImgLogo = false;
              this.$Toast("最多可以放九张图片");
            }
          }
        };
      };
    },
    //上传图片
    updateImg(e) {
      let flileLength = e.target.files.length;
      if (flileLength > 9) {
        this.$Toast("最多可以放九张图片");
        return;
      }

      this.checkImgLogo = true;
      let indexCount = 0;
      this.imgUpLoad(e.target.files, indexCount);
    },
    //处理评论
    async InitReply(html, length) {
      await this.getChanJieDetailBaskHomeWorkAction(
        this.disposedata2(html, length)
      );
      if (this.chanJieDetailBaskHomeWorkData.msg == "请求成功") {
        await this.getChanJieDetailHomeWorkSunAction(this.disposedata1());
        this.$refs.richTextTxt.clearInput()
        this.$router.push({
          path: "/chanjiedetail"
        });
      } else {
        this.$Toast(this.chanJieDetailBaskHomeWorkData.msg);
      }
    },
    //处理公共数据2  发帖子数据
    disposedata2(html, len) {
      let data = {
        content: html,
        courseId: this.$route.query.id,
        courseType: 1,
        picturesUrlList: this.imgArr,
        token: "",
        contentNum: len
      };
      return data;
    },
    //处理公共数据2  帖子列表（晒作业列表）
    disposedata1() {
      let data = {
        courseId: this.$route.query.id,
        pageIndex: 1,
        courseType: 1,
        sortType: "create_time",
        token: ""
      };
      return data;
    }
  }
};
</script>
<style lang="scss" scoped>
.app-remmber-sun-title {
  display: inline-block;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: #ccc;
  font-size: 0.8rem;
  width: 6.4357rem;
}
.checkImgmodel {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #ccc;
  z-index: 9999;
  opacity: 0.3;
  .checkImgMinmodel {
    width: 6rem;
    height: 6rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -3rem;
    margin-top: -3rem;
    background: rgba($color: #000000, $alpha: 0.5);
    img {
      width: 3rem;
      height: 3rem;
      position: absolute;
      left: 50%;
      top: 40%;
      margin-left: -1.5rem;
      margin-top: -1.5rem;
    }
    span {
      position: absolute;
      bottom: 0.6rem;
      left: 0;
      color: #fff;
      width: 100%;
      text-align: center;
    }
  }
}
.BaskhomeWork-Content .fileHomeWorkBtn {
  border: none !important;
  overflow: hidden;
}
.BaskhomeWork-Content .fileHomeWorkBtn::after {
  content: "";
  padding: 0 !important;
  background: url("../../../../static/mobile_img/addimg.png") #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  background-size: cover;
}
.applere05 {
  margin-left: 0.05rem !important;
}
.w-e-text-container {
  border: none !important;
}
.mobile_content article:last-child {
  margin-bottom: 0rem;
}
.Evaluation-content {
  // width: 100%;
  height: 3.0625rem;
  text-align: right;
  font-family: "FZLTHJW--GB1-0";
  position: absolute;
  top: 0;
  right: 0;
}
.Evaluation-content-length {
  position: absolute;
  z-index: 55555555555;
  right: 0; // top: -40px;
  color: #999;
  margin-right: 6.25rem;
  font-size: 0.75rem;
  span {
    color: #c4a57f;
  }
}
.Define_footFixed {
  height: auto;
}
.Define_footFixed button {
  position: relative;
}
</style>
<style>
.w-e-toolbar {
  display: none;
}
.w-e-item img {
  width: auto;
}
p img {
  width: auto;
}
.w-e-text img {
  width: auto;
}
</style>



