<template>
  <div class="mobile_content"  >
    <article class="dis_flow_root" @touchmove="auto">
      <!--evaluation 全部评价 -->
      <h4 class="fz15 c5 pl-30" >全部评论（{{NewData.total}}）</h4>
      <div class="My_ChairList-evaluation pl-30 pr-30 fz15">
        
        <ul v-if="NewData.total > 0">
          <li v-for="(item,index) in NewData.courseDiscussionCommentResponseVos" :key="index">
            <!-- <img
              src="../../../static/mobile_img/Classroom_teacher3.png"
              :data-src="item.discussHeadUri"
            >-->
            <img :key="item.courseDiscussionCommentId" style="object-fit: cover;border-radius: 50%;" :src="item.discussHeadUri">
            <div class="app-lv-sundetap-cha-parse-lei">
              <p
                @click="replyPeople(item.discussUser,item.courseDiscussionCommentId,item.discussUserId,false,null,item)"
              >
                <span class="c9 boxSolee">{{item.discussUser}}</span>
              </p>
              <!-- 默认展开文本 -->
              <p :class="item.ifShow||item.contentNum<=148?'app-lv-sundetaps':'app-lv-sundetap'">
                <span style="line-height: 1.4rem;" v-html="item.content"></span>
              </p>
              <p v-if="item.contentNum>=148&&!item.ifShow" @click='htmlShows(item.courseDiscussionCommentId)' class="app-lv-sundetap-cha fz12">展开</p>
              <p v-if="item.ifShow" @click="htmlHides(item.courseDiscussionCommentId)" class="app-lv-sundetap-cha fz12">
                    收起</p>
              <!-- 评论区对话 -->
              <div v-if="item.courseDiscussionReplyResponseVos.length > 0">
                <div class="dialogue app-lv-sundetap-cha-parse-lei">
                  <div class="fz15 c5"
                    v-for="(val,ind) in item.courseDiscussionReplyResponseVos.slice(0,2)"
                    :key="ind"
                  >
                   <!-- 默认展开文本 -->
                  <div class="fz15 c5 app-z-html">
                     <label class="fz15 c4a5 label_lei" style="flexShrink:0">
                       <!-- <span v-if="val.discussUser==val.beReplyUser"> {{val.discussUser}}：</span> -->
                       <span  @click.stop="replyPeople(val.discussUser,item.courseDiscussionCommentId,val.discussUserId,false,val.courseDiscussionCommentId,val)"> {{val.discussUser}} 回复 {{val.beReplyUser}}：</span>
                       </label>
                     <!-- <p :class="val.ifShow||val.contentNum<=148?'app-lv-sundetaps':'app-lv-sundetap'"  v-html="val.content"></p> -->
                  </div>
                  <div style="margin-top: 0.2rem;line-height: 1.4rem;" :class="val.ifShow||val.contentNum<=48?'app-lv-sundetaps':'app-lv-sundetap'"  v-html="val.content">
                    
                  </div>
                  <p v-if="val.contentNum>=148&&!val.ifShow" @click='CommentIdHtmlShows(val.courseDiscussionCommentId)' class="app-lv-sundetap-cha fz12">展开</p>
                  <p v-if="val.ifShow" @click="CommentIdHtmlHides(val.courseDiscussionCommentId)" class="app-lv-sundetap-cha fz12">
                    收起</p>
                  </div>
                  <p
                    v-if="item.courseDiscussionReplyResponseVos.length > 2"
                    class="app-z-reply"
                    @click="goChanJieDetailDiscussAll(item,index)"
                  >
                    共
                    <span>{{item.courseDiscussionReplyResponseVos.length}}</span>条回复 >
                  </p>
                </div>
              </div>
              <p class="app-z-pingjiaActive">
              <span class="app-z-parise dis_lv-flex" >
              <time class="fz12 c9 " style="flex:1">{{item.createTime}}</time>
              <span  class="dis_lv-flex borderNone">
                <span
                    class=" fz12 c9 ml-20"
                    @click="replyPeople(item.discussUser,item.courseDiscussionCommentId,item.discussUserId,false,null,item)">
                  <img style="width:1rem !important;height:1rem !important"  src="../../../static/img/messCou.png"/>
                    <!-- <i class="iconfont icon-pinglun"></i> -->
                  </span>
                  <span
                    class=" fz12 c9 ml-30 dis_lv-flex" 
                    v-if="item.isLiked"
                    @click="giveLike(item.courseDiscussionCommentId,item)">
                    <img style="width:1rem !important;height:1rem !important"  src="../../../static/img/starClick.png"/>
                    <!-- <i class="iconfont icon-xihuanActive"></i> -->
                    &nbsp; {{item.likeNum||""}}
                  </span>
                   <span
                    class=" fz12 c9 ml-30 dis_lv-flex" 
                    v-else
                    @click="giveLike(item.courseDiscussionCommentId,item)">
                      <img style="width:1rem !important;height:1rem !important"  src="../../../static/img/star.png"/>
                          <!-- <i class="iconfont icon-xihuanActive"></i> -->
                      &nbsp; {{item.likeNum||""}}
                  </span>
                  </span>
              </span>
              </p>
              <!-- <p class="app-z-icon ">
                <time class="fz12 c9">{{item.createTime}}</time>
                <span class="app-z-parise">
                  <span
                    class=" fz12 c9 ml-20"
                    @click="replyPeople(item.discussUser,item.courseDiscussionCommentId,item.discussUserId,false)"
                  >
                  <img style="width:1rem;height:1rem"  src="../../../static/img/messCou.png"/>
                  </span>
                  <span
                    class=" fz12 c9 ml-30" 
                    v-if="item.isLiked"
                    @click="giveLike(item.courseDiscussionCommentId,item)"
                  >
                  <img style="width:1rem;height:1rem"  src="../../../static/img/starClick.png"/>
                    {{item.likeNum||""}}
                  </span>
                  <span
                    class=" fz12 c9 ml-20"  
                    v-else
                    @click="giveLike(item.courseDiscussionCommentId,item)"
                  >
                  <img style="width:1rem;height:1rem"  src="../../../static/img/star.png"/>
                    {{item.likeNum||""}}
                  </span>
                  
                </span>
              </p> -->
            </div>
          </li>
        </ul>
        <div class="gu_clear_guide" v-else>
          <img style="width:4rem!important;borderRadius:0!important" src="../../../static/img/null-My_discussion.png" alt>
          <p style="padding-left: 0.5rem;" class="fz12 mt-15 c9">暂时没有哦~</p>
        </div>
      </div>
      <!-- 评价 -->
     
    </article>
     <!-- <discussListRich ref="RichText" :InitReply="InitReply" :replayText="replayText" :sendText="sendText"/> -->
    <!-- 回复删除 --> 
    <mt-popup v-model="popupVisible" position="bottom" class="app-z-alertBottom">
      <div class="popupBox tt" v-if="UserId == userInfo.studentId && types == 'chanjie'">
        <mt-button @click="InitName" class="sure">回复</mt-button>
        <mt-button @click="handleRemove" class="sure">删除</mt-button>
      </div>
      <div class="popupBox tt" v-else>
        <mt-button  class="sure" @click="goMyChatMessage">私信</mt-button>
        <mt-button @click="InitName" class="sure">回复</mt-button>
      </div>
    </mt-popup>
    
     <ScrollBottom   class="app-more-Sun"  @timer="timer" v-show='NewData.total>0'  :moreTit="moreTit" ref="mychild"/>
  </div>
   
</template>
<script>
import {computingTime} from '../../public/utils'
import discussListRich from '@/component/editer/RichText'
import ScrollBottom from '@/component/ScrollBottom'
import { getUserInfoCookie } from "../../public/index";
import { mapActions, mapState } from "vuex";
export default {
  name: "discusslist", 
  data() {
    return {
      sendText:'发表',
      htmlShowID:null,
      htmlShow: true,
      num: 0,
      replayId: "", //用于存储评论id,
      replayName: "", //用于存储名字,
      replayText: "说说你的想法吧", //用于存储名字,
      UserId: "", //用于判断是否是用户发表的
      userInfo: {},
      popupVisible: false, //控制弹窗
      moreTit:'加载更多',
      Timingopen:null,
      pageIndex:1,
      NewData:[],
      DetailFlag:false,//删除评论还是回复   false评论  true回复
      typeMon:false,//是否是回复
      typeMonRemoreId:'',//删除回复id
      Private:'',//进入站内信
    };
  },
  components: {
    ScrollBottom,
    discussListRich
  },
  props: {
    data: {
      type: null,
      require: true
    },
    id: {
      type: null,
      required: true
    },
    types: {
      type: null
    }
  },
   watch: {
     popupVisible:function(newValue, oldValue){
        if(newValue){
            this.$emit('changediscussFlag',false)
        }else{
            this.$emit('changediscussFlag',true)
        }
     },
      data: function(newValue, oldValue) {
        if(newValue!=oldValue){
         this.NewData = newValue
        }
      }
    },
  async mounted() {
    this.pageIndex = 1
    this.NewData = this.data
    // //console.log(getUserInfoCookie(),'zMmmjdnsahd')
    if (
      getUserInfoCookie() !== undefined &&
      getUserInfoCookie() !== "undefined"
    ) {
      this.userInfo = JSON.parse(getUserInfoCookie());
    }
  },
  computed: {
    ...mapState({ 
      //评论他人和评论数据
      discussReplyPeopleData: state =>
        state.chanJieDetailDiscussStore.discussReplyPeopleData,
      //评论点赞数据
      discussReplyGiveLikeData: state =>
        state.chanJieDetailDiscussStore.discussReplyGiveLikeData,
        
      //删除评论数据
      chanJieDetailHomeWorkSunRemoveCommentData: state =>
        state.chanJieDetailDiscussStore
          .chanJieDetailHomeWorkSunRemoveCommentData,
          //删除回复数据
      chanJieDetailHomeWorkSunRemoveReplyData: state =>
        state.chanJieDetailDiscussStore.chanJieDetailHomeWorkSunRemoveReplyData,
    })
  },
  methods: {
    //禁止页面滑动
    auto(){
      // this.$refs.RichText.blurs()
    },
    computingTime,
    goMyChatMessage(){
      this.$router.push({
                    name: 'mymessageall',
                    params: {
                        info: this.Private,
                        iswork:'SunList',
                    }
                })
    },
    //展开
    htmlShows(id) {
                this.htmlShowID = id
                let dataIfShow = this.NewData.courseDiscussionCommentResponseVos.map((item,index)=>{
                    if(item.courseDiscussionCommentId==id){
                        this.$set(this.NewData.courseDiscussionCommentResponseVos[index],'ifShow',true)
                    //    item.ifShow=true
                    }
                    return  item
                })
                //console.log(this.NewData.courseDiscussionCommentResponseVos)
                this.NewData.courseDiscussionCommentResponseVos=[...dataIfShow]
     },
     //收起
     htmlHides(id){
               let dataIfShow = this.NewData.courseDiscussionCommentResponseVos.map((item,index)=>{
                    if(item.courseDiscussionCommentId==id){
                        this.$set(this.NewData.courseDiscussionCommentResponseVos[index],'ifShow',false)
                    //    item.ifShow=true
                    }
                    return  item
                })
                //console.log(this.NewData.courseDiscussionCommentResponseVos)
                this.NewData.courseDiscussionCommentResponseVos=[...dataIfShow]
     },
     CommentIdHtmlShows(id){
       let dataIfShow = this.NewData.courseDiscussionCommentResponseVos.map((item,index)=>{
         //console.log(item.courseDiscussionReplyResponseVos)
         item.courseDiscussionReplyResponseVos.forEach((val,ind)=>{
           //console.log(val.courseDiscussionCommentId,id)
           if(val.courseDiscussionCommentId==id){
              this.$set(this.NewData.courseDiscussionCommentResponseVos[index].courseDiscussionReplyResponseVos[ind],'ifShow',true)
            }
         })
          return  item
      })
      //console.log(this.NewData.courseDiscussionCommentResponseVos)
      this.NewData.courseDiscussionCommentResponseVos=[...dataIfShow]
     },
     CommentIdHtmlHides(id){
       let dataIfShow = this.NewData.courseDiscussionCommentResponseVos.map((item,index)=>{
         //console.log(item.courseDiscussionReplyResponseVos)
         item.courseDiscussionReplyResponseVos.forEach((val,ind)=>{
           //console.log(val.courseDiscussionCommentId,id)
           if(val.courseDiscussionCommentId==id){
              this.$set(this.NewData.courseDiscussionCommentResponseVos[index].courseDiscussionReplyResponseVos[ind],'ifShow',false)
            }
         })
          return  item
      })
      //console.log(this.NewData.courseDiscussionCommentResponseVos)
      this.NewData.courseDiscussionCommentResponseVos=[...dataIfShow]
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
     //加载更多List
     getMoreList(){
                   clearInterval(this.Timingopen)
                     this.pageIndex++
                     this.$axios.post('/coursediscussion/commentlist',{
                        pageIndex:this.pageIndex,
                        id:this.$route.query.id,
                        token:''
                    }).then(res=>{
                        let newarr = res.data.result.courseDiscussionCommentResponseVos
                         if (newarr.length == 0) {
                                        this.moreTit = "暂时都在这里了...";
                                        this.$refs.mychild.gets();
                                        return  
                         }else{
                            //console.log(newarr)
                                     newarr.forEach((item, i) => {
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
                                        item.createTime = this.computingTime (item.createTime)
                                        item.courseDiscussionReplyResponseVos.forEach(val=>{
                                            val.createTime = this.computingTime (val.createTime)
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
                                        })
                                      this.NewData.courseDiscussionCommentResponseVos.push(item)
                                      });
                                        this.moreTit = "加载更多";
                                        this.$refs.mychild.get();
                         }
                    })
     },
    //处理html字符串
    HandleHtml(name, html) {
      // //console.log(html)
      // <label for class="fz15 c4a5">{{val.discussUser}}：</label>
      // <p class="fz15 c5 gu_fz15_c5" v-html="val.content">{{val.content}}</p>
      let str = `<label for class="fz15 c4a5">${name}：</label>`;
      // html = "<p>" + str + html.slice(3);
      html = str + html
      // //console.log(html);
      return html;
    },
    ...mapActions({
      //评论他人和评论 
      getDiscussReplyPeopleAction:
        "chanJieDetailDiscussStore/getDiscussReplyPeopleAction",
      //评论点赞
      getDiscussReplyGiveLikeAction:
        "chanJieDetailDiscussStore/getDiscussReplyGiveLikeAction",
      //删除评论
      getChanJieDetailHomeWorkSunRemoveCommentAction:
        "chanJieDetailDiscussStore/getChanJieDetailHomeWorkSunRemoveCommentAction",
         //删除回复
      getChanJieDetailHomeWorkSunRemoveReplyAction:
        "chanJieDetailDiscussStore/getChanJieDetailHomeWorkSunRemoveReplyAction",
        
        getDeletiNum:"chanJieDetailStore/getDeletiNum"
    }),
    //点赞
    async giveLike(id,item) {
      await this.getDiscussReplyGiveLikeAction(this.disposedata3(id));
      if (this.discussReplyGiveLikeData.msg == "请求成功") {
        if (this.types == "chanjie") {
          item.isLiked = true
          item.likeNum++
          // this.$emit("discussParent");
        } else {
          // this.$emit("chairParent");
          item.isLiked = true
          item.likeNum++
        }
      } else if (this.discussReplyGiveLikeData.code == 600001) {
        this.$Toast(this.discussReplyGiveLikeData.msg);
      }
    },
    //去往全部回复页面
    goChanJieDetailDiscussAll(val,index) {
      window.localStorage.setItem('Privateletter', JSON.stringify(val))

      window.localStorage.setItem('Allreplies', JSON.stringify(val))
      // //console.log(val,'llll')
      this.$router.push({
        path: "/chanjiedetaildiscussall",
        query: { val,tieZiId: this.id, type: this.types,idx:index }
      });
    },
    //获取评论id 评论name 删除id
    replyPeople(name, id, UserId,Flag,typeMon,item) {
      this.Private = item
      if(typeMon){
        this.typeMon = true
        this.typeMonRemoreId=  typeMon
      }
      //console.log(name,id,'namename')
          this.DetailFlag = Flag
          this.replayId = id;
          this.replayName = name;
          this.UserId = UserId;
          if(this.types == 'chanjie'){
               this.popupVisible = true;
          }else{
                this.InitName()
          }
              //console.log(UserId,id)
    },
    //处理评论 
    async  InitReply(html,length){
      // if(this.typeMon){
      //   //console.log('我是时尚')
      //   return
      // }
        if(this.replayText.indexOf("@") != -1){
          await this.getDiscussReplyPeopleAction(
              this.disposedata2(this.replayId, this.replayName,html,length)
            );
        }else{
            await  this.getDiscussReplyPeopleAction(this.disposedata1(0,html,length));
        }
        if (this.discussReplyPeopleData.msg == "请求成功") {
            this.$Toast("评论成功");
            if (this.types == "chanjie") {
                this.$emit("discussParent");
            } else {
                this.$emit("chairParent");
            }
        }else{
            this.$Toast(this.discussReplyPeopleData.msg);
        }
    },
    //处理昵称
    InitName(){
        this.replayText = "@" + this.replayName;
        //console.log(this.replayText)
        // return
        this.popupVisible = false;
        this.$emit('faterfocus',this.replayText)
        // this.$refs.RichText.focus() 
    },
    //上一级获取焦点... 
    BackFour(){
       this.replayText = ''
       this.$emit('faterfocus',null)
        // this.$refs.RichText.focus()
    },
    //回复他人回复
    async reply() {},
    //处理公共数据1 评论数据 （不评论他人）
    disposedata1(id,html,length) {
      let isCourseDiscussion
       if(this.types == "chanjie"){
         isCourseDiscussion = true
       }else{
         isCourseDiscussion = false
       }
      
      
      let chanJieId = window.localStorage.getItem('chanJieId')
     
      let data = {
        isCourseDiscussion:isCourseDiscussion,
        courseId:chanJieId,
        content: html,
        discussionId: this.id,
        replyId: id,
        token: "",
        contentNum:length
      };
      this.replayText = ''
      return data;

    },
    //处理公共数据2  评论他人数据
    disposedata2(id, name,html,length) {
      let isCourseDiscussion
       if(this.types == "chanjie"){
         isCourseDiscussion = true
       }else{
         isCourseDiscussion = false
       }
      let chanJieId = window.localStorage.getItem('chanJieId')
      //console.log(chanJieId,'chanJieIdchanJieIdchanJieIdchanJieId')
      let data = {
        isCourseDiscussion:isCourseDiscussion,
        courseId:chanJieId,
        content: html,
        discussionId: this.id,
        replyId: id,
        token: "",
        beReplyUser: name,
        contentNum:length
      };
      this.replayText = ''
      return data;
    },
    //处理公共数据3 评论点赞数据处理
    disposedata3(id) {
      let data = {
        id,
        token: ""
      };
      return data;
    },
    //处理公共数据4 删除评论
    disposedata4(id) {
      let data = {
        homeworkFinishId: id,
        token: ""
      };
      return data;
    },
    //删除评论回复
    async handleRemove() {
      this.popupVisible = false;
      //删除回复
      if(this.typeMon){
        await this.getChanJieDetailHomeWorkSunRemoveReplyAction(
        this.disposedata4(this.typeMonRemoreId))
        if (this.chanJieDetailHomeWorkSunRemoveReplyData.msg == "请求成功") {
              this.$Toast("删除成功");
              if (this.types == "chanjie") {
                          this.$emit("discussParent");
                        } else {
                          this.$emit("chairParent");
                        }
            }else{
              this.$Toast("删除失败");
            }
            return
      }
      //console.log(this.replayId)
      // return
      //删除评论
      if(!this.DetailFlag){
          this.$axios.post('/userhomeworksun/delDiscussionComment',{token:'',
          homeworkFinishId:this.replayId}).then(res=>{
              if(res.data.result){
                this.getDeletiNum(this.$route.query.id)
                this.$Toast("删除成功");
                if (this.types == "chanjie") {
                      this.$emit("discussParent");
                    } else {
                      this.$emit("chairParent");
                    }
              }else{
                  this.$Toast("删除失败");
              }
          })
      }else{
          this.$axios.post('/userhomeworksun/delDiscussionReply',{token:'',
          homeworkFinishId:this.replayId}).then(res=>{
              if(res.data.result){
                this.$Toast("删除成功");
                if (this.types == "chanjie") {
                      this.$emit("discussParent");
                    } else {
                      this.$emit("chairParent");
                    }
              }else{
                  this.$Toast("删除失败");
              }
          })
      }
      
      
      // await this.getChanJieDetailHomeWorkSunRemoveCommentAction(
      //   this.disposedata4(this.replayId)
      // );
      // if (this.chanJieDetailHomeWorkSunRemoveCommentData.msg == "请求成功") {
      //   
      //   if (this.types == "chanjie") {
      //       this.$emit("discussParent");
      //     } else {
      //       this.$emit("chairParent");
      //     }
      // } else {
      //   this.$Toast("删除失败");
      // }
    },
  }
};
</script>
<style lang='scss' >
.borderNone>span>img{
  border-radius: 0%!important;
}
.boxSolee{
  max-width: 13rem;
  display:-webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:1;
word-break:break-all;
text-overflow:ellipsis;
overflow:hidden;
}
.app-more-Sun{
  padding-top:1rem;
    // background:red;
}
.dis_lv-flex{
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
}
.dis_flow_root{
  margin-bottom: 0!important;
  // padding-top: 1.875rem;
}
.label_lei{
  display: inline-block;
  height: 1.5rem;
}
.Define_footFixed {
  height: auto;
  position: fixed;
  bottom: 0;
  left: 0;
   
  .Evaluation-content {
    width: auto;
    height: 3.0625rem;
    text-align: right;
    font-family: "FZLTHJW--GB1-0";
    position: absolute;
    top: 0;
    right: 0;
    left: 50px;
    // background: red;
    padding: 0;
    // overflow: hidden;
    .Evaluation-editor {
      margin-right: 5.625rem;
    }
    button {
      position: absolute;
    }
    .w-e-toolbar {
      display: none;
    }
    .w-e-text-container {
      height: 3.0625rem !important;
      // padding: 8px 0;
      padding-top: 0.8125rem;
      line-height: 1.25rem;
      .w-e-text p {
        margin: 0;
      }
    }
  }
}
</style>

<style lang='scss' scoped>

.mobile_content{
  // padding-bottom: 3.2rem;
  padding-top: 1.25rem;
}
.app-lv-sundetap{
      letter-spacing: 0.5px;
      line-height:1.5rem;
      height: auto;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      word-break:break-all;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:pre-line!important;
      color: #555!important;
      font-size:0.9375rem;
}
.app-lv-sundetaps{
    letter-spacing: 0.5px;
    line-height:1.5rem;
    height: auto;
    white-space:pre-line!important;
    color: #555!important;
    font-size:0.9375rem;
}
.app-lv-sundetap-cha{
    line-height:1.5rem;
    letter-spacing: 0.5px;  
    color: #07767A;
    text-align: right;
}
.app-z-icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon-pinglun {
    font-size: 1.2rem;
  }
  i {
    font-size: 1.1875rem;
    margin-right: 0.375rem;
  }
  & > div {
    display: flex;
    align-items: center;
  }
}

.app-z-alertBottom {
  height: auto !important;
}
.app-z-html {
  // width: 180px;
  display: flex;
  line-height: 2rem;
  white-space: normal;
}
.app-z-reply {
  font-size: 0.94rem;
  color: rgba(196, 165, 127, 1);
  margin-top: 0.8rem;
}
.fz15.c30 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.gu_fz15_c5 {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.gu_clear_guide {
  margin-left:1rem;
  margin-top:5rem !important;
  // margin: 1rem;
}
.mint-popup-bottom {
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.My_ChairList img {
  // width: 1.8rem !important;
  // height: 1.8rem !important;
}
.popupBox {
  width: 100%;
  .sure {
    width: 100%;
    text-align: center;
    line-height:  2.5rem;
    font-size: 1rem;
    color: #000;
  }
}
.dialogue {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gu_box {
  display: inline-block;
  width: 82%;
  color: #ccc;
}
.gu_p {
  position: absolute;
  left: 0;
  top: 0.1rem;
  z-index: 1000;
  border: 0;
  color: #ccc;
}
.My_ChairList-evaluation ul li{
  display:flex;
}

</style>

<style>
/** 富文本框的-表情宽度 **/
.w-e-toolbar .w-e-menu {
  padding: 0px;
}
.w-e-icon-happy {
  font-size: 1.5625rem;
}
.w-e-toolbar .w-e-menu i {
  position: relative;
  left: 22px;
  top: -8px;
}
/** -- end - -- */

.w-e-item img {
  width: auto;
  height: auto;
}

p img {
  width: auto;
}
.w-e-text p {
  /* margin: 14px 0 10px 0px; */

  /* 可以滑动查看内容 */
  /* white-space: nowrap;
  text-overflow: ellipsis;
  overflow-y: auto; */
}
.w-e-text img {
  width: auto;
  height: auto;
}
.w-e-panel-container {
  margin-top: -270px;
}
</style>