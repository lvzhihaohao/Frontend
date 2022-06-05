import {chanJieDetailBaskHomeWorkApi} from '../../api/chanJieDetailBaskHomeWork'
let state={
  chanJieDetailBaskHomeWorkData:{}
}
let mutations={
    getChanJieDetailBaskHomeWorkMutations (state, payload) {
        state.chanJieDetailBaskHomeWorkData =payload
    }
}
let actions={
  async getChanJieDetailBaskHomeWorkAction ({commit}, payload) {
    let data =await chanJieDetailBaskHomeWorkApi(payload)
    commit('getChanJieDetailBaskHomeWorkMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}