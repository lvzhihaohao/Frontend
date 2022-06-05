<template>
<section>
      <article class="nav-title"  v-if='!this.$flag' style="position: fixed;top: 0;z-index: 66666666;width: 100%;">
            <mt-header title="课程列表">
               <a href="javascript:void(0);" slot="left" @click='goBacks'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img
            src="../../../static/img/back.png"
            class="gu_nav_title_img"
            style="z-index:9999"
            v-if="this.$flag"
            @click="goBacks"
      >
      <div style="padding-top:60px"> </div>
    <div class="evenBackground" v-for='(data,indexs) in List' :key='indexs' >
        <div class=" pl-27 pr-27 pt-20 " v-if='data.courseSingleResponseVos.length > 1'>
            <!-- 全阶 -->
            <div class="pos_r gu_pos_r" @click='goAllCourseDetail(data.courseFullId)' >
                <img  v-if='data.courseTypeId == "1"' 
                class="app-h5-indexquanfullimg pos_a"
                  src="../../../static/mobile_img/live-ico.png" alt="" >
                <img 
                class="app-h5-indexquanfullimg pos_a "
                   v-else src="../../../static/mobile_img/recorded-ico.png" alt="" >
                <span class="pos_a fz12" v-if='data.statusName == "正在报名"'
                    style="background:#b15546">{{data.statusName}}</span>
                <span class="pos_a fz12" v-if='data.statusName == "已结课"'
                    style="background:#648EA2">{{data.statusName}}</span>
                <span class="pos_a fz12" v-if='data.statusName == "开课中"'
                    style="background:#969A70">{{data.statusName}}</span>
                <span class="pos_a fz12" v-if='data.statusName == "报名未开始"'
                    style="background:#bd9d7d">{{data.statusName}}</span>
                <img 
                    style="width:20rem;height:11.31rem"
                    :src="data.coursePictureUri" alt="" :data-src='data.coursePictureUri'>
                <!-- 书法课程 -->
                <div class="Calligraphy-class">
                    <h2 class="fz18 ">{{data.courseName}}</h2>
                    <!-- <h4 class="fz15 mt-5 mb-10">《{{data.courseTitle}}》共{{data.courseSingleCount}}课</h4> -->
                    <output class="c5 mt-5"><s>原学费：{{data.courseFullPrice}}元</s></output>
                    <section>
                        <p class="fz18 c097 dis_in_block mt-5 mb-10" v-if='data.courseDiscountPrice'>{{data.courseDiscountPrice}}元</p>
                        <span>共{{data.classHourCount}}课</span>
                    </section>
                </div>
            </div>
            <ul class="app-h5-indexdanfull">
                <li v-for='(item, ind) in data.courseSingleResponseVos' v-if="item.courseStatus==2" :key='ind'
                        @click.stop='goChanJieDetail(item.courseId)'>
                    <span class="pos_a fz12 HaveClass" v-if='item.statusName == "正在报名"'
                        style="background:#b15546">{{item.statusName}}</span>
                    <span class="pos_a fz12 HaveClass" v-if='item.statusName == "已结课"'
                        style="background:#648EA2">{{item.statusName}}</span>
                    <span class="pos_a fz12 HaveClass" v-if='item.statusName == "开课中"'
                        style="background:#969A70">{{item.statusName}}</span>
                    <span class="pos_a fz12 HaveClass" v-if='item.statusName == "报名未开始"'
                        style="background:#bd9d7d">{{item.statusName}}</span>
                    <img  :src="item.coursePictureUri" :key="item.courseId"
                        style="width: 9.5625rem;height:5.4375rem" v-lazy='item.coursePictureUri' alt="" >
                    <p class="c30 mt-10 fz15" style="width: 9.5625rem;">
                        <samp>{{item.sortName}} <span>{{item.courseName}}</span></samp>
                    </p>
                    <p class="c30 mt-10 fz12 gu_fz12">
                        <span class="price">{{item.courseFullPrice}}元</span>
                        <span>共{{item.classHourCount}}课</span>
                    </p>
                </li>
            </ul>
        </div>
         <div v-else class=" pl-27 pr-27 pt-20 ">
            <div class="pos_r" v-if="data.courseSingleResponseVos[0].courseStatus==2"
             @click='goChanJieDetail(data.courseSingleResponseVos[0].courseId)'>
                <img   v-if='data.courseSingleResponseVos[0].courseType == 1' 
                    src="../../../static/mobile_img/live-ico.png" alt="" class="pos_a app-h5-indexquanfullimg">
                <img  v-else src="../../../static/mobile_img/recorded-ico.png" alt="" class="pos_a app-h5-indexquanfullimg" >
                <span class="pos_a fz12" v-if='data.courseSingleResponseVos[0].statusName == "正在报名"'
                    style="background:#b15546">{{data.courseSingleResponseVos[0].statusName}}</span>
                <span class="pos_a fz12" v-if='data.courseSingleResponseVos[0].statusName == "已结课"'
                    style="background:#648EA2">{{data.courseSingleResponseVos[0].statusName}}</span>
                <span class="pos_a fz12" v-if='data.courseSingleResponseVos[0].statusName == "开课中"'
                    style="background:#969A70">{{data.courseSingleResponseVos[0].statusName}}</span>
                <span class="pos_a fz12" v-if='data.courseSingleResponseVos[0].statusName == "报名未开始"'
                    style="background:#bd9d7d">{{data.courseSingleResponseVos[0].statusName}}</span>
                <img :src="data.courseSingleResponseVos[0].coursePictureUri"  style="width:20rem;height:11.31rem">
                <div class="Calligraphy-class">
                    <h2 class="fz18 ">{{data.courseSingleResponseVos[0].courseName}}</h2>
                    <output class="c5 mt-5"><s>原学费：{{data.courseSingleResponseVos[0].courseFullPrice}}元</s></output>
                    <section>
                        <p class="fz18 c097 dis_in_block mt-5 mb-10" v-if='data.courseSingleResponseVos[0].courseFullPrice'>{{data.courseSingleResponseVos[0].courseFullPrice}}元</p>
                        <span>共{{data.courseSingleResponseVos[0].classHourCount}}课</span>
                    </section>
                </div> 
            </div>
        </div>
    </div>
    </section>
</template>
<script>
import {refundValidityPeriodTime} from '@/public/index'
export default {
    data(){
        return{
            List:[],
            data:[]
        }
    },
    // props:{
    //     data:{
    //         type:null,
    //         require:true
    //     }
    // },
    methods: { 
        goBacks(){
             this.$router.push({
                path:'/index/indexShouye'
            })         
            //   this.$router.push({
            //     path:'/'
            // })
        },
        goBack () {
            let xt_menulist1Url = window.localStorage.getItem('xt_menulist1Url');
            this.$router.push({
                path:xt_menulist1Url
            })
        },
        goChanJieDetail(id) {
            this.$router.push({
                path:'/chanjiedetail',
                query:{id}
            })
        },
        goAllCourseDetail(id) {
            this.$router.push({
                path:'/allcoursedetail',
                query:{id}
            })
        }
    },
    mounted () {
        this.$axios.post('/course/list',{
            columnId: 1,
            courseStyle: "1",
            pageIndex: 1,
            sortName: "Asc",
            sortType: 1,
            token:''
        }).then(res=>{
            this.List = res.data.result.courseFullResponseVos
            //console.log(this.List,'ssss')
        })
    }
}
</script>
<style lang='scss' scoped>
.pos_r{
    position: relative;
}
.evenBackground:nth-child(even){
    background: #f9f8f6;
}
    .app-h5-indexquanfullimg{
        width:3.125rem;
        position: absolute;
        left:-.75rem;
        top:-.75rem;
        height:3.125rem;
    }
    .app-h5-indexdanfull{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
       // column-count: 2;
        li{
            cursor: pointer;
            position:relative;
            display: inline-block;
            // margin-right: .625rem;
            overflow: hidden;
            &:nth-child(2n){
                margin-right: 0rem;
            }
            margin-bottom: 1.625rem;
            
        }
    }
    .pos_a.fz12{
        font-size: .75rem;
        font-weight: 300;
        color: #fff;
        position: absolute;
        right: .1rem;
        top: .625rem;
        padding: .3125rem .5rem .3125rem .625rem;
        border-radius: 1.375rem;
        border-top-right-radius: 0rem;
        border-bottom-right-radius: 0rem;
        background:#B69271;
        &.HaveClass{
            right:0;
        }
    }
</style>