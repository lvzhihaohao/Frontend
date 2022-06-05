<template>
    <div class="clear Necessary">
        <h3>
            <img style="width: 1.3125rem;height: 1.3125rem;"  src="../../../static/img/equipmenticon.png" alt="">
            <span class="fz15 c30 fzGB1-0" style="font-weight:400;">文房文具</span>
        </h3>
        <ul v-if="data == 'undefined' || data.length > 0">
            <li v-for='(item,index) in data' :key='index' style="margin-bottom: 1.25rem;">
                <img 
                 v-lazy="item.toolThumbPic"
                 @click="click(item.toolUrl)"
                >
               
            </li>
        </ul> 
        <div class='gu_clear_guide' v-else>
            <img src="../../../static/img/null-My_discussion.png"  alt="" >
            <p class=" fz12 mt-15 c9">稍后告诉你哦</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'tasktreeequiplist',
    props:{
        data:{
            type:null,
            require:true
        }
    },
    mounted () {
    },
    methods: {
        click(url){
             window.location.href = url
            // window.open('www.baidu.com')
        }
    }
}
</script>
<style lang='scss' scoped>
    
    ul{
        li{
            width:3rem;
            height:3rem;
            background:#ccc;
            margin-right:.95rem;
        }
    }
    .Necessary{
        ul{
            display: inline-block;
            margin-bottom: 0!important;
        }
        padding-bottom: 1.2rem!important;
    }
</style>