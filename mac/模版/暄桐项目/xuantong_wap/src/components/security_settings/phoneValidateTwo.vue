<template>
    <div id='#app'>
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="手机验证">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
                <!-- <mt-button icon="more" slot="right"></mt-button> -->
            </mt-header>
        </article>
        <img src="../../../static/img/back.png"  class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class="mobile_content pl-40 pr-40">
            <div class="email_content">
                <form action="">
                    <mt-field label="" placeholder="新密码 (8-16位数字+字母的组合)" type='password' v-model="password"
                         @blur.native.capture="passwordBlur" @input='passwordInput'
                    > </mt-field>
                    <div class='passwordError' ref='password'></div>
                    <mt-field label="" placeholder="再次确认密码" type='password' v-model="passwordTwo"
                        @blur.native.capture="passwordTwoBlur" @input='passwordTwoInput'
                    > </mt-field>
                    <div class='passwordTwoError' ref='passwordTwo'></div>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goPrevPage">确定</mt-button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import {passwordVerification,passwordTwoVerification,nowTime} from '../../public/index'
export default {
    name:'phonevalidatetwo',
    data () {
        return {
            password:'',
            passwordTwo:'',
        }  
    },
    mounted(){
         this.removeHtml()
    },
    computed:{
        ...mapState({
            //手机修改密码返回数据
            phoneForgetPasswordData:state=>state.securityPhoneStore.phoneForgetPasswordData
        })
    },
    methods:{
        ...mapActions({
            //手机修改密码
            getForgetPasswordAction:'securityPhoneStore/getForgetPasswordAction'
        }),
        removeHtml() {
            document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',()=>{
                passwordVerification('',this.$refs.password)
            })
            document.getElementsByClassName('mint-field-clear')[1].addEventListener('click',()=>{
                passwordTwoVerification(this.password,'',this.$refs.passwordTwo)
            })
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
        async goPrevPage() {
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
                await this.getForgetPasswordAction(obj)
                await info(that);
                async function info (that) {
                    if(!that.phoneForgetPasswordData.result){
                        that.flag = false;
                        that.$refs.password.style.borderTop='1px solid #f56c6c';
                        that.$refs.password.innerHTML=that.phoneForgetPasswordData.msg;
                    }else{
                        that.$Toast('密码修改成功')
                        that.$router.push({
                            path:'/securitysettings'
                        })
                    }   
                }
            }
        },
        goBack () {
            this.$router.back(-1)
        },
    }
}
</script>
<style lang="scss" scoped>
</style>


