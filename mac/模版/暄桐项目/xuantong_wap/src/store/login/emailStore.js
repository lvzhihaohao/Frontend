import {emailLoginApi,emailGetCaptchaApi,emailRegisterApi,emailForgetPasswordApi,
    emailHaveApi,captchaHaveApi} from '../../api/login/emailApi'
import {setCookie} from '../../public/index'
let state={
    captchaData:{},
    emailHaveData:{},
    captchaHaveData:{}
}
let mutations={
    getEmailLoginMutations (state, payload) {
        setCookie(payload)
    },
    getEmailGetCaptchaMutations(state,payload) {
        state.captchaData = payload
    },
    getEmailRegisterMutations (state, payload) {
        setCookie(payload)
    },
    getEmailForgetPasswordMutations (state,payload) {
        setCookie(payload)
    },
    getEmailHaveMutations (state, payload) {
        state.emailHaveData = payload
    },
    getCaptchaHaveMutations (state, payload) {
        state.captchaHaveData =payload
    }
}
let actions={
    async getEmailLoginAction ({commit}, payload) {
        let data = await emailLoginApi(payload)
        commit('getEmailLoginMutations',data)
    },
    async getEmailGetCaptchaAction ({commit}, payload) {
        let data = await emailGetCaptchaApi(payload)
        commit('getEmailGetCaptchaMutations',data)
    },
    async getEmailRegisterAction ({commit}, payload) {
        //console.log(payload)
        let data =await emailRegisterApi(payload)
        commit('getEmailRegisterMutations',data)
    },
    async getEmailForgetPasswordAction ({commit}, payload) {
        //console.log(payload)
        let data =await emailForgetPasswordApi(payload)
        commit('getEmailForgetPasswordMutations',data)
    },
    async getEmailHaveAction ({commit},payload) {
        let data = await emailHaveApi (payload)
        commit ('getEmailHaveMutations',data)
    },
    async getCaptchaHaveAction ({commit},payload) {
        let data = await captchaHaveApi (payload)
        commit ('getCaptchaHaveMutations',data)
    }
  }
  export default {
      namespaced:true,
      state,
      mutations,
      actions
  }