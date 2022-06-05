<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="学习回顾" fixed>
                 <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../../static/img/back.png" class='gu_nav_title_img_top' 
            v-if='this.$flag' @click='goBack'>
        <div class="gu_content">
            <div class="mobile_content pl-28 pr-28">

                <div class="dis_flow_root review-content" v-if="List">
                    <h3 class="fz15 c30">亲爱的{{List.nickName}}同学：</h3>
                    <ul class="mt-20" v-if="List">
                        <li>【{{List.courseName}}】共{{List.classhourTotalNum}}节课 </li>
                        <li>
                            这一阶你共上课{{List.classhourAttendNum}}节，
                            上课时长共{{List.joinTime}}小时，
                            获得{{List.starNum}}个 <img style="width:.8rem;height:.8rem;" src="../../../../static/img/checkPoint_praise2.png">
                         </li>
                         <li>共交了{{List.homeworkSubmitNum}}份作业，作业图共{{List.homeworkPicNum}}张</li>
                         <li>晒出作业{{List.homeworkSunNum}}份儿，分享图片{{List.homeworkSunPicNum}}张</li>
                         <li>收获了{{List.homeworkSunLikeNum}}个赞</li>
                         <li>收到了{{List.homeworkSunCommentNum}}条评论，送出了{{List.homeworkSunReplyNum}}条评论</li>
                        <!--
                        <li>勤奋好学的你这一学年一共上了{{List.classhourTotalNum||0}}节课</li>
                        <li>上课总时长{{List.joinTime||0}}个小时</li>
                        <li>观看过{{List.zhiBo}}个小时的直播与{{List.luBo||0}}个小时的视频</li>
                        <li>你最喜欢的课程是{{List.favouriteCourse||0}}</li>
                        <li>上交过{{List.homeWorkNum||0}}份作业</li>
                        <li>一共晒出了{{List.sunHomeWorkTime||0}}份作业</li>
                        <li>上传过{{List.pictureNum||0}}张图片</li>
                        <li>你的话题收到了{{List.topicPraiseNum||0}}人点赞</li>
                        <li>参与过{{List.joinDiscuss||0}}个话题讨论</li> -->
                    </ul>
                </div> 

                <div class="review-time">
                    <p class="fz14 c4a5">
                        <!-- 我们一起回忆下你进步过程吧~ -->
                        一起回顾下你的进步过程吧~
                    </p>
                    <ul class="fz12 c30" v-if="List">
                        <li >{{formDatas(List.registeredTime,"utc")}} 加入暄桐教室</li>
                        <li>{{formDatas(List.registrationTime,"utc")}} 报名了{{List.courseName}}课程，开始学习之旅~</li>
                        <li v-if="List.firstClassTime">{{formDatas(List.firstClassTime,"utc")}} 第一次上课，还记得当时的感觉吗~</li>
                        <li v-if="List.firstHomework">{{formDatas(List.firstHomework.createTime,"utc")}} 第一次交作业，看看自己出发时的样子
                            <div class="FirstList">
                                <p  v-html="List.firstHomework.content"></p>
                                <div>
                                    <span v-for="(item,index) in List.firstHomework.homeworkFinishPictures" :key="index">
                                      <img v-lazy="item.homeworkThumbUri"/>
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li v-if="List.firstSunHomework">{{formDatas(List.firstSunHomework.createTime,"utc")}} 第一次晒作业，分享自己的成果
                            <div class="FirstList">
                                <p  v-html="List.firstSunHomework.content"></p>
                                <div>
                                    <span v-for="(item,index) in List.firstSunHomework.courseDiscussionPictures" :key="index">
                                      <img v-lazy="item.discussionThumbUri"/>
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li v-if="List.likeMostSunHomework&&List.likeMostSunHomework.likeNum>0">{{formDatas(List.likeMostSunHomework.createTime,"utc")}} 这次作业获得的赞最多
                            <div class="FirstList">
                                <p  v-html="List.likeMostSunHomework.content"></p>
                                <div>
                                    <span v-for="(item,index) in List.likeMostSunHomework.courseDiscussionPictures" :key="index">
                                      <img v-lazy="item.discussionThumbUri"/>
                                    </span>
                                </div>
                            </div>
                           </li>
                        <li v-if="List.commentMostSunHomework&&List.commentMostSunHomework.commentNum>0">{{formDatas(List.commentMostSunHomework.createTime,"utc")}} 这条作业下面最热闹
                             <div class="FirstList">
                                <p  v-html="List.commentMostSunHomework.content"></p>
                                <div>
                                    <span v-for="(item,index) in List.commentMostSunHomework.courseDiscussionPictures" :key="index">
                                      <img v-lazy="item.discussionThumbUri"/>
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li v-if="List.firstCommentInfo">第一位与你有交流的同学是{{List.firstCommentInfo.commentUser }}</li>
                        <!-- <li v-else>目前没有人跟你互动哦~</li> -->
                        <!-- <li v-for="(item,index) in List.courseMessage" :key="index">{{formDatas(item.joinTime)}} 报名了{{item.courseName}}课程</li> -->
                        <!-- <li>2018-09-24 报名了第二阶《楷书精进》课程</li> -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template> 
<script>
 import moment from "moment"
import {formDatas} from "@/public/utils"
export default {
    name:'chanjiedetailwinreview',
    data(){
        return{
            List:null
        }
    },
    methods:{
        formDatas,
        goBack () {
            this.$router.back(-1)
        },
    },
    mounted () {
        let chanJieId = window.localStorage.getItem('chanJieId')
        this.$axios.post('activity/coursestudyreview',{
            token:'',
            courseId:chanJieId
        }).then(res=>{ 
                this.List = res.data.result
                // //console.log(this.List)
        })
        if(this.$flag){
            document.getElementsByClassName('gu_content')[0].style='margin-top:1.5625rem'
        }else{
            document.getElementsByClassName('gu_content')[0].style='margin-top:3.5625rem'
        }
    }
}
</script>
<style lang="scss" scoped>
.mobile_content article:last-child {
    margin-bottom: 0rem;
}
.FirstList{
    p{
        color: #999;
        margin-top: 0.3rem;
    }
    div{
        margin-top: 0rem;
        width: 100%;
        max-height:13rem;
        display: flex;
        flex-wrap: wrap;
        span{
            background: yellow;
            width: 30%;
            height: 4rem;
            margin-top: 0.5rem;
            margin-right: 0.5rem;
            img{
                width: 100%;
                height: 100%;;
                object-fit: cover;
            }
        }
    }
}
</style>

