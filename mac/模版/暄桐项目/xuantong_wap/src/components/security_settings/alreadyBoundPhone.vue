<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="手机绑定">
                  <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
                <!-- <mt-button icon="more" slot="right"></mt-button> -->
            </mt-header>
        </article>
        <img src="../../../static/img/back.png"  class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'> 
        <div class="mobile_content pl-40 pr-40">
            <div class="email_content">
                <div class="text-center">已经绑定手机号{{obj.phoneNum}}</div>
                <form action="">
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goChangePhone">更换绑定手机号</mt-button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {getUserInfoCookie,setUserInfoCookie} from '../../public/index'
export default {
    name:'alreadyboundphone',
    data () {
        return {
            obj:{}
        }
    },
    async mounted () {
         this.$axios
          .post("/user/getuserinfo", {
            token: ""
          })
          .then(res => {
            setUserInfoCookie(res.data.result)
            this.obj = res.data.result;
            let phone=this.obj.phoneNum.split("")
            phone.splice(3,4,"****")
            let phoneList = phone.join("")
            this.obj.phoneNum=phoneList;
        });
    },
    methods:{
        goBack () {
            this.$router.back(-1)
        },
        //去往更改手机页面
        goChangePhone () {
            this.$router.push({
                path:"/changephone"
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.email_content{
    margin-top:2.5rem;
}
</style>


