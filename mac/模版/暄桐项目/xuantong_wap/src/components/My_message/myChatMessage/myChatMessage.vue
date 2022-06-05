<template>
  <div id="chitchat" >
    <article class="nav-title" v-if="!this.$flag">
      <mt-header fixed :title="sendName" :right="152">
        <a href="javascript:void(0);" slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
        <mt-button slot="right"  @click="getMessageLists"><span style="color:#b49876" v-if="!shuaxinFlag" class="fz14">刷新消息</span><img v-if="shuaxinFlag"   class="imgFlag " src="../../../../static/img/816.gif" alt=""></mt-button>
      </mt-header>
    </article>
    <div v-if="this.$flag" class="app-lv_flagwx" >
      <div class="app-lv_flagwx_minBox"></div>
      <img style="  position: absolute;left:0rem" src="../../../../static/img/back.png" class="gu_nav_title_img_top" @click="goBack"> 
      <div class="app-lv_flagwx_minBox app-lv_flagwx_minBox_maxWidth">{{sendName}}</div>
      <div class="app-lv_flagwx_minBox app-lv_flagwx_right fz14" @click="getMessageLists"><span style="color:#b49876" v-if="!shuaxinFlag">刷新消息</span><img v-if="shuaxinFlag" class="imgFlag" src="../../../../static/img/816.gif" alt=""></div>
    </div>
    <div class="mobile_content pl-15 pr-15" id="messageContent" 
    
    :style="{height:H+'rem'}" 
    
    ref="messageContent" @touchmove="auto">
      <div v-for="(item,index) in list" :key="index" class="app-messageContent-div" ref="Scroll">
        <div class="messageContent_List" v-for="(ite,ind) in item.data" :key="ind">
          <time class="fz12 c9 dis_block text-center mt-20 mb-20">{{computingDataTime(ite.sendTime)}}</time>
          <div style="display:flex" class="text-left mb-20" v-if="!ite.messageType">
            <img v-if="!isSender" v-lazy="ite.senderHead" alt class="fl" style="object-fit: cover;">
            <img v-else v-lazy="ite.senderHead" alt class="fl" style="object-fit: cover;">
            <div class="fl">
              <p class="fz14 c3 app-p2-flw" v-html="ite.message">
              </p>
            </div>
          </div>
          <!-- <time class="fz12 c9 dis_block text-center mt-60 mb-40">{{computingDataTime(ite.sendTime)}}</time> -->
          <div class="text_right_lei mb-20" v-if="ite.messageType" style="display:block;height:44px">
            <div class="fr_leijc">
              <p v-html="ite.message" class="app-p2-flw" style="background:rgba(196, 165, 127, 0.2)"></p>
            </div>
            <img v-if="isSender" v-lazy="ite.senderHead" alt class="fr_leijc" style="object-fit: cover;">
            <img v-else v-lazy="ite.senderHead" alt class="fr_leijc" style="object-fit: cover;">
          </div>
        </div>
      </div>
    </div> 
    <!-- 评价 -->
    <footer>
      <discussListRich @ChangeFlag="ChangeFlag" :sendText="sendText" ref="RichText" :InitReply="InitReply" :replayText="replayText"/>
      </footer>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'; 
  import discussListRich from '@/component/editer/RichText'
  import moment from "moment";
  import {
    computingDataTime
  } from "@/public/utils";
  export default {
    name: "mychatmessage",
    data() {
      return {
        messageFlag:true,
        messageTop:false,
        sendText:'发送',
        list: [{
          message: "", //内容
          sendTime: "", //发送时间
          title: "", //消息标题（纯文本消息无标题）
          receiveHead: "", //收件人的头像
          senderHead: "", //发消息的头像
          messageType: "" //是否是自己
        }],
        text: "", //文本
        typeid: null, //类型id
        studeid: null, //收件人id
        recstudeid: null, //发送人id
        sendName: null, //聊天人
        isSender: false, //是否为发件人
        H: 0,
        shuaxinFlag:false,//刷新开关
        replayText:'',//提示文本,
      };
    },
    components: {
      discussListRich
    },
    //初始获取数据
   async mounted() {
          // //console.log(this.$route.query.iswork,'this.$route.query.isworkthis.$route.query.iswork')
          this.getData()
          this.HContent()
    },
    methods: {
      ChangeFlag(type){
       
        //console.log('我是谁',type)
        setTimeout(()=>{
          this.messageFlag = false
           this.messageTop = true
          //  this.$refs.RichText.blurss()
        },2000)
       
      },
      auto(){
         this.$refs.RichText.blurss()
      },
      //初始list
      getData(){
          this.typeid = this.$route.query.typeid; //
          this.studeid = this.$route.query.studeid; // 发件人id
          this.recstudeid = this.$route.query.recstudeid; //收件人id
          this.sendName = this.$route.query.sendName; //
          // this.isSender = Boolean(this.$route.query.isSender); //是否为发件人
          if(!this.$route.query.isSender||this.$route.query.isSender=='false'){
            this.isSender = false
          }else{
            this.isSender = true
          }
          this.$axios
            .post("/privateletter/messagelist", {
              token: "",
              senderId: this.isSender ? this.recstudeid : this.studeid, //对方的id
              senderType: this.typeid
            })
            .then(res => {
              if (res.data.code == 0) {
                this.list = this.initData(
                  res.data.result.privateLetterMessageResponseVos
                );
                  this.scrollBottom();
              }
            });
      },
      //获取count的高
      HContent(){
          let scr = this.$refs.messageContent;
          let css = document.body.currentStyle ?
            document.body.currentStyle :
            document.defaultView.getComputedStyle(document.body, null);
          this.H = window.screen.height / parseFloat(css.fontSize) - 6.1;
          //console.log(this.H ,'this.H ')
      },
      goBack() {
        if(this.$route.query.iswork=='Sun'){
           this.$router.push({
                path:'/chanjiedetail',
            })
            return
        } 
        if(this.$route.query.iswork=='SunList'){
           this.$router.push({
                path:'/chanjiedetaildiscuss',
            })
            return
        }
        if(this.$route.query.iswork=='SunListAll'){
           this.$router.push({
                path:'/chanjiedetaildiscussall',
            })
            return
        }
         this.$router.back(-1);
        // if (this.$route.query.iswork) {
         
        //   this.$router.back(-1);
        //   this.$router.back(-1);
        // } else {
         
        // }
      },
      computingDataTime,
      //数据处理
      initData(list) {
        list = list.map(item => {
          item.dataTime = moment(item.sendTime)
            .utc()
            .format("YYYY/MM/DD");
          return item;
        });
        // //console.log("处理后", list);
        let aryDay = [];
        list.forEach(item => {
          if (!aryDay.includes(item.dataTime)) {
            aryDay.push(item.dataTime);
          }
        });
        // //console.log(aryDay, "所有存在的天数");
        let messageAry = []; //最后组成的数据
        aryDay.forEach(item => {
          let obj = {};
          obj.time = item;
          obj.data = [];
          list.forEach(ite => {
            if (ite.dataTime == item) {
              obj.data.push(ite);
            }
          });
          messageAry.push(obj);
        });
        //console.log(messageAry, "最后的数据");
        return messageAry;
      },
      //处理消息
      InitReply(html){
        this.$axios
          .post("/privateletter/reply", {
            token: "",
            message: html,
            reciveId: this.isSender ? this.recstudeid : this.studeid //对方的id
          })
          .then(res => {
            if (res.data.code == 0) {
              this.getMessageList();
            }
          });
      },
      //刷新数据
      getMessageList() {
        this.$axios
          .post("/privateletter/messagelist", {
            token: "",
            senderId: this.isSender ? this.recstudeid : this.studeid,
            senderType: this.typeid
          })
          .then(res => {
            if (res.data.code == 0) {
              this.list = this.initData(
                res.data.result.privateLetterMessageResponseVos
              );
              this.scrollBottom();
            }
          });
      },
      getMessageLists(){
        this.shuaxinFlag = true;
        this.$axios
          .post("/privateletter/messagelist", {
            token: "",
            senderId: this.isSender ? this.recstudeid : this.studeid,
            senderType: this.typeid
          })
          .then(res => {
            //console.log(res, "SHUJU");
            setTimeout(()=>{
              this.shuaxinFlag = false;
              this.$Toast({
                message: "刷新成功",
                position: "crntep",
                duration: 1000
              });
            },1000)
            if (res.data.code == 0) {
              this.list = this.initData(
                res.data.result.privateLetterMessageResponseVos
              );
              this.scrollBottom();
            }
          });
      },
      //移动到底部
      scrollBottom() {
        setTimeout(() => {
          let scr = this.$refs.messageContent;
          // //console.log(scr.scrollHeight,"结点1")
          // //console.log(scr.offsetHeight,"结点2")
          this.$nextTick(() => {
            let H = scr.scrollHeight - scr.offsetHeight;
            //console.log(H,'差')
            scr.scrollTop = H;
             window.scrollTo(scr.scrollHeight, scr.scrollHeight);
          });
        }, 300);
      },
    }
  };
</script>
<style lang="scss" scoped>
.app-lv_flagwx_minBox_maxWidth{
  max-width: 13rem;
  display:-webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:1;
word-break:break-all;
text-overflow:ellipsis;
overflow:hidden;
}
.imgFlag{
  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  top: .5rem;
  right: .5rem;
  z-index: 3333;
}
    .app-lv_flagwx{
              text-align:center;
              line-height:2.5rem;
              // top: 0;
              // right: 0;
              // left: 0;
              // position: fixed;
              // z-index: 1;
              height: 3rem;
              display: flex;
              justify-content: space-between;
              padding: 0 1rem;
              background: #fff;
              .app-lv_flagwx_minBox{
                width: 33.3%;
                text-align: center;
              }
              .app-lv_flagwx_right{
                width: 33.3%;
                text-align: end;
              }
    }
  #chitchat {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .nav-title{
      height: 3rem;
    }
    #messageContent{
      flex: 1;
      padding-bottom: 2rem;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
      box-sizing: border-box;
    }
    footer{
      height: 3.0625rem;
      flex-shrink: 0;
    }
  }
 
  .messageContent_List{
    clear:both;
  }
  .text_right_lei{
    //  display: flow-root!important
    display: flex!important;
    justify-content: flex-end;
    height: auto!important;
    float:right;
    img{
        width: 2.8125rem;
        height: 2.8125rem;
        border-radius: 6.25rem;
        padding: 1 .1rem;
    }
  }
  .text_right_lei > div.fr_leijc {
    max-width: 86%;
    // max-width: 470px;
    position: relative;
  }
  .text_right_lei > div.fr_leijc time {
    position: absolute;
    left: -49px;
    top: 0px;
  }
  .text_right_lei > div.fr_leijc p {
    border-radius: 22px;
    // background: rgba(196, 165, 127, 0.2);
    position: relative;
    margin-right: 10px;
    line-height: 1.375rem;
    max-width:13.3rem;
    color: #555;
    font-size: .9375rem;

  }
  .text_right_lei > div.fr_leijc p::before {
    content: url(../../../../static/mobile_img/messageContent_List2.png);
    position: absolute;
    right: -8px;
  }
  // #messageContent {
  //   -webkit-overflow-scrolling: touch;
  //   overflow: auto;
  //   // padding-bottom: 10.1rem;
  //   margin-top: 2.5rem;
  //   box-sizing: border-box;
   
  //   .app-messageContent-div:last-child {
  //     //  background: red;
  //     // padding-bottom: 5rem; // div:last-child {
  //     //  
  //     // }
  //   }
  // }
  .Define_footFixed {
    height: auto;
  }
  .blue {
    background: red;
  }
  .app-p2-flw {
    padding: 11px 16px;
    border-radius: 22px;
    background: rgba(94, 79, 79, 0.7);
    position: relative;
    margin-left: 10px;
    line-height: 1.375rem;
  }
  .Define_footFixed.chat_footer {
    display: flex;
    align-items: center;
    #editorElem {
      flex: 1;
      outline: none;
      border: none;
      margin-left: 1rem;
    }
    input {
      flex: 1;
      outline: none;
      border: none;
      margin-left: 1rem;
    }
    button {
      // position:static;
      position: absolute;
      top: 0;
    }
    .mint-button::after {
      position: static;
    }
  }
</style>

