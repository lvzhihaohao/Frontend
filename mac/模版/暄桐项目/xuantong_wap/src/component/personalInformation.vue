<template>
    <div class='content'>
        <div v-show="modalFlag" class="modal"></div>
        <div class="userHead text-center" v-if='types=="wode"'>
            <div class="userImg m-auto" @click='updateImg'>
                <img v-lazy="userInfo.headUri" style="object-fit: cover;" alt="">
            </div>
            <a href="javascript:void(0);" class="fz15 c30">点击修改头像</a>
            <input type="file" class="fileHomeWorkBtn" @change='updateImg' ref='ipt'>
        </div>
        <div class="mobile_content mt-40">
            <article class="pl-15 pr-15 clearBottom">
                <ul class="Personal_Center Personal_information" >
                    <li @click='prompt' :style="{borderBottom:'1px solid #eee'}" > 
                        <mt-cell title="昵称" is-link >
                            <span>{{obj.nickName || userInfo.nickName}}</span>
                        </mt-cell>
                    </li>
                    <li @click='Enumerated(0)'>
                        <mt-cell title="性别" is-link>
                            <span>{{sex || userInfo.sexy}}</span>
                        </mt-cell>
                    </li>
                    <li @click='date'>
                        <mt-cell title="出生日期" is-link>
                            <span>{{obj.time || userInfo.birthday}}</span>
                        </mt-cell>
                    </li>
                    <li @click='Enumerated(15)'>
                        <mt-cell title="所在行业" is-link>
                            <span>{{obj.industry || userInfo.industry}}</span>
                        </mt-cell>
                    </li>
                    <li @click='Enumerated(16)'>
                        <mt-cell title="职业" is-link>
                            <span>{{obj.profession || userInfo.career}}</span>
                        </mt-cell>
                    </li>
                    <li @click='Enumerated(17)'>
                        <mt-cell title="学历" is-link>
                            <span>{{obj.education || userInfo.education}}</span>
                        </mt-cell>
                    </li>
                    <li @click='Enumerated()' class="app-lv-cell">
                        <mt-cell title="所在地" is-link  >
                            <span>{{(obj.address || (userInfo.location !='null' && userInfo.location)?obj.address || (userInfo.location !='null' && userInfo.location):"")}}</span>
                        </mt-cell>
                    </li>
                </ul>
            </article>
        </div>
        <mt-popup v-model="popupVisible1" position="bottom">
            <mt-picker :slots="slots" ref="pickers" @change="onValuesChange" :showToolbar='true'>
                <mt-button @click="showConfirm" class="sure fz15"
                 style="border-right: 1px solid #DDD;border-radius:0px !important;height: 1.25rem !important;line-height: 1.25rem;">取消</mt-button>
                <mt-button @click="handleConfirm" class="sure fz15" 
                 style="font-weight: 600;height: 1.25rem !important;line-height: 1.25rem;">确认</mt-button>
            </mt-picker>
        </mt-popup>
        <mt-popup v-model="popupVisible2" position="bottom">
            <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" @confirm="timeHandleConfirm" @cancel="timeHandleCancel" :startDate="startDate">
            </mt-datetime-picker>
        </mt-popup>
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
        formData,
        getBLen
    } from '../public/index'
    import { VueCropper }  from 'vue-cropper' 
import { all } from 'q';
    export default {
        name: 'componentpersonalInformation',
        data() {
            return {
                popupVisible1: false, //控制选择器
                popupVisible2: false, //控制时间选择器
                pickerValue: '', //时间
                startDate: new Date('1900/1/1'),
                slots: [], //设置插值solt
                obj: {}, //存储值
                id: 0, //用于存储id 来区分页面显示·
                userInfo: {}, //个人信息
                res: '', //存储上传的图片的信息
                sex: '',
                countryIndex: "", //默认选中的国家索引,
                provinceIndex: "", //默认选中的省份索引,
                cityIndex: "", //默认选中的城市索引
                tradesListIndex: 0, //默认行业选中索引
                professionListIndex: 0, //默认职业选中索引
                educationListIndex: 0, //默认选中学历
                professionIds: null, //职业ID
                industryIds: null, //行业ID
                modalFlag: false, //遮罩开关
                educationListID: null, //学历ID
                countryName:null,//记录的选择时的国家
            }
        },
        props: {
            types: {
                type: null
            }
        },
        computed: {
            ...mapState({
                tradesList: state => state.personalInformationStore.tradesList, //所属行业列表
                professionList: state => state.personalInformationStore.professionList, //职业列表
                educationList: state => state.personalInformationStore.educationList, //学历列表
                countryList: state => state.personalInformationStore.countryList, //查循国家列表
                provinceList: state => state.personalInformationStore.provinceList, //查询省份列表
                cityList: state => state.personalInformationStore.cityList, //查询城市列表
                changeHeaderUrlData: state => state.personalInformationStore.changeHeaderUrlData, //更换头像数据
                changeUserInfoData: state => state.personalInformationStore.changeUserInfoData, // 更改个人信息数据
                nickNameHaveData:state => state.phoneStore.nickNameHaveData// 昵称校验存在否
            })
        },
        watch: {
            userInfo: function(newValue, oldValue) {
                //console.log(newValue, "新的")
                //console.log(oldValue, "旧的")
                this.userInfo = newValue;
            },
            popupVisible1: function(val) {
                if (val) {
                    this.open()
                } else {
                    this.close()
                    // this.obj.sex = this.$refs.pickers.getValues()[0]
                    // this.sex = this.$refs.pickers.getValues()[0]
                }
            },
            popupVisible2: function(val) {
                if (val) {
                    this.open()
                } else {
                    this.close()
                }
            },
            async res(newValue, oldValue) {
                if (newValue) {
                    this.getChangeHeaderUrlAction({
                        token: '',
                        headThumbnailUri: newValue,
                        headUri: newValue
                    })
                    await this.getUserInfoAction({
                        token: ''
                    })
                    this.userInfo = { ...JSON.parse(getUserInfoCookie())
                    }
                    if (this.userInfo.location == 'null') {
                        this.userInfo.location = null
                    }
                }
            }
        },
        methods: {
            ...mapActions({
                //查询所属行业
                getTradesAction: 'personalInformationStore/getTradesAction',
                //查询职业
                getProfessionAction: 'personalInformationStore/getProfessionAction',
                //查询学历
                getEducationAction: 'personalInformationStore/getEducationAction',
                //默认值 查循国家 省份 城市
                getSearchCountryAction: 'personalInformationStore/getSearchCountryAction',
                //查询城市
                getSearchCityAction: 'personalInformationStore/getSearchCityAction',
                //更换头像方法
                getChangeHeaderUrlAction: 'personalInformationStore/getChangeHeaderUrlAction',
                //获取个人信息的方法
                getUserInfoAction: 'phoneStore/getUserInfoActionSect',
                //更改个人信息
                getChangeUserInfoAction: 'personalInformationStore/getChangeUserInfoAction',
                // 昵称校验存在否
                getNickNameHaveAction:'phoneStore/getNickNameHaveAction',
            }),
            // 点击返回更改个人信息
            async goBack() {
                let allCourseSubmitOrderObjs = JSON.parse(window.localStorage.getItem("allCourseSubmitOrderIDs"))
                if(allCourseSubmitOrderObjs&&allCourseSubmitOrderObjs.isTurnFull==undefined){
                    allCourseSubmitOrderObjs.isTurnFull=undefined
                }
                if(this.$route.query.type==4){
                    this.$router.push({
                        path: "/chanjiedetailtasktreedetails",
                        query: this.$route.query.obj
                    });
                }else if(this.$route.query.type==3||this.$route.query.type==2){
                    this.$router.push({
                        path: "/allCourseSubmitOrder",
                        query: {...allCourseSubmitOrderObjs}
                    });
                }
                
            },
            //点击更改昵称
            prompt() {
                this.$MessageBox.prompt('修改昵称', {
                    type: 'prompt',
                    inputPlaceholder: this.obj.nickName || this.userInfo.nickName,
                    showCancelButton: true,
                    showInput: true,
                    inputValidator: (val) => {
                        if (val === null) {
                            return true;
                        }
                        return !(getBLen(val) < 2 || getBLen(val) > 32)
                    },
                    inputErrorMessage: '昵称长度必须在2~32位'
                }).then( async({value}) => {
                    window.scrollTo(0,0)
                    //console.log(this.userInfo.nickName,this.obj.nickName,value)
                    if(value === null){
                        return;
                    }
                    if(value==this.userInfo.nickName||this.obj.nickName==this.userInfo.nickName){
                        return; 
                    }
                    if(this.$route.params.filePath){
                        this.obj.headUri=this.$route.query.filePath
                    }
                    this.$forceUpdate()
                    await this.getNickNameHaveAction({nickname:value})
                    // nickNameHaveData
                    if(this.nickNameHaveData.result){
                        this.$Toast('用户名已存在') 
                        return
                    }else{
                        this.obj = {
                            ...this.obj,
                            nickName: value,
                            token: '',
                        }
                       await this.getChangeUserInfoAction(this.obj)
                        if (this.changeUserInfoData.result) {
                            this.getUserInfoAction({
                                token: ''
                            })
                            if (this.$route.query.type == 1) {
                                window.scrollTo(0,0)
                                this.$Toast('更改成功')                            
                                this.obj.nickName=value
                            } else {
                                
                                window.scrollTo(0,0)
                                this.$Toast('更改失败')
                                this.isneed()
                            }
                        } else {
                            
                            window.scrollTo(0,0)
                            this.$Toast(this.changeUserInfoData.msg)
                        }
                    }
                }, () => {
                    window.scrollTo(0,0)})
            },
            open() {
                document.getElementsByTagName('body')[0].style = 'width:100%',
                    document.getElementsByTagName('body')[0].style = 'height:100%',
                    document.getElementsByTagName('body')[0].style = 'overflow:hidden'
            },
            close() {
                document.getElementsByTagName('body')[0].style = 'width:100%',
                    document.getElementsByTagName('body')[0].style = 'height:100%'
            },
            // 枚举列表选择
            async Enumerated(id) {
                this.popupVisible1 = true;
                this.id = id;
                if (id == 0) {
                    this.slots = [{
                        flex: 1,
                        values: ['男', '女'],
                        className: 'slot1',
                        textAlign: 'center',
                        defaultIndex: this.userInfo.sex
                    }]
                } else if (id == 15) {
                    this.tradesListIndex = this.tradesList.findIndex(item => (this.userInfo.industryId==null?this.tradesList[0].id:this.userInfo.industryId) == item.id)
                    this.slots = [{
                        flex: 1,
                        values: this.tradesList.map(item => item.enum_item_name),
                        className: 'slot1',
                        textAlign: 'center',
                        defaultIndex: 0 || this.tradesListIndex
                    }]
                } else if (id == '16') {
                    this.professionListIndex = this.professionList.findIndex(item => this.userInfo.careerId == item.id)
                    if(this.professionListIndex){
                        this.professionListIndex=3
                    }
                    this.slots = [{
                        flex: 1,
                        values: this.professionList.map(item => item.enum_item_name),
                        className: 'slot1',
                        textAlign: 'center',
                        defaultIndex: 0 || this.professionListIndex
                    }]
                } else if (id == '17') {
                    this.educationListIndex = this.educationList.findIndex(item => this.userInfo.educationId == item.id)
                    this.slots = [{
                        flex: 1,
                        values: this.educationList.map(item => item.enum_item_name),
                        className: 'slot1',
                        textAlign: 'center',
                        defaultIndex: 0 || this.educationListIndex
                    }]
                } else {
                    //console.log(this.obj, "地址")
                    //console.log(this.userInfo, "地址") //国家id 1:中国  其余 国外
                    //所在地
                    //console.log(this.countryName,"countryName")
                    //console.log(this.countryIndex,"countryIndex")
                    if (this.userInfo.countryId == '1'||(this.userInfo.countryId==null)) { //国内
                        // this.countryIndex = (this.countryName&&this.countryName!="中国")||this.userInfo.countryId!=1?1:0
                        await this.getSearchCityAction({
                            id: this.userInfo.provinceId||1
                        });
                        this.provinceIndex = this.provinceList.findIndex(item => item.id == this.userInfo.provinceId)
                        
                        this.cityIndex = this.cityList.findIndex(item => item.id == this.userInfo.cityId)
                        this.slots = [{
                            flex: 1,
                            values: ['国内', '国外'],
                            className: 'slot1',
                            textAlign: 'center',
                            defaultIndex: 0
                        }, {
                            divider: true,
                            content: '',
                            className: 'slot2'
                        }, {
                            flex: 1,
                            values: this.provinceList.map(item => item.provincial),
                            className: 'slot3',
                            textAlign: 'left',
                            defaultIndex: this.provinceIndex==-1?0:this.provinceIndex,
                        }, {
                            divider: true,
                            content: '',
                            className: 'slot4'
                        }, {
                            flex: 1,
                            values: this.cityList.map(item => item.city),
                            className: 'slot5',
                            textAlign: 'left',
                            defaultIndex: this.cityIndex==-1?0:this.cityIndex,
                        }]
                    } else { //国外
                        await this.getSearchCityAction({
                            id: this.userInfo.provinceId||1
                        });
                        this.countryIndex = this.countryList.findIndex(item => item.country_id == this.userInfo.countryId)
                        this.slots = [{
                            flex: 1,
                            values: ['国内', '国外'],
                            className: 'slot1',
                            textAlign: 'center',
                            defaultIndex: (this.countryName&&this.countryName=="中国")||this.userInfo.countryId==1?0:1
                        }, {
                            divider: true,
                            content: '',
                            className: 'slot2'
                        }, {
                            flex: 1,
                            values: this.countryList.map(item => item.country_name),
                            className: 'slot3',
                            textAlign: 'left',
                            defaultIndex:this.countryIndex,
                        }, {
                            divider: true,
                            content: '',
                            className: 'slot4'
                        }, {
                            flex: 1,
                            values: [],
                            className: 'slot5',
                            textAlign: 'left'
                        }]
                    }
                }
            },
            // 枚举列表取消
            showConfirm() {
                this.popupVisible1 = false;
            },
            // 枚举列表确定
            async handleConfirm() {
                //console.log("点击我确定")
                this.popupVisible1 = false;
                //console.log(this.userInfo, "获取用户数据")
                this.obj = {
                    ...this.userInfo,
                    ...this.obj,
                    token: '',
                }
                if(this.$route.params.filePath){
                    this.obj.headUri=this.$route.query.filePath
                }
                if (this.id == 0) {
                    this.obj.sex = this.$refs.pickers.getValues()[0];
                    this.sex = this.$refs.pickers.getValues()[0];
                } else if (this.id == 15) {
                    this.industryIds = this.tradesList.filter((item) => {
                        if (item.enum_item_name == this.$refs.pickers.getValues()[0]) {
                            return item
                        }
                    })
                    this.obj.industryId = this.industryIds[0].id;
                    this.obj.industry = this.$refs.pickers.getValues()[0];
                } else if (this.id == 16) {
                    this.obj.career = this.$refs.pickers.getValues()[0];
                    this.obj.profession = this.$refs.pickers.getValues()[0];
                    this.professionIds = this.professionList.filter((item) => {
                        if (item.enum_item_name === this.$refs.pickers.getValues()[0]) {
                            return item
                        }
                    })
                    this.obj.careerId = this.professionIds[0].id;
                } else if (this.id == 17) {
                    this.educationListID = this.educationList.filter((item, index) => {
                        if (item.enum_item_name === this.$refs.pickers.getValues()[0]) {
                            return item.id
                        }
                    })
                    this.obj.education = this.$refs.pickers.getValues()[0];
                    this.obj.educationId = this.educationListID[0].id
                } else {
                    //所在地
                    //console.log(this.$refs.pickers.getValues(), "获取")
                    let provincialID = this.provinceList.filter((item) => {
                        if (item.provincial == this.$refs.pickers.getValues()[1]) {
                            return item
                        }
                    })
                    let countryListsID = this.countryList.filter((item) => {
                        if (item.country_name == this.$refs.pickers.getValues()[1]) {
                            return item
                        }
                    })
                    let citysID = this.cityList.filter((item) => {
                        if (item.city == this.$refs.pickers.getValues()[2]) {
                            return item
                        }
                    })
                    if (this.$refs.pickers.getValues()[0] == '国内') {
                        this.obj.countryId = 1
                        this.obj.country = '中国'
                        this.obj.province = this.$refs.pickers.getValues()[1]
                        this.obj.city = this.$refs.pickers.getValues()[2]
                        this.obj.address = this.obj.country + this.obj.province + this.obj.city
                        this.obj.provinceId = provincialID[0].id
                        this.obj.cityId = citysID[0].id
                        //console.log(this.obj,"this.obj")
                    } else {
                        this.obj.countryId = countryListsID[0].country_id
                        this.obj.country = this.$refs.pickers.getValues()[1]
                        this.obj.city = null
                        this.obj.cityId = null
                        this.obj.provinceId = null
                        this.obj.province = null
                        this.obj.address = this.obj.country
                    }
                }
                if (this.sex == '男' || this.obj.sex == '男') {
                    this.obj.sex = '0'
                } else {
                    this.obj.sex = '1'
                }
                //console.log(this.obj, "asdasdasd")
                await this.getChangeUserInfoAction(this.obj)
                //console.log(this.changeUserInfoData.msg,"this.changeUserInfoData.msg")
                if (this.changeUserInfoData.result) {
                    await this.getUserInfoAction({
                        token: ''
                    })
                    if (this.$route.query.type == 1) {
                        // this.$Toast('更改成功')
                    } else {
                        // this.$Toast('更改失败')
                        // this.isneed()
                    }
                } else {
                    this.$Toast(this.changeUserInfoData.msg)
                }
            },
            //时间选择
            date() {
                if (this.obj.time) {
                    this.pickerValue = this.obj.time
                } else {
                    if (this.userInfo.birthday) {
                        let userInfoTime = this.userInfo.birthday.split("-").join("/")
                        this.pickerValue = new Date(userInfoTime)
                    } else {
                        this.pickerValue = new Date("1990/01/01")
                    }
                }
                this.popupVisible2 = true;
                this.modalFlag = true;
                this.$refs.picker.open();
            },
            //时间确定事件
            async timeHandleConfirm() {
                this.popupVisible2 = false;
                this.modalFlag = false;
                this.obj = 
                this.obj = {
                    ...this.userInfo,
                    ...this.obj,
                    token: '',
                    time: (userclasshourTime(this.pickerValue, 'tree')),
                    birthday: (formData(this.pickerValue, 'uat'))
                }
                //console.log(this.obj,'this.obj')
                if(this.$route.params.filePath){
                    this.obj.headUri=this.$route.query.filePath
                }
                //console.log(this.obj.time)
                await this.getChangeUserInfoAction(this.obj)
                if (this.changeUserInfoData.result) {
                    await this.getUserInfoAction({
                        token: ''
                    })
                    if (this.$route.query.type == 1) {
                        // this.$Toast('更改成功')
                    } else {
                        // this.isneed()
                    }
                } else {
                    this.$Toast(this.changeUserInfoData.msg)
                }
            },
            //时间取消事件 
            timeHandleCancel() {
                this.modalFlag = false;
                this.popupVisible2 = false;
            },
            //所在地选择
            async onValuesChange(picker, values) {
                //console.log(picker, "onchange")
                //console.log(values[0],'values')
                this.countryName=values[0]
                if (values[0] == '国内') {
                    let cityArr = this.provinceList.filter(item => item.provincial == values[1])
                    //console.log(cityArr,"cityArrcityArrcityArr")
                    if (cityArr.length >= 1) {
                        await this.getSearchCityAction({
                            id: cityArr[0].id
                        });
                        picker.setSlotValues(1, this.provinceList.map(item => item.provincial))
                        picker.setSlotValues(2, this.cityList.map(item => item.city))
                    } else {
                        picker.setSlotValues(1, this.provinceList.map(item => item.provincial))
                        picker.setSlotValues(2, this.cityList.map(item => item.city))
                    }
                } else { //国外
                    picker.setSlotValues(1, this.countryList.map(item => item.country_name))
                    picker.setSlotValues(2, [])
                }
            },
            async updateImg(e) {
                let reader = new FileReader();
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };
                reader.readAsDataURL(e.target.files[0]);
                //console.log(reader)
                reader.onload = async() => {
                    const datas = sumitImageFile(reader.result);
                    //console.log(datas,"datas")
                    this.$router.push({
                        name:'cropImage',
                        params:{reader:reader.result}
                    })
                };
            },
            isneed() {
                this.$Toast('更改成功')
            }
        },
        async mounted() {
            await this.getSearchCountryAction()
            await this.getTradesAction({
                enumKey: 15
            })
            await this.getProfessionAction({
                enumKey: 16
            })
            await this.getEducationAction({
                enumKey: 17
            })
            
            this.$axios
            .post("/user/getuserinfo", {//更改getUserInfo
                token: ""
            })
            .then(res => {
                setUserInfoCookie(res.data.result)
                this.userInfo = res.data.result
                this.userInfo.birthday = formData(this.userInfo.birthday,'uat')
                //console.log(this.userInfo.headUri, "this.userInfo");
                //console.log(this.userInfo.headThumbnailUri, "this.userInfo");
            });
            if (this.userInfo.location == 'null') {
                this.userInfo.location = null
            }
            //console.log(this.userInfo.provinceId, "个人信息")
            await this.getSearchCityAction({
                id: this.userInfo.provinceId
            });
            document.getElementsByClassName('mint-cell-allow-right')[0].style = 'display:none';
            if(this.$route.params.filePath){
                this.obj.headUri=this.$route.query.filePath
            }
            this.obj.countryId = '1'
        },
        components: {
             VueCropper,
        },
    }
</script>
<style lang="scss">
    .mint-datetime{
        .picker-items{
            padding-left: 3rem !important;
            padding-right: 3rem !important;
            .picker-slot{
                // background: yellow;
                // margin-right: 3rem;
            }
        } 
    }
    .mint-popup{
        .picker-items{
            // padding-left: 3rem;
            // padding-right:3rem;
            .picker-slot{
                // background: yellow;
                // margin-right: 3rem;
            }
            //  background: red;
        }   
    }
</style>

<style lang="scss" scoped>
    .Personal_information li{
        margin-bottom: 0.3rem;
    }
    .Personal_information .mint-cell::after{
        display: none;
    }
    .app-lv-cell .mint-cell{
           
    }
    .clearBottom {
        margin-bottom: 3rem!important;
    }
    .mint-msgbox-message {
        color: #000;
    }
    .userHead {
        margin-top: 0;
    }
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
        z-index: 999;
    }
    .userImg {
        width: 5.625rem;
        height: 5.625rem;
        background: #e8e8e8;
        -webkit-box-shadow: 0px 0px 8px 0px rgba(231, 231, 231, 0.72);
        box-shadow: 0px 0px 8px 0px rgba(231, 231, 231, 0.72);
        border-radius: 50%;
        margin-bottom: .4375rem;
        margin-top: 2.5rem;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .mint-popup.mint-popup-bottom {
        width: 100%;
        height: 14.5rem;
        padding-top: 1.3rem;
    }
    .sure {
        width: 49%;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #26a2ff;
    }
    .userHead.text-center {
        position: relative;
    }
    .picker-slot-wrapper {
        background: red;
    }
    .fileHomeWorkBtn {
        width: 5rem !important;
        height: 5rem !important;
        padding: 1rem;
        position: absolute;
        bottom: -1rem;
        left: 33%;
        top: -0.0; // width:2rem !important;
        // height:2rem !important;
        // position:absolute;
        // bottom:-1rem;
        // left:40%;
        opacity: 0;
    }
</style>


