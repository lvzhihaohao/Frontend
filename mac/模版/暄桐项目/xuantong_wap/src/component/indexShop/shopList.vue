<template>
    <div class="indexUls">
        <!-- 弃用 -->
    <ul :class='types=="index"? "indexUl" : "searchUl"'> 
        <li v-for="(item,index) in data" :key='index'
            @click='goShopLink(item.commodityUrlWap)'
        >
            <img v-lazy="item.commodityCoverUrl" :key="item.commodityId" alt="" style="border:1px solid white">
            <p class="c30 fz15">{{item.commodityName}}</p>
            <span class="c4a5 fz15">{{item.commodityPrice}}元</span>
        </li>
    </ul>
    <ScrollBottom style="clear:both" @timer="timer" @click="timer"  :moreTit="moreTit" ref="mychild"/>
    </div>
</template>
<script>
import ScrollBottom from '@/component/ScrollBottom'
import {mapState,mapActions} from 'vuex'
export default {
    name:'shop',
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
            require:true
        },
        types:{
           type:null
        },
        typeId:{
                type:null,
         } 
    },
    components:{
        ScrollBottom
     },
    methods: {
         ...mapActions({
                changegetIndex:'searchStore/changegetIndex'
         }),
        goShopLink (url) {
            window.location.href = url; 
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
                            that.getMoreList()
                        }, 1000);
            },
            getMoreList(){
                clearInterval(this.Timingopen)
                this.changegetIndex()
                this.$axios.post("/commodity/list", {
                        pageIndex:this.Index,
                        typeId:this.typeId,
                    }).then(res=>{
                        let newarr = res.data.result.commodityResponseVos;
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
    },
    mounted () {
    }
}
</script>
<style lang='scss' scoped>
.Four_stores .searchUl{
    box-sizing: border-box;
    padding:1.3125rem 1.68rem 0 1.68rem;
}
.Four_stores ul {
    
}
.Four_stores ul li{
    width:9.5625rem;
    margin-top:0px;
    margin-bottom: 1.5rem;
}
.Four_stores ul li:nth-child(1){
    margin-top:0
}
.Four_stores ul li:nth-child(2){
    margin-top:0
}
.indexUls{
    padding-bottom: 3.06rem;
}
img{
    display:block;
    width:100%;
    height:9.5625rem;
    border-radius: .18rem;
}
 p{
    margin-top: .93rem !important;
    margin-bottom: .425rem !important;
 }

</style>