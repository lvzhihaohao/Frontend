<template>
    <div class="appBox">
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header fixed title="系统消息">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <!-- v-if='this.$flag' -->
        <img src="../../../../static/img/back.png" class='gu_nav_title_img_top app-meessTell-lv' v-if='this.$flag'   @click='goBack'>
        <div ref="wrappers" class="mobile_content pl-28 pr-28" :style="!this.$flag?'margin-top: 3.5625rem':'margin-top:0rem !important'">
            <div class="messageContent_List pl-12 pr-12" style="padding-bottom:2rem;overflow: hidden;"  ref="messageContentList">
                <div v-for="(item,index) in list" :key="index" style="margin-bottom: 4rem;">
                    <time class="fz14 c9 dis_block text-center mt-10 mb-40">{{item.time}}</time>
                    <div style="" class="text-left mb-40" v-for="(ite,ind) in item.data" :key="ind">
                        <h3 class="fz14 c30" style="fontSize:.875rem">{{ite.title}}</h3>
                        <p class="fz14 c9  boxElii app-java-mext" style="margin-top: .2375rem;margin-bottom: .2375rem;lineHeight:1.5rem"  v-html="initHTML(ite.message)">
                            <!-- <span class="" style="lineHeight:1.5rem;fontSize:.875rem" ></span> -->
                        </p>
                         <p class="fz12 c30 c9" >{{initTime(ite.sendTime)}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import moment from "moment";
    import Bscroll from "better-scroll";
    export default {
        name: 'mysystemmessage',
        data() {
            return {
                list: [{
                    message: "", //内容
                    messageType: "", //消息类型（1：纯文本，2：公告，3：通知）
                    sendTime: "", //发送时间
                    title: "" //消息标题（纯文本消息无标题）
                }],
                typeid: null, //类型id
                recstudeid: null, //发送人id
                senderId:null,
                scroll:null
            }
        },
        created(){
            this.$nextTick(()=>{
                this.scroll = new Bscroll(this.$refs.wrappers, {
                    //初始化better-scroll
                    probeType: 3, //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
                    click: true, //是否派发click事件
                    scrollY: true
                });
            })
        },
        mounted() {
            
            this.typeid = this.$route.query.typeid
            this.recstudeid = this.$route.query.recstudeid
            this.senderId = this.$route.query.studeid
            //console.log(this.typeid, this.recstudeid)
            this.$axios
                .post("/privateletter/messagelist", {
                    token: "",
                    senderId:this.senderId,
                    senderType: this.typeid
                })
                .then(res => {
                    //console.log(res.data.result.privateLetterMessageResponseVos, "系统");
                    if (res.data.code == 0) {
                        this.list = this.initData(res.data.result.privateLetterMessageResponseVos)
                    }
                    setTimeout(() => {
                        //console.log(this.scroll.maxScrollY,"----")
                        this.scroll.scrollTo(0,this.scroll.maxScrollY,300)
                    })
                });
            //    this.$nextTick(() => {
            //         this.HContent()
            //      })
        },
        methods: {
            //获取count的高
            HContent(){
                let scr = this.$refs.messageContentList;
                let css = document.body.currentStyle ?
                    document.body.currentStyle :
                    document.defaultView.getComputedStyle(document.body, null);
                this.H = window.screen.height / parseFloat(css.fontSize) - 6.1;
                window.scrollTo(0,scr.offsetHeight)
                // 弃用
                // this.scrollBottom()
            },
            // 弃用
            //移动到底部
            // scrollBottom() {
            //     setTimeout(() => {
            //         let scr = this.$refs.messageContentList;
            //         this.$nextTick(() => {
            //                 let H = scr.scrollHeight - scr.offsetHeight;
            //                 //console.log(scr.scrollHeight,scr.offsetHeight,this.H,window.screen.height,'差')
            //                 scr.scrollTop = H;
            //                 window.scrollTo(scr.scrollHeight, scr.scrollHeight);
            //         });
            //     }, 300);
            // },
            initTime(time){
                //console.log(time)
                return moment(time).add(-8, "h").format("HH:mm")
            },
            goBack() {
                this.$router.back(-1)
            },
            initData(list) {
                list = list.map(item => {
                    item.dataTime = moment(item.sendTime).utc().format("YYYY/MM/DD");
                    return item;
                });
                //console.log("处理后", list);
                let aryDay = [];
                list.forEach(item => {
                    if (!aryDay.includes(item.dataTime)) {
                        aryDay.push(item.dataTime);
                    }
                });
                //console.log(aryDay, "所有存在的天数");
                let messageAry = []; //最后组成的数据
                aryDay.forEach(item => {
                    let obj = {};
                    obj.time = item;
                    obj.data = [];
                    list.forEach(ite => {
                        if (ite.dataTime == item) {
                            obj.data.push(ite);
                        }
                    });
                    messageAry.push(obj);
                });
                //console.log(messageAry, "最后的数据");
                return messageAry;
            },
            initHTML(html){
                // html='<p>您已成功报名课程《<span style="color:#b49876">［课程名称］</span>》，订单号：<span style="color:#b49876">［订单号］</span>，学费：<span style="color:#b49876">［订单金额］</span>。欢迎您成为暄桐大家庭的一员，请点击前往课程页查看上课之前您需要了解的事情，让我们一起享受这段学习时光吧～<span style="color:#b49876"><a href="http://cr.uat.xuantong.cn/!@=http://cr.uat.xuantong.cn/wx/index/course" target="_blank" style="color:#b49876">点击前往</a></span> </p>'
                html=html.replace(/href=["']([^"']*)["']/g,($,$1)=>{
                    return `href="${$1.split('!@=')[1]}"`
                })
                //console.log(html,'htmlhtmlhtmlhtmlhtmlhtmlhtmlhtmlhtmlhtml')
                    return html
             }
        }
    }
</script>
<style lang="scss">

.app-java-mext{
    // display: inline !important;
     *{
         line-height:1.5rem;
         font-size:.875rem;
         display: inline !important;
         p{
             display: inline !important;
         }
     }
}
</style>

<style lang="scss" scoped>
.appBox{
    height: 100%;
    overflow: hidden;
}
.mobile_content{
    height: 100%!important;
    overflow: hidden;
}
.app-meessTell-lv{
        position:fixed !important;
        top:.6rem; 
        margin-top: .6rem;
    }
    .boxElii {
        position: relative;
    }
    .boxEliiShow{
        position: absolute;
        bottom: 0;
        right: 0;
        color: #07767A;
        width:3rem;    
        background: #fff;
        text-align: right;
    }
    .boxEliiShowTop{
        bottom: -1.5rem!important;
    }
</style>

