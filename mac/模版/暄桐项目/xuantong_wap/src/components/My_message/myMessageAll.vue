<template>
  <div >
    <article class="nav-title" v-if="!this.$flag">
      <mt-header fixed title="站内信">
        <a href="javascript:void(0);" slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    </article>
    <img
      src="../../../static/img/back.png"
      class="gu_nav_title_img_top"
      v-if="this.$flag"
      @click="goBack"
    >
    <div class="mobile_content pl-15 pr-15" :style="this.$flag?'':'margin-top: 2.625rem'">
      <div class="My_ChairList-evaluation">
        <div class="searchInput">
          <img src="../../../static/mobile_img/search.png" alt="">
          <form action="" @submit.prevent="onSubmit">
          <input type="text" v-model="searchVal" placeholder="通过昵称快速查找" @change="searchChange">
          </form>
        </div>
        <ul>
          <li
            style="display:flex"
            v-for="(item,index) in list"
            :key="index"
            @click="buypush(item.senderType,item.senderId,item.receiveId,item.receiveNickname,item.isSender,item.senderNickname)"
          >
            <img  :key="item.receiveHeadUri" v-if="item.isSender" v-lazy="item.receiveHeadUri" alt style="width:3.125rem;height:3.125rem;object-fit: cover;border-radius: 50%;">
             <img   v-else :key="item.senderHeadUri" v-lazy="item.senderHeadUri" alt style="width:3.125rem;height:3.125rem;object-fit: cover;border-radius: 50%;">
            <div class="pos_r_lei_box">
              <div class="pos_r" style="margin-bottom: 0rem;">
                <span class="fz18 c30 pos_r_lei_boxElss" style="line-height: 1.4rem;" v-if="item.isSender">{{item.receiveNickname}}
                   <span v-if="item.unReadMessageCount!==0"  class="apnu-lv-messagecoune">{{item.unReadMessageCount}}</span></span>
                <span class="fz18 c30 pos_r_lei_boxElss" style="line-height: 1.4rem;" v-else>{{item.senderNickname}}
                  <span v-if="item.unReadMessageCount!==0"  class="apnu-lv-messagecoune">{{item.unReadMessageCount}}</span></span>
                <time class="fz12 c9 fr">{{computingDataTime(item.lastSendTime)}}</time>
              </div>
              <p class=" c9 app-java-fz15" style="height:2.45rem;font-size: 0.9375rem !important;width:100%" v-html="item.lastSendMessage"></p>
              <!-- <mt-badge
                class="icon-badge"
                v-if="item.unReadMessageCount!==0"
              >{{item.unReadMessageCount}}</mt-badge> -->
            </div>
          </li>
          <!-- <li @click='goClassTellMessage'>
                        <img src="../../../static/mobile_img/notice_icon.png" alt="">
                        <div>
                            <div class="pos_r">
                                <span class="fz18 c30">教室通知</span>
                                <time class="fz12 c9 fr">12:09</time>
                            </div>
                            <p class="fz15 c9">欢迎大家来到暄桐大家庭。</p>
                        </div>
                    </li>
                    <li @click='goSystemMessage'>
                        <img src="../../../static/mobile_img/message_icon.png" alt="">
                        <div>
                            <div class="pos_r">
                                <span class="fz18 c30">系统消息</span>
                                <time class="fz12 c9 fr">11:06</time>
                            </div>
                            <p class="fz15 c9">您的订单已支付成功！</p>
                        </div>
                    </li>
                    <li @click='goChatMessage'>
                        <img src="../../../static/mobile_img/Classroom_teacher3.png" alt="">
                        <div>
                            <div class="pos_r">
                                <span class="fz18 c30">同学小黄鸭</span>
                                <time class="fz12 c9 fr">12:09</time>
                            </div>
                            <p class="fz15 c9">嗨，你的书法作业写的怎么样....</p>
                            <mt-badge class="icon-badge">10</mt-badge>
                        </div>
          </li>-->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { computingDataTime } from "@/public/utils";
import {getUserInfoCookie} from "@/public";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "mymessageall",
  data() {
    return {
      list: [],
      userinfo:{//暂时没有用处  不删 备用
          studentId:"",//学员id
      },//用户信息
      value:'',
      searchVal:'',//搜索内容存储
    };
  },
  watch:{
    list(newValue, oldValue){
            //console.log(oldValue,'oldValue')
            //console.log(newValue,'newValue')
            this.list = newValue
            // this.DisShowFlag = false
            // //console.log(this.data.courseCommentResponseVos,'我是data我改变了')
        }
  },
  mounted() {
    if (
      getUserInfoCookie() != undefined ||
      getUserInfoCookie() != "undefined"
    ) {
      this.userInfo = JSON.parse(getUserInfoCookie());
    }
    //console.log(this.userInfo.studentId)
    this.$axios 
      .post("/privateletter/senderlist", { token: "", nickName: "" })
      .then(res => {
          let ary=res.data.result.map((item,index)=>{
              if(item.id==item.senderId){
                  //发件人
                  item.isSender=true
              }else{
                  //收件人
                  item.isSender=false
              }
              return item
          })
       this.list = ary
        if (this.$route.params && this.$route.params.info) {
          let ind = 0;
              let info = this.$route.params.info;
              let iswork = this.$route.params.iswork;
              let obj = {
                lastSendMessage: "",
                lastSendTime: moment().add(8, "h"),
                senderHeadUri: "",
                receiveHeadUri: info.discussHeadUri,
                senderId: this.userInfo.studentId,
                receiveId: info.discussUserId,
                senderNickname: "",
                receiveNickname: info.discussUser,
                senderType: 1,
                unReadMessageCount: 0,
                flag: false,
                messageFlag: false,
                isMine: true
              };
               obj.isSender=true
              if (
                obj.receiveNickname.includes(this.value) ||
                this.value == ""
              ) {
                //同时 返回的数组里必须没有才添加
                let flag = true;
                ary.forEach((item, index) => {
                  if (
                    obj.receiveId == item.senderId ||
                    obj.receiveId == item.receiveId
                  ) {
                    //存在这条消息
                    flag = false;
                    ind = index;
                  }
                });
                if (flag) {
                  ary.unshift(obj);
                }
              }
              //console.log(obj,'私信');
                this.list = ary
                this.$router.push({
                  path: "/mychatmessage",
                  query: {
                    typeid: obj.senderType,
                    studeid: obj.senderId,
                    recstudeid: obj.receiveId,
                    sendName: obj.receiveNickname,
                    isSender:obj.isSender,
                    iswork:iswork
                  }
                });
        }
        //console.log(this.list, "发件人列表");
      });
  },
  methods: {
    onSubmit(){
      return false
    },
    searchChange(){
      this.$axios.post('/privateletter/senderlist',{
          token:'',
          nickName:this.searchVal,
      }).then(res=>{
         let ary=res.data.result.map((item,index)=>{
              if(item.id==item.senderId){
                  //发件人
                  item.isSender=true
              }else{
                  //收件人
                  item.isSender=false
              }
              return item
          })
       this.list = ary
    
         //console.log(this.list,'搜索列表')
      })
    
    },
    initTime(time){
      //console.log(time)
      return moment(time).utc().format("YYYY/MM/DD");
     },
    buypush(typeid, studeid, recstudeid, sendName,isSender,Name) {
      //console.log(typeid, studeid, recstudeid, sendName,isSender,Name)
      if (typeid == 1) {
        this.goChatMessage(typeid, studeid, recstudeid, sendName,isSender,Name);
      } else if (typeid == 2) {
        this.goClassTellMessage(typeid, studeid, recstudeid);
      } else {
        this.goSystemMessage(typeid, studeid, recstudeid);
      }
    },
    goBack() {
      this.$router.back(-1);
    },
    computingDataTime,
    //同学
    goChatMessage(typeid, studeid, recstudeid, sendName,isSender,Name) {
      this.$router.push({
        path: "/mychatmessage",
        query: {
          typeid: typeid,
          studeid: studeid,
          recstudeid: recstudeid,
          sendName: isSender?sendName:Name,
          isSender
        }
      });
    },
    //公告
    goClassTellMessage(typeid, studeid, recstudeid) {
      this.$router.push({
        path: "/myclasstellmessage",
        query: { typeid: typeid, studeid: studeid, recstudeid: recstudeid }
      });
    },
    //通知
    goSystemMessage(typeid, studeid, recstudeid) {
      this.$router.push({
        path: "/mysystemmessage",
        query: { typeid: typeid, studeid: studeid, recstudeid: recstudeid }
      });
    }
  },
  computed: {
    ...mapState({
      // studentId:
    })
  }
};
</script>
<style lang="scss">
.pos_r_lei_boxElss{
  max-width: 13rem!important;
  display:-webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:1;
word-break:break-all;
text-overflow:ellipsis;
overflow:hidden;
}
.searchInput{
  width: 100%;
  height: 2.25rem;
  border: 1px solid #eee;
  border-radius: 1rem;
  display:flex;
  align-items: center;
  justify-content: space-between;
  background: #eee;
  
    overflow: hidden;
  img{
    width: 1rem;
    height:1rem;
    padding: 0 .5rem;
    flex-shrink: 0;
  }
  form{
    flex: 1;
    height: 2.25rem;
      input{
        width: 100%;
        height: 2.25rem;
        border: none;
        outline: none;
        background: #eee;
        font-size: .9rem;
        color: #666;
        line-height: 1.875rem;
        &::-webkit-input-placeholder { /* WebKit browsers */
            font-size: 1rem;
        }
      }
  }
  
  
}
.app-java-fz15{
    line-height: 2.3rem;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
    word-break:break-all;
    text-overflow:ellipsis;
    overflow:hidden;
    width: 90%;
      /*! autoprefixer: ignore next */
  *{
    font-size: .9375rem!important;
    // display: inline-block !important;
    display: inline !important;
    span{
      display: inline !important;
    }
    p{
       display: inline !important;
    }
    img{
      width: 1rem !important;
      height: 1rem !important;
    }
  } 
}
</style>

<style lang="scss" scoped>
.apnu-lv-messagecoune{
  width: 1.2rem!important;
  height: 1.2rem!important;
  // padding:2px 5px 2px ;
  background: #b49876;
  color: white;
  border-radius: 48%;
  line-height:1.2rem;
  text-align:center;
  font-size:0.75rem;
  margin-top: -0.1875rem;
  margin-left:0.3rem;
}
.My_ChairList-evaluation ul li {
  border-bottom: 0px;
}
.My_ChairList-evaluation ul li div div {
  line-height: 1.25rem;
}

.My_ChairList-evaluation ul li > div div.pos_r {
  margin-bottom: 0.6875rem;
}

.My_ChairList-evaluation ul li div div span {
  max-width: 288px;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: middle;
  /* line-height: 20px; */
}
// .My_ChairList-evaluation ul li > div p {
//   display:-webkit-box;
//   -webkit-box-orient:vertical;
//   -webkit-line-clamp:1;
//   word-break:break-all;
//   text-overflow:ellipsis;
//   overflow:hidden;
//   // width: 15rem;
// }
</style>

