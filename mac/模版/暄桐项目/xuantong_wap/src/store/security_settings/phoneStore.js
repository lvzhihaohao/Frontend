import {phoneBoundSecurityApi,phoneForgetPasswordApi} from '../../api/security_settings/phoneApi'
let state={
    phoneBoundSecurityData:{},
    phoneForgetPasswordData:{}
}
let mutations={
    getPhoneBoundSecurityMutations (state, payload) {
        state.phoneBoundSecurityData = payload
    },
    getForgetPasswordMutations (state,payload) {
        state.phoneForgetPasswordData =payload
    }
}
let actions={
  async getPhoneBoundSecurityAction ({commit}, payload) {
    let data =await phoneBoundSecurityApi(payload)
    commit('getPhoneBoundSecurityMutations',data)
  },
  async getForgetPasswordAction ({commit}, payload) {
    let data =await phoneForgetPasswordApi(payload)
    commit('getForgetPasswordMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}