<template>
     <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="手机绑定">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png"  class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class="mobile_content pl-40 pr-40">
            <div class="email_content">
                <form action="">
                    <mt-field label="+86" class="phoneNum phoneNumTull-lv" placeholder="手机号" type="tel" v-model="phone"
                        @blur.native.capture="phoneBlur"  @input='phoneInput'
                    ></mt-field>
                    <div class='phoneError' ref='phone'></div>
                    <mt-field label="" placeholder="请输入六位验证码" :value="captcha" :attr="{ maxlength: 6 }"  @input='captchaInput'
                     @blur.native.capture="captchaBlur" v-model="captcha" >
                        <!-- <img src="../assets/100x100.png" height="45px" width="100px"> -->
                        <span ref='spn' v-if="!verification" class="captcha" @click.stop='getPhoneGetCaptcha'>获取验证码</span>
                        <span ref='spn' v-if="verification" class="captcha">获取验证码</span>
                    </mt-field>
                    <div class='captchaError' ref='captcha'></div>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goSuccess">完成</mt-button>
                </form>
            </div>
        </div>
        <!-- <Img v-if='flag' @changeImgShow='changeImgShow'/> -->
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import {getUserInfoCookie,nowTime,captchaDownTime} from '../../public/index'
import Img from '../../component/ImgCheck.vue'
import {phoneVerification,captchaVerification,getCookie} from '../../public/index'
export default {
    name:'phoneboundsecurity',
    data () {
        return {
            phone:'',
            captcha:'',
            flag:false,
            userInfo:{},
            RecordPhone:'',
            isiOS:false,
            verification:false
        }
    },
    components:{
        Img
    },
    mounted () {
        let u = navigator.userAgent;
        this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(this.$route.query.type=='emailBadng'){
            this.removeHtml()
        }else{
              this.userInfo = JSON.parse(getUserInfoCookie());
              this.removeHtml()
        }
    },
    computed :{
        ...mapState({
             //邮箱验证码返回数据
            captchaData:state=>state.phoneStore.captchaData,
             //手机号检测返回数据
            phoneHaveData:state=>state.phoneStore.phoneHaveData,
            //验证码检测返回数据
            captchaHaveData:state=>state.phoneStore.captchaHaveData,
            //手机绑定返回数据
            phoneBoundSecurityData:state=>state.securityPhoneStore.phoneBoundSecurityData
        })
    },
    beforeRouteEnter (to,from,next) {
        let phoneboundsecurityUrl = window.localStorage.getItem('phoneboundsecurityUrl')
        if(from.path=='/phonevalidateone' || from.path=='/emailvalidateone'|| from.path=='/securitysettings'){
            window.localStorage.setItem('phoneboundsecurityUrl','/securitysettings')
        }else if(from.path=='/boundlogin'){
            window.localStorage.setItem('phoneboundsecurityUrl','/index/indexshouye')
        }else if(from.path=='/'){
            if(phoneboundsecurityUrl){
                window.localStorage.setItem('phoneboundsecurityUrl',phoneboundsecurityUrl)
            }
        }else{
        }
        next()
    },
    methods:{
        ...mapActions({
            getPhoneGetCaptchaAction:'phoneStore/getPhoneGetCaptchaAction',//手机验证码
            getPhoneBoundSecurityAction :'securityPhoneStore/getPhoneBoundSecurityAction',//手机绑定
              //检测手机号在不在
            getPhoneHaveAction:'phoneStore/getPhoneHaveAction',
            //检测验证码对不对
            getCaptchaHaveAction:'phoneStore/getCaptchaHaveAction',
            //邮箱注册
            getEmailRegisterAction:'emailStore/getEmailRegisterAction',
            //获取个人信息
            getUserInfoAction:'phoneStore/getUserInfoAction',
        }),
        goBack () {
            this.$router.back(-1)
        },
        removeHtml() {
            document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',()=>{
                phoneVerification('',this.$refs.phone)
            }),
            document.getElementsByClassName('mint-field-clear')[1].addEventListener('click',()=>{
                captchaVerification('',this.$refs. captcha)
            })
        },
        //检测验证码是否输入频繁
        async getPhoneGetCaptcha () {
            this.verification = true;
            if(this.phone == ''){
                this.verification = false;
                 this.$Toast('请输入手机号')
            }else{
                if(this.$refs.spn.innerHTML=='获取验证码'){
                    // this.flag = true;
                     await this.getPhoneHaveAction({phone:this.phone});
                        if(this.phoneHaveData.result == true){
                            this.verification = false;
                            return
                        }
                     this.RecordPhone=this.phone
                    this.changeImgShow()
                }  
            }
        },
        async changeImgShow () {
            this.flag = false;
            if(this.$refs.phone.innerHTML == ''){
                await this.getPhoneGetCaptchaAction({phoneNumList:[this.phone],sendType:4});
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
        //手机失焦事件 判断手机号格式 和 手机号在不在
        phoneBlur () {
             phoneVerification(this.phone,this.$refs.phone)
            setTimeout(async ()=>{
                if(this.phone !=''){
                   
                    if(this.$refs.phone && this.$refs.phone.innerHTML == ''){
                        await this.getPhoneHaveAction({phone:this.phone});
                        if(this.phoneHaveData.result == true){
                            this.$refs.phone.style.borderTop='1px solid #f56c6c';
                            this.$refs.phone.innerHTML='你的手机号已存在,请重新输入';
                        }
                    }  
                }
            },100)
        },
        //检测验证码对不对
        captchaBlur (e) {
             captchaVerification(this.captcha,this.$refs.captcha);
            setTimeout (async ()=>{{
                if(this.captcha !=''){
                   
                    if(!e.relatedTarget){
                        this.commonBlur()  
                    }
                }    
            }},100)
        },
         //封装公共的 失焦请求
        async commonBlur() {
            if(this.$refs.captcha.innerHTML == ''){
                let data ={
                    confirmCode:this.captcha,
                    findWay:this.phone,
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
        phoneInput () {
            if(this.$refs.phone.innerHTML!=''){
                this.$refs.phone.innerHTML='',
                this.$refs.phone.style.borderTop='none'
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
         //判断手机号是否存在  判断验证码信息  判断验证码是否正确 
        async goSuccess () {
           
            let phone = '', captcha=''
            //console.log(this.RecordPhone,this.phone)
            if(this.RecordPhone!=this.phone){
                this.$refs.captcha.innerHTML='验证码错误';
                return
            }
            if(this.$refs.phone.innerHTML == ''){
                phone =  phoneVerification(this.phone,this.$refs.phone,true)
            }
            if(this.$refs.captcha.innerHTML == ''){
                captcha = captchaVerification(this.captcha,this.$refs.captcha,true);
            }
            await this.commonBlur()
            if(phone && captcha && this.captchaData.result && this.phoneHaveData.result == false &&
                this.captchaHaveData.result){
                    this.$loading(true)
                    if(this.$route.query.type=='emailBadng'){
                        let EmailObj =  window.localStorage.getItem('EmailObj')
                        await this.getEmailRegisterAction(JSON.parse(EmailObj)) 
                        let getCookies= getCookie() && JSON.parse(getCookie()); 
                        await this.getUserInfoAction({token:getCookies.result});
                        this.userInfo = JSON.parse(getUserInfoCookie());
                    }
                let that = this;
                let data ={
                    confirmCode:this.captcha,
                    mobile:this.phone,
                    nowTime:nowTime(),
                    studentId:this.userInfo.studentId
                }
                await this.getPhoneBoundSecurityAction(data);
                await info(that);
                async function info (that) {
                    let phoneboundsecurityUrl = window.localStorage.getItem('phoneboundsecurityUrl')
                    if(!that.phoneBoundSecurityData.result){
                        that.$loading(false)
                        that.flag=false;
                        that.$refs.phone.style.borderTop='1px solid #f56c6c';
                        that.$refs.phone.innerHTML=that.phoneBoundSecurityData.msg;
                    }else{
                        that.$loading(false)
                        that.$Toast('手机绑定成功')
                        that.$router.push({
                            path:phoneboundsecurityUrl
                        })
                        if(that.$route.query.type=='emailBadng'){
                            that.$GifToast(true);
                        }
                    }
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
</style>


