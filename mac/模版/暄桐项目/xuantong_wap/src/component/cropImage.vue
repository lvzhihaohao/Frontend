<template>
    <div class="jiequ_lei">
        <article class="nav-title" v-if="!this.$flag">
            <mt-header title="修改图片" fixed>
                <a href="javascript:void(0);" slot="left" @click="goBack">
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img style="position: fixed;" src="../../static/img/back.png" class="gu_nav_title_img_top" v-if="this.$flag" @click="goBack">
        <div class="cropperBox_lei">
            <vueCropper style="width:300px;height:300px;display:inline-block;background:white;border:1px solid #acacac" ref="cropper" :img="imgBase64" :outputSize="size" :outputType="outputType" :canScale="options.canScale" :autoCrop="options.autoCrop" :full="options.full"
                :canMove="options.canMove" :centerBox="options.centerBox" :mode="options.mode" :autoCropWidth="options.autoCropWidth" :autoCropHeight="options.autoCropHeight" :fixed="options.fixed" :fixedNumber="options.fixedNumber" :fixedBox="options.fixedBox" :canMoveBox="options.canMoveBox" @cropMoving="cropMoving" @realTime="realTime" width="100%"
                height="100%" ></vueCropper>
        </div>
        <div v-if="isClick" class="wanOk" @click="imageOk">完成</div>
        <div v-if="!isClick" class="wanOking">加载中...</div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {
        mapState,
        mapActions
    } from 'vuex'
    import {
        userclasshourTime,
        getUserInfoCookie,
        setUserInfoCookie,
        sumitImageFile,
        formData
    } from '../public/index'
    import {
        VueCropper
    } from "vue-cropper";
    export default {
        name: 'cropImage',
        data() {
            return {
                userInfo: null,
                imgBase64: "",
                size: 1, //裁剪生成图片的质量
                outputType: "jpg", //裁剪生成图片的格式
                options: {
                    canScale: false, //图片是否允许滚轮缩放
                    autoCrop: true, //是否默认生成截图框
                    full: true, //是否输出原图比例的截图
                    canMove: true, //上传图片是否可以移动
                    centerBox: true, //截图框是否被限制在图片里面
                    mode: "contain", //图片默认渲染方式
                    // autoCropWidth: 150, //初始化截图框的宽
                    // autoCropHeight: 150, //初始化截图框的高
                    fixed: true,
                    fixedBox:true,
                    infoTrue: false, //截图框信息
                    canMoveBox:false,
                    fixedNumber: [1, 1]
                },
                corpUrl: "", //所截图的url
                corpBlob: null,
                isMoving:null,
                isClick:true
            }
        },
        mounted() {
            this.imgBase64 = this.$route.params.reader
            //console.log(this.$route.params)
            this.$axios
            .post("/user/getuserinfo", {//修改getuserinfo
                token: ""
            })
            .then(async(res) => {
                setUserInfoCookie(res.data.result)
                this.userInfo = res.data.result
                this.userInfo.birthday = formData(this.userInfo.birthday,'uat')
                if (this.userInfo.location == 'null') {
                    this.userInfo.location = null
                }
                this.userInfo.token = ''
                if(this.userInfo.countryId!=1){
                    this.userInfo.city = null
                    this.userInfo.cityId = null
                    this.userInfo.provinceId = null
                    this.userInfo.province = null
                }
            });
            
        },
        computed: {
            ...mapState({
                changeHeaderUrlData: state => state.personalInformationStore.changeHeaderUrlData, //更换头像数据
                changeUserInfoData: state => state.personalInformationStore.changeUserInfoData, // 更改个人信息数据
            })
        },
        methods: {
            ...mapActions({
                //更换头像方法
                getChangeHeaderUrlAction: 'personalInformationStore/getChangeHeaderUrlAction',
                //获取个人信息的方法
                getUserInfoAction: 'phoneStore/getUserInfoAction',
                //更改个人信息
                getChangeUserInfoAction: 'personalInformationStore/getChangeUserInfoAction',
            }),
            realTime(even){
                window.addEventListener("mousemove",this.initSize,false)
                this.$refs.cropper.getCropBlob(data => {
                    //console.log(data)
                    this.corpBlob = data;
                });
                //获取base64
                this.$refs.cropper.getCropData(data => {
                    // //console.log(data)
                    this.corpUrl = data;
                });
            },
            initSize(even){
                if(!this.isMoving){
                    this.$refs.cropper.startMove(even);
                    this.$refs.cropper.leaveCrop();
                }
            },
            cropMoving(even) {
                window.removeEventListener("mousemove",this.initSize,false);
                this.isMoving = even.moving;
                // 获取blob
                this.$refs.cropper.getCropBlob(data => {
                    //console.log(data)
                    this.corpBlob = data;
                });
                //获取base64
                this.$refs.cropper.getCropData(data => {
                    // //console.log(data)
                    this.corpUrl = data;
                });
            },
            goBack() {
                this.$router.push({
                    path: '/personalinformation',
                    query:{type:1}
                })
            },
            async imageOk() {
                this.isClick=false;
                //获取blob流
                this.$refs.cropper.getCropBlob(blob => {
                    this.corpBlob = blob;
                });
                if (!this.corpBlob) {
                    this.$message({
                        duration: 5000,
                        message: this.$selfMsg.selectImg,
                        type: "success"
                    });
                    this.isClick=true;
                    return;
                }
                let formData = new FormData();
                formData.append("profile", this.corpBlob);
                formData.append("nickName", ""); //是否需要水印
                // formData.append("nickName", this.info.nickName);//
                //发送请求
                //console.log(formData, "formData");
                this.$axios.post("/utility/uploadPicture", formData).then(res => {
                    //console.log(res.data);
                    if (res.data.code == 0) {
                        //console.log(res);
                        this.corpUrl = res.data.result.filePath;
                        let thumbUrl = res.data.result.thumbUrl;
                        this.$axios
                            .post("/user/updateuserhead", {
                                headThumbnailUri:this.corpUrl,
                                headUri: this.corpUrl,
                                isLocalThumb:true,
                                token: ""
                            })
                            .then(async(ress) => {
                                if (ress.data.code == 0) {
                                    this.userInfo.headUri = res.data.result.filePath;
                                    this.userInfo.headThumbnailUri = res.data.result.filePath;
                                   await this.getChangeUserInfoAction(this.userInfo)
                                    if (this.changeUserInfoData.result) {
                                        this.getUserInfoAction({
                                            token: ''
                                        })
                                        // this.$Toast('更改成功')
                                        setTimeout(() => {
                                            this.isClick=true;
                                            this.$router.push({
                                                path: '/personalinformation',
                                                query: {
                                                    type: 1,
                                                    filePath: this.corpUrl
                                                }
                                            })
                                        })
                                    } else {
                                        // this.$Toast(this.changeUserInfoData.msg)
                                    }
                                }
                            });
                        this.selectAry({
                            attrName: "headThumbnailUri",
                            attrValue: thumbUrl
                        });
                        this.selectAry({
                            attrName: "headUri",
                            attrValue: this.corpUrl
                        });
                        this.closeCascader({
                            attrName: "avatorVisible",
                            attrValue: false
                        });
                    }
                });
            }
        },
        components: {
            VueCropper
        },
    }
</script>
<style lang="scss" scoped>
    .nav-title {
        height: 3rem;
    }
    .wanOk {
        width: 100%;
        height: 3rem;
        background: #C4A57F;
        text-align: center;
        line-height: 3rem;
        color: #fff;
        letter-spacing: 1rem;
    }
    .wanOking{
        width: 100%;
        height: 3rem;
        background: #C4A57F;
        text-align: center;
        line-height: 3rem;
        color: #fff;
    }
</style>


