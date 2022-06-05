import {chairListMoreApi,chairListMoreDetailApi} from '../../api/chairListMore'
import axios from 'axios'
let state={
    chairMoreList:[],
    chairMoreListDetail:{},
    sunMore:'加载更多',
}
let mutations={
    async getChairListMoreMutations (state, payload) {
        for(let i=0;i<payload.courseFreeResponseVos.length;i++){
            await axios.post('/utility/getUrl',{key:payload.courseFreeResponseVos[i].courseVideoUri}).then(res=>{
                payload.courseFreeResponseVos[i].courseVideoUri=res.data.result
            }) 
        }
       state.chairMoreList=  [...payload.courseFreeResponseVos];
    },
    getChairListMoreDetailMutations (state, payload) {
        // axios.post('/utility/getUrl',{key:payload.courseVideoUri}).then(res=>{
        //     state.chairMoreListDetail.courseVideoUri=res.data.result
        // })
        state.chairMoreListDetail = payload
        state.chairMoreListDetail.publishTime  =   state.chairMoreListDetail.publishTime.split(' ')[0]
        state.chairMoreListDetail.courseAbstractNum=state.chairMoreListDetail.courseAbstract.length
        //console.log()
    },
    changesunMore(state,payload){
        state.sunMore = payload
    }
}
let actions={
  async getChairListMoreAction ({commit}, payload) {
    let data =await chairListMoreApi(payload)
    commit('getChairListMoreMutations',data)
  },
  async getChairListMoreDetailAction ({commit}, payload) {
    let data =await chairListMoreDetailApi(payload)
    commit('getChairListMoreDetailMutations',data)
  },
  getchangesunMore({commit}, payload){
    commit('changesunMore',payload)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}