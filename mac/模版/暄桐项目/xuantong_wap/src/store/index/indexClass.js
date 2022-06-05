
let state={
    List:[],
    pageIndex:1,
}
let mutations={
    //状态id
    changeList(state,List){
        state.List = List
    },
    ChangePage(state){
        state.pageIndex++
        //console.log(state.pageIndex)
    },
    ChangeZero(state){
        state.pageIndex=1
    }
}
let actions={
  getchangeList({commit},payload){
    commit('changeList',payload)
    //   //console.log(payload,'payload')
  },
  ChangeGetPage({commit},payload){
      //console.log('????????')
    commit('ChangePage',payload)
  },
  ChangeGetZero({commit},payload){
    commit('ChangeZero',payload)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}