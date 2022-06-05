<template>
    <div id='#app'>
        <article class="nav-title" fixed v-if='!this.$flag'>
            <mt-header title="安全设置">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png"  class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class="mobile_content mt-40 mb-65">
            <article class="pl-27 pr-27">
                <ul class="Personal_Center">
                    <li @click='goChangePassword'>
                        <mt-cell title="修改密码" >
                            <span :class="obj.password==='未绑定'?'c9':''">{{obj.password}}</span>
                            <img class="app-cell-allow-right" src="../../../static/icon/you.png" />
                        </mt-cell>
                    </li>
                    <li @click='boundPhone'>
                        <mt-cell title="手机绑定">
                            <span :class="obj.phoneNum==='未绑定'?'c9':''">{{obj.phoneNum}}</span>
                            <img class="app-cell-allow-right" src="../../../static/icon/you.png" />
                        </mt-cell>
                    </li>
                    <li @click='boundEmail'>
                        <mt-cell title="邮箱绑定">
                            <span v-if="obj.email" :class="obj.email==='未绑定'?'c9':''">{{this.replayEmail(obj.email)}}</span>
                            <img class="app-cell-allow-right" src="../../../static/icon/you.png" />
                        </mt-cell>
                    </li>
                    <li @click="boundWX">
                        <mt-cell title="微信绑定">
                            <span :class="obj.WX==='未绑定'?'c9':''">{{obj.WX}}</span>
                            <img class="app-cell-allow-right" src="../../../static/icon/you.png" />
                        </mt-cell>
                    </li>      
                </ul>
                <div class="mt-40">
                    <mt-button class="mobileBackground" size="large" type="primary" @click.native="handleClick1">退出登录</mt-button>
                </div>
            </article>
        </div>
    </div>
</template>
<script>
import {getUserInfoCookie,setCookie,setUserInfoCookie} from '../../public/index'
import {mapActions,mapState} from 'vuex'
export default {
    name:'securitysettings',
    data () {
        return{
            obj:{},
        }
    },
    async mounted () {
        // await this.getUserInfoAction({token:''});
     await   this.$axios
          .post("/user/getuserinfo", {//更改getuserinfo
            token: ""
          })
          .then(res => {
                setUserInfoCookie(res.data.result)
                this.obj=res.data.result;
          });
        // let userInfo = JSON.parse(getUserInfoCookie());
       
        //console.log(this.obj)
        if(this.obj.phoneNum){
            let phone=this.obj.phoneNum.split("")
            phone.splice(3,4,"****")
            let phoneList = phone.join("")
            this.obj.phoneNum=phoneList;
        }
        //console.log(this.obj.bindingWechat,'sssssssssssssssssss')
        this.obj={
            ...this.obj,
            phoneNum:this.obj.phoneNum || '未绑定',
            email:this.obj.email || '未绑定',
            WX:this.obj.bindingWechat?'已绑定':'未绑定'
        }
        //console.log(this.obj.email,'this.obj.emailthis.obj.email')
    },
    beforeRouteEnter(to,from,next){
        if(from.fullPath =='/index/indexwode' || from.fullPath =='emailboundsecurity' 
            || from.fullPath =='/phoneboundsecurity' || from.path == '/phonevalidatetwo'
                ||from.path == '/emailvalidatetwo'){
            window.localStorage.setItem('securitySettingsUrl','/index/indexwode')
        }else{
            window.localStorage.setItem('securitySettingsUrl','')
        }
        next() 
    },
    methods:{
        replayEmail(email){
            //console.log(email,'emailemail')
            if(email!=='未绑定'){
                    let strNum=email.split("@")[0]//邮箱号
                    let strEmail=email.split("@")[1]//邮箱后缀
                    let str=""
                    if(strNum.length<=3){
                        str=strNum.replace(/./g,"*")+'@'+strEmail
                    }else{
                        str=strNum.slice(0,3)+strNum.slice(3).replace(/./g,'*')+"@"+strEmail
                    }
                    return str
           }else{
               return email
           }

        },
        ...mapActions({
            getUserInfoAction:'phoneStore/getUserInfoAction'// 获取个人信息
        }),
        goBack () {
            this.$router.push({
                    path:'/index/indexWode'
             }) 
            // return
            // let securitySettingsUrls = window.localStorage.getItem('securitySettingsUrl')
            // if(securitySettingsUrls){
            //     this.$router.push({
            //         path:securitySettingsUrls
            //     }) 
            // }else{
            //     this.$router.back(-1)
            // }
        },
        //判断值  没值 去往绑定手机页面  有值 去往已经绑定手机号页面
        boundPhone () {
            if(this.obj.phoneNum !='未绑定'){
                this.$router.push({
                    path:'/alreadyboundphone'
                })
            }else{
                this.$router.push({
                    path:'/phoneboundsecurity'
                })
            }
        },
        //判断值  没值 去往绑定email页面  有值 去往已经绑定email页面
        boundEmail () {
             if(this.obj.email != '未绑定'){
                this.$router.push({
                    path:'/alreadyboundemail'
                })
            }else{
                this.$router.push({
                    path:'/emailboundsecurity'
                })
            }
        },
        //去往修改密码页面
        goChangePassword () {
            this.$router.push({
                path:'/changepassword'
            })
        },
        boundWX(){
            this.$router.push({
                path:'/BangWX'
            })
            return
            
        },
        handleClick1 () {
            setCookie(undefined)
            setUserInfoCookie(undefined)
            this.$router.push({
                path:'/index/indexshouye'
            })
        } 
    }
}
</script>
<style lang="scss" scoped>
.mobile_content.mt-40{
    margin-top:.5rem !important;
}
.Personal_Center>li>a>span::after{
    background: #fff!important;
}
.mint-cell:last-child{
    background: #fff!important;
}
// .Personal_Center>li:last-child>a>.mint-cell-wrapper>.mint-cell-value>span{
//     color: #999!important;
// }
.mobileBackground{
    background: #EAEAEA;
    width: 100%;
    color:#666;
}
.app-cell-allow-right{
        display: inline-block;
        width: 0.625rem;
        height: 0.625rem;
        color: white;
        padding: 0  0 0 .5rem;
    }
    
</style>


