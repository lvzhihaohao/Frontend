<template>
    <ul class="">
        <li v-for='(item,index) in data' :key='index' class="mt-30"
            @click='goClassRoomTeacher(item.articleUrl)'
        >
            <div>
                <img :src="item.thumbUrl" :data-src='item.thumbUrl' alt="">
            </div>
            <div>
                <div class="articleTitleTitle">{{item.articleTitle}}</div>
                <p>
                    {{item.articleIntroduction}}
                </p>
                <time class="fz15">{{item.publishTime && item.publishTime.split(" ")[0]}}</time>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    name:'classroomteacherlist',
    props:{
        data:{
            type:null,
            required:true
        }
    },
    methods:{
        goClassRoomTeacher (url) {
           window.location.href = url; 
        }   
    }
}
</script>
<style lang='scss' scoped>
*{
    color: #555555;
}
li{
    width:100%;
    height:auto!important;
    div:nth-child(1){
        width:20rem !important;
        max-height:11.31rem !important;
             overflow: hidden;
             border-radius: .18rem;
             margin-bottom: 0.3125rem;
        // width: auto !important;
        img{
            width:100%;
            max-height: 11.31rem;
            overflow: hidden;
            object-fit:cover;
            border-radius: .18rem;
            margin:.625rem auto;
        }
    }
    div:nth-child(2){
        width:100% !important;
        text-align: left !important;
        margin-top:1rem !important;
        margin-left:0 !important;
        .articleTitleTitle{
                overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 2rem;
            line-height: 2rem;
            padding-top: .7rem;
            padding-bottom: .15rem;
            font-size:1.125rem !important;
            font-family: "FZXIYSJ";
            // color: #000000;
            color: #333;
        }
        p{
            // padding-top:.3rem;
            // height:3rem;
            // overflow: hidden;
            // text-overflow:ellipsis;//文本溢出显示省略号
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
            // line-height: 1.5 !important;
            // color:#555555;
            // margin: 0.625rem 0;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                word-break: break-all;
                text-overflow: ellipsis;
                overflow: hidden;
                margin-bottom: .5rem;
                font-size: 0.875rem !important;
                opacity: .8;
        }
        time{
            color:#999999;
                opacity: .6;
            // font-size: 1.06rem!important;
            bottom: -1.25rem!important;
                font-size: .9375rem;
                font-family:none;
        }
    }
}
</style>


