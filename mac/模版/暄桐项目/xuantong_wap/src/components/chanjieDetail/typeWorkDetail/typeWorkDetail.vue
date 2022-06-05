<template>
    <div class='wrap'>
         <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="作业任务" fixed>
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../../static/img/back.png" class='gu_nav_title_img_top'
             v-if='this.$flag' @click='goBack'>
        <div class='content'>
            <h3>{{typeWorkDetailData.homeworkTitle}}</h3>
            <p class="gu_beforepclass" v-html="content"></p>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'

export default {
    name:'typeworkdetail',
    data(){
        return {
            id:'',
            content:''
        }
    },
    async mounted () {
        if(this.$route.query.id){
            this.id = this.$route.query.id;
            window.localStorage.setItem('typeWorkId',this.$route.query.id)
        }else{
            this.id = window.localStorage.getItem('typeWorkId')
        }
        await this.getTypeWorkDetailAction({id:this.id})
        // this.content = JSON.parse(this.typeWorkDetailData.homeworkContent).blocks[0].text
        this.content = this.typeWorkDetailData.homeworkContent
    },
    computed:{
        ...mapState({
            typeWorkDetailData:state=>state.chanJieTypeWorkDetailStore.typeWorkDetailData
        })
    },
    methods:{
        ...mapActions({
            getTypeWorkDetailAction:'chanJieTypeWorkDetailStore/getTypeWorkDetailAction'
        }),
        goBack () {
            this.$router.back(-1)
        },
    }
}
</script>
<style lang="scss" scoped>
    .wrap{
        width:100%;
        height:100%;
        display:flex;
        flex-direction: column;
        .content{
            flex:1;
            padding:3rem 2rem 4rem 2rem;
            text-align: center;
            p{
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                margin-top:1rem;
            }
        }
    }
</style>


