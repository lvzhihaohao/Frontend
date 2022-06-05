<template>
    <div class='search_wrap' @keydown="searchChange">
        <div class="mobile_content">
            <label for="" class='ipt_label'>
                <form action="" @submit.prevent="onSubmit">
                    <input type="text"  placeholder="搜索你感兴趣的内容" v-model='iptValue' ref='ipt'>
                </form>
                    <img src="../../../static/mobile_img/search.png" alt="">
                    <span @click='spnNone'>取消</span>
            </label>
            <mt-navbar v-model="Haveclass_menuList" v-if="seachFlag" class="Haveclass_menuList">
                <mt-tab-item id="1" @click.native='getCourse'>课程</mt-tab-item>
                <mt-tab-item id="4" @click.native='getVideo'>视频</mt-tab-item>
                <mt-tab-item id="2" @click.native='getArticle'>文章</mt-tab-item>
                <mt-tab-item id="3" @click.native='getShop'>商品</mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container v-model="Haveclass_menuList">
                <mt-tab-container-item id="1">
                    <div class="mobile_content" style="">
                        <!--主-->
                        <article class="gu_Book_fl_publicPadding" style="paddingTop:2.75rem" v-if='courseList.length > 0 && flag == "false"'>
                            <CourseList ref="Course" :data='courseList' :iptValue="iptValue" />
                        </article>
                        <div class='noContent' v-if="courseList.length <= 0 && flag">
                            <img src="../../../static/img/null-My_discussion.png" alt="">
                           <div class="noContentTxt fz15  c3c">抱歉，没有搜索到相关内容</div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <div class="mobile_content">
                        <article class="Book fl Four_stores  pt-0 My_ChairList"  style="padding:2.75rem 2rem 0!important;" v-if='videoList.length > 0 && flag == "false"'>
                            <ChairMoreList ref="Video" :data='videoList' :iptValue="iptValue" :moreFlag="true"/>
                        </article>
                        <div class='noContent' v-else>
                            <img src="../../../static/img/null-My_discussion.png" alt="">
                            <div class="noContentTxt fz15  c3c">抱歉，没有搜索到相关内容</div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="mobile_content Haveclass_menuList-content2">
                        <article class=" Classroom_teacher pb-0"  style="paddingTop:2.75rem"
                            v-if='articleList.length > 0 && flag == "false"'>
                            <ArticleList ref="Article" :data='articleList' :typeString='types' :iptValue="iptValue" :moreFlag="true"/>
                        </article>
                        <div class='noContent' v-else>
                            <img src="../../../static/img/null-My_discussion.png" alt="">
                            <div class="noContentTxt fz15  c3c">抱歉，没有搜索到相关内容</div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <div class="mobile_content">
                        <article class="Book fl Four_stores publicPadding pt-0 "  style="paddingTop:2.75rem !important" v-if='shopList.length > 0 && flag == "false"'>
                            <ShopList ref="Shop" :data='shopList' :iptValue="iptValue" :moreFlag="true"/>
                        </article>
                        <div class='noContent' v-else>
                            <img src="../../../static/img/null-My_discussion.png" alt="">
                            <div class="noContentTxt fz15  c3c">抱歉，没有搜索到相关内容</div>
                        </div>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
    
</template>
<script>
    import {mapState,mapActions} from 'vuex'
    import ShopList from '../../component/search/searchShopList.vue'
    import ArticleList from '../../component/search/searchArticleList.vue'
    import CourseList from '../../component/search/searchCourseList'
    import ChairMoreList from '../../component/search/searchVideoFree'
    export default {
        name:'search',
        data () {
            return {
                iptValue:'',
                Haveclass_menuList: '1',
                types:'search',
                flag:'',
                seachFlag:false,
            }
        },
        computed: {
            ...mapState({
                //搜索文章数据
                articleList:state=>state.searchStore.articleList,
                //搜索商城数据
                shopList:state=>state.searchStore.shopList,
                //搜索课程数据
                courseList:state=>state.searchStore.courseList,
                //搜索视频数据
                videoList:state=>state.searchStore.videoList
            })
        },
        components: {
            ShopList,
            ArticleList,
            CourseList,
            ChairMoreList
        },
        
        beforeRouteEnter (to,from,next) {
            if(from.path=='/chanjiedetail' || from.path=='/allcoursedetail'){
                next((vm)=>{
                    vm.flag = 'false'
                    let val = window.localStorage.getItem('searchValue')
                    //console.log(val)
                    vm.getCourseListAction({searchKeyword:val,pageIndex:1});
                })
            }
            next()
        },
        mounted(){
            this.$refs.ipt.focus();
            this.flag = 'true';
        },
        methods: {
            onSubmit(){
            return false
            },
            ...mapActions({
                //搜索课程
                getCourseListAction:'searchStore/getCourseListAction',
                //搜索文章
                getArticleListAction:'searchStore/getArticleListAction',
                //搜索商城
                getShopListAction:'searchStore/getShopListAction',
                //搜索视频
                getVideoListAction:'searchStore/getVideoListAction',

                changeZeroIndex:'searchStore/changeZeroIndex'
            }),
            spnNone () {
                // this.$router.go(-1)
                 this.$router.push({
                path:'/index/indexShouye'
               }) 
                // this.$router.push({
                //     path:'/'
                // })
                // alert("123")
            }, 
            async searchChange (e) {
                if(e.keyCode===13){
                    this.seachFlag=true
                    window.localStorage.setItem('searchValue',this.iptValue)
                    // await this.getCourseListAction({searchKeyword:this.iptValue,pageIndex:1});
                    this.flag = 'false';
                    this.getCourse()
                    this.getArticle()
                    this.getShop()
                    this.getVideo()
                }
            },
            getCourse () {
                // if(this.$refs.Course){
                //     this.$refs.Course.clearZero()
                // }
                this.changeZeroIndex()
                this.getCourseListAction({searchKeyword:this.iptValue,pageIndex:1})
                
            },
            getArticle () {
               if(this.$refs.Article){
                   this.$refs.Article.clearZero()
               }
               this.changeZeroIndex()
               this.getArticleListAction({searchKeyword:this.iptValue,pageIndex:1})
               
            },
            getShop () {
                if(this.$refs.Shop){
                    this.$refs.Shop.clearZero()
                }
                this.changeZeroIndex()
                this.getShopListAction({searchKeyword:this.iptValue,pageIndex:1})
            },
            getVideo(){
                if(this.$refs.Video){
                    this.$refs.Video.clearZero()
                }
                this.changeZeroIndex()
                this.getVideoListAction({searchKeyword:this.iptValue,pageIndex:1,token:''})
            }
        }
    }
</script>
<style lang="scss" scoped>
.search_wrap{
    .searchUl {
            padding-bottom: 1.5rem !important;
    }
    .mobile_content{
        padding-bottom: 0;
    }
}
.dis_flow_root{
  margin-bottom: 0!important;
  // padding-top: 1.875rem;
}
    .search_wrap{
        width:100%;
        height:100%;
        display:flex;
        flex-direction: column;
        .mobile_content{
            flex:1;
            // overflow: auto;
             -webkit-overflow-scrolling : touch;
            .Haveclass_menuList{
                position:fixed;
                left:0;
                top:3.2rem;
                width:100%;
                z-index:10;
                padding:0;
                padding: 0 3rem;
                box-sizing: border-box;

            }
        }
    }
    .ipt_label{
        z-index:10;
        width:100%;
        background:#fff;
        box-sizing: border-box;
        padding:0 1.125rem 0 1rem;
        position:fixed;
        top:0.8rem;
        // padding-top: 0rem;
        margin-top:-0.825rem ;
        display:flex;
        align-items: center;
        form{
            flex:1;
            height:2.25rem;
            margin-top: 1rem;
        }
        input{
            height:2.25rem;
            box-sizing: border-box;
            padding-left:2.375rem;
            width: 100%;
            background:#EEEEEE;
            border-radius: 1.125rem;
            outline: none;
            border:none;
            text-align: left;
            color:#000;
            line-height: 2.25rem;
            &::-webkit-input-placeholder { /* WebKit browsers */
                font-size: 1rem;
            }
        }
        img{
            width:1rem;
            height:1rem;
            position:absolute;
            left:1.815rem;
            z-index:10;
            top:50%;
            margin-top: -.1rem;
            color:#ccc;
        }
        span{
            display:block;
            margin-left:.9rem;
            color:#555555;
            font-size:1rem;
            padding-top: 1.125rem;
        }
    }
    .ipt_label > input::-webkit-input-placeholder{
        color:#ccc;
        font-size:.93rem;
        font-family: 'FZLTHJW--GB1-0'
    }
    .noContent{
        width:100%;
        margin-top: 10rem;
        text-align: center;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -50%;
        margin-top: -2.5rem;
        height: 5rem;
        overflow: visible;
        img{
            width: 4rem;
            position: absolute;
            left: 50%;
            margin-left: -2rem;
        }
        .noContentTxt{
            padding-top: 3.5rem;
        }
    }
    .mobile_content{
        margin-top:2rem
    }
    .publicPadding{
        padding:0;
    }
    .mint-navbar .mint-tab-item{
        padding-bottom: .625rem;
        padding-top:1.5rem!important;
    }
    .mint-navbar .mint-tab-item.is-selected{
        border:none!important;
        position: relative;
        &::after{
            content:'';
            position: absolute;
            width:3.75rem;
            height:.125rem;
            background:#C4A57F;
            border-radius:.06rem;
            bottom: 0;
            // left: -1.875rem;
        }
    }
    .mint-tab-item{
        padding-bottom:0
    }
    .gu_Book_fl_publicPadding{
        margin-top:1.8rem;
    }
</style>