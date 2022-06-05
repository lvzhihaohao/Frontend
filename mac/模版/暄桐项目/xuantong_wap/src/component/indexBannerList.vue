<template>
    <mt-swipe :auto="4000"  :show-indicators="false" @change="handleChange">
        <mt-swipe-item v-for="(item,index) in data" :key='index' 
        @click.native='goBannerLink(item.pictureJumpUrl)'
        >
            <img :src="item.pictureUri" alt=""
                :data-src='item.pictureUri'
            >
        </mt-swipe-item>
        <ol class='indicators'>
            <li  v-for="(item,index) in data" :key='index' 
            :class='defaultIndex==index?"active":""'></li>
        </ol>
    </mt-swipe>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:'banner',
    data(){
        return{
            defaultIndex:0
        }
    },
    props:{
        data:{
            type:null,
            require:true
        }
    },
    methods: {
        goBannerLink (url) {
            window.location.href = url; 
        },
        handleChange (index) {
            this.defaultIndex = index;
        }
    }
}
</script>
<style lang='scss' scoped>
    .mint-swipe-item img{
        width:23.4375rem;
        height:13.3125rem;
    }
    .mint-swipe{
        position:relative;
    }
    .indicators{
        position:absolute;
        bottom:.35rem;
        left:0;
        width:100%;
        height:0.8rem;
        display:flex;
        justify-content: center;
        li{
            width:.5rem;
            height:.5rem;
            background:#fff;
            border-radius:50%;
            margin-right:5px;
            &.active{
                width:1.56rem;
                height:.5rem;
                background:#C4A57F;
                border-radius:.25rem;
            }
        }
    }
</style>