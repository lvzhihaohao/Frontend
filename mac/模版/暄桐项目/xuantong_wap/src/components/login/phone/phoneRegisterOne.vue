<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="手机注册">
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
                    你好， <br>欢迎来暄桐
                </h3>
                <form action="">
                    <mt-field label="+86" class="phoneNum phoneNumTull-lv" placeholder="手机号" type="tel" v-model="phone" 
                        @blur.native.capture="phoneBlur" @input='phoneInput'
                    ></mt-field>
                    <div class='phoneError' ref='phone'></div>
                    <mt-field  placeholder="请输入六位验证码"  :value="captcha" :attr="{ maxlength: 6 }"    @input='captchaInput' 
                        @blur.native.capture="captchaBlur" class='captchaInput' v-model="captcha">
                        <!-- <img src="../assets/100x100.png" height="45px" width="100px"> -->
                        <span ref='spn' v-if="!verification" class="captcha" @click.stop='getPhoneGetCaptcha'>获取验证码</span>
                        <span ref='spn' v-if="verification" class="captcha">获取验证码</span>
                    </mt-field>
                    <div class='captchaError' ref='captcha'></div>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goPhoneRegisterTwo">下一步</mt-button>
                </form>
            </div>
        </div>
        <!-- <Img v-if='flag' @changeImgShow='changeImgShow'/> -->
    </div>
</template>
<script>
import Img from '../../../component/ImgCheck'
import {mapActions,mapState} from 'vuex'
import {phoneVerification,captchaVerification,nowTime,captchaDownTime} from '../../../public/index'
export default {
    name:'phoneregisterone',
    data() {
        return {
            phone:'',
            captcha:'',
            flag:false,
            RecordPhone:'',
            verification:false
        }
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
    components:{
        Img
    },
    mounted () {
        this.removeHtml()
    },
    methods: {
        ...mapActions({
            //手机验证
            getPhoneGetCaptchaAction:'phoneStore/getPhoneGetCaptchaAction',
            //检测手机号在不在
            getPhoneHaveAction:'phoneStore/getPhoneHaveAction',
            //检测验证码对不对
            getCaptchaHaveAction:'phoneStore/getCaptchaHaveAction'
        }),
        goBack () {
            this.$router.back(-1)
        },
        removeHtml() {
            document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',()=>{
                phoneVerification('',this.$refs.phone)
            })
            document.getElementsByClassName('mint-field-clear')[1].addEventListener('click',()=>{
                captchaVerification('',this.$refs.captcha)
            })
        },
        //手机失焦事件 判断手机号格式 和 手机号在不在
        phoneBlur () {
             phoneVerification(this.phone,this.$refs.phone);
            setTimeout (async ()=>{
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
            //console.log('我检测了')
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
                    if(this.phoneHaveData.result == true){
                        this.verification = false;
                        return
                    }
                    // this.flag = true
                    this.changeImgShow()
                } 
                
            }
            
        },
          //验证成功发送验证码
        async changeImgShow () {
            this.flag = false;
            if(this.$refs.phone.innerHTML == ''){  
                await this.getPhoneGetCaptchaAction({phoneNumList:[this.phone],sendType:1});
                //console.log(this.captchaData.result)
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
        //判断手机号是否存在  判断验证码信息  判断验证码是否正确 
        async goPhoneRegisterTwo(){
            let phone='',captcha = ''
            // alert('555')
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
                this.$router.push({
                    path:'/phoneregistertwo',
                    query:{mobible:this.phone,confirmCode:this.captcha}
                })
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


