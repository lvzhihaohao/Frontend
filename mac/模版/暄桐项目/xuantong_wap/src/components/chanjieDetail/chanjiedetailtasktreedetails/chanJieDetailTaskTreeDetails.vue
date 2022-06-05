<template>
    <div id="app">
        <mt-header title='上课' fixed :style="{background:'#fff',color:'#000'}" v-if='!this.$flag'>
            <a href="javascript:void(0);" slot="left" @click='goBack'>
                <mt-button icon="back" :style="{color:'#000'}"></mt-button>
            </a>
        </mt-header>
        <div v-if='chanJieDetailTaskTreeDetailsData !=null' class='gu_taskTreeDetailBox'>
            <img src="../../../../static/img/back.png" class='gu_nav_title_img' v-if='this.$flag' @click='goBack'>
            <!-- <div v-if='courseType == "1"' class='videoBox'>
                <div style="width:23.4375rem;height:13.25rem;background:#C4A57F">
                    <img style=' width: 21.5%;margin-left:9.375rem;margin-top:5rem;opacity: 0.5;' src="../../../../static/img/null-My_discussion.png">
                    <p style="text-align: center;
                                font-weight: 400;
                                line-height: 25px;
                                color: rgba(255,255,255,1);
                                opacity: 0.5;">
                        {{JSON.parse(typedata.isStar)&&JSON.parse(typedata.classhourNeedCountDown)}}
                        <span class="fz15" v-if="JSON.parse(typedata.isStar)&&JSON.parse(typedata.classhourNeedCountDown)">{{typedata.classhourReason}}<Timer :date="typedata.classhourCountDownTime"/></span>
                        <span class="fz15" v-else>{{typedata.classhourReason}}</span>
                        <span class="fz15" v-if="JSON.parse(typedata.isStar)&&!JSON.parse(typedata.classhourNeedCountDown)||!JSON.parse(typedata.isStar)&&JSON.parse(typedata.classhourNeedCountDown)">{{typedata.classhourCountDownTime}}</span>
                    </p>
                </div>
                <div>
                        <img  src="../../../../static/img/null-My_discussion.png">
                    </div>
                直播按钮
                <img @click='goVideo(chanJieDetailTaskTreeDetailsData.courseUrl)' style="marginTop:3.5rem"  v-if="typedata.classhourReason=='正在直播'" class='WatchVideo_bg' src="../../../../static/mobile_img/WatchVideo_bg.png" alt="">
            </div> -->

            <!-- 点击进行播放按钮进行判断是直播还是回播客 -->
            <div  :class='this.$flag?"videoBox":"mtLei40 videoBox"' v-if="!videosFlag">
                <div style="width:23.4375rem;height:13.25rem;background:#C4A57F">
                    <div class="backgoundCenten">
                    <img style="marginTop:1rem" class="banckImage" src="../../../../static/img/bluepople.png">
                    
                    <p v-if="typedata" style="width:13rem">
                        <!-- {{JSON.parse(typedata.isStar)}}
                    {{JSON.parse(typedata.classhourNeedCountDown)}} -->
                             <time class="fz14 cf countdown"
                             style=" background: none;width: 13rem;display:inline"
                              v-if="JSON.parse(typedata.isStar)&&JSON.parse(typedata.classhourNeedCountDown)">
                              {{typedata.classhourReason}}  &nbsp;<Timer style="display:inline" :date="typedata.classhourCountDownTime" hourType='' @clearTimes='clearTimes'/>
                             </time>
                            <time class="fz14 cf overdue" style=" background: none;" v-if="!JSON.parse(typedata.isStar)&&!JSON.parse(typedata.classhourNeedCountDown)">{{typedata.classhourReason}}</time>
                            <time class="fz14 cf countdown" style=" background: none;width: 13rem;display:inline" v-if="JSON.parse(typedata.isStar)&&!JSON.parse(typedata.classhourNeedCountDown)||!JSON.parse(typedata.isStar)&&JSON.parse(typedata.classhourNeedCountDown)">{{typedata.classhourCountDownTime}}</time>
                            <time v-if="courseType&&courseType==2">{{ChangeStartTime(typedata.startTime)}}</time>
                    </p>
                    <img  class="posiReact" src="../../../../static/img/ico-FreeVideo-cf.png" alt="" @click="videosFlagClick">
                    <!-- <p>111</p> -->
                    <!-- <p v-if="this.typedata&&JSON.parse(typedata.isStar)&&JSON.parse(typedata.classhourNeedCountDown)">
                        <span class="fz15" v-if="this.typedata&&JSON.parse(typedata.isStar)&&JSON.parse(typedata.classhourNeedCountDown)">{{typedata.classhourReason}}<Timer :date="typedata.classhourCountDownTime"/></span>
                        <span class="fz15" v-else>{{typedata.classhourReason}}</span>
                        <span class="fz15" v-if="this.typedata&&JSON.parse(typedata.isStar)&&!JSON.parse(typedata.classhourNeedCountDown)||!JSON.parse(typedata.isStar)&&JSON.parse(typedata.classhourNeedCountDown)">{{typedata.classhourCountDownTime}}</span>
                    </p> -->
                    </div> 
                </div>
            </div>

            <Videos ref="Videos" :initTimerone="typedata.classhourId"   v-if="videosFlag&&flag&&courseType=='2'" :data='typedata.coverPictureUrl' :url="Rurl" :index="0" />
            
            <section class=" pl-28 pr-28 mt-15">
                <h3 class="fz18 c30 fzGB1-0" style="font-weight: 400;opacity: 0.9;letter-spacing: 2px;">{{chanJieDetailTaskTreeDetailsData.classhourName}}</h3>
                <p class="fz15 c30 mt-10">{{chanJieDetailTaskTreeDetailsData.classhourIntroduction}}</p>
                <div class="post_img text-right" style="marginTop:0.875rem">
                    <!-- <img width="3.75rem" height="3.75rem" v-lazy="chanJieDetailTaskTreeDetailsData.copyBookUri" @click.stop='showImg()' style="border-radius:2px;" alt=""> -->
                </div>
            </section>
        </div>
        <div class='gu_clear_guide' v-else :style="{paddingTop:'3rem'}">
            <img src="../../../../static/img/null-My_discussion.png" alt="">
            <p class=" fz12 mt-15 c9">暂时没有哦~</p>
        </div>
        <div class="pl-28 pr-28" v-if='chanJieDetailTaskTreeDetailsData'>
            <!--instructions 说明-->
            <div class="clear instructions">
                <h3>
                    <img style="width: 1.3125rem;height: 1.3125rem;" src="../../../../static/img/Explainicon.png" alt="">
                    <span class="fz15 c30 fzGB1-0" style="font-weight:400">内容预告</span>
                </h3>
                <!-- 展开收起内容 -->
                <div v-if='chanJieDetailTaskTreeDetailsData.classhourContent'>
                    <p class='fz15 c9 noActive fzGB1-0' v-if="htmlShow">
                        <span class="fz14 fzGB1-0">
                            
                                {{
                            chanJieDetailTaskTreeDetailsData.classhourContent&&chanJieDetailTaskTreeDetailsData.classhourContent.length>=125?
                            chanJieDetailTaskTreeDetailsData.classhourContent.slice(0,125):chanJieDetailTaskTreeDetailsData.classhourContent
                                }}
                         </span>
                         <span class="fz15 " v-if="chanJieDetailTaskTreeDetailsData.classhourContent.length>=125">...</span>
                    </p>
                    <p v-if='!htmlShow' class='fz14 c9 Active fzGB1-0'>
                       {{chanJieDetailTaskTreeDetailsData.classhourContent}}
                    </p>
                    <span class="fz15 c077 fzGB1-0" style="top:0px;float:right" 
                    v-if="chanJieDetailTaskTreeDetailsData.classhourContent.length>=125"
                         @click='htmlShows'>{{htmlShow == true ?'展开' :'收起'}}</span>
                </div>
                <div class='gu_clear_guide' v-else>
                    <img src="../../../../static/img/null-My_discussion.png" alt="">
                    <p class=" fz12 mt-15 c9">暂时没有更多信息哦</p>
                </div>
            </div>
            <!--Level_task 本关任务-->
            <TaskTreeWorkList v-if='componentFlag' :data='chanJieDetailTaskTreeDetailsData.userHomeworkAssignResponseVos' />
            <!--必备装备 Necessary 必要的 -->
            <TaskTreeEquipList v-if='componentFlag' :data='chanJieDetailTaskTreeDetailsData.userClassHourToolResponseVos' />
            <!-- 闯关攻略  guide 指南-->
            <TaskTreeClassDataList v-if='componentFlag' :data='taskTreeDetailsClassDataList' :flag='this.$flag'/>
        </div>
    </div>
</template>
<script>
    import moment from "moment"
    import {userclasshourTime,formData} from '@/public/index'
    import {
        mapState,
        mapActions
    } from 'vuex'
    import TaskTreeWorkList from '../../../component/chanJieDetail/taskTreeWorkList'
    import TaskTreeClassDataList from '../../../component/chanJieDetail/taskTreeClassDataList'
    import TaskTreeEquipList from '../../../component/chanJieDetail/taskTreeEquipList'
    import Videos from '@/component/video_old.vue'
    import {getUserInfoCookie,getCookie} from '../../../public/index'
    import Timer from "@/component/chanJieDetail/Timer"; //处理时间
    export default {
        name: 'chanjiedetailtasktreedetails',
        data() {
            return {
                htmlShow: true,
                componentFlag: false, // 控制组件 渲染
                id: '', //存储id
                courseType: '', // 判断课程类型
                typedata: null,
                Rurl: [],
                flag: false,
                videosFlag:false,
            }
        },
        computed: {
            ...mapState({
                //任务树详情数据（课时大纲详情）
                chanJieDetailTaskTreeDetailsData: state => state.chanJieDetailTaskTreeDetailStore.chanJieDetailTaskTreeDetailsData,
                //课时资料数据
                taskTreeDetailsClassDataList: state => state.chanJieDetailTaskTreeDetailStore.taskTreeDetailsClassDataList,
                token: state => state.system.token, //用户token
                curTime: state => state.chanJieDetailStore.curTime
            })
        },
        beforeRouteEnter(to, from, next) {
            
            let taskTreeDetailsUrl = window.localStorage.getItem('taskTreeDetailsUrl')
            if (from.path == '/chanjiedetailmysubmitypework' || from.path == '/chanjietasktreedetailsubmitwork' ||
                from.path == '/typeworkdetail') {
                    
                if (taskTreeDetailsUrl) {
                    window.localStorage.setItem('taskTreeDetailsUrl', taskTreeDetailsUrl)
                }
            } else if (from.path == '/' || from.path == '/phonelogin' || from.path == '/emaillogin') {
                if (taskTreeDetailsUrl) {
                    window.localStorage.setItem('taskTreeDetailsUrl', taskTreeDetailsUrl)
                }
            } 
             else if(from.path == '/couse' || from.path == '/couseback'){
                //  debugger
                //  //console.log('5555')
                //  return
                 window.localStorage.setItem('taskTreeDetailsUrl', '/chanjiedetail')
            }
            else {
                window.localStorage.setItem('taskTreeDetailsUrl', from.path)
            }
            next()
        },
        watch: {},
         
        methods: {
            formData,
            ...mapActions({
                //任务树详情方法（课时大纲详情）
                getChanJieDetailTaskTreeDetailsAction: 'chanJieDetailTaskTreeDetailStore/getChanJieDetailTaskTreeDetailsAction',
                //课时资料方法
                getTaskTreeDetailsClassDataAction: 'chanJieDetailTaskTreeDetailStore/getTaskTreeDetailsClassDataAction'
            }),
            showImg(item) {
                // this.popupVisible =true;
                // this.imgUrl =item.pictureUrl;
                this.ShowViewer(this.chanJieDetailTaskTreeDetailsData.copyBookUri)
            },
            goBack() {
                let taskTreeDetailsUrl = window.localStorage.getItem('taskTreeDetailsUrl')
                if (taskTreeDetailsUrl) {
                    this.$router.push({
                        path:taskTreeDetailsUrl=="/perfectPersonalInformation"?'/chanjiedetail':taskTreeDetailsUrl
                    })
                } else {
                    this.$router.back(-1)
                }
            },
            goVideo(url) {
                window.location.href = url
            },
            htmlShows() {
                this.htmlShow = !this.htmlShow
            },
            ChangeStartTime(time){
                if(moment(time).add(-8, "h").valueOf() <  moment().valueOf()){
                    return ''
                }else{
                     return moment(time).add(-8, "h").format("YYYY-MM-DD HH:mm")
                }
               
                // return  moment(time).format("YYYY-MM-DD HH:mm:ss");
            },
            // 时间到了更改直播状态
            clearTimes(data){
                this.typedata.classhourReason=data;
            },
        //    点击进行播放按钮进行判断是直播还是回播 
            async videosFlagClick(){
                if(this.courseType=='2'){
                    let time =  this.formData(this.typedata.startTime,"utc","add")
                    let Old = moment(time).valueOf() 
                    let New = moment().valueOf() 
                    // //console.log(New,'现在')
                    // //console.log(Old,'可播放')
                    // return
                    if(Old<New){ //录播没有超出时间
                        this.videosFlag=true
                    }else{
                        this.$Toast({
                            message:'录播未开始，稍作等待哦',
                            duration: 1000
                        });
                    }
                    return
                 
                }else{
                    if(this.typedata.classhourType==1){
                        let curTimes = moment(this.curTime).valueOf()
                        let DownTimes = moment(this.typedata.classhourCountDownTime).valueOf()
                        if(this.typedata.classhourReason=="正在直播" || (DownTimes-curTimes<=86400000&&DownTimes-curTimes>=0)){
                            //认证请求
                            let uid = moment().valueOf();
                            let token = JSON.parse(getCookie()).result
                            // //console.log() 
                            let res = await this.$axios.post("/userclasshour/play", {
                            uid,
                            classhourId: this.typedata.classhourId,
                            token: ""
                            });
                            //console.log(res.data.result,'data')
                            if(res.data.code==0){
                                //  this.src = res.data.result.url
                                if(res.data.result.code==1){
                                    //重定向到首页
                                    this.$router.push({
                                    path:'index/indexShouye',
                                    })
                                    this.$ModelToast(true)
                                }
                                else if(res.data.result.code==2){
                                //未登录到课程详情
                                    this.$router.push({
                                        path:'/chanjiedetail',
                                        query:{id:res.data.result.courseId}
                                    })
                                    this.$Toast("报名后可以查看详情哦")
                                }
                                else if (res.data.result.code==3){
                                    this.src = res.data.result.url
                                    window.location.href=this.src;
                                }
                            }
                            // this.$router.push({
                            //     path: '/couse',
                            //     query:{id:this.typedata.classhourId}
                            // })
                        }
                   }else if(this.typedata.classhourType==2){
                       if(this.typedata.classhourReason=="回放已结束")return
                        //认证请求
                        let uid = moment().valueOf();
                        let token = JSON.parse(getCookie()).result
                        let res = await this.$axios.post("/userclasshour/playback", {
                            uid,
                            classhourId: this.typedata.classhourId,
                            token: ""
                        });
                        if(res.data.code==0){
                            if(res.data.result.code==1){
                            //重定向到首页
                                this.$router.push({
                                path:'index/indexShouye',
                            })
                            this.$ModelToast(true)
                            }
                            else if(res.data.result.code==2){
                            //未登录到课程详情
                                this.$router.push({
                                path:'/chanjiedetail',
                                query:{id:res.data.result.courseId}
                                })
                                    this.$Toast("报名后可以查看详情哦")
                                }
                            else if (res.data.result.code==3){
                                this.src = res.data.result.url
                                window.location.href=this.src;
                            }
                        }
                        // this.$router.push({
                        //     path: '/couseback',
                        //     query:{id:this.typedata.classhourId}
                        // })
                   }
                }
            },
            //处理公共数据2
            disposedata2(id) {
                let data = {
                    classhourId: id || this.$route.query.classhourId,
                    token: ''
                };
                return data;
            },
            async auto() {
                if (JSON.stringify(this.$route.query) == "{}") {
                    this.typedata = JSON.parse(window.localStorage.getItem('app-homedetail'))
                    // //console.log(, '空')
                } else {
                    this.typedata = this.$route.query
                    window.localStorage.setItem('app-homedetail', JSON.stringify(this.$route.query))
                    //console.log(this.typedata, '有')
                }
                // this.typedata = this.$route.query
                this.courseType = window.localStorage.getItem('courseType');
                if (this.$route.query.classhourId) {
                    this.id = this.$route.query.classhourId
                    window.localStorage.setItem('taskTreeDetailsClasshourId', this.$route.query.classhourId)
                } else {
                    this.id = window.localStorage.getItem('taskTreeDetailsClasshourId')
                }
                await this.getChanJieDetailTaskTreeDetailsAction(this.disposedata2(this.$route.query.classhourId || this.id))
                await this.getTaskTreeDetailsClassDataAction({
                    classhourId: this.$route.query.classhourId || this.id,
                    pageIndex: 1
                })
                this.$nextTick(() => {
                    this.componentFlag = true
                })
                setTimeout(()=>{
                     window.scrollTo(0,0)
                })
                //console.log(this.chanJieDetailTaskTreeDetailsData.classhourType, '课程详情')
                
            }
        },
        mounted() {
            window.onscroll = null
            this.auto()
            // debugger
            //  this.htmlShow=true
            // setTimeout(() => {
            //     let H = this.$refs.moreP.clientHeight
            //     //  //console.log((H/16)-0.225,(78/16)-0.225)
            //     if ((H / 16) - 0.225 > (78 / 16) - 0.225) {
            //         this.htmlShow = true
            //     } else {
            //         this.htmlShow = null
            //     }
            // }, 200)
            //console.log(this.typedata,'urltypedatatypedata')
            this.$axios.post('/utility/getUrl', {
                key: this.typedata.courseUrl
            }).then(res => {
                //console.log(res.data.result,'res.data.result')
                this.Rurl = res.data.result
                //   this.videoObj =  this.data;
                this.flag = true
            })
        },
        components: {
            TaskTreeWorkList,
            TaskTreeClassDataList,
            TaskTreeEquipList,
            Videos,
            Timer
        }
    }
</script>
<style lang="scss" scoped>
    .backgoundCenten{
        width: 8rem;
        height: 8rem;
        // overflow: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -4rem;
        margin-top: -4rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        .banckImage{
            width:5rem;
            opacity: 0.5;
        }
        p{
            text-align: center;
            width: 100%;
            font-weight: 400;
            line-height: 1.2rem;
            color: rgba(255,255,255,1);
            // opacity: 0.5;
            padding-top:1rem;
        }
    }
    .mobile_content article:last-child {
        margin-bottom: 0rem;
    }
    .instructions{
        margin-bottom: 2rem;
    }
    .instructions div {
        .fz15.c9.noActive {
            text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 3;
            // -webkit-box-orient: vertical;
            overflow: hidden;
            span{
                top: 0px!important;
            }
        }
        .fz15.c9.active {
            overflow-x: hidden;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: none !important;
        }
    }
    .mint-header {
        background: none;
    }
    .mtLei40{
        margin-top: 2.5rem;
    }
    .videoBox {
        position: relative;
        .WatchVideo_bg {
            width: 2rem;
            height: 2rem;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -1rem!important;
            margin-left: -1rem;
            z-index: 9999;
        }
    }
    .gu_taskTreeDetailBox {
        position: relative;
    }
    .posiReact{
        width: 2rem;
        // background: #fff;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
    }
</style>

