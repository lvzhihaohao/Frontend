<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="微信授权">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../../static/img/back.png" class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class="mobile_content">
            <article class="text-center">
                <div class="login_content">
                        <div class="XT-login">
                            <img src="../../../../static/mobile_img/XT-login-right.jpg" alt="" style="width:4rem;">
                            <h3 class="fz15 c30 mt-10 jiachu">暄桐教室</h3>
                        </div>
                        <div class="XT-button">
                            <p style="color:#999">微信授权后将获取权限</p>
                        </div>
                        <div class="mt-30">
                            <mt-button  size="large" type="primary" @click.native="handleClick1">确认登录</mt-button>
                        </div>
                </div>
               
            </article>
        </div>
    </div>
</template>
<script>
import {appid,redirect_uri} from '@/public/url.js'
export default {
    name:'weixinempowers',
    // beforeRouteLeave(to, from, next) {
    //      window.localStorage.setItem('WXbackUrl',from.path)
    //      //console.log(from.path)
    //     //  next();
    // },
    created(){
        
    },
    methods:{
        goBack () {
            let url = window.localStorage.getItem("WXbackUrl");
            //console.log(url)
            this.$router.push({
                path:url
            })
        },
        handleClick1 () {
            //拉起微信
            //微信浏览器内登录微信  生产
            window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
            `)
            // uat
            // window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6a0d56eb1c12553b&redirect_uri=https://cr-uat.xuantong.cn/wx/index.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
            // `)

            //构造SendAuthReq结构体
            // Final SendAuth.Req req = new SendAuth.Req();
            // req.scope = "snsapi_userinfo";
            // req.state = "wechat_sdk_demo_test";
            // api.sendReq(req);


            // this.$router.push({
            //     path:'/weixininformation'
            // })
        }
    }
}
</script>
<style lang="scss" scoped>
    .XT-login{
        margin-bottom: 2.8125rem; 
    }
    .jiachu{
        // font-weight: 600;
    }
</style>


