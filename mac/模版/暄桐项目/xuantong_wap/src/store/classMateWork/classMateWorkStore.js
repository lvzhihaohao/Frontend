import {classMateMoreApi,classMateGiveLikeApi} from '../../api/classmatework'
import axios from 'axios'
let state={
    classMateMoreList:[],
    classMateGiveLikeData:{}
}
let mutations={
    async getClassMateMoreMutations (state, payload) {
        state.classMateMoreList=[...payload.productionResponseVos];
    },
    getClassMateGiveLikeMutations (state, payload) {
       state.classMateGiveLikeData = payload;
    }
}
let actions={
  async getClassMateMoreAction ({commit}, payload) {
    let data =await classMateMoreApi(payload)
    commit('getClassMateMoreMutations',data)
  },
  async getClassMateGiveLikeAction ({commit}, payload) {
    let data =await classMateGiveLikeApi(payload)
    commit('getClassMateGiveLikeMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}