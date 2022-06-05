<template>
    <div class="mobile_content">
        <img src="../../../static/img/back.png" class='gu_nav_title_img'
            v-if='this.$flag' @click='goBack'>
        <article class="Book fl publicPadding class" v-for='(item,index) in data' :key='index'>
            <h3 class="fz24 c30">{{item.courseName}}</h3>
            <div class="pos_r gu_pos_r">
                <div class="pos_r" @click='goAllCourseDetail(item.courseFullId)'>
                    <img src="../../../static/mobile_img/live-ico.png" alt="" class="pos_a"
                        v-if='item.courseTypeId ==1'>
                    <img src="../../../static/mobile_img/recorded-ico.png" alt="" class="pos_a" v-else>
                    <span class="pos_a fz12" v-if='item.statusName == "正在报名"'
                        style="background:#B69271">{{item.statusName}}</span>
                    <span class="pos_a fz12" v-if='item.statusName == "已结课"'
                        style="background:#648EA2">{{item.statusName}}</span>
                    <span class="pos_a fz12" v-if='item.statusName == "开课中"'
                        style="background:#969A70">{{item.statusName}}</span>
                    <span class="pos_a fz12" v-if='item.statusName == "报名未开始"'
                        style="background:#AD4E3F">{{item.statusName}}</span>
                    <img :src="item.coursePictureUri" alt="" style='width:20rem;height:11.31rem'>
                    <div class='Calligraphy-class'>
                        <h2 class="fz18">林曦老师的零基础书法课</h2>
                        <output class="c5"><s>原学费：{{item.courseFullPrice}}元</s></output>
                        <section>
                            <p class="fz18 c097 dis_in_block mt-5 mb-10" v-if='item.courseDiscountPrice'>{{item.courseDiscountPrice}}元</p>
                            <span>共{{item.classHourCount}}课</span>
                        </section>
                    </div>
                </div>
                <ul class='app-h5-indexdanfull'>
                    <li v-for='(val,ind) in item.courseSingleResponseVos' v-if="val.courseStatus==2" :key='ind'
                         @click='goChanJieDetail(val.courseId)'>
                        <span class="pos_a fz12 HaveClass" v-if='val.statusName == "正在报名"'
                            style="background:#B69271">{{val.statusName}}</span>
                        <span class="pos_a fz12 HaveClass" v-if='val.statusName == "已结课"'
                            style="background:#648EA2">{{val.statusName}}</span>
                        <span class="pos_a fz12 HaveClass" v-if='val.statusName == "开课中"'
                            style="background:#969A70">{{val.statusName}}</span>
                        <span class="pos_a fz12 HaveClass" v-if='val.statusName == "报名未开始"'
                            style="background:#AD4E3F">{{val.statusName}}</span>

                        <img :src="val.coursePictureUri" alt="" style='width:9.5625rem;height:5.4375rem'>
                        <p class="c30">
                            <samp><span>{{val.courseName}}</span></samp>
                        </p>
                        <!-- <h4 class="c30">《从书法之美到生活之美》</h4> -->
                        <p class="c30 fz12">
                            <span class="">{{val.courseFullPrice}}元</span>
                            <small>共{{val.classHourCount}}次课</small>
                        </p>
                    </li>
                </ul>
            </div>
        </article>
    </div>
</template>
<script>
export default {
    name:'indexgivelessons',
    data () {
        return {

        }
    },
    props:{
        data:{
            type:null
        },
        types:{
            type:null
        }
    },
    methods:{
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
        },
        goBack () {
            let xt_menulist1Url = window.localStorage.getItem('xt_menulist1Url');
            let xt_menulist2Url = window.localStorage.getItem('xt_menulist2Url');
            if(this.types =='cengke'){
                this.$router.push({
                    path:xt_menulist1Url
                })
            }else{
                this.$router.push({
                    path:xt_menulist2Url
                })
            }
        }
    },
    mounted () {
        if(this.$flag ==true){
            document.getElementsByClassName('publicPadding')[0].style='padding-top:4.25rem;'
        }else{
            document.getElementsByClassName('publicPadding')[0].style='padding-top:2.5rem;'
        }
    }
}
</script>
<style lang="scss" scoped>
.mobile_content{
    position: relative;
}
.Book{
    padding-bottom:0;
}
.Book div div div h2.fz18{
    margin-top:0;
    font-weight: 600;
}
.Book div div div output{
    margin:0;
}
.Book div ul li{
    margin-top:0;
}
.fz24{
    margin-bottom:2.06rem;
    font-size:1.5rem;
}
.Book div ul li > span.pos_a.HaveClass{
    background:none;
}
.pos_a.fz12{
    font-size: .75rem;
    font-weight: 300;
    color: #fff;
    right: .05rem;
    top: .625rem;
    padding: .3125rem .5rem .3125rem .625rem;
    border-radius: 1.375rem;
    border-top-right-radius: 0rem;
    border-bottom-right-radius: 0rem;
    background:#B69271;
    &.HaveClass{
        right:-.14rem;
    }
}
</style>


