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
        <div class="mobile_content pl-40 pr-40">
            <div class="email_content">
                <h3 class="">
                    你好， <br>欢迎来暄桐
                </h3>
                <form action="">
                    <mt-field class="phoneNum phoneNumTull-lv"  label="+86" placeholder="手机号" type="tel" v-model="phone"
                        @input='phoneInput'  @blur.native.capture="phoneBlur" 
                    ></mt-field>
                    <div class='phoneError' ref='phone'></div>
                    <mt-field class="passInputWord"  placeholder="密码" type="password" v-model="password"
                        @input='passwordInput' @blur.native.capture="passwordBlur"
                    > </mt-field>
                    <div class='passwordError' ref='password'></div>
                    <p class="c9 fz15 mt-15">
                        <a href="javascript:void(0)" class="c9 " @click='goPhoneForgetPasswordOne'>找回密码</a>
                        <a href="javascript:void(0)" class="fr c4a5" @click='goPhoneRegisterOne'>手机注册</a>
                    </p>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="handleClick" 
                        style='letterSpacing:5px;padding-right:0.2rem' >登录</mt-button>
                    <mt-button class="mt-20" size="large" type="default" @click.prevent="goPhoneCaptchaLogin">手机验证码登录</mt-button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import {getCookie} from '../../../public/index'
import {phoneVerification,passwordVerification} from '../../../public/index'
export default {
    name:'phonelogin',
    data() {
        return {
            phone:'',
            password:'',
        }
    },
    mounted(){
        this.removeHtml()
    },
    computed :{
        ...mapState({
            //检测手机号的返回值
            phoneHaveData:state=>state.phoneStore.phoneHaveData
        })
    },
    methods: {
        ...mapActions({
            getPhoneHaveAction:'phoneStore/getPhoneHaveAction',//检测手机号是否存在
            getPhoneLoginAction:'phoneStore/getPhoneLoginAction',//手机登录
            getUserInfoAction:'phoneStore/getUserInfoAction'//用户个人信息
        }),
        goBack () {
            let url =window.localStorage.getItem('url')
            this.$router.push({
                path:url
            })
        },
        //先触发清空input值的事件
        removeHtml() {
            document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',(event)=>{
                phoneVerification('',this.$refs.phone)
            }),
            document.getElementsByClassName('mint-field-clear')[1].addEventListener('click',(event)=>{
                passwordVerification('',this.$refs.password)
            })
        },
        //判断密码格式 和 手机号在不在 
        async handleClick () {
            
            let phone = '',password = ''
            if(this.$refs.phone.innerHTML ==''){   
                this.$loading(false)
                phone = phoneVerification(this.phone,this.$refs.phone,true)
            }
            password = passwordVerification(this.password,this.$refs.password,true)
            if(phone && password && this.phoneHaveData.result){
                this.$loading(true)
                let that = this;
                await this.getPhoneLoginAction({account:this.phone*1,password:this.password});
                await info(that);
                async function info (that) {
                    let getCookies= getCookie() && JSON.parse(getCookie());
                    if(getCookies.result==null){
                         that.$loading(false)
                        that.flag=false;
                        that.$refs.password.style.borderTop='1px solid #f56c6c';
                        that.$refs.password.innerHTML=getCookies.msg;
                       
                    }else if(getCookies.result!=null){
                        that.$Toast('登录成功')
                        await that.getUserInfoAction({token:''});
                        let path=window.localStorage.getItem('url')
                        that.$router.replace({
                            path
                        });
                        that.$loading(false)
                        that.$GifToast(true);
                    }
                } 
            }else{
                this.$loading(false)
            }
        },
        //手机失焦事件 判断手机号格式 和 手机号在不在
        phoneBlur () {
            phoneVerification(this.phone,this.$refs.phone)
            setTimeout(async ()=>{
                if(this.phone !=''){  
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
        //密码失去焦点事件
        passwordBlur(){
             passwordVerification(this.password,this.$refs.password)
        },
        //手机按键事件
        phoneInput () {
            if(this.$refs.phone.innerHTML!=''){
                this.$refs.phone.innerHTML='',
                this.$refs.phone.style.borderTop='none'
            }
        },
        //密码按键事件
        passwordInput () {
            if(this.$refs.password.innerHTML!=''){
                this.$refs.password.innerHTML='',
                this.$refs.password.style.borderTop='none'
            }
        },
        goPhoneRegisterOne () {
            this.$router.push({
                path:'/phoneregisterone'
            })
        },
        goPhoneForgetPasswordOne () {
            this.$router.push({
                path:'/phoneforgetpasswordone'
            })
        },
        goPhoneCaptchaLogin () {
            this.$router.push({
                path:'/phonecaptchalogin'
            })
        }
    },
    components:{
    }
}
</script>
<style lang='scss' scoped>
.email_content{
    margin-top:4.5rem;
}
.email_content h3{
    margin-bottom:3rem;
}
.email_content form .phoneNum {
}
.mint-cell-value{
    width: 10rem
}
</style>


