
<template>
  <div class="video-body">
    <video ref="video" class="video-js" controls :poster="poster" crossOrigin="../../../static/icon/shipin.png"  :src="url.highUrl" type="video/mp4">
      </video>
  </div>
</template>

<script>
  /**
   * @author 冷 (https://github.com/LengYXin)
   * @email lengyingxin8966@gmail.com
   * @create date 2019-06-03 10:32:52
   * @modify date 2019-06-03 10:32:52
   * @desc [description]
   */
  import video from "video.js";
  import "video.js/dist/video-js.css";
  export default {
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
      //console.log(this.poster,'我是srcsrc')
      //  this.$axios.post("/utility/getUrl",{key:this.src}).then((res)=>{
      //   if(res.code==0){
      //     this.tt=res.url
      //   }
      // })
      //console.log("TCL: mounted -> this.src", this.src);
      video(this.$refs.video, {
        autoplay:true,
        controls: true,
      });
    }
  };
</script>

<style lang="scss" scoped>
  .video-body {
    width: 20rem;
    margin: auto;
    height: 11.25rem;
    .video-js {
      width: 100%;
      height: 100%;
      border-radius: .18rem;
      overflow: hidden;
    }
    .video-js .vjs-big-play-button {
      left: 50%;
      top: 50%;
    }
  }
</style>

<style lang="scss">
  .video-body {
     width: 20rem;
     margin: auto;
     height: 11.25rem;
    .video-js .vjs-big-play-button {
      background: url("../../static/icon/shipin.png");
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    .vjs-poster {
      border-radius: .18rem;
    }
    .vjs_video_3 {
      border-radius: .18rem;
    }
    .vjs-error-display{
        border-radius: .18rem;
    }
    .vjs-modal-dialog-content{
      border-radius: .18rem;
    }
    .video-js .vjs-modal-dialog {
      border-radius: .18rem;
    }
    .video-body .video-js .vjs-modal-dialog {
      border-radius: .18rem;
    }
  }
</style>