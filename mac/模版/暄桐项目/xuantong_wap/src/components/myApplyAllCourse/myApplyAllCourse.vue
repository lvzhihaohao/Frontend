<template>
    <div id='app' style="overflow:sroll;">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="我的全部课程">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <div class='content' style="overflow-y:none !important">
            <div class=" pl-28 pr-28 pt-10">
                <img src="../../../static/img/back.png" class='gu_nav_title_img' v-if='this.$flag' @click='goBack'>
                <div class="Haveclass_menu-Hot allCourse_List">
                    <div v-for="(item,index) in couselist" :key="index">
                        <div v-for="(items,indexs) in item.userCourseSingleResponseVos" :key="indexs">
                            <div class="clear myAllCourse" v-if="items.purchased" @click='goChanJieDetail(items.courseId)'>
                                <div class="clearImg">
                                    <img v-lazy="items.coursePictureUri" :key="items.courseId" alt="">
                                    <img v-if="items.courseType==1" class="imgStatus" src="../../../static/img/course1.png" alt="">
                                    <img v-if="items.courseType==2" class="imgStatus" src="../../../static/img/course2.png" alt="">
                                </div>
                                <div>
                                    <span class="fz15 c30 app-h5-yichu">{{items.courseName}} </span>
                                    <p class="fz12 c30 boxEllipsiss">{{items.courseSubtitle}}</p>
                                    <p class="fz12 c4a5">{{items.studyTips}}<span style="margin-left: 2rem;">共{{items.classHourCount}}课</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="clear c3c">
                            <div><img src="../../../static/mobile_img/book_list1.png" alt=""></div>
                            <div>
                                <h3 class="fz15 c30">第一阶 | 篆隶筑基</h3>
                                <p class="fz12">《从书法之美到生活之美》</p>
                                <p class="fz12">共10课·进行至第6课</p>
                            </div>
                        </div>
                        <div class="clear">
                            <div><img src="../../../static/mobile_img/book_list2.png" alt=""></div>
                            <div>
                                <h3 class="fz15 c30">第二阶 | 篆隶筑基</h3>
                                <p class="fz12">《从书法之美到生活之美》</p>
                                <p class="fz12">共10课·进行至第6课</p>
                            </div>
                        </div>
                        <div class="clear">
                            <div><img src="../../../static/mobile_img/book_list3.png" alt=""></div>
                            <div>
                                <h3 class="fz15 c30">第三阶 | 篆隶筑基</h3>
                                <p class="fz12">《从书法之美到生活之美》</p>
                                <p class="fz12">共10课·进行至第6课</p>
                            </div>
                        </div> -->
                </div>
            </div>
            <!-- <ScrollBottom @timer="timer"  :moreTit="moreTit" ref="mychild"/> -->
            <div class='gu_clear_guide gu_clear_guide_middle' v-if="couselist.length<=0">
                <img src="../../../static/img/null-My_discussion.png" alt="">
                <p class=" fz12 mt-15 c9">暂时没有哦~</p>
            </div>
        </div>
         
    </div>
</template>
<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import ScrollBottom from '@/component/ScrollBottom'
    export default {
        data() {
            return {
                couselist: [],
                moreTit: '加载更多',
                Timingopen: null,
            }
        },
        
        components: {
            ScrollBottom
        },
        computed: {
            ...mapState({
                //我的订单数据
                List: state => state.indexClass.List,
                PageIndex: state => state.indexClass.pageIndex,
            })
        },
        mounted() {
            this.getList()
        },
        methods: {
            //单阶
            goChanJieDetail(id) {
                this.$router.push({
                    path: '/chanjiedetail',
                    query: {
                        id
                    }
                })
            },
            ...mapActions({
                getchangeList: 'indexClass/getchangeList',
                ChangePage: 'indexClass/ChangeGetPage',
            }),
            goBack() {
                this.$router.push({
                    path: '/index/indexclass',
                })
                // this.$router.back(-1)
            },
            //初始获取数据
            getList() {
                this.$axios
                    .post("/usercourse/list", {
                        pageIndex: 1,
                        typeKey: 0,
                        token: ""
                    })
                    .then(res => {
                        this.couselist = res.data.result.userCourseFullResponseVos
                        //console.log(this.couselist, '我的课程')
                    });
            },
            //加载更多
            //     timer(fn) {
            //             fn = null; //关闭滚动条
            //             let that = this;
            //             this.moreTit = "正在加载...";
            //             that.Timingopen = setInterval(function() {
            //                 that.ChangePage()
            //                 that.getMoreList()
            //         }, 1000);
            //   },
            //   //加载更多
            //   getMoreList(){
            //        clearInterval(this.Timingopen)
            //        this.$axios
            //         .post("/usercourse/list", {
            //             pageIndex:this.PageIndex,
            //             typeKey:-1,
            //             token: ""
            //         })
            //         .then(res => {
            //              let newarr = res.data.result.userCourseFullResponseVos;
            //               if (newarr.length == 0) {
            //                 this.moreTit = "暂时都在这里了...";
            //                 this.$refs.mychild.gets();
            //                 return
            //             }else{
            //                  newarr.forEach((item, i) => {
            //                     this.couselist.push(item);
            //                 });
            //                 this.moreTit = "加载更多";
            //                 this.$refs.mychild.get();
            //             }
            //         });
            //   }
        }
    }
</script>
<style lang="scss" scoped>
.myAllCourse{
    display: flex;
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
    }
.clearImg{
    flex-shrink: 0;
        position: relative;
        .imgStatus{
            width: 2rem!important;
            height: 2rem!important;
            position: absolute;
            top:-.5rem;
            left: -.5rem;
            
        }
    }
    .app-h5-yichu {
        font-size: 0.9375rem;
        width: 9.56rem; // height: 1rem;
        font-family: "FZXIYSJ";
        line-height: 1.9rem;
        overflow: hidden;
        padding-bottom: .4rem;
        margin-top: 0!important;
        margin-bottom: 0!important;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        word-break:break-all;
        text-overflow:ellipsis;
        overflow:hidden;
    }
    .fz12.c30{
        margin-bottom: .875rem!important;
    }
    .clear{
        padding-bottom: 1.25rem;
        border-bottom: 1px solid #eee;
    }
    .allCourse_List {
        border-top: none;
        border-bottom: none;
    }
    #app {
        display: flex;
        flex-direction: column;
        .content {
            flex: 1; // overflow: auto;
            .pl-28.pr-28 {
                position: relative;
            }
        }
    }
    .Haveclass_menu-Hot div.clear div{
        float: left;
    }
    .Haveclass_menu-Hot div.clear div img{
        width: 8.4725rem;
    }
    .gu_clear_guide_middle {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -2.5rem!important;
        margin-top: -3.5rem!important;
    }
</style>


