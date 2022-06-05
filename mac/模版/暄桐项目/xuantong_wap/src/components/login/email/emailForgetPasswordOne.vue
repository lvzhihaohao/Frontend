<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="找回密码">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../../static/img/back.png" class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class="mobile_content pl-40 pr-40">
            <div class="email_content">
                <h3 class="">
                    使用邮箱验证:
                </h3>
                <form action="">
                    <mt-field label="" placeholder="邮箱" type="email" v-model="email"
                        @blur.native.capture="emailBlur" @input ='emailInput'
                    ></mt-field>
                    <div class='emailError' ref='email'></div>
                    <mt-field label="" placeholder="请输入六位邮箱验证码"  v-model="captcha"
                         @input='captchaInput' @blur.native.capture="captchaBlur">
                        <!-- <img src="../assets/100x100.png" height="45px" width="100px"> -->
                        <span ref='spn' v-if="!verification" class="captcha" @click.stop='getEmailGetCaptcha'>获取验证码</span>
                        <span ref='spn' v-if="verification" class="captcha">获取验证码</span>
                    </mt-field>
                    <div class='captchaError' ref='captcha'></div>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goEmailForgetPasswordTwo">下一步</mt-button>
                </form>
            </div>
        </div>
        <!-- <Img v-if='flag' @changeImgShow='changeImgShow'/> -->
    </div>
</template>
<script>
import Img from '../../../component/ImgCheck'
import {mapActions,mapState} from 'vuex'
import {emailVerification,captchaVerification,nowTime,captchaDownTime} from '../../../public/index'
export default {
    name:'emailforgetpasswordone',
   data() {
        return {
            email:'',
            captcha:'',
            flag : false,
            RecordPhone:'',
            verification:false
        }
    },
    computed :{
        ...mapState({
             //邮箱验证码返回数据
            captchaData:state=>state.emailStore.captchaData,
            //邮箱检测返回数据
            emailHaveData:state=>state.emailStore.emailHaveData,
            //验证码检测返回数据
            captchaHaveData:state=>state.emailStore.captchaHaveData
        })
    },
    components:{
        Img
    },
    mounted () {
        this.removeHtml()
    },
    methods: {
        ...mapActions({
            //邮箱验证码
            getEmailGetCaptchaAction:'emailStore/getEmailGetCaptchaAction',
            //检测邮箱在不在
            getEmailHaveAction:'emailStore/getEmailHaveAction',
            //检测验证码对不对
            getCaptchaHaveAction:'emailStore/getCaptchaHaveAction'
        }),
        goBack () {
            this.$router.back(-1)
        },
        removeHtml () {
            document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',()=>{
               emailVerification('',this.$refs.email)
            })
            document.getElementsByClassName('mint-field-clear')[1].addEventListener('click',()=>{
                captchaVerification('',this.$refs.captcha)
            })
        },
        emailInput () {
            if(this.$refs.email.innerHTML!=''){
                this.$refs.email.innerHTML='',
                this.$refs.email.style.borderTop='none'
            }
        },
        captchaInput () {
            if(this.$refs.captcha.innerHTML!=''){
                this.$refs.captcha.innerHTML='',
                this.$refs.captcha.style.borderTop='none'
            }
        },
        //判断 验证码是否输入频繁
        async getEmailGetCaptcha () {
            this.verification = true;
            if(this.email == ''){
                this.verification = false;
                this.$Toast('请输入邮箱号')
            }else{
               if(this.$refs.spn.innerHTML=='获取验证码'){
                    // this.flag = true
                    this.RecordPhone=this.email
                     await this.getEmailHaveAction({email:this.email});
                    if(!(this.emailHaveData.result)){
                        this.verification = false;
                        return
                     }
                    this.changeImgShow()
                } 
            
            }
            
        },
        async changeImgShow () {
            this.flag = false;
            if(this.$refs.email.innerHTML == ''){
                await this.getEmailGetCaptchaAction({emailList:[this.email],sendType:2})
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
            }
        },
        //邮箱失焦事件 判断邮箱格式 和 邮箱在不在
        emailBlur () {
             emailVerification(this.email,this.$refs.email)
            setTimeout (async ()=>{
                if(this.email !=''){   
                   
                    if(this.$refs.email && this.$refs.email.innerHTML == ''){
                        await this.getEmailHaveAction({email:this.email});
                        if(!(this.emailHaveData.result)){
                            this.$refs.email.style.borderTop='1px solid #f56c6c';
                            this.$refs.email.innerHTML='邮箱不存在';
                        }
                    } 
                }
            },100)
            
        },
        //检测验证码对不对
        captchaBlur (e) {
            captchaVerification(this.captcha,this.$refs.captcha);
            setTimeout( async ()=>{
                if(captcha !=''){
                  
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
        //判断邮箱是否存在  判断验证码信息  判断验证码是否正确 
        async goEmailForgetPasswordTwo(){
            let email = '', captcha=''
            if(this.RecordPhone!=this.email){
                this.$refs.captcha.innerHTML='验证码错误';
                return
            }
            if(this.$refs.email.innerHTML == ''){
                email =  emailVerification(this.email,this.$refs.email,true)
            }
            if(this.$refs.captcha.innerHTML == ''){
                captcha = captchaVerification(this.captcha,this.$refs.captcha,true);
            }
            await this.commonBlur()
            if(email && captcha && this.captchaData.result && this.emailHaveData.result && 
                this.captchaHaveData.result){
                this.$router.push({
                    path:'/emailforgetpasswordtwo',
                    query:{email:this.email,confirmCode:this.captcha}
                })
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.email_content h3{
    font-weight: 400;
    font-size:1rem;
}
</style>


