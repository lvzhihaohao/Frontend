<template>
  <div id="app" ref="appBox">
    <article class="nav-title" v-if="!this.$flag">
      <mt-header title="支付" fixed v-if="istype==2">
        <div slot="left" @click="gouto">
          <mt-button icon="back"></mt-button>
        </div>
      </mt-header>
      <mt-header title="支付" fixed v-else>
        <div slot="left" @click="gouto">
          <mt-button icon="back"></mt-button>
        </div>
      </mt-header>
    </article>
    <div class="mobile_content">
      <article class="gu_content app-z-content">
        <img src="../../../static/img/back.png" class="gu_nav_title_img" v-if="this.$flag" @click="gouto">
        <div class="pl-28 pr-28">
          <!--mobile_content 固定底部的话+add -->
          <article class="Book pt-0" style="border-bottom:1px solid #eee">
            <div class>
              <div class="pos_r">
                <!-- <img
                    v-if="cousedetail.courseType==1"
                    src="../../../static/mobile_img/live-ico.png"
                    alt
                    class="pos_a"
                  >
                  <img v-else src="../../../static/mobile_img/recorded-ico.png" alt class="pos_a">-->
                <!-- <span class="pos_a fz12">报名截止日期：2019-02-02</span> -->
                <img class="pos_r_imgwh" style="border-radius: 5px;" :src="cousedetail.coursePictureUri" alt>
                <div class="app-z-content-info mt-15">
                  <p class="ChanjieTitle">
                    <span class="fz12 cf recorded" v-if="cousedetail.courseType=='1'" style="background:#C4A57F">直播课</span>
                    <span class="fz12 cf recorded" v-else style="background:#EA9C91">录播课</span>
                    <strong class="fz18 c30">{{cousedetail.courseName}}</strong>
                  </p>
                  <p class="fz15 c30 app-z-tit" style="line-height: 1.5rem;">{{cousedetail.courseSubtitle}}</p>
                  <section>
                    <span class="c097 fz18 bold" v-if="!cousedetail.purchased">{{cousedetail.courseFullPrice}}元</span>
                    <span class="fz15">共{{cousedetail.classHourCount}}课</span>
                    <!-- <span
                        class="fz15 c4a5"
                        v-if="cousedetail.statusName=='已报名'"
                      >{{cousedetail.statusName}}</span>-->
                    <!-- <span class="fz15" style="color:#999" v-if="cousedetail.statusName!='已报名'">{{cousedetail.statusName}}</span> -->
                    <!-- <label for="" class="fz12 c9 fr">
                                              <i class="iconfont icon-shoucang middle"></i>
                                              <span class=" pos_r" style="top:2px;">收藏</span>
                      </label>-->
                  </section>
                  <!-- <output class="c5"><s>原价 12980元</s></output>
                    <strong class="fz18 c097 dis_block">3280元</strong>-->
                </div>
              </div>
            </div>
          </article>
          <div class="Haveclass_menu-Hot allCourse_List" v-if="istype==2" style="border-top:none;padding-bottom:0.81rem">
            <div class="clear" :class="{c3c:item.isGray}" v-for="item in cousedetail.courseSingleResponseVos" :key="item.courseId">
              <div>
                <img :src="item.coursePictureUri" style="width:9.5625rem;height:5.375rem" alt>
              </div>
              <div class="clearpaddingLeft" style="">
                <div class="clearpaddingLeft-text fz15 c30 mt-10">{{item.courseName}}</div>
                <!-- <p class="fz12"  :class="{'app-c30':item.isGray}" style="marginBottom:0rem">{{item.courseSubtitle}}</p> -->
                <p class="fz12">
                  <span class="mr-10">{{item.courseFullPrice}}元</span>
                  <span>共{{item.classHourCount}}课 {{item.sortName}}</span>
                </p>
                <p class="fz12" :class="{'app-c30':item.isGray}">
                  <!-- <span>共{{item.classHourCount}}课 {{item.sortName}}</span> -->
                  <span v-if="item.isGray" style="float:right">已报名</span>
                </p>
              </div>
            </div>
            <!-- <div class="clear">
                <div>
                  <img src="../../../static/mobile_img/book_list2.png" alt>
                </div>
                <div>
                  <h3 class="fz15 c30">第二阶 | 篆隶筑基</h3>
                  <p class="fz12">《从书法之美到生活之美》</p>
                  <p class="fz12">共10课·进行至第6999999999课</p>
                </div>
              </div>-->
            <!-- <div class="clear">
                              <div><img src="../../../static/mobile_img/book_list3.png" alt=""></div>
                              <div>
                                  <h3 class="fz15 c30">第三阶 | 篆隶筑基</h3>
                                  <p class="fz12">《从书法之美到生活之美》</p>
                                  <p class="fz12">共10课·进行至第6课</p>
                              </div>
              </div>-->
          </div>
          <div v-if="isgif" class="app-Giftke" style="padding-top:0.81rem;padding-bottom:1.45rem;">
            <h3 class="fz18 fzGB1-0 c4a5" style="font-weight:400">请填写Ta的信息</h3>
            <p>
              <input class="fz15 fzGB1-0" @blur="isFormPhone" :disabled="disabled" v-model="phoneNum" placeholder="Ta的手机号">
            </p>
            <p class="app-Giftke-ic fz15 fzGB1-0" v-if="isFormFlag">请输入正确的手机号格式</p>
            <p class="app-Giftke-ic fz15 fzGB1-0" v-if="isGifFormFlag">不能填写自己的手机号</p>
            <p class="app-Giftke-in fz15 fzGB1-0" v-if="gifname">Ta在暄桐的昵称：{{gifname}}</p>
          </div>
          <!-- 京豆 -->
          <div class="allCourse_text" style="border-bottom: 1px solid #eee;padding-bottom: 0.95rem;">
            <p class="fz18 fzGB1-0 c4a5" style="font-weight: 400; margin-bottom: .825rem;">
              <label for>桐板儿 <img @click="yiwenNone" src="../../../static/icon/jdyihuo.png" style=" width: 1rem;height: 1rem;"/></label>
            </p>
            <p class="fz14 fzGB1-0 " style="color:#999">
              <label for style="color:rgb(135, 135, 135);">您共有 <span class="c4a5 fz14">{{Jingbean}}</span> 桐板儿</label>
            </p>
            <p class="fz14 fzGB1-0 ">
              <label for style="color:rgb(135, 135, 135);" class="gangbengBox">
                     本次使用&nbsp;
                     <div class="inputMaxBox" v-if="!disabled">    
                      <input v-model="ChangeJingbean" 
                      @blur="OnchangeBlur"
                      class="JingbeanIpt"
                      placeholder="0"
                      type="number"
                      :disabled="disabled"
                      /> 
                     </div>
                     <span v-if="disabled" class="inputMaxBox" style="line-height: 2.1rem;font-family: inherit;">{{ChangeJingbean}}</span>
                     <span class="fzGB1-0" style="color:rgb(135, 135, 135);" >个桐板儿</span>
                   </label>
            </p>
            <p class="fz14 fzGB1-0 " style="color:rgb(135, 135, 135);;marginTop:1rem;">相当于抵扣 <span class="c4a5 fz14">{{RMB}}</span> 元</p>
          </div>
          <!-- 单阶 -->
          <div v-if="istype==1">
            <p class="fz15 fzGB1-0" v-if="ChangeJingbean>0||cousedetail.rebateAmount>2">
              <label for>原学费：</label>
              <span class="fr fz15">{{cousedetail.courseFullPrice}}元</span>
            </p>
            <p class="fz15 fzGB1-0" style="lineHeight:3rem" v-if="cousedetail.rebateAmount>2">
              <label for>折扣优惠：</label>
              <span class="fr fz15">- {{cousedetail.rebateAmount}}元</span>
            </p>
          </div>
          <!-- 全阶 -->
          <div class="" v-if="istype==2">
            <p class="fz15 fzGB1-0" style="lineHeight:3rem">
              <label for>原学费：</label>
              <span class="fr fz15">{{cousedetail.courseFullPrice}}元</span>
            </p>
            <p class="fz15 fzGB1-0" v-if="cousedetail.courseDiscountPrice!==0" style="lineHeight:3rem">
              <label for>优惠：</label>
              <span class="fr fz15">- {{cousedetail.courseDiscountPrice}}元</span>
            </p>
            <p class="fz15 fzGB1-0" v-if="cousedetail.rebateAmount>2" style="lineHeight:3rem">
              <label for>折扣优惠：</label>
              <span class="fr fz15">- {{cousedetail.rebateAmount}}元</span>
            </p>
            <p class="fz15 fzGB1-0" v-if="cousedetail.singlePrice!==0" style="lineHeight:3rem">
              <label for>已支付学费扣减：</label>
              <span class="fr fz15">- {{cousedetail.singlePrice}}元</span>
            </p>
          </div>
          <div>
            <p class="fz15" style="lineHeight:3rem;marginBottom:4.5rem;">
              <label for="">老学员减（桐板儿抵扣）：</label>
              <span class="fr"><span v-if="RMB>0">-</span>{{RMB}}元</span>
            </p>
          </div>
        </div>
      </article>
    </div>
    <div class="Define_footFixed">
      <span class="pl-28 fz15 c4a5 fzGB1-0"><span class="fz17">{{PayPrice>0?PayPrice:0}}元</span>
      <span class="fz14" style="color:rgb(135, 135, 135)">（使用桐板儿{{ChangeJingbean<=0?0:ChangeJingbean}}个）</span></span>
      <mt-button class="fz15 cf fr signUp fzGB1-0"  v-if="buttonFlag" @click="LoveXZ">提交订单</mt-button>
      <mt-button class="fz15 cf fr signUp fzGB1-0" style="background:#ccc"  v-if="!buttonFlag">提交订单</mt-button>
    </div>
    <div id="box"></div>
    <div class="pay_alipay_box" ref="pay_alipay_box" @click="payAlipayNone" @touchmove.prevent>
      <div class="pay_alipay" @click.stop="stopBox">
        <div class="pay_alipay_title">请选择支付方式</div>
        <ul class="pay_alipay_items">
          <li @click.stop="payAlipay('0')">
            <div class="pay_alipay_items_left"><img src="../../../static/img/Pay_treasure1.png" alt="">
              <p>支付宝</p>
            </div>
            <div class="xuanze"><img v-if="treasureFlag" src="../../../static/icon/5.png" alt=""></div>
          </li>
          <li @click.stop="payAlipay('1')">
            <div class="pay_alipay_items_left"><img src="../../../static/img/Pay_WeChat2.png" alt="">
              <p>微信</p>
            </div>
            <div class="xuanze"><img v-if="weChatFlag" src="../../../static/icon/5.png" alt=""></div>
          </li>
        </ul>
        <div class="pay_alipay_bottom" v-if="buttonFlag" @click="isWxurl">立即支付</div>
        <div class="pay_alipay_bottom" v-if="!buttonFlag">立即支付</div>
      </div>
    </div>
    <!-- 京豆如何使用 -->
    <div v-if="popupVisible1" class="app-pay-yiwen" @click="yiwenNone" @touchmove.prevent>
      <div class="pay_alipay" @click.stop="stopBox" @touchmove.prevent>
        <p class="c3 fz16 mb-10 mt-20 pay_alipay-tit " style="text-align:center;">桐板儿使用说明</p>
        <p class="mb-10 fz14"><span class="pay_alipay-span">1. 桐板儿是什么：</span>它是暄桐教室同学在成功购买课程时给予的返利优惠，仅可在暄桐教室网站使用。桐板儿不得予以兑现，不可转让。</p>
        <p class="mb-10 fz14"><span class="pay_alipay-span">2. 获得桐板儿：</span>在暄桐教室网站购买课程订单且交易成功后，即可获得为实付金额<span>100:1</span>数量的桐板儿<span style="color:#097276;;font-weight:600">（100元=1个桐板儿）</span>，如遇小数点，向前一位取整。如您申请退课，在点击【申请退课】按钮时，将会扣除该课程订单所获得的桐板儿，点击【取消申请退课】按钮，桐板儿将再次返回您的账户。</p>
        <p class="mb-10 fz14"><span class="pay_alipay-span">3. 使用桐板儿：</span>桐板儿可用于在暄桐教室网站支付课程订单<span style="color:#097276;;font-weight:600">（1个桐板儿=8元）</span>时的学费抵扣。使用桐板儿抵扣的课程订单在申请退课时，退款成功后，桐板儿将返回您的账户。</p>
        <p class="mb-10 fz14"><span class="pay_alipay-span"></span>如您有任何疑问，可以向暄桐客服咨询哦。</p>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    nowTime,
    getUserInfoCookie
  } from '@/public/index'
  import {
    appid,
    redirect_uri
  } from '@/public/url.js'
  export default {
    data() {
      return {
        popupVisible1: false,
        userInfo: null, //个人信息
        myorderID: null,
        cousedetail: [],
        istype: null, //单阶还是全阶
        fullid: null, //课程id
        isTurnFull: null, //是否转报全阶
        singleIds: null, //已购买单阶ID数组
        isgif: null, //赠课还是自己买
        phoneNum: null, //赠课人手机号
        gifname: "", //赠课人昵称
        orderSNID: null,
        PayPrice: null,
        isFormFlag: false, //提示手机号错误
        isGifFormFlag: false, //不能跟自己手机号一样
        disabled: false,
        weChatFlag: false,
        treasureFlag: true,
        payAlipays: 4, //支付类型
        Jingbean: 0, //京豆
        conversion: null, //换算比例
        ChangeJingbean: 0, //输入京豆
        RMB: 0, //抵用了多少元
        simulation: 0, //模拟价格
        inntIpenIdFlag: '',
        FangdouJIeLiu: false, //防抖节流
        buttonFlag:false,//数据加载完成才能支付
      };
    },
    mounted() {
      this.inntIpenId()
      this.getinfo()
      if (this.$route.query.typenumber) {
        this.phoneNum = this.$route.query.typenumber;
      }
      this.gifname = this.$route.query.nickName;
      this.istype = this.$route.query.istype;
      this.fullid = this.$route.query.fullid;
      if (this.$route.query.orderId) {
        this.disabled = true;
        this.myorderID = this.$route.query.orderId
      } else {
        this.phoneNum = null
        this.gifname = ''
      }
      // this.isTurnFull = this.$route.query.isTurnFull;
      //console.log(
      //   this.$route.query.isTurnFull,
      //   "Boolean(this.$route.query.isTurnFull)"
      // );
      if (
        this.$route.query.isTurnFull == true ||
        this.$route.query.isTurnFull == "true"
      ) {
        this.isTurnFull = true;
      } else {
        this.isTurnFull = false;
      }
      this.orderType = this.$route.query.orderType;
      // this.orderSNID = this.$route.query.orderSNID; 
      if (this.orderType == 1) {
        this.isgif = false;
      } else {
        this.isgif = true;
      }
      this.pointExchangeRatio()
      //jingdou
      if (this.$route.query.state == 'Pay') {
        this.phoneNum = this.$route.query.typenumber;
        this.wechat()
      }
    },
    methods: {
      //判断是否有openid
      inntIpenId() {
        this.$axios.post('/user/getUserWechatOpenId', {
          token: ''
        }).then(res => {
          if (res.data.result) {
            this.inntIpenIdFlag = true
          } else {
            this.inntIpenIdFlag = false
          }
        })
      },
      yiwenNone() {
        this.popupVisible1 = !this.popupVisible1
      },
      getinfo() {
        this.$axios
          .post("/user/getuserinfo", { //修改getuserinfo
            token: ""
          })
          .then(res => {
            getUserInfoCookie(res.data.result)
            this.userInfo = res.data.result;
          })
      },
      wechat() {
        let code = this.$route.query.code
        let state = this.$route.query.state
        this.$axios.post("/wechat/wapcallback", {
          code: code,
          state: state,
          type: 2
        }).then(res => {
          if (res.data.code !== 0) {
            this.$Toast(res.data.msg)
          } else {
            window.localStorage.setItem('UserCode', code)
            if (res.data.result.type) {
              this.inntIpenIdFlag = true
              this.LoveXZ()
            } else {
              if (res.data.result.token) {
                this.$Toast('当前账号已被绑定')
              } else {
                let obj = res.data.result
                this.bangWX(obj)
              }
            }
          }
        })
      },
      bangWX(obj) {
        let phone, bindingType;
        if (this.userInfo.phoneNum) {
          phone = this.userInfo.phoneNum
          bindingType = 1
        } else {
          phone = this.userInfo.email
          bindingType = 2
        }
        this.$axios.post('/wechat/wapBindingWechat', {
          bindingType: bindingType,
          bindingInfo: phone,
          openid: obj.unionid,
          wechatOpenId: obj.openid
        }).then(res => {
          if (res.data.code !== 0) {
            this.$Toast(res.data.msg)
          } else {
            this.getinfo()
            this.$Toast('绑定成功')
            this.inntIpenIdFlag = true
          }
        })
      },
      isWxurl() {
          setTimeout(()=>{
            if (this.$flag) {
              //console.log(this.inntIpenIdFlag,'this.inntIpenIdFlagthis.inntIpenIdFlagthis.inntIpenIdFlag')
              if (!this.inntIpenIdFlag) {
                let obj = {
                  istype: this.istype,
                  fullid: this.fullid,
                  isTurnFull: this.isTurnFull,
                  orderType: this.orderType,
                  //订单过来
                  orderId: this.myorderID,
                  phoneNum: this.phoneNum,
                  gifname: this.gifname
                }
                window.localStorage.setItem('OrderObj', JSON.stringify(obj))
                //拉起微信  生产 
                window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=Pay#wechat_redirect
                      `)
                //uat
                // window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6a0d56eb1c12553b&redirect_uri=https://cr-uat.xuantong.cn/wx/index.html&response_type=code&scope=snsapi_userinfo&state=Pay#wechat_redirect
                // `)
              } else {
                this.IsGetlive()
              }
              //console.log(this.userInfo, "this.userInfo");
            } else {
              this.IsGetlive()
            }
        })
      },
      //换算京豆
      OnchangeBlur(type) {
        if (this.cousedetail.payPrice <= 0) {
          this.ChangeJingbean = 0
          return
        }
        //如果输入负数
        if (this.ChangeJingbean <= 0) {
          this.ChangeJingbean = 0
        }
        if (this.ChangeJingbean > this.Jingbean) {
          //自己的京豆超出输入京豆
          this.RMB = Math.floor(this.Jingbean / this.conversion)
          // this.ChangeJingbean = Math.floor(this.Jingbean/this.conversion)*10
          if (this.ChangeJingbean == 0) {
            this.ChangeJingbean = 0
          }
          //console.log(this.ChangeJingbean,this.Jingbean,this.RMB,'自己的京豆超出输入京豆')
        } else {
          //未超出
          this.ChangeJingbean = Math.floor(this.ChangeJingbean)
          this.RMB = Math.floor(this.ChangeJingbean / this.conversion)
          if (this.ChangeJingbean == 0) {
            this.ChangeJingbean = ''
          }
        }
        //超出课程金额   -1  最少是1元
        if (this.ChangeJingbean > this.simulation * this.conversion) {
          this.ChangeJingbean = Math.floor(this.simulation * this.conversion)
          this.RMB = this.ChangeJingbean / this.conversion
          //console.log(this.simulation*this.conversion,'金额超出')
        }
        //等于付款金额
        if (this.RMB >= this.simulation) {
          this.ChangeJingbean = this.ChangeJingbean - 1
          this.RMB = this.ChangeJingbean / this.conversion
        }
        if (this.ChangeJingbean > this.Jingbean) {
          this.ChangeJingbean = this.Jingbean
          this.RMB = this.ChangeJingbean / this.conversion
        }
        //  //console.log(Number(this.ChangeJingbean),this.PayPrice*this.conversion,'换算匹配')
        this.PayPrice = this.simulation - this.RMB
      },
      pointExchangeRatio() {
        this.$axios
          .post("utility/getPointExchangeRatio", {
            token: '',
            id: 32
          }).then(res => {
            let jdA = res.data.result.pointExchangeRatio.split('/')[0]
            let JGB = res.data.result.pointExchangeRatio.split('/')[1]
            this.conversion = jdA / JGB
            this.jingdou()
          })
      },
      //获取京豆
      async jingdou() {
        //获取京豆数量
        this.$axios
          .post("user/getUserScore", {
            token: ''
          }).then(res => {
            this.Jingbean = res.data.result.score
            this.ChangeJingbean = this.Jingbean
            if (this.istype == 2) {
              //全阶
              this.getfororder();
            } else {
              //单阶
              this.getdanorder();
            }
            //  res.data.result.score
            //console.log(res.data.result.score,'京豆')
          })
        //获取换算比例
      },
      gouto() {
        this.$router.go(-1);
      },
      //爱心付款方式
      LoveXZ() {
        this.$nextTick(()=>{
            if (this.userInfo.phoneNum) {
              if (this.phoneNum == this.userInfo.phoneNum) {
                this.isGifFormFlag = true
                this.isFormFlag = false
                return
              } else {
                this.isGifFormFlag = false
              }
            }
            if (this.isgif) {
              const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
              if (!reg.test(this.phoneNum)) {
                this.isFormFlag = true
                return //console.log(!reg.test(this.phoneNum))
              }
            }
            if (this.$flag) {
              this.payAlipays = 3
              this.isWxurl()
            } else {
              this.$refs.pay_alipay_box.style.display = "block"
              this.$refs.appBox.style.overflow = "hidden"
            }
        })
      },
      //遮罩没有点击事件
      stopBox() {},
      //遮罩隐藏
      payAlipayNone() {
        this.$refs.pay_alipay_box.style.display = "none"
        this.$refs.appBox.style.overflow = "auto"
      },
      //遮罩展开
      payAlipay(index) {
        if (index == "1") {
          if (this.$flag) {
            this.payAlipays = 3
          } else {
            this.payAlipays = 5
          }
          this.weChatFlag = true
          this.treasureFlag = false
        } else if (index == "0") {
          this.payAlipays = 4
          this.treasureFlag = true
          this.weChatFlag = false
        }
      },
      //全阶展示详情
      getfororder() {
        this.$axios
          .post("/course/fulldetailfororder", {
            courseFullId: this.fullid,
            token: "",
            isTurnFull: this.isTurnFull,
            isGift: this.isgif,
            phoneNum: this.phoneNum,
            orderId: this.myorderID
          })
          .then(res => {
            if (res.data.result.singlePrice && res.data.result.singlePrice > 0) {
              this.isTurnFull = true;
            }
            if (
              res.data.result.singleIds &&
              res.data.result.singleIds instanceof Array &&
              res.data.result.singleIds.length > 0
            ) {
              this.singleIds = res.data.result.singleIds.join(","); //已购买的单阶id
              //console.log(this.singleIds, "??????????????/");
            }
            this.cousedetail = res.data.result;
            //console.log(this.$route.query.Pyaprice,'this.$route.query.Pyapricethis.$route.query.Pyaprice')
            if (this.$route.query.Pyaprice || this.$route.query.Pyaprice == 1) {
              if (this.$route.query.score == '0' || this.$route.query.score == 0) {
                //  this.PayPrice = this.$route.query.Pyaprice
                this.PayPrice = this.cousedetail.payPrice
                //  this.RMB = this.cousedetail.payPrice - this.$route.query.Pyaprice
                this.ChangeJingbean = this.RMB * this.conversion
              } else {
                this.PayPrice = this.cousedetail.payPrice
                //console.log(this.$route.query.score)
                this.ChangeJingbean = this.$route.query.score
                this.RMB = Number(this.$route.query.score) / this.conversion
                //  this.PayPrice = this.cousedetail.payPrice
                //  this.PayPrice = this.$route.query.Pyaprice
                //  this.ChangeJingbean  = this.$route.query.score
                //  this.RMB = this.cousedetail.payPrice - this.ChangeJingbean /  this.conversion
              }
              this.simulation = this.cousedetail.payPrice;
            } else {
              this.PayPrice = this.cousedetail.payPrice;
              this.simulation = this.cousedetail.payPrice;
              if (this.cousedetail.payPrice > 0) {
                this.OnchangeBlur()
              } else {
                this.ChangeJingbean = 0
                this.RMB = 0
              }
            }
            setTimeout(()=>{
              this.buttonFlag = true
            },1000)
            //console.log(res.data.result, "我的全");
          });
      },
      //单阶展示详情
      getdanorder() {
        this.$axios
          .post("/course/singledetailfororder", {
            courseId: this.fullid,
            token: "",
            orderId: this.myorderID
          })
          .then(res => {
            this.cousedetail = res.data.result;
            if (this.$route.query.Pyaprice || this.$route.query.Pyaprice == 1) {
              //console.log(this.$route.query.score!=='0',this.$route.query.score!==0,'this.$route.query.score||this.$route.query.score!==0')
              if (this.$route.query.score == '0' || this.$route.query.score == 0) {
                //  this.PayPrice = this.$route.query.Pyaprice
                this.PayPrice = this.cousedetail.payPrice
                //  //console.log(this.RMB * this.conversion,'this.RMB * this.conversion')
                this.ChangeJingbean = this.RMB * this.conversion
              } else {
                //  this.PayPrice = this.$route.query.Pyaprice
                this.PayPrice = this.cousedetail.payPrice
                //console.log(this.$route.query.score)
                this.ChangeJingbean = this.$route.query.score
                this.RMB = Number(this.$route.query.score) / this.conversion
                //  this.RMB = this.cousedetail.courseFullPrice - this.$route.query.Pyaprice
                //  this.ChangeJingbean  = this.RMB * this.conversion
              }
              this.simulation = this.cousedetail.payPrice;
            } else {
              this.PayPrice = this.cousedetail.payPrice;
              this.simulation = this.cousedetail.payPrice;
              if (this.cousedetail.payPrice > 0) {
                this.OnchangeBlur()
              } else {
                this.ChangeJingbean = 0
                this.RMB = 0
              }
            }
            setTimeout(()=>{
              this.buttonFlag = true
            },1000)
            //console.log(res, "我的单");
          });
      },
      //全阶下单
      getlivefull() {
        //console.log(this.ChangeJingbean,'this.ChangeJingbean1000')
        this.$axios
          .post("/course/buyfull", {
            score: this.ChangeJingbean, //积分
            scorePrice: this.RMB, //积分换算金额
            proportion: this.conversion, //积分换算比例
            orderId: this.orderSNID,
            sourceId: 1,
            courseId: this.fullid,
            token: "",
            orderType: this.orderType,
            courseFullPrice: this.cousedetail.courseFullPrice,
            payPrice: this.PayPrice,
            discountPrice: this.cousedetail.courseDiscountPrice + this.cousedetail.singlePrice,
            phoneNum: this.phoneNum,
            isTurnFull: this.isTurnFull,
            singleIds: this.singleIds
          })
          .then(res => {
            if (res.data.code !== 0) {
              this.$Toast(res.data.msg);
              return;
            }
            // //console.log(res)
            this.orderPay(res.data.result.orderId);
            //  this.pay(res.data.result.orderId);
          });
      },
      //单阶下单
      getlivesing() {
        //console.log(this.ChangeJingbean,'this.ChangeJingbean1000')
        // return
        this.$axios
          .post("/course/buysingle", {
            score: this.ChangeJingbean, //积分
            scorePrice: this.RMB, //积分换算金额
            proportion: this.conversion, //积分换算比例
            orderId: this.orderSNID,
            sourceId: 1,
            courseId: this.fullid,
            token: "",
            orderType: this.orderType,
            phoneNum: this.phoneNum
          })
          .then(res => {
            return
            if (res.data.code !== 0) {
              this.$Toast(res.data.msg);
              return;
            }
            this.orderPay(res.data.result.orderId);
            // this.pay(res.data.result.orderId);
          });
      },
      //调起支付弃用
      orderPay(orderid) {
        //console.log(orderid,'orderidorderid')
        //console.log(this.cousedetail.courseName);
        // this.cousedetail.courseName
        let configIP = window.localStorage.getItem("configIP");
        let chanJieId = window.localStorage.getItem("chanJieIdOder");
        let courseType = window.localStorage.getItem("courseTypeOder");
        this.$axios
          .post("/order/pay", {
            paymentType: this.payAlipays, //支付类型
            giftPhoneNum: this.phoneNum, //赠课人手机号
            sourceId: 2,
            orderItemName: this.cousedetail.courseName,
            orderId: orderid,
            token: "",
            ip: configIP,
            courseType: courseType,
            courseId: chanJieId,
          })
          .then(res => {
            // alert(res.data.code,"-------------123---------")
            if (res.data.code !== 0) {
              this.$Toast(res.data.msg)
              return
            }
            // return
            if (this.payAlipays == 4) {
              //console.log("-----------",res.data.result,"-----------");
              let div = document.querySelector("#box");
              div.innerHTML = res.data.result.split("<script>")[0];
              document.forms[0].submit();
            } else {
              this.WXpay(res.data.result)
            }
            //console.log(res.data.result.payresult,'???')
            // window.location.href = res.data.result.payresult
            // location.href(res.data.result.payresult)
            return
          });
      },
      //判断是否重复下单
      IsGetlive() {
        //console.log(this.ChangeJingbean,'this.ChangeJingbean')
        // return
        if (this.FangdouJIeLiu) {
          return
        }
        this.FangdouJIeLiu = true
        let configIP = window.localStorage.getItem("configIP");
        this.$axios
          .post("/order/orderPay", {
            token: '',
            courseType: this.istype,
            courseId: this.fullid,
            giftPhoneNum: this.phoneNum,
            paymentType: this.payAlipays, //支付类型 1 微信  2 支付宝  3 h5微信内支付  4. h5支付宝支付  5 h5微信外支付
            sourceId: 2,
            ip: configIP,
            score: this.ChangeJingbean, //积分
            scorePrice: this.RMB, //积分换算金额
            proportion: this.conversion, //积分换算比例
          }).then(res => {
            this.FangdouJIeLiu = false
            if (res.data.code !== 0) {
              this.$Toast(res.data.msg)
              return
            }
            if (this.payAlipays == 4) {
              //console.log(res.data.result.payresult,"支付宝支付");
              let div = document.querySelector("#box");
              div.innerHTML = res.data.result.payresult.split("<script>")[0];
              document.forms[0].submit();
            } else {
              this.WXpay(res.data.result)
            }
          })
        //  setTimeout(() => {
        //            this.FangdouJIeLiu = false                    
        //  },1000)
        return
        this.$axios
          .post("/course/courseisorder", {
            token: "",
            courseId: this.fullid,
            courseType: this.istype,
            phoneNum: this.phoneNum,
            isGift: this.isgif
          })
          .then(res => {
            //console.log(res.data.code,'res.data.coderes.data.code')
            if (res.data.code !== 0) {
              this.$Toast(res.data.msg);
              return;
            }
            if (res.data.result.orderId == null) {
              if (this.istype == 2) {
                this.getlivefull();
              } else {
                this.getlivesing();
              }
            } else {
              this.orderPay(res.data.result.orderId);
            }
            //console.log(res.data, "pppp");
          });
      },
      //赠课框脱离焦点验证
      async isFormPhone() {
        if (this.userInfo.phoneNum) {
          if (this.phoneNum == this.userInfo.phoneNum) {
            this.isGifFormFlag = true
            this.isFormFlag = false
            return
          } else {
            this.isGifFormFlag = false
          }
        }
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (this.phoneNum == '' || this.phoneNum == undefined) {
          this.isFormFlag = false
          return
        }
        if (reg.test(this.phoneNum)) {
          this.$axios.post("/user/checkNicknameByPhone", {
            phone: this.phoneNum
          }).then(res => {
            this.gifname = res.data.result.nickName
          })
          this.isFormFlag = false
          if (this.istype == 2) {
            this.getfororder()
          } else {
            this.getdanorder();
          }
        } else {
          this.isFormFlag = true
          // alert()
        }
      },
      //微信支付吊起
      WXpay(data) {
        if (this.$flag) {
          // return
          this.PAYok(data.jsapiResultMap)
        } else {
          window.location.href = data.payresult
        }
      },
      PAYok(obj) {
        //console.log(obj,'后台传的')
        let that = this
        function onBridgeReady() {
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              "appId": obj.appId, //公众号名称，由商户传入     
              "timeStamp": obj.timeStamp, //时间戳，自1970年以来的秒数     
              "nonceStr": obj.nonceStr, //随机串     
              "package": obj.package,
              "signType": obj.signType, //微信签名方式：     
              "paySign": obj.paySign //微信签名 
            },
            function(res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                that.$axios.post('/order/userlastorder', {
                  token: ''
                }).then(res => {
                  if (res.data.code !== 0) {
                    that.$Toast(res.data.msg);
                    return;
                  }
                  let Pic = res.data.result.payAmount
                  let orderSn = res.data.result.orderSn
                  that.$router.push({
                    path: '/orderPaySuccess',
                    query: {
                      totalAmount: Pic,
                      orderSn: orderSn
                    }
                  })
                  //console.log(res.data.result)
                })
                //console.log('成功')
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                that.$Toast('支付取消')
              } else {
                that.$Toast('支付失败')
              }
            });
        }
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        } else {
          onBridgeReady();
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .gangbengBox {
    display: flex;
    align-items: center;
  }
  .inputMaxBox {
    width: 26%;
    height: 1.7rem;
    padding-left: 0.3rem;
    border: 1px solid #eee;
    display: inline-block;
    overflow: hidden;
    border-radius: 0.25rem;
    margin: 0 .5rem;
    padding-bottom: 0.3rem;
  }
  .JingbeanIpt {
    color: rgb(135, 135, 135);
    width: 100%;
    height: 100%;
    outline: none;
    border: none; // color: #eee;
  }
  // #app{
  //   overflow: hidden;
  // }
  .pay_alipay_box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30; // background: #000000;
    // opacity: 0.5;
    // background: rgba(0,0,0,0.6);  
    background: rgba($color: #000000, $alpha: .5);
    overflow: auto;
    display: none;
    .pay_alipay {
      width: 100%;
      height: 17rem;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #ffffff;
      .pay_alipay_title {
        width: 100%;
        height: 4.5625rem;
        text-align: center;
        line-height: 4.5625rem;
        font-size: .9375rem;
        color: #010101;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 21.5625rem;
          height: .07rem;
          background: #EEE;
          margin-left: -10.78125rem;
        }
      }
      .pay_alipay_items {
        padding-left: 1.1rem;
        padding-right: 1.1rem; // width: 100%;
        li {
          border-bottom: 1px #eee solid;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 3.71875rem;
          position: relative;
          &::after {
            display: none;
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 21.5625rem;
            height: .07rem;
            background: #EEE;
            margin-left: -10.78125rem;
          }
          .pay_alipay_items_left {
            display: flex;
            align-items: center;
          }
          .pay_alipay_items_left>img {
            width: 1.875rem;
            height: 1.875rem;
            margin-left: 1.75875rem;
          }
          .pay_alipay_items_left p {
            padding-left: .90625rem;
            font-size: .9375rem;
          }
          .xuanze {
            width: 1.25rem;
            height: 1.25rem;
            margin-right: 1.75875rem;
            &>img {
              width: 1.25rem;
              height: 1.25rem;
            }
          }
        }
      }
      .pay_alipay_bottom {
        width: 100%;
        height: 3.0625rem;
        background: #C4A57F;
        text-align: center;
        line-height: 3.0625rem;
        position: absolute;
        bottom: 0;
        left: 0;
        color: #fff;
        font-size: .9375rem;
      }
    }
  }
  .app-c30 {
    color: #ccc !important;
  }
  .pos_r_imgwh {
    width: 20rem !important;
    height: 11.25rem !important;
  }
  .pos_r {
    margin-top: 1rem;
  }
  .app-z-content {
    &>img {
      border-radius: 0.2rem;
    }
    .app-z-content-info {
      .ChanjieTitle {
        height: 1.25rem;
        line-height: 1.25rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-bottom: 0.875rem !important;
        .recorded {
          display: block;
          width: 2.27rem;
          height: 1.2rem;
          font-weight: 300;
          padding: 0 0.1875rem !important;
          margin-right: 0.3125rem;
          text-align: center;
          line-height: 1.2rem;
          font-size: 0.7rem;
          float: left;
          border-radius: 3px;
        }
        strong {
          vertical-align: middle;
          font-family: "FZXIYSJ";
          font-weight: 500;
        }
      }
      .app-z-tit {
        margin-bottom: 1rem;
        color: #333;
      }
    }
  }
  .app-Giftke {
    margin-top: 0.8rem;
    h3 {
      margin-bottom: 1rem;
    }
    p:nth-of-type(1) {
      // width: 90%;
      width: 18.75rem;
      height: 2.0625rem;
      input {
        line-height: 2.525rem;
        width: 100%;
        height: 100%;
        outline: none;
        border: 1px solid rgba(196, 165, 127, 1);
        opacity: 0.3;
        border-radius: 0.25rem;
        padding-left: 1rem;
      }
    }
    .app-Giftke-ic {
      line-height: 2rem;
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: red;
    }
    .app-Giftke-in {
      line-height: 2rem;
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: #c4a57f;
    }
  }
  #app {
    display: flex;
    flex-direction: column;
    -webkit-overflow-scrolling: touch;
    .nav-title {
      height: 2.5rem;
    }
    .mobile_content {
      flex: 1;
      -webkit-overflow-scrolling: touch; // overflow: auto;
      // padding-top: 1rem;
    }
  }
  .Haveclass_menu-Hot div.clear div:nth-child(2) {
    float: right;
    margin-left: 0.8rem;
    width: 9.5628rem;
    height: 5.125rem;
    display: flex;
    flex-direction: column;
  }
  .signUp {
    width: 8.125rem;
  }
  .Haveclass_menu-Hot div.clear div .clearpaddingLeft-text {
    height: auto;
    line-height: 1.1rem;
    margin-top: 0.425rem !important;
    margin-bottom: 0.93rem !important;
    font-size: .9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden; // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
  }
  .Haveclass_menu-Hot div.clear div p:nth-of-type(1) {
    overflow: hidden; // display: -webkit-box;
    -webkit-line-clamp: 8;
    text-overflow: ellipsis;
    /*! autoprefixer: ignore next */
    -webkit-box-orient: vertical;
  }
  /*赠课给好友*/
  .lecturing {
    width: -webkit-fill-available;
    /* width: 50%; */
    background: #fff;
    border-radius: 0px;
    color: #c4a57f !important;
  }
  /* 单阶-报名 */
  .signUp {
    /* width: 50%; */
    // width: -webkit-fill-available;
    background: #097276;
    border-radius: 0px;
    /* color: #C4A57F !important; */
    height: 3.0625rem;
  }
  .signUp time {
    margin-top: 0.25rem;
  }
  .gu_content {
    position: relative;
    padding-top: 2rem;
    .gu_nav_title_img {
      top: 0.5rem;
      left: 0.5rem;
    }
  }
  .app-pay-yiwen {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30; // background: #000000;
    // opacity: 0.5;
    // background: rgba(0,0,0,0.6);  
    background: rgba($color: #000000, $alpha: .5);
    overflow: auto; // display: none;
    .pay_alipay-tit {
      font-size: 1.125rem !important;
      ;
      font-family: 'FZLTHJ' !important;
      font-weight: 400 !important;
      ;
      margin-top: 2.1875rem;
      margin-bottom: 1.5625rem;
    }
    .pay_alipay-span {
      color: #000000 !important;
      ;
      font-family: 'FZLTHJ' !important;
      font-size: .9rem !important;
    }
    .pay_alipay {
      // width: 100%;
      height: 30rem;
      position: absolute;
      padding-right: 2rem;
      padding-left: 2rem;
      padding-bottom: 1rem !important; // padding: 0rem 1rem 0rem 1rem;
      bottom: 0;
      left: 0;
      background: #ffffff;
      p {
        line-height: 1.5rem;
        color: #606266; // font-size: 14px;
        // line-height: 1.4rem;
        font-family: FZLTHJW--GB1-0;
        word-spacing: 1px;
      }
    }
  }
</style>