<template>
<div>
    <ul :class='typeString =="index"?"indexUl":"searchUl"'  style="padding-bottom: 0.8rem;">
        <li v-for="(item,index) in data" :key='index' @click="goArticleLink(item.articleUrl)">
            <div>
                <img v-lazy="item.thumbUrl" :key="item.articleId" alt="">
            </div>
            <div class='right'>
                <h4 class="fz15 c30">{{item.articleTitle}}</h4>
                <p class="fz12 c5">
                    {{item.articleIntroduction}}
                </p> 
                <p class="fz12 c5">{{item.publishTime}}</p>
            </div>
           
        </li>
         <!-- <li>
            <div>
                <img src="../../static/img/Classroom_teacher1.png" alt="">
            </div>
            <div class='right'>
                <h4 class="fz15 c30">暄桐教室</h4>
                <p class="fz12 c5">
                    暄桐教室是一间书法教室，皆在以书法为起点。
                </p>
            </div>
        </li>
         <li>
            <div>
                <img src="../../static/img/Classroom_teacher3.png" alt="">
            </div>
            <div class='right'>
                <h4 class="fz15 c30">暄桐线上课</h4>
                <p class="fz12 c5">
                    线上课直播是专门为零基础的成年人而精心设计的。
                </p>
            </div>
        </li> -->
    </ul>
    <ScrollBottom v-if="moreFlag"  @timer="timer" @click="timer"  :moreTit="moreTit" ref="mychild"/>
    </div>
</template>
<script> 
import ScrollBottom from '@/component/ScrollBottom'
import {userclasshourTime,formData} from '@/public/index'
import {mapState,mapActions} from 'vuex'
    export default {
        name: 'articles',
        data(){
            return{
                moreTit:'加载更多',
                Timingopen:null,
            }
        },
        computed: {
            ...mapState({
                Index:state=>state.searchStore.Index,
            })
        },
        props: {
            data: {
                type: null,
                required: true
            },
            typeString: {
                type: null,
                required: true
            },
            iptValue:{
                type:null,
            },
            moreFlag:{
                type:null,
            }  
        },
        components:{
        ScrollBottom
        },
        methods: {
            ...mapActions({
                changegetIndex:'searchStore/changegetIndex'
            }),
            goArticleLink(e) {
                //console.log(e)
                window.location.href = e
                // this.$router.push({
                //     path: "/classroomteacher"
                // });
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
            getMoreList(){
                clearInterval(this.Timingopen)
                this.changegetIndex()
                this.$axios.post("/search/articlelist", {
                        pageIndex:this.Index,
                        searchKeyword:this.iptValue,
                    }).then(res=>{
                        let newarr = res.data.result.searchArticleResponseVos;
                            if (newarr.length == 0) {
                                this.moreTit = "暂时都在这里了...";
                                this.$refs.mychild.gets();
                                return
                            }else{
                                newarr.forEach((item, i) => {
                                    item.publishTime = formData(item.publishTime,'uat')
                                    this.data.push(item);
                                });
                                this.moreTit = "加载更多";
                                this.$refs.mychild.get();
                            }
                    })
            },
        clearZero(){
                this.moreTit = "加载更多";
                 this.$refs.mychild.get();
        }
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
    }
</style>