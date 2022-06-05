<template>
    <div class="My_ChairList-evaluation" :style="{paddingBottom:paddingFlag?'3rem':'0.5rem'}">  
        <h4 class="fz15 c5">全部留言（{{data.total}}）</h4>
        <ul class="app-z-evaluation">
            <li v-for='(item,index) in data.courseCommentResponseVos' :key='index'>
                <img style="object-fit: cover;border-radius: 50%;"  :src="item.userHeadUri" 
                    :data-src='item.userHeadUri'
                alt="">
                <div>
                    <div class="pos_r">
                        <span class="c9 boxSlle">{{item.userNickName}}</span>
                    </div>
                    <div class="content"  ref="content">
                        <span>
                            <p :class="item.ifShow||item.contentNum<=148?'fz15 c5 spanPre applvactive':'fz15 spanPre c5 app-lv-comp'" v-html='item.content'></p>
                        </span>
                        <p class="paddTop">
                            <time class="fz12 c9">{{item.createTime}}</time>
                        </p>
                    </div>
                    <p v-if="item.contentNum>=148&&!item.ifShow" @click='htmlShows(item.commentId)' class="app-lv-comp-zhan fz12">展开</p>
                    <p v-if="item.ifShow" @click="htmlHides(item.commentId)" class="app-lv-comp-zhan fz12">
                    收起</p>
                    
                </div>
            </li>
        </ul> 
         <ScrollBottom :FiexTop="FiexTop" :FiexTopAdd="FiexTopAdd"   @timer="timer" v-show='data.total>0'  :moreTit="moreTit" ref="mychild"/>
    </div>    
</template>
<script>
import {computingTime} from '@/public/utils'  
import ScrollBottom from '@/component/ScrollBottom'
    import {
        mapState,
        mapActions
    } from 'vuex'
export default {
    name:'chanjiecoursecommentlist',
    props:{
        data:{
            type:null,
            require:true
        },
        FiexTop:{
            type:null
        },
        FiexTopAdd:{
            type:null
        },
        paddingFlag:{
            type:null
        }
    },
    components:{
        ScrollBottom
    },
    data(){
        return {
            moreTit:'加载更多',
            Timingopen:null,
            index:1,
            DisShowFlag:false,//有展开收起
            DisHideFlag:false,//收起
            MoreFlag:false,//加载更多flag
            newData:[],//初始data
        }
    },
    computed: {
       ...mapState({
           //单阶写评价
            chanJieDetailCourseCommentList: state => state.chanJieDetailStore.chanJieDetailCourseCommentList,
       })},
  mounted () {
        this.index =1
        this.newData =  this.chanJieDetailCourseCommentList
        //console.log(this.paddingFlag,"this.newDta")
        //console.log(this.chanJieDetailCourseCommentList,"this.chanJieDetailCourseCommentList")
    },
    watch:{
        //加载更多flag
        MoreFlag(newValue, oldValue){
            this.DisShowFlag = false
            // //console.log(this.data.courseCommentResponseVos,'我是data我改变了')
        }
    },
    methods: {
        computingTime,
        //展开
        htmlShows(id) {
            let dataIfShow = this.data.courseCommentResponseVos.map((item,index)=>{
                if(item.commentId===id){
                    this.$set(this.data.courseCommentResponseVos[index],'ifShow',true)
                }
                return  item
            })
             this.data.courseCommentResponseVos=[...dataIfShow]
        },
        htmlHides(id){
            let dataIfShow = this.data.courseCommentResponseVos.map((item,index)=>{
                if(item.commentId===id){
                    this.$set(this.data.courseCommentResponseVos[index],'ifShow',false)
                }
                return  item
            })
             this.data.courseCommentResponseVos=[...dataIfShow]
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
                    //console.log('怎么样')
                    that.getMoreList()
                }, 1000);
      },
      getMoreList(){
          this.index++
          clearInterval(this.Timingopen)
          let chanJieId = window.localStorage.getItem('chanJieId')
          this.$axios.post("coursecomment/list", {
                    courseId: this.$route.query.id || chanJieId,
                    courseType: 1,
                    pageIndex: this.index,
                    typeKey: 1,
                    token: ''
            }).then(res=>{
                //console.log(res)
                let newarr = res.data.result.courseCommentResponseVos;
                if (newarr.length == 0) {
                    this.moreTit = "暂时都在这里了...";
                    this.$refs.mychild.gets();
                    return
                }else{
                     newarr.forEach((item, i) => {
                         item.isShow = false
                         item.createTime= this.computingTime(item.createTime)
                        this.data.courseCommentResponseVos.push(item);
                    });
                    this.MoreFlag=true
                    this.moreTit = "加载更多";
                    this.$refs.mychild.get();
                    return
                }
            })
      }
    }
}
</script>
<style lang='scss' scoped>
.boxSlle{
    max-width: 15rem;
    display:-webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:1;
word-break:break-all;
text-overflow:ellipsis;
overflow:hidden;
}
.content{
    position: relative;
}
.paddTop{
    float: left;
    // top: .875rem;
    // left: 0;
    margin-top: .175rem;
    // padding-bottom: .175rem;
}
.My_ChairList-evaluation{
    .m-auto-afters{
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
}
.applvactive{
   letter-spacing: 0.5px;
   line-height:1.5rem;

}
.spanPre{
    white-space:pre;
    word-break: break-all;
    white-space: pre-wrap;           /* css-3 */
    white-space: -moz-pre-wrap;      /* Mozilla, since 1999 */
    white-space: -pre-wrap;          /* Opera 4-6 */
    white-space: -o-pre-wrap;        /* Opera 7 */
    word-wrap: break-word;           /* Internet Explorer 5.5+ */
  }
.app-lv-comp{
    letter-spacing: 0.5px;
    line-height:1.5rem;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:7;
    word-break:break-all;
    text-overflow:ellipsis;
    overflow:hidden;
}
.app-lv-comp-zhan{
    line-height: 1.5rem;
    letter-spacing: 0.5px;
    color: #07767A;
    text-align: right;
}

.fz16C5{
    color: #555!important;
}
.fz15.c5{
    font-weight: 400;
    // margin-bottom:1.3125rem;
}
// .fz15.c30{
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis; 
// }
.My_ChairList-evaluation ul li > img{
    // transform: translateY(-.3rem)
}
.My_ChairList-evaluation ul li > div > .fz15.c30{
    margin-bottom:.93rem;
}
.My_ChairList-evaluation ul li > div > .fz12.c9{
    margin-bottom:0;
}
.My_ChairList-evaluation ul li{
    // margin-top:1.45rem;
}
</style>