<template>
  <!-- 
          overdue /*过期*/
          countdown /*倒计时*/
          Is_live /*正在直播*/                                                    
        -->
  <!--任务1-->
  <div class="Task—tree">
    <div class="dis_flow_root" v-for="(item,index) in NewData" :key="index" @click.stop="goTaskTreeDetails(item)" v-if="index%2==0">
      <div class="pos_r">
        <!-- <time
                class="fz12 cf countdown"
              > 
              </time> -->
        <time class="fz12 cf countdown" v-if="item.isStar&&item.classhourNeedCountDown&&item.classhourReason!=='正在直播'">{{item.classhourReason}}  <Timer :date="item.classhourCountDownTime" :hourType="item.classhourType" @clearTimes="(data)=>{
          item.classhourReason=data
        }"/></time>
        <time class="fz12 cf countdown"  style="background:rgb(32, 113, 117)" v-if="item.isStar&&item.classhourNeedCountDown&&item.classhourReason=='正在直播'">{{item.classhourReason}}<Timer :date="item.classhourCountDownTime" :hourType="item.classhourType" @clearTimes="(data)=>{
          item.classhourReason=data
        }"/></time>
        <time class="fz12 cf overdue" style="background:rgb(32, 113, 117)" v-if="!item.isStar&&!item.classhourNeedCountDown&&item.classhourReason=='正在直播'">{{item.classhourReason}}</time>
        <time class="fz12 cf overdue" v-if="!item.isStar&&!item.classhourNeedCountDown&&item.classhourReason!=='正在直播'">{{item.classhourReason}}</time>
        <time class="fz12 cf countdown" v-if="item.isStar&&!item.classhourNeedCountDown||!item.isStar&&item.classhourNeedCountDown">{{item.classhourCountDownTime}}</time>
        <!-- <time class="fz12 cf overdue" v-else v-show="item.classhourReason">{{item.classhourReason}}</time> -->
        <!-- <span v-if="item.kind=='top'||item.kind=='bottom'" style="background:#207175"></span> -->
        <span v-if="!item.currentLearningNode&&item.kind=='normal'"
        :style="{'background':judgeClassHour(item)?'#B49B76':'#DDDDDD'}"
         style="background:#B49B76;fontSize:.875rem;z-index: 1;">{{!temporary?index+1:index}}</span>
        <span v-if="item.currentLearningNode&&item.kind=='normal'" style="background:#207175;fontSize:.875rem;z-index: 1;"> {{!temporary?index+1:index}}</span>
        <img :key="item.classhourId" v-lazy="item.copyBookUri" :style="{'opacity':judgeClassHour(item)?'1':'0.6'}" alt>
      </div>
      <h3 class="fz15 c4a5"><span class="app-broadH3">{{item.classhourName}}</span></h3>
      <p class="fz12 c9 app_broadP"  v-if="item.classhourIntroduction">
        <span class="app-broadH3" style="height:1rem">{{item.classhourIntroduction}}</span></p>
      <!-- <time class="fz12 c9">{{item.startTime}}</time> -->
      <!-- <time class="fz12 c9" v-if="item.isStar&&!item.classhourNeedCountDown||!item.isStar&&item.classhourNeedCountDown">{{item.classhourCountDownTime}}</time> -->
      <div class="Rate">
        <img src="../../../static/mobile_img/checkPoint_praise2.png" v-if="item.videoIsPlay==1">
        <img v-else src="../../../static/mobile_img/checkPoint_praise1.png" >
        <img src="../../../static/mobile_img/checkPoint_praise2.png" v-for="(val,ind) in item.userHomeworkAssignCompletionResponseVos" :key="ind" v-if="val.hasCompleted">
        <img v-else src="../../../static/mobile_img/checkPoint_praise1.png">
      </div>
    </div>
    <div class="dis_flow_root gu_dis_flow_root" @click.stop="goTaskTreeDetails(item)" v-else>
      <div class="pos_r">
        <span v-if="!item.currentLearningNode&&item.kind=='normal'" 
        :style="{'background':judgeClassHour(item)?'#B49B76':'#DDDDDD'}"
         style="background:#B49B76;fontSize:.875rem;z-index: 1;">{{!temporary?index+1:index}}</span>
        <span v-if="item.currentLearningNode&&item.kind=='normal'"
         style="background:#207175;fontSize:.875rem;z-index: 1;">{{!temporary?index+1:index}}</span>
        <img v-lazy="item.copyBookUri" :key="item.classhourId" :style="{'opacity':judgeClassHour(item)?'1':'0.6'}">
        <time class="fz12 cf countdown" v-if="item.isStar&&item.classhourNeedCountDown&&item.classhourReason!=='正在直播'">{{item.classhourReason}}<Timer :date="item.classhourCountDownTime" :hourType="item.classhourType" @clearTimes="(data)=>{
          item.classhourReason=data
        }"/></time>
        <time class="fz12 cf countdown"  style="background:rgb(32, 113, 117)" v-if="item.isStar&&item.classhourNeedCountDown&&item.classhourReason=='正在直播'">{{item.classhourReason}}<Timer :date="item.classhourCountDownTime" :hourType="item.classhourType" @clearTimes="(data)=>{
          item.classhourReason=data
        }"/></time>
        <time class="fz12 cf overdue" style="background:rgb(32, 113, 117)" v-if="!item.isStar&&!item.classhourNeedCountDown&&item.classhourReason=='正在直播'">{{item.classhourReason}}</time>
        <time class="fz12 cf overdue" v-if="!item.isStar&&!item.classhourNeedCountDown&&item.classhourReason!=='正在直播'">{{item.classhourReason}}</time>
        <time class="fz12 cf countdown" v-if="item.isStar&&!item.classhourNeedCountDown||!item.isStar&&item.classhourNeedCountDown">{{item.classhourCountDownTime}}</time>
      </div>
      <h3 class="fz15 c4a5"><span class="app-broadH3" style="marginLeft:-0;height:1rem">{{item.classhourName}}</span></h3>
      <p class="fz12 c9 app_broadP" v-if="item.classhourIntroduction"><span class="app-broadH3" style="marginLeft:-0">{{item.classhourIntroduction}}</span></p>
      <div class="Rate">
        <img src="../../../static/mobile_img/checkPoint_praise2.png" style="margin-right: 0.1rem;" v-if="item.videoIsPlay==1">
        <img v-else src="../../../static/mobile_img/checkPoint_praise1.png" style="margin-right: 0.1rem;">
        <img src="../../../static/mobile_img/checkPoint_praise2.png" v-for="(val,ind) in item.userHomeworkAssignCompletionResponseVos" :key="ind" v-if="val.hasCompleted">
        <img v-else src="../../../static/mobile_img/checkPoint_praise1.png" > 
      </div>
    </div>
    <!--学习回顾-->
    <div class="dis_flow_root" @click="goWinReview" >
      <div class="pos_r">
        <!-- <span style="background:#ccc"></span> -->
        <img src="../../../static/img/Oldalso.png" style="object-fit: scale-down;" alt>
      </div>
      <h3 class="fz15 c4a5">学习回顾</h3>
      <p class="fz12 c9"></p>
    </div>
  </div>
</template>
<script>
  import {formData} from "@/public/utils" 
  import Timer from "@/component/chanJieDetail/Timer"; //处理时间
  import moment from "moment"
  // import {
  //   formData
  // } from "@/public/index.js"; //处理时间
  import {
    getUserInfoCookie,
    getCookie
  } from "../../public/index";
  import {
    mapState,
    mapActions
  } from "vuex";
  import {
    downTime
  } from "../../public/index";
  import {
    isDebuggerStatement
  } from 'babel-types';
  export default {
    name: "chanjieuserclasshourlist",
    props: {
      data: {
        type: null,
        require: true
      },
      purchased: {
        type: null,
        required: true
      },
      FiexTop:{
                 type:null
      },
      FiexTopAdd:{
                type:null
      }
    },
    data() {
      return {
        temporary: null, //是否有临时课程
        NewData: [],
        clearTimes:null,
        isAllLight:false ,//是否显示学习回顾
        courseType:1,//直播录播
        bakcFlagS:false  // 是否显示学习回顾
      };
    },
    components: {
      Timer,
    },
    computed: {
        ...mapState({
          chanJieDetailUserclasshourList: state => state.chanJieDetailStore.chanJieDetailUserclasshourList,
          LastTimeFlag: state => state.chanJieDetailStore.LastTimeFlag,
          chanJieDetailData: state => state.chanJieDetailStore.chanJieDetailData,
          
      })},
    watch: {
      data: function(newValue, oldValue) {
        // //console.log(newValue,'newValuenewValuenewValuenewValuenewValue')
        // if(newValue!=oldValue){
        //  this.NewData = newValue
        // }
        // if (oldValue.length <= 0) {
        //   this.downNowTime(newValue);
        // }
      }
    },
  async  mounted() {
    this.quanJieId = window.localStorage.getItem("quanJieId");
            window.onscroll = () =>{
                if(this.getScrollTop() >= this.FiexTop+50){
                      this.FiexTopAdd('add')
                  }else{
                          this.FiexTopAdd('remove')
                }
          }
      let chanJieId = window.localStorage.getItem('chanJieId')
        await  this.getChanJieDetailUserclasshourAction({
          courseId: this.$route.query.id || chanJieId,
          token: ''
        })
      // let  learnEndTimeOne = moment(this.chanJieDetailUserclasshourList.learnEndTime).add(-8,'h').format("YYYY-MM-DD HH:mm:ss");
      // this.getChnageLastTime(learnEndTimeOne)
    //  console.log(learnEndTimeOne,'够够够够')
      let newArr = []
      let that = this
      this.chanJieDetailUserclasshourList.userClassHourResponseVos&&this.chanJieDetailUserclasshourList.userClassHourResponseVos.map((item, index) => {
        if (item.kind == 'normal') {
          newArr.push(item)
        }
        if (item.kind == 'top') {
          newArr = []
          that.temporary = true
          let top = this.data.slice(index, index + 1)[0]
          newArr.push(top)
          let center = this.data.slice(0, index)
          center&&center.map((items, index) => {
            newArr.push(items)
          })
        }
        if (item.kind == 'bottom') {
          // that.temporary = true
          let bottom = this.data.slice(index, index + 1)[0]
          newArr.push(bottom)
        }
      })
      //上面的标点
      let objarr = []
      newArr&&newArr.map((item, index) => {
        if(item.kind=='top'||item.kind=='bottom'){
        }else{
            item.objarrIndex = index
            objarr.push(item)
            //console.log(item.currentLearningNode,'我是normalnormal222')
        }
      })
      let currentarr = []
      objarr&&objarr.map((item, index) => {
        if(item.currentLearningNode){
          currentarr.push(item)
        }
      })

      currentarr&&currentarr.map((item, index) => {
          if(index==currentarr.length-1){
             item.currentLearningNode = true
          }else{
             item.currentLearningNode = false
          }
      })
      currentarr&&currentarr.map((item, index) => {
        newArr[item.objarrIndex].currentLearningNode = item.currentLearningNode
      })
      //console.log(currentarr,'处理后的数据')
     //杀杀杀杀杀杀杀杀杀
    //  let currentindex = null
    //  newArr.map((item, index) => {
    //     if(item.kind=='top'||item.kind=='bottom'){
    //     }else{
    //         if(item.currentLearningNode){
    //             currentindex=true
    //         }
    //     }
    //   })
      this.NewData = newArr
      
      //console.log(newArr, 'newArrnewArrnewArr')
      // this.downNowTime(this.data);
      this.clearTimes=this.$on("clearTimes")
      // //console.log(this.clearTimes)


       //判断学习回顾
      this.Clearance()
      
    },
    methods: {
      judgeClassHour(obj) {
      if (obj.courseType == 1) {
        if(obj.publishStatus==1){
          return true;
        }
        if (obj.isLiving) return true;
        if (obj.classhourReason == "正在直播") return true;
        if (obj.classhourReason == "直播已结束") return true;
        if (obj.classhourReason == "回放已结束") return true;
        //直播
        if (obj.classhourCountDownTime) {
          //是否有目标时间
          if (obj.classhourType == 2) {
            //判断是直播 还是回放  1:直播  2:回放  3:录播
            //回放·
            return true;
          } else {
            //直播
            //判断时间是否过了当前时间
            let cur = moment().valueOf();
            let m = moment(obj.classhourCountDownTime).valueOf();
            if (cur > m) {
              return true;
            } else {
              return false;
            }
          }
        } else {
          return false;
        }
      } else if (obj.courseType == 2) {
        //录播
        if (obj.videoIsPlay == 1) {
          //是否播放过
          //1: 是
          return true;
        } else {
          //0 2:否
          return false;
        }
      }
    },
      //判断学习回顾
      Clearance(){
          //console.log(this.chanJieDetailData.courseType,'chanJieDetailData')
          this.isAllLight = this.chanJieDetailUserclasshourList.isAllLight  // 一个条件是否显示
          this.courseType = this.chanJieDetailData.courseType   //直播录播
          
          if(this.courseType==1){
            //直播显示条件
            if(!this.NewData[this.NewData.length-1]){
              return
            }
            let startTime = this.formData(this.NewData[this.NewData.length-1].startTime)  //最后一个课程时间
            let backDays = JSON.parse(this.chanJieDetailData.courseDynamicElement).coursePlaybackDays  //回放时间
            let targetTime = moment(startTime).utc().add(backDays,'d')  //处理后时间  
            this.bakcFlagS= !!(moment().valueOf() > targetTime.valueOf())   //当前时间大于处理后时间
            //console.log(this.bakcFlagS,'我是直播')
            //  //console.log(this.bakcFlagS,'我是学习回顾时间')
            //  //console.log(backDays,'回访时间')
            //  //console.log(this.NewData[this.NewData.length-1].startTime,'新list')
            //  //console.log(startTime,'新list')
          }else{
            //录播显示条件
            let Elements = JSON.parse(this.chanJieDetailData.courseDynamicElement)   //录播对象
            if(Elements.studyValidiyEnable){//我是录播永久
              this.bakcFlagS = false
            }else{
              let startTime = Elements.finishTime  //最后一个课程时间
              let endTime = Elements.studyValidityPeriod  //回放时间
              let targetTime=moment(startTime).add(endTime,"d").add(-14,'d') //处理后时间
              this.bakcFlagS =  !!(moment().valueOf() > targetTime.valueOf())    //当前时间大于处理后时间
              //console.log(this.bakcFlagS,'我是录播')
            } 
          }
          //console.log(this.chanJieDetailUserclasshourList.isAllLight,'llllllllllllllllllllll')
      },
      formData,
      moment,
      ...mapActions({
        //单阶任务树 课时大纲
        getChanJieDetailUserclasshourAction: 'chanJieDetailStore/getChanJieDetailUserclasshourAction',
        getUserInfoAction: "phoneStore/getUserInfoAction", //用户个人信息
        //学习有效期
        getChnageLastTime: 'chanJieDetailStore/getChnageLastTime',
      }),
      //去往任务数详情
      goTaskTreeDetails(item) {
         
         //console.log(this.LastTimeFlag,'我是判断课程是否截至');
        // return
        //console.log(item.publishStatus)
        //console.log(item, "------")
        //console.log(this.data, "15121");
        //console.log(this.purchased);
        let id = item.classhourId;
        let obj = item;
        if (!getUserInfoCookie() || getCookie() == "undefined") {
          this.$ModelToast(true);
        } else {
          if (this.purchased) {
            if(this.LastTimeFlag){
                this.$Toast("此课程报名已经结束啦");
            }else{
                if (item.publishStatus == 2) {
                  return
                }
                this.$axios
                    .post("/user/needcompleteuserinfo", { type: 1, token: "" })
                    .then(res => {
                    if (res.data.result) {
                        this.$router.push({
                                path:'/perfectPersonalInformation',
                                query:{type:4,couseid:this.quanJieId,name:"/chanjiedetailtasktreedetails",obj:{...obj}}
                        })
                        return
                    }else{
                      this.$router.push({
                          path: "/chanjiedetailtasktreedetails",
                          query: { ...obj}
                       });
                    }
                });
            }
            
          } else {
            this.$Toast("请先报名");
          }
        }
      },
      //去往学习回顾
      goWinReview() {
        
        if(this.isAllLight || this.bakcFlagS){
            this.$router.push({
              path: "/chanjiedetailwinreview"
            });
      }else{
          if(this.chanJieDetailData.courseType==1){
            this.$Toast('课程结束就能来看啦~')
          }else{
            this.$Toast('通关后就能查看啦~')
          }
      }
      },
      //倒计时函数
      downNowTime(data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].classhourCountDownTime) {
            this.$set(data[i], "time", downTime(data[i].classhourCountDownTime));
            let time = setInterval(() => {
              this.$set(
                data[i],
                "time",
                downTime(data[i].classhourCountDownTime)
              );
            }, 1000);
            if (data[i] == null) {
              clearInterval(time);
            }
          }
        }
      },
      showclearTimes(data){
        //console.log(classhourReason)
        //console.log(data,"-----1511")
      },
      //获取屏幕滚动值
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
    }
  };
</script>
<style lang='scss' scoped>
  .app_broadP{
    padding-bottom: 0.718rem!important;
  }
  .app-broadH3 {
    display: inline-block;
    width: 9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  h3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .gu_dis_flow_root {
    span {
      margin-left: -0.68rem;
    }
  }
  .Chanjie .Chanjie-content .ChanjieTable .Task—tree>div.dis_flow_root>div.pos_r span {
    background: none;
    width: 1.3125rem;
    height: 1.3125rem;
    font-size: 0.75rem;
    line-height: 1.45rem;
    margin-left: -0.6875rem;
  }
  .Chanjie .Chanjie-content .ChanjieTable .Task—tree>div.dis_flow_root>h3 {
    margin-top: 0.525rem;
    font-weight: 400;
  }
  .Chanjie .Chanjie-content .ChanjieTable .Task—tree>div.dis_flow_root>h3+p+time {
    margin-top: 0.525rem;
  }
  .Chanjie .Chanjie-content .ChanjieTable .Task—tree>div.dis_flow_root .Rate{
    // background: red;
    img:nth-of-type(1){
         margin-right: 0rem !important;
    }
  }
  .Chanjie .Chanjie-content .ChanjieTable .Task—tree>div.dis_flow_root .Rate img {
    margin-right: 0.1875rem;
  }
  .Chanjie .Chanjie-content .ChanjieTable .Task—tree>div.dis_flow_root::after {
    width: 49.5%;
  }
  .Chanjie .Chanjie-content .ChanjieTable .Task—tree>div.dis_flow_root:nth-child(2n)::after {
    left: 0rem;
  }
  .overdue {
    // margin-right: 0.525rem;
    // margin-left: 0.525rem;
  }
  // @media screen and (max-width: 750px) {
    .Task—tree {
      background: url("../../../static/mobile_img/0_0.png") center top repeat-y;
      background-size: 2.58rem 100%;
      // background: url("../../../static/mobile_img/0.png") center top repeat-y;
    }
  // } 
  // @media screen and (min-width:375px) and (max-width:768px){
  //    .Task—tree{
  //         background: url('../../../static/mobile_img/2_2.png') center top repeat-y;
  //     }
  // }
  // @media screen and (min-width:768px){
  //    .Task—tree{
  //         background: url('../../../static/mobile_img/1_1.png') center top repeat-y;
  //     }
  // }
  .countdown{
    max-width: none!important;
  }
</style>