<template>
    <div id="app">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="写字的人">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <div class="mobile_content">
            <!--写字的人-->
            <article class="Book fl publicPadding People_write" v-if='peopleWriteList.length > 0'>
                <img src="../../../static/img/back.png" class='gu_nav_title_img'
                    v-if='this.$flag' @click='goBack'>
               <PeopleWriteList :data='peopleWriteList'/>
            </article>
            <div class='gu_clear_guide' v-else>
                <img src="../../../static/img/null-My_discussion.png"  alt="" >
                <p class=" fz12 mt-15 c9">暂时没有哦~</p>
            </div>
        </div>
         <ScrollBottom @timer="timer"  v-if='peopleWriteList.length > 0' :moreTit="moreTit" ref="mychild"/>
    </div>
</template>
<script> 
import ScrollBottom from '@/component/ScrollBottom'
import {mapState,mapActions} from 'vuex'
import PeopleWriteList from '../../component/peopleWriteList.vue'
export default {
    name:'peoplewrite',
    data() {
        return {
            moreTit:'加载更多',
            Timingopen:null,
            index:1,
        }
    },
    created(){
        window.scrollTo(0,0)
    },
    components:{
        PeopleWriteList,
        ScrollBottom
    },
    computed:{
        ...mapState({
            //更多写字的人数据
            peopleWriteList:state=>state.peopleWriteStore.peopleWriteList
        })
    },
    watch: {
    },
    methods: {
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
                    that.getMoreList()
                }, 1000);
        },
        getMoreList(){
            clearInterval(this.Timingopen)
            this.index++
            this.$axios.post("/article/list", {
                columnId: "1",
                pageIndex: this.index,
                token: ""
            }).then(res=>{
                let newarr = res.data.result.artivityResponseVos;
                if (newarr.length == 0) {
                    this.moreTit = "暂时都在这里了...";
                    this.$refs.mychild.gets();
                    return
                }else{
                     newarr.forEach((item, i) => {
                        this.peopleWriteList.push(item);
                    });
                    this.moreTit = "加载更多";
                    this.$refs.mychild.get();
                }
            })
        },
         ...mapActions({
             //更多写字的人方法
            getPeopleWriteAction:'peopleWriteStore/getPeopleWriteAction'
        }),
        goBack () {
            this.$router.push({
                path:'/index/indexShouye'
            })
            // this.$router.back(-1)
        },
        handleClick: function () {
            this.$toast('Hello world!')
        },
    },
    mounted() {
        this.getPeopleWriteAction({columnId:this.$route.params.id,pageIndex:1})
        //console.log(this.$route.params)
        // if(this.$flag){
        //     document.getElementsByClassName('Book')[0].style='padding-top:2.2rem'
        // }else{
        //     document.getElementsByClassName('Book')[0].style='padding-top:1.6rem'
        // }
    }
}
</script>
<style lang='scss' scoped>
    #app{
        display:flex;
        flex-direction: column;
    }
    .Chairclass-content p {
        margin-bottom: 0rem;
    }
    
    .mobile_content article:last-child{
        margin-bottom: 0rem;
    }
    .Book.fl.publicPadding.People_write{
        position:relative;
    }
</style>


