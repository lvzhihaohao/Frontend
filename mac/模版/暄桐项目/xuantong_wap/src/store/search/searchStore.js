import {searchArticleApi,searchCourseApi,searchShopApi,searchVideoApi} from '../../api/searchApi.js'
import {userclasshourTime,formData} from '../../public/index'
let state={
    articleList:[],
    courseList:[],
    shopList:[],
    videoList:[],
    Index:1
}
let mutations={
    getArticleListMutations (state, payload) {
        state.articleList=payload.result.searchArticleResponseVos
        state.articleList.map(item=>{
            // item.publishTime = userclasshourTime(item.publishTime,'tree')
            item.publishTime = formData(item.publishTime,'uat')
        })
    },
    getCourseListMutations (state, payload) {
        state.courseList=payload.result.courseFullResponseVos
        //console.log(state.courseList)
    },
    getShopListMutations (state, payload) {
        state.shopList=payload.result.searchCommodityResponseVos
    },
    getVideoListMutations(state,payload){
      state.videoList=payload.result.courseFreeResponseVos
    },
    chanIndex(state,payload){
        state.Index++
    },
    zeroIndex(state,payload){
        state.Index=1
    }
}
let actions={
  async getCourseListAction ({commit}, payload) {
    let data =await searchCourseApi(payload)
    commit('getCourseListMutations',data)
  },
  async getShopListAction ({commit}, payload) {
    let data =await searchShopApi(payload)
    commit('getShopListMutations',data)
  },
  async getArticleListAction ({commit}, payload) {
    let data =await searchArticleApi(payload)
    commit('getArticleListMutations',data)
  },
  async getVideoListAction ({commit}, payload) {
    let data =await searchVideoApi(payload)
    commit('getVideoListMutations',data)
  },
  changegetIndex({commit}, payload){
    commit('chanIndex',payload)
  },
  changeZeroIndex({commit}, payload){
    commit('zeroIndex',payload)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}