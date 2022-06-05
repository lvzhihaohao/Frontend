import {myBaskHomeWorkApi} from '../../api/My_BaskHomework'
import {userclasshourTime,formData} from '../../public/index'
let state={
    myBaskHomeWorkList:[],
    pageIndex:1
}
let mutations={
    getMyBaskHomeWorkMutations (state, payload) {
        if(payload !=null){
           state.myBaskHomeWorkList=payload.userHomeWorkSunResponseVos;
           state.myBaskHomeWorkList.map(item=>{
                item.createTime=formData(item.createTime,'uat','add',false)
            //    item.createTime=userclasshourTime (item.createTime)
            })
        }
        //console.log(state.myBaskHomeWorkList,'我晒出的作业')
    },
    changePage(state){
        state.pageIndex++
    },
    changeZero(state){
        state.pageIndex=1
    }
}
let actions={
  async getMyBaskHomeWorkAction ({commit}, payload) {
    let data =await myBaskHomeWorkApi(payload)
    commit('getMyBaskHomeWorkMutations',data)
  },
  changeGetPage({commit}, payload){
    commit('changePage',payload)
  },
  changeGetZero({commit}, payload){
    commit('changeZero',payload)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}