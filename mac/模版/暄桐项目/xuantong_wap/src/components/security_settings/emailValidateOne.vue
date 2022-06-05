<template>
    <div id='#app'>
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="邮箱验证">
                <a href="javascript:void(0)" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png"  class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
         <div class="mobile_content pl-40 pr-40">
            <div class="email_content">
                <h3 class="text-center">
                    已发送邮件至<br/>{{this.userInfo.email}}：
                </h3>
                <form action="">
                    <mt-field label="" placeholder="请输入六位邮箱验证码" type="number" v-model="captcha"
                     @input='captchaInput'  @blur.native.capture="captchaBlur">
                        <!-- <img src="../assets/100x100.png" height="45px" width="100px"> -->
                        <span ref='spn' v-if="!verification" class="captcha" @click.stop='getEmailGetCaptcha'>获取验证码</span>
                        <span ref='spn' v-if="verification" class="captcha">获取验证码</span>
                    </mt-field>
                    <div class='captchaError' ref='captcha'></div>
                    <p :class="isiOS?'c9 fz15 mt-15 pl-8':'c9 fz15 mt-15'">请前往邮箱查看</p>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goNext">下一步</mt-button>
                </form>
            </div>
        </div>
        <!-- <Img v-if='flag' @changeImgShow='changeImgShow'/> -->
    </div>
</template>
<script>
import Img from '../../component/ImgCheck.vue'
import {mapState,mapActions} from 'vuex'
import {captchaVerification,captchaDownTime,getUserInfoCookie,nowTime} from '../../public/index'
export default {
    name:'emailvalidate',
    data () {
        return {
            captcha:'',
            userInfo:{},
            flag:false,
            isiOS:false,
            verification:false
        }
    },
    components:{
        Img    
    },
    computed:{
        ...mapState({
             //邮箱验证码返回数据
            captchaData:state=>state.emailStore.captchaData,
             //验证码检测返回数据
            captchaHaveData:state=>state.emailStore.captchaHaveData
        })
    },
    beforeRouteEnter (to,from,next) {
        let emailValidateOneUrls = window.localStorage.getItem('emailValidateOneUrl');
        if(from.path == '/changeemail' || from.path =='/changephone' || from.path=='/changepassword'){
            next(vm=>{
                // vm.needCaptcha()
            })
        }
        if(from.fullPath =='/changeemail' || from.fullPath == '/emailboundsecurity'){
            window.localStorage.setItem('emailValidateOneUrl','/emailboundsecurity')
        }else if(from.fullPath =='/changephone' || from.fullPath == '/phoneboundsecurity'){
            window.localStorage.setItem('emailValidateOneUrl','/phoneboundsecurity')
        }else if(from.path == '/changepassword' || from.path=='/emailvalidatetwo'){
            window.localStorage.setItem('emailValidateOneUrl','/emailvalidatetwo')
        }else{
             if(emailValidateOneUrls){
                window.localStorage.setItem('emailValidateOneUrl',emailValidateOneUrls)
            }
        }
        next()
    },
    mounted () {
        let u = navigator.userAgent;
        this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        this.userInfo = JSON.parse(getUserInfoCookie())
        // this.removeHtml()
    },
    methods:{
        ...mapActions({
            //邮箱验证码
            getEmailGetCaptchaAction:'emailStore/getEmailGetCaptchaAction',
            //检测验证码对不对
             getCaptchaHaveAction:'emailStore/getCaptchaHaveAction'
        }),
        goBack () {
            this.$router.back(-1)
        },
        removeHtml () {
            document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',()=>{
                captchaVerification('',this.$refs.captcha)
            })
        },
         //检测验证码对不对 验证码格式
        captchaBlur (e) {
             captchaVerification(this.captcha,this.$refs.captcha);
            setTimeout(async ()=>{
                if(this.captcha !=''){
                   
                    if(!e.relatedTarget){
                       this.commonBlur()
                    }
                }  
            },100)
        },
        //封装公共的 失焦请求
        async commonBlur() {
            if(this.$refs.captcha.innerHTML == ''){
                let data ={
                    confirmCode:this.captcha,
                    findWay:this.email,
                    nowTime:nowTime(),
                    type:2,
                    isExist:false
                }
                await this.getCaptchaHaveAction(data);
                if(!(this.captchaHaveData.result)||this.captchaHaveData.result==null){
                    this.$refs.captcha.style.borderTop='1px solid #f56c6c';
                    this.$refs.captcha.innerHTML=this.captchaHaveData.msg;
                }
            }
        },
        //检测验证码是否频繁  检测验证码对不对
        async goNext () {
            let captcha = '';
             if(this.$refs.captcha.innerHTML == ''){
                captcha = captchaVerification(this.captcha,this.$refs.captcha,true);
            }
            await this.commonBlur()
            let emailValidateOneUrl = window.localStorage.getItem('emailValidateOneUrl')
            if(captcha && this.captchaData.result && this.captchaHaveData.result){
                this.$router.push({
                    path:emailValidateOneUrl, 
                    query:{email:this.userInfo.email,confirmCode:this.captcha}
                })
            }
        },
        //检测验证码是否发送频繁
        async getEmailGetCaptcha () {
            if(this.$refs.spn.innerHTML=='获取验证码'){
                // this.flag = true;
                this.verification = true
                 this.needCaptcha()
            }
        },
        //图形验证成功 发送验证码
        async changeImgShow () {
            this.flag = false;
            this.verification = true
            this.needCaptcha()
        },
         //封装验证码函数判断是否需要 图形验证
        async needCaptcha(){
            let sendType = this.$route.query.type
            await this.getEmailGetCaptchaAction({emailList:[this.userInfo.email],sendType:sendType})
            if(!this.captchaData.result){
                this.verification = false
                this.$refs.captcha.style.borderTop='1px solid #f56c6c';
                this.$refs.captcha.innerHTML=this.captchaData.msg;
            }else{   
                captchaDownTime(this.$refs.spn)
                setTimeout(()=>{
                    this.verification = false;
                },2000)
            }
        },
        captchaInput () {
             if(this.$refs.captcha.innerHTML!=''){
                this.$refs.captcha.innerHTML='',
                this.$refs.captcha.style.borderTop='none'
            }
        },
    }

}
</script>

<style lang="scss" scoped>
.text-center{
    font-size: 1.125rem;
}
.email_content{
    margin-top: 4.5rem!important;
}
</style>


