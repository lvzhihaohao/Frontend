<template>
    <div>        
        <div class="pl-27 pr-27 mt-20 ">
            <!-- 全阶 -->
            <div v-if="index==0" class="pos_r gu_pos_r" @click='goAllCourseDetail(data[0].courseFullId)' >
                <img  v-if='data[0].courseTypeId == "1"' 
                class="app-h5-indexquanfullimg pos_a"
                  src="../../static/mobile_img/live-ico.png" alt="" >
                <img 
                class="app-h5-indexquanfullimg pos_a "
                   v-else src="../../static/mobile_img/recorded-ico.png" alt="" >
                <span class="pos_a fz12" v-if='data[0].statusName == "正在报名"'
                    style="background:#b15546">{{data[0].statusName}}</span>
                <span class="pos_a fz12" v-if='data[0].statusName == "已结课"'
                    style="background:#648EA2">{{data[0].statusName}}</span>
                <span class="pos_a fz12" v-if='data[0].statusName == "开课中"'
                    style="background:#969A70">{{data[0].statusName}}</span>
                <span class="pos_a fz12" v-if='data[0].statusName == "报名未开始"'
                    style="background:#bd9d7d">{{data[0].statusName}}</span>
                <img 
                    style="width:20rem;height:11.31rem"
                    :src="data[0].coursePictureUri" alt="" :data-src='data[0].coursePictureUri'>
                <!-- 书法课程 -->
                <div class="Calligraphy-class">
                    <h2 class="fz18 ">{{data[0].courseName}}</h2>
                    <!-- <h4 class="fz15 mt-5 mb-10">《{{data.courseTitle}}》共{{data.courseSingleCount}}课</h4> -->
                    <output class="c5 mt-5"><s>原学费：{{data[0].courseFullPrice}}元</s></output>
                    <section>
                        <p class="fz17 c097 dis_in_block mt-5 mb-10" v-if='data[0].courseDiscountPrice'>{{data[0].courseDiscountPrice}}元</p>
                        <span>共{{data[0].classHourCount}}课</span>
                    </section>
                </div>
            </div>
            <ul v-if="index==0" class="app-h5-indexdanfull">
                <li v-for='(item, ind) in data[0].courseSingleResponseVos' :key='ind'
                        @click.stop='goChanJieDetail(item.courseId)' v-if="item.courseStatus==2">
                    <span class="pos_a fz12 HaveClass" v-if='item.statusName == "正在报名"'
                        style="background:#b15546">{{item.statusName}}</span>
                    <span class="pos_a fz12 HaveClass" v-if='item.statusName == "已结课"'
                        style="background:#648EA2">{{item.statusName}}</span>
                    <span class="pos_a fz12 HaveClass" v-if='item.statusName == "开课中"'
                        style="background:#969A70">{{item.statusName}}</span>
                    <span class="pos_a fz12 HaveClass" v-if='item.statusName == "报名未开始"'
                        style="background:#B69271">{{item.statusName}}</span>
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
        <div v-if="index==1" class="pos_r gu_pos_r" @click='goAllCourseDetail(data[1].courseFullId)' >
                <img  v-if='data[1].courseTypeId == "1"' 
                class="app-h5-indexquanfullimg pos_a"
                  src="../../static/mobile_img/live-ico.png" alt="" >
                <img 
                class="app-h5-indexquanfullimg pos_a "
                   v-else src="../../static/mobile_img/recorded-ico.png" alt="" >
                <span class="pos_a fz12" v-if='data[1].statusName == "正在报名"'
                    style="background:#b15546">{{data[1].statusName}}</span>
                <span class="pos_a fz12" v-if='data[1].statusName == "已结课"'
                    style="background:#648EA2">{{data[1].statusName}}</span>
                <span class="pos_a fz12" v-if='data[1].statusName == "开课中"'
                    style="background:#969A70">{{data[1].statusName}}</span>
                <span class="pos_a fz12" v-if='data[1].statusName == "报名未开始"'
                    style="background:#B69271">{{data[1].statusName}}</span>
                <img 
                    style="width:20rem;height:11.31rem"
                    :src="data[1].coursePictureUri" alt="" :data-src='data[1].coursePictureUri'>
                <!-- 书法课程 -->
                <div class="Calligraphy-class">
                    <h2 class="fz18 ">{{data[1].courseName}}</h2>
                    <!-- <h4 class="fz15 mt-5 mb-10">《{{data.courseTitle}}》共{{data.courseSingleCount}}课</h4> -->
                    <!-- <output class="c5 mt-5"><s>原学费：{{data[1].courseFullPrice}}元</s></output> -->
                    <section>
                        <p class="fz17 c097 dis_in_block mt-5 mb-10" v-if='data[1].courseDiscountPrice'>{{data[1].courseDiscountPrice}}元</p>
                        <span>共{{data[1].classHourCount}}课</span>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {refundValidityPeriodTime} from '../public/index'
export default {
    props:{
        data:{
            type:null,
            require:true
        },
        index:{
            type:null,
            require:true
        },
    },
    methods: { 
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
        //console.log(this.data,'thisshdasjkdghafsflfa')
    }
}
</script>
<style lang='scss' scoped>
    .app-h5-indexquanfullimg{
            width:3.125rem;
            left:-.75rem;
            top:-.75rem;
            height:3.125rem;
    }
    .app-h5-indexdanfull{
        width: 100%;
        display: flex;
        flex-wrap:wrap;
       // column-count: 2;
        li{
            cursor: pointer;
            position:relative;
            display: inline-block;
            margin-right: .625rem;
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