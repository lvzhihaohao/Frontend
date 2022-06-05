<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="填写信息">
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
                    <mt-field label="" placeholder="昵称"  v-model="nickname"
                        @blur.native.capture="nickNameBlur"> </mt-field>
                    <div class='nicknameError' ref='nickname'></div>
                    <mt-field label="" placeholder="密码 (8-16位数字+字母的组合)" type='password' v-model="password"
                        @blur.native.capture="passwordBlur"> </mt-field>
                    <div class='passwordError' ref='password'></div>
                    <mt-field label="" placeholder="再次确认密码" type='password' v-model="passwordTwo"
                        @blur.native.capture="passwordTwoBlur"
                    > </mt-field>
                    <div class='passwordTwoError' ref='passwordTwo'></div>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goPrevPage">完成</mt-button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'weixininformation',
    methods:{
        goBack () {
            this.$router.push({
                path:"/weixinempowers"
            })
        },
        goPrevPage () {
            this.$router.push({
                path:'/boundlogin'
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

