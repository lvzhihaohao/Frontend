import {myCollectionClassesApi} from '../../api/My_CollectionClasses'
let state={
    myCollectionClassesList:[],
}
let mutations={
    getMyCollectionClassesMutations (state, payload) {
        //state.myCollectionClassesList=payload;
    }
}
let actions={
  async getMyCollectionClassesAction ({commit}, payload) {
    let data =await myCollectionClassesApi(payload)
    commit('getMyCollectionClassesMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}