<template>
<div>
    <ul class='indexUl' @click='goArticleLink()'>
        <li>
            <div>
                <img src="../../../static/img/Classroom_teacher1.png" alt="">
            </div>
            <div class='right'>
                <h4 class="fz15">暄桐教室</h4>
                <p class="fz12 c5">一间美育教室，以书法为起点，亲近中国传统之美，滋养当下生活</p>
            </div>
        </li>
        <li>
            <div>
                <img src="../../../static/img/Classroom_teacher2.png" alt="">
            </div>
            <div class='right'>
                <h4 class="fz15">林曦</h4>
                <p class="fz12 c5">水墨画家，毕业于中央美术学院，暄桐教室的创办人与授课老师</p>
            </div>
        </li>
         <li>
            <div>
                <img src="../../../static/img/Classroom_teacher3.png" alt="">
            </div>
            <div class='right'>
                <h4 class="fz15">暄桐线上课</h4>
                <p class="fz12 c5">为喜爱传统文化艺术的同好精心设置的线上教学系统</p>
            </div>
        </li> 
    </ul>
    
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
    export default {
        name: 'articles',
        data(){
            return{
            }
        },
        methods: {
            goArticleLink() {
                this.$router.push({
                    path: "/classroomteacher"
                });
            },
        },
       
    }
</script>
<style lang='scss' scoped>
    ul {
        img {
            width: 9.56rem;
            height: 5.43rem;
            border-radius: .18rem;
            
        }
        h4 {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: .93rem;
            font-weight: 400;
            margin-bottom: 0.68rem;
            -webkit-box-orient: vertical;
        }
        p {
            overflow: hidden;
            line-height: 1.125rem;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            margin-bottom: .625rem;
            -webkit-box-orient: vertical;
        }
        .c9 {
            font-family: 'STHeitiSC-Light';
            font-weight: 300;
        }
    }
    .searchUl {
        box-sizing: border-box;
        padding-left: 1.75rem;
        margin-top: 1.31rem;
        .right {
            padding-right: 1.81rem;
        }
    }
    .Book div ul li{
        width: 100%;
        margin-top: 0!important;
    }
</style>