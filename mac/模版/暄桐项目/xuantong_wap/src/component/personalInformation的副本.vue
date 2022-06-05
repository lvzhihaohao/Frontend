<template>
    <div class='content'>
        <div class="userHead text-center" v-if='types=="wode"'>
            <div class="userImg m-auto">
                <img :src="userInfo.headUri" style="object-fit: cover;" alt="">
            </div>
            <a href="javascript:void(0);" class="fz15 c30">点击修改头像</a>
            <input type="file" class="fileHomeWorkBtn" @change='updateImg' ref='ipt'>
        </div>
        <div class="mobile_content mt-40 mb-65">
            <article class="pl-15 pr-15">
                <ul class="Personal_Center">
                    <li @click='prompt'>
                        <mt-cell title="昵称" is-link :style="{borderBottom:'1px solid #eee'}">
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
                    <li @click='Enumerated()'>
                        <mt-cell title="所在地" is-link>
                            <span>{{obj.address || (userInfo.location !='null' && userInfo.location)}}</span>
                        </mt-cell>
                    </li>      
                </ul>
            </article>
        </div>
        
        <mt-popup
            v-model="popupVisible1"
            position="bottom"
            >
            <mt-picker
                :slots="slots" 
                ref="pickers"
                @change="onValuesChange"
                :showToolbar='true'
        >    
                <mt-button @click="handleConfirm" class="sure">取消</mt-button>
                <mt-button @click="handleConfirm" class="sure">确认</mt-button>
            </mt-picker>
        </mt-popup>
        <mt-popup
            v-model="popupVisible2"
            position="bottom">
            <mt-datetime-picker
                ref="picker"
                type="date"
                v-model="pickerValue"
                @confirm="timeHandleConfirm"
                @cancel="timeHandleCancel"
                :startDate="startDate"
                >
            </mt-datetime-picker>
        </mt-popup>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState,mapActions} from 'vuex'
import {userclasshourTime,getUserInfoCookie,sumitImageFile,formData} from '../public/index'
export default {
    name:'componentpersonalInformation',
    data () {
        return {
            popupVisible1:false,//控制选择器
            popupVisible2:false,//控制时间选择器
            pickerValue:'',//时间
            startDate: new Date('1900-1-1'),
            slots: [],//设置插值solt
            obj:{},//存储值
            id:0,//用于存储id 来区分页面显示·
            userInfo:{},//个人信息
            res:'', //存储上传的图片的信息
            sex:''
        }
    },
    props:{
        types:{
            type:null
        }
    },
    computed : {
        ...mapState({
            tradesList:state=>state.personalInformationStore.tradesList,//所属行业列表
            professionList:state=>state.personalInformationStore.professionList,//职业列表
            educationList:state=>state.personalInformationStore.educationList,//学历列表
            countryList:state=>state.personalInformationStore.countryList,//查循国家列表
            provinceList:state=>state.personalInformationStore.provinceList,//查询省份列表
            cityList:state=>state.personalInformationStore.cityList,//查询城市列表
            changeHeaderUrlData:state=>state.personalInformationStore.changeHeaderUrlData,//更换头像数据
            changeUserInfoData:state=>state.personalInformationStore.changeUserInfoData // 更改个人信息数据
        })
    },
    watch:{
        popupVisible1 :function (val) {
            if(val){
                this.open()
            }else{
                this.close()
                this.obj.sex = this.$refs.pickers.getValues()[0]
                this.sex = this.$refs.pickers.getValues()[0]
            }
        },
        popupVisible2 :function (val) {
            if(val){
                this.open()
            }else{
                this.close()
            }
        },
        async res (newValue,oldValue){
            if(newValue){
                this.getChangeHeaderUrlAction({
                    token:'',
                    headThumbnailUri:newValue,
                    headUri:newValue
                })
                await this.getUserInfoAction({token:''})
                this.userInfo ={...JSON.parse(getUserInfoCookie())}
                if(this.userInfo.location=='null'){
                    this.userInfo.location = null
                }
            }
        }
    },
    
    methods:{
        ...mapActions({
            //查询所属行业
            getTradesAction:'personalInformationStore/getTradesAction',
            //查询职业
            getProfessionAction:'personalInformationStore/getProfessionAction',
            //查询学历
            getEducationAction:'personalInformationStore/getEducationAction',
            //默认值 查循国家 省份 城市
            getSearchCountryAction:'personalInformationStore/getSearchCountryAction',
            //查询城市
            getSearchCityAction:'personalInformationStore/getSearchCityAction',
            //更换头像方法
            getChangeHeaderUrlAction:'personalInformationStore/getChangeHeaderUrlAction',
            //获取个人信息的方法
            getUserInfoAction : 'phoneStore/getUserInfoAction',
            //更改个人信息
            getChangeUserInfoAction :'personalInformationStore/getChangeUserInfoAction'
        }),
        // 点击返回更改个人信息
        async goBack () {
           
            if(this.obj.industry){
                this.obj.industryId= this.tradesList.filter(item =>item.enum_item_name == 
                    this.obj.industry)[0].id 
            }
            if(this.obj.profession){
               this.obj.professionId = this.professionList.filter(item=>item.enum_item_name== 
                    this.obj.profession)[0].id 
            }
            if(this.obj.education){
                this.obj.educationId = this.educationList.filter(item=>item.enum_item_name==
                    this.obj.education)[0].id
            }

            if(this.obj.countryId == 1){
                this.obj.provinceId = this.provinceList.filter(item=>item.provincial==
                    this.obj.province)[0]
                this.obj.cityId = this.cityList.filter(item=>item.city ==
                    this.obj.city)[0]
            }else{
                this.obj.countryId = this.countryList.filter(item=>item.enum_item_name ==
                    this.obj.country)[0].id
                this.obj.provinceId = ''
                this.obj.cityId = ''
            }
            if(this.obj.sex == '男'){
                this.obj.sexy  = '0'
            }else{
                this.obj.sexy = '1'
            }
            //console.log(this.obj)
            this.obj = {
                token:'',
                birthday:this.obj.time || this.userInfo.birthday,//生日
                career:this.obj.profession || this.userInfo.career,//职业,
                careerId:this.obj.professionId || this.userInfo.careerId,//职业id
                cityId:(this.obj.cityId.id || this.userInfo.cityId) + '',//城市id
                countryId:(this.obj.countryId || this.userInfo.countryId) + '',//国家id
                education:this.obj.education || this.userInfo.education,//学历
                educationId:this.obj.educationId || this.userInfo.educationId,//学历id
                headThumbnailUri:this.userInfo.headThumbnailUri,//头像缩略图
                headUri:this.userInfo.headUri,//头像图
                industry:this.obj.industry || this.userInfo.industry,//行业
                industryId:this.obj.industryId || this.userInfo.industryId,//行业id
                nickName:this.obj.nickName || this.userInfo.nickName,//昵称
                provinceId:(this.obj.provinceId.id || this.userInfo.provinceId) + '',//省份id
                sex:this.obj.sexy
            }
             //console.log(this.obj)
            await this.getChangeUserInfoAction(this.obj)
            
            if(this.changeUserInfoData.result){
                 await this.getUserInfoAction({token:''})
                
                if(this.$route.query.type==1){
                   this.$Toast('更改成功')
                   this.$router.back(-1)
                }else{
                    this.isneed()
                }
               
            }else{
                this.$Toast(this.changeUserInfoData.msg)
            }
        },
        //点击更改昵称
        prompt () {
            this.$MessageBox.prompt('更改昵称',{
                type:'prompt',
                inputPlaceholder:this.userInfo.nickName,
                showCancelButton:true,
                showInput:true,
                inputValidator: (val) => {
                    if (val === null) {
                        return true;
                    }
                    return !(val.length < 2 || val.length >32)
                }, 
                inputErrorMessage: '密码长度必须在2~32位'
            }).then(({value})=>{
               this.obj.nickName = value
               this.$forceUpdate()
            },() => {

            }
            )},
        open () {
            document.getElementsByTagName('body')[0].style='width:100%',
            document.getElementsByTagName('body')[0].style='height:100%',
            document.getElementsByTagName('body')[0].style='overflow:hidden'
        },
        close () {
            document.getElementsByTagName('body')[0].style='width:100%',
            document.getElementsByTagName('body')[0].style='height:100%'
        },
        // 枚举列表选择
        async Enumerated (id) {
            this.popupVisible1= true;
            this.id=id;
            if(id==0){
                this.slots=[{
                        flex: 1,
                        values: ['男', '女'],
                        className: 'slot1',
                        textAlign: 'center'
                }]
            }else if(id==15){
                this.slots=[{flex: 1,
                    values: this.tradesList.map(item=>item.enum_item_name),
                    className: 'slot1',
                    textAlign: 'center'
                }]
            }else if(id=='16'){
                this.slots=[{flex: 1,
                    values: this.professionList.map(item=>item.enum_item_name),
                    className: 'slot1',
                    textAlign: 'center'
                }]
            }else if(id=='17'){
                 this.slots=[{flex: 1,
                    values: this.educationList.map(item=>item.enum_item_name),
                    className: 'slot1',
                    textAlign: 'center'
                }]
            }else{   
                //console.log(this.obj,"地址")
                //console.log(this.userInfo.countryId,"地址")//国家id 1:中国  其余 国外

                //所在地
               if(this.userInfo.countryId == '1'){
                   this.slots=[{flex: 1,
                        values: ['国内','国外'],
                        className: 'slot1',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values:this.provinceList.map(item=>item.provincial),
                        className: 'slot3',
                        textAlign: 'left'
                    },{
                        divider: true,
                        content: '',
                        className: 'slot4'
                    }, {
                        flex: 1,
                        values: this.cityList.map(item=>item.city),
                        className: 'slot5',
                        textAlign: 'left'
                    }]
               }else{
                    this.slots=[{flex: 1,
                        values: ['国内','国外'],
                        className: 'slot1',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values:this.countryList.map(item=>item.country_name),
                        className: 'slot3',
                        textAlign: 'left'
                    },{
                        divider: true,
                        content: '',
                        className: 'slot4'
                    }, {
                        flex: 1,
                        values:[],
                        className: 'slot5',
                        textAlign: 'left'
                    }]
               }
                 
            }
            
        },
        // 枚举列表确定
        handleConfirm () {
            this.popupVisible1= false;
            if(this.id==0){
                this.obj.sex=this.$refs.pickers.getValues()[0];
                this.sex = this.$refs.pickers.getValues()[0];
            }else if (this.id==15) {
                this.obj.industry=this.$refs.pickers.getValues()[0];
            }else if(this.id == 16) {
                this.obj.profession = this.$refs.pickers.getValues()[0];
            }else if(this.id == 17) {
                this.obj.education = this.$refs.pickers.getValues()[0];
            }else{
               if(this.$refs.pickers.getValues()[0] == '国内'){
                   this.obj.countryId = 1
                   this.obj.country = '中国'
                   this.obj.province = this.$refs.pickers.getValues()[1]
                   this.obj.city = this.$refs.pickers.getValues()[2]
                   this.obj.address =  this.obj.country+this.obj.province+this.obj.city
               }else{
                   this.obj.country= this.$refs.pickers.getValues()[1]
                   this.obj.province = ''
                   this.obj.city = ''
                   this.obj.address= this.obj.country
               }
            }
            
        },
        //时间选择
        date () {
            if(this.obj.time){
                this.pickerValue = this.obj.time
            }else{
                this.pickerValue = new Date('1990.01.01')
            }
             this.popupVisible2 = true;
             this.$refs.picker.open();
             
        },
        //时间确定事件
        timeHandleConfirm () {
            this.popupVisible2 = false;
            this.obj={
                ...this.obj,
                // time:(userclasshourTime(this.pickerValue,'tree'))
                time:(formData(this.pickerValue,'uat'))
            }
        },
        //时间取消事件 
        timeHandleCancel () {
            this.popupVisible2 = false;
        },
        //所在地选择
        async onValuesChange(picker, values) {
            //console.log(picker)
            //console.log(values)
            //console.log(this.provinceList)
            if(values[0] == '国内'){
                let cityArr = this.provinceList.filter(item=>item.provincial==values[1])
                if(cityArr.length >= 1){
                    await this.getSearchCityAction({id:cityArr[0].id});
                    picker.setSlotValues(1,this.provinceList.map(item=>item.provincial))
                    picker.setSlotValues(2,this.cityList.map(item=>item.city))
                }else{
                    picker.setSlotValues(1,this.provinceList.map(item=>item.provincial))
                    picker.setSlotValues(2,this.cityList.map(item=>item.city))
                }
            }else{//国外
                picker.setSlotValues(1,this.countryList.map(item=>item.country_name))
                picker.setSlotValues(2,[])
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
            reader.onload = async () => {
                const datas = sumitImageFile(reader.result);
                let res = await axios.post("/utility/uploadPicture",
                    datas,
                    config
                );
                this.$refs.ipt.value='';
                this.res = res.data.result.filePath     
            };
            
        },
        isneed(){
            this.$axios
                            .post("/user/needcompleteuserinfo", { type: 1, token: "" })
                            .then(res => {
                            if (res.data.result) {
                                this.$Toast('还没有填完哦~')
                                 return false
                            } else {
                                // this.$router.push({
                                //         path:'/allCourseDetail',
                                //         query:{id:this.$route.query.couseid}
                                // })
                                // //console.log(this.$route.query.couseid,'type')
                                // if(this.$route.query.type){

                                // }
                                 this.$Toast('更改成功')
                                 this.$router.back(-1)
                            }
                        });
        }
    },
    mounted () {
        this.getSearchCountryAction()
        this.getTradesAction({enumKey:15}) 
        this.getProfessionAction({enumKey:16})
        this.getEducationAction({enumKey:17})
        this.userInfo = JSON.parse(getUserInfoCookie())
        if(this.userInfo.location=='null'){
            this.userInfo.location = null
        }
        document.getElementsByClassName('mint-cell-allow-right')[0].style='display:none';
    }
}
</script>
<style lang="scss" scoped>
    .userHead{
        margin-top:3.56rem;
    }
    .userImg{
        width: 5.625rem;
        height: 5.625rem;
        background: #e8e8e8;
        -webkit-box-shadow: 0px 0px 8px 0px rgba(231, 231, 231, 0.72);
        box-shadow: 0px 0px 8px 0px rgba(231, 231, 231, 0.72);
        border-radius: 50%;
        margin-bottom: .4375rem;
        margin-top: 2.5rem;
        img{
            width:100%;
            height:100%;
            border-radius: 50%;
        }
    }
    .mint-popup.mint-popup-bottom{
        width:100%;
        height:25rem;
    }
    .sure{
        width:49%;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #26a2ff;
    }
    .userHead.text-center{
        position:relative;
    }
    .fileHomeWorkBtn{
        width:2rem !important;
        height:2rem !important;
        position:absolute;
        bottom:-1rem;
        left:40%;
        opacity: 0;
    }
</style>


