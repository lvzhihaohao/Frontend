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
                    <mt-field label="" placeholder="昵称"  v-model="nickname" @blur.native.capture="nickNameBlur"
                        @input='nicknameInput'> </mt-field>
                    <div class='nicknameError' ref='nickname'></div>
                    <mt-field label="" placeholder="密码 (8-16位数字+字母的组合)" type='password' v-model="password"
                        @blur.native.capture="passwordBlur" @input='passwordInput'
                    > </mt-field>
                    <div class='passwordError' ref='password' ></div>
                    <mt-field label="" placeholder="再次确认密码" type='password' v-model="passwordTwo"
                        @blur.native.capture="passwordTwoBlur" @input='passwordTwoInput'
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
import {nicknameVerification,passwordVerification,passwordTwoVerification,getCookie,nowTime,setCookie
} from '@/public/index'
export default {
    name:'phoneregistertwo',
    data() {
        return {
            phone:'',
            code:'',
            nickname:'',
            password:'',
            passwordTwo:''
        }
    },
    computed: {
        ...mapState({
            //检测昵称在不在返回数据
            nickNameHaveData:state=>state.phoneStore.nickNameHaveData,
             //手机注册是否需要完善注册信息数据
            phoneNeedCompleteRegistrationInfoData:state=>state.phoneStore.phoneNeedCompleteRegistrationInfoData,
            //微信数据
            WXinfo: state => state.indexStore.WXinfo,
        })
    },
    mounted () {
        this.$loading(false)
        this.phone = this.$route.query.phone
        this.code = this.$route.query.code
        //console.log(this.WXinfo,'his.WXinfo')
        this.nickname = this.WXinfo.nickname
        this.nickNameBlur()
        this.removeHtml()
    },
    methods:{
        ...mapActions({
            //检测昵称在不在
            getNickNameHaveAction:'phoneStore/getNickNameHaveAction',
            //手机注册
            getPhoneRegisterAction:'phoneStore/getPhoneRegisterAction',
            //获取个人信息
            getUserInfoAction:'phoneStore/getUserInfoAction',
             //手机是否完善注册信息
            getPhoneNeedCompleteRegistrationInfoAction:'phoneStore/getPhoneNeedCompleteRegistrationInfoAction'
        }),
        goBack () {
            this.$router.back(-1)
        },
        removeHtml() {
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
        },
        async goPrevPage() {
            let nickname = nicknameVerification(this.nickname,this.$refs.nickname,true);
            let password = passwordVerification(this.password,this.$refs.password,true);
            let passwordTwo = passwordTwoVerification(this.password,this.passwordTwo,this.$refs.passwordTwo,true);
            if(nickname && password && passwordTwo && !this.nickNameHaveData.result){
                this.$loading(true)
                if(this.$route.query.type=='phone'){
                    await  this.getPhone()
                }else{
                    await  this.getEmail()
                }
            }
        },
        // 上传头像
        async updateImg(formData) {
         formData=formData.replace(/http:/,'')
           this.$axios.post("/user/updateuserhead", {
                headThumbnailUri:formData,
                headUri: formData,
                isLocalThumb:true,
                token: ""
            }).then(res=>{
               //console.log(res,"-----")
               //console.log(formData,"")
           })
        },
        //手机注册
        getPhone(){
            this.$axios.post('/user/registerbymobile',{
                 mobible:this.phone,
                 nickName:this.nickname,
                 confirmCode:this.code,
                 wechat:this.WXinfo.unionid,
                 newPassword:this.password,
                 newPasswordConfirm:this.passwordTwo,
                 wechatOpenId:this.WXinfo.openid,
                 nowTime:nowTime(),
            }).then(res=>{
                if(res.data.code!==0){
                                this.$loading(false)
                                this.$Toast(res.data.msg)
                                return
                 }
                if(res.data.result){
                                let obj = {
                                    result:res.data.result
                                }
                                setCookie(obj)
                                this.getUserInfoAction({token:''});
                                this.$loading(false)
                                this.$Toast('登录成功')
                                this.updateImg(this.WXinfo.headimgurl)
                                this.$router.push({
                                    path:'/index/indexshouye'
                        })
                    }
            })
        },
        //邮箱注册
        getEmail(){
            this.$axios.post('/user/registerbyemail',{
                 email:this.phone,
                 nickName:this.nickname,
                 confirmCode:this.code,
                 wechat:this.WXinfo.unionid,
                 wechatOpenId:this.WXinfo.openid,
                 newPassword:this.password,
                 newPasswordConfirm:this.passwordTwo,
                 nowTime:nowTime(),
            }).then(res=>{
                if(res.data.code!==0){
                                this.$loading(false)
                                this.$Toast(res.data.msg)
                                return
                 }
                if(res.data.result){
                                let obj = {
                                    result:res.data.result
                                }
                                setCookie(obj)
                                this.getUserInfoAction({token:''});
                                this.$loading(false)
                                this.$Toast('注册成功') 
                                this.updateImg(this.WXinfo.headimgurl)
                                this.$router.push({
                                    path:'/index/indexshouye'
                        })
                    }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.email_content{
    margin-top: 2.5rem!important;
}
</style>

