import {emailBoundSecurityApi,emailForgetPasswordApi} from '../../api/security_settings/emailApi'
let state={
    emailBoundSecurityData:{},
    emailForgetPasswordData:{}
}
let mutations={
    getEmailBoundSecurityMutations (state, payload) {
       state.emailBoundSecurityData = payload
    },
    getEmailForgetPasswordMutations (state,payload) {
        state.emailForgetPasswordData = payload
    }
}
let actions={
  async getEmailBoundSecurityAction ({commit}, payload) {
    let data =await emailBoundSecurityApi(payload)
    commit('getEmailBoundSecurityMutations',data)
  },
  async getEmailForgetPasswordAction ({commit}, payload) {
    let data =await emailForgetPasswordApi(payload)
    commit('getEmailForgetPasswordMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}