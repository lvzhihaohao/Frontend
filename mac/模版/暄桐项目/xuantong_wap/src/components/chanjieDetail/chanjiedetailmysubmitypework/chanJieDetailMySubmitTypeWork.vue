<template>
<!-- 我的作业 -->
    <div id='#app'>
        <div  @click="ReplyOll">
            <article class="nav-title" fixed>
                <mt-header :title="!this.$flag?'已提交的作业':''" >
                    <a href='javascript:void(0);' slot="left" @click='goBack'>
                        <mt-button icon="back"></mt-button>
                    </a>
                    <a href="javascript:void(0);" slot="right">
                        <mt-button class="c4a5 fz15" @click='goChanjietasktreedetailsubmitwork'>再次提交</mt-button>
                    </a>
                </mt-header>
            </article>
            <!-- <img src="../../../../static/img/back.png" class='gu_nav_title_img_top'
                v-if='this.$flag' @click='goBack'> -->
            <div class="mobile_content pl-30 pr-30"  v-if='chanJieDetailMySubmitTypeWorkList.length> 0'>
                <article class="dis_flow_root mt-30">
                    <MyHomeWorkList :data='chanJieDetailMySubmitTypeWorkList' :types='types'
                        @myTypeHomeWorkParent='myTypeHomeWorkParent' @replyFlag="replyFlag"/>   
                </article>
            </div>
            <div class='gu_clear_guide' v-else>
                <img src="../../../../static/img/null-My_discussion.png"  alt="" >
                <p class=" fz12 mt-15 c9">暂时没有哦~</p>
            </div>
        </div>
         <!-- <ScrollBottom   @timer="timer" v-show='chanJieDetailMySubmitTypeWorkList.length>0'  :moreTit="moreTit" ref="mychild"/> -->
        <ReplyMore
         v-if="replyIdFlag"
         :teaname="teaname"
         @replyFlags="replyFlags" 
         :courseId="courseId"
         :replyIds="replyIds"
          @myHomeWorkParent="myTypeHomeWorkParent" 
          ref="replyMore"/>
    </div>
</template>
<script>
import {userclasshourTime,formData} from '@/public/index'
import ScrollBottom from '@/component/ScrollBottom'
import {mapActions,mapState} from 'vuex'
import MyHomeWorkList from '../../../component/myHomeWork/myHomeWorkAllList'
import ReplyMore from '@/component/myHomeWork/ReplyMores'
export default {
    name:'chanjiemydetailtypework',
    data () {
        return {
            beforeUrl:'',
            types:'chanjie',
            replyIds:null,
            replyIdFlag:false,
            moreTit:'加载更多',
            Timingopen:null,
            pageIndex:1,
            teaname:'',
            courseId:null
        }
    },
    mounted () {
        this.pageIndex = 1
        // window.scrollTo(0,0)
        this.getChanJieDetailMySubmitTypeWorkAction(this.disposedata2(this.$route.query.id))
    },
    computed:{
      ...mapState({
          //我的作业数据（已提交）
          chanJieDetailMySubmitTypeWorkList:state=>state.chanJieDetailMySubmitTypeWorkStore.chanJieDetailMySubmitTypeWorkList,
      })
    },
    components:{
        MyHomeWorkList,
        ReplyMore,
         ScrollBottom,
    },
    beforeRouteEnter (to,from,next) {
        let MySubmitTypeWorkUrl = window.localStorage.getItem('MySubmitTypeWorkUrl')
        let  MySubmitTypeWorkBackUrl = window.localStorage.getItem('MySubmitTypeWorkBackUrl')
        if(from.path =='/chanjietasktreedetailsubmitwork' || from.path =='/chanjiedetailtasktreedetails'){
            window.localStorage.setItem('MySubmitTypeWorkUrl',from.path)
            window.localStorage.setItem('MySubmitTypeWorkBackUrl','/chanjiedetailtasktreedetails')
        }else if(from.path =='/'){
            if(MySubmitTypeWorkUrl){
                window.localStorage.setItem('MySubmitTypeWorkUrl',MySubmitTypeWorkUrl) 
            }
            if(MySubmitTypeWorkBackUrl){
                window.localStorage.setItem('MySubmitTypeWorkBackUrl',MySubmitTypeWorkBackUrl)
            }
        }else{
            window.localStorage.setItem('MySubmitTypeWorkUrl','')
            window.localStorage.setItem('MySubmitTypeWorkBackUrl','')
        }
        next()
    },
    methods:{
        formData,
        //加载更多
        timer(fn) {
                fn = null; //关闭滚动条
                let that = this;
                this.moreTit = "正在加载...";
                that.Timingopen = setInterval(function() {
                    //console.log('tabid')
                    // that.changeGetPage()
                    that.getMoreList()
                }, 1000);
        },
        getMoreList(){
            this.pageIndex++
            clearInterval(this.Timingopen)
            this.$axios.post('/userhomework/pastlist',{
                homeworkAssignId:this.$route.query.id,
                pageIndex:this.pageIndex,
                token:''
            }).then(res=>{
                let newarr = res.data.result.userHomeWorkPastResponseVos;
                if (newarr.length == 0) {
                    this.moreTit = "暂时都在这里了...";
                    this.$refs.mychild.gets();
                    return
                }else{
                     newarr.forEach((item, i) => {
                         item.createTime=this.formData(item.createTime,'utc','add',false)
                        if(item.content){
                            //截取p标签
                            if(item.content.slice(0,3)=='<p>'){
                                item.content = item.content.slice(3,(item.content.length-4))
                            }
                            //截取最后的br
                            if(item.content.substring(item.content.length-4)=='<br>'){
                                item.content = item.content.slice(0,(item.content.length-4))
                            }
                            //截取最后的空格
                            if(item.content.substring(item.content.length-6)=='&nbsp;'){
                                item.content = item.content.slice(0,(item.content.length-6))
                            }
                        }
                        item.ifShow=false;
                        item.userHomeWorkCommnetResponseVos.forEach(val=>{
                    // val.createTime=userclasshourTime(val.createTime)
                    val.createTime=this.formData(val.createTime,'utc','add',false)
                    if(val.content){
                        //截取p标签
                         if(val.content.slice(0,3)=='<p>'){
                             val.content = val.content.slice(3,(val.content.length-4))
                         }
                        
                        //截取最后的br
                        if(val.content.substring(val.content.length-4)=='<br>'){
                            val.content = val.content.slice(0,(val.content.length-4))
                        }
                        //截取最后的空格
                        if(val.content.substring(val.content.length-6)=='&nbsp;'){
                            val.content = val.content.slice(0,(val.content.length-6))
                        }
                    }
                    //回复老师数据
                        val.homeworkReviewReplies.forEach(Reval=>{
                            if(Reval.replyContent){
                                //截取p标签
                                if(Reval.replyContent.slice(0,3)=='<p>'){
                                    Reval.replyContent = Reval.replyContent.slice(3,(Reval.replyContent.length-4))
                                }
                                //截取最后的br
                                if(Reval.replyContent.substring(Reval.replyContent.length-4)=='<br>'){
                                    Reval.replyContent = Reval.replyContent.slice(0,(Reval.replyContent.length-4))
                                }
                                //截取最后的空格
                                if(Reval.replyContent.substring(Reval.replyContent.length-6)=='&nbsp;'){
                                    Reval.replyContent = Reval.replyContent.slice(0,(Reval.replyContent.length-6))
                                }
                            }
                            // //console.log(Reval.replyContent,'ttttttttttttttt')
                        })
                        val.ifShow=false;
                })



                        this.chanJieDetailMySubmitTypeWorkList.push(item);
                    });
                    this.moreTit = "加载更多";
                    this.$refs.mychild.get();
                }
                //console.log(res.data.result)
            })
        },
        //点全局隐藏
        ReplyOll(){
            // //console.log(this.replyIdFlag,'99999')
            if(this.replyIdFlag){
                 this.replyIdFlag = false
            }
        },
        replyFlag(id,name,courseId
        ){  this.teaname = name
            this.courseId = courseId
            this.replyIds = id
            this.replyIdFlag = true
        },
        replyFlags(){
            this.replyIdFlag = false
        },
        ...mapActions({
            //我的作业方法
            getChanJieDetailMySubmitTypeWorkAction:'chanJieDetailMySubmitTypeWorkStore/getChanJieDetailMySubmitTypeWorkAction'
        }),
        goBack () {
            let MySubmitTypeWorkBackUrl = window.localStorage.getItem('MySubmitTypeWorkBackUrl');
            if(MySubmitTypeWorkBackUrl){
                this.$router.push({
                    path:MySubmitTypeWorkBackUrl
                })
            }else{
                this.$router.back(-1)
            } 
        },
        //点击 刷新作业列表
        myTypeHomeWorkParent () {
            this.getChanJieDetailMySubmitTypeWorkAction(this.disposedata2(this.$route.query.id))
        },
        // 再次交作业
        goChanjietasktreedetailsubmitwork() {
            // let MySubmitTypeWorkUrl = window.localStorage.getItem('MySubmitTypeWorkUrl');
            // if(MySubmitTypeWorkUrl== '/chanjietasktreedetailsubmitwork'){
                this.$router.push({
                    path:'/chanjietasktreedetailsubmitwork',
                    query:{
                      id:this.$route.query.id ,
                      type:this.$route.query.type}
                })
            // }
        },
        //处理公共数据2  我的作业数据
        disposedata2(id) {
            let data={
                homeworkAssignId:id,
                pageIndex:1,
                token:''
            };
            return data;
        }
    }
}
</script>
<style lang="scss" scoped>
.app-homework-c p{
    color: black !important;
}
.gu_nav_title_img_top {
    margin-left:.5rem;
}
    .Define_footFixed.chat_footer{
    display:flex;
    align-items: center;
    #editorElem{
         flex:1;
        outline: none;
        border:none;
        margin-left:1rem;
    }
    input{
        flex:1;
        outline: none;
        border:none;
        margin-left:1rem;
    }
    button{
        // position:static;
        position: absolute;
        top: 0;
    }
    .mint-button::after{
        position:static;
    }
}
.Define_footFixed{
    height: auto;
}
.app-homework-h4{
    width: 100%;
    height: 1.1875rem;
}
.app-homework-c{
    display: inline-block;
    height:  1.1875rem;
    p{
        color:black!important;
    }
         img{
            width: 1.375rem !important;
            height: 1.375rem !important;
          
         }
}
</style>


