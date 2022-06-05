<template>
  <div id="allCourseDetail">
    <article class="nav-title" v-if="!backFlag  && !this.$flag">
      <mt-header title="全阶课程" fixed>
        <a href="javascript:void(0);" slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    </article>
    <div class="Chanjie" ref="quanJieBox" style="position:relative;">
      <img src="../../../static/img/back.png" class="gu_nav_title_img" style="z-index:9999" v-if="this.$flag && !backFlag " @click="goBack">
      <div :class="this.$flag?'Chanjie-title':'Chanjie-title-leijc'">
        <img v-if="CourseDetailList.coursePictureUri" style="width:23.43rem;height:13.25rem" v-lazy="CourseDetailList.coursePictureUri" alt>
      </div>
      <article class="pl-30 pr-30 Chanjie-content mt-15">
        <div class="dis_flow_root">
          <!--mobile_content 固定底部的话+add -->
          <div class="Chanjie-body">
            <p class="ChanjieTitle">
              <span class="fz12 cf recorded" v-if='CourseDetailList.courseTypeId=="1"' style="background:#C4A57F">直播课</span>
              <span class="fz12 cf recorded" v-else style="background:#EA9C91">录播课</span>
              <span class="fz18 c30">{{CourseDetailList.courseName}}</span>
            </p>
            <p class="fz15 c30" style="line-height: 1.5rem;">{{CourseDetailList.courseTitle}}</p>
            <p class="c9 mt-5" v-if="!CourseDetailList.purchased">
              原学费：
              <s>{{CourseDetailList.courseFullPrice}}</s>元
            </p>
            <p class="mt-5">
              <span class="c097 fz18" v-if="!CourseDetailList.purchased">{{CourseDetailList.courseDiscountPrice}}元</span>
              <span class="fz15">共{{CourseDetailList.classHourCount}}课</span>
              <span class="fz15 c4a5" v-if='CourseDetailList.statusName=="已报名"'>{{CourseDetailList.statusName}}</span>
              <span class="fz15" style="color:#999" v-else>{{CourseDetailList.statusName}}</span>
              <span class="mr-10" v-if="CourseDetailList.purchased&&CourseDetailList.canGift" @click="buyHtml('B')">
                  <img src="../../../static/img/gifboxpng.png" style="width:2rem;height:2rem"/>
                </span>
              <!-- <label for="" class="fz12 c9 fr">
                                  <i class="iconfont icon-shoucang"></i>
                                  <span class="">收藏</span>
                </label>-->
            </p>
            <!-- <div class="app-lv-627div">
              </div> -->
          </div>
          <div class="gu_apply"></div>
          <article class="ChanjieTable mb-30">
            <div ref="tab" class="gu_chanjieBox" style="padding-top: 0.3rem;">
              <mt-navbar v-model="QuanjieTable" class="ChanjieTab">
                <mt-button icon="back" @click="goBack" v-if="!this.$flag && backFlag" style="color:#000" class="button"></mt-button>
                <img src="../../../static/img/back.png" class="gu_nav_title_img" v-if="this.$flag && backFlag" @click="goBack">
                <mt-tab-item id="1">课程介绍</mt-tab-item>
                <mt-tab-item id="2">课程组成</mt-tab-item>
              </mt-navbar>
            </div>
            <div ref="tabFexld"></div>
            <mt-tab-container v-model="QuanjieTable">
              <mt-tab-container-item id="1">
                <div class="mobile_content" @touchstart="leftRightStartOne" @touchmove="leftRightMoveOne">
                  <article class="dis_flow_root mt-30">
                    <div class="clear" style="margin-top:7px;" v-if="allCourseDetailUserCourseIntroduceImg.length>0">
                      <img v-for="(item,ind) in allCourseDetailUserCourseIntroduceImg" :key="ind" :src="item" alt>
                    </div>
                    <div class="gu_clear_guide" v-else>
                      <img src="../../../static/img/null-My_discussion.png" alt>
                      <p class="fz15 mt-15 c3c">暂时没有哦~</p>
                    </div>
                  </article>
                </div>
              </mt-tab-container-item>
              <mt-tab-container-item id="2">
                <div @touchstart="leftRightStartTwo" @touchmove="leftRightMoveTwo">
                  <p @click="beforeClass" class="gu_beforeClass_p" v-if="CourseDetailList.purchased">
                    <span class="myDoubtBox"><img class="myDoubtImg" src="../../../static/img/myDoubt.png" alt=""></span>开课前请了解
                  </p>
                  <AllChanJieList :data="CourseDetailList.courseSingleResponseVos" />
                </div>
              </mt-tab-container-item>
            </mt-tab-container>
          </article>
        </div>
      </article>
    </div>
    <div class="WritingEvaluation_footFixed text-center flex" v-if="CourseDetailList.canBuy">
      <mt-button class="cf lecturing" v-if="CourseDetailList.canGift" @click="buyHtml('B')">{{CourseDetailList.giftButtonText}}</mt-button>
      <mt-button class="cf signUp" v-if="CourseDetailList.canBuy&&!this.$route.query.istype" @click="buyHtml('A')">
        {{CourseDetailList.buyButtonText}}
        <time class="dis_block" v-if="this.downTimes">剩余{{downTimes}}</time>
      </mt-button>
      <mt-button v-if="this.$route.query.istype" class="cf signUp" @click="buyHtml('A')">
        转报全阶
      </mt-button>
    </div>
    <!-- <div class="WritingEvaluation_footFixed text-center flex"
              v-if="CourseDetailList.courseTypeId =='1' && 
                  CourseDetailList.canBuy && CourseDetailList.canGift">
              <mt-button class="cf lecturing">{{CourseDetailList.giftButtonText}}</mt-button>
              <mt-button class="cf signUp" @click='buyHtml'>
                  {{CourseDetailList.buyButtonText}}
                  <time class="dis_block" v-if='this.downTimes != null'>剩余{{downTimes}}</time>
              </mt-button>
      </div>-->
    <!-- <div class="WritingEvaluation_footFixed text-center flex"
              v-else-if="CourseDetailList.courseTypeId =='1' && 
                  !(CourseDetailList.canBuy) && CourseDetailList.canGift"
                  :style="{display:'none'}">
              <mt-button class="cf lecturing">{{CourseDetailList.giftButtonText}}</mt-button>
              <mt-button class="cf signUp">{{CourseDetailList.buyButtonText}}</mt-button>
          </div>
          <div class="WritingEvaluation_footFixed text-center flex"
              v-else-if=" CourseDetailList.courseTypeId =='1' && !(CourseDetailList.canBuy)
              && !(CourseDetailList.canGift)"  :style="{display:'none'}">
              <mt-button class="cf lecturing">
                  {{CourseDetailList.giftButtonText}}</mt-button>
                  <mt-button class="cf signUp">
                  {{CourseDetailList.buyButtonText}}
              </mt-button>
          </div>
          <div class="WritingEvaluation_footFixed text-center flex"
              v-else-if="CourseDetailList.courseTypeId =='2' && CourseDetailList.canGift && 
                  CourseDetailList.canBuy">
              <mt-button class="cf lecturing">{{CourseDetailList.giftButtonText}}</mt-button>
              <mt-button class="cf signUp" @click='buyHtml'>{{CourseDetailList.buyButtonText}}</mt-button>
          </div>
          <div class="WritingEvaluation_footFixed text-center flex"
              v-else-if="CourseDetailList.courseTypeId =='2' && !(CourseDetailList.canGift)
                  && !(CourseDetailList.canBuy)" :style="{display:'none'}">
                  
              <mt-button class="cf lecturing">{{CourseDetailList.giftButtonText}}</mt-button>
              <mt-button class="cf signUp">{{CourseDetailList.buyButtonText}}</mt-button>
          </div>
          <div class="WritingEvaluation_footFixed text-center flex"
              v-else-if="CourseDetailList.courseTypeId =='2' && CourseDetailList.canGift
                  && !(CourseDetailList.canBuy)"   :style="{display:'none'}">
              <mt-button class="cf lecturing">{{CourseDetailList.giftButtonText}}</mt-button>
              <mt-button class="cf signUp">{{CourseDetailList.buyButtonText}}</mt-button>
      </div>-->
    <mt-popup v-model="popupVisible" :modal="false" @touchmove.prevent popup-transition="popup-fade" position="bottom">
      <div class="gu_beforeClass">
        <h3>开课前请了解</h3>
        <div class="showPord">
          <img src="../../../static/icon/X-2.png" @click='removeBuy1' alt="">
        </div>
        <p v-html="CourseDetailList.understandBefore" class="gu_beforepclass" :style="{
                      'letterSpacing':'2px',
                      'lineHeight':'20px'
                  }">
          <!-- {{}} -->
          <!-- 这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到了“减法”那一步。虞世南的字非常含蓄，有难得的静气。我们在褚遂良处丰富了线条的变化，便回身临写虞世南。在临摹中体会他的虚静气质，能够收敛一些写完褚遂良以后易有的妍媚，学会如何把字写得安静平正。 这是我们
            写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到了“减法”那一步。虞世南的字非常含蓄，有难得的静气。我们在褚遂良处丰富了线条的变化，便回身临写虞世南。在临摹中体会他的虚静气质，能够收敛一些写完褚遂良以后易有的妍媚，学会如何把字写得安静平正。 这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到… 虞世南的字非常含蓄，有难得的静气。我们在褚遂良处丰富了线条的变化，便回身临写虞世南。在临摹中体会他的虚静气质，能够收敛一些写完褚遂良以后易有的妍媚，学会如何把字写得安静平正。 这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到了“减法”那一步。 -->
        </p>
      </div>
    </mt-popup>
    <mt-popup v-model="popupVisible1" :modal="false" popup-transition="popup-fade" position="bottom">
      <div class="gu_beforeClass">
        <h3 class="gu_beforeClassTitle" style="line-height: 0.9rem;">{{buyTypes=='true'?'赠课前请了解':'报名前请了解'}}</h3>
        <div class="showPord">
          <img src="../../../static/icon/X-2.png" @click='removeBuy' alt="">
        </div>
        <div class="gu_beforeBoxClassBox" ref="gu_beforeBoxClassBox">
          <div class="gu_beforeBoxClass">
            <div class="beforeBox" v-if="CourseDetailList.courseTypeName=='直播课'&&buyTypes=='true'">
              <p><span>课程回放：</span>如果<b>Ta</b>需要补课或复习，请于每节直播课程结束后观看回放，回放有效期为<b>{{obj.coursePlaybackDays}}</b>天，即当堂直播课程结束后有<b>{{obj.coursePlaybackDays}}</b>天补课或复习，课程视频<b>不提供下载。</b></p>
              <p><span>关于退课：</span>如需退课，请<b>Ta</b>于<b>第一节直播课开始</b>前，在“我的订单”中提出退课申请，申请审核通过后学费将原路返回<b>您</b>的账户。直播课程开始后，将不再接受退课申请。</p>
              <p><span>开具增值税普通发票（电子发票）：</span>如果需要发票，请在<b>您本人</b>的“我的订单”中提出发票申请，教室将于第一节直播课开始后开具电子发票。</p>
              <p class="chnageLastTimetishi"><b>Ta</b>可以在<b>{{moment(ChnageLastTime).format("YYYY年MM月DD日")}}</b>之前提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料。</p>
            </div>
            <div class="beforeBox" v-if="CourseDetailList.courseTypeName=='直播课'&&buyTypes=='false'">
              <p><span>课程回放：</span>如果您需要补课或复习，请于每节直播课程结束后观看回放，回放有效期为<b>{{obj.coursePlaybackDays}}</b>天，即当堂直播课程结束后有<b>{{obj.coursePlaybackDays}}</b>天补课或复习，课程视频<b>不提供下载。</b></p>
              <p><span>关于退课：</span>如需退课，请您于<b>第一节直播课开始</b>前，在“我的订单”中提出退课申请，申请审核通过后将全额退款。直播课程开始后，将不再接受退课申请。</p>
              <p><span>开具增值税普通发票（电子发票）：</span>如果您需要发票，请在“我的订单”中提出发票申请，教室将于第一节直播课开始后开具电子发票。</p>
              <p class="chnageLastTimetishi">您可以在<b>{{moment(ChnageLastTime).format("YYYY年MM月DD日")}}</b>之前下载学习资料、提交作业和将作业发布到“晒作业”与大家分享。</p>
            </div>
            <div class="beforeBox" v-if="CourseDetailList.courseTypeName=='录播课'&&buyTypes=='false'">
              <p v-if="!obj.studyValidiyEnable">您可以在<b>{{obj.studyValidityPeriod/365}}年内</b>无限次观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频<b>不提供下载</b>）。</p>
              <p v-if="obj.studyValidiyEnable">您可以<b>不限时无限次</b>观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频<b>不提供下载</b>）。</p>
              <p><span>关于退课：</span>录播形式的虚拟内容服务，报名后，不支持退课，这个很重要，请注意哦。</p>
              <p><span>开具增值税普通发票（电子发票）：</span>如果您需要发票，请在“我的订单”中提出发票申请，教室将为您开具电子发票。</p>
            </div>
            <div class="beforeBox" v-if="CourseDetailList.courseTypeName=='录播课'&&buyTypes=='true'">
              <p v-if="!obj.studyValidiyEnable"><b>Ta</b>可以在<b>{{obj.studyValidityPeriod/365}}年内</b>无限次观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频<b>不提供下载</b>。</p>
              <p v-if="obj.studyValidiyEnable">Ta可以<b>不限时无限次</b>无限次观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频<b>不提供下载</b>）。</p>
              <p><span>关于退课：</span>录播形式的虚拟内容服务，报名后，不支持退课，这个很重要，请注意哦。</p>
              <p><span>开具增值税普通发票（电子发票）：</span>如果您需要发票，请在“我的订单”中提出发票申请，教室将为您开具电子发票。</p>
            </div>
            <div class='classBox' style=" line-height: 1.5rem;" v-if="buyTypes=='true'">在Ta拆开课程礼物之后，教室也将告诉Ta前往课程页面查看以上信息哦～</div>
            <div class='classBox' v-if="buyTypes=='false'">祝您在暄桐教室学习愉快～</div>
              <div class="remmberBox" @click="remmberFlagClick">
              <span :class="remmberFlag?'remmbers':'remmbersflag'"></span>
              <div class="remmberLeft">我已看过并同意</div> 
                <span
                  @click.stop="goServiceterms"
                  class="c4a5 dis_in_block remmberRight"
                >{{allCourseBuyAgreementData.protocolName}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <span @click="removeBuy">不同意</span>
        <span @click="goNext" v-if='this.DownIndex  > 0' style="background:#ccc;">
            同意
            <i ref="iDown"  >({{this.DownIndex}}s)</i>
          </span>
        <span v-else @click="goisInfo(CourseDetailList.courseFullId)">同意</span>
      </div>
    </mt-popup>
    <div v-if="popupVisible1||popupVisible" class="popupVisibleModel" @touchmove.prevent></div>
  </div>
</template>
<script>
  import {
    mapState,
    mapActions
  } from "vuex";
  import {
    downTime,
    getUserInfoCookie,
    getCookie
  } from "../../public/index";
  import timer from "@/component/index/classTimer";
  import AllChanJieList from "../../component/quanJieDetail/allChanJIeList";
  import moment from "moment";
  import Bscroll from 'better-scroll';
  export default {
    components: {
      timer,
      AllChanJieList
    },
    name: "allcoursedetail",
    data() {
      return {
        QuanjieTable: "0",
        quanJieId: "", //用于储存id
        obj: {}, //用于解析回放天数 字符串
        downTimes: null, //记录倒计时时间
        BuyDownTimes: 10, //记录报名倒计时时间
        timer: null, //定时器
        top: "", // 记录导航距离顶部的位置
        popupVisible: false, //控制开课前了解弹框
        popupVisible1: false, //控制立即报名弹框
        backFlag: false, //控制导航条返回键
        pageX: "",
        buyTypes: 'false',
        goServicetermsFlag: false, //去看协议不销毁定时器
        remmberFlag:false,
        clickflag:true
      };
    },
    destroyed() {
      window.onscroll = null
      if (this.goServicetermsFlag) {
      } else {
        this.getChangeInterval()
        this.getChangeDown(10)
      }
    },
   created(){
        this.$nextTick(()=>{
            this.scroll = new Bscroll(this.$refs.gu_beforeBoxClassBox, {
                //初始化better-scroll
                probeType: 3, //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
                click: true, //是否派发click事件
                scrollY: true
            });
        })
    },
    watch: {
      touchstartScroll(){
        this.$nextTick(()=>{
            this.scroll = new Bscroll(this.$refs.gu_beforeBoxClassBox, {
                //初始化better-scroll
                probeType: 3, //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
                click: true, //是否派发click事件
                scrollY: true
            });
        })
      },
      DownIndex(newVal, oldVal) {
        if (newVal < 1) {
          this.getChangeInterval()
          // //console.log('new',newVal)
          // clearInterval(this.timer)
        }
      },
      //报名协议
      popupVisible1(newVal, oldVal) {
        // //console.log(newVal,'xxxxxxxxxxxxxxx')
        this.$refs.quanJieBox.classList.add("quanJieBoxactive");
        if (!newVal) {
          this.$refs.quanJieBox.classList.remove("quanJieBoxactive");
          this.getChangeInterval()
          this.getChangeDown(10)
        }
      },
      //开课请了解
      popupVisible(newVal, oldVal) {
        // //console.log(newVal,'xxxxxxxxxxxxxxx')
        this.$refs.quanJieBox.classList.add("quanJieBoxactive");
        if (!newVal) {
          this.$refs.quanJieBox.classList.remove("quanJieBoxactive");
        }
      },
      QuanjieTable: function(val, oldval) {
        if (val == "1") {
          let data = {
            courseId: this.quanJieId,
            courseType: 2
          };
          this.getAllCourseDetailUserCourseIntroduceAction(data);
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      if (from.path == '/index/indexclass' || from.path == '/myorder' || from.path == '/search' ||
        from.path == "/xtmenulist2") {
        window.localStorage.setItem('indexclassUrlFlag', from.path)
      }
      if (from.path == '/perfectPersonalInformation') {
        next(vm => {
          vm.Twoisneed(vm.CourseDetailList.courseFullId)
        })
      } else if (from.path == '/allCourseSubmitOrder') {
        next(vm => {
          vm.getChangeDown(10)
          vm.getChangeInterval()
        })
      }
      if (from.path == "/serviceterms") {
        next(vm => {
          vm.popupVisible1 = true;
          document.getElementById("app").style = "position:fixed;top:0"
          // if(vm.DownIndex<1){
          //    vm.getChangeInterval()
          //   //  clearInterval(vm.timer)
          //  }else{
          //     vm.getChangeDown(1)
          //     //  vm.getChangeDown(5)
          //     // vm.BuyDownTime()
          //  }
        });
      }
      if (
        from.path == "/chanjiedetail" ||
        from.path == "/" ||
        from.path == "/allCourseSubmitOrder" ||
        from.path == "/serviceterms"
      ) {
        let quanJieUrl = window.localStorage.getItem("quanJieUrl");
        window.localStorage.setItem("quanJieUrl", quanJieUrl);
        next(vm => {
          if (vm.CourseDetailList.purchased) {
            vm.QuanjieTable = "2";
          } else {
            vm.QuanjieTable = "1";
          }
          // vm.getChangeDown(10)
          // clearInterval(vm.timer)
        });
      } else {
        window.localStorage.setItem("quanJieUrl", '/');
      }
      next();
    },
    computed: {
      ...mapState({
        //存储是否赠课
        buytype: state => state.chanJieDetailStore.buytype,
        //倒计时
        DownIndex: state => state.chanJieDetailStore.DownIndex,
        //全阶详情展示数据
        CourseDetailList: state => state.allCourseDetailStore.allCourseDetailData,
        //全阶简介数据
        allCourseDetailUserCourseIntroduceImg: state =>
          state.allCourseDetailStore.allCourseDetailUserCourseIntroduceImg,
        //购买提示数据
        allCourseBuyHintData: state =>
          state.allCourseDetailStore.allCourseBuyHintData,
        //购买协议数据
        allCourseBuyAgreementData: state =>
          state.allCourseDetailStore.allCourseBuyAgreementData,
        ChnageLastTime: state => state.chanJieDetailStore.LastTime
      })
    },
    async mounted() {
      this.$GifToast(false)
      window.scrollTo(0, 0)
      this.buyTypes = window.localStorage.getItem('buyTypes')
      this.$refs.quanJieBox.addEventListener("scroll", this.Scroll);
      if (this.$route.query.id == undefined) {
        this.quanJieId = window.localStorage.getItem("quanJieId");
      } else {
        this.quanJieId = this.$route.query.id;
        window.localStorage.setItem("quanJieId", this.$route.query.id);
        window.localStorage.setItem('chanJieIdOder', this.$route.query.id)
      }
      await this.getAllCourseDetailAction({
        token: "",
        courseFullId: this.quanJieId
      });
      this.$nextTick(() => {
        if(this.$refs.tab){
          this.top = this.$refs.tab.offsetTop;
        }
      });
      await this.parseObj();
      this.downNowTime();
      window.localStorage.setItem('courseTypeOder', this.CourseDetailList.courseTypeId)
      //console.log(this.CourseDetailList, '全阶段展示详情')
      if (this.CourseDetailList.purchased) {
        this.QuanjieTable = "2";
      } else {
        this.QuanjieTable = "1";
      }
      let that = this
      if(that.$refs.tab){

      let Tops = that.$refs.tab.offsetTop
      window.onscroll = function() {
        if (that.getScrollTop() >= Tops) {
          that.$refs.tabFexld.classList.add("zhanweiactive");
          that.$refs.tab.classList.add("active");
        } else {
          that.$refs.tabFexld.classList.remove("zhanweiactive");
          that.$refs.tab.classList.remove("active");
        }
      }
      }

      this.initStundentTime(JSON.parse(this.CourseDetailList.courseDynamicElement))

      if(!this.CourseDetailList.isView){
                this.beforeClass()
        }
         
    },
    methods: {
      ...mapActions({
        getChangebuytype: 'chanJieDetailStore/getChangebuytype',
        //倒计时
        getChangeInterval: 'chanJieDetailStore/getChangeInterval',
        getChangeDown: 'chanJieDetailStore/getChangeDown',
        //全阶详情
        getAllCourseDetailAction: "allCourseDetailStore/getAllCourseDetailAction",
        //全阶简介
        getAllCourseDetailUserCourseIntroduceAction: "allCourseDetailStore/getAllCourseDetailUserCourseIntroduceAction",
        //购买前提示
        getAllCourseBuyHintAction: "allCourseDetailStore/getAllCourseBuyHintAction",
        //购买协议
        getAllCourseBuyAgreementAction: "allCourseDetailStore/getAllCourseBuyAgreementAction",
        //学习有效期
        getChnageLastTime: 'chanJieDetailStore/getChnageLastTime',
      }),
      remmberFlagClick(){
        if(!this.clickflag){
          return
        }
        this.clickflag = false
        this.remmberFlag = !this.remmberFlag
        setTimeout(()=>{
          this.clickflag = true
        },1000)
        //console.log(this.remmberFlag)
      },
      touchstartScroll(){
        this.$nextTick(()=>{
            this.scroll = new Bscroll(this.$refs.gu_beforeBoxClassBox, {
                //初始化better-scroll
                probeType: 3, //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
                click: true, //是否派发click事件
                scrollY: true
            });
        })
      },
      beforeClass() {
        this.popupVisible = true;
        document.getElementById("app").style = "position:fixed;top:0"
      },
      goBack() {
        this.getChangeDown(10)
        this.getChangeInterval()
        //  clearInterval(this.timer)
        let url = window.localStorage.getItem('indexclassUrlFlag')
        if (url !== 'null') {
          this.$router.push({
            path: url,
          })
          window.localStorage.setItem('indexclassUrlFlag', 'null')
          document.getElementById("app").style = "position:static"
        } else {
          this.$router.push({
            path: 'index/indexshouye',
          })
          document.getElementById("app").style = "position:static"
        }
        // let quanJieUrl = window.localStorage.getItem("quanJieUrl");
        // this.$router.push({
        //   path: quanJieUrl
        // });
      },
      removeBuy1() {
        this.popupVisible = false;
        document.getElementById("app").style = "position:static"
      },
      //取消报名
      removeBuy() {
        //console.log("---111----")
        this.popupVisible1 = false;
        this.remmberFlag = false;
        document.getElementById("app").style = "position:static"
        this.getChangeInterval()
        this.getChangeDown(10)
        // this.BuyDownTimes = 10;
      },
      //处理成obj格式
      parseObj() {
        this.obj =
          this.CourseDetailList &&
          JSON.parse(this.CourseDetailList.courseDynamicElement);
        //console.log(this.obj)
      },
      //倒计时
      downNowTime() {
        //console.log(this.obj.signDeadlineTime)
        if (this.obj.signDeadlineTime) {
          this.downTimes = downTime(this.obj.signDeadlineTime);
          let time = setInterval(() => {
            this.downTimes = downTime(this.obj.signDeadlineTime);
          }, 1000);
          if (this.downTimes == null) {
            clearInterval(time);
          }
        }
      },
      //报名同意倒计时
      BuyDownTime() {
        this.getChangeDown(1)
        // let that = this
        // this.timer = setInterval(() => {
        //   // this.BuyDownTimes--;
        //   //console.log('到')
        //   if (this.DownIndex < 1) {
        //     clearInterval(that.timer);
        //   }else{
        //   }
        // }, 1000);
      },
      // 导航吸附
      async Scroll() {
        let that = this;
        let top = this.$refs.quanJieBox.scrollTop; //滚走高度
        let height =
          document.documentElement.offsetHeight || document.body.offsetHeight; //页面一屏高度
        if (top > this.top - 40) {
          this.$refs.tab.classList.add("active");
          that.$refs.tabFexld.classList.add("zhanweiactive");
          this.backFlag = true;
        } else if (top < this.top) {
          this.$refs.tab.classList.remove("active");
          that.$refs.tabFexld.classList.remove("zhanweiactive");
          this.backFlag = false;
        }
      },
      getScrollTop() {
        //网页滚动量
        var scrollTop = 0,
          bodyScrollTop = 0,
          documentScrollTop = 0;
        if (document.body) {
          //兼容IE
          bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
          //主流浏览器
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop =
          bodyScrollTop - documentScrollTop > 0 ?
          bodyScrollTop :
          documentScrollTop;
        return scrollTop;
      },
      //购买全阶
      CanBuyOrder(id) {
        this.$router.push({
          path: "/allCourseSubmitOrder",
          query: {
            istype: 2, //全阶
            fullid: id, //id
            isTurnFull: this.$route.query.istype, //是否是转报全阶
            orderType: 1, //报名1   赠课4
            orderSNID: null //是否从订单页面进入
          }
        });
        document.getElementById("app").style = "position:static"
      },
      //赠送全阶
      CanGifOrder(id) {
        this.$router.push({
          path: "/allCourseSubmitOrder",
          query: {
            istype: 2, //全阶
            fullid: id, //id
            isTurnFull: this.$route.query.istype, //是否是转报全阶
            orderType: 4, //报名1   赠课4
            orderSNID: null //是否从订单页面进入
          }
        });
        document.getElementById("app").style = "position:static"
      },
      leftRightStartOne(e) {
        this.pageX = e.changedTouches[0].clientX;
      },
      leftRightStartTwo(e) {
        this.pageX = e.changedTouches[0].clientX;
      },
      leftRightMoveOne(e) {
        if (this.pageX - e.changedTouches[0].clientX > 100) {
          this.QuanjieTable = "2";
        }
      },
      leftRightMoveTwo(e) {
        if (e.changedTouches[0].clientX - this.pageX > 100) {
          this.QuanjieTable = "1";
        }
      },
      //购买前提示内容
      async buyHtml(type) {
        if (!getUserInfoCookie() || getCookie() == 'undefined') {
          this.$ModelToast(true)
          return
        }
        if (type == 'A') {
          this.getChangebuytype(false)
          window.localStorage.setItem("buyTypes", 'false')
          this.buyTypes = 'false'
        } else {
          this.getChangebuytype(true)
          window.localStorage.setItem("buyTypes", 'true')
          this.buyTypes = 'true'
        }
        await this.getAllCourseBuyHintAction({});
        await this.getAllCourseBuyAgreementAction({
          courseId: this.quanJieId,
          courseType: 1
        });
        this.popupVisible1 = true;
        this.remmberFlag = false;
        this.touchstartScroll()
        document.getElementById("app").style = "position:fixed;top:0"
        if (this.DownIndex > 0) {
          this.BuyDownTime();
        } else {
          this.getChangeInterval()
          //  clearInterval(that.timer);
        }
      },
      //取消报名
      removeBuy() {
        this.popupVisible1 = false;
        this.remmberFlag = false;
        document.getElementById("app").style = "position:static"
        this.getChangeInterval()
        this.getChangeDown(10)
        // this.BuyDownTimes = 10;
      },
      goNext() {
        if (!this.remmberFlag) {
          this.$Toast({
            message: "请先同意报名协议",
            position: "crntep"
          });
        } else {}
      },
      //去往用户协议
      goServiceterms() {
        // clearInterval(this.timer)
        this.goServicetermsFlag = true
        this.$router.push({
          path: "/serviceterms",
          query: {
            type: "danJie"
          }
        });
        document.getElementById("app").style = "position:static"
      },
      //去往完善信息
      goisInfo(id) {
        //console.log(this.buytype)
        if (!(this.remmberFlag)) {
          this.$Toast({
            message: '请先同意报名协议',
            position: 'crntep',
          })
        } else {
          if (!this.buytype) {
            this.$axios
              .post("/user/needcompleteuserinfo", {
                type: 1,
                token: ""
              })
              .then(res => {
                if (res.data.result) {
                  let allCourseSubmitOrderObjs = {
                    istype: 2, //全阶
                    fullid: id, //id
                    isTurnFull: this.$route.query.istype, //是否是转报全阶
                    orderType: 1, //报名1   赠课4
                    orderSNID: null //是否从订单页面进入
                  }
                  //console.log(allCourseSubmitOrderObjs,"21123*----")
                  window.localStorage.setItem("allCourseSubmitOrderIDs",JSON.stringify(allCourseSubmitOrderObjs))
                  this.$router.push({
                    path: '/perfectPersonalInformation',
                    query: {
                      type: 2,
                      couseid: this.quanJieId
                    }
                  })
                  document.getElementById("app").style = "position:static"
                } else {
                  this.CanBuyOrder(id)
                }
              });
          } else {
            this.CanGifOrder(id)
          }
        }
      },
      //二次确认完善信息
      Twoisneed(id) {
         this.quanJieId = window.localStorage.getItem("quanJieId");
         //console.log(this.quanJieId,'this.quanJieIdthis.quanJieId')
        //  return
        this.$axios
          .post("/user/needcompleteuserinfo", {
            type: 1,
            token: ""
          })
          .then(res => {
            if (res.data.result) {
              this.getAllCourseBuyHintAction({})
              this.getAllCourseBuyAgreementAction({
                courseId: this.quanJieId,
                courseType: 1
              })
              this.popupVisible1 = true
              this.remmberFlag = false;
              document.getElementById("app").style = "position:fixed;top:0"
              this.touchstartScroll()
              if (this.DownIndex > 0) {
                this.BuyDownTime()
              } else {
                this.getChangeInterval()
                //  clearInterval(that.timer);
              }
            } else {
              if(this.$route.query.type){
                  this.getAllCourseBuyHintAction({})
                  this.getAllCourseBuyAgreementAction({
                    courseId: this.quanJieId,
                    courseType: 1
                  })
                  this.popupVisible1 = true
                  this.remmberFlag = false;
                  document.getElementById("app").style = "position:fixed;top:0"
                  this.touchstartScroll()
                  if (this.DownIndex > 0) {
                    this.BuyDownTime()
                  } else {
                    this.getChangeInterval()
                    //  clearInterval(that.timer);
                  }
                 return
              }else{
                //console.log('我是完成')
                 this.CanBuyOrder(id)
              }
            }
          });
      },
      moment,
      //处理学习有效期
      initStundentTime(obj) {
        if (obj.learnEndTime) {
          //直播  取learnEndTime
          let time = obj.learnEndTime;
          time = moment(time).format("YYYY-MM-DD HH:mm:ss");
          //console.log(obj.learnEndTime,'我是直播学习有效期')
          this.getChnageLastTime(time);
        } else {
          //录播  取studyValidityPeriod 天数  从第二天开始算的
          let n = Number(obj.studyValidityPeriod) + 1;
         
            let time = moment()
                        .add("d", n)
                        .format("YYYY-MM-DD HH:mm:ss");
            //console.log(time,'我是录播学习有效期')
          this.getChnageLastTime(time);
        }
      }
    }
  };
</script>
<style lang='scss' scoped>
.remmberBox{
  display: flex;
  padding-bottom: 1rem;
}
  .zhanweiactive {
      height: 2.92rem;
  }
  .remmbersflag{
    display:inline-block;
    width: .8rem;
    height: .8rem;
    border: 1px solid  rgba(196, 165, 127, 1);
  }
  .remmbers{
    display:flex;
    width: .8rem;
    height: .8rem;
    border: 1px solid  rgba(196, 165, 127, 1);
    &::after{
      display: inline-block;
      width: 100%;
      height: 100%;
      content: ""!important;
      background: url("../../../static/img/duihao.png") no-repeat;
      overflow: hidden;
      background-size: 100%;
    }
  }
  .popupVisibleModel {
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: .3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
  }
  .zIndex9999 {
    z-index: 9999!important;
  }
  .beforeBox {
    p {
      color: #999;
      line-height: 1.5rem;
      padding-top: .7rem;
      font-size: .9rem;
      &:nth-child(1) {
        padding-top: 0;
      }
    }
    span {
      color: #000;
    }
    b {
      color: #097276;
      opacity: .7;
    }
  }
  .chnageLastTimetishi {
    color: #999; // padding: .3rem 0;
    font-size: .875rem;
  }
  .app-lv-627div {
    width: 320px;
    height: 82px;
    background: rgba(196, 165, 127, 1);
    opacity: 0.1;
    border-radius: 6px;
  }
  .mint-popup.mint-popup-bottom{
    height: 25rem;
    padding-top: 0!important;
    padding-bottom: 0!important;
    display: flex;
    flex-direction: column;
    .gu_beforeClass{
      flex: 1;
    }
    .footer{
      position: relative;
    }
  }
  .gu_beforeBoxClass {
    // max-height: 17rem!important;
    // overflow-y: auto;
    padding: 0 2rem;
    .beforeBox {
      p {
        color: #999;
        line-height: 1.5rem;
      }
      span {
        color: #000; // opacity: .7;
      }
    }
  }
  .remmberLeft {
    padding-left: .5rem;
    color: #555;
    display: inline-block;
    font-size: .9rem;
    flex-shrink: 0;
  }
  .remmberRight {
    // padding-top: .1rem;
    font-size: .9rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .gu_beforepclass {
    width: 100%;
    height: 15rem;
    overflow-y: auto;
  }
  .myDoubtBox {
    position: relative;
    width: 1rem;
    height: 1rem;
    .myDoubtImg {
      position: absolute;
      top: -.3rem;
      left: -1.2rem;
      width: 1rem;
      height: 1rem;
      padding-top: .3rem;
      padding-right: .3rem;
    }
  }
  .WritingEvaluation_footFixed {
    .mint-button-text {
      font-size: 0.9375rem;
    }
  }
  .quanJieBoxactive {
    overflow: auto;
  }
  #allCourseDetail {
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;
    .nav-title {
      width: 100%;
      height: 50px;
    }
    .gu_ovf {
      //  overflow: scroll;
    }
    .Chanjie.mt-40 {
      flex: 1; // -webkit-overflow-scrolling : touch;
    }
  }
  .Chanjie-title {
    img {
      display: block;
    }
  }
  .Chanjie-title-leijc {
    // padding-top: 2.5rem;
  }
  .Chanjie-content {
    padding: 0 1.68rem;
  }
  .ChanjieTitle {
    // margin-bottom: 0.875rem !important;
    .fz18 {
      font-family: "FZXIYSJ";
      font-weight: 400;
    }
  }
  .recorded {
    display: block;
    width: 2.27rem;
    height: 1.2rem;
    border-radius: 0.1875rem;
    font-weight: 300;
    padding: 0 0.1875rem !important;
    margin-right: 0.3125rem;
    text-align: center;
    line-height: 1.2rem;
    font-size: 0.7rem;
    float: left;
  }
  .fz15.c30 {
    padding-bottom: .3rem;
    color: #333;
  }
  .c9.mt-5 {
    color: #555555 !important;
    padding-bottom: .3rem;
    s {
      text-decoration-color: #ddd;
    }
  }
  .mt-5 {
    .c097.fz18 {
      font-weight: 600;
      margin-right: 0.6875rem;
    }
    .fz15 {
      margin-right: 0.68rem;
      color: #333;
    }
  }
  /*赠课给好友*/
  .lecturing {
    width: -webkit-fill-available;
    /* width: 50%; */
    background: #fff;
    border-radius: 0px;
    color: #c4a57f !important;
    height: 100%;
    font-size: 15px;
    font-family: "FZLTHJW--GB1-0";
    .mint-button-text {}
  }
  .dis_flow_root .mt-30 {
    margin-top: 0.93rem;
  }
  /* 单阶-报名 */
  .signUp {
    /* width: 50%; */
    width: -webkit-fill-available;
    background: #097276;
    border-radius: 0px;
    height: 100%;
    font-size: 15px;
    font-family: "FZLTHJW--GB1-0";
    /* color: #C4A57F !important; */
  }
  .signUp time {
    margin-top: 5px;
    font-size: 12px;
    opacity: 0.5;
  }
  .gu_chanjieBox {
    width: 100%;
    height: auto;
    background: #fff;
    &.active {
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 0;
      background: #fff;
      z-index: 100;
      padding: 0 1.68rem 0 1.68rem;
    }
    .button {
      position: fixed;
      top: -0.09rem;
      left: -0.15rem;
    }
  }
  .mt-40 {
    margin-top: 2.5rem !important;
  }
  .gu_beforeClass_p {
    width: 100%;
    height: 1.87rem;
    background: #fbf7f3;
    text-align: center;
    line-height: 1.87rem;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #c4a57f;
  }
  .mint-popup {
    width: 100%;
    height: 20rem;
    padding: 0 2rem;
    padding-top: 2rem;
    padding-bottom: 3rem; // box-sizing: border-box;
    overflow: auto; // position: relative;
    -webkit-overflow-scrolling: touch;
    .gu_beforeClass>p {
      overflow: auto; // position:absolute;
      top: 3.75rem;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 .25rem 1.25rem;
    }
    .gu_beforeClassTitle {
      text-align: center;
      // margin-bottom: 1.375rem;
      margin-top: 0;
      font-size: 1.125rem;
      font-weight: 400;
    }
    .classBox {
      color: #c4a57f;
      margin-top: 1rem;
      margin-bottom: 1rem;
      width: 100%;
      max-height: 8rem;
    }
    .footer {
      flex-shrink: 0;
      width: 100%;
      height: 50px;
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      span {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        &:nth-child(1) {
          background: #fff;
          color: #c4a57f;
          box-shadow: 0 0 .5rem 0 #e7e7e7;
        }
        &:nth-child(2) {
          background: #c4a57f;
          color: #fff;
          i {
            font-style: normal;
          }
        }
      }
    }
  }
  .v-modal {
    background: none;
  }
  .gu_beforeClass {
    
    // padding-top: 3rem;
    display: flex;
    flex-direction: column;
    h3 {
      text-align: center;
      // margin-bottom: 1rem;
      font-weight: 400;
      font-size: 1.125rem;
      margin: 0;
      position: relative;
      width: 100%;
      padding-top: 1.875rem;
      padding-bottom: 1.575rem;
      flex-shrink: 0;
    }
    p {
      padding-top: 1.7rem;
      font-weight: 400;
      color: #999;
      font-size: 0.9375rem;
      line-height: 1.5rem;
      &:nth-child(1) {
        padding-top: 0;
      }
    }
    .showPord {
      width: 2rem;
      height: 2rem;
      position: absolute;
      right: 2.6rem;
      top: 1.2rem;
      z-index: 999;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .gu_beforeBoxClassBox{
      flex: 1;
      overflow: hidden;
    }
  }
  .mint-navbar .mint-tab-item.is-selected {
    border: 0;
    &::after {
      display: inline-block;
      content: "";
      width: 3.75rem;
      height: 0.125rem;
      background: #c4a57f;
      border-radius: 0.06rem;
    }
  }
  .mint-tab-item {
    padding-bottom: 0 !important;
  }
  .allCourse_List {
    padding-top: 0.93rem; // min-height: 90vh;
  }
  .mr-10 {
    float: right;
  }
  .gu_apply {
    height: 1px!important;
    margin: 1.9375rem 0!important;
  }
</style>


