<template>
    <div id='app' class="nav-title-Baskhome-more">
        <article class="nav-title" fixed v-if='!this.$flag'>
            <mt-header title="我晒出的作业">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png" style="position:fixed" class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class='pl-30 pr-30 content'>          
            <div class="mobile_content " v-if='myBaskHomeWorkList.length>=1'>
                <article class="dis_flow_root mt-30" style="marginBottom:0rem">
                    <MyBaskHomeWorkList :data='myBaskHomeWorkList'/>   
                </article> 
            </div>
            <div class='gu_clear_guide' v-else>
                <img src="../../../static/img/null-My_discussion.png"  alt="" >
                <p class=" fz12 mt-15 c9">暂时没有哦~</p>
            </div>
        </div>
          <ScrollBottom @timer="timer"  v-if='myBaskHomeWorkList.length>=1' :moreTit="moreTit" ref="mychild"/>
    </div>
</template>
<script>
import ScrollBottom from '@/component/ScrollBottom'
import {mapState,mapActions} from 'vuex'
import {getMd5} from '../../public/index'
import MyBaskHomeWorkList from '../../component/myBaskHomeWork/myBaskHomeWorkList'
export default {
    name: "mybaskhomework",
    data(){
        return{
            moreTit:'加载更多',
            Timingopen:null,
        }
    },
    computed:{
        ...mapState({
            //我晒出的作业数据
            myBaskHomeWorkList:state=>state.MyBaskHomeworkStore.myBaskHomeWorkList,
            pageIndex:state=>state.MyBaskHomeworkStore.pageIndex
        })
    },
    mounted () {
      this.changeGetZero()
      this.getMyBaskHomeWorkAction(this.disposedata2())
    },
    components:{
        MyBaskHomeWorkList,
        ScrollBottom,
    },  
    methods:{
      ...mapActions({
            //我晒出的作业方法
            getMyBaskHomeWorkAction:'MyBaskHomeworkStore/getMyBaskHomeWorkAction',
            changeGetPage:'MyBaskHomeworkStore/changeGetPage',
            changeGetZero:'MyBaskHomeworkStore/changeGetZero'
        }),
        goBack () {
             this.$router.push({
                path:'/index/indexwode'
               }) 
            // this.$router.back(-1)
        },
        //处理我的作业数据
        disposedata2 () {
            let data={
                pageIndex:1,
                token:''
            };
            return data;
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
                    //console.log('tabid')
                    that.changeGetPage()
                    // that.ChangePage()
                    that.getMoreList()
                }, 1000);
      },
      getMoreList(){
           clearInterval(this.Timingopen)
            this.$axios.post("/userhomeworksun/list", {
                pageIndex: this.pageIndex,
                token: ""
            }).then(res=>{
                let newarr = res.data.result.userHomeWorkSunResponseVos;
                if (newarr.length == 0) {
                    this.moreTit = "暂时都在这里了...";
                    this.$refs.mychild.gets();
                    return
                }else{
                     newarr.forEach((item, i) => {
                        this.myBaskHomeWorkList.push(item);
                    });
                    this.moreTit = "加载更多";
                    this.$refs.mychild.get();
                }
            })
      }
    }
};
</script>
<style lang="scss">
    .nav-title-Baskhome-more .m-auto-afters{
        padding-top: 2rem;
    }
</style>

<style lang='scss' scoped>
    #app{
        width: 100%;
        height:100%;
        display:flex;
        flex-direction: column;
       .content{
            flex:1;
            // overflow: auto;
        }
    }
</style>
