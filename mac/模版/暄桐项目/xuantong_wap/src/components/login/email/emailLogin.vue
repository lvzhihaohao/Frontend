<template>
      <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="邮箱登录">
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
                    <mt-field label="" placeholder="邮箱"  v-model="email"
                        @input='emailInput' @blur.native.capture="emailBlur"
                    ></mt-field>
                    <div class='emailError' ref='email'></div>
                    <mt-field label="" placeholder="密码" type="password" v-model="password"
                        @input='passwordInput' @blur.native.capture="passwordBlur"
                    > </mt-field>
                    <div class='passwordError' ref='password'></div>
                    <p class="c9 fz15 mt-15">
                        <a href="javascript:void(0)" :class="isiOS?'c9 mt15BoxSoll':'c9'" @click='goEmailForgetPasswordOne'>找回密码</a>
                        <a href="javascript:void(0)" class="fr c4a5" @click='goEmailRegisterOne'>邮箱注册</a>
                    </p>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="handleClick">登录</mt-button>
                </form>
            </div> 
        </div>
    </div>
</template> 
<script>
import {mapActions,mapState} from 'vuex'
import {getCookie} from '../../../public/index'
import {emailVerification,passwordVerification} from '../../../public/index'
export default {
    name:'emaillogin',
    data() {
        return {
            email:'',
            password:'',
            isIOS:true,
        }
    },
    components:{
    },
    created(){
        var u = navigator.userAgent;
        this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    },
    mounted () {
        this.removeHtml()
    },
    computed :{
        ...mapState({
            //检测邮箱的返回值
            emailHaveData:state=>state.emailStore.emailHaveData
        })
    },
    methods: {
        ...mapActions({
            getEmailHaveAction:'emailStore/getEmailHaveAction',//检测邮箱是否存在
            getEmailLoginAction:'emailStore/getEmailLoginAction',//邮箱登录
            getUserInfoAction:'phoneStore/getUserInfoAction'//用户个人信息
        }),
        goBack () {
            let url =window.localStorage.getItem('url')
            this.$router.push({
                path:url
            })
        },
        removeHtml () {
            document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',()=>{
               emailVerification('',this.$refs.email)
            })
            document.getElementsByClassName('mint-field-clear')[1].addEventListener('click',()=>{
               passwordVerification('',this.$refs.password)
            })
        },
        //判断密码格式 和 邮箱在不在 
        async handleClick () {
            let email ='', password='' ;
            if(this.$refs.email.innerHTML==''){
                email = emailVerification(this.email,this.$refs.email,true)
            }
            password = passwordVerification(this.password,this.$refs.password,true)
            if(email && password && this.emailHaveData.result){
                this.$loading(true)
                let that = this;
                await this.getEmailLoginAction({account:this.email,password:this.password})
                this.$axios.post('/user/needCompleteregistrationinfo',{
                        token:"",
                        registerType:2
                }).then(async(res)=>{
                    //console.log(res.data.result.needMobile,res.data.result.needWeixin)
                    if(res.data.result.needMobile&&res.data.result.needWeixin){
                        // that.$router
                        that.$router.push({
                            path:"/boundLogin",
                            query:{registerType:'email'}
                        })
                        that.$loading(false)
                    }else{
                        await info(that);
                    }
                })
                async function info (that) {
                    let getCookies= getCookie() && JSON.parse(getCookie());
                    if(getCookies.result==null){
                        that.$loading(false)
                        that.flag=false;
                        that.$refs.password.style.borderTop='1px solid #f56c6c';
                        that.$refs.password.innerHTML=getCookies.msg;
                    }else if(getCookies.result!=null){
                        
                        that.$Toast('登录成功')
                        await that.getUserInfoAction({token:''})
                        let path=window.localStorage.getItem('url')
                        that.$router.replace({
                            path
                        });
                        that.$loading(false)
                         that.$GifToast(true);
                    }
                }
            }
        },
        //去往邮箱注册
        goEmailRegisterOne () {
            this.$router.push({
                path:'/emailregisterone'
            })
        },
        //去往邮箱找回密码
        goEmailForgetPasswordOne () {
            this.$router.push({
                path:'/emailforgetpasswordone'
            })
        },
        //触发email事件
        emailInput () {
            if(this.$refs.email.innerHTML!=''){
                this.$refs.email.innerHTML='',
                this.$refs.email.style.borderTop='none'
            }
        },
        //触发密码框事件
        passwordInput () {
            if(this.$refs.password.innerHTML!=''){
                this.$refs.password.innerHTML='',
                this.$refs.password.style.borderTop='none'
            }
        },
        //邮箱失焦事件 判断邮箱格式 和 邮箱在不在
        emailBlur () {
             emailVerification(this.email,this.$refs.email)
            setTimeout(async ()=>{
                if(this.email !=''){
                   
                    if(this.$refs.email && this.$refs.email.innerHTML == ''){
                        await this.getEmailHaveAction({email:this.email});
                        if(!(this.emailHaveData.result)){
                            this.$refs.email.style.borderTop='1px solid #f56c6c';
                            this.$refs.email.innerHTML='你的邮箱不存在';
                        }
                    } 
                }
            },100)
        },
        //密码失去焦点
        passwordBlur(){
             passwordVerification(this.password,this.$refs.password)
            setTimeout(async ()=>{
                if(this.password !=''){
                   
                }
            },100)
        }
    }
}
</script>
<style lang='scss' scoped>
.mt15BoxSoll{
    margin-left: .5rem;
}
.email_content{
    margin-top: 4.5rem!important;
}
</style>


