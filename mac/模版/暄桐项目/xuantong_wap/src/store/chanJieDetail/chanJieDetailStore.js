import {chanJieDetailApi,chanJieDetailUserCourseIntroduceApi,
    chanJieDetailUserclasshourApi,chanJieDetailHomeWorkSunApi,
    chanJieDetailCourseCommentApi,chanJieDetailHomeWorkSunTieZiGiveLikeApi,
    chanJieDetailHomeWorkSunRemoveTieZiApi} from '../../api/chanJieDetail'
import {userclasshourTime,formData} from '../../public/index'
import {computingTime} from '../../public/utils'  
import moment from "moment";
let state={ 
    chanJieDetailData:{},
    chanJieDetailUserCourseIntroduceImg:[],
    chanJieDetailUserclasshourList:[],
    chanJieDetailHomeWorkSunList:[],
    chanJieDetailCourseCommentList:[],
    chanJieDetailHomeWorkSunTieZiGiveLikeData:{},
    chanJieDetailHomeWorkSunRemoveTieZiData:{},
    DownIndex:10,
    buytype:false,
    LastTime:null ,//学习有效期
    LastTimeFlag:null,
    Timer:null ,//定时器
    SunIndex:1,
    tiemrs:null,
    curTime:new Date(),
}
let mutations={
    changeCurTime(state, time) {
      clearInterval(state.tiemrs)
      state.curTime = time || new Date()
      state.tiemrs = setInterval(()=>{
        state.curTime = moment(state.curTime).add(1,'s').format("YYYY-MM-DD HH:mm:ss")
      },1000)
    },
    getChanJieDetailMutations (state, payload) {
        state.chanJieDetailData=payload;
        // state.chanJieDetailData.purchased = true
    },
    getChanJieDetailUserCourseIntroduceMutations (state,payload) {
        state.chanJieDetailUserCourseIntroduceImg = payload;
    },
    getChanJieDetailUserclasshourMutations (state,payload) {
        if(payload !=null){
            state.chanJieDetailUserclasshourList= payload;
            state.chanJieDetailUserclasshourList.userClassHourResponseVos.map(item=>{
                // //console.log(item.startTime)
                // item.startTime=formData(item.startTime,'uat')
                // //console.log(item.classhourCountDownTime,"--------------")
                // item.startTime="12121212"
                // item.classhourCountDownTime = userclasshourTime(item.classhourCountDownTime,'tree')
            })
        }
    },
    getChanJieDetailHomeWorkSunMutations (state,payload) {
        state.SunIndex = 1
        let allNum = 0
        if(payload !=null){
            state.chanJieDetailHomeWorkSunList=payload;
            state.chanJieDetailHomeWorkSunList.courseDiscussionResponseVos.map(item=>{
                //截取p标签
                if(item.content){
                    // //console.log(item.content)
                    if(item.content.slice(0,3)=='<p>'){
                           item.content = item.content.slice(3,(item.content.length-4))
                    }
                    if(item.content.substring(item.content.length-4)=='<br>'){
                                item.content = item.content.slice(0,(item.content.length-4))
                    }
                            //截取最后的空格
                    if(item.content.substring(item.content.length-6)=='&nbsp;'){
                                item.content = item.content.slice(0,(item.content.length-6))
                     }
                }
                item.createTime=computingTime(item.createTime)
                //console.log(item.createTime,'item.createTimeitem.createTime')
                allNum += item.likeNum
            })
            state.chanJieDetailHomeWorkSunList.allNum = allNum
        }
    },
    getChanJieDetailCourseCommentMutations (state,payload) {
        if(payload !=null){
            state.chanJieDetailCourseCommentList=payload;
            state.chanJieDetailCourseCommentList.courseCommentResponseVos.map(item=>{
                item.isShow = false
                item.createTime=computingTime(item.createTime)
            })
        }
        
    },
    getChanJieDetailHomeWorkSunTieZiGiveLikeMutations (state, payload) {
        state.chanJieDetailHomeWorkSunTieZiGiveLikeData=payload;
    },
    getChanJieDetailHomeWorkSunRemoveTieZiMutations (state,payload) {
        state.chanJieDetailHomeWorkSunRemoveTieZiData = payload
    },
    ChangeDown(state,idx){ 
        if(idx!==1){
            state.DownIndex=10
            return
        }
        state.Timer = setInterval(() => {
            state.DownIndex--
            //console.log(state.DownIndex,'开启定时器')
            if (state.DownIndex < 1) {
                 clearInterval(state.Timer);
            }
          }, 1000);
    },
    ChangeInterval(state){
        // //console.log('关闭定时器')
        clearInterval(state.Timer);
    },
    Changebuytype(state,buytype){
        state.buytype = buytype
    },
    ChnageLastTime(state,payload){ 
        state.LastTime = payload
        // payload=payload.replace(/[\u4e00-\u9fa5]/g,"/")
        let a=moment().valueOf()
        let b=moment(payload).valueOf()
        //console.log(a-b,'苹果时间payloadpayload时间')
        if(a-b>=0){
        //过期
            state.LastTimeFlag=true
            // //console.log(state.LastTimeFlag,'过期')
        }else{
            // publishStatus
            state.LastTimeFlag=false   
            // //console.log(state.LastTimeFlag,'没过期')
        }

    },
    //晒作业page++
    ChangeSunIndex(state,payload){
        state.SunIndex++
    },
    ChangeChanJieDetailHomeWorkSunActionLive(state,payload){
      let SunActionList =JSON.parse(window.localStorage.getItem('SunActionList')) 
      state.chanJieDetailHomeWorkSunList.length?state.chanJieDetailHomeWorkSunList=state.chanJieDetailHomeWorkSunList:state.chanJieDetailHomeWorkSunList=SunActionList
      state.chanJieDetailHomeWorkSunList.courseDiscussionResponseVos.forEach((data,index)=>{
        if(data.courseDiscussionId==payload){
          data.likeNum++;
          data.isLiked=true
        }
      })
      state.chanJieDetailHomeWorkSunList=state.chanJieDetailHomeWorkSunList
      JSON.stringify(window.localStorage.setItem('SunActionList',state.chanJieDetailHomeWorkSunList)) 
  },
  ChangeDiscussionNum(state,payload){
    let SunActionList =JSON.parse(window.localStorage.getItem('SunActionList')) 
    state.chanJieDetailHomeWorkSunList.length?state.chanJieDetailHomeWorkSunList=state.chanJieDetailHomeWorkSunList:state.chanJieDetailHomeWorkSunList=SunActionList
    state.chanJieDetailHomeWorkSunList.courseDiscussionResponseVos.forEach((data,index)=>{
      if(data.courseDiscussionId==payload){
        data.discussionNum++;
      }
    })
    state.chanJieDetailHomeWorkSunList=state.chanJieDetailHomeWorkSunList
    window.localStorage.setItem('SunActionList',JSON.stringify(state.chanJieDetailHomeWorkSunList)) 
  },
  ChangeDeletiNum(state,payload){
    let SunActionList =JSON.parse(window.localStorage.getItem('SunActionList')) 
    state.chanJieDetailHomeWorkSunList.length?state.chanJieDetailHomeWorkSunList=state.chanJieDetailHomeWorkSunList:state.chanJieDetailHomeWorkSunList=SunActionList
    state.chanJieDetailHomeWorkSunList.courseDiscussionResponseVos.forEach((data,index)=>{
      if(data.courseDiscussionId==payload){
        data.discussionNum--;
      }
    })
    state.chanJieDetailHomeWorkSunList=state.chanJieDetailHomeWorkSunList
    window.localStorage.setItem('SunActionList',JSON.stringify(state.chanJieDetailHomeWorkSunList)) 
  },
}
let actions={
  async getChanJieDetailAction ({commit}, payload) {
    let data =await chanJieDetailApi(payload)
    commit('getChanJieDetailMutations',data)
  },
  async getChanJieDetailUserCourseIntroduceAction ({commit}, payload) {
    let data =await chanJieDetailUserCourseIntroduceApi(payload)
    commit('getChanJieDetailUserCourseIntroduceMutations',data)
  },
  async getChanJieDetailUserclasshourAction ({commit}, payload) {
    let data =await chanJieDetailUserclasshourApi(payload)
    commit('getChanJieDetailUserclasshourMutations',data)
  },
  async getChanJieDetailHomeWorkSunAction ({commit}, payload) {
    let data =await chanJieDetailHomeWorkSunApi(payload)
    commit('getChanJieDetailHomeWorkSunMutations',data)
  },
  async getChanJieDetailCourseCommentAction ({commit}, payload) {
    let data =await chanJieDetailCourseCommentApi(payload)
    commit('getChanJieDetailCourseCommentMutations',data)
  },
  async getChanJieDetailHomeWorkSunTieZiGiveLikeAction({commit}, payload) {
    let data =await chanJieDetailHomeWorkSunTieZiGiveLikeApi(payload)
    commit('getChanJieDetailHomeWorkSunTieZiGiveLikeMutations',data)
  },
  async getChanJieDetailHomeWorkSunRemoveTieZiAction({commit}, payload) {
    let data =await chanJieDetailHomeWorkSunRemoveTieZiApi(payload)
    commit('getChanJieDetailHomeWorkSunRemoveTieZiMutations',data)
  },
  getChangeDown({commit}, payload){
    commit('ChangeDown',payload)
  },
  getChangebuytype({commit}, payload){
    commit('Changebuytype',payload)
  },
  getChnageLastTime({commit}, payload){
    commit('ChnageLastTime',payload)
  },
  getChangeInterval({commit}, payload){
    commit('ChangeInterval',payload)
  },
  getChangeSunIndex({commit}, payload){
    commit('ChangeSunIndex',payload)
  },
  getActionLive({commit}, payload){
    commit('ChangeChanJieDetailHomeWorkSunActionLive',payload)
  },
  getDiscussionNum({commit}, payload){
    commit('ChangeDiscussionNum',payload)
  },
  getDeletiNum({commit}, payload){
    commit('ChangeDeletiNum',payload)
  },
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}