import {chanJieDetailWriteEvaluateApi} from '../../api/chanJieDetailWriteEvaluate'
let state={
    chanJieDetailWriteEvaluateData:{}
}
let mutations={
    getChanJieDetailWriteEvaluateMutations (state, payload) {
        state.chanJieDetailWriteEvaluateData = payload;
    }
}
let actions={
  async getChanJieDetailWriteEvaluateAction ({commit}, payload) {
    //console.log(payload,"payload")
    let data =await chanJieDetailWriteEvaluateApi(payload)
    commit('getChanJieDetailWriteEvaluateMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}