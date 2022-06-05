
<template>
  <div>
    <i class="iconfont icon-biaoqing" @click="onVisible"></i>
      <ul class="emoji-list" v-bind:class="{ emojiShow: visible }" @click="click">
      <li>&#x1F600;</li>
      <li>&#x1F601;</li>
      <li>&#x1F602;</li>
      <li>&#x1F603;</li>
      <li>&#x1F604;</li>
      <li>&#x1F605;</li>
      <li>&#x1F606;</li>
      <li>&#x1F607;</li>
      <li>&#x1F608;</li>
      <li>&#x1F609;</li>
      <li>&#x1F60A;</li>
      <li>&#x1F60B;</li>
      <li>&#x1F60C;</li>
      <li>&#x1F60D;</li>
      <li>&#x1F60E;</li>
      <li>&#x1F60F;</li>
      <li>&#x1F610;</li>
      <li>&#x1F611;</li>
      <li>&#x1F612;</li>
      <li>&#x1F613;</li>
      <li>&#x1F614;</li>
      <li>&#x1F615;</li>
      <li>&#x1F616;</li>
      <li>&#x1F617;</li>
      <li>&#x1F618;</li>
      <li>&#x1F619;</li>
      <li>&#x1F61A;</li>
      <li>&#x1F61B;</li>
      <li>&#x1F61C;</li>
      <li>&#x1F61D;</li>
      <li>&#x1F61E;</li>
      <li>&#x1F61F;</li>
      <li>&#x1F620;</li>
      <li>&#x1F621;</li>
      <li>&#x1F622;</li>
      <li>&#x1F623;</li>
      <li>&#x1F624;</li>
      <li>&#x1F625;</li>
      <li>&#x1F626;</li>
      <li>&#x1F627;</li>
      <li>&#x1F628;</li>
      <li>&#x1F629;</li>
      <li>&#x1F62A;</li>
      <li>&#x1F62B;</li>
      <li>&#x1F62C;</li>
      <li>&#x1F62D;</li>
      <li>&#x1F62E;</li>
      <li>&#x1F62F;</li>
      <li>&#x1F630;</li>
      <li>&#x1F631;</li>
      <li>&#x1F632;</li>
      <li>&#x1F633;</li>
      <li>&#x1F634;</li>
      <li>&#x1F635;</li>
      <li>&#x1F636;</li>
      <li>&#x1F637;</li>
      <li>&#x1F638;</li>
      <li>&#x1F639;</li>
      <li>&#x1F63A;</li>
      <li>&#x1F63B;</li>
      <li>&#x1F63C;</li>
      <li>&#x1F63D;</li>
      <li>&#x1F63E;</li>
      <li>&#x1F63F;</li>
      <li>&#x1F640;</li>
      <li>&#x1F641;</li>
      <li>&#x1F642;</li>
    </ul>

   
  </div>
</template>

<script>
/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2019-05-27 12:00:12
 * @modify date 2019-05-27 12:00:12
 * @desc [description]
 */
import twemoji from "twemoji";
export default {
  data: () => ({
    visible: false
  }),
  methods: {
    onVisible() {
      this.visible = !this.visible;
    },
    click(event) {
      //console.log(event)
      // event.preventDefault()
      // event.stopPropagation()
      if (event.target.tagName.toLocaleUpperCase() === "IMG") {
        this.$emit("select", event.target);
      }
    }
  },
  mounted() {
    twemoji.parse(this.$el, {
      folder: "svg",
      ext: ".svg",
      base: "https://twemoji.maxcdn.com/",
      size: "32x32"
    });
    this.$el.addEventListener("click", event => {
      event.stopPropagation();
    });
    document.addEventListener(
      "click",
      () => {
        this.visible = false;
      },
      false
    );
  }
};
</script>

<style lang="scss">
i.icon-biaoqing {
  font-size: 1.5625rem;
  margin-left: 0.75rem;
  color: #999;
}
ul.emoji-list::before,
ul.emoji-list::after {
  content: "";
  display: block;
  clear: both;
}
ul.emoji-list {
  width: 100%;
  overflow: auto;
  transition: all 0.2s;
  height: 0;
  box-shadow: 0px 0px 1px 0px rgba(231, 231, 231, 0.72);
  //   display: none;
}
ul.emoji-list.emojiShow {
  height: 15rem;
  padding-left: .4rem;
  
}
ul.emoji-list * {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
ul.emoji-list li {
  font-size: 2.25rem;
  float: left;
  display: inline-block;
  // padding: 0.125rem;
  padding: 0.2rem;
//   margin: 0.25rem;
  line-height: 2.25rem;
  border-bottom:none!important;
  margin-top:0!important;
}
img.emoji {
  cursor: pointer;
  height: 1.875rem;
  width: 1.875rem;
  margin: 0 0.05em 0 0.1em;
  vertical-align: -0.1em;
}
ul.emoji-list>li>img {
  width: 1.875rem!important;
  height: 1.875rem!important;
  margin-right:0!important;
}
</style>