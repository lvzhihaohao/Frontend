import {indexGiveLessonsApi} from '../../api/indexGivelessons'
let state={
    indexGiveLessonsList:[],
}
let mutations={
    getIndexGiveLessonsMutations (state, payload) {
        state.indexGiveLessonsList = payload.courseFullResponseVos
    }
}
let actions={
  async getIndexGiveLessonsAction ({commit}, payload) {
    let data =await indexGiveLessonsApi(payload)
    commit('getIndexGiveLessonsMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}