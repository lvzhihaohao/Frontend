<template>
    <div v-if="visible" @touchmove.prevent>
        <mt-popup v-model="popupVisible_Pleaselogin" position=""
         class="model_Pleaselogin app-Lv-GifBack" modal=false
         >
             <div class="model-content pos_r">
                <i class="pos_a"  @click="GifCan">
                    <img src="../../../static/icon/X-2.png"  alt="" srcset="">
                </i>
                <h3 class=" text-center"></h3>
                 <div class="app-Lv-FifDiv">
                    <p>您的朋友<span>[{{gifPhone}}]</span></p>
                    <p>给您送礼物啦</p>
                    <p>拆开礼物看看吧</p>
                    <p>希望您喜欢</p>
                    <h3 style="margin-top: 1.3rem;margin-bottom:1rem">《{{gifCouseName}}》课程</h3>
                    <div><button @click="GifOk" style="outline:none;cursor:pointer">拆礼物</button></div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import router from '../../router/index'
export default {
    data() {
        return {
            popupVisible_Pleaselogin: false,
            visible:false,
            gifList:[],
            gifPhone:'',//赠客人手机号
            gifCouseName:'',//课程名称
            gifId:'',//赠课id
            gifType:null,
            gifCouseId:null,
            IsNull:true
        }
    },
    watch:{
        popupVisible_Pleaselogin(newValue, oldValue){
            //console.log(newValue,'我监听到了')
            if(newValue){
                    this.GIfList()
            }else{
                   if(this.IsNull){
                       this.GifCan()
                   }
            }
        }
    },
    mounted(){
        //console.log(this.visible,'赠课弹窗')
    },
    methods:{
        //赠课列表
        GIfList(){
            this.$axios.post("/course/giftcourselist", {token:''}).then(res=>{
            //  res.result=[{phoneNum:"18720960540",courseName:"课程",id:1,courseType:1,courseId:23}]
            //console.log(res.data.result)
           if(res.data.result){
             this.gifList=res.data.result
             if(this.gifList.length==0){
                    this.IsNull = false
                    this.visible = false
                    this.popupVisible_Pleaselogin =  false
             }else{
                this.gifPhone=this.gifList[0].phoneNum
                this.gifCouseName = this.gifList[0].courseName
                this.gifId = this.gifList[0].id
                this.gifType = this.gifList[0].courseType
                this.gifCouseId = this.gifList[0].courseId
             }
           }
            //console.log(res,'sssssssssssssssssssssssss')
        })
        },
        click(){
            //console.log('5555')
        },
        //拆礼物
      async   GifOk(){
             //console.log(this.gifCouseId)
              await   this.GifCan('A')
        },
        //表示知道
        GifCan(type){
             this.$axios.post("/course/updateAlert", {token:'',id:this.gifId}).then(res=>{
                    //拆完一个知道后  再次询问是否还有
                    if(type=='A')   {
                         this.jump(this.gifCouseId)
                    }else{
                        return this.GIfList()
                    }
              })
        },
        jump(id){
            this.IsNull = false
             this.visible = false
             this.popupVisible_Pleaselogin =  false
            //console.log('wsssssssssssssssssssssss')
            if(this.gifType==1){
                    router.push({
                        path:'/chanjiedetail',
                        query:{id}
                     })
            }else{
                    router.push({
                        path:'/allcoursedetail',
                        query:{id}
                    })
            }
        },
    }
}
</script>
<style lang="scss">
// #app{
//     overflow: auto;
// }
.app-Lv-GifBack{
    background: url('../../../static/img/gifZU.png') cornsilk;
    background-size: contain;   
    // cover
}
.app-Lv-FifDiv{
    padding-top: 0.5rem;
    text-align: center;
    p{
        line-height: 1.3rem;
        opacity: 0.7;
        margin-top: 0.35rem;
        text-align: center;
        font-family: FZYaSongS-L-GB;
    }
    h3{
        line-height: 1.3rem;
        opacity: 0.9;
        font-size: 1.025rem !important;
    }
    button{
        background: #c4a57f;
        box-shadow: 0px 4px 10px 0px rgba(196, 165, 127, 0.19);
        border-radius: 18px;
        border: none;
        color: white;
        padding: 5px 15px 5px 15px;
    }
}
</style>
