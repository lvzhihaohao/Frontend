<template>
   <div id="app">
        <article class="nav-title" fixed v-if='!this.$flag'>
            <mt-header  title="我的收藏课程">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
                <router-link to="" slot="right">
                    <mt-button class="c4a5 fz15">编辑</mt-button>
                </router-link>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png" class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class=" pl-10 pr-20" >
            <!--mobile_content 固定底部的话+add -->
            <div class="mobile_content">
                <article class="My_CollectionClasses-Body">
                    <ul class="Collection-content" v-if='flag'>
                        <li>
                            <label for="">
                                    <mt-checklist                 
                                    v-model="value2"                                   
                                    :options="['']">
                                  </mt-checklist >
                                 <!-- :options="options" -->
                            </label>
                            <div class="Collection_HaveClass">
                                    <span class="pos_a fz12 HaveClass">已结课</span> 
                                    <img src="../../../static/mobile_img/book_list1.png" alt="">
                            </div>                           
                            
                            <div class="Collection_text">
                                <p class="c30 fz15">第一阶 | 篆隶筑基</p>
                                <!-- <h4 class="c30 fz12">《从书法之美到生活之美》</h4> -->
                                <s class="fz12 c5">原学费：12980元</s>
                                <p class="c30 fz12">
                                    <span>3280元</span>
                                    <small>共20次课</small>
                                    <span class="fz12 c9">开课中</span>
                                </p>
                            </div>
                            
                        </li>
                        <li>
                            <label for="">
                                <mt-checklist                
                                v-model="value3"                                   
                                :options="['']">
                                </mt-checklist>
                            </label>
                            <div class="Collection_HaveClass">
                                <span class="pos_a fz12 ongoing">开课中</span> 
                                <img src="../../../static/mobile_img/book_list2.png" alt="">
                            </div>
                            
                            <div class="Collection_text">
                                <p class="c30 fz15"><samp>第二阶 | <span>楷书精进</span></samp></p>
                                <!-- <h4 class="c30 fz12">《从书法之美到生活之美》</h4> -->
                                <s class="fz12 c5">原学费：12980元</s>
                                <p class="c30 fz12"><span>3280元</span> <small>共20次课</small><span class="fz12 c9">开课中</span>
                                </p>
                            </div>                            
                        </li>
                    </ul>
                    <div class='gu_clear_guide' v-else>
                        <img src="../../../static/img/null-My_discussion.png"  alt="" >
                        <p class=" fz12 mt-15 c9">暂时没有哦~</p>
                    </div>
                </article>
                
            </div>
        </div>

        <div class="My_CollectionClasses_foot">
                <label for="" class="fl">
                        <mt-checklist                
                        v-model="value4"
                        :options="['全选']">
                      </mt-checklist>
                </label>
                <mt-button class="fr btn-del">删除</mt-button>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import {getMd5} from '../../public/index'
export default {
    name:'mycollectionclasses',
    data () {
        return {
            flag:false,       
            value2:[
                this.options= [{
                    label: "选项A",
                    value1: "A"
                } ]
            ],
             value3:[
                this.options= [{
                    label: "选项B",
                    value1: "B"
                } ]
            ],
             value4:[
                this.options= [{
                    label: "选项All",
                    value1: "All"
                } ]
            ],
        }
    },
    computed:{
        ...mapState({
            //我收藏的课程数据
            myCollectionClassesList:state=>state.myCollectionClassesStore.myCollectionClassesList
        })
    },
    mounted () {
        this.getMyCollectionClassesAction(this.disposedata2())
    },
    methods:{
        ...mapActions({
            //我收藏的课程
            getMyCollectionClassesAction:'myCollectionClassesStore/getMyCollectionClassesAction'
        }),
        goBack () {
            this.$router.back(-1)
        },
        //处理我收藏课程数据
        disposedata2 () {
            let data={
                pageIndex:1,
                typeKey:3,
                token:''
            };
            return data;
        }
    }
}
</script>
<style lang='scss' scoped>
    .Haveclass_menuList {
        padding: 0rem 1.25rem;
    }
    // .mobile_content article:last-child {
    //     margin-bottom: 0rem;
    // }
</style>



