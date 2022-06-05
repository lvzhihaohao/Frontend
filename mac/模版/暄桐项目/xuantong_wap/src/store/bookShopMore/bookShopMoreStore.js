import {bookShopMoreTieleApi,bookShopMoreApi} from '../../api/bookShopMore'
let state={
    bookShopMoreTitleList:[],
    bookShopMoreList:[]
}
let mutations={
    getBookShopMoreTitleMutations (state, payload) {
        state.bookShopMoreTitleList = payload;
    },
    getBookShopMoreMutations (state,payload) {
        state.bookShopMoreList = payload;
    }   
}
let actions={
  async getBookShopMoreTitleAction ({commit}, payload) {
    let data=await bookShopMoreTieleApi();    
    commit('getBookShopMoreTitleMutations',data)
  },
  async getBookShopMoreAction ({commit}, payload) {
    let data=await bookShopMoreApi({typeId:payload})
    commit('getBookShopMoreMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}