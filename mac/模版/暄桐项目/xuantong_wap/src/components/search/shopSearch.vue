<template> 
    <div class='search_wrap' @keydown="searchChange" style="-webkit-overflow-scrolling : touch;">
        <label for="" class='ipt_label'>
            <input type="text"  placeholder="查找我想要的…" v-model='iptValue' ref='ipt'>
            <img src="../../../static/mobile_img/search.png" alt="">
            <span @click='spnNone'>取消</span>
        </label>
        
        <div class="mobile_content" v-if='shopList.length > 0 && flag =="false"'>
            <div class="mobile_content" style="marginTop:5rem">
                <article class="Book fl Four_stores publicPadding pt-0">
                    <ShopList :data='shopList' :types='types' :iptValue="iptValue" :moreFlag="true"/> 
                </article>
            </div>
        </div>
        <div class='noContent' v-else-if='shopList.length ==0 && flag =="false"'>
            什么都没有搜到哦~
        </div>
       
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import ShopList from '@/component/search/searchShopList.vue'
export default {
    name:'shopsearch',
    data () {
        return {
            iptValue:'',
            Haveclass_menuList: '1',
            types:'index',
            flag:''
        }
    },
    computed: {
        ...mapState({
            //搜索商城数据
            shopList:state=>state.searchStore.shopList
        })
    },
    components: {
        ShopList
    },
    mounted(){
        this.$refs.ipt.focus();
        this.flag = 'true'
    },
    destroyed () {
        window.localStorage.setItem('searchFlag','true')
    },
    methods: {
        ...mapActions({
            //搜索商城
            getShopListAction:'searchStore/getShopListAction',
            changeZeroIndex:'searchStore/changeZeroIndex'
        }),
        spnNone () {
            this.$router.push({
                path:'/index/indexshop'
            })
        },
        searchChange (e) {
            
            if(e.keyCode===13){
                this.changeZeroIndex()
                window.localStorage.setItem('searchFlag','false')
                this.flag='false';
                this.getShopListAction({searchKeyword:this.iptValue,pageIndex:1});       
            }
        }
    }
}
</script>

<style lang="scss" scoped>
     .search_wrap{
        width:100%;
        height:100%;
        display:flex;
        flex-direction: column;
        .mobile_content{
            flex:1;
            // overflow: auto;
        }
    }
    .ipt_label{
        width:100%;
        background:#fff;
        box-sizing: border-box;
        padding:0 1.125rem 0 1rem;
        position:fixed;
        // margin:0.625rem 0;
        z-index: 9999;
        display:flex;
        align-items: center;
        input{
            margin-top:1rem;
            margin-bottom: 1rem;
            height:2.25rem;
            box-sizing: border-box;
            padding-left:2.375rem;
            flex:1;
            background:#EEEEEE;
            border-radius: 1rem;
            outline: none;
            border:none;
            text-align: left;
            color:#000;
            line-height: 2.25rem;
            &::-webkit-input-placeholder { /* WebKit browsers */
                font-size: 1rem;
            }
        }
        img{
            width:1rem;
            height:1rem;
            position:absolute;
            left:2rem;
            z-index:10;
            top:50%;
            margin-top: -.5rem;
            color:#ccc;
        }
        span{
            display:block;
            margin-left:.9rem;
            color:#555555;
            font-size:1rem;
        }
    }
    .ipt_label > input::-webkit-input-placeholder{
        color:#ccc;
        font-size:.93rem;
        font-family: 'FZLTHJW--GB1-0'
    }
    .noContent{
        width:100%;
        height:5rem;
        text-align: center;
        line-height: 5rem;
        margin-top: 6rem;
    }
</style>

