<template>
  <div>
    <div class="clear" v-for="(item,index) in data" :key="index"  :class="index==data.length-1?'app-MyOrder-lv':''" >
      
      <div class="My_orderTitle">
        <p>
          <time class="fz15 c3">{{item.createTime}}</time>
          <!-- <span class="fr fz15">{{item.invoiceStatusText}}</span> -->
          <span class="fr fz15" :style="{'color':item.orderStatusColor}">{{item.orderStatusText}}</span>
        </p>
        <p class="fz15 c9" >订单编号：{{item.orderSn}}</p>
        <p class="fz15 c9" v-if="item.refundSn&&item.operation.includes('CancelRefude')||item.operation.includes('CancelRefudes')">退款编号：{{item.refundSn}}</p>
      </div>
      <!-- <Countdown v-if="item.isCancel" :str="item.orderTime" :item="item" :cancelOrder="cancelOrder" /> -->
      <div class="My_orderBody">
        <div class="fl My_orderLeft">
          <img v-lazy="item.courseIdList[0].coursePictureThumbUri" :key="index" alt>
          <span class="flexDisplay">
              <img class="flexDisplayImg" v-if="item.type=='1'" src="../../../static/img/course1.png" alt="">
              <img class="flexDisplayImg" v-if="item.type=='2'" src="../../../static/img/course2.png" alt="">
            </span>
        </div>
        <div class="fl My_orderRight">
          <div class="fz15 c30 app-h5-dan-y40 lineHeight15">{{item.courseIdList[0].courseName}}</div>
          <p class="fz12 c30 app-h5-dan-y40" style="marginBottom:0px;paddingTop:.525rem">{{item.courseIdList[0].coursePrice}}元</p>
          <p  style="paddingTop:.525rem">
          <strong class="fz12 c097 app-h5-dan-y40" v-if="item.orderStatusText=='待支付'">应付学费：{{item.courseActualPaymentPrice}}元</strong>
         </p>
         <p>
          <strong class="fz12 c097 app-h5-dan-y40" v-if="item.orderStatusText!=='待支付'">实付学费：{{item.courseActualPaymentPrice}}元</strong>
         </p>
       <!-- <p class="fz12 c30 app-h5-dan-y40" style="width:140px;marginBottom:0px">{{item.courseIdList[0].coursePrice}}元</p> -->
          <!-- <p class="fz12 c30 app-h5-dan-y40 mt-5" style="color:#C4A57F" v-if="item.courseIdList[0].refundEndTime||!item.orderStatusText=='待支付'">退课截至：<br/>{{formData(item.courseIdList[0].refundEndTime,"utc","add",false)}}</p> -->
          
        </div>
        <div class="fz12 c30 mt-5" style="color:#C4A57F;clear:both;padding-top: 0.7rem;" v-if="item.courseIdList[0].refundEndTime||!item.orderStatusText=='待支付'">
          退课截至：{{formData(item.courseIdList[0].refundEndTime,"utc","add",false)}}
          
          </div>
          <div class="fz12 c30 mt-5"
           v-if="item.giftInfo&&item.giftInfo.typeName=='已赠给'&&item.operation.includes('invoice')&&!item.luboCanRefund"
            style="color:#C4A57F;clear:both;" :style="{'padding-top':item.type=='2'?'0.7rem':'0rem'}">若被赠课人提出退课申请，学费将原路返回您的账户</div>
        <div class="fz12 mt-5" style="color:#C4A57F;clear:both;padding-top: 0.7rem;" v-if="item.luboCanRefund">录播形式的虚拟内容服务，报名后，不支持退课</div>
        <div class="fz12 c30  mt-5" style="color:#C4A57F;clear:both;display:flex;justify-content: space-between;" :style="{'padding-top':item.courseIdList[0].refundEndTime||item.giftInfo&&item.giftInfo.typeName=='已赠给'&&item.operation.includes('invoice')?'0rem':'0.7rem'}" v-if="item.giftInfo">
            <span style="display:flex">
            <span style="font-family: none;color: #999;" v-if="item.giftInfo.typeName">{{item.giftInfo.typeName}}：</span>
            <span style="font-family: none;" class="MY-hao-yin" >{{item.giftInfo.nickName}}
            <span class="fz12" v-if="item.giftInfo.phoneNum" style="font-family: none;color: #999;">( {{item.giftInfo.phoneNum}} )</span>&nbsp;</span>
            </span>
            <b
              style="float: right;"
              :style="{color:item.giftInfo.status=='已领取'?'#c4a57f':'#097276'}"
              v-if="item.giftInfo.status"
            >{{item.giftInfo.status}}</b>

        </div>
        <div v-if="item.operation.length" class="text-right My_orderBtn">
          <div>
            <span v-for="(itemse,index) in item.operation" :key="index">
            <span></span>
            <mt-button class="btn_pay" v-if="itemse=='pay'" v-preventReClick @click="pushPay(item)">付款</mt-button>
            <mt-button class="btn_drop" v-if="itemse=='cancelOrder'" v-preventReClick @click="cancelOrder(item)">取消订单</mt-button>
            <mt-button class="btn_drop" v-if="itemse=='refund'" v-preventReClick @click="refude(item)">申请退课</mt-button>
            <mt-button class="btn_drop" v-if="itemse=='refunds'" style="cursor:pointer;background:#ccc;border-color:#ccc;color:white">申请退课</mt-button>
            <mt-button class="btn_drop" v-if="itemse=='CancelRefude'" v-preventReClick @click="CancelRefude(item)">取消申请退课</mt-button>
            <mt-button class="btn_drop" v-if="itemse=='CancelRefudes'" style="cursor:pointer;background:#ccc;border-color:#ccc;color:white">取消申请退课</mt-button>
            <mt-button class="btn_drop app-h5-ins" v-if="itemse=='invoice'" v-preventReClick @click="invoice(item)">{{item.invoiceStatusText}}</mt-button>
            <mt-button class="btn_drop app-h5-ins" style="opacity:0.5;" v-if="itemse=='invoices'">{{item.invoiceStatusText}}</mt-button>
            <mt-button class="btn_drop app-h5-ing" v-if="itemse=='invoicing'">{{item.invoiceStatusText}}</mt-button>
            <mt-button class="btn_drop app-h5-ing" v-if="itemse=='uninvoice'">{{item.invoiceStatusText}}</mt-button>
            </span>
            <!-- <mt-button class="btn_gray" :style='{background:item.orderStatusColor}'>{{item.orderStatusText}}</mt-button> -->
          </div>
        </div>
      </div>
      <!-- <div class="My_orderBody" v-for='(val,ind) in item.courseIdList' :key='ind'>
                  <div class="fl My_orderLeft">
                      <img src="../../../static/mobile_img/book_list1.png" alt=""
                          :data-src='val.coursePictureThumbUri'
                      >
                  </div>
                  <div class="fl My_orderRight">
                      <h4 class="fz15 c30">{{val.courseName}}</h4>
                      <p class="fz12 c30">{{val.coursePrice}}元</p>
                      <strong class="fz12 c097">应付总额：{{val.coursePrice}}</strong>
                  </div>
                  <div class="text-right My_orderBtn">
                          <mt-button class="btn_gray">{{item.orderStatusText}}</mt-button>
                  </div>
        </div>-->
    </div>
  </div>
</template>
<script>
  import {
    mapState,
    mapActions
  } from "vuex";
  import {
    formData
  } from "@/public/index.js"; //处理时间
  import Countdown from "./Countdown.vue";
  import {
    MessageBox
  } from 'mint-ui';
  export default {
    name: "shop",
    props: {
      data: {
        type: null,
        require: true
      },
      mychildget:{
        type: null,
        require: true
      }
    },
    components: {
      Countdown
    },
    mounted() {
      // //console.log('看来你还是年轻')
    },
    computed: {
      ...mapState({
        //我的订单数据
        tabid: state => state.myOrderStore.tabid,
        myOrderList: state => state.myOrderStore.myOrderList
      })
    },
    methods: {
      formData,
      ...mapActions({
        //我的订单方法
        getchangetabid: "myOrderStore/getchangetabid",
        getMyOrderAction: "myOrderStore/getMyOrderAction",
        ChangeZero:'myOrderStore/ChangeGetZero',
      }),
      disposedata2(typeId) {
        let data = {
          orderStatus: typeId,
          pageIndex: 1,
          token: ""
        };
        return data;
      },
      getdata() {
        this.getMyOrderAction(this.disposedata2(this.tabid));
        this.ChangeZero()
        this.$emit('mychildget')
      },
      //取消订单
      cancelOrder(type) {
        let that = this;
        this.$axios
          .post("/order/cancel", {
            orderId: type.orderId,
            token: "",
            orderType: 1
          })
          .then(res => {
            if(res.data.code!==0){
              this.$Toast(res.data.mag)
              return
            }
            if(res.data.result){
            that.getdata();
            this.$Toast({
              message: "您已取消订单",
              position: "top",
              duration: 5000
            });
            //console.log(res.data, "取消订单");
            }else{
              this.$Toast(res.data.mag)
            }
          });
      },
      //申请退课
      refude(type) {
        MessageBox.confirm(type.orderWayText=="自己购买"?'您确定要退课吗?':'学费将原路退回至赠课人账户').then(action => {
          let that = this;
          this.$axios.post("/order/refund", {
              orderId: type.orderId,
              token: ""
            }).then(res => {
              // if(res.data.code!==0){
              //   setTimeout(()=>{
              //     that.messBox()
              //     // that.$Toast(res.data.msg)
              //   })
              //   return
              // }
              if(res.data.code==0&&res.data.result){
                 that.getdata();
              }else if(res.data.code==0&&res.data.result==false){
                this.$Toast({
                  message: "本课程学费所转换桐板儿优惠已被使用，请先对“已优惠购买课程”申请退课",
                  position: "top",
                  className:"toastWidth",
                  duration: 5000
                });
                return
              }
              //console.log(res.data, "申请退课");
              if(type.orderWayText=="被赠课"&&res.data.code==0){
                this.$Toast({
                  message: "学费将原路退回至赠课人账户",
                  position: "top",
                  duration: 5000
                });
              }else if(type.orderWayText=="自己购买"&&res.data.code==0){
                this.$Toast({
                  message: "您已申请退课，教室将为您审核",
                  position: "top",
                  duration: 5000
                });
              }
            });
        });
      },
      //取消退款
      CancelRefude(type) {
        MessageBox.confirm('您确定取消退课申请吗?').then(action => {
          let that = this;
        this.$axios
          .post("/order/closerefund", {
            orderId: type.orderId,
            token: ""
          })
          .then(res => {
                // that.$Toast(res.data.mag)
                that.getdata();
                if(res.data.code==0&&res.data.result){
                  this.$Toast({
                    message: "您已取消申请退课",
                    position: "top",
                    duration: 5000
                  });
                }else if(res.data.code==0&&res.data.result==false){
                  this.$Toast({
                    message: "本课程学费所转换桐板儿优惠已被使用，请先对“已优惠购买课程”申请退课",
                    position: "top",
                    className:"toastWidth",
                    duration: 5000
                  });
                }
            // //console.log(res.data, "取消申请退课");
          });
            
             
        })
      },
      //开具发票模板
      invoiceStatus(type) {
        this.$axios
          .post("/order/invoiceTemplate", {
            orderId: type.orderId,
            token: ""
          })
          .then(res => {});
        this.orderId = type.orderId;
        this.invoiceflag = true;
        this.invoicelist = data.result;
        //console.log(data.result);
        //console.log(type);
      },
      //申请发票页面
      invoice(item) {
        // console.log(item.type)
        // return
        this.$router.push({
          path: '/myInvoiceApplication',
          query: {
            id: item.orderId,
            type:item.type
          }
        })
      },
      pushPay(fater) {
      
       window.localStorage.setItem('chanJieIdOder', fater.courseIdList[0].courseId) 
       window.localStorage.setItem('courseTypeOder',  fater.courseIdList[0].courseType)
        // //console.log(fater, "fater");
        // //console.log(fater.courseIdList[0].courseId)
        let typenumber, nickName;
        if (fater.giftInfo) {
          typenumber = fater.giftInfo.phoneNum;
          nickName = fater.giftInfo.nickName;
        }
        this.$router.push({
          path: "/allCourseSubmitOrder",
          query: {
            istype: fater.courseIdList[0].courseType,
            fullid: fater.courseIdList[0].courseId,
            isTurnFull: false,
            orderType: fater.orderType,
            orderSNID: null,
            typenumber: typenumber,
            nickName: nickName,
            orderId:fater.orderId,
            Pyaprice:fater.courseActualPaymentPrice,
            score:fater.score
          }
        });
      }
      // goShopLink (url) {
      //     this.$router.push({
      //         path:url
      //     })
      // }
    }
  };
</script>
<style lang='scss' scoped>
.MY-hao-yin{
    display: inline-block;
    width: 11rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.app-MyOrder-lv{
  // background: red;
   .My_orderBody::after{
     display: none;
   }
   padding-bottom: 1.5rem;
}
.lineHeight15{
  line-height: 1.3rem!important;
}
  .My_order .My_orderBody .My_orderLeft img {
    width: 9.56rem;
    height: 5.37rem;
    border-radius: .18rem;
  }
  .app-h5-ins {
    background: #c4a57f;
    color: white;
  }
  .app-h5-ing {
    border-color: #ccc;
    background: #ccc;
    color: white;
  }
  .app-h5-dan-y40 {
    width: 145px; 
  }
  .boxEill {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .fl.My_orderLeft {
    position: relative;
  }
  .flexDisplay {
    position: absolute;
    left: -.75rem;
    top: -.75rem;
    width: 2.5rem;
    height: 2.5rem;
    &>.flexDisplayImg {
      width: 100%!important;
      height: 100%!important;
    }
  }
  .fz15.c30.app-h5-dan-y40 {
    font-size: 0.9375rem;
    line-height: 2rem;
    font-family: "FZXIYSJ";
  }
</style>