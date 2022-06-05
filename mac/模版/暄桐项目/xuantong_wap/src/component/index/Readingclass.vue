<template>
    <div>
     <div class="pl-27 pr-27 mt-20">
            <!-- 全阶 -->
            <div class="pos_r gu_pos_r"  >
                <img  v-if='data.courseTypeId == "1"' 
                class="app-h5-indexquanfullimg pos_a"
                 src="../../../static/mobile_img/live-ico.png"
                   alt="" >
                <img 
                v-if='data.courseTypeId == "2"' 
                class="app-h5-indexquanfullimg pos_a"
                 
                   src="../../../static/mobile_img/recorded-ico.png" alt="" >
                <!-- <span class="pos_a fz12"
                >报名截止日期：</span> -->
                <img 
                v-if='data'
                style=" width:20.06rem;height:11.31rem"
                src="../../../static/img/Reading.png"
               >
                <div class="Calligraphy-class">
                    <h2 class="fz18 mt-5">{{data.courseName}}</h2>
                    <!-- <h4 class="fz15 mt-5 mb-10">《{{data.courseTitle}}》共{{data.courseSingleCount}}课</h4> -->
                    <output class="c5 mt-5"><s>原学费：{{data.courseFullPrice}}元</s></output>
                    <!-- <strong class="fz18 c097 dis_block mt-5 mb-10" v-if='data.courseDiscountPrice'>{{data.courseDiscountPrice}}元</strong> -->
                     <section>
                        <p class="fz17 c097 dis_in_block mt-5 mb-10" v-if='data.courseDiscountPrice'>{{data.courseDiscountPrice}}元</p>
                        <span>共{{data.classHourCount}}课</span>
                    </section>
                </div>
            </div>
        </div>
        </div>
</template>

<script>
export default {
     props:{
        data:{
            type:null,
            require:true
        }
    },
    data () {
        return {
            obj:{}
        }
    },
}
</script>

<style lang='scss' scoped>
.app-h5-indexquanfullimg{
            width:3.125rem;
            left:-.75rem;
            top:-.75rem;
            height:3.125rem;
    }
</style>
