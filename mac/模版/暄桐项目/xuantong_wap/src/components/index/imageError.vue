<template>
    <div style="text-align:center;paddingTop:5rem">
        <article class="nav-title" v-if="!this.$flag">
        <mt-header title="晒作业" fixed>
            <a href="javascript:void(0);" slot="left" @click="goBack">
            <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        </article>
        <img style="position: fixed;top:.2rem;left:.2rem" src="../../../static/img/back.png" class="gu_nav_title_img_top" v-if="this.$flag" @click="goBack">
        <img style="width:12rem" src="../../../static/mobile_img/XuantongError.png"/>
        <p style="line-height: 1.5rem;">上传出现异常，请尝试返回重新上传</p>
    </div>
</template>
<script>
    export default {
        name: 'imageError',
        data() {
            return {
             
            }
        },
        methods:{
            goBack(){
                this.$router.back(-1);
            }
        }
       
    }
</script>
<style lang="scss" scoped>

</style>


