<template>
    <div class="Haveclass_menu-Hot allCourse_List" style=" border-top:0px; border-bottom:0px;">
        <div class="clear c3c" v-for='(item,index) in data' :key='index'  
            @click='goChanJieDetail(item.courseId)' v-if='item.purchased'>
            <div><img :src="item.coursePictureUri" alt=""></div>
            <div class="app-clear-ctns">
                <div class="app-clear-ctns-text fz15 c30" style="width:100%">{{item.courseName}}</div>
                <p class="fz12"><span>{{item.courseFullPrice}}元</span>共{{item.classHourCount}}课</p>
                <p style='text-align:right' class='fz12'>已报名</p>
            </div>
        </div>
        <div class="clear"  @click='goChanJieDetail(item.courseId)' v-else>
            <div><img :src="item.coursePictureUri" alt=""></div>
            <div class="app-clear-ctns">
                <div class="app-clear-ctns-text fz15 c30" style="width:100%">{{item.courseName}}</div>
                <p class="fz12"><span>{{item.courseFullPrice}}元</span>共{{item.classHourCount}}课</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'allChanJieList',
    props:{
        data:{
            type:null
        }
    },
    methods:{
        goChanJieDetail (id) {
            this.$router.push({
                path:'/chanjiedetail',
                query:{id}
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    .app-clear-ctns{
        float: left !important;
        width:9rem !important;
        margin-left:1.25rem !important;
        .app-clear-ctns-text{
            height: auto;
            line-height: 1.1rem;
            font-size: .9375rem;
        }
        span{
            margin-right:.625rem;
        }

    }
    .mobile_content article:last-child {
            // margin-bottom: 0rem;
    }
    .signUp{
        width: 8.125rem;
    }
    .Haveclass_menu-Hot div.clear div .app-clear-ctns-text{
        font-size:.9rem; 
        margin-top:.425rem;
        margin-bottom:.93rem;
        // color: #585757!important;
    }
    .mobile_content article:last-child {
        /* margin-bottom: 0rem; */
    }
</style>


