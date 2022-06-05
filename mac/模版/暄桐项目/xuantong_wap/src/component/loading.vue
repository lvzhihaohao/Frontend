<template>
    <div id="mask" v-if='flag' @touchmove.prevent>
        <img src="../../static/img/816.gif" alt="">
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name:"maskLoad",
    props:{
        flag:{
            default:false
        }
    },
}
</script>
<style lang="scss">
    #mask{
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .1);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        img{
        //  position: absolute;
        //     top: 30%;
            width: 3rem;
            height: 3rem;
            // height: 13.5859375rem;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -1.5rem;
            margin-left: -1.5rem;
        }
    }
</style>


