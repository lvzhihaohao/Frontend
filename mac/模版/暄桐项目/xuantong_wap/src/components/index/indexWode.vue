<template >
  <div id="My_menu">
    <article class="nav-title">
      <mt-header :title="this.$flag ? '':'我的'" fixed style="padding:2.75rem 1.625rem">
        <a href="javascript:void(0);" @click="goSettings" slot="left">
          <mt-button style="width:1.25rem;height:1.25rem">
            <!-- {{this.$flag}} -->
            <img src="../../../static/img/mysecurity.png" style="width:1.25rem;height:1.25rem">
          </mt-button>
        </a>
        <div slot="right" @click="message" style="position: relative;">
          <span v-if="userInfo&&userInfo.msgNum>0" class="app-wo-rispan"></span>
          <mt-button>
            <img src="../../../static/img/24.png" style="width:1.25rem;height:1.25rem">
          </mt-button>
        </div>
      </mt-header>
    </article>
    <div class="mobile_content pl-25 pr-25 My_menuContent">
      <article class="dis_flow_root">
        <div class="userHead text-center">
          <div class="userImg m-auto" v-if="userInfo.nickName == ''">
            <img
              src="../../../static/img/bg.png"
              style="object-fit: cover;"
              alt
              @click="goLogin"
            >
          </div>
          <div class="userImg m-auto" v-else>
            <img
              v-if="userInfo"
              style="object-fit: cover;"
              v-lazy="userInfo.headUri"
              alt
              @click="goPersonalinformation"
            >
          </div>
          <a
            href="javascript:void(0)"
            class="fz15 c30"
            @click="goLogin"
            v-if="userInfo.nickName == ''"
          >点击登录</a>
          <a href="javascript:void(0)" class="fz15 c30" v-else>{{userInfo.nickName}}</a>
          <p class="fz14 mt-15 cb19" v-if="userInfo.studyPeriod > 0">学习时长：{{initTime(userInfo.studyPeriod)}}</p>
        </div>
        <div class="userContent">
          <ul>
            <li @click="goMyHomeWork">
              <!-- <a href="/My_menu/My_homework.html"></a>   -->
              <router-link to>我的作业</router-link>
              <img class="app-cell-allow-right" src="../../../static/icon/you.png">
            </li>
            <li @click="goMyBaskHomeWork">
              <!-- <a href="##">我晒出的作业</a> -->
              <router-link to>我晒出的作业</router-link>
              <img class="app-cell-allow-right" src="../../../static/icon/you.png">
            </li>
            <!-- <li @click='goMyCollectionClasses'>
                            <router-link to="">我收藏的课程</router-link>       
                            <i class="mint-cell-allow-right"></i>
            </li>-->
            <li @click="goMyOrder">
              <router-link to>我的订单</router-link>
              <img class="app-cell-allow-right" src="../../../static/icon/you.png">
            </li>
            <li id="btn" class="zhiCustomBtn" @click="kf">
              <span  >暄桐客服</span>
              <img class="app-cell-allow-right" src="../../../static/icon/you.png">
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import { initTime } from "@/public/utils";
import { getUserInfoCookie, getCookie,formData,setUserInfoCookie } from "../../public/index";
export default {
  name: "indexwode",
  data() {
    return {
      userInfo: {
          birthday:'',
          userOrderInfoResponseVo:{},
          phoneNum:'',
          email:'',
          nickName:'',
          headUri:'',
          sex:'',
          userName:'',
      },
      UserFlag:false
    };
  },
  mounted() {
    if(getCookie()=='undefined'){
        setUserInfoCookie(undefined)
        this.$ModelToast(true)
        return
    }
    this.UserFlag = !getUserInfoCookie() || getUserInfoCookie() == "undefined"
    if (this.UserFlag) {
      // this.userInfo = {
          //console.log(this.userInfo,'userNameuserName')
           this.bindCustomer()
      // };
    } else {
      let getUserList =  JSON.parse(getUserInfoCookie())
      if (!getUserList) {
        this.$axios.post("/user/getuserinfo", {token: ""}).then(res => {
          setUserInfoCookie(res.data.result)
          this.userInfo = res.data.result;
          //console.log(this.userInfo.headUri, "this.userInfo");
          this.initInfo(this.userInfo)
            this.bindCustomer()
        });
      }else{
        this.userInfo = getUserList;
        this.initInfo(this.userInfo)
        this.bindCustomer()
      }
    }
    // this.kf()
      // this.bindCustomer()
         
   
     
  },
  destroyed(){
    //第n次销毁刷新客服
    window.localStorage.setItem('zhiCustomBtnFlag',null)
    window.localStorage.setItem('deszhiCustomBtnFlag','Flag')
  },
  methods: {
    initTime,
    formData,
    //客服
    kf() {
      // this.bindCustomer()
      // window.open('https://www.sobot.com/chat/pc/index.html?sysNum=f2c2e254039745dfb3413702ef22c324')
      // this.$router.push({
      //   path: "/XTCustomer"
      // });
      // return
      //console.log(window.localStorage.getItem('zhiCustomBtnFlag'),'?????')
      let zhiCustomBtnFlag = window.localStorage.getItem('zhiCustomBtnFlag') //刷新的
      let deszhiCustomBtnFlag = window.localStorage.getItem('deszhiCustomBtnFlag')  //n的
      if(zhiCustomBtnFlag!=='null'&&deszhiCustomBtnFlag!=='Flag'){
        //刷新锁定
        return
      }
      if (document.getElementById("zhichiBtnBox")) {
        let box = document.getElementById("zhichiBtnBox");
         //console.log(document.getElementById("zhichiBtnBox"),'document.getElementById("zhichiBtnBox")')
         box.click();
         window.localStorage.setItem('zhiCustomBtnFlag','zhiCustomBtn')
      }
    },
    //处理用户信息
    initInfo(obj){
      //console.log(obj,'处理用户信息obj')
      if(obj.userOrderInfoResponseVo){

      //处理生日
    obj.birthday = this.formData(obj.birthday, "utc")
    //处理下单时间
    obj.userOrderInfoResponseVo.createTime= this.formData(obj.userOrderInfoResponseVo.createTime,"utc","add")

    //处理取消时间
    obj.userOrderInfoResponseVo.closeTime=this.formData(obj.userOrderInfoResponseVo.closeTime,"utc","add")

    //处理付款时间
    obj.userOrderInfoResponseVo.finishTime=this.formData(obj.userOrderInfoResponseVo.finishTime,"utc","add")
   
    //处理课程类型 1 单阶  2 全阶
    obj.userOrderInfoResponseVo.courseType=["","单阶","全阶"][obj.userOrderInfoResponseVo.courseType]

    //处理订单状态   1: 待支付  2:已支付  3退款中  4已退款  5已取消
    obj.userOrderInfoResponseVo.orderStatus=["","待支付","已支付","退款中","已退款","已取消"][obj.userOrderInfoResponseVo.orderStatus]

    //处理订单类型  1 付费 2 折扣  3 免费  4 赠课
    obj.userOrderInfoResponseVo.orderType=["","付费","折扣","免费","赠课"][obj.userOrderInfoResponseVo.orderType]

    //处理付款类型  1 自己下单  2 赠课  3 被赠课
    obj.userOrderInfoResponseVo.orderWay=["","自己下单","赠课","被赠课"][obj.userOrderInfoResponseVo.orderWay]
   
    //处理付款类型  1 微信  2 支付宝  3 银行转账 4 其它
    obj.userOrderInfoResponseVo.paymentType=["","微信","支付宝","银行转账","其它"][obj.userOrderInfoResponseVo.paymentType]
      this.userInfo={...obj}
      }
    //console.log(this.userInfo,'chuli')
    },
    //去往登录页面
    goLogin() {
      this.$ModelToast(true);
    },
    //去个人信息页面
    goPersonalinformation() {
      if (this.userInfo == undefined) {
        this.$ModelToast(true);
        return;
      }
      this.$router.push({
        path: "/personalinformation",
        query: { type: 1 }
      });
    },
    //去往我的作业
    goMyHomeWork() {
      if (this.UserFlag) {
        this.$ModelToast(true);
        return;
      }
      this.$router.push({
        path: "/myhomework"
      });
    },
    //去往我晒出的作业
    goMyBaskHomeWork() {
      if (this.UserFlag) {
        this.$ModelToast(true);
        return;
      }
      this.$router.push({
        path: "/mybaskhomework"
      });
    },
    message() {
      if (this.UserFlag) {
        this.$ModelToast(true);
        return;
      }
      this.$router.push({
        path: "/mymessageall"
      });
    },
    //去往我的收藏课程
    // goMyCollectionClasses () {
    //     this.$router.push({
    //         path:'/mycollectionclasses'
    //     })
    // },
    //去往我的订单
    goMyOrder() {
      if (this.UserFlag) {
        this.$ModelToast(true);
        return;
      }
      this.$router.push({
        path: "/myorder"
      });
    },
    //去往设置页面
    goSettings() {
      if (!getUserInfoCookie() || getCookie() == "undefined") {
        this.$ModelToast(true);
      } else {
        this.$router.push({
          path: "/securitysettings"
        });
      }
    },

    //连接客服
   bindCustomer(){
    //console.log('我是连接客服')
      let that = this;
        var zhiManager = getzhiSDKInstance();
       
     
       zhiManager.set("color", "009487");//设置主题色
       zhiManager.set("customBtn", true); //不使用系统默认的按钮
       zhiManager.set('anchor',true)
          // let testObj = {
          //   等级: "VIP用户",
          //   客户状态: "意向客户",
          //   订单号: "12345667899",
          //   订单信息: "付费订单",
          //   customField2: "测试自定义"
          // };
          //对接系统默认的字段
          zhiManager.set("userinfo", {
            tel:'15011300176', //电话或手机
            email: that.userInfo.email, //邮箱
            uname: that.userInfo.nickName, //昵称
            visitTitle: "", //对话页标题，若不传入系统将获取用户打开咨询组件时所在页面的标题
            visitUrl: "", //对话页URL，若不传入系统将获取用户打开咨询组件时所在页面的URL
            face: that.userInfo.headUri, //头像URL
            realname: "", //真实姓名
            weibo: "", //微博账号
            weixin: "", //微信账号
            qq: "", //QQ号
            sex: that.userInfo.sex, //0 男 1 女
            birthday: that.userInfo.birthday, //生日，如“1990-01-01”
            // params: JSON.stringify(testObj),
            remark: "备注一下",
            partnerId: that.userInfo.userName, //用户id  对接id
          });
          //自定义字段
          let customObj = {
            customField1: that.userInfo.userOrderInfoResponseVo.courseName, //商品名称
            customField2: that.userInfo.userOrderInfoResponseVo.courseType, //课程类型,
            customField3: that.userInfo.userOrderInfoResponseVo.orderSn, //订单编号
            customField4: that.userInfo.userOrderInfoResponseVo.orderStatus, //订单状态
            customField5: that.userInfo.userOrderInfoResponseVo.orderType, //订单类型
            customField6: that.userInfo.userOrderInfoResponseVo.orderWay, //付款类型
            customField7: that.userInfo.userOrderInfoResponseVo.paymentType, //支付方式
            customField8: that.userInfo.userOrderInfoResponseVo.createTime, //下单时间
            customField9: that.userInfo.userOrderInfoResponseVo.closeTime, //取消时间
            customField10: that.userInfo.userOrderInfoResponseVo.finishTime, //付款时间

            customField11: that.userInfo.location, //所在地
            customField12: that.userInfo.career, //职业
            customField13: that.userInfo.sexy, //性别
            customField14: that.userInfo.indestry, //行业
            customField15: that.userInfo.education, //学历
          };
          // //console.log("自定义信息", JSON.stringify(customObj));
          zhiManager.on("load",function(){
         zhiManager.initBtnDOM()
       })
          zhiManager.set("customerFields", JSON.stringify(customObj));
          
          //   未读消息 只有在用户将窗口折起时，客服发送给用户的消息，这个事件才可以触发。
          zhiManager.on("receivemessage", function(ret) {
            //code write here ...
            /**
             * 返回格式：[{content:'您好',msgId:'615b0a3801804f14be1d456e11b329af',customName:'智齿科技'}]
             */
            //console.log(ret, "未读消息内容");
             that.unReadNum=1
          });
          //未读消息数
          zhiManager.on("unread.count", function(data) {
            //console.log(data, "未读消息数");
            that.unReadNum = data;
          });

    }
  }
};
</script>
<style lang="scss" scoped>
.is-right {
  background: red;
}
.app-wo-rispan {
  background: rgb(173, 78, 63);
  border-radius: 50%;
  display: inline-block;
  width: 0.625rem;
  height: 0.625rem;
  color: white;
  text-align: center;
  position: absolute;
  top: 0.4rem;
  right: -0.2rem;
  z-index: 9999;
}
</style>


