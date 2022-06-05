<template>
    <div id="app" class="My_orderTab_nav_mores">
        <article class="nav-title My_orderTab_nav" v-if='!this.$flag'>
            <mt-header title="我的订单">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png" style="position:fixed;left:-5px;top:0.3rem;"
            class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class=" pl-25 pr-25" >
            <article class="My_order" >
                <mt-navbar v-model="My_order" class="Haveclass_menuList My_orderTab tabSizeLei" :class="{My_orderTabWX:this.$flag}" >
                    <mt-tab-item id="1">全部</mt-tab-item>
                    <mt-tab-item id="2">待支付</mt-tab-item>
                    <mt-tab-item id="3">已支付</mt-tab-item>
                    <mt-tab-item id="4">已退款</mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="My_order" class="mt-10" >
                    <mt-tab-container-item id="1">
                        <div class="mobile_content " style="overflow-y:none !important">
                            <article  :class="!this.$flag?'dis_flow_root mt-30':'dis_flow_root dis_flow_root_lei'" >
                                <MyOrderList key="1" :data='myOrderList' @mychildget="mychildget" v-if='myOrderList.length > 0'/>
                                <div class='gu_clear_guide mt-30' v-else>
                                    <img src="../../../static/img/null-My_discussion.png"  alt="" >
                                    <p class=" fz12 mt-15 c9">暂时没有哦~</p>
                                </div>
                            </article>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="mobile_content">
                            <article  :class="!this.$flag?'dis_flow_root mt-30':'dis_flow_root dis_flow_root_lei'" >
                                <MyOrderList key="2" :data='myOrderList' @mychildget="mychildget" v-if='myOrderList.length > 0' />
                                    <div class='gu_clear_guide mt-30 '  v-else>
                                    <img src="../../../static/img/null-My_discussion.png"  alt="" >
                                    <p class=" fz12 mt-15 c9">暂时没有哦~</p>
                                </div>
                            </article>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <div class="mobile_content">
                            <article  :class="!this.$flag?'dis_flow_root mt-30':'dis_flow_root dis_flow_root_lei'" >
                                <MyOrderList key="3" :data='myOrderList' @mychildget="mychildget" v-if='myOrderList.length > 0' />
                                <div class='gu_clear_guide mt-30' v-else>
                                    <img src="../../../static/img/null-My_discussion.png"  alt="" >
                                    <p class=" fz12 mt-15 c9">暂时没有哦~</p>
                                </div>
                            </article>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="4">
                        <div class="mobile_content">
                            <article  :class="!this.$flag?'dis_flow_root mt-30':'dis_flow_root dis_flow_root_lei'" >
                                <MyOrderList key="4" :data='myOrderList' @mychildget="mychildget" v-if='myOrderList.length > 0' />
                                <div class='gu_clear_guide mt-30' v-else>
                                    <img src="../../../static/img/null-My_discussion.png"  alt="" >
                                    <p class=" fz12 mt-15 c9">暂时没有哦~</p>
                                </div>
                            </article>
                        </div>
                    </mt-tab-container-item>
                            
                </mt-tab-container>
            </article>
        </div>
        <ScrollBottom @timer="timer" v-show='myOrderList.length > 0' :moreTit="moreTit" ref="mychild"/>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import ScrollBottom from '@/component/ScrollBottom'
import MyOrderList from '../../component/myOrder/myOrderAllList'
import {getCookie} from '../../public/index'
import {userclasshourTime,formData} from '@/public/index'
export default {
    name:'myorder',
    data() {
        return {
            My_order: '1',
            ordertypelist:[],
            moreTit:'加载更多',
            Timingopen:null,
        }
    },
    computed:{
        ...mapState({
            //我的订单数据
            PageIndex:state=>state.myOrderStore.pageIndex,
            tabid:state=>state.myOrderStore.tabid,
            myOrderList:state=>state.myOrderStore.myOrderList
        })
    },
    components:{
        MyOrderList,
        ScrollBottom
    },
    watch: {
        My_order: function (val, oldVal) {
            this.ChangeZero()
            this.moreTit = "加载更多";
            this.$refs.mychild.get();
            if(val=='1'){
                this.getchangetabid(-1)
                this.getMyOrderAction(this.disposedata2('-1'))
                //console.log('one')
            }else if(val=='2'){
                this.getchangetabid(1)
                this.getMyOrderAction(this.disposedata2('1'))
                //console.log('two')
            }else if(val=='3'){
                this.getchangetabid(2)
                this.getMyOrderAction(this.disposedata2('2'))
                //console.log('three')
            }else if(val=='4'){
                this.getchangetabid(4)
                this.getMyOrderAction(this.disposedata2('4'))
                //console.log('four')
            }
        }
    },
    methods:{
        formData,
        ...mapActions({
            //我的订单方法 
            getchangetabid:'myOrderStore/getchangetabid',
            getMyOrderAction:'myOrderStore/getMyOrderAction',
            ChangePage:'myOrderStore/ChangeGetPage',
            ChangeZero:'myOrderStore/ChangeGetZero',
        }),
        goBack () {
           this.$router.push({
                path:'/index/indexwode',
            })
        },
        //处理作品集数据
        disposedata2 (typeId) {
            let data={
                orderStatus:typeId,
                pageIndex:1,
                token:''
            };
            return data;
        },
        mychildget(){
                //console.log('怎么回事')

            if(this.$refs.mychild){
                this.moreTit = "加载更多";
                 this.$refs.mychild.get();
            }
        },
        //加载更多
        getMoreList(){
             clearInterval(this.Timingopen)
             this.$axios.post("/order/list", {
                pageIndex: this.PageIndex,
                orderStatus: this.tabid,
                token: "" 
            }).then(res=>{
                let newarr = res.data.result.orderResponseVos;
                if (newarr.length == 0) {
                    this.moreTit = "暂时都在这里了...";
                    this.$refs.mychild.gets();
                    return
                }else{
                     newarr.forEach((item, i) => {
                          item.createTime=this.formData(item.orderTime,"utc","add",false)
                          if(item.courseIdList[0].courseName=='全阶课程_从书法之美到生活之美'){
                                item.type =1
                                item.courseIdList[0].coursePrice = '16800'
                                item.courseIdList[0].coursePictureThumbUri = require("../../../static/mobile_img/OrderList0.jpg");
                            }
                            if(item.courseIdList[0].courseName=='第一阶_篆隶筑基课程'){
                                item.type =1
                                item.courseIdList[0].coursePrice = '3280'
                                item.courseIdList[0].coursePictureThumbUri = require("../../../static/mobile_img/OrderList1.jpg");
                            }
                            if(item.courseIdList[0].courseName=='第二阶_楷书精进课程'){
                                item.type =1
                                item.courseIdList[0].coursePrice = '6560'
                                item.courseIdList[0].coursePictureThumbUri = require("../../../static/mobile_img/OrderList2.jpg");
                            }
                            if(item.courseIdList[0].courseName=='第三阶_小楷写经课程'){
                                item.type =1
                                item.courseIdList[0].coursePrice = '3280'
                                item.courseIdList[0].coursePictureThumbUri = require("../../../static/mobile_img/OrderList3.jpg");
                            }
                            if(item.courseIdList[0].courseName=='第四阶_自在行草课程'){
                                item.type =1
                                item.courseIdList[0].coursePrice = '6560'
                                item.courseIdList[0].coursePictureThumbUri = require("../../../static/mobile_img/OrderList4.jpg");
                            }
                        this.myOrderList.push(item);
                    });
                    this.moreTit = "加载更多";
                    this.$refs.mychild.get();
                }
            })
           
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
                    //console.log(that.tabid,'tabid')
                    that.ChangePage()
                    that.getMoreList()
                }, 1000);
      }
    },
    mounted(){
        this.ChangeZero()
        // this.$axios.post("/order/typelist", {}).then(res=>{
        //     //console.log()
        //     this.ordertypelist = res.data.result;
        // })
        this.getchangetabid(-1)
        this.getMyOrderAction(this.disposedata2(-1))
        //console.log('one')
    }
}
</script>
<style lang="scss">
    .My_orderTab_nav_mores .m-auto-afters{
        padding-top: 2rem;
    }
</style>

<style lang='scss' scoped>
    .dis_flow_root_lei{
        margin-top:4.3rem!important;
    }
    .mobile_content article:last-child{
        margin-bottom: 0rem;
    }
    #app{
        display:flex;
        flex-direction: column;
        .pl-30.pr-30{
            flex:1;
            // overflow: auto;
        }
    }
    .Haveclass_menuList.My_orderTab{
        width:100%;
        position:fixed;
        top:2.2rem;
        // padding-top: 2.2rem;
        // background: red;
        height: 3.2rem;
        padding: 0 .4rem;
        box-sizing: border-box;
        left:0;
        z-index:10;
    }
    .My_orderTab_nav{
        width:100%;
         position:fixed;
        top:0rem;
        left:0;
        z-index:10;
    }
    .mt-30{
        margin-top:6.58rem;
    }
    .My_orderTabWX{
        margin-top:-2.3rem;
        padding-top:0.5rem;
    }
    .mint-navbar .mint-tab-item.is-selected{
        border-bottom: none!important;
        color: none;
        margin-bottom: -3px;
        position: relative;
    }
    .mint-tab-item.is-selected::after{
        content: "";
        width: 3.33rem;
        height: .2rem;
        background: #C4A57F;
        position: absolute;
        bottom: .7rem;
        left:50%;
        margin-left: -1.665rem;
    }
</style>


