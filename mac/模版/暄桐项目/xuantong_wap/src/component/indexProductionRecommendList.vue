<template>
    <div :class="data.length >=10 && types=='more'?'scrollWater  gu dis_flow_root pb-30':'scrollWater  dis_flow_root pb-30'" ref="scrollWater">
        <ul class="list">
            <li ref="aryOne">
                <div class="div" v-for="(item,index) in ary1" :key="index">
                    <img v-if="rFlag" :src='item.src' :key="item.productionId"  @click='showImg(item,item.introduction)' class='productionImg'>
                    <img v-if="!rFlag" :src='item.pictureUrl' :key="item.productionId"  @click='showImg(item,item.introduction)' class='productionImg'>
                    <div class="Students_homework-model">
                        <div class="homework-height">
                            <p class="fz18 cf">
                                    {{item.introduction}}</p>
                            <div class='fz12'>
                                <p class="fz14 cf">
                                    {{item.author}}
                                </p>
                                <p @click='giveLike(item.productionId)' class="app-lvmd-4">
                                    <i  v-if='item.isLiked' class="starClick"><img style="width:1rem;height:1rem" src="../../static/img/starClick.png" alt=""></i>
                                    <i  style="color: #ccc;" v-else class="star"><img style="width:1rem;height:1rem" src="../../static/img/star.png" alt=""></i>
                                    <span>{{item.likeNum}}</span>
                                </p> 
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="app-lvmz11" :class="rFlag?'applvmz11':''">
                <div class="div" v-for="(item,index) in ary2" :key="index">
                    <img v-if="rFlag" :src='item.src' :key="item.productionId"  @click='showImg(item,item.introduction)' class='productionImg'>
                    <img v-if="!rFlag" :src='item.pictureUrl' :key="item.productionId"  @click='showImg(item,item.introduction)' class='productionImg'>
                    <div class="Students_homework-model">
                        <div class="homework-height">
                            <p class="fz18 cf">{{item.introduction}}</p>
                            <div class='fz12'>
                                <p class="fz14 cf">
                                    {{item.author}}
                                </p>
                                <p @click='giveLike(item.productionId)' class="app-lvmd-4">
                                    <i  v-if='item.isLiked'  class="starClick"><img style="width:1rem;height:1rem" src="../../static/img/starClick.png" alt=""></i>
                                    <i  style="color: #ccc;" v-else class="star"><img style="width:1rem;height:1rem" src="../../static/img/star.png" alt=""></i>
                                    <span>{{item.likeNum}}</span>
                                </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import {getUserInfoCookie,getCookie} from '@/public/index'
    import {mapState,mapActions} from 'vuex';
    export default {
        name:'indexProductionRecommend',
        data () {
            return {
                ary1: [],
                ary2: [],
                aryHeight: [
                    { index: 0, H: 0 },
                    { index: 1, H: 0 }
                ],  
                dataAry:[],//顺序数组
            }
        },
        props:{
            rFlag:{
                type:null
            },
            data:{
               // type:null,
                require:true
            },
            types:{
                type:null 
            }
        },
        watch:{
            async data(newValue,oldValue){
                if(newValue.length >= 1 ){
                    this.ary1= [],
                    this.ary2= [],
                    this.aryHeight= [
                        { index: 0, H: 0 }, 
                        { index: 1, H: 0 }
                    ],  
                    this.dataAry=[]
                    await this.initImgAry(newValue);
                }
             },
        },
        computed:{
            ...mapState({
                //作品点赞返回数据
                classMateGiveLikeData:state=>state.classMateMoreStore.classMateGiveLikeData
            })
        },
        async mounted () {
            await this.initImgAry(this.data);
            // setTimeout(()=>{
            //     this.imgHeight();
            // },1000)
        },
        methods:{
            ...mapActions({
                //作品点赞
                getClassMateGiveLikeAction:'classMateMoreStore/getClassMateGiveLikeAction'
            }),
            //处理图片高度
            imgHeight() {
                this.$nextTick(()=>{
                    [...document.getElementsByClassName('productionImg')].forEach(item=>{
                        if(item.offsetHeight < 120){
                            item.style.height='5.3rem';
                            item.style.objectFit = 'cover';
                        }
                    })
                })
            },
            //点击看大图  触发父组件事件
            showImg (item,introduction) {
                this.$emit('showImg',item,introduction)
            },
            //作品点赞
            async giveLike (id) {
                if (!getUserInfoCookie() || getCookie() == "undefined") {
                this.$ModelToast(true);
                return
            } 
                await this.getClassMateGiveLikeAction(this.disposedata1(id))
                if(this.classMateGiveLikeData.msg == '请求成功'){
                    // if(this.types == 'more'){
                        this.$emit('productionParentMore',id)
                        this.ary1.forEach((item,index)=>{
                            if(item.productionId==id&&item.isLiked==false){
                                item.isLiked=true
                                item.likeNum=++item.likeNum
                                //console.log(item)
                            }
                        })
                        this.ary2.forEach((item,index)=>{
                            if(item.productionId==id&&item.isLiked==false){
                                item.isLiked=true
                                item.likeNum=++item.likeNum
                                //console.log(item)
                            }
                        })
                    // }else{
                        // this.$emit('productionParent',id)
                    // } 
                }else if(this.classMateGiveLikeData.code==600001){
                       this.$Toast("您已点过赞")
                    //    this.$Toast(this.classMateGiveLikeData.msg)
                }
            },
            //处理作品点赞数据
            disposedata1(id) {
                let data={
                    productionId:id,
                    token:''
                };
                return data;
            },
            //处理数据
            initImgAry(ary) {
                    let W = this.$refs.aryOne.clientWidth; //当前图片的宽
                    ary.forEach((item, index) => {
                        if(!item.productionLong||!item.productionWidth){
                             ////console.log("不合理的数据",item)
                        }
                        this.aryHeight = this.aryHeight.sort((a, b) => a.H - b.H);
                        // if(!item.productionLong||!item.productionWidth){
                        //     this.aryHeight[0].H += (0.5)* W; //当前图片的高
                        // }else{
                        //     this.aryHeight[0].H += (item.productionLong/item.productionWidth)* W; //当前图片的高
                        // }
                        let FontSize = (window.getComputedStyle(document.body).fontSize).substr(0,2)
                        //console.log( FontSize * (38.59/16))
                        let remone = FontSize * (38.59/16)
                        let remtwo = FontSize * (11.68/16)
                        let remthree = FontSize * (27/16)
                      
                        this.aryHeight[0].H += (item.productionLong/item.productionWidth)* W + remone+remtwo+remthree; //当前图片的高
                        let n = this.aryHeight[0].index;
                        switch (n) {
                            case 0:
                                this.ary1.push({
                                src: item.thumbUrl,
                                id: item.productionId,
                                ...item
                            });
                                break;
                            case 1:
                                this.ary2.push({
                                src: item.thumbUrl,
                                id: item.productionId,
                                ...item
                            });
                                break;
                        }
                        this.dataAry.push(item)
                    });
                // this.sortData() 
            },
            //排序数据
            sortData(){
                let data=[]
                let ary=[this.ary1,this.ary2]
                ary.sort((a,b)=>a.length-b.length)
                //ary[0]//最长
                ary[0].forEach((item,index)=>{
                    if(this.ary1[index]){
                    data.push(this.ary1[index])
                    }
                    if(this.ary2[index]){
                    data.push(this.ary2[index])
                    }
                })
                this.dataAry=data
            },
        }
}
</script>
<style lang='scss' scoped>
    .dis_flow_root{
        padding-bottom:1rem!important;
    }
    .applvmz11{
            margin-right:1.1rem !important;
    }
    .app-lvmd-4{
        margin-top: -0.25rem;
        display: flex;
        align-items: center;
    }
    .app-lvfz125{
        font-size: 1.125rem;
    }
    .scrollWater {
        width:100%;
        &.gu{
            &:after {
                display: inline-block;
                content: attr(data-html);
                width: 100%;
                height: 3rem;
                // background:#ccc;
                position: relative;
                bottom: 1.5rem;
                text-align: center;
                line-height: 3rem;
                color: #C4A57F;
            }
        }
        .list {
            width: 100%;
            height: auto;
            overflow: hidden;
            // margin-bottom: 2rem;
            li {
                float: left;
                width: 9.5625rem !important;
                box-sizing: border-box;
                margin:0 auto;
            &:nth-child(2n){
                // margin-right:1.1rem;
                float: right;
            }
            > div {
                    width: 100%;
                    margin-bottom: 1.6875rem;
                    img {
                        display: block;
                        width:100%;
                        height: 100%;
                        border-radius:.18rem;
                    }
                }
            }
        }
    }
    .fz18{
        color:#000 !important;
        margin:.73rem 0 .35rem 0;
        font-size:.93rem !important; 
        font-weight: 400;
        font-family: 'FZXIYSJ';
        height: 1rem;
        overflow: hidden;
    }
    .fz12{
        display:flex;
        justify-content: space-between;
        align-items: center;
            height: 1rem;
        .cf{
            width:7rem;
            overflow:hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
        }
        span{
            font-size:.75rem;
            margin-left: 0.31rem;
            color:#999;
        }
        .app-lvmd-4{
            display: flex;
            height: 1rem;
            padding-top: .2rem;
            align-items: center;
        }
    }
    .fz14{
        color:#C4A57F !important;
        font-size:.8rem;
    }
    .div {
     position: relative;
     &>img{
         min-height: 5.3rem;
         object-fit:cover
     }
    }
    .pb-30{
        padding-bottom:0;
    }
</style>


