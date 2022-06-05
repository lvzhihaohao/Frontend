<template>
    <div id="app">
        <article class="nav-title Haveclass_nav_title" v-if='!this.$flag'>
            <mt-header title="教室与老师">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png" class='gu_nav_title_img_top' v-if='this.$flag' @click='goBack'>
        <div class="mobile_content">
            <mt-navbar v-model="Classroom_teacher" :class="this.$flag?'Haveclass_menuList Haveclassshouji_menuList':'Haveclass_menuList'">
                <mt-tab-item id="1">关于暄桐</mt-tab-item>
                <mt-tab-item id="2">关于林曦</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="Classroom_teacher">
                <mt-tab-container-item id="1">
                     <img src="../../../static/mobile_img/xtbirtf.jpg" />
                    <div class="mobile_content" v-if='classRoomTeacherXuantongList.length > 0'>
                        <article class="Book fl publicPadding Classroom_teacher">
                            <ClassRoomTeacher :data='classRoomTeacherXuantongList' />
                        </article>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                     <img src="../../../static/mobile_img/teabiref.jpg" />
                    <div class="mobile_content Haveclass_menuList-content2" v-if='classRoomTeacherXuantongList.length > 0'>
                        <article class="Book fl publicPadding  Classroom_teacher">
                            <ClassRoomTeacher :data='classRoomTeacherLinxiList' />
                        </article>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
            <ScrollBottom @timer="timer"  v-if='classRoomTeacherXuantongList.length > 0' :moreTit="moreTit" ref="mychild"/>
        </div>
    </div>
</template>
<script>
    import ScrollBottom from '@/component/ScrollBottom'
    import ClassRoomTeacher from '../../component/classRoomTeacherList'
    import {
        mapState,
        mapActions
    } from 'vuex'
    export default {
        name: 'classroomteacer',
        data() {
            return { 
                Classroom_teacher: '1',
                value: '',
                moreTit:'加载更多',
                Timingopen:null,
                index:1,
                tabid:4
            }
        },
        components: {
            ClassRoomTeacher,
            ScrollBottom
        },
        computed: {
            ...mapState({
                //关于暄桐数据
                classRoomTeacherXuantongList: state => state.classRoomTeacherStore.classRoomTeacherXuantongList,
                //关于林溪数据
                classRoomTeacherLinxiList: state => state.classRoomTeacherStore.classRoomTeacherLinxiList
            })
        },
        watch: {
            Classroom_teacher(newValue, oldValue){
                if(newValue=='1'){
                    this.tabid = 4
                }else{
                    this.tabid = 3
                }
                this.index = 1
                this.moreTit = "加载更多";
                if(this.$refs.mychild){
                    this.$refs.mychild.get();
                }
                
                //console.log(this.tabid,'this.tabid')
            }
        },
        methods: {
            //加载更多
            timer(fn) {
                 if (this.moreTit == "暂时都在这里了...") {
                        return;
                }
                    fn = null; //关闭滚动条
                    let that = this;
                    this.moreTit = "正在加载...";
                    that.Timingopen = setInterval(function() {
                        that.getMoreList()
                    }, 1000);
            },
            getMoreList(){
                clearInterval(this.Timingopen)
                this.index++
                this.$axios.post("/article/list", {
                    columnId: this.tabid,
                    pageIndex:this.index,
                    token: ""
                }).then(res=>{
                    let newarr = res.data.result.artivityResponseVos;
                    if (newarr.length == 0) {
                        this.moreTit = "暂时都在这里了...";
                        this.$refs.mychild.gets();
                        return
                    }else{
                       
                        newarr.forEach((item, i) => {
                             if(this.tabid==4){
                                this.classRoomTeacherXuantongList.push(item);
                             }else{
                                 this.classRoomTeacherLinxiList.push(item);
                             }
                            
                        });
                        this.moreTit = "加载更多";
                        this.$refs.mychild.get();
                    }
                })
            },
            ...mapActions({
                //关于暄桐
                getClassRoomTeacherXuantongAction: 'classRoomTeacherStore/getClassRoomTeacherXuantongAction',
                //关于林溪
                getClassRoomTeacherLinxiAction: 'classRoomTeacherStore/getClassRoomTeacherLinxiAction'
            }),
            goBack() {
                this.$router.back(-1)
            },
            goClassRoomTeacher(url) {
                window.location.href = url;
            }
        },
        async mounted() {
            await this.getClassRoomTeacherXuantongAction({
                pageIndex: 1,
                columnId: 4
            })
            await this.getClassRoomTeacherLinxiAction({
                pageIndex: 1,
                columnId: 3
            })
        }
    }
</script>
<style lang='scss' scoped>
.Haveclass_nav_title{
    width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        padding: 0;
}
    .fzGB1-0 {
        line-height: 1.8rem;
        letter-spacing: .2rem;
    }
    .fzGB1-0:nth-of-type(2) {
        font-weight: 600;
    }
    .fzGB1-0:nth-of-type(4) {
        font-weight: 600;
    }
    .Book {
        // padding-top:5.625rem;
    }
    .Book>h3 {
        margin-top: 3rem;
    }
    #app {
        display: flex;
        flex-direction: column;
        .mobile_content {
            flex: 1;
            // overflow: auto;
            -webkit-overflow-scrolling : touch;
        }
    }
    .Haveclass_menuList {
        width: 100%;
        position: fixed;
        left: 0;
        top: 1.8rem;
        z-index: 10;
        padding: 0;
        height: 3.4rem;
        .mint-tab-item.is-selected{
            border-bottom:none;
            position: relative;
            color: #C4A57F!important;
        }
        .mint-tab-item.is-selected::after{
            content: "";
            position: absolute;
            width: 4rem;
            height: .2rem;
            border-radius: 3px;
            background: #C4A57F;
            bottom:.3rem;
            left:50%;
            margin-left: -2rem;
        }
    }
    .gu_nav_title_img_top{
        position: fixed;
    }
    .Haveclassshouji_menuList{
        top: 0!important;
    }
    .mint-tab-container {
        margin-top: 4.5rem;
    }
</style>


