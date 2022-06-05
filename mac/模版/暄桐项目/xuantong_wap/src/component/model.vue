<template>
    <div v-if='visible'  @touchmove.prevent>
        <mt-popup v-model="popupVisible_Pleaselogin" position=""   class="model_Pleaselogin" modal=false>
             <div class="model-content pos_r">
                <i class="pos_a" @click='noShow'>
                    <img src="../../static/icon/1234.png"  alt="" srcset="">
                </i>
                <h3 class=" text-center">请登录</h3>
                <ul class="flex text-center">
                    <li @click='goPhoneLogin'>
                        <i class="iconfont shouji" :style="{color:'#009FE8'}">
                            <img src="../../static/icon/shoujiji.png" alt="">
                        </i>
                        <p class="fz12 mt-5">手机</p>
                    </li>
                    <li @click="goWxLogin">
                        <i class="iconfont icon-WeChat" :style="{color:'#41B035'}"></i>
                        <p class="fz12 mt-5">微信</p>
                    </li>
                </ul>
                <p class="fz12 c9">登录/注册默认同意<span class="c4a5" style="text-align: center;" @click='goServiceTerms'>《用户注册协议》</span></p>
                <div class="text-center mt-20" @click='goEmailLogin'>
                    <mt-button class="cf btn_apply">海外登录</mt-button>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import Vue from 'vue'
import router from '../router/index'
export default {
    name:"boundLogin",
     data() {
        return {
            popupVisible_Pleaselogin: false,
            visible:false
        }
    },
    props:{
        flag :{
            type:null
        }
    },
    watch: {

    },
    methods: {
        //手机登录
        goPhoneLogin () {
            router.replace({
                path:'/phonelogin'
            })
            Vue.prototype.$ModelToast(false)
        },
        //邮箱登录
        goEmailLogin () {
            router.replace({
                path:'/emaillogin'
            })
            
            Vue.prototype.$ModelToast(false)
        },
         //微信
        goWxLogin () {
            if(!this.$flag){
                    this.$Toast('请您在微信客户端内操作')
            }else{
                 let hashs=window.location.hash.slice(1)
                 window.localStorage.setItem('WXbackUrl',hashs)
                 router.replace({
                    path:'/weixinempowers'
                })
                Vue.prototype.$ModelToast(false)
            }
        },
        //服务条款
        goServiceTerms () {
            router.push({
                path:'/serviceterms',
                query:{type:'model'}
            })
            
            Vue.prototype.$ModelToast(false)
        },
        noShow () {
            Vue.prototype.$ModelToast(false)
        }
    }
}
</script>
<style lang="scss">
.model,.modelBefore{
    width: 100%;
}
.model h3{
    padding: 1.875rem 0rem;
    margin: 0rem .9375rem;
    border-bottom: 1px solid #EEEEEE;
}
.model ul{
    margin: 0rem .9375rem 5.75rem;
}

.model ul li{
    padding: .9375rem 0rem;
    border-bottom: 1px solid #eee;
}
.shouji{
       width:3.125rem;
       height: 3.125rem;
       display: inline-block;
       margin-top: .4rem;
   }
.model ul li i.shouji,.model ul li i.icon-wechatOpen{
   font-size: 1.875rem;
   margin-right: .625rem;
}

.model ul li i.iconfont.c4a5{
    font-size: 2.5rem;
    position: relative;
    top: -6px;
}


/** 确认付款 **/
.modelPay{
 padding: 1.9375rem 1.75rem 0rem;
 width: calc(17.5rem - 1.75rem *2);
 border-radius: .375rem;
}
.modelPay h3{
    margin-bottom: 1.625rem;
}

.modelPay p{
    line-height: 1.5rem;
}
.modelPay div.text-center{
    margin-top: 11px;
    margin-bottom: 7px;
}

.modelPay div.text-center button::before{
    /* border-right: 1px solid #ddd; */
    background:rgba(221,221,221,1);
    content: '';
    display: inline-block;
    width:1px;
    height:18px;
    left: -15px;
    position: relative;
    top: 4px;
}

div.text-center button:first-child::before{
    border-right: 0rem;
    display: none;
}

.modelPay .mint-button{
    overflow: unset !important;

}

/*  */
.modelBefore h3{
    margin-top: 1.75rem;
    margin-bottom: 1.875rem;
}
.modelBefore article{
    padding-left: 1.6875rem;
    padding-right: 1.6875rem;
    margin-bottom: 3.125rem;
    padding-bottom: 1.25rem;
    max-height: 15.625rem;
    overflow-y: scroll;

}
.modelBefore article div{
    line-height: 1.5rem;
}

.modelBefore .Define_footFixed{
    display: flex;
}
.modelBefore .Define_footFixed button{
    /* padding: 0rem; */
}

.modelBefore .Define_footFixed button.signUp{
    background: #C4A57F;

}

.remmber {
    /* display: none; */
    opacity: 0;
    margin-left: -10px;
}
.remmber[type=checkbox]+span {
    display: inline-block;
    border-radius: .05rem;
    width: .75rem;
    height: .75rem;
    border: .075rem solid #C4A57F;
    color: #C4A57F;
    position: absolute;
    top: 5px;
    /* left: -.5rem; */
}

.remmber[type=checkbox]:checked + span:after {
    display: inline-block;
    content: '\2713';
    color: #C4A57F;
    border-color: #C4A57F;
    position: absolute;
    font-size: 0.28rem;
    left: 0.05rem;
    line-height: 14px;

}

/***** 请登录 ****/

.model_Pleaselogin{
    width: calc(18.75rem - 2.625rem * 2);
    height:15.05rem;
    padding-left: 2.625rem;
    padding-right: 2.625rem;
    border-radius: .375rem;
    padding-bottom: 1.25rem;
    // box-sizing: border-box;
}

.model_Pleaselogin .model-content h3{
    margin: 1.7375rem auto 1.705rem auto;
    font-size: 1.125rem;
    font-weight: 400;
}
.model_Pleaselogin .model-content >i.pos_a{
    font-size: 34px;
    font-weight: normal;
    font-style: normal;
    right: -30px;
    top: -36px;
    color: #C4A57F;
}
.pos_a > img{
    height: 10px;
    width: 10px;
}

.model_Pleaselogin .model-content .flex.text-center li{
    width: 50%;

}

.model_Pleaselogin .model-content>p.fz12{
    white-space: nowrap;
    margin-top: 1.75rem;
}


.model_Pleaselogin .model-content .icon-phone{
    font-size: 3.125rem;
}

.model_Pleaselogin .model-content .icon-WeChat{
    font-size: 3.125rem;
}
.fz12.mt-5{
    margin-top:.5125rem;
}
.cf.btn_apply{
    width:7.5rem !important;
    height:1.875rem !important;
    line-height: 2rem;
    font-size:.875rem;
    font-weight: 300;
    border-radius:.18rem;
}
.mt-20{
    margin-top:1rem;
}
</style>


