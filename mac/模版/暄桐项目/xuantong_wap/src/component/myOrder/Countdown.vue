<template>
    <section style="display:inline-block">
        
    </section>
</template>

<script>
import {formData} from "@/public/utils"
export default {
    props:{
        str:{
            type:null
        },
        item:{
            type:null
        },
        cancelOrder:{
            type:null
        }
    },
    data(){
        return{
            cleInterval: null,
        }
    },
    mounted() {
        this.Interval()
    },
    methods: {
            Interval() {
            let that = this;
            this.cleInterval = setInterval(function() {
                that.getTime();
            }, 1000);
        },
        getTime(){
               var dateExam = new Date(formData(this.str,"utc","add").replace(/-/g, '/'));
                var dateExams = new Date(formData(this.str,"utc","add").replace(/-/g, '/'));
                dateExams.setMinutes(dateExams.getMinutes () + 31);
                var dateNow = new Date();
                var range = dateExams - dateNow ;
                var dayTimeStamp = 24 * 60 * 60 * 1000,
                hoursTimeStamp = 60 * 60 * 1000,
                minutesTimeStamp = 60 * 1000,
                secondsTimeStamp = 1000;
                var days = Math.floor(range / dayTimeStamp),
                hours = Math.floor((range % dayTimeStamp) / hoursTimeStamp),
                minutes = Math.floor((range % hoursTimeStamp) / minutesTimeStamp),
                seconds = Math.floor((range % minutesTimeStamp) / secondsTimeStamp);
                if(minutes<=0){
                     clearInterval(this.cleInterval);
                     this.cancelOrder(this.item)
                    //  this.$emit("cancelOrder",this.item)
                     //console.log('ok')
                }else{
                    // //console.log(minutes + "分" +  seconds + "秒")
                }
        }
    },
}
</script>

<style>

</style>
