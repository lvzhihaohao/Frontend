import {phoneLoginApi,phoneGetCaptchaApi,phoneRegisterApi,phoneCaptchaLoginApi,
    phoneForgetPasswordApi,getUserInfoApi,phoneHaveApi,captchaHaveApi,
    phoneNeedCompleteRegistrationInfoApi,nickNameHaveApi,setRecord} from '../../api/login/phoneApi'
import {setCookie,setUserInfoCookie,userclasshourTime,formData,setUserInfoCookieSect} from '../../public/index'
import getBrowserInfo from 'get-browser-info';
let state={
    phoneHaveData:{},
    captchaHaveData:{},
    captchaData:{},
    phoneNeedCompleteRegistrationInfoData:{},
    nickNameHaveData:{},
    
}
let mutations={
    getPhoneLoginMutations (state, payload) {
        setCookie(payload)
    },
    getPhoneGetCaptchaMutations (state,payload) {
        state.captchaData =payload
    },  
    getPhoneRegisterMutations (state, payload) {
        setCookie(payload)
    },
    getPhoneCaptchaLoginMutations (state,payload) {
        setCookie(payload)
    },
    getPhoneForgetPasswordMutations (state,payload){
        setCookie(payload)
    },
    //储存个人信息
    getUserInfoMutations (state, payload) {
        if(payload.result!=null){ 
            // payload.result.birthday = userclasshourTime(payload.result.birthday,'tree')
            payload.result.birthday = formData(payload.result.birthday,'uat')
            
        }
        setUserInfoCookie(payload.result)
    },
    //储存个人信息
    getUserInfoMutationsect (state, payload) {
        if(payload.result!=null){ 
            // payload.result.birthday = userclasshourTime(payload.result.birthday,'tree')
            payload.result.birthday = formData(payload.result.birthday,'uat')
            
        }
        setUserInfoCookieSect(payload.result)
    },
    getPhoneHaveMutations (state, payload) {
        state.phoneHaveData = payload
    },
    getCaptchaHaveMutations (state, payload) {
        state.captchaHaveData =payload
    },
    getNickNameHaveMutations (state,payload) {
        state.nickNameHaveData =payload
    },
    getPhoneNeedCompleteRegistrationInfoMutations (state,payload) {
        state.phoneNeedCompleteRegistrationInfoData = payload
    }
}
let actions={
    async getPhoneLoginAction ({commit}, payload) {
        let data = await phoneLoginApi(payload)
        commit('getPhoneLoginMutations',data)
    },
    async getPhoneGetCaptchaAction ({commit}, payload) {
        let data = await phoneGetCaptchaApi(payload)
        commit('getPhoneGetCaptchaMutations',data)
    },
    async getPhoneRegisterAction ({commit}, payload) {
        let data =await phoneRegisterApi(payload)
        commit('getPhoneRegisterMutations',data)
    },
    async getPhoneCaptchaLoginAction ({commit}, payload) {
        let data =await phoneCaptchaLoginApi(payload)
        commit('getPhoneCaptchaLoginMutations',data)
    },
    async getPhoneForgetPasswordAction ({commit}, payload) {
        let data =await phoneForgetPasswordApi(payload)
        commit('getPhoneForgetPasswordMutations',data)
    },
    //改变个人信息
    async getUserInfoAction ({commit}, payload) {
        const clientInfo = getBrowserInfo()
        let obj = {}
        obj.operatingSystem=clientInfo.os + clientInfo.osVersion //手机操作系统
        obj.terminal=clientInfo.browser + clientInfo.browserVersion//操作终端
        obj.source= clientInfo.device//来源
        try {   
            obj.ip= returnCitySN["cip"]//ip地址
        } catch(err){
            console.log(err)
        }
        let data = await getUserInfoApi (payload)
        await setRecord (obj)
        commit ('getUserInfoMutations',data)
    },
    //设置里的修改个人信息
    async getUserInfoActionSect ({commit}, payload) {
        let data = await getUserInfoApi (payload)
        commit ('getUserInfoMutationsect',data)
    },
    async getPhoneHaveAction ({commit},payload) {
        let data = await phoneHaveApi (payload)
        commit ('getPhoneHaveMutations',data)
    },
    async getCaptchaHaveAction ({commit},payload) {
        let data = await captchaHaveApi (payload)
        commit ('getCaptchaHaveMutations',data)
    },
    async getNickNameHaveAction ({commit},payload) {
        let data = await nickNameHaveApi (payload)
        commit ('getNickNameHaveMutations',data)
    },
    async getPhoneNeedCompleteRegistrationInfoAction ({commit},payload){
        let data = await phoneNeedCompleteRegistrationInfoApi (payload)
        commit ('getPhoneNeedCompleteRegistrationInfoMutations',data)
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}