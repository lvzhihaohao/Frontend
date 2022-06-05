<template>
    <div id='Haveclass_menu'>
        <article class="nav-title">
            <mt-header fixed :title="this.$flag ? '':'上课'">
                <router-link to="/myapplyallcourse" slot="right">
                    <mt-button class="fz15 c4a5">我的全部课程</mt-button>
                </router-link>
            </mt-header>
        </article>
        <div class="mobile_content pl-15 pr-15 Haveclass_menuContent mobile_content_leijc">
            <article class="dis_flow_root">
                <div class="Haveclass_menu-content">
                    <!-- 正在上课的数据 -->
                    <div v-for="(item,index) in couselist" :key="index">
                        <div v-for="(items,indexs) in item.userCourseSingleResponseVos" :key="indexs">
                            <div class="Haveclass_menu-title" style="display:flex" v-if="items.purchased" @click='goChanJieDetail(items.courseId)'>
                                <div class="Haveclass_menu_box_Img">
                                    <img v-lazy="items.coursePictureUri" :key="items.courseId" alt="">
                                    <img v-if="items.courseType==1" class="imgStatus" src="../../../static/img/course1.png" alt="">
                                    <img v-if="items.courseType==2" class="imgStatus" src="../../../static/img/course2.png" alt="">
                                </div> 
                                <div>
                                    <div class="fz15 c30 app-h5-yichu" style="width:10.56rem"> {{items.courseName}}</div>
                                    <p class="fz12 c30 boxEllipsiss">{{items.courseSubtitle}}</p>
                                    <p class="fz12 c4a5 fz12lei">{{items.studyTips}}<span style="margin-left: 2rem;">共{{items.classHourCount}}课</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 课程推荐的数据 -->
                    <div class="Haveclass_menu-Hot" v-if='Recom'>
                        <h2 class="fz24 c30 c3">课程推荐</h2>
                        <div class=" pl-12 pr-12 dis_flow_root" v-for="(item,index) in couselist" :key="index" v-if="item.isTurnFullCourse">
                            <h3 @click="goAllCourseDetail(item.courseFullId,item.isTurnFullCourse)">
                                <span class="fz12 cf live" v-if="item.courseType==1">直播课</span>
                                <span class="fz12 cf recorded" v-else>录播课</span> {{item.courseName}}
                            </h3>
                            <div v-for="(items,indexs) in item.userCourseSingleResponseVos" :key="indexs">
                                <!-- 暂时把purchased 改动一下 -->
                                <div class="clear dispFlex" v-if="!items.purchased" @click='goChanJieDetail(items.courseId)'>
                                    <div>
                                        <img src='items.coursePictureUri' :key="items.courseId" v-lazy="items.coursePictureUri" alt="">
                                    </div>
                                    <div>
                                        <div class="fz15 c30 app-h5-yichu">{{items.courseName}}</div>
                                        <p class="fz12 boxEllipsiss" style="margin-bottom: .875rem;" v-if="items.courseSubtitle">{{items.courseSubtitle}}</p>
                                        <p class="fz12 c4a5 fz12lei">{{items.studyTips}}</p>
                                    </div>
                                </div>
                            </div>
                            <p class="clear text-right" v-if="item.isTurnFullCourse&&!item.purchased">
                                <span class="fz12 c4a5 ">转为全阶后可优惠{{item.transCourseFullSavePrice}}元</span>
                                <mt-button class="btn_apply ml-10" @click="goAllCourseDetail(item.courseFullId,item.isTurnFullCourse)">转报全阶</mt-button>
                            </p>
                            <!-- <p class="clear text-right" v-else >
                                        <span class="fz12 c4a5 " style="color:#ccc !important">转为全阶后可优惠{{item.transCourseFullSavePrice}}元</span>
                                        <mt-button class="btn_apply ml-10" style="background:#ccc">转报全阶</mt-button>
                                    </p> -->
                        </div>
                    </div>
                    <!-- 跳转老系统按钮 -->
                    <div :class="couselist.length<=0?'nullGoOldbutton goOldbutton':'goOldbutton'" v-if="userInfo">
                        <div class="btn-drop_box_lei">
                        <mt-button class="btn_drop app-h5-ins" type="primary" @click="goOld">返回老教室</mt-button>
                        </div>
                        <p class="fz12 mt-15 c9">点击此按钮，可以查看您所报名的 《从书法之美到生活之美——全阶课程》或《从书法之美到生活之美——自在行草》课程。</p>
                    </div>
                    <!-- 用户没有登陆显示的静默图 -->
                    <div class='gu_clear_guide gu_clear_guide_middle' v-if='!userInfo'>
                        <img src="../../../static/img/null-My_discussion.png" alt="">
                        <p class=" fz12 mt-15 c9">暂时没有哦</p>
                    </div>

                </div>
            </article>
        </div>
    </div>
</template>
<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import {
        downTime,
        addMore,
        getUserInfoCookie,
        setUserInfoCookie,
        getCookie
    } from "../../public/index"
    export default {
        name: 'indexclass',
        data() {
            return {
                couselist: [],
                Recom: false,
                userInfo: [],
                flag: false
            }
        },
        created() {
            if(getCookie()=='undefined'){
                setUserInfoCookie(undefined)
                this.$ModelToast(true)
                return
            }
            let getUserList =  JSON.parse(getUserInfoCookie())
            if (!getUserInfoCookie() || getUserInfoCookie() == 'undefined') {
                this.userInfo = undefined
            } else {
                if (!getUserList) {
                    this.$axios.post("/user/getuserinfo", {
                        token: ""
                    }).then(res => {
                        setUserInfoCookie(res.data.result)
                        this.userInfo = res.data.result
                    });
                }else{  
                    this.userInfo = getUserList
                }
            }
            if(this.userInfo == undefined){
                this.$ModelToast(true)
                return
            }
        },
        methods: {
            // 回到老系统
            goOld(){
                // window.location.href='https://ex.xuantong.cn/'
                window.open("https://former.xuantong.cn")
            },
            //全阶
            goAllCourseDetail(id, type) {
                this.$router.push({
                    path: '/allcoursedetail',
                    query: {
                        id: id,
                        istype: type
                    }
                })
            },
            //单阶
            goChanJieDetail(id) {
                this.$router.push({
                    path: '/chanjiedetail',
                    query: {
                        id
                    }
                })
            },
        },
        
        mounted() {
            if(getCookie()=='undefined'){
                setUserInfoCookie(undefined)
                this.$ModelToast(true)
                return
            }
            window.onscroll = null
            this.$axios
                .post("/usercourse/list", {
                    pageIndex: 1,
                    typeKey: 1,
                    token: ""
                })
                .then(res => {
                    this.couselist = res.data.result.userCourseFullResponseVos
                    //console.log(res.data.result.userCourseFullResponseVos, '我的课程')
                    this.couselist.forEach((item, i) => {
                        if (item.isTurnFullCourse) {
                            this.Recom = true
                        }
                    })
                })
        },
    }
</script>
<style lang="scss" scoped>
.app-h5-ins {
    background: #c4a57f;
    color: white;
    font-size: 1rem;
}
.nullGoOldbutton{
    position: fixed;
    top:50%;
    margin-top: -2.8rem;
}
.goOldbutton{
    padding-top: 1rem;
    margin-bottom:2rem;
    .btn-drop_box_lei{
        display: flex;
        justify-content: center;
        
    }
    p{
        line-height: 1.5rem;
        padding: 0 2.5rem;
        // text-align: center;
    }

}

.fz12lei{
    font-weight: 300;
}
.mobile_content_leijc{
    padding-top: 2rem;
    overflow: hidden;
}
    .Haveclass_menu_box_Img{
        position: relative;
        .imgStatus{
            width: 2rem;
            height: 2rem;
            position: absolute;
            top:-.5rem;
            left: -.5rem;
            
        }
    }
    .Haveclass_menuContent {
        margin-top: 2.5rem;
    }
    .app-h5-yichu {
        font-size: 0.9375rem;
        width: 9.56rem;
        line-height: 1.9rem;
        font-family: "FZXIYSJ";
        overflow: hidden;
        white-space: nowrap;
        color: #000;
        text-overflow: ellipsis;
    }
    .mobile_content.pl-15.pr-15.Haveclass_menuContent{
        margin-top: 0!important;
    }
    .Haveclass_menu-Hot>.dis_flow_root>h3{
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        word-break:break-all;
        text-overflow:ellipsis;
        overflow:hidden;
    }
    .boxEllipsis{
        width: 9.56rem;
         display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        word-break:break-all;
        text-overflow:ellipsis;
        overflow:hidden;
    }
    .boxEllipsiss{
        line-height: 1rem;
        width: 9.56rem;
         display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        word-break:break-all;
        text-overflow:ellipsis;
        overflow:hidden;
         -webkit-line-clamp:2;
         opacity: .8;
        //  margin-bottom: .3rem!important;
    }
    .Haveclass_menu-Hot>.dis_flow_root .dispFlex{
        display: flex;
    }
    .gu_clear_guide_middle {
        // width:4rem; 
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -2rem!important;
        margin-top: -2rem!important;
        font-size: .9375rem;
        img{
            width:4rem;
        }
    }
</style>


