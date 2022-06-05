<template>
    <div class="clear guide">
        <h3>
            <img style="width: 1.3125rem;height: 1.3125rem;"  src="../../../static/img/Strategyicon.png" alt="">
            <span class="fz15 c30 fzGB1-0" style="font-weight:400;">学习资料</span>
            <span v-if="data.length>0" class=" fz12 cb19 fzGB1-0" style="font-weight:400;">
                （请在{{
                 moment(LastTime).format("YYYY年MM月DD日") 
                }}前下载）
                </span>
        </h3>
        <ul v-if="data == 'undefined' || data.length > 0">
            <li v-for='(item,index) in data' :key='index'>
                <span class="dis_block fz14 c30" style="opacity: 0.8;">{{item.fileFullName}}</span>
                <span class="fz12 c9" >大小：{{InItKb(item.fileSizeText)}}</span>
                <a v-if="!android" class="fz12 c4a5" @click="gosgab(item)">预览文件</a>
                <!-- <a v-if="android" :href="item.fileUri" :download='item.fileFullName' class="fz12 c4a5">下载文件</a> -->
                <a v-if="android" class="fz12 c4a5" :download='item.fileFullName'  @click="downloadNum(item)">下载文件</a>
            </li>
        </ul>
        <div class='gu_clear_guide' v-else style="padding-bottom:2rem">
            <img src="../../../static/img/null-My_discussion.png"  alt="" >
            <p class=" mt-15 c9 fz12" >书童正在准备哦</p>
        </div>
    </div>
</template>
<script> 
import {mapState,mapActions} from 'vuex'
import moment from "moment";
export default {
    name:'tasktreeclassdatalist',
    props:{
        data:{
            type:null,
            require:true
        },
        flag:{
            type:null,
        }
    },
    data(){
        return{
            android:false,
            downloadlength:0,
        }
    },
    computed:{
        ...mapState({
            //单阶详情数据
            chanJieDetailData: state => state.chanJieDetailStore.chanJieDetailData,
            //任务树详情数据（课时大纲详情）
            LastTime:state=>state.chanJieDetailStore.LastTime,
        })
    },
    mounted () {
        //console.log(this.data,'闯关攻略',this.LastTime)
        var u = navigator.userAgent;
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
            this.android=true;
        }
       let courseDynamicElementTimes = window.localStorage.getItem('courseDynamicElementTime')
        this.initStundentTime(JSON.parse(courseDynamicElementTimes))
    },
    methods: {
        
        ...mapActions({
            //单阶详情数据（用于订单展示）
            getChanJieDetailAction: 'chanJieDetailStore/getChanJieDetailAction',
            //学习有效期
            getChnageLastTime: 'chanJieDetailStore/getChnageLastTime',
        }),
        moment,
        //处理学习有效期
        initStundentTime(obj) {
            if (obj.learnEndTime) {
                //直播  取learnEndTime
                let time = obj.learnEndTime;
                 time = moment(time).format("YYYY-MM-DD HH:mm:ss");
                // time = moment(time).format("YYYY年MM月DD日");
                //console.log(time,'我是直播学习有效期哦')
                this.getChnageLastTime(time);
            } else {
                //录播  取studyValidityPeriod 天数  从第二天开始算的
                let n = Number(obj.studyValidityPeriod) + 1;
                let time = moment()
                        .add("d", n)
                        .format("YYYY-MM-DD HH:mm:ss");
               //console.log(time,'我是录播学习有效期哦')
                // let time = moment()
                //     .add("d", n)
                //     .format("YYYY年MM月DD日");
                this.getChnageLastTime(time);
            }
        },
        //处理kb
        InItKb(kb){
            // return kb
            if(kb>1024){
                let num = Math.round(kb)  / 1024 
                if(num>1024){
                         let nums = Math.round(num)  / 1024 
                         return  nums.toFixed(2)  + 'MB'
                }else{
                      return  num.toFixed(2)  + 'kb'
                }
            }else{
                return Math.round(kb)   + 'KB'
            }

        },
        gosgab(item){
            if(this.downloadlength>100){
                return
            }
            let id = this.$route.query.classhourId
            this.$axios.post("/coursematerial/download", {
                fileId: item.materialId,
                courseHourId:id,
                token: ""
            }).then(res=>{
                this.downloadlength++
                window.location.href= item.fileUri
            })
        },
        Download(url, filename, kind, id){
                this.$axios
                .post("/coursematerial/download", {
                fileId: id,
                courseHourId: this.classhoursId,
                token: ""
                })
                .then(res => {
                      //console.log(res);
                });
                let fileAry = ["xls", "xlsx"];
                let imgAry = ["jpeg", "png", "jpg", "gif", "webp","JPG"];
                //console.log(kind,'我的')
                //console.log(imgAry.includes(kind),'我的kind')
                if (fileAry.includes(kind)) {
                    //文件下载
                    this.fileDownload(url, filename);
                } else {
                    //图片下载
                    if(this.$flag){
                        this.fileDownload(url, filename);
                    }else{
                        this.getBase64(url, filename);
                    }
                    // this.imgDownload(url, filename, kind);
                }
        },
        downloadNum(item){
            if(this.downloadlength>100){
                return
            }
            let id = this.$route.query.classhourId
            this.$axios.post("/coursematerial/download", {
                fileId: item.materialId,
                courseHourId:id,
                token: ""
            }).then(res=>{
                this.downloadlength++
                var eleLink = document.createElement("a");
                document.body.appendChild(eleLink);
                eleLink.download = item.fileFullName;
                eleLink.style.display = "none";
                eleLink.href = item.fileUri;
                eleLink.click();
                document.body.removeChild(eleLink);
            })
        },
        //文件下载
        fileDownload(url, filename) {
            // debugger
            // 创建隐藏的可下载链接
            var eleLink = document.createElement("a");
            document.body.appendChild(eleLink);
            eleLink.download = filename;
            eleLink.style.display = "none";
            eleLink.href = url;
            eleLink.click();
            document.body.removeChild(eleLink);
        },
        //获取base64
        getBase64(imgUrl, filename) {
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        xhr.open("get", imgUrl, true);
        xhr.responseType = "blob";
        xhr.onload = function() {
            if (this.status == 200) {
            let blobUrl = window.URL.createObjectURL(this.response);
            let link = document.createElement("a");
            document.body.appendChild(link);
            link.style.display = "none";
            link.href = blobUrl;
            // 设置a标签的下载属性，设置文件名及格式，后缀名最好让后端在数据格式中返回
            link.download = filename;
            // 自触发click事件
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            }
        };
        xhr.send();
    },
    }
}
</script>
<style lang='scss' scoped>
</style>