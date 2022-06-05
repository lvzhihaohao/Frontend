<template>
    <div class="evenBackground">
        <div class="pl-27 pr-27 ifevenBackground"  v-for="(item,index) in data" :key='index'
            v-if='item.courseSingleResponseVos.length > 1'>
            <!-- 全阶 -->
            <div class="pos_r gu_pos_r" @click='goAllCourseDetail(item.courseFullId)'>
                <img  v-if='item.courseTypeId == "1"' 
                class="app-h5-indexquanfullimg pos_a"
                  src="../../../static/mobile_img/live-ico.png" alt="" >
                <img 
                class="app-h5-indexquanfullimg pos_a "
                   v-else src="../../../static/mobile_img/recorded-ico.png" alt="" >
                <span class="pos_a fz12" v-if='item.statusName == "正在报名"'
                    style="background:#b15546">{{item.statusName}}</span>
                <span class="pos_a fz12" v-if='item.statusName == "已结课"'
                    style="background:#648EA2">{{item.statusName}}</span>
                <span class="pos_a fz12" v-if='item.statusName == "开课中"'
                    style="background:#969A70">{{item.statusName}}</span>
                <span class="pos_a fz12" v-if='item.statusName == "报名未开始"'
                    style="background:#bd9d7d">{{item.statusName}}</span>
                <img 
                    style="width:20rem;height:11.31rem"
                    :src="item.coursePictureUri" alt="" :key="item.courseFullId"  :data-src='item.coursePictureUri'>
                <!-- 书法课程 -->
                <div class="Calligraphy-class">
                    <h2 class="fz18 ">{{item.courseName}}</h2>
                    <!-- <h4 class="fz15 mt-5 mb-10">《{{data.courseTitle}}》共{{data.courseSingleCount}}课</h4> -->
                    <output class="c5 mt-5"><s>原学费：{{item.courseFullPrice}}元</s></output>
                    <section>
                        <p class="fz18 c097 dis_in_block mt-5 mb-10" v-if='item.courseDiscountPrice'>{{item.courseDiscountPrice}}元</p>
                        <span>共{{item.classHourCount}}课</span>
                    </section>
                </div>
            </div>
            <ul class="app-h5-indexdanfull">
                <li v-for='(val, ind) in item.courseSingleResponseVos' v-if="val.courseStatus==2" :key='ind'
                        @click.stop='goChanJieDetail(val.courseId)'>
                    <span class="pos_a fz12 HaveClass" v-if='val.statusName == "正在报名"'
                        style="background:#b15546">{{val.statusName}}</span>
                    <span class="pos_a fz12 HaveClass" v-if='val.statusName == "已结课"'
                        style="background:#648EA2">{{val.statusName}}</span>
                    <span class="pos_a fz12 HaveClass" v-if='val.statusName == "开课中"'
                        style="background:#969A70">{{val.statusName}}</span>
                    <span class="pos_a fz12 HaveClass" v-if='val.statusName == "报名未开始"'
                        style="background:#bd9d7d">{{val.statusName}}</span>
                    <img  :src="val.coursePictureUri"
                        style="width: 9.5625rem;height:5.4375rem" :key="item.courseFullId" v-lazy='val.coursePictureUri' alt="" >
                    <p class="c30 mt-10 fz15">
                        <samp>{{val.sortName}} <span>{{val.courseName}}</span></samp>
                    </p>
                    <p class="c30 mt-10 fz12 gu_fz12">
                        <span class="price">{{val.courseFullPrice}}元</span>
                        <span>共{{val.classHourCount}}课</span>
                    </p>
                </li>
            </ul>
        </div>
        <div v-else class=" pl-27 pr-27 ifevenBackground">
            <div class="pos_r gu_pos_r" v-if="item.courseSingleResponseVos[0].courseStatus==2" @click='goChanJieDetail(item.courseSingleResponseVos[0].courseId)'>
                <img  v-if='item.courseSingleResponseVos[0].courseType == 1' 
                    src="../../../static/mobile_img/live-ico.png" alt="" class="app-h5-indexquanfullimg pos_a">
                <img  v-else src="../../../static/mobile_img/recorded-ico.png" alt="" class="app-h5-indexquanfullimg pos_a">
                <span class="pos_a fz12" v-if='item.courseSingleResponseVos[0].statusName == "正在报名"'
                    style="background:#b15546">{{item.courseSingleResponseVos[0].statusName}}</span>
                <span class="pos_a fz12" v-if='item.courseSingleResponseVos[0].statusName == "已结课"'
                    style="background:#648EA2">{{item.courseSingleResponseVos[0].statusName}}</span>
                <span class="pos_a fz12" v-if='item.courseSingleResponseVos[0].statusName == "开课中"'
                    style="background:#969A70">{{item.courseSingleResponseVos[0].statusName}}</span>
                <span class="pos_a fz12" v-if='item.courseSingleResponseVos[0].statusName == "报名未开始"'
                    style="background:#bd9d7d">{{item.courseSingleResponseVos[0].statusName}}</span>
                <img :key="item.courseId" :src="item.courseSingleResponseVos[0].coursePictureUri"  style="width:20rem;height:11.31rem">
                <div class="Calligraphy-class">
                    <h2 class="fz18 ">{{item.courseSingleResponseVos[0].courseName}}</h2>
                    <output class="c5 mt-5"><s>原学费：{{item.courseSingleResponseVos[0].courseFullPrice}}元</s></output>
                    <section>
                        <p class="fz18 c097 dis_in_block mt-5 mb-10" v-if='item.courseSingleResponseVos[0].courseFullPrice'>{{item.courseSingleResponseVos[0].courseFullPrice}}元</p>
                        <span>共{{item.courseSingleResponseVos[0].classHourCount}}课</span>
                    </section>
                </div>
            </div>
        </div>
        <!-- <ScrollBottom @timer="timer"  :moreTit="moreTit" ref="mychild"/> -->
    </div>
</template>
<script>
import ScrollBottom from '@/component/ScrollBottom'
import {mapState,mapActions} from 'vuex'
export default { 

    name:'course',
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
    props:{
        data:{
            type:null,
            required:true,
        },
        iptValue:{
            type:null,
        }
    },
    components:{
        ScrollBottom
    },
    methods:{
        ...mapActions({
                changegetIndex:'searchStore/changegetIndex'
        }),
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
        //加载更多
        timer(fn) {
                fn = null; //关闭滚动条
                let that = this;
                this.moreTit = "正在加载...";
                that.Timingopen = setInterval(function() {
                    // //console.log('???????????????????????????')
                    // that.ChangePage()
                    that.getMoreList()
                }, 1000);
      },
      getMoreList(){
          clearInterval(this.Timingopen)
          this.changegetIndex()
          this.$axios.post("/search/appCourselist", {
                pageIndex: this.Index,
                searchKeyword: this.iptValue,
            }).then(res=>{
                 let newarr = res.data.result.courseFullResponseVos;
                    if (newarr.length == 0) {
                        this.moreTit = "暂时都在这里了...";
                        this.$refs.mychild.gets();
                        return
                    }else{
                        newarr.forEach((item, i) => {
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
    }
}
</script>
<style lang='scss' scoped>
.evenBackground .ifevenBackground:nth-child(even){
    background: #FAF9F8;
}
.ifevenBackground{
    padding-top:1.8rem;
}
.gu_Book_fl_publicPadding div ul{
    width:100%;
    height:auto;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
        position:relative;
        width: 50%;
        overflow: hidden;
        .pos_a.fz12.HaveClass{
            font-size: .75rem;
            font-weight: 300;
            color: #fff;
            position: absolute;
            // right: 0;
            right: .5rem;
            top: .625rem;
            padding: .3125rem .5rem .3125rem .625rem;
            border-radius: 1.375rem;
            border-top-right-radius: 0rem;
            border-bottom-right-radius: 0rem;
        }
    }
}
.gu_pos_r{
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
    }
}
.app-h5-indexquanfullimg.pos_a{
    width:3.125rem;
    height:3.125rem;
    left:-.75rem;
    top:-.75rem;
}
</style>


