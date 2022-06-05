<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="手机登录">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../../static/img/back.png" class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class="mobile_content pl-40 pr-40 ">
            <div class="email_content">
                <h3 class="">
                    你好， <br>欢迎来暄桐
                </h3>
                <form action="">
                    <mt-field label="+86 " class="phoneNum phoneNumTull-lv"  placeholder="手机号" type="tel" v-model="phone"
                        @blur.native.capture="phoneBlur"   @input='phoneInput'
                    ></mt-field>
                    <div class='phoneError' ref='phone'></div>
                    <mt-field label="" placeholder="请输入六位验证码"  :value="captcha" :attr="{ maxlength: 6 }"   @input='captchaInput' @blur.native.capture="captchaBlur" v-model="captcha">
                     <!-- :attr="{oninput:'if(value.length>6)value=value.slice(0,6)'}" -->
                        <!-- <img src="../assets/100x100.png" height="45px" width="100px"> -->
                        <span ref='spn' v-if="!verification" class="captcha" @click.stop='getPhoneGetCaptcha'>获取验证码</span>
                        <span ref='spn' v-if="verification" class="captcha">获取验证码</span>
                    </mt-field>
                    <div class='captchaError' ref='captcha'></div>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="handleClick">登录</mt-button>
                </form>
            </div>
        </div>  
        <!-- <Img v-if='flag'  @changeImgShow='changeImgShow'/>  -->
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import {getCookie,nowTime,captchaDownTime} from '../../../public/index'
import Img from '../../../component/ImgCheck.vue'
import {phoneVerification,captchaVerification} from '../../../public/index'
export default {
    name:'phonecaptcha',
    data() {
        return {
            phone:'',
            captcha:'',
            flag:false,
            RecordPhone:'',//判断手机号
            record:'',
            verification:false
        }
    },
     watch: {
         captcha(newData,oldData){
             if(this.captcha.length>6){
                 //console.log("123")
             }
         }
    },
    components:{
        Img,
    },
    mounted () {
        this.removeHtml()
    },
    computed :{
        ...mapState({
            //手机验证码返回数据
            captchaData:state=>state.phoneStore.captchaData,
            //手机号检测返回数据
            phoneHaveData:state=>state.phoneStore.phoneHaveData,
            //验证码检测返回数据
            captchaHaveData:state=>state.phoneStore.captchaHaveData
        })
       
    },
    methods: {
        ...mapActions({
            //获取手机验证码
            getPhoneGetCaptchaAction:'phoneStore/getPhoneGetCaptchaAction',
            //手机验证码登录
            getPhoneCaptchaLoginAction:'phoneStore/getPhoneCaptchaLoginAction',
            //获取个人信息
            getUserInfoAction:'phoneStore/getUserInfoAction',
            //检测手机号是否存在
            getPhoneHaveAction:'phoneStore/getPhoneHaveAction',
            //检测验证码对不对
            getCaptchaHaveAction:'phoneStore/getCaptchaHaveAction'
        }),
        goBack () {
            this.$router.back(-1)
        },
        removeHtml () {
            document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',()=>{
                phoneVerification('',this.$refs.phone)
            })
            document.getElementsByClassName('mint-field-clear')[1].addEventListener('click',()=>{
                captchaVerification('',this.$refs.captcha)
            })
        },
        //判断 验证码是否输入频繁
        async getPhoneGetCaptcha () {
            this.verification = true;
            if(this.phone == ''){
                this.verification = false;
                this.$Toast('请输入手机号')
            }else{
                if(this.$refs.spn.innerHTML=='获取验证码'){
                    this.RecordPhone=this.phone
                    await this.getPhoneHaveAction({phone:this.phone});
                    if(!(this.phoneHaveData.result)){
                        this.verification = false;
                        return
                    }
                // if(this.$refs.spn.innerHTML=='获取验证码'){
                //     this.flag = true;
                // }
                    this.changeImgShow()
                } 
            }
        },
        //验证成功后触发函数
        async changeImgShow () {
            // return
            this.flag = false;
            if(this.$refs.phone.innerHTML ==''){
                await this.getPhoneGetCaptchaAction({phoneNumList:[this.phone],sendType:2});
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
            // return
            phoneVerification(this.phone,this.$refs.phone)
            setTimeout (async ()=>{
                if(this.phone != ''){
                    if( this.$refs.phone && this.$refs.phone.innerHTML == ''){
                        await this.getPhoneHaveAction({phone:this.phone});
                        if(!(this.phoneHaveData.result)){
                            this.$refs.phone.style.borderTop='1px solid #f56c6c';
                            this.$refs.phone.innerHTML='你的手机号不存在';
                        }
                    }
                } 
            },100) 
        },
         //检测验证码对不对
        captchaBlur (e) {
            // return
            //console.log('jian')
            captchaVerification(this.captcha,this.$refs.captcha)
            setTimeout (async ()=>{
                if(this.captcha !=''){
                    if(!e.relatedTarget){
                        this.commonBlur()
                    }
                }
            },100)
        },
        //封装公共的 失焦请求
        async commonBlur() {
            // return
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
        //手机按键事件
        phoneInput () {
            if(this.$refs.phone.innerHTML!=''){
                this.$refs.phone.innerHTML='',
                this.$refs.phone.style.borderTop='none'
            }
        },
        //密码按键事件
        captchaInput (value) {
            // return
            // if(value.length>6){
            //     value=value.slice(0,6)
            //     this.captcha=value.slice(0,6)
            // }
            // this.captcha=value
            // //console.log(this.captcha,"value",value)
            if(this.$refs.captcha.innerHTML!=''){
                this.$refs.captcha.innerHTML='',
                this.$refs.captcha.style.borderTop='none'
            }
        },
        //判断验证码格式 和 手机号在不在 和 验证码信息
        async handleClick () {
            // return
            let phone = '',captcha = '';
            //console.log(this.captcha,this.phone)
            if(this.RecordPhone!=this.phone){
               this.$refs.captcha.innerHTML='验证码错误';
                return
            }
            //console.log(this.captcha,"1")
            if(this.$refs.phone.innerHTML == ''){
               phone =  phoneVerification(this.phone,this.$refs.phone,true)
            }
             //console.log(this.captcha,"2")
            if(this.$refs.captcha.innerHTML == ''){
                captcha = captchaVerification(this.captcha,this.$refs.captcha,true);
            }
             //console.log(this.captcha,"3")
            if(phone && captcha && this.phoneHaveData.result && this.captchaData.result){
                this.$loading(true)
                let that = this;
                 //console.log(that.captcha,"4")
                let obj={
                    confirmCode:this.captcha,
                    mobile:this.phone,
                    nowTime:new Date().getTime()
                }
                 //console.log(that.captcha,"5")
                await this.getPhoneCaptchaLoginAction(obj);
                 //console.log(that.captcha,"6")
                await info(that);
                 //console.log(that.captcha,"7")
                async function info (that) {
                     //console.log(that.captcha,"8")
                    let getCookies= getCookie() && JSON.parse(getCookie());
                     //console.log(that.captcha,"9")
                    if(getCookies.result==null){
                        that.$loading(false)
                        that.flag=false;
                        that.$refs.captcha.style.borderTop='1px solid #f56c6c';
                        that.$refs.captcha.innerHTML=getCookies.msg;
                         //console.log(that.captcha,"10")
                    }else{
                        that.$Toast('登录成功')
                         //console.log(that.captcha,"13")
                        await that.getUserInfoAction({token:''});
                         //console.log(that.captcha,"11")
                        let path=window.localStorage.getItem('url')
                         //console.log(that.captcha,"12")
                        that.$router.push({
                            path
                        })
                        that.$loading(false)
                        that.$GifToast(true);
                    }
                }
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.email_content{
    margin-top: 4.5rem!important;
}
</style>


