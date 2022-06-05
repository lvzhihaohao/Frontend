<template>
    <div class="clear Level_task" style="paddingBottom:1.5rem">
         <h3>
            <img style="width: 1.3125rem;height: 1.3125rem;"  src="../../../static/img/taskicon.png" alt="">
            <span class="fz15 c30 fzGB1-0" style="font-weight:400;">作业任务</span>
        </h3>
        <div class="ch3-Color_lastChild" style="margin-bottom: 0.8rem;"  v-if=" data == 'undefined' || data.length > 0" v-for='(item,index) in data' :key='index' >
            <div class="Level_taskList Color_child1" :class="{'Color_android':android}" v-if='item.homeworkSubmitTypeText=="已评阅"' 
            >
                <div class="dis_in_block"  style="width:10.1rem;position: relative;">
                    
                    <span class="fzGB1-0 fz15 app-danyin">{{item.homeworkTitle}}</span>
                    <span class="cb19 fzGB1-0 fz15" @click='goTypeWorkDetail(item.homeworkAssignId)'
                     style="marginLeft:0.2rem;position: absolute;width:5rem"
                    >看详情</span>
                    <p class="c077 fzGB1-0 fz15" style='color:#077478'>{{item.homeworkSubmitTypeText}}</p>
                </div>
                <mt-button class="fr myHomeworkBtn fzGB1-0" style="margin-right:0.625rem;margin-top: -0.3rem;" @click='submitWork1(item.homeworkAssignId,item.homeworkTitle)'>查看</mt-button>
            </div>
            <div class="Level_taskList Color_childN1" :class="{'Color_android':android}" v-else-if='item.homeworkSubmitTypeText=="已提交"'
             >
                <div class="dis_in_block" style="width:10.1rem;position: relative;">
                    
                    <span class="fzGB1-0 fz15 app-danyin">{{item.homeworkTitle}}</span>
                    <span class="cb19 fzGB1-0 fz15" 
                     style="marginLeft:0.2rem;position: absolute;width:5rem"
                    @click='goTypeWorkDetail(item.homeworkAssignId)'>看详情</span>
                    <p class="c077 fzGB1-0 fz15" style='color:#C4A57F'>{{item.homeworkSubmitTypeText}}</p>
                </div>
                <mt-button class="fr myHomeworkBtn fzGB1-0" style="margin-right:0.625rem;margin-top: -0.3rem;" @click='submitWork1(item.homeworkAssignId,item.homeworkTitle)'>查看</mt-button>
            </div>
             <div class="Level_taskList Color_lastChild" :class="{'Color_android':android}" v-else>
                <div class="dis_in_block" style="width:10.1rem;position: relative;">
                    <div class="fzGB1-0 fz15 app-danyin">{{item.homeworkTitle}}</div>
                    <span class="cb19 fzGB1-0 fz15" style="marginLeft:0.2rem;position: absolute;width:5rem" @click='goTypeWorkDetail(item.homeworkAssignId)'>
                        看详情</span>
                    <p class="c077 fzGB1-0 fz15" style='color:#ccc'>{{item.homeworkSubmitTypeText}}</p>
                </div>
                <mt-button class="fr myHomeworkBtn fzGB1-0" style="font-weight:400;background:#C4A57F;color:white;margin-right:0.625rem;margin-top: -0.3rem;" @click='submitWork2(item.homeworkAssignId,item.homeworkTitle)'>交作业</mt-button>
            </div>
        </div>
        <div class='gu_clear_guide' v-if="data.length == 0" style="marginBottom:1.5625rem">
            <img src="../../../static/img/null-My_discussion.png"  alt="" >
            <p class=" fz12 mt-15 c9 fzGB1-0">作业还没有布置哦</p>
        </div>
    </div> 
</template>
<script>
export default {
    name:'tasktreeworklist',
    props:{
        data:{
            type:null,
            require:true
        }
    },
    data(){
        return{
            android:false
        }
    },
    mounted () {
        var u = navigator.userAgent;
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
            this.android=true;
        }
        //console.log(this.data,'this.androidthis.android')
    },
    methods: {
        //去往我的作业页面
     async   submitWork1 (id,type) {
        await    this.$axios.post('/homework/detail',{id:id}).then(res=>{
                  if(res.data.result){
                     //console.log(res.data.result.homeworkType)
                     window.localStorage.setItem('taskclasshourType', res.data.result.homeworkType)
                 }
            })
            this.$router.push({
                path:'/chanjiedetailmysubmitypework',
                query:{id,type}
            })
        },
        //去往提交作业页面
     async   submitWork2 (id,type) {
         await    this.$axios.post('/homework/detail',{id:id}).then(res=>{
                 if(res.data.result){
                     //console.log(res.data.result.homeworkType)
                     window.localStorage.setItem('taskclasshourType', res.data.result.homeworkType)
                 }
            })
            //   
            this.$router.push({
                path:'/chanjietasktreedetailsubmitwork',
                query:{id,type}
            })
        },
        //去往作业详情
        goTypeWorkDetail (id) {
            this.$router.push({
                path:'/typeworkdetail',
                query:{id}
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.gu_clear_guide{
    margin-left: 0!important;
}
.Color_android::after{
    // left: 0.2rem !important;
}
.Color_childN1::after{
    content: "";
    width: 1px;
    height: 47%;
    position: absolute;
    // left: 7px;
    display: inline-block;
    background: #eaeaea;
    top: 1.6875rem;
    left: 0;
}
.Color_child1::after{
    content: "";
    width: 1px;
    height: 47%;
    position: absolute;
    // left: 7px;
    display: inline-block;
    background: #eaeaea;
    top: 1.6875rem;
    left: 0;
}
.Color_lastChild::after{
    content: "";
    width: 1px;
    height: 47%;
    position: absolute;
    // left: 7px;
    display: inline-block;
    background: #eaeaea;
    top: 1.6875rem;
    left: 0;
}
.ch3-Color_lastChild:last-child{
    .Color_lastChild::after{
       display: none;
    }
}
 .app-danyin{
     overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    height:1.25rem;
    // max-width:6.8rem;
    margin-right: 0.25rem;
    display: inline-block;
 }
 .Level_task .myHomeworkBtn{
     min-width:70px;
 }
 .app-mz31{
     margin-left: 0.3125rem;
 }
</style>