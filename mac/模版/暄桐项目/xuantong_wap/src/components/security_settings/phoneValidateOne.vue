<template>
    <div id='#app'>
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="手机验证">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png"  class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
         <div class="mobile_content pl-40 pr-40">
            <div class="email_content">
                <h3 class="text-center">
                    已发送短信至{{this.userInfo.phoneNum}}：
                </h3>
                <form action="">
                    <mt-field label="" placeholder="请输入六位验证码"  :value="captcha"  :attr="{ maxlength: 6 }"
                        @input='captchaInput'  @blur.native.capture="captchaBlur" v-model="captcha">
                        <!-- <img src="../assets/100x100.png" height="45px" width="100px"> -->
                        <span ref='spn' v-if="!verification" class="captcha" @click.stop='getCaptcha'>获取验证码</span>
                        <span ref='spn' v-if="verification" class="captcha">获取验证码</span>
                    </mt-field>
                    <div class='captchaError' ref='captcha'></div>
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
    name:'phonevalidate',
    data () {
        return {
            captcha:'',
            userInfo:{},
            flag:false,
            phoneNums:'',
            verification:false
        }
    },
    components:{
        Img    
    },
    beforeRouteEnter (to,from,next) {
        let phoneValidateOneUrls = window.localStorage.getItem('phoneValidateOneUrl');
         if(from.path == '/changeemail' || from.path =='/changephone' || from.path=='/changepassword'){
            next(vm=>{
                // vm.needCaptcha()
            })
        }
        if(from.fullPath =='/changephone' || from.fullPath == '/phoneboundsecurity'){
            window.localStorage.setItem('phoneValidateOneUrl','/phoneboundsecurity')
        }else if(from.fullPath =='/changeemail' || from.fullPath == '/emailboundsecurity'){ 
            window.localStorage.setItem('phoneValidateOneUrl','/emailboundsecurity')
        }else if(from.path == '/changepassword'  || from.path=='/phonevalidatetwo'){
            window.localStorage.setItem('phoneValidateOneUrl','/phonevalidatetwo')
        }else{
            if(phoneValidateOneUrls){
                window.localStorage.setItem('phoneValidateOneUrl',phoneValidateOneUrls)
            }
        }
        next()
    },
    computed :{
        ...mapState({
             //邮箱验证码返回数据
            captchaData:state=>state.phoneStore.captchaData,
            //验证码检测返回数据
            captchaHaveData:state=>state.phoneStore.captchaHaveData
        })
    },
    methods: {
        ...mapActions({
            getPhoneGetCaptchaAction:'phoneStore/getPhoneGetCaptchaAction',//手机验证码
            //检测验证码对不对
            getCaptchaHaveAction:'phoneStore/getCaptchaHaveAction'
        }),
        goBack () {
            this.$router.back(-1)
        },
        removeHtml() {
            document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',()=>{
                captchaVerification('',this.$refs.captcha)
            })
        },
        //判断 验证码对不对  验证码信息 去往下一个页面
        async goNext () {
            let captcha = '';
            if(this.$refs.captcha.innerHTML == ''){
                captcha = captchaVerification(this.captcha,this.$refs.captcha,true);
            }
            await this.commonBlur()
            let phoneValidateOneUrl = window.localStorage.getItem('phoneValidateOneUrl')
            if(captcha && this.captchaData.result && this.captchaHaveData.result){
                this.$router.push({
                    path:phoneValidateOneUrl,
                    query:{mobile:this.phoneNums,confirmCode:this.captcha}
                })
            }
        },
        //检测验证码是否发送频繁
        async getCaptcha () {
               
            if(this.$refs.spn.innerHTML=='获取验证码'){
                // this.flag =true
                this.verification = true;
                this.needCaptcha()
            }
        },
        //图形验证成功 发送验证码
        changeImgShow () {
            this.flag = false;
             this.verification = true;
            this.needCaptcha()
        },
        //封装验证码函数判断是否需要 图形验证
        async needCaptcha(){
            let sendType = this.$route.query.type
            await this.getPhoneGetCaptchaAction({phoneNumList:[this.phoneNums],sendType:sendType})
            if(!this.captchaData.result){
                this.verification = false;
                this.$refs.captcha.style.borderTop='1px solid #f56c6c';
                this.$refs.captcha.innerHTML=this.captchaData.msg;
            }else{   
                captchaDownTime(this.$refs.spn)
                setTimeout(()=>{
                    this.verification = false;
                },2000)
            }
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
                    findWay:this.phoneNums,
                    nowTime:nowTime(),
                    type:1,
                    isExist:false
                }
                await this.getCaptchaHaveAction(data);
                if(!(this.captchaHaveData.result)||this.captchaHaveData.result==null){
                    this.$refs.captcha.style.borderTop='1px solid #f56c6c';
                    this.$refs.captcha.innerHTML=this.captchaHaveData.msg;
                }
            }
        },
        captchaInput (value) {
            // if(value.length>6){
            //     value=value.slice(0,6)
            //     this.captcha=value.slice(0,6)
            //     //console.log(this.captcha,value)
            // }
            // this.captcha=value
             if(this.$refs.captcha.innerHTML!=''){
                this.$refs.captcha.innerHTML='',
                this.$refs.captcha.style.borderTop='none'
            }
        },
            
    },  
    async mounted () {
        let  userInfo = JSON.parse(getUserInfoCookie())
        this.userInfo=userInfo;
        this.phoneNums=userInfo.phoneNum
        //console.log(this.phoneNums,'this.phoneNumsthis.phoneNums')
        let phone=this.userInfo.phoneNum.split("")
        phone.splice(3,4,"****")
        let phoneList = phone.join("")
        //console.log(this.userInfo)
        this.userInfo.phoneNum=phoneList;
        // this.removeHtml()
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


