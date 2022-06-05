<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="邮箱绑定">
                <a href='javascript:void(0);' slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../../static/img/back.png"  class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class="mobile_content pl-40 pr-40">
            <div class="email_content" style="margin-top:28px;">
                <form action="">
                    <mt-field label="" placeholder="邮箱" type="email" v-model="email"
                        @blur.native.capture="emailBlur" @input="emailInput"
                        style="border-bottom:1px solid #EEEEEE"
                    ></mt-field>
                    <div class='emailError' ref='email'></div>
                    <mt-field label="" placeholder="请输入六位邮箱验证码" type="number" v-model="captcha" @input="capchaInput" style="border-bottom:1px solid #EEEEEE"
                       @blur.native.capture="captchaBlur">
                        <!-- <img src="../assets/100x100.png" height="45px" width="100px"> -->
                        <span ref='spn' v-if="!verification" class="captcha" @click.stop='getEmailGetCaptcha'>获取验证码</span>
                        <span ref='spn' v-if="verification" class="captcha">获取验证码</span>
                    </mt-field>
                    <div class='captchaError' ref='captcha'></div>
                     <p class="c9 fz15 mt-15">请前往邮箱查看</p>
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goSuccess">绑定</mt-button>
                </form>
            </div>
         <!-- <Img v-if='flag' @changeImgShow='changeImgShow'/> -->
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import {getUserInfoCookie,nowTime,captchaDownTime,setCookie} from '@/public/index'
import Img from '@/component/ImgCheck.vue'
import {emailVerification,captchaVerification} from '@/public/index'
export default {
    name:'emailboundsecurity',
    data () {
        return {
            email:'',
            captcha:'',
            flag:false,//控制 图形验证
            userInfo:{},
            emailHaveData:false,//检查手机号
            isNew:false,//是否注册
            RecordPhone:'',
            phoneHaveData:false,
            verification:false
        }
    },
    mounted () {
      
        if(this.$route.query.type=='login'){

        }else{
            
            this.userInfo = JSON.parse(getUserInfoCookie()); 
        }
        this.removeHtml()
    },
    components:{
        Img
    },
    computed :{
        ...mapState({
             //邮箱验证码返回数据
            captchaData:state=>state.emailStore.captchaData,
             //邮箱检测返回数据
            // emailHaveData:state=>state.emailStore.emailHaveData,
            //验证码检测返回数据
            captchaHaveData:state=>state.emailStore.captchaHaveData,
            //邮箱绑定返回数据
            emailBoundSecurityData:state=>state.securityEmailStore.emailBoundSecurityData,
            //微信数据
            WXinfo: state => state.indexStore.WXinfo,
            
        })
    },
     beforeRouteEnter (to,from,next) {
        if(from.path=='/emailvalidateone' || from.path=='/securitysettings' || from.path=='/phonevalidateone'){
            window.localStorage.setItem('emailboundsecurityUrl','/securitysettings')
        }else if(from.path=='/boundlogin'){
            window.localStorage.setItem('emailboundsecurityUrl','/index/indexshouye')
        }else if(from.path=='/'){
            let emailboundsecurityUrl = window.localStorage.getItem('emailboundsecurityUrl')
            if(emailboundsecurityUrl){
                window.localStorage.setItem('emailboundsecurityUrl',emailboundsecurityUrl)
            }
        }
        next()
    },
    methods:{
        ...mapActions({
            getEmailGetCaptchaAction:'emailStore/getEmailGetCaptchaAction',//邮箱验证码
            getEmailBoundSecurityAction :'securityEmailStore/getEmailBoundSecurityAction',//邮箱绑定
             //检测邮箱在不在
            getEmailHaveAction:'emailStore/getEmailHaveAction',
            //检测验证码对不对
            getCaptchaHaveAction:'emailStore/getCaptchaHaveAction',
            //获取个人信息
            getUserInfoAction:'phoneStore/getUserInfoAction',
        }),
        goBack () {
            this.$router.back(-1)
        },
        removeHtml () {
            document.getElementsByClassName('mint-field-clear')[0].addEventListener('click',()=>{
                emailVerification('',this.$refs.email)
            }),
            document.getElementsByClassName('mint-field-clear')[1].addEventListener('click',()=>{
                captchaVerification('',this.$refs. captcha)
            })
        },
        //判断 验证码是否输入频繁
        async getEmailGetCaptcha () {
            this.verification = true;
            if(this.email == ''){
                this.verification = false;
                 this.$Toast('请输入邮箱号')
            }else{
                if(this.$refs.spn.innerHTML=='获取验证码'){
                    // this.flag = true;
                    this.emailBlur()
                   if(this.emailHaveData){
                       this.verification = false;
                       return
                   }
                    this.RecordPhone=this.email
                    this.changeImgShow()
                }
                
            }     
        },
        //图形验证成功 发送验证码
        async changeImgShow() {
            this.flag = false;
            if(this.$refs.email.innerHTML == ''){
                await this.getEmailGetCaptchaAction({emailList:[this.email],sendType:3})
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
         //邮箱失焦事件 判断邮箱号格式 和 邮箱号在不在
        emailBlur () {
            emailVerification(this.email,this.$refs.email)
            setTimeout(async ()=>{
                if(this.email !=''){
                    if(this.$refs.email && this.$refs.email.innerHTML == ''){
                        this.$axios.post('/wechat/wxbindingcheck',{
                            checkType:2,
                            checkInfo:this.email
                        }).then(res=>{
                              if(res.data.result.needRegistered){//注册
                                    this.isNew = true
                                    this.emailHaveData=false
                                }else{//绑定
                                    this.isNew = false
                                    if(res.data.result.canBinding){//可以绑定
                                        this.emailHaveData=false
                                    }else{//已存在
                                        this.emailHaveData=true
                                        this.$refs.phone.style.borderTop='1px solid #f56c6c';
                                        this.$refs.phone.innerHTML= '该邮箱已被绑定微信'
                                    }
                                }
                                //console.log(res,this.isNew,'我是检测微信')
                        })
                        // await this.getEmailHaveAction({email:this.email});
                        // if(this.emailHaveData.result == true){
                        //     this.$refs.email.style.borderTop='1px solid #f56c6c';
                        //     this.$refs.email.innerHTML='你的邮箱已存在,请重新输入';
                        // }
                    }
                }
            },100)
        },
        //检测验证码对不对 验证码格式
        captchaBlur (e) {
            captchaVerification(this.captcha,this.$refs.captcha);
            setTimeout(async ()=>{
                if(this.captcha !=''){
                    
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
        emailInput () {
            if(this.$refs.email.innerHTML!=''){
                this.$refs.email.innerHTML='',
                this.$refs.email.style.borderTop='none'
            }
        },
        capchaInput () {
            if(this.$refs.captcha.innerHTML!=''){
                this.$refs.captcha.innerHTML='',
                this.$refs.captcha.style.borderTop='none'
            }
        },
        //判断邮箱是否存在  判断验证码信息  判断验证码是否正确 
        async  goSuccess () {
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
            if(email && captcha && this.captchaData.result && this.emailHaveData== false ){
                this.$loading(true)
                if(this.isNew){//注册
                    this.$router.push({
                                path:'Pnext',
                                query:{
                                    phone:this.email,
                                    code:this.captcha,
                                    type:'email'
                                }
                         })
                 }else{//登录
                    this.$axios.post('/wechat/wxbinding',{
                        bindingType:2,
                        bindingInfo:this.email,
                        openid:this.WXinfo.unionid,
                        wechatOpenId:this.WXinfo.openid 
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
                            this.$Toast('绑定成功')
                            
                            this.$router.push({
                                path:'/index/indexshouye'
                            }) 
                        } 
                        // this.$GifToast(true);
                    })
                 }
            }
        },
    }
}
</script>
<style lang="scss" scoped>
    .captcha{
        width:6.25rem ;
        height:1.8rem;
    }
</style>


