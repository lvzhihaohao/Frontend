import {typeWorkDetailApi} from '../../api/typeWorkDetail'
let state={
  typeWorkDetailData:{}
}
let mutations={
    getTypeWorkDetailMutations (state, payload) {
       state.typeWorkDetailData = payload;
       //console.log(state.typeWorkDetailData)
    }
}
let actions={
  async getTypeWorkDetailAction ({commit}, payload) {
    let data =await typeWorkDetailApi(payload)
    commit('getTypeWorkDetailMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}