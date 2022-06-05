<template>
    <article class="dis_flow_root mt-30">
        <div class="clear" style="margin-top:7px;" v-if='data.length>0'>
            <img v-for='(item,ind) in data' :key='ind' :src="item" alt="">
        </div>
        <div class='gu_clear_guide' v-else style="margin-top:15%">
            <img src="../../../static/img/null-My_discussion.png" alt="">
            <p class=" fz12 mt-15 c9">暂时没有内容哦~</p>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        data: {
            type: null,
            require: true
        },
        FiexTop:{
                    type:null
        },
        FiexTopAdd:{
                    type:null
        }
    },
    mounted(){
        //console.log('我我我我我我我')
             window.onscroll = () =>{
                 //console.log(this.getScrollTop(),this.FiexTop+20,'??????????')
               if(this.getScrollTop() >= this.FiexTop+20){
                    this.FiexTopAdd('add')
                }else{
                    this.FiexTopAdd('remove')
               }
         }
    },
    methods:{
        //获取屏幕滚动值
      getScrollTop() {
        //网页滚动量
        var scrollTop = 0,
          bodyScrollTop = 0,
          documentScrollTop = 0;
        if (document.body) {
          //兼容IE
          bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
          //主流浏览器
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop =
          bodyScrollTop - documentScrollTop > 0 ?
          bodyScrollTop :
          documentScrollTop;
        return scrollTop;
      },
    }
}
</script>

<style>

</style>
