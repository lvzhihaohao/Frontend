<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="邮箱绑定">
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
                <div class="text-center">已经绑定邮箱{{obj.email}}</div>
                <form action="">
                    <mt-button class="mt-40" size="large" type="primary" @click.prevent="goChangeEmail">更换绑定邮箱</mt-button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {getUserInfoCookie} from '../../public/index'
export default {
    name:'alreadyboundemail',
    data () {
        return {
            obj:{}
        }
    },
    mounted () {
        this.obj  = JSON.parse(getUserInfoCookie());
    },
     methods:{
         goBack () {
            this.$router.back(-1)
        },
        //去往更改邮箱页面
        goChangeEmail () {
            this.$router.push({
                path:"/changeemail"
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.email_content{
    margin-top:2.5rem;
}
</style>


