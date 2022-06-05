<template>
  <section>
    <div class="App-Input-Sun">
      <textarea
        type="text"
        id="input"
        ref="input"
        :placeholder="replayText"
        v-model="input"
        @focus="focus"
        @blur="blur"
      />
      <div class="placeHold" v-if="placeHoldFlag&&placeholderFlag">
        <p>单张图片较大时,上传时间会比较长，建议控制在5M以内哦~</p>
      </div>
    </div>
    <div class="App-Input-Fixed" style="z-index:9999">
      <EmojiS :onAppendEmoji="onAppendEmoji" :Quto="Quto" ref="onAppendEmoji" />
      <div class="App-Input-content">
        <span style="font-size: 0.75rem;">
          <span style="color: #c4a57f">{{input.length}}</span>
          <span style="color: #999;">/2000</span>
        </span>
        <mt-button class="App-Input-button" @click="textSend">{{sendText}}</mt-button>
      </div>
    </div>
  </section>
</template>

<script>
// import emoji from "@/component/editer/emoji";
import EmojiS from "@/component/editer/EmojiS";
export default {
  data() {
    return {
      input: "", //文本域内容
      str: "", //输出字段
      rangeData: { text: "", start: 0, end: 0 },
      n: 0,
      placeHoldFlag: true
    };
  },
  watch: {
    input(newVal, oldVal) {
      if (newVal == "") {
        this.placeHoldFlag = true;
      } else {
        this.placeHoldFlag = false;
      }
    }
  },
  components: {
    //   emoji,
    EmojiS
  },
  props: {
    sendText: {
      type: null
    },
    //返回评论内容
    InitReply: {
      type: null
    },
    //提示文本
    replayText: {
      type: null
    },
    RichTextisFlag: {
      type: null
    },
    imgArr: {
      type: null
    },
    placeholderFlag: {
      type: null
    }
  },
  methods: {
    Quto() {},
    //获取焦点
    focus() {
      this.$refs.onAppendEmoji.onVisibleFlag();
      this.n = 0;
      this.rangeData = { text: "", start: 0, end: 0 };
    },
    //脱离焦点
    blur() {
      this.$nextTick(() => {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      });
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
        var i,
          oS = document.selection.createRange(),
          // Don't: oR = textarea.createTextRange()
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
          // Why? You can alert(textarea.value.length)
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
      var tx = document.getElementById("input");
      if (this.n == 0) {
        var pos = this.function(tx); //获取光标位置  和选中
        this.add(tx, pos, text);
      } else {
        this.add(tx, this.rangeData, text);
      }
      tx.scrollTop = tx.scrollHeight;
    },
    //清空input的值
    clearInput() {
      this.input = "";
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
          // //console.log(val,reg)

          str = str.replace(reg, () => {
            return `<img style="width:1.25rem;height:1.25rem" src='${item.url}'/>`;
          });
          //  //console.log(str)
        }
      });
      this.str = str;
      if (this.RichTextisFlag == "1") {
        if (this.imgArr.length <= 0) {
          this.$Toast("必须提交作业图片哦");
          return;
        } else {
          this.InitReply(`<p>${this.str}</p>`, this.input.length);
          this.$refs.onAppendEmoji.onVisibleFlag();
        }
      } else {
        if (this.input == "") {
          this.$Toast("内容不能为空");
          return;
        } else {
          this.InitReply(`<p>${this.str}</p>`, this.input.length);
          this.$refs.onAppendEmoji.onVisibleFlag();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.App-Input-Sun {
  width: 100%;
  height: 14.75rem;
  position: relative;
  textarea {
    width: 100%;
    outline: none;
    height: 12.75rem;
    padding: 0 !important;
    margin: 0 !important;
    border: none;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1rem;
  }
  .placeHold {
    position: absolute;
    padding: 0 !important;
    margin: 0 !important;
    top: 1.4rem;
    left: 0;
    color: #ccc;
    font-size: 1rem;
    p {
      font-family: inherit !important;
      font-size: 1rem;
    }
  }
  textarea::-webkit-input-placeholder {
    color: #ccc;
  }
  input::-moz-input-placeholder {
    color: #ccc;
  }
  input::-ms-input-placeholder {
    color: #ccc;
  }
}
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
