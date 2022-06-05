<template>
    <div>
        <div class="Chairclass-content mb-30" v-for='(item,index) in data' :key='index'
            @click='goPeopleWriteLink(item.articleUrl)'
        >
            <img :src="item.thumbUrl" alt="" :data-src='item.thumbUrl' :key='index'>
            <div class="content_title fz18 c30 app-z-fonS">{{item.articleTitle}}</div>
            <p class="fz15 c5">
                {{item.articleIntroduction}}
            </p>
            <time class="fz15 c9">{{item.publishTime.split(" ")[0]}}</time>
        </div>
    </div>
    
</template>
<script>
export default {
    name:'peopleWriteList',
    props:{
        data:{
            type:null,
            required:true
        }
    },
    methods: {
        goPeopleWriteLink(url){
            window.location.href = url; 
        }
    }
}
</script>
<style lang='scss' scoped>
.content_title{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 2rem;
    line-height: 2rem;
    padding-top:.7rem;
    padding-bottom: .15rem;
}
p{
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    word-break:break-all;
    text-overflow:ellipsis;
    overflow:hidden;
    margin-bottom: .5rem;
    font-size: .875rem!important;
    opacity: .8;
}
img{
    width:20rem;
    height:11.31rem;
    border-radius: .18rem;
}
time{
    opacity: .6;
}
</style>