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
                        @blur.native.capture="nickNameBlur" @input='nicknameInput'> </mt-field>
                    <div class='nicknameError' ref='nickname'></div>
                    <mt-field label="" placeholder="密码 (8-16位数字+字母的组合)" type='password' v-model="password"
                        @blur.native.capture="passwordBlur" @input='passwordInput'> </mt-field>
                    <div class='passwordError' ref='password'></div>
                    <mt-field label="" placeholder="再次确认密码" type='password' v-model="passwordTwo"
                        @blur.native.capture="passwordTwoBlur" @input = 'passwordTwoInput'
                    > </mt-field>
                    <div class='passwordTwoError' ref='passwordTwo'></div>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goPrevPage">注册</mt-button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import {nicknameVerification,passwordVerification,passwordTwoVerification,
nowTime,getCookie} from '../../../public/index'
export default {
    name:'emailregisterotwo',
    data() {
        return {
            nickname:'',
            password:'',
            passwordTwo:''
        }
    },
    computed :{
        ...mapState({
            //检测昵称在不在返回数据
            nickNameHaveData:state=>state.phoneStore.nickNameHaveData,
           //邮箱注册是否需要完善注册信息数据
            phoneNeedCompleteRegistrationInfoData:state=>state.phoneStore.phoneNeedCompleteRegistrationInfoData
        })
    },
    mounted(){
        this.removeHtml()
    },
    methods:{
        ...mapActions({
            //检测昵称在不在
            getNickNameHaveAction:'phoneStore/getNickNameHaveAction',
            //邮箱注册
            getEmailRegisterAction:'emailStore/getEmailRegisterAction',
            //获取个人信息
            getUserInfoAction:'phoneStore/getUserInfoAction',
            // 邮箱是否完善注册信息
            getPhoneNeedCompleteRegistrationInfoAction:'phoneStore/getPhoneNeedCompleteRegistrationInfoAction'
        }),
        goBack () {
            this.$router.back(-1)
        },
        removeHtml () {
            document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',()=>{
                nicknameVerification('',this.$refs.nickname)
            })
            document.getElementsByClassName('mint-field-clear')[1].addEventListener('click',()=>{
                passwordVerification('',this.$refs.password)
            })
            document.getElementsByClassName('mint-field-clear')[2].addEventListener('click',()=>{
                passwordTwoVerification(this.password,'',this.$refs.passwordTwo)
            })
        },
        //昵称失去焦点
        nickNameBlur () {
             nicknameVerification(this.nickname,this.$refs.nickname)
             setTimeout( async () =>{
                if(this.nickname !=''){
                   
                    if(this.$refs.nickname.innerHTML == ''){
                        await this.getNickNameHaveAction({nickname:this.nickname});
                        if(this.nickNameHaveData.result){
                            this.$refs.nickname.style.borderTop='1px solid #f56c6c';
                            this.$refs.nickname.innerHTML='昵称已存在';
                        }
                    }
                }
            },100)
        },
        //密码失去焦点
        passwordBlur () {
            passwordVerification(this.password,this.$refs.password)
            if(this.password !=''){
                
            }
        },
        //再次确认密码失去焦点
        passwordTwoBlur () {
            passwordTwoVerification(this.password,this.passwordTwo,this.$refs.passwordTwo)
            if(this.passwordTwo !=''){  
                
            }
        },
        //点击完成
        async goPrevPage() {
            let nickname = nicknameVerification(this.nickname,this.$refs.nickname,true);
            //console.log(nickname)
            let password = passwordVerification(this.password,this.$refs.password,true);
             //console.log(password)
            let passwordTwo = passwordTwoVerification(this.password,this.passwordTwo,this.$refs.passwordTwo,true);
              //console.log(passwordTwo)
            if(nickname && password && passwordTwo){
                let that = this;
                let obj={
                    confirmCode:this.$route.query.confirmCode,
                    email:this.$route.query.email,
                    newPassword:this.password,
                    newPasswordConfirm:this.passwordTwo,
                    nickName:this.nickname,
                    nowTime:nowTime()
                }
                window.localStorage.setItem('EmailObj', JSON.stringify(obj))
                this.$router.push({
                                path:'/boundlogin',
                                query:{registerType:'email'}
                })
                // let EmailObj =  window.localStorage.getItem('EmailObj')
                // //console.log( JSON.parse(EmailObj),'oobbjj')
                // await this.getEmailRegisterAction(obj)
                // let getCookies= getCookie() && JSON.parse(getCookie()); 
                // await info(that);
                // async function info (that) {
                //     if(getCookies.result == null){
                //         that.flag = false;
                //         that.$refs.nickname.style.borderTop='1px solid #f56c6c';
                //         that.$refs.nickname.innerHTML=getCookies.msg;
                //     }else{
                //         let path=window.localStorage.getItem('url')
                //         await that.getUserInfoAction({token:''});
                //         await that.getPhoneNeedCompleteRegistrationInfoAction({token:'',registerType:2})
                //         let data = that.phoneNeedCompleteRegistrationInfoData.result
                //         if(!data.needEmail && !data.needMobile && !data.needWeixin){
                //             that.$router.push({
                //                 path
                //             })
                //         }else{ 
                //             that.$router.push({
                //                 path:'/boundlogin',
                //                 query:{registerType:'email'}
                //             })
                //         }
                //     }
                // }
            }
        },
        nicknameInput () {
            if(this.$refs.nickname.innerHTML!=''){
                this.$refs.nickname.innerHTML='',
                this.$refs.nickname.style.borderTop='none'
            }
        },
        passwordInput () {
            if(this.$refs.password.innerHTML!=''){
                this.$refs.password.innerHTML='',
                this.$refs.password.style.borderTop='none'
            }
        },
        passwordTwoInput () {
            if(this.$refs.passwordTwo.innerHTML!=''){
                this.$refs.passwordTwo.innerHTML='',
                this.$refs.passwordTwo.style.borderTop='none'
            }
        } 
    }
}
</script>
<style lang='scss' scoped>
</style>

