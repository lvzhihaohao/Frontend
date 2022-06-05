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
                <form action="">
                    <mt-field label="" placeholder="新密码 (8-16位数字+字母的组合)" type='password' v-model="password"
                        @blur.native.capture="passwordBlur" @input='passwordInput'
                    > </mt-field>
                    <div class='passwordError' ref='password'></div>
                    <mt-field label="" placeholder="再次确认密码" type='password' v-model="passwordTwo"
                        @blur.native.capture="passwordTwoBlur" @input ='passwordTwoInput'
                    > </mt-field>
                    <div class='passwordTwoError' ref='passwordTwo'></div>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goPrevPage">完成</mt-button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import {passwordVerification,passwordTwoVerification,nowTime} from '../../../public/index'
import {getCookie} from '../../../public/index'
export default {
    name:'phoneforgetpasswordtwo',
    data() {
        return {
            password:'',
            passwordTwo:''
        }
    },
    mounted () {
        document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',()=>{
            passwordVerification('',this.$refs.password)
        })
        document.getElementsByClassName('mint-field-clear')[1].addEventListener('click',()=>{
            passwordTwoVerification(this.password,'',this.$refs.passwordTwo)
        })
    },
    methods: {
        ...mapActions({
            //手机找回密码
            getPhoneForgetPasswordAction:'phoneStore/getPhoneForgetPasswordAction',
        }),
        goBack () {
            this.$router.back(-1)
        },
        passwordBlur () {
            passwordVerification(this.password,this.$refs.password)
            if(this.password !=''){   
                
            }
        },
        passwordTwoBlur () {
             passwordTwoVerification(this.password,this.passwordTwo,this.$refs.passwordTwo) 
            if(this.passwordTwo !=''){
              
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
        },
        async goPrevPage(){
            let password = passwordVerification(this.password,this.$refs.password,true);
            let passwordTwo = passwordTwoVerification(this.password,this.passwordTwo,this.$refs.passwordTwo,true);
            if(password && passwordTwo){
                let that = this;
                let obj={
                    confirmCode:this.$route.query.confirmCode,
                    mobile:this.$route.query.mobile,
                    newPassword:this.password,
                    newPasswordConfirm:this.passwordTwo,
                    nowTime:nowTime()
                }
                await this.getPhoneForgetPasswordAction(obj)
                let getCookies= getCookie() && JSON.parse(getCookie());
                await info(that);
                async function info (that) {
                    if(!getCookies.result) {
                        that.flag = false;
                        that.$refs.password.style.borderTop='1px solid #f56c6c';
                        that.$refs.password.innerHTML=getCookies.msg;
                    }else{
                        that.$Toast('修改密码成功')
                        that.$router.push({
                            path:'/phonelogin'
                        }) 
                    }
                    
                }
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.email_content{
    margin-top: 3rem;
}
</style>




