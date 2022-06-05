<template>
    <div class="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="同学作业分享">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png" class='gu_nav_title_img_top' v-if='this.$flag' @click='goBack'>
        <div class='pl-27 pr-27' ref='wrappers'>
            <ProductionRecommendList 
            :rFlag="true"
            :data='newArr' @productionParentMore='productionParentMore' @showImg='showImg' :types='type' ref='ProductionRecommendList' />
            <mt-popup v-model="popupVisible" popup-transition="popup-fade">
                <img :src="imgUrl" data-original="往往我" alt="logo" title="首页"  data-summary="往往我"  >
                <p></p>
            </mt-popup> 
        </div>
    </div>
</template>
<script>
    import {
        imgLocation
    } from '../../public/index'
    import {
        mapState,
        mapActions
    } from 'vuex'
    import ProductionRecommendList from '../../component/indexProductionRecommendList'
    import Bscroll from 'better-scroll';
    let box = document.getElementsByClassName('scrollWater')
    export default {
        name: 'classmatework',
        data() {
            return {
                type: 'more',
                popupVisible: false,
                imgUrl: '',
                page: 1,
                newArr: [], //用于拼接数组
            }
        },
        watch: {},
        components: {
            ProductionRecommendList
        },
        computed: {
            ...mapState({
                //更多同学作品数据
                classMateMoreList: state => state.classMateMoreStore.classMateMoreList
            })
        },
        beforeUpdate() {
            //console.log(this.classMateMoreList[0], "lalala")
        },
        methods: {
            ...mapActions({
                //更多同学作品方法
                getClassMateMoreAction: 'classMateMoreStore/getClassMateMoreAction'
            }),
            goBack() {
                 this.$router.push({
                path:'/index/indexShouye'
               })   
                // this.$router.back(-1)
            },
            // 作品点赞  触发刷新列表
            async productionParentMore(id) {
                this.newArr.forEach((item,index)=>{
                    if(item.productionId==id&&item.isLiked==false){
                        item.isLiked=true
                        item.likeNum=++item.likeNum
                        //console.log(item)
                    }
                })
                // 弃用
                // let productionIndex = '';
                // await this.getClassMateMoreAction(this.disposedata2())
                // this.$nextTick(() => {
                //     let id = this.classMateMoreList[0].productionId
                //     //console.log(this.newArr, id, this.classMateMoreList)
                //     for (var i = 0; i < this.newArr.length; i++) {
                //         if (this.newArr[i].productionId == id) {
                //             productionIndex = i;
                //             break;
                //         }
                //     }
                //     this.newArr = this.newArr.slice(0, productionIndex)
                //     this.newArr = [...this.newArr, ...this.classMateMoreList]
                //     //console.log(this.newArr,"this.newArr")    
                // })
            },
            showImg(item,introduction) {
                // this.popupVisible =true;
                // this.imgUrl =item.pictureUrl;
                this.ShowViewer(item.pictureUrl)
                //    document.querySelectorAll('.viewer-title')[0].innerHTML = ''
                this.$nextTick(()=>{
                    setTimeout(()=>{
                        let A = document.querySelectorAll('.viewer-footer')[0]
                        let ASon = document.querySelectorAll('.viewer-title')[0]
                        var tmp = document.createElement('div');
                        tmp.setAttribute('class','viewer-title')
                        tmp.innerHTML =  introduction
                        tmp.style.lineHeight = '1rem'
                        tmp.style.fontSize = '.93rem'
                        tmp.style.marginBottom = '1rem'
                        tmp.style.color = 'white'
                        tmp.style.opacity = '0.7'
                        tmp.style.fontFamily = 'FZLTHJ'
                        tmp.style.whiteSpace = 'normal'
                        A.replaceChild(tmp,ASon)
                     },100)
                })
            },
            //处理作品集数据
            disposedata2() {
                let data = {
                    pageIndex: this.page,
                    token: ''
                };
                return data;
            },
        },
        created() {
            this.$nextTick(() => {
                this.scroll = new Bscroll(this.$refs.wrappers, { //初始化better-scroll
                    probeType: 3, //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
                    click: true, //是否派发click事件
                    scrollY: true
                })
                // 滑动过程中事件  加载更多
                this.scroll.on('scroll', (pos) => {
                    if (pos.y < this.scroll.maxScrollY - 40) {
                        if (this.classMateMoreList.length > 0) {
                            box[0].setAttribute("data-html", "松手加载更多")
                        } else {
                            box[0].setAttribute("data-html", "暂时都在这里了...")
                        }
                    } else {
                        if (this.classMateMoreList.length > 0) {
                            box[0].setAttribute("data-html", "下拉加载更多")
                        } else {
                            box[0].setAttribute("data-html", "暂时都在这里了...")
                        }
                    }
                });
                this.scroll.on("scrollEnd", () => {
                    if (this.classMateMoreList.length > 0) {
                        box[0].setAttribute("data-html", "下拉加载更多")
                    } else {
                        box[0].setAttribute("data-html", "暂时都在这里了...")
                    }
                });
                this.scroll.on('touchEnd', async(pos) => {
                    if (box[0].getAttribute("data-html") == "松手加载更多") {
                        this.page = this.page + 1;
                        await this.getClassMateMoreAction(this.disposedata2())
                        this.scroll.refresh()
                        if (this.classMateMoreList.length == 0) {
                            box[0].setAttribute("data-html", '暂时都在这里了...')
                            this.scroll.refresh()
                            //console.log(1)
                        } else {
                            //console.log(2)
                            this.newArr = this.newArr.concat(this.classMateMoreList);
                            //console.log(this.newArr,"this.newArr")
                            this.scroll.refresh()
                        }
                    }
                })
            })
        },
        async mounted() {
            await this.getClassMateMoreAction(this.disposedata2())
            this.newArr = this.newArr.concat(this.classMateMoreList)
        }
    }
</script>
<style>

</style>

<style lang='scss' scoped>
   
    .app {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .nav-title {
            background: #fff;
            z-index: 99;
        }
        .pl-27.pr-27 {
            padding: 0 1.6875rem;
            width: calc(100% - 2.125rem);
            height: 100%;
            flex: 1
        }
    }
    .mint-popup {
        width: 90%;
    }
    .gu_nav_title_img_top {
        margin-bottom: 1rem;
    }
</style>


