<template>
    <section style="display:inline-block">
        {{str}}
        {{daystr}}
    </section>
</template>
<script>
    export default {
        data(){
            return {
                str:'',
                cleInterval:null,
                daystr:'',
                datas:null
            }
        },
        props:{
            date:{
                type:null
                //报名截止 直播课程
            },
            day:{
                //多少天之后 录播课程 学习有效期
                type:null
            }
        },
        methods:{
            times(){
                //倒计时
                
                if(this.datas==null){
                     return this.str="";
                }else{
                    
                // var arr = this.datas.split('-')
                // var yearVal = arr[0]   //年
                // var monthVal = arr[1]  //月
                // var dayVal = arr[2]    //日
                // var dayList = arr[2].split(' ')[1] //时分秒
                // var daylisthouse = dayList.split(':')[0] //时
                // var daylistminutes = dayList.split(':')[1] //分
                // var daylistseconds = dayList.split(':')[2].split('.')[0] //秒
                ////console.log(daylisthouse,daylistminutes,daylistseconds)
                var dateNow = new Date()
                var dateExam = new Date(this.datas.split('.')[0]);
                // //console.log(dateExam)
                if(dateExam <= dateNow){
                    return   this.Turnofftimer();
			    }
                var range = dateExam - dateNow;
                var dayTimeStamp = 24*60*60*1000,
				hoursTimeStamp = 60*60*1000,
				minutesTimeStamp = 60*1000,
                secondsTimeStamp = 1000;
                var days = Math.floor(range/dayTimeStamp),
				hours = Math.floor(range%dayTimeStamp/hoursTimeStamp),
				minutes = Math.floor(range%hoursTimeStamp/minutesTimeStamp),
                seconds = Math.floor(range%minutesTimeStamp/secondsTimeStamp);
                if(days==0){
                    this.str= "剩余" + hours + "小时" + this.auto(minutes) + "分" + this.auto(seconds) + "秒,抓紧报名";
                }else{
                    this.str= "剩余"+days  + "天,抓紧报名";
                }
                }
            },
            //小于2位数加0
          auto(zero){
              if(zero<10){
                  return '0' + zero
              }else{
                  return zero
              }
          },
           //倒计时开始
          Interval(){
             
              let that = this;
              this.cleInterval = setInterval(function(){
				that.times();
                },1000);
          },
          //关闭定时器
          Turnofftimer (){
              clearInterval(this.cleInterval)
              this.str="报名已截至";
          },
          days(){
              if(this.day==undefined){
                  return
              }else{
                  //学习有效期     录播
                  var dateYear = new Date().getFullYear()
                  var dateMonth = new Date().getMonth()+1
                  var dateDate = new Date()
                  var newdateDate = new Date(dateDate)
                   newdateDate.setDate(dateDate.getDate()+this.day)
                  var dateExam = new Date(dateYear,dateMonth - 1,dateDate);
                  this.daystr= 
                  dateYear+"."+dateMonth+"."+newdateDate.getDate();
              }
          }
        },
        mounted() {
            let that = this;
            this.datas = that.date
            that.times()   //直播课倒计时
            that.Interval()
            this.days()   //录播课有效期
        }
    }
</script>
<style lang="scss" scoped>

</style>