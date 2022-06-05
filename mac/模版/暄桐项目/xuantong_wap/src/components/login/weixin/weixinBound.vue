<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="微信绑定">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../../static/img/back.png" class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class="mobile_content pl-40 pr-40">
            <div class="email_content">
                <form action="">
                    <mt-field label="+86" placeholder="微信号" type="tel" v-model="weixin"
                        @blur.native.capture="weixinBlur"
                    ></mt-field>
                    <div class='weixinError' ref='weixin'></div>
                    <mt-field label="" placeholder="六位验证码" :value="captcha" :attr="{ maxlength: 6 }"  v-model="captcha">
                        <!-- <img src="../assets/100x100.png" height="45px" width="100px"> -->
                        <span class="captcha" @click='getPhoneGetCaptcha'>获取验证码</span>
                    </mt-field>
                    <div class='captchaError' ref='captcha'></div>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goPhoneForgetPasswordTwo">下一步</mt-button>
                </form>
            </div>
            <div>境外用户请登录邮箱绑定</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'phonebound',
    methods:{
        goBack () {
            this.$router.back(-1)
        },
    }
}
</script>
<style lang="scss" scoped>

</style>


