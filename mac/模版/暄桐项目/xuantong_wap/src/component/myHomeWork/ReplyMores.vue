<template>
  <section>
    <div class="App-Input-Fixed">
      <EmojiS :onAppendEmoji="onAppendEmoji" :ChangeOpenFlag="ChangeOpenFlag" ref="onAppendEmoji" />
      <div class="App-Input-content">
        <textarea
          type="text"
          id="input"
          ref="input"
          :placeholder="teaname"
          v-model="input"
          @focus="focus"
          @blur="blur"
        />
        <mt-button class="App-Input-button" @click="textSend">回复</mt-button>
      </div>
    </div>
  </section>
</template>

<script>
import EmojiS from "@/component/editer/EmojiS";
export default {
  data() {
    return {
      input: "", //文本域内容
      str: "", //输出字段
      rangeData: { text: "", start: 0, end: 0 },
      n: 0,
      OpenFlag: false,
      innerHeight1: 0,
      innerHeight2: 0,
      CeHight: 0 //高度
    };
  },
  components: {
    //   emoji,
    EmojiS
  },
  props: {
    teaname: {
      type: null
    },
    replyFlags: {
      type: null
    },
    replyIds: {
      type: null
    },
    myHomeWorkParent: {
      type: null
    },
    courseId: {
      type: null
    }
  },
  methods: {
    //获取焦点
    async focus() {
      //console.log('我怎么不获取焦点')
      var tx = document.getElementById("input");
      tx.focus();
      this.innerHeight1 = window.innerHeight;
      this.n = 0;
      this.rangeData = { text: "", start: 0, end: 0 };
      await this.HideEmoil();
    },
    //隐藏表情  滚动条位置和之前一样
    HideEmoil() {
      this.$refs.onAppendEmoji.onVisibleFlag();
      if (this.$flag) {
        this.SafialEmoji();
        // this.WXEmoji()
      } else {
        this.SafialEmoji();
      }
      this.OpenFlag = false;
    },
    //脱离焦点
    blur() {
      this.$nextTick(() => {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 200);
      });
      this.OpenFlag = false;
    },
    //记录光标位置
    function(textarea) {
      this.n = 1;
      var rangeData = { text: "", start: 0, end: 0 }; //光标位置
      if (textarea.setSelectionRange) {
        // W3C 记录光标位置
        rangeData.start = textarea.selectionStart;
        rangeData.end = textarea.selectionEnd;
        rangeData.text =
          rangeData.start != rangeData.end
            ? textarea.value.substring(rangeData.start, rangeData.end)
            : "";
      } else if (document.selection) {
        // IE
        var i,
          oS = document.selection.createRange(),
          oR = document.body.createTextRange();
        oR.moveToElementText(textarea);

        rangeData.text = oS.text;
        rangeData.bookmark = oS.getBookmark();
        for (
          i = 0;
          oR.compareEndPoints("StartToStart", oS) < 0 &&
          oS.moveStart("character", -1) !== 0;
          i++
        ) {
          if (textarea.value.charAt(i) == "\r") {
            i++;
          }
        }
        rangeData.start = i;
        rangeData.end = rangeData.text.length + rangeData.start;
      }
      return rangeData;
    },
    //插入表情
    add(textarea, rangeData, text) {
      var oValue, nValue, oR, sR, nStart, nEnd, st;
      if (textarea.setSelectionRange) {
        // W3C
        oValue = textarea.value;
        nValue =
          oValue.substring(0, rangeData.start) +
          text +
          oValue.substring(rangeData.end);
        this.rangeData.start = rangeData.start + Number(text.length);
        this.rangeData.end = rangeData.end + Number(text.length);
        nStart = nEnd = rangeData.start + text.length;
        st = textarea.scrollTop;
        textarea.value = nValue;
        this.input = textarea.value;
        // Fixbug:
        if (textarea.scrollTop != st) {
          textarea.scrollTop = st;
        }
      } else if (textarea.createTextRange) {
        // IE
        sR = document.selection.createRange();
        sR.text = text;
        sR.setEndPoint("StartToEnd", sR);
        sR.select();
      }
    },
    //插入表情
    onAppendEmoji(text) {
      this.OpenFlag = true;
      var tx = document.getElementById("input");
      if (this.n == 0) {
        var pos = this.function(tx); //获取光标位置  和选中
        this.add(tx, pos, text);
      } else {
        this.add(tx, this.rangeData, text);
      }
      tx.scrollTop = tx.scrollHeight;
    },
    //发送
    textSend() {
      const emoji = require("../../../static/emoji.json");
      let str = this.input;
      emoji.forEach((item, index) => {
        if (index <= 99) {
          let val = item.value; //
          let reg1 = /[\[\]]/g; //匹配中文点正则
          val = val.replace(reg1, "");
          let reg = new RegExp("\\[" + val + "\\]", "g");
          str = str.replace(reg, () => {
            return `<img style="width:1rem;height:1rem" src='${item.url}'/>`;
          });
        }
      });
      this.str = str;
      if (this.input == "") {
        this.$Toast("消息不能为空");
        return;
      } else {
        this.SendAuto(`<p>${this.str}</p>`, this.input.length);
        this.$refs.onAppendEmoji.onVisibleFlag();
      }
    },
    SendAuto(html, length) {
      this.$axios
        .post("/userhomework/reply", {
          courseId: this.courseId,
          token: "",
          replyContent: html,
          homeworkReviewId: this.replyIds, //对方的id
          replyContentNum: length || this.length
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$emit("myHomeWorkParent");
            this.editor.txt.clear();
            this.input = "";
            this.editorContent = "";
            this.$emit("replyFlags");
          }else{
              this.$Toast(res.data.msg)
          }
        });
    },
    ChangeOpenFlag() {
      this.OpenFlag = true;
    },
    getClientHeight() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight =
          document.body.clientHeight < document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      } else {
        var clientHeight =
          document.body.clientHeight > document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    //微信抬起  //微信下晒作业和站内信和视频
    WXEmoji() {
      var tx = document.getElementById("input");
      if (this.OpenFlag) {
        this.$nextTick(() => {
          setTimeout(() => {
            document.body.scrollTop = document.body.scrollHeight;
          }, 300);
        });
      } else {
        this.$nextTick(() => {
          setTimeout(() => {
            // tx.scrollIntoView(true)
          }, 300);
        });
      }
      //   if(this.OpenFlag){
      //             let HH = this.ThisH +  this.getClientHeight()/2.1
      //             //console.log(this.getClientHeight()/2.1,'我是触发焦点')
      //             this.$nextTick(() => {
      //                 setTimeout(() => {
      //                 window.scrollTo(HH,HH);
      //                 }, 100)
      //             });
      //         }
      //   let HH = this.ThisH +  this.getClientHeight()
      //             //console.log(this.getClientHeight(),'我是触发焦点')
      //             this.$nextTick(() => {
      //                 setTimeout(() => {
      //                     this.innerHeight2=window.innerHeight
      //                     let HHs = this.innerHeight1-this.innerHeight2/2.1
      //                     let has = HHs>HH?HHs:HH
      //                     //console.log(HHs,"------HHs----")
      //                     //console.log(has,"------has----")
      //                     window.scrollTo(0,has);
      //                 }, 200)
      //        });
    },
    //浏览器下晒作业和站内信抬起
    SafialEmoji() {
      var tx = document.getElementById("input");
      if (this.OpenFlag) {
        this.$nextTick(() => {
          setTimeout(() => {
            window.scrollTo(0, this.CeHight);
          }, 100);
        });
      } else {
        this.$nextTick(() => {
          setTimeout(() => {
            let H111 = this.getClientHeight() - window.innerHeight;
            this.CeHight = H111;
            //  tx.scrollIntoView(true)
            //console.log(this.CeHight,'this.CeHightthis.CeHight')
            // window.scrollTo(this.CeHight,this.CeHight );
          }, 200);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.App-Input-Fixed {
  position: fixed;
  bottom: 0px;
  z-index: 11;
  box-shadow: 0px 0px 8px 0px rgba(231, 231, 231, 0.72);
  width: 100%;
  left: 0px;
  background: #fff;
  // height:3.0625rem;
  line-height: 3.0625rem;
  display: flex;
  justify-content: space-between;
  -webkit-box-pack: justify;
  .App-Input-content {
    width: auto;
    height: 3.0625rem;
    text-align: right;
    font-family: "FZLTHJW--GB1-0";
    position: absolute;
    top: 0;
    right: 0;
    left: 3.125rem;
    padding: 0;
    bottom: 0px;
    textarea {
      position: absolute;
      left: 0;
      width: 14rem;
      top: 0.9rem;
      outline: none;
      border: none;
      height: 1.8rem;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
  .App-Input-button {
    width: 5.625rem;
    border-radius: 0px;
    color: #fff;
    height: 3.0625rem;
    background: #c4a57f;
  }
}
</style>
