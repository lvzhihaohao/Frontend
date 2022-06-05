<template>
  <div class="app-living-room" ref="ll">
    <!-- 弃用 -->
    <!-- <iframe :src="" frameborder="0" width="100%" height="100%" lang="zh"></iframe> -->
  </div>
</template>
<script>
  import moment from "moment"
import {livingUrl} from '@/public/url.js'
import {getUserInfoCookie,getCookie} from '../../../public/index'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
// import {
// //   Message
// } from 'element-ui';
export default {
  async created() {
    //认证请求
    let uid = moment().valueOf();
    let token = JSON.parse(getCookie()).result
    // //console.log() 
    let res = await this.$axios.post("/userclasshour/play", {
      uid,
      classhourId: this.$route.query.id,
      token: ""
    });
    //console.log(res.data.result,'data')
    if(res.data.code==0){
        //  this.src = res.data.result.url
         if(res.data.result.code==1){
            //重定向到首页
             this.$router.push({
              path:'index/indexShouye',
            })
            this.$ModelToast(true)
         }
         else if(res.data.result.code==2){
           //未登录到课程详情
             this.$router.push({
                path:'/chanjiedetail',
                query:{id:res.data.result.courseId}
            })
              this.$Toast("报名后可以查看详情哦")
         }
         else if (res.data.result.code==3){
            this.src = res.data.result.url
            // window.location.href=this.src;
         }
    }

    // if(res.data.code == 0){
    //       this.src = `${livingUrl}/userclasshour/play?token=${
    //       token
    //     }&classhourId=${this.$route.query.id}`;
    //     // this.src="http://xtedu.gensee.com/training/site/s/50157369?nickname=yy&uid=123456789&k=5a139c4aa7329727c851442a7002a880"
    // }
    // if(res.data.result.code == 1){
    //     // this.$Toast({})
    //     this.$router.push({
    //       path:'index/indexShouye',
    //     })
    //     this.$ModelToast(true)
    // }else if(res.data.result.code == 2){
    //     this.$router.push({
    //             path:'/chanjiedetail',
    //             query:{id:res.data.result.courseId}
    //      })
    //       this.$Toast("报名后可以查看详情哦")
    // }


    // if (data.code == 0) {
    //   //code  0  成功  1 首页  2课程详情页
    //   if (data.result.code == 0) {
    //     this.src = `http://118.190.202.65:8086/userclasshour/play?token=${
    //       this.token
    //     }&classhourId=${this.$route.query.id}`;
    //   } else if (data.result.code == 1) {
    //     //重定向到首页
    //     Message({
    //       duration: 2000,    
    //       message: "请先登录",
    //       type: "warning"
    //     });
    //     this.$router.push("/");
    //   } else if (data.result.code == 2) {
    //     //重定向到课程详情页
    //     Message({
    //       duration: 2000,
    //       message: "请先购买此课程",
    //       type: "warning"
    //     });
    //     this.$router.push({
    //       name: "singleOrder",
    //       query: { courseId: data.result.courseId }
    //     });
    //   }
    // }
  },
  data() {
    return {
      src:"", 
      // csrc:'https://cr-api-uat.xuantong.cn', //拉起微信  uat接口i
      csrc:'https://cr-api.xuantong.cn'   //生产接口
    };
  },
  computed: {
     ...mapState({
      token: state => state.system.token //用户token
    })
  },
  mounted() {
    // let html=localStorage.getItem('callbackHTML')
    // this.$refs.ll.innerHTML=html;
    // //console.log(document.body)
    // document.body.innerHTML=html
    // document.close();
  }
};
</script>
<style lang="scss">
.app-living-room {
  width: 100%;
  height: 100%;
}
</style>


