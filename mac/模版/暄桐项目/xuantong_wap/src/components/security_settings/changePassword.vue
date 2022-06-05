<template>
    <div class='#app'>
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="修改密码">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png"  class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>           
        <div class="mobile_content mt-40 mb-65">
            <p class="pl-27 pr-27" style=" margin-bottom:1.125rem;">请选择修改密码的验证方式:</p>
            <article class="pl-27 pr-27">
                <ul class="Personal_Center borderNone">
                    <li v-if='userInfo.phoneNum != null' @click='goPhoneValidateOne'>
                        <mt-cell title="手机号验证">
                            <span>{{userInfo.phoneNum}}</span>
                            <img class="app-cell-allow-right" src="../../../static/icon/you.png" />
                        </mt-cell>
                    </li>
                    <li v-if='userInfo.email != null' @click='goEmailValidateOne'>
                        <mt-cell title="邮箱验证">
                            <span>{{userInfo.email}}</span>
                            <img class="app-cell-allow-right" src="../../../static/icon/you.png" />
                        </mt-cell>
                    </li>    
                </ul>
            </article>
        </div>
    </div>
</template>
<script>
import {getUserInfoCookie} from '../../public/index'
export default {
    name:'securitysettings',
    data () {
        return {
            userInfo :{}
        }
    },
    mounted () {
        let  userInfo = JSON.parse(getUserInfoCookie());
        this.userInfo=userInfo;
        let phone=this.userInfo.phoneNum.split("")
        phone.splice(3,4,"****")
        let phoneList = phone.join("")
        //console.log(this.userInfo)
        this.userInfo.phoneNum=phoneList;
        //console.log(this.userInfo)
    },
    methods:{
        goBack () {
            this.$router.back(-1)
        },
        goPhoneValidateOne () {
            this.$router.push({
                path:'/phonevalidateone',
                query:{
                    type:3
                }
            })
        },
        goEmailValidateOne () {
            this.$router.push({
                path:'/emailvalidateone',
                query:{
                    type:2
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


