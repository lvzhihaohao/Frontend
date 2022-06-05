<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <!-- <mt-header title="支付成功" fixed>
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header> -->
        </article> 
        <!-- <img src="../../../static/img/back.png" class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'> -->
        <div class="mobile_content pl-40 pr-40" style="margin-top: 12.5625rem">
            <div class="PayWin_body pl-10 pr-10 ">
                <div class="text-center PayWin_content">
                    <!-- <img src="../../../static/icon/5.png" class='gu_nav_title_img_top'
                     style="margin-bottom: 2rem;width:2.5rem;height:2.5rem;" width="4.125rem;" height="4.125rem"> -->
                    <!-- <i class="iconfont icon-payWin"></i> -->
                    <h3 class="fz18 c30">请确认微信支付是否已完成</h3>
                    <!-- <div class="tishi" style="line-height: 1.5rem;">成功支付后，订单状态的更新可能延迟，<br>可半小时后再次查询</div>
                   
                    <p class="fz15 c30" v-if="this.$route.query.flag">已成功支付学费：<span class="c4a5">{{this.$route.query.totalAmount}} </span>元</p>
                     <p class="fz15 c30" v-else>已成功支付学费：<span class="c4a5">{{this.$route.query.totalAmount/100}} </span>元</p>
                    <span class="fz15 c30">订单编号：{{this.$route.query.orderSn}} </span> -->
                </div>  
                <div class="PayWin_footBtn">
                    <mt-button class="fz15" @click="goOrder">重新支付</mt-button>
                    <mt-button class="fz15" @click="goOrder">已完成支付</mt-button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'orderPaySuccess',
    mounted(){
        //console.log(this.$route.query)
    },
    methods:{
        goBack () {
            this.$router.back(-1)
        },
        goCouse(){
            this.$router.push({
                     path:'/index/indexclass'
            }) 
        },
        goOrder(){
             this.$router.push({
                     path:'/myorder'
            }) 
        }
    }
}
</script>
<style lang="scss" scoped>
.PayWin_content{
    h3{
        margin-bottom: 1rem;
    }
}
    .tishi{
        margin-bottom: 2rem;
        font-size: .75rem;
        color: #999;
    }
</style>


