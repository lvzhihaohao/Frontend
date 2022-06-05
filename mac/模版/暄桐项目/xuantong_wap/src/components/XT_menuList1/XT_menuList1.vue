<template>
    <div id="app">
        <article class="nav-title"  v-if='!this.$flag'>
            <mt-header title="赠送给好友">
               <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <IndexGiveLessons :types='types'  :data='indexGiveLessonsList' v-if='indexGiveLessonsList.length > 0'/>
        <div class='gu_clear_guide' v-else>
            <img src="../../../static/img/null-My_discussion.png"  alt="" >
            <p class=" fz12 mt-15 c9">暂时没有哦~</p>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import IndexGiveLessons from '../../component/index/indexGiveLessons'
export default { 
    name:'xtmenulist1',
    data () {
        return {
            types:'cengke'
        }
    },
    computed:{
        ...mapState({
            //赠课好友的数据
            indexGiveLessonsList:state=>state.indexGiveLessonsStore.indexGiveLessonsList
        })
    },
    components:{
        IndexGiveLessons
    },
    beforeRouteEnter(to,from,next){
        if(from.path=='/chanjiedetail' || from.path=='/' ||from.path=='/allcoursedetail'){   
            let xt_menulist1Url = window.localStorage.getItem('xt_menulist1Url');
            window.localStorage.setItem('xt_menulist1Url',xt_menulist1Url)
        }else{
            window.localStorage.setItem('xt_menulist1Url',from.path)
        }
        next()
    },
    methods:{
        ...mapActions({
            //赠课好友的方法
            getIndexGiveLessonsAction:'indexGiveLessonsStore/getIndexGiveLessonsAction'
        }),
        goBack () {
            let xt_menulist1Url = window.localStorage.getItem('xt_menulist1Url');
            this.$router.push({
                path:xt_menulist1Url
            })
        },
        //处理公共数据1  赠课与好友列表
        disposedata1() {
            let data={
                columnId:1,
                pageIndex:1,
                sortName:"Asc",
                sortType:1,
                token:''
            };
            return data;
        },
    },
    mounted(){
        //console.log(1)
         this.getIndexGiveLessonsAction(this.disposedata1());
    }
}
</script>
<style lang="scss" scoped>
    #app{
        width:100%;
        height:100%;
        display:flex;
        flex-direction: column;
        .mobile_content{
            flex:1;
            overflow: auto;
        }
    }
</style>

