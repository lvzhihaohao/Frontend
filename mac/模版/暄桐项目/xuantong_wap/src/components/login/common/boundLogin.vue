<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="绑定选择">
                <router-link to="/" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
        </article>
        <img src="../../../../static/img/back.png" class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class="mobile_content">
            <article class="text-center">
                <div class="login_content">
                        <div class="XT-login">
                            <img src="../../../../static/mobile_img/XT-login-right.jpg" alt="" style="width:3.5rem;">
                            <h3 class="fz15 c30 mt-10">暄桐教室</h3>
                        </div>
                        <div v-if='registerType == "email"'>
                            <div >
                                <mt-button size="large" type="primary" @click.native="handleClick">大陆手机号绑定</mt-button>
                            </div> 
                           <div class="XT-button mt-40">
                            <!-- <mt-button size="large" type="primary" @click.native="handleClick">使用微信绑定</mt-button> -->
                            <mt-button size="large" type="primary" @click.native="handleClick1">使用微信绑定</mt-button>

                            </div>
                        </div>
                        <div v-else>
                            <div class="">
                                <mt-button size="large" type="primary" @click.native="handleClick3">大陆手机号绑定</mt-button>
                            </div>
                           <div class="XT-button mt-40">
                            <!-- <mt-button size="large" type="primary" @click.native="handleClick">使用微信绑定</mt-button> -->
                            <mt-button size="large" type="primary" @click.native="handleClick2">海外用户请使用邮箱绑定</mt-button>
                            </div>
                        </div>
                </div>
            </article>
        </div>
    </div>
</template>
<script>
import {appid,redirect_uri} from '@/public/url.js'
export default {
    name:"boundLogin",
    data() {
        return {
            registerType:''
        }
    },
    watch: {

    },
    mounted () {
        if(this.$route.query.registerType=='WX'){
            //console.log('我没有问题')
            return
        }
        if(this.$route.query.registerType){
            this.registerType = this.$route.query.registerType
            window.localStorage.setItem('registerType',this.registerType)
        }else{
            this.registerType =  window.localStorage.getItem('registerType')
        }
    },
    methods: {
        //微信绑定
        handleClick1: function () {
            if(!this.$flag){
                    this.$Toast('请您在微信客户端内操作')
            }else{
            //拉起微信  生产
                      window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=Bang#wechat_redirect
                    `) 
             }
            //uat
        //    window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6a0d56eb1c12553b&redirect_uri=https://cr-uat.xuantong.cn/wx/index.html&response_type=code&scope=snsapi_userinfo&state=Bang#wechat_redirect
        //    `) 
        },
        //手机绑定
        handleClick () { 
            this.$router.push({
                path:'/phoneboundsecurity',
                query:{type:'emailBadng'}
            })
        },
        //邮箱绑定
        handleClick2 () {
            //console.log("1235")
            this.$router.push({
                path:'/WXElogin',
                query:{
                    type:'login'
                }
            })
        },
        //手机绑定
        handleClick3(){
            this.$router.push({
                path:'/WXPlogin',
                query:{
                    type:'login'
                }
            })
        },
        goBack(){
            this.$router.push({
                path:"/",
            })
        }
    }
}
</script>
<style lang="scss" scoped>
</style>


