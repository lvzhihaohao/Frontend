import {myHomeWorkApi} from '../../api/myHomeWork'
import {userclasshourTime,formData} from '../../public/index'
let state={
    myHomeWorkList:[],
    pageIndex:1,
    typeKey:0,
}
let mutations={
    getMyHomeWorkMutations (state, payload) {
        state.myHomeWorkList= payload && payload.userHomeWorkResponseVos
        state.myHomeWorkList && state.myHomeWorkList.forEach(item=>{
            //我的作业数据
            item.createTime=formData(item.createTime,'uat','add',false)
            if(item.content){
                //截取p标签
                 if(item.content.slice(0,3)=='<p>'){
                     item.content = item.content.slice(3,(item.content.length-4))
                 }
                //截取最后的br
                if(item.content.substring(item.content.length-4)=='<br>'){
                    item.content = item.content.slice(0,(item.content.length-4))
                }
                //截取最后的空格
                if(item.content.substring(item.content.length-6)=='&nbsp;'){
                    item.content = item.content.slice(0,(item.content.length-6))
                }
            }
            item.ifShow=false;
            //老师追评数据
            item.userHomeWorkCommnetResponseVos.forEach(val=>{
                val.createTime=formData(val.createTime,'uat','add',false)
                if(val.content){
                    //截取p标签
                     if(val.content.slice(0,3)=='<p>'){
                         val.content = val.content.slice(3,(val.content.length-4))
                     }
                    
                    //截取最后的br
                    if(val.content.substring(val.content.length-4)=='<br>'){
                        val.content = val.content.slice(0,(val.content.length-4))
                    }
                    //截取最后的空格
                    if(val.content.substring(val.content.length-6)=='&nbsp;'){
                        val.content = val.content.slice(0,(val.content.length-6))
                    }
                }
                //回复老师数据
                val.homeworkReviewReplies.forEach(Reval=>{
                    if(Reval.replyContent){
                        //截取p标签
                        if(Reval.replyContent.slice(0,3)=='<p>'){
                             Reval.replyContent = Reval.replyContent.slice(3,(Reval.replyContent.length-4))
                         }
                        //截取最后的br
                        if(Reval.replyContent.substring(Reval.replyContent.length-4)=='<br>'){
                            Reval.replyContent = Reval.replyContent.slice(0,(Reval.replyContent.length-4))
                        }
                        //截取最后的空格
                        if(Reval.replyContent.substring(Reval.replyContent.length-6)=='&nbsp;'){
                            Reval.replyContent = Reval.replyContent.slice(0,(Reval.replyContent.length-6))
                        }
                    }
                    // //console.log(Reval.replyContent,'ttttttttttttttt')
                })
                val.ifShow=false;
            })
        })
    },
    changePage(state){
        state.pageIndex++
    },
    changeZero(state){
        state.pageIndex=1
    },
    changeKey(state,key){
        state.typeKey = key
        //console.log(state.typeKey)
    }
}
let actions={
  async getMyHomeWorkAction ({commit}, payload) {
    let data =await myHomeWorkApi(payload)
    commit('getMyHomeWorkMutations',data)
  },
  changeGetPage({commit}, payload){
    commit('changePage',payload)
  },
  changeGetZero({commit}, payload){
    commit('changeZero',payload)
  },
  changeGetKey({commit}, payload){
    commit('changeKey',payload)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}