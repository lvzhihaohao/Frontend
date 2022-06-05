import {indexBannerApi,indexCourseRecommendApi,indexCourseRecommendTwoApi,
    indexCommodityRecommendApi,indexCoursefreeRecommendApi,
    indexProductionRecommendApi,indexArticleRecommendApi,
    indexCoursefreeGiveLikeApi} from '../../api/indexApi.js'
let state={
    bannerList:[],
    courseRecommendList:{},
    courseRecommendTwoList:{},
    commodityRecommendList:null,
    coursefreeRecommendList:{},
    productionRecommendList:[],
    articleRecommendList:[],
    coursefreeGiveLikeData:{},
    vedioSrc:'',
    WXinfo:{}
}
import axios from 'axios';
let mutations={
    getIndexBannerMutations(state,payload) {
        state.bannerList = payload && payload.result;
    },
    getIndexCourseRecommendMutations(state,payload) {
        state.courseRecommendList = payload;
    },
    getIndexCourseRecommendTwoMutations(state,payload) {
        state.courseRecommendTwoList = payload;
    },
    getIndexCommodityRecommendMutations(state,payload) {
        state.commodityRecommendList = payload && payload.result.commodityResponseVos.slice(0,4);
    },
    async getIndexCoursefreeRecommendMutations(state,payload) {
        // axios.post('/utility/getUrl',{key:payload.courseFreeResponseVos[0].courseVideoUri}).then(res=>{
        //     state.vedioSrc = res.data.result
        //     //console.log( state.vedioSrc,'111111111')
        // })
        state.coursefreeRecommendList = payload.courseFreeResponseVos[0]
        //console.log(state.coursefreeRecommendList,'123')
    },
    getIndexProductionRecommendMutations(state,payload) {
        state.productionRecommendList = payload.productionResponseVos.slice(0,4);
    },
    getIndexArticleRecommendMutations(state,payload) {
        state.articleRecommendList = payload.artivityResponseVos;
    },
    getIndexCoursefreeGiveLikeMutations (state,payload) {
        state.coursefreeGiveLikeData = payload;
    },
    ChangeWXInfo(state,payload){
        state.WXinfo = payload;
    }
}
  
let actions={
    async getIndexBannerAction ({commit}, payload) {
        let data = await indexBannerApi();
        commit('getIndexBannerMutations',data)
    },
    async getIndexCourseRecommendAction ({commit}, payload) {
        let data = await indexCourseRecommendApi(payload);
        commit('getIndexCourseRecommendMutations',data)
    }, 
    //首页进阶课程展示
    async getIndexCourseRecommendTwoAction ({commit}, payload) {
        let data = await indexCourseRecommendTwoApi(payload);
        commit('getIndexCourseRecommendTwoMutations',data)
    }, 
    async getIndexCommodityRecommendAction ({commit}, payload) {
        let data = await indexCommodityRecommendApi();
        commit('getIndexCommodityRecommendMutations',data)
    }, 
    async getIndexCoursefreeRecommendAction ({commit}, payload) {
        let data = await indexCoursefreeRecommendApi(payload);
        commit('getIndexCoursefreeRecommendMutations',data)
    }, 
    async getIndexProductionRecommendAction ({commit}, payload) {
        let data = await indexProductionRecommendApi(payload);
        commit('getIndexProductionRecommendMutations',data)
    }, 
    async getIndexArticleRecommendAction ({commit}, payload) {
        let data = await indexArticleRecommendApi();
        commit('getIndexArticleRecommendMutations',data)
    },
    async getIndexCoursefreeGiveLikeAction ({commit}, payload) {
        let data = await indexCoursefreeGiveLikeApi(payload);
        commit('getIndexCoursefreeGiveLikeMutations',data)
    },
    getChangeWXInfo({commit}, payload){
        commit('ChangeWXInfo',payload)
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}