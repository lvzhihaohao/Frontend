<template>
  <section>
    {{str}}
  </section> 
</template>
<script>
import moment from "moment";
import store from '../../store/chanJieDetail/chanJieDetailStore';
export default {
  data() {
    return {
      str: "",
      cleInterval: null,
      daystr: "",
      datas: null
    };
  },
  props: {
    date: {
      type: null
      //报名截止 直播课程
    },
    hourType:{
      type:null
    }
  },
  methods: {
    times() {
      //倒计时
      // //console.log("--------")
      if (this.datas == null) {
        return (this.str = "");
      } else {
          this.initTime(this.datas)
      }
    },
    //小于2位数加0
    auto(zero) {
      if (zero < 10) {
        return "0" + zero;
      } else {
        return zero;
      }
    },
    //倒计时开始
    Interval() {
      let that = this;
      this.cleInterval = setInterval(function() {
        that.times();
      }, 1000);
    },
    //关闭定时器
    Turnofftimer() {
    clearInterval(this.cleInterval);
      // let data = moment(this.datas); //传进来的时间
      //console.log(this.datas.split(' ')[0],"车上")
      if(this.datas.split(' ')[0] =='1970-01-01'){
          return this.str = '暂无直播时间'
      }else{
        return  this.str = ''
      }
    //   this.str = '报名截至' + this.datas.split(' ')[0];
      // this.str = "报名已截止";
    },
    //时间之前  显示报名已截止   24小时内显示 时分秒   24小时以外  显示距离多少天
    initTime(time) {
      //   let str=""
      let data = moment(time); //传进来的时间
      let now = store.state.curTime; //当前
      // 判断是直播还是录播
      if (data.isBefore(now)&&this.hourType==1) {
        this.Turnofftimer();
        this.$emit("clearTimes","正在直播")
        return;
      }else if (data.isBefore(now)&&this.hourType==2) {
        this.Turnofftimer();
        this.$emit("clearTimes","回放已结束")
        return;
      }else if(data.isBefore(now)&&this.hourType==''){
        this.Turnofftimer();
        return;
      }
      let diff = data.diff(now); //毫秒数
      let n = 1000 * 60 * 60 * 24; //一天的毫秒数
      if (Math.abs(diff) > n) {
        //超过一天 显示 月份-天数
        let day=Math.ceil(Math.abs(diff)/n)
        this.str =   day + '天';
        return
      } else {
          let str=moment(Math.abs(diff)).utc().format("HH时mm分ss秒")
          this.str=str
        return
      }
    }
  },
  mounted() {
    let that = this;
    this.datas = that.date;
    this.times(); //直播课倒计时
    this.Interval();
  },
  destroyed(){
    window.clearInterval(this.cleInterval);
  }
};
</script>
<style lang="scss" scoped>
</style>