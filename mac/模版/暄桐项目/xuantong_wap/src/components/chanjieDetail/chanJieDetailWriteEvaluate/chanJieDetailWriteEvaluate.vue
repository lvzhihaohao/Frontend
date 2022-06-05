<template>
  <div id="app" style="overflow:hidden">
    <article class="nav-title" v-if="!this.$flag">
      <mt-header title="我想对教室说..." fixed>
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
    <div class="pl-15 pr-15 app-hei-100" :style="{marginTop:'2.5625rem'}">
      <RichText
        ref="richTextTxt"
        :InitReply="InitReply"
        replayText="把最想说的告诉教室，仅支持一次留言机会哈~"
        :placeholderFlag="false"
        :sendText="sendText"
      />
    </div>
  </div>
</template>
<script>
import RichText from "@/component/editer/RichTextPush";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      sendText: "发表",
      length: 0
    };
  },
  name: "chanjiedetailwriteevaluate",
  computed: {
    ...mapState({
      //写评价返回数据
      chanJieDetailWriteEvaluateData: state =>
        state.chanJieDetailWriteEvaluateStore.chanJieDetailWriteEvaluateData
    })
  },
  components: {
    RichText
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    ...mapActions({
      //写评价方法
      getChanJieDetailWriteEvaluateAction:
        "chanJieDetailWriteEvaluateStore/getChanJieDetailWriteEvaluateAction"
    }),
    goBack() {
      this.$router.back(-1);
    },
    async InitReply(html, length) {
      //console.log(this.length,"this.length")
      let data = {
        comment: html,
        courseId: this.$route.query.id,
        courseType: 1,
        scoreLevel: 1,
        commentNum: length,
        token: ""
      };

      //console.log(data,"data")
      await this.getChanJieDetailWriteEvaluateAction(data);
      if (this.chanJieDetailWriteEvaluateData.msg == "请求成功") {
        this.$refs.richTextTxt.clearInput()
        this.$router.push({
          path: "/chanjiedetail"
        });
        this.$Toast("留言成功");
      } else {
        this.$Toast(this.chanJieDetailWriteEvaluateData.msg);
      }
    },
    textAreaChange() {
      this.length = this.$refs.textAreaIpt.value.length;
      if (this.$refs.textAreaIpt.value.length >= 2000) {
        this.$Toast("最大字数限制为2000");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.Define_lei {
  height: 3rem !important;
}
.Evaluation-content-length {
  position: absolute;
  z-index: 55555555555;
  right: 0;
  // top: -40px;
  color: #999;
  margin-right: 6.25rem;
  font-size: 0.75rem;
  span {
    color: #c4a57f;
  }
}
.Evaluation-content .evaluationBtn {
  top: 0 !important;
}
.app-hei-100 {
  height: 100%;
}
.BaskhomeWork-Content textarea {
  height: 100%;
  overflow: none;
}
.Evaluation-content {
  height: auto !important;
}
.BaskhomeWork-Content {
  .fz15 {
    border: none;
    outline: none;
  }
}
.BaskhomeWork-Content > .fz15::-webkit-input-placeholder {
  color: #999;
  font-size: 0.93rem;
  font-family: "FZLTHJW--GB1-0";
}
</style>


