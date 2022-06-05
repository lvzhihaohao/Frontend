import {chanJieTaskTreeDetailSubmitWorkApi} from '../../api/chanJieTaskTreeDetailSubmitWork'
let state={
  chanJieTaskTreeDetailSubmitWorkData:{}
}
let mutations={
    getChanJieTaskTreeDetailSubmitWorkMutations (state, payload) {
      //console.log(payload,'怎么回事')
        state.chanJieTaskTreeDetailSubmitWorkData =payload;
    }
}
let actions={
  async getChanJieTaskTreeDetailSubmitWorkAction ({commit}, payload) {  
  
    let data =await chanJieTaskTreeDetailSubmitWorkApi(payload)
    
    commit('getChanJieTaskTreeDetailSubmitWorkMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}