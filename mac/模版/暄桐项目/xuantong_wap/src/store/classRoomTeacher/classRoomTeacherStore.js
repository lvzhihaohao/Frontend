import {classRoomTeacherXuantongApi,classRoomTeacherLinxiApi} from '../../api/classRoomTeacherMore'
let state={
    classRoomTeacherXuantongList:[],
    classRoomTeacherLinxiList:[],
}
let mutations={
    getClassRoomTeacherXuantongMutations (state, payload) {
        state.classRoomTeacherXuantongList=payload.artivityResponseVos
    },
    getClassRoomTeacherLinxiMutations (state, payload) {
        state.classRoomTeacherLinxiList=payload.artivityResponseVos
    }
}
let actions={
  async getClassRoomTeacherXuantongAction ({commit}, payload) {
    let data =await classRoomTeacherXuantongApi(payload)
    commit('getClassRoomTeacherXuantongMutations',data)
  },
  async getClassRoomTeacherLinxiAction ({commit}, payload) {
    let data =await classRoomTeacherLinxiApi(payload)
    commit('getClassRoomTeacherLinxiMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}