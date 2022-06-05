import {allCourseDetailApi,allCourseDetailUserCourseIntroduceApi,
    allCourseBuyHintApi,allCourseBuyAgreementApi} from '../../api/allCourseDetail'
import axios from 'axios'
let state={
    allCourseDetailData:{},
    allCourseDetailUserCourseIntroduceImg:'',
    allCourseBuyHintData:'',
    allCourseBuyAgreementData:{}
}
let mutations={
    async getAllCourseDetailMutations (state, payload) {
          state.allCourseDetailData=payload;
    },
    getAllCourseDetailUserCourseIntroduceMutations (state, payload) {
        state.allCourseDetailUserCourseIntroduceImg=payload;
    },
    getAllCourseBuyHintMutations (state, payload) {
        state.allCourseBuyHintData=payload;
    },
    getAllCourseBuyAgreementMutations (state, payload) {
        state.allCourseBuyAgreementData=payload;
    }
}
let actions={
  async getAllCourseDetailAction ({commit}, payload) {
    let data =await allCourseDetailApi(payload)
    commit('getAllCourseDetailMutations',data)
  },
  async getAllCourseDetailUserCourseIntroduceAction ({commit}, payload) {
    let data =await allCourseDetailUserCourseIntroduceApi(payload)
    commit('getAllCourseDetailUserCourseIntroduceMutations',data)
  },
  async getAllCourseBuyHintAction ({commit}, payload) {
    let data =await allCourseBuyHintApi(payload)
    commit('getAllCourseBuyHintMutations',data)
  },
  async getAllCourseBuyAgreementAction ({commit}, payload) {
    let data =await allCourseBuyAgreementApi(payload)
    commit('getAllCourseBuyAgreementMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}