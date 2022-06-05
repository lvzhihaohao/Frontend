<template>
    <div id='Store_menu' class="Store_menu gu_Store_menu">
        <div class="headerText">
            <article class="nav-title" v-if="!this.$flag">
                <mt-header  title="暄桐文房" class='book_header'>
                </mt-header>
            </article>
            <article :class="this.$flag?'nav-search':'nav-search nav-searchs'">
                <p class='ipt_book' @click='goShopSearch()'>
                    <input type="text" placeholder="查找我想要的…">
                    <img src="../../../static/mobile_img/search.png" alt="">
                </p>
            </article>
        </div>
        <div class="mobile_content pl-15 pr-15 Store_menuContent">
            <article class="dis_flow_root" style="height: 100%;overflow:hidden;">
                <ul class="Store_menuLeft">
                    <li v-for='(item,index) in bookShopMoreTitleList' :key='index'
                        :class="defaultIndex == item.typeId ? 'active':''">
                        <p  :data-id='index' @click='changeRight(item.typeId)'>{{item.typeName}}</p>
                    </li>
                </ul>
                <div class="Store_menuList" style="mar">
                    <ShopList ref="Shop" :data='bookShopMoreList' v-if='bookShopMoreList.length > 0' :typeId="defaultIndex"/>
                     <div class='gu_clear_guide' v-else>
                        <img src="../../../static/img/null-My_discussion.png"  alt="" >
                        <p class=" fz12 mt-15 c9">暂时没有哦~</p>
                    </div>
                </div>
            </article>                   
        </div>
    </div>
</template>
<script>
 import {mapState,mapActions} from 'vuex'
import ShopList from '@/component/indexShop/shopListAll'
export default {
    name:'indexshop',
    data () {
        return {
            value: '',
            defaultIndex:-1,
        }
    },
    computed :{
        ...mapState({
            //商城title数据
            bookShopMoreTitleList:state=>state.bookShopMoreStore.bookShopMoreTitleList,
            //商城数据
            bookShopMoreList:state=>state.bookShopMoreStore.bookShopMoreList
        })
    },
    components:{
        ShopList
    },
    mounted () {
        this.getBookShopMoreTitleAction()
        this.getBookShopMoreAction(-1)
        this.changeZeroIndex()
    },
    methods:{
        ...mapActions({
            //商城title
            getBookShopMoreTitleAction:'bookShopMoreStore/getBookShopMoreTitleAction',
            //商城
            getBookShopMoreAction:'bookShopMoreStore/getBookShopMoreAction',
            changeZeroIndex:'searchStore/changeZeroIndex'
        }),
        changeRight(ind) {
            if(this.$refs.Shop){
                 this.$refs.Shop.clearZero()
            }
            this.changeZeroIndex()
            //console.log(ind,'ind')
            this.defaultIndex=ind;
            this.getBookShopMoreAction(ind);
            this.$refs.Shop.goTop()
            this.$refs.Shop.renovation(ind)
        },
        goShopSearch () {
            this.$router.push({
                path:'/shopsearch'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .headerText{
        // height: 3rem;
        width: 100%
    }
    #Store_menu{
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .nav-search{
        margin:0.625rem 0;
        .ipt_book{
            width:100%;
            background:#fff;
            box-sizing: border-box;
            padding: 0 1.43rem;
            box-sizing: border-box;
            height: 2.25rem;
            position: relative;
            img{
                width:1rem;
                height:1rem;
                position:absolute;
                left:7.7rem;
                z-index:10;
                top:1.4rem;
                // top: 50%;
                margin-top: -.9rem;
                color:#ccc;
            }
        }
    }
    .nav-searchs{
        // margin-top: 3rem;
    }
    .book_header{
        font-size:1rem;
    }
    .ipt_book > input{
        box-sizing: border-box;
        padding-left:7.75rem;
        width:95%;
        height:2.25rem;
        background:#EEEEEE;
        border-radius: 1rem;
        outline: none;
        border:none;
        text-align: left;
        line-height: 2.25rem;
        color:#ccc;
        margin-bottom: 0.5rem;
        &::-webkit-input-placeholder { /* WebKit browsers */
            font-size: 1rem;
        }
    }
    
    .ipt_book > input::-webkit-input-placeholder{
           color:#ccc;
    }
    .gu_mobile_content{
        margin-top:3.6rem;
        flex:1;
    }
    .gu_c4a5_text-center{
        margin-top:1.75rem;
    }
    .Store_menuContent .Store_menuLeft li.active p{
        color: #010101;
        font-weight: bold;
    }
    .Store_menuContent{
        // padding-top: 5.8rem;
        // padding-bottom: 7.06rem;
        // box-sizing: border-box;
        flex: 1;
        overflow: hidden;
    }

    .Store_menuLeft{
        position: fixed;
        // top: 5.2rem;
        // overflow-y: scroll;
    }

    .Store_menuList{
        margin-left:4rem;
        // padding-bottom: 10rem;
        height: 100%;
        overflow: hidden;
        // overflow: scroll;
        // margin-bottom:20rem
        ul{
             padding-bottom: 5rem;
            //  overflow: scroll;
        }
    }

    .Store_menuContent .Store_menuLeft,.Store_menuList{
        // height: -webkit-fill-available;
    }

    .Store_menuContent.mobile_content article:last-child{
        margin-bottom: 3.75rem !important;
        
    }
</style>

