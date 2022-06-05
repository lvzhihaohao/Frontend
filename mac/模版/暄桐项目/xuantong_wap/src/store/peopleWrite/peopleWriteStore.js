import {peopleWriteApi} from '../../api/peopleWriteMore'
let state={
    peopleWriteList:[],
}
let mutations={
    getPeopleWriteMutations (state, payload) {
        state.peopleWriteList=payload.artivityResponseVos
    }
}
let actions={
  async getPeopleWriteAction ({commit}, payload) {
    let data =await peopleWriteApi(payload)
    commit('getPeopleWriteMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}