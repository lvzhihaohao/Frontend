<template>
    <div id="app" style="">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="视频分享">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <div class=" pl-30 pr-30" :class="{'lv_weixinpt2':!this.$flag}">
            <!--mobile_content 固定底部的话+add -->
            <article class="My_ChairList" style='position:relative;overflow: hidden' v-if='chairMoreList.length > 0'>
                <img src="../../../static/img/back.png" class='gu_nav_title_img' v-if='this.$flag' @click='goBack'>
                <ChairMoreList ref="ChairMoreList" v-if='chairMoreList.length > 0' :data='chairMoreList' @chairParent='chairParent' />
            </article>
            <div class='gu_clear_guide ' v-else style="margin-top: 6rem !important;">
                <img src="../../../static/img/null-My_discussion.png" alt="">
                <p class=" fz12 mt-15 c9">暂时没有哦~</p>
            </div>
            <ScrollBottom v-if='chairMoreList.length > 0' @timer="timer" @click="timer" :moreTit="moreTit" ref="mychild" />
        </div>
    </div>
</template>
<script>
    import ScrollBottom from '@/component/ScrollBottom'
    import {
        mapState,
        mapActions
    } from 'vuex'
    import ChairMoreList from '../../component/chairMoreList'
    export default {
        name: 'homework',
        data() {
            return {
                flag: false,
                moreTit: '加载更多',
                Timingopen: null,
                pageIndex: 1,
            }
        },
        watch:{
            chairMoreList(newData,oldData){
                oldData.forEach((item,index)=>{
                    if(item.clickVolume!==newData[index].clickVolume){
                        item.clickVolume=newData[index].clickVolume
                    }
                })
            }
        },
        computed: {
            ...mapState({
                //更多免费视频数据
                chairMoreList: state => state.chairListMoreStore.chairMoreList
            })
        },
        beforeRouteEnter(to, from, next) {
            let chairListUrl = window.localStorage.getItem('chairListUrl')
            if (from.path == '/chairdetails' || from.path == '/phonelogin' || from.path == '/emaillogin') {
                if (chairListUrl) {
                    window.localStorage.setItem('chairListUrl', chairListUrl)
                }
            } else {
                window.localStorage.setItem('chairListUrl', from.path)
            }
            next()
        },
        components: {
            ChairMoreList,
            ScrollBottom
        },
        methods: {
            ...mapActions({
                //更多免费视频方法
                getChairListMoreAction: 'chairListMoreStore/getChairListMoreAction'
            }),
            goBack() {
                this.$router.push({
                path:'/index/indexShouye'
               })  
                // let chairListUrl = window.localStorage.getItem("chairListUrl")
                // this.$router.push({
                //     path: chairListUrl
                // })
            },
            async chairParent() {
                await this.getChairListMoreAction({
                    pageIndex: 1,
                    token: ''
                })
                this.$store.state.chairListMoreStore.chairMoreList = [...this.chairMoreList]
            },
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
            getMoreList() {
                clearInterval(this.Timingopen)
                this.pageIndex++
                    this.$axios.post('/coursefree/list', {
                        pageIndex: this.pageIndex,
                        token: ''
                    }).then(res => {
                        let newarr = res.data.result.courseFreeResponseVos
                        if (newarr.length == 0) {
                            this.moreTit = "暂时都在这里了...";
                            this.$refs.mychild.gets();
                            return
                        } else {
                            this.$refs.ChairMoreList.getMoreList(newarr)
                            this.moreTit = "加载更多";
                            this.$refs.mychild.get();
                        }
                    })
            },
        },
        mounted() {
            this.pageIndex = 1
            this.getChairListMoreAction({
                pageIndex: 1,
                token: ''
            })
            this.$nextTick(() => {
                window.scrollTo(0, 0)
            })
        }
    }
</script>
<style lang='scss' scoped>
    .nav-title {
        position: fixed;
        width: 100%;
        z-index: 9999;
    }
    .mobile_content article:last-child {
        margin-bottom: 0rem;
    }
    #app {
        // overflow: scroll;
        display: flex;
        flex-direction: column;
        .pl-30.pr-30 {
            flex: 1; //  overflow: hidden;
            // -webkit-overflow-scrolling : touch;
        }
    }
    .lv_weixinpt2 {
        padding-top: 2rem;
    }
    .gu_nav_title_img {
        width: 1.2rem;
        height: 1.2rem; // top:1.5rem;
        // left:1rem;
    }
</style>


