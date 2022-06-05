<template>
    <div>
        <div class="clear" 
         :class="index==data.length-1?'app-BaskhomeWorkList-lv':''"
        v-for='(item,index) in data' :key='index' @click="gochanjiedetaildiscuss(item.homeworkFinishId)">
            <div class="My_homeworkBody">
                <div class="fz18 c30 chanjieH3">我</div>
                <p class="fz15" style="color:#999">来自 <span class="c4a5">{{item.courseName}}</span></p>
                <p class="fz15 c9 BasKHome-app-lv-editer" style="line-height: 1.5rem;" v-html='item.homeworkFinishContent'>{{item.homeworkFinishContent}} </p>
                <div class="dis_flow_root " style="marginBottom:1.5rem">
                    <ul class="My_homeworkList">
                        <li v-for='(val,ind) in item.homeworkFinishPics' :key='ind' @click='showImg(val)'>
                            <img v-lazy="val.thumbUri" :key='ind' alt="" style="object-fit: cover;"
                            >                                               
                        </li>
                    </ul>
                    <p class="dis_flow_root">
                        <time class="fz12 c9">{{item.createTime}}</time>
                        <!-- <span class="fz15 fr cb19"><i class=""></i>{{item.homeworkLevel}}</span> -->
                    </p>
                </div>
            </div>
        
        </div>
    </div> 
</template>
<script>

export default {
    name:'shop',
    props:{
        data:{
            type:null,
            require:true
        }
    },
    methods: {
        showImg(item){
           this.ShowViewer(item.discussionOriginalPicture)
        },
        gochanjiedetaildiscuss(id){
            this.$router.push({
                path:"/chanjiedetaildiscuss",
                query:{
                    id:id,
                    type:2
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.app-BaskhomeWorkList-lv{
    padding-bottom: 0.5rem;
       .My_homeworkBody::after{
           display: none;
       }
}
 .My_homeworkList li img{
     width:6.5rem;
     height:6.5rem;
 }
 .My_homeworkBody{
     padding-top: 1rem;
 }
 .My_homeworkBody .My_homeworkList{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.dis_flow_root{
    width: 100%;
}
</style>