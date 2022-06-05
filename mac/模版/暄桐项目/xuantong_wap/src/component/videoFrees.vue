<template>
  <section>
    <div class="video-dPlayer" ref="videoPlay"></div>
  </section>
</template>

<script>
  import DPlayer from "dplayer";
  import "vue-dplayer/dist/vue-dplayer.css";
  import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
        videoObj: {},
        dp: null,
        options: {
          video: {
            // url:"",
            pic: ""
          }
        }
      };
    },
    props: {
      data: {
        type: null
      },
      url: {
        type: null
      },
      index: {
        type: null
      }
    },
    mounted() {
      let obj = {};
      obj.video = {};
      // obj.video.quality = [{
      //     name: "高清",
      //     url: this.url.highUrl
      //   },
      //   {
      //     name: "标清",
      //     url: this.url.url
      //   },
      //   {
      //     name: "流畅",
      //     url: this.url.lowUrl
      //   }
      // ];
       obj.video.url=this.url.highUrl
      obj.video.defaultQuality = 1;
      obj.video.pic = this.data.courseThumPictureUri
      this.options = obj
      this.dp = new DPlayer({
        container: document.getElementsByClassName("video-dPlayer")[this.index],
        autoplay: false,
        theme: "#FADFA3",
        loop: false,
        lang: "zh-cn",
        screenshot: false,
        hotkey: true,
        preload: "auto",
        volume: 0.7,
        mutex: true,
        video: this.options.video,
        danmaku:false,
      });
      this.$refs.videoPlay.oncontextmenu=()=>false;
    },
    watch: {
      options(newVal, oldVal) {
        //   //console.log("watch", newVal, oldVal);
        //   //console.log(this.options.video);
        this.dp = new DPlayer({
          container: document.getElementsByClassName("video-dPlayer")[this.index],
          autoplay: false,
          lang: "zh-cn",
          theme: "#FADFA3",
          loop: false,
          lang: "zh-cn",
          screenshot: false,
          hotkey: true,
          preload: "auto",
          volume: 0.7,
          mutex: false,
          video: this.options.video,
          danmaku:false
        });
        document.getElementsByClassName('dplayer-full-icon')[0].style.display="none"
      }
    },
    methods:{
      play(){
        this.dp.play()
      }
    },
    beforeDestroy(){
      this.dp={},
      this.options={}
    },
    destroyed(){
      this.dp={},
      this.options={}
    },
  }
</script>
<style lang="scss">
  .dplayer-video-wrap{
    overflow: hidden;
    height: 210px;
  }
  .dplayer-web-fullscreen-fix{
    .dplayer-video-wrap{
      overflow: hidden;
      height: 100%;
    }
  } 
  // .video-dPlayer{
  //   width:400px;
  //   height: 11.2rem;
  //   div{
  //         width:400px;
  //   height: 11.2rem;
  //   }
  // }
</style>


