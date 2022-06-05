import {thingWriteApi} from '../../api/thingWriteMore'
let state={
    thingWriteList:[],
}
let mutations={
    getThingWriteMutations (state, payload) {
        state.thingWriteList=payload.artivityResponseVos
    }
}
let actions={
  async getThingWriteAction ({commit}, payload) {
    let data =await thingWriteApi(payload)
    commit('getThingWriteMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}