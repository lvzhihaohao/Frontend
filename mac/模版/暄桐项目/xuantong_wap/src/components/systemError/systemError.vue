<template>
    <div style="text-align:center;paddingTop:5rem" @touchmove.prevent>
        <img style="width:12rem" src="../../../static/mobile_img/XuantongStyemError.png"/>
        <p style="line-height: 1.5rem;padding:0 2.5rem">系统正在升级维护中，暂时不能访问哦~升级成功后，您将会收到教室的短信通知</p>
    </div>
</template>
<script>
    export default {
        name: 'error',
        data() {
            return {
             
            }
        },
        created() {
            let XuantongStyemError =   window.localStorage.setItem('XuantongStyemError','XuantongStyemError')
        },
       
    }
</script>
<style lang="scss" scoped>

</style>


