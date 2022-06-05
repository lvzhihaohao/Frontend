<template>
    <div id='#app'>
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="微信绑定">
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
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goNext">
                        {{!this.userInfo.bindingWechat?'绑定微信':'解除绑定'}}</mt-button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {appid,redirect_uri} from '@/public/url.js'
import {mapState,mapActions} from 'vuex'
import {captchaVerification,captchaDownTime,getUserInfoCookie,setUserInfoCookie,nowTime} from '../../public/index'
export default {
    name:'phonevalidate',
    data () {
        return {
            captcha:'',
            userInfo:{},
            flag:false,
            phoneNums:''
        }
    },
    computed :{
        ...mapState({
             //邮箱验证码返回数据
            captchaData:state=>state.phoneStore.captchaData,
            //验证码检测返回数据
            captchaHaveData:state=>state.phoneStore.captchaHaveData
        })
    },
    async mounted () {
        await   this.$axios
          .post("/user/getuserinfo", {//更改getUserInfo
            token: ""
          })
          .then(res => {
                setUserInfoCookie(res.data.result)
                this.userInfo=res.data.result;
          });
        if(this.$route.query.state=='SectBind'){
            let code = this.$route.query.code
            let state = this.$route.query.state
            this.$axios.post("/wechat/wapcallback",{code:code,state:state,}).then(res=>{
                if(res.data.code!==0){
                  this.$Toast(res.data.msg)
                }else{
                    window.localStorage.setItem('UserCode',code)
                    if(res.data.result.token){
                        this.$Toast('当前账号已被绑定') 
                    }else{
                        let obj = res.data.result
                        this.bangWX(obj)
                    }
                }
           })
        }
    },
    methods: {
        ...mapActions({
            //检测验证码对不对
            getCaptchaHaveAction:'phoneStore/getCaptchaHaveAction'
        }),
        //绑定微信
        bangWX(obj){
            let phone,bindingType;
            if(this.userInfo.phoneNum){
                phone = this.userInfo.phoneNum
                bindingType = 1
            }else{
                phone = this.userInfo.email
                bindingType = 2
            }
              this.$axios.post('/wechat/wapBindingWechat',{
                  bindingType:bindingType,
                  bindingInfo:phone,
                  openid:obj.unionid,
                  wechatOpenId:obj.openid 
              }).then(res=>{
                     if(res.data.code!==0){
                        this.$Toast(res.data.msg)
                    }else{
                        this.$Toast('绑定成功') 
                        this.$router.push({
                            path:'/securitysettings',
                        })
                    }
              })
        },
        goBack () {
            this.$router.push({
                 path:'/securitysettings',
            })
        },
        goNext(){
            if(this.userInfo.bindingWechat){
                this.$axios.post('/wechat/wxuntied',{
                    token:''
                }).then(res=>{
                     if(res.data.code!==0){
                        this.$Toast(res.data.msg)
                        return
                    }else{
                        this.$Toast('解绑成功') 
                        //console.log(this.$router)
                        this.$router.push({
                            path:'/securitysettings',
                        })
                    }
                })
            }else{
                //拉起微信 生产
                if(!this.$flag){
                    this.$Toast('请您在微信客户端内操作')
                }else{
                      window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=SectBind#wechat_redirect
                    `)
                }
                //uat
            //    window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6a0d56eb1c12553b&redirect_uri=https://cr-uat.xuantong.cn/wx/index.html&response_type=code&scope=snsapi_userinfo&state=SectBind#wechat_redirect
            //    `)
            }
        }
    },
    
}
</script>

<style lang="scss" scoped>
.text-center{
    font-size: 1.125rem;
}
</style>


