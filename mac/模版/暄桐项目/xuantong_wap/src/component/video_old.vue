<template>
    <section style="height:100%">
        <video  id="video"  mutedstyle="height:100%"  height="100%"  webkit-playsinline="" x5-playsinline="" playsinline="" ref="myVideo"  controls :poster="data.courseThumPictureUri" @play="videoPlay()" :src="url.highUrl" type="video/mp4" autoplay>当前浏览器不支持最新的video播放
    </video>
    <!--   -->
    <!-- x-webkit-airplay="true" x5-playsinline="true" webkit-playsinline="true" playsinline="true"  -->
    </section>
</template>

<script>
    import {
        mapState,
        mapMutations,
        mapActions,
        mapGetters
    } from "vuex";
    export default {
        data() {
            return {
                timer: null,
                NewTime:0
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
            },
            initTimerone:{
                type:null
            }
        },
        watch: {},
        mounted(){
            this.videoPlay()

            if(this.initTimerone){
                let that   = this
                var video = document.getElementById('video');
                    video.addEventListener('play', function () {//播放开始执行的函数
                            that.initTimer()
                            //console.log('我播放了')
                         
                    });
                    video.addEventListener('pause', function () {//暂停开始执行的函数
                          
                            clearInterval(that.timer);
                            that.clearinitTimer()
                             
                            //console.log('我暂停了')
                    });
           }

        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods: {
            videoPlay(){
                // if(this.$refs.myVideo.currentTime>=2){
                //     this.$refs.myVideo.currentTime=0 
                // }
                this.$refs.myVideo.play()
            },
            timeDisplay(){
                let that = this
                var video = document.getElementById('video');
                    //使用事件监听方式捕捉事件
                    video.addEventListener("timeupdate",function(){
                        var timeDisplay;
                        //用秒数来显示当前播放进度
                        timeDisplay = Math.floor(video.currentTime);
                        that.NewTime = timeDisplay
                        return timeDisplay
                    },false);
            },
            //记录时间
            initTimer(){
                // let that = this;
                this.timer = setInterval(() => {
                    this.timeDisplay()
                    //console.log('时间哦',this.NewTime)
                        this.$axios.post("/utility/rememberVideoTime", {
                                classhourId: this.initTimerone,
                                token: "",
                                time: this.NewTime
                        });
                }, 30000);
            },
            clearinitTimer(){
                this.timeDisplay()
                this.$axios.post("/utility/rememberVideoTime", {
                                classhourId: this.initTimerone,
                                token: "",
                                time: this.NewTime
                });
                //console.log('时间暂停',this.NewTime)
            }
        }
    }
</script>
<style lang="scss" scoped>
    section{
        width: 100%!important;
        video{
            width: 100%!important;
        }
    }
    .videoContent video{
        height:14rem!important;
    }
</style>


