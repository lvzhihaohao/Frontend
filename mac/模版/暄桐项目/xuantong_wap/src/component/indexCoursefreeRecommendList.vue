<template>
    <div class="Chairclass-content">
        <div class="app-videoContent-img" v-if="!videosShowFlag" @click='videosShow'>
            <img v-lazy="data.courseThumPictureUri" style="width: 100%;height: 11.25rem;border-radius: .18rem;"/>
            <div class="videoContent-img-zhe"></div>
        </div>
        <Videos v-if="flag&&videosShowFlag" :data="this.videoObj" :url="Rurl" :index="0" ref="dplayer"/>
        <p class="Chairclass_icon text-center">
            <a href='javascript:void(0)'>
                <span class="c9 fz12">
                     <i class="kankan"><img src="../../static/img/kankan.png" class="img125" alt=""></i>&nbsp;<span >{{data.clickVolume}}</span>
                    <!-- <i style="font-size: 1.4rem;" class="iconfont icon-yulan"></i><span>{{data.clickVolume}}</span> -->
                </span>
            </a>
            <a href='javascript:void(0)'>
                <span class="c9 fz12" @click='comment(data.courseId)'>
                    <i class="messCou"><img src="../../static/img/messCou.png" alt=""></i>&nbsp;<span style="line-height:1.4rem;">{{data.commentNum}}</span>
                    <!-- <i  style="font-size: 1.4rem;" class="iconfont icon-pinglun"></i> <span>{{data.commentNum}}</span> -->
                </span> 
            </a>
            <a href='javascript:void(0)'>
                <span class="c9 fz12" @click='giveLike(data.courseId)' v-if='data.isLiked'>      
                    <i class="starClick"><img src="../../static/img/starClick.png" alt=""></i>&nbsp;<span style="line-height:1.3rem;">{{data.likeNum}}</span>
                   <!-- <i  style="font-size: 1.4rem;" class="iconfont icon-xihuanActive"></i><span>{{data.likeNum}}</span> -->
                </span>
                <span class="c9 fz12" @click='giveLike(data.courseId)' v-else>      
                    <i class="star"><img src="../../static/img/star.png" alt=""></i>&nbsp;<span style="line-height: 1.3rem;">{{data.likeNum}}</span>
                   <!-- <i style="font-size: 1.4rem;" class="iconfont icon-xihuan"></i><span>{{data.likeNum}}</span> -->
                </span>
            </a>
        </p>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import Videos from './video_old'
export default {
    data() {
        return {
            videoObj:{},
            flag : false,
            Rurl:'',
            videosShowFlag:false
        }
    },
    props:{
        data:{
            type:null,
            require:true
        }
    },
    components:{
        Videos
    },
    computed:{
        ...mapState({
            //免费视频点赞数据
            coursefreeGiveLikeData:state=>state.indexStore.coursefreeGiveLikeData
        })
    },
    
    methods:{
        ...mapActions({
            //免费视频点赞方法
            getIndexCoursefreeGiveLikeAction : 'indexStore/getIndexCoursefreeGiveLikeAction'
        }),
        //处理点赞接口数据
        disposedata2 (id) {
            let data={
                courseFreeId:id,
                token:''
            };
            return data;
        },
        async giveLike (id) {
            await this.getIndexCoursefreeGiveLikeAction(this.disposedata2(id))
            if(this.coursefreeGiveLikeData.msg=='请求成功'){
                this.$emit('courseFreeParent')
            }else if(this.coursefreeGiveLikeData.code == 600001){
                this.$Toast(this.coursefreeGiveLikeData.msg); 
            }
        },
        comment(id){
            this.$router.push({
                path:'/chairdetails',
                query:{
                    id:id,
                    type:'FreeVideo'}
            })
        },
        videosShow(){
            //console.log("----")
            this.videosShowFlag=true;
            this.flag=true;
            this.$nextTick(()=>{
                // this.$refs.dplayer.play()
            })
        }
    },
    mounted () {
        // this.$emit('courseFreeParent')
        // //console.log(this.data,222)
          this.$axios.post('/utility/getUrl',{key:this.data.courseVideoUri}).then(res=>{
              this.Rurl =  res.data.result
            //   //console.log(this.Rurl,'5555555555555')
              this.videoObj =  this.data;
              this.flag = true
        })
        // this.$nextTick(()=>{
        //    
        // })
    }
}
</script>
<style lang='scss' scoped>
.app-videoContent-img{
    border-radius: .18rem;
    width: 100%;
    height: 11.25rem;
    position: relative;
    .videoContent-img-zhe{
        position: absolute;
        top: 0;
        left: 0;
        background:black;
        opacity: 0.5;
        width: 100%;
        height: 100%;
         border-radius: .18rem;
    }
    .videoContent-img-zhe::after{
    border-radius: .18rem;
      cursor: pointer;
      content: url('../../static/img/ico-FreeVideo-cf.png');
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      position: absolute;
      top: 0px;
      text-align: center;
      vertical-align: middle;
      left: 0px;
      line-height: 210px;
    }
}
.Chairclass-content{
    border-radius:.18rem; 
}
.Chairclass_icon.text-center{
    margin-top:.8rem !important;
    margin-bottom:1.75rem !important;
    border-radius:.18rem; 
    display:flex;
    a{
        flex:1; 
        .c9{
            span{
                font-size:.75rem;
                margin-left:0.25rem;
            }
        }
    }
}
video{
    border-radius:.188rem; 
}
.c9{
    display:flex;
    justify-content: center;
    i{
                vertical-align: middle;
                font-size: 1.25rem;
                font-weight: bold;
               .img125{
                    width: 1.3rem;
                        height: 1.3rem;
               }
                img{
                        width: 1rem;
                        height: 1rem;
                        border-radius: 0 !important;
                }
        // width:1.5rem;
        // height:1rem;
        // margin-right:.25rem;
    }
}

</style>


