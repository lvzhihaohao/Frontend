import {chanJieDetailMySubmitTypeWorkApi,MySubmitTypeWorkSunApi} from '../../api/chanJieDetailMySubmitTypeWork'
import {userclasshourTime,formData} from '../../public/index'
let state={
  chanJieDetailMySubmitTypeWorkList:[],
  MySubmitTypeWorkSunData:{}
}
let mutations={ 
    getChanJieDetailMySubmitTypeWorkMutations (state, payload) {
        if(payload !=null){
            state.chanJieDetailMySubmitTypeWorkList = payload.userHomeWorkPastResponseVos;
            state.chanJieDetailMySubmitTypeWorkList.forEach(item=>{
                item.createTime=formData(item.createTime,'utc','add',false)
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
                // item.createTime=userclasshourTime(item.createTime)
                // //console.log(item.createTime,'ttttttttttttttt')
                item.userHomeWorkCommnetResponseVos.forEach(val=>{
                    // val.createTime=userclasshourTime(val.createTime)
                    val.createTime=formData(val.createTime,'utc','add',false)
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
        } 
    },
    getMySubmitTypeWorkSunMutations (state,payload) {
       state.MySubmitTypeWorkSunData = payload;
    }
}
let actions={
  async getChanJieDetailMySubmitTypeWorkAction ({commit}, payload) {
    let data =await chanJieDetailMySubmitTypeWorkApi(payload)
    commit('getChanJieDetailMySubmitTypeWorkMutations',data)
  },
  async getMySubmitTypeWorkSunAction ({commit}, payload) {
      //console.log(payload)
    let data =await MySubmitTypeWorkSunApi(payload)
    commit('getMySubmitTypeWorkSunMutations',data)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}