import {personalInformationApi,searchCountryApi,searchProvinceApi,searchCityApi,
    changeHeaderUrlApi,changeUserInfoApi,updatenicknameApi} from '../../api/personalInformation'
let state={
    tradesList:[],
    professionList:[],
    educationList:[],
    countryList:[],
    provinceList:[],
    cityList:[],
    changeHeaderUrlData:{},
    changeUserInfoData:{},
    updatenicknameData:{}
}
let mutations={
    getTradesMutations (state, payload) {
        state.tradesList = payload;
    },
    getProfessionMutations (state, payload) {
        state.professionList=payload;
    },
    getEducationMutations (state, payload) {
        state.educationList=payload;
    },
    getSearchCountryMutations (state,payload) {
        state.countryList = payload[0].slice(1);
        state.provinceList=payload[1];
        state.cityList =payload[2];
    },
    getSearchCityMutations (state,payload) {
        state.cityList = payload;
    },
    getChangeHeaderUrlMutations (state,payload) {
        state.changeHeaderUrlData = payload
    },
    getChangeUserInfoMutations (state,payload) {
        state.changeUserInfoData = payload
    },
    // getUpdatenicknameations (state,payload) {
    //     state.updatenicknameData = payload
    // }
}
let actions={
    async getTradesAction ({commit}, payload) {
        let data =await personalInformationApi(payload)
        commit('getTradesMutations',data)
    },
    async getProfessionAction ({commit}, payload) {
        let data =await personalInformationApi(payload)
        commit('getProfessionMutations',data)
    },
    async getEducationAction ({commit}, payload) {
        let data =await personalInformationApi(payload)
        commit('getEducationMutations',data)
    },
    async getSearchCountryAction({commit}, payload) {
        let arr=[]
        let data1 = await searchCountryApi()
        let data2 = await searchProvinceApi({id:data1[0].country_id})
        let data3 = await searchCityApi({id:data2[0].id})
        arr.push(data1,data2,data3)
        commit('getSearchCountryMutations',arr)
    },
    async getSearchCityAction ({commit}, payload) {
        let data = await searchCityApi(payload);
        commit('getSearchCityMutations',data)
    },
    async getChangeHeaderUrlAction({commit}, payload) {
        let data = await changeHeaderUrlApi(payload);
        commit('getChangeHeaderUrlMutations',data)
    },
    async getChangeUserInfoAction({commit}, payload) {
        //console.log(payload,"请求参数")
        let data = await changeUserInfoApi(payload);
        //console.log(data,"请求结果")
        commit('getChangeUserInfoMutations',data)
    },
    // async getUpdatenickname({commit},payload){
    //     //console.log(payload,"请求参数")
    //     let data = await updatenicknameApi(payload);
    //     //console.log(data,"请求结果")
    //     commit("getUpdatenicknameations",data)
    // }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}