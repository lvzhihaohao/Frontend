import {chanJieDetailTaskTreeDetailsApi,taskTreeDetailsClassDataApi} from '../../api/chanJieDetailTaskTreeDetails'
import axios from 'axios'
let state={
    chanJieDetailTaskTreeDetailsData:{},
    taskTreeDetailsClassDataList:[]
}
let mutations={
    getChanJieDetailTaskTreeDetailsMutations (state, payload) { 
        state.chanJieDetailTaskTreeDetailsData=payload;
        if(state.chanJieDetailTaskTreeDetailsData != null){
            axios.post('/utility/getUrl',{key: state.chanJieDetailTaskTreeDetailsData.courseUrl}).then(res=>{
                state.chanJieDetailTaskTreeDetailsData.courseUrl=res.data.result.url
            }) 
        } 
    },
    getTaskTreeDetailsClassDataMutations (state,payload) {
        state.taskTreeDetailsClassDataList=payload;
    }
}
let actions={
  async getChanJieDetailTaskTreeDetailsAction ({commit}, payload) {
    let data =await chanJieDetailTaskTreeDetailsApi(payload)
    commit('getChanJieDetailTaskTreeDetailsMutations',data)
  },
  async getTaskTreeDetailsClassDataAction ({commit}, payload) {
    let data =await taskTreeDetailsClassDataApi(payload)
    commit('getTaskTreeDetailsClassDataMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}