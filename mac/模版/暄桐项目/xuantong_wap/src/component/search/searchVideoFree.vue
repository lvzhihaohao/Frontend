<template>
    <div class="nav-title-video-more">
        <div class="dis_flow_root" v-for='(item,index) in data' :key='index'>
            <h3 class="fz18 c30  mb-15 fzFZXIYSJ" style="font-weight: 500;marginTop:1.5625rem" >{{item.courseName}}</h3>
            <p class="fz15 c5 app-searchVideo-lvTit">{{item.courseAbstract}}</p>
            <p class="fz15 c5 app-searchVideo-lvTime" >{{formData(item.publishTime,'uat')}}</p>
            <div class="videoContent">
                <div class="app-videoContent-img" @click='goChairDetail(item.courseId)'>
                    <img v-lazy="item.courseThumPictureUri" :key="item.courseId" style="width: 100%;height: 11.25rem;borderRadius: .18rem"/>
                    <div class="videoContent-img-zhe"></div>
                </div>
                <!-- <Videos :data='item' :url="item.courseVideoUri" :index="index"/> -->
                <p class="text-center" >
                    <span>
                        <i class="kankan"><img src="../../../static/img/kankan.png" style="height: 1.2rem;width: 1.2rem;" alt=""></i>
                        <b>{{item.clickVolume}}</b>
                    </span>
                    <span @click.stop='comment(item.courseId)'>
                        <i class="messCou"><img src="../../../static/img/messCou.png" alt=""></i>
                        <b>{{item.commentNum}}</b>

                    </span>
                    <span v-if='item.isLiked' @click.stop='giveLike(item.courseId,item)' >
                        <i class="starClick"><img src="../../../static/img/starClick.png" alt=""></i>
                        <b>{{item.likeNum}}</b>
                    </span>
                    <span v-else  @click.stop='giveLike(item.courseId,item)' >
                        <i class="star"><img src="../../../static/img/star.png" alt=""></i>
                        <b>{{item.likeNum}}</b>
                    </span>
                </p>
            </div>
        </div>
        <ScrollBottom  @timer="timer" @click="timer"  :moreTit="moreTit" ref="mychild"/>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import ScrollBottom from '@/component/ScrollBottom'
import Videos from '../videoFrees'
import {userclasshourTime,formData} from '@/public/index'
export default {
    name:'chairmorelist',
    data () {
        return {
            NewData:[],
            moreTit:'加载更多',
            Timingopen:null,
        }
    },
    props:{
        data:{
            type:null,
            required:true
        }
    },
    components:{
        Videos,
        ScrollBottom
    },
    computed : {
        ...mapState({
            //免费视频列表点赞方法返回数据
            coursefreeGiveLikeData:state=>state.indexStore.coursefreeGiveLikeData,

              Index:state=>state.searchStore.Index,
        })
    },
    mounted () {
        this.NewData = this.data
    },
    methods:{
        formData,
        ...mapActions({
            //免费视频列表点赞方法
            getIndexCoursefreeGiveLikeAction : 'indexStore/getIndexCoursefreeGiveLikeAction',
            changegetIndex:'searchStore/changegetIndex'
        }),
         
        goChairDetail(id) {
            this.$router.push({
                path:'/chairdetails',
                query:{
                    id:id,
                    type:'FreeVideo'
                    }
            })
        },
        comment(id){
            this.$router.push({
                path:'/chairdetails',
                query:{
                    id:id,
                    type:'FreeVideo'
                    }
            })
        },
        async giveLike (id,item) {
            //console.log(id,item)
            await this.getIndexCoursefreeGiveLikeAction(this.disposedata2(id))
            if(this.coursefreeGiveLikeData.msg=='请求成功'){
                item.isLiked= true
                item.likeNum++
                // this.$emit('chairParent') 
            }else if(this.coursefreeGiveLikeData.code==600001){
                this.$Toast({
                    message: this.coursefreeGiveLikeData.msg,
                    duration: 1000
                });
            }
        },
        //处理点赞接口数据
        disposedata2 (id) {
            let data={
                courseFreeId:id,
                token:''
            };
            return data;
        },
        clearZero(){
                this.moreTit = "加载更多";
                this.$refs.mychild.get();
        },
        //加载更多
           timer(fn) {
                if (this.moreTit == "暂时都在这里了...") {
                        return;
                }
                        fn = null; //关闭滚动条
                        let that = this;
                        this.moreTit = "正在加载...";
                        that.Timingopen = setInterval(function() {
                            that.getMoreList()
                        }, 1000);
            },
            getMoreList(){
                clearInterval(this.Timingopen)
                this.changegetIndex()
                this.$axios.post("/search/coursefreelist", {
                        pageIndex:this.Index,
                        searchKeyword:this.iptValue,
                    }).then(res=>{
                        let newarr = res.data.result.courseFreeResponseVos;
                            if (newarr.length == 0) {
                                this.moreTit = "暂时都在这里了...";
                                this.$refs.mychild.gets();
                                return
                            }else{
                                newarr.forEach((item, i) => {
                                    this.data.push(item);
                                });
                                this.moreTit = "加载更多";
                                this.$refs.mychild.get();
                            }
                    })
        },
      
    }
}
</script>
<style lang='scss'>
.nav-title-video-more .m-auto-afters{
     padding-top: 2rem;
}
.app-searchVideo-lvTit{
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    // margin-bottom: .5rem;
    font-size: 0.875rem !important;
    opacity: .8;
}
.app-searchVideo-lvTime{
        opacity: .6;
        margin-bottom: 1.2rem;
}
</style>


<style lang='scss' scoped>
.messCou{
    width: 1rem;
    height: 1rem;
    display: inline-block;
    img{
        width: 100%;
        height: 100%;
        border-radius: none!important;
    }
    
}
.app-videoContent-img{
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
      cursor: pointer;
      content: url('../../../static/img/ico-FreeVideo-cf.png');
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      position: absolute;
      top: 0px;
      text-align: center;
      vertical-align: middle;
      left: 0px;
      line-height: 210px;
      border-radius: .18rem;
    }
}

.fz15.text-center{
    overflow: hidden;
    text-overflow:ellipsis;//文本溢出显示省略号
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width:100%;
    color:red;
}
.text-center{
    display: flex;
    justify-content: space-between;
    span{
        display: flex!important;
        align-items: center;
        justify-content: center;
        i{
            padding: 0 1rem;
            img{
                width: 1rem;
                height: 1rem;
                border-radius: 0!important;
            }
        }
    }
}
</style>


