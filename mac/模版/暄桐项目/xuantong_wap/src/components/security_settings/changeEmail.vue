<template>
    <div class='#app'>
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="邮箱修改">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png"  class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>   
        <div class="mobile_content mt-40 mb-65">
            <p class=" pl-25 pr-25" style=" margin-bottom:1.125rem;">请选择邮箱修改的验证方式:</p>
            <article class="pl-25 pr-25">
                <ul class="Personal_Center">
                    <li v-if='obj.phoneNum != null' @click='goPhoneValidateOne'>
                        <mt-cell title="手机号验证" :style="{borderBottom:'1px solid #eee'}">
                            <span>{{obj.phoneNum}}</span>
                            <img class="app-cell-allow-right" src="../../../static/icon/you.png" />
                        </mt-cell>
                    </li>
                    <li v-if='obj.email != null' @click='goEmailValidateOne'>
                        <mt-cell title="邮箱验证">
                            <span>{{obj.email}}</span>
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
    name:'changeemail',
    data () {
        return {
            obj:{}
        }
    },
    mounted () {
        this.obj = JSON.parse(getUserInfoCookie());
    },
    methods:{
        goBack () {
            this.$router.back(-1)
        },
         //去往手机验证页面
        goPhoneValidateOne () {
            this.$router.push({
                path:'/phonevalidateone',
                query:{
                    type:4
                }
            })
        },
        //去往邮箱验证页面
        goEmailValidateOne () {
            this.$router.push({
                path:'/emailvalidateone',
                query:{
                    type:3
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
</style>


