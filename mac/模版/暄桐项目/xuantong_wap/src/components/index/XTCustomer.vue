<template>
    <section>
        <div  class="zhiCustomBtn"></div>
    </section>
</template>

<script>
import { getUserInfoCookie,setUserInfoCookie, getCookie,formData } from "../../public/index";
export default {
    data(){
        return{
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
        }
    },
    created(){
        this.UserFlag = !getUserInfoCookie() || getUserInfoCookie() == "undefined"
         if (this.UserFlag) {
            
         }else{
             this.$axios
            .post("/user/getuserinfo", {//修改getuserinfo
                token: ""
            })
            .then(res => {
                setUserInfoCookie(res.data.result)
                this.userInfo = res.data.result;
                // //console.log(this.userInfo, "this.userInfo");
                this.initInfo(this.userInfo)
            });
         }
        this.bindCustomer()
        let idbox = document.getElementById("ZCPanel") 
           if (document.getElementById("zhichiBtnBox")) {
                let box = document.getElementById("zhichiBtnBox");
                //console.log(document.getElementById("zhichiBtnBox"),'document.getElementById("zhichiBtnBox")')
                box.click();
          }
    },
    methods:{
        formData,   
        //处理用户信息
        initInfo(obj){
        //处理生日
        obj.birthday = this.formData(obj.birthday, "utc")
        //处理下单时间
        obj.userOrderInfoResponseVo.createTime=this.formData(obj.userOrderInfoResponseVo.createTime,"utc","add")

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

        },
        //连接客服
     bindCustomer(){
    //console.log('我是连接客服')
      let that = this;
        var zhiManager = getzhiSDKInstance();
       zhiManager.on("load",function(){
         zhiManager.initBtnDOM()
       })
       zhiManager.set("color", "009487");//设置主题色
       zhiManager.set("customBtn", true); //不使用系统默认的按钮
          let testObj = {
            等级: "VIP用户",
            客户状态: "意向客户",
            订单号: "12345667899",
            订单信息: "付费订单",
            customField2: "测试自定义"
          };
          //对接系统默认的字段
          zhiManager.set("userinfo", {
            tel: that.userInfo.phoneNum, //电话或手机
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
            params: JSON.stringify(testObj),
            remark: "备注一下",
            partnerId: that.userInfo.userName, //用户id  对接id
          });
          //自定义字段
          let customObj = {
            customField3: that.userInfo.userOrderInfoResponseVo.courseName, //商品名称
            customField4: that.userInfo.userOrderInfoResponseVo.courseType, //课程类型,
            customField5: that.userInfo.userOrderInfoResponseVo.orderId, //订单编号
            customField7: that.userInfo.userOrderInfoResponseVo.orderStatus, //订单状态
            customField8: that.userInfo.userOrderInfoResponseVo.orderType, //订单类型
            customField9: that.userInfo.userOrderInfoResponseVo.orderWay, //付款类型
            customField10: that.userInfo.userOrderInfoResponseVo.paymentType, //支付方式
            customField11: that.userInfo.userOrderInfoResponseVo.createTime, //下单时间
            customField11: that.userInfo.userOrderInfoResponseVo.closeTime, //取消时间
            customField13: that.userInfo.userOrderInfoResponseVo.finishTime //付款时间
          };
          //console.log("自定义信息", JSON.stringify(customObj));
          zhiManager.set("customerFields", JSON.stringify(customObj));

          //   未读消息 只有在用户将窗口折起时，客服发送给用户的消息，这个事件才可以触发。
          zhiManager.on("receivemessage", function(ret) {
            //code write here ...
            /**
             * 返回格式：[{content:'您好',msgId:'615b0a3801804f14be1d456e11b329af',customName:'智齿科技'}]
             */
            //console.log(ret, "未读消息内容");
          });
          //未读消息数
          zhiManager.on("unread.count", function(data) {
            //console.log(data, "未读消息数");
            that.unReadNum = data;
          });

    }
    }
}
</script>

<style>

</style>
