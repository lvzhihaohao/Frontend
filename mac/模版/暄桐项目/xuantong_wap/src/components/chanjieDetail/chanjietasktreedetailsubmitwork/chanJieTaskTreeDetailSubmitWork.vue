<template>
  <!-- 写作业 -->
  <div id="app" style="paddingBottom:4rem">
    <article class="nav-title" v-if="!this.$flag">
      <mt-header title="交作业" fixed>
        <a href="javascript:void(0);" slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    </article>
    <img
      src="../../../../static/img/back.png"
      class="gu_nav_title_img"
      v-if="this.$flag"
      @click="goBack"
    />
    <div class="pl-27 pr-27" style="marginTop: 2.5625rem;paddingBottom:3rem">
      <!--mobile_content 固定底部的话+add -->
      <article>
        <div class="BaskhomeWork-Content" style="overflow:auto;">
          <RichText
            ref="richTextTxt"
            :InitReply="InitReply"
            :RichTextisFlag="RichTextisFlag"
            :imgArr="imgArr"
            :replayText="placeholderText"
            :placeholderFlag="true"
            :sendText="sendText"
          />
          <div class="fileHomeWork_img">
            <div class style="display:flex;flex-wrap: wrap;marginBottom:.5rem;">
              <span v-for="(item,index) in imgArr" :key="index">
                <i @click="removeImg(index)" v-if="item.filePath!='loading'">&#10005;</i>
                <img :src="item.thumbUrl" v-lazy="item.thumbUrl" :key="index" alt />
              </span>
              <span v-show="imgArr.length<9">
                <input
                  multiple
                  type="file"
                  class="fileHomeWorkBtn"
                  accept="image/*"
                  @change="updateImg"
                  ref="ipt"
                />
              </span>
            </div>
          </div>
          <span class="app-remmber-sun-title">最多9张图片</span>
          <div class style="marginBottom:6rem;height:1.875px;">
            <label for="remmber" style="position: relative">
              <!-- <input class="app-input-ht5c" type="checkbox"/> -->
              <input
                @click="mark"
                class="remmber"
                type="checkbox"
                name="remmber"
                id="remmber"
                ref="ipt"
              />
              <span></span>
              <img
                v-show="markflag"
                class="app-remmber-img"
                src="../../../../static/img/对号 (1)_wps图片.png"
              />
              <span class="c4a5 dis_in_block ml-20 app-remmber-sun">同时分享至“晒作业”</span>
            </label>
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
import { getUserInfoCookie, sumitImageFile } from "../../../public/index";
import { mapActions, mapState } from "vuex";
export default {
  name: "chanjietasktreedetailsubmitwork",
  data() {
    return {
      sendText: "提交",
      imgArr: [],
      markflag: false,
      mackindex: 0,
      length: 0,
      isSun: false,
      RichTextisFlag: 0,
      thumbUrlADC: "",
      checkImgLogo: false,
      placeholderText: `说说你的作业感想吧`
    };
  },
  computed: {
    ...mapState({
      //提交作业返回数据
      chanJieTaskTreeDetailSubmitWorkData: state =>
        state.chanJieTaskTreeDetailSubmitWorkStore
          .chanJieTaskTreeDetailSubmitWorkData
    })
  },
  beforeRouteEnter(to, from, next) {
    let SubmitWorkUrl = window.localStorage.getItem("SubmitWorkUrl");
    if (from.path == "/chanjiedetailmysubmitypework") {
      window.localStorage.setItem(
        "SubmitWorkUrl",
        "/chanjiedetailmysubmitypework"
      );
    } else if (from.path == "/") {
      if (SubmitWorkUrl) {
        window.localStorage.setItem("SubmitWorkUrl", SubmitWorkUrl);
      }
    } else {
      window.localStorage.setItem("SubmitWorkUrl", "");
    }
    next();
  },
  components: {
    RichText
  },
  created() {
    this.thumbUrlADC = require("../../../../static/img/816.gif");
  },
  mounted() {
    let taskclasshourType = window.localStorage.getItem("taskclasshourType");
    this.RichTextisFlag = taskclasshourType;
    if (this.$route.query) {
      window.localStorage.setItem(
        "submitWorkObj",
        JSON.stringify(this.$route.query)
      );
    }
    window.scrollTo(0, 0);
  },
  methods: {
    ...mapActions({
      //提交作业方法
      getChanJieTaskTreeDetailSubmitWorkAction:
        "chanJieTaskTreeDetailSubmitWorkStore/getChanJieTaskTreeDetailSubmitWorkAction"
    }),
    mark() {
      this.mackindex++;
      //console.log(this.mackindex % 2 == 0);
      if (this.mackindex % 2 == 0) {
        this.markflag = false;
        this.isSun = false;
      } else {
        this.markflag = true;
        this.isSun = true;
      }
      //   //console.log(document.getElementsByTagName("body")[0])
    },
    goBack() {
      let SubmitWorkUrl = window.localStorage.getItem("SubmitWorkUrl");
      let submitWorkObj = JSON.parse(
        window.localStorage.getItem("submitWorkObj")
      );
      //console.log(SubmitWorkUrl,'SubmitWorkUrl')
      if (SubmitWorkUrl) {
        this.$router.push({
          path: SubmitWorkUrl,
          query: {
            id: this.$route.query.id || submitWorkObj.id
          }
        });
      } else {
        this.$router.back(-1);
      }
    },
    //处理评论
    async InitReply(html, length) {
      let submitWorkObj = JSON.parse(
        window.localStorage.getItem("submitWorkObj")
      );
      let taskclasshourType = window.localStorage.getItem("taskclasshourType");
      await this.getChanJieTaskTreeDetailSubmitWorkAction(
        this.disposedata2(taskclasshourType, html, length)
      );
      if (this.chanJieTaskTreeDetailSubmitWorkData.msg == "请求成功") {
        this.$refs.richTextTxt.clearInput()
        this.$router.push({
          path: "/chanjiedetailmysubmitypework",
          query: {
            id: this.$route.query.id || submitWorkObj.id
          }
        });
      } else {
        this.$Toast(this.chanJieTaskTreeDetailSubmitWorkData.msg);
      }
    },
    //删除上传图片
    removeImg(index) {
      this.imgArr.splice(index, 1);
    },
    //上传图片
    updateImg(e) {
      let flileLength = e.target.files.length;
      let checkImgType = true;
      if (flileLength > 9) {
        this.$Toast("最多可以放九张图片");
        return;
      }
      let indexCount = 0;
      this.imgUpLoad(e.target.files, indexCount);
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
        // e.target.result;
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
          // const datas = sumitImageFile(reader.result);
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
          if (this.imgArr.length <= 9) {
            let res = await axios
              .post(
                "/utility/uploadPicture",
                formData,
                {
                  timeout: 600000
                },
                config
              )
              .then(res => {
                indexCount++;
                let that = this;
                setTimeout(() => {
                  that.imgArr[n].filePath = res.data.result.filePath;
                  that.imgArr[n].index = indexCount;
                  that.imgArr[n].thumbUrl = res.data.result.thumbUrl;
                  that.imgArr[n].homeworkOriginalPicture =
                    res.data.result.localThumbUrl;
                  this.checkImgLogo = false;
                  that.imgUpLoad(allFile, indexCount);
                }, 300);
                this.imgArr = [...this.imgArr];
              })
              .catch(data => {
                this.$Toast("上传失败");
                this.$router.push({
                  path: "/ImageError"
                });
                this.checkImgLogo = false;
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
    //处理公共数据2  发帖子数据
    disposedata2(id, html, length) {
      let chanJieId = window.localStorage.getItem("chanJieId");
      let submitWorkObj = window.localStorage.getItem("submitWorkObj");
      let data = {
        courseId: chanJieId,
        content: html,
        homeworkAssignId: this.$route.query.id || submitWorkObj.id,
        homeworkTypeId: id,
        isSun: this.isSun,
        picList: this.imgArr,
        token: "",
        courseType: "1",
        contentNum: length
      };
      return data;
    }
  }
};
</script>
<style>
</style>

<style lang="scss" scoped>
.app-remmber-sun-title {
  display: inline-block;
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
  background: rgba($color: #000000, $alpha: 0.3);
  z-index: 9999;
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
#editorElem {
  .w-e-toolbar {
    background: red;
    border: none !important;
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
.app-Define_footFixed {
  height: none !important;
}
.mobile_content article:last-child {
  margin-bottom: 0rem;
}
.remmber {
  display: none;
}
.remmber[type="checkbox"] + span {
  display: inline-block;
  border-radius: 0.05rem;
  width: 0.75rem;
  height: 0.75rem;
  border: 0.075rem solid #c4a57f;
  color: #c4a57f;
  position: absolute;
  top: 2px;
  /* left: -.5rem; */
}
.remmber[type="checkbox"]:checked + span:after {
  content: "\2713";
  color: #c4a57f;
  border-color: #c4a57f;
  position: absolute;
  font-size: 1rem !important;
  left: -0.01rem;
  display: none;
}
.app-remmber-img {
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  left: 0.0875rem;
  top: 0.2125rem;
}
.app-remmber-sun {
  position: absolute;
  left: 0;
  width: 12.5rem;
  top: 1px;
}
</style>
<style>
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


