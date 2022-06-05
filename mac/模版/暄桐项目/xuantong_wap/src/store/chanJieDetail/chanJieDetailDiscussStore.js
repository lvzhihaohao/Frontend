import {chanJieDetailDiscussApi,discussListApi,discussReplyPeopleApi,
    discussReplyGiveLikeApi,discussCommentGiveLikeApi,chanJieDetailHomeWorkSunRemoveCommentApi,
    chanJieDetailHomeWorkSunRemoveReplyApi,chanJieDetailHomeWorkSunTieZiGiveLikeApi} from '../../api/chanJieDetailDiscuss'
import {computingTime} from '../../public/utils'
let state={
    chanJieDetailDiscussData:{},
    discussList:[],
    discussReplyPeopleData:{},
    discussReplyGiveLikeData:{},
    discussCommentGiveLikeData:{},
    chanJieDetailHomeWorkSunRemoveCommentData:{},
    chanJieDetailHomeWorkSunRemoveReplyData:{},
}
let mutations={
    getChanJieDetailDiscussMutations (state, payload) {
        if(payload !=null){
            state.chanJieDetailDiscussData=payload;
            if(state.chanJieDetailDiscussData){
                state.chanJieDetailDiscussData.createTime = 
                computingTime( state.chanJieDetailDiscussData.createTime)
            }
        }
        
        //console.log(state.chanJieDetailDiscussData,'评论详情')
    },
    getDiscussListMutations (state,payload) {
        if(payload !=null){
            state.discussList=payload;
            state.discussList.courseDiscussionCommentResponseVos && 
            state.discussList.courseDiscussionCommentResponseVos.forEach(item=>{
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
                //console.log(item.content)
                item.createTime = computingTime (item.createTime)
                item.courseDiscussionReplyResponseVos.forEach(val=>{
                    val.createTime = computingTime (val.createTime)
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
                })
            }) 
        }
    },
    getDiscussReplyPeopleMutations (state,payload) {
        state.discussReplyPeopleData = payload;
    },
    getDiscussReplyGiveLikeMutations (state,payload) {
        state.discussReplyGiveLikeData = payload
    },
    getDiscussCommentGiveLikeMutations (state,payload) {
        state.discussCommentGiveLikeData = payload
    },
    getChanJieDetailHomeWorkSunRemoveCommentMutations (state,payload) {
        state.chanJieDetailHomeWorkSunRemoveCommentData = payload
    },
    getChanJieDetailHomeWorkSunRemoveReplyMutations (state,payload) {
        state.chanJieDetailHomeWorkSunRemoveReplyData = payload
    },
}
let actions={
  async getChanJieDetailDiscussAction ({commit}, payload) {
    let data =await chanJieDetailDiscussApi(payload)
    commit('getChanJieDetailDiscussMutations',data)
  },
  async getDiscussListAction ({commit}, payload) {
    let data =await discussListApi(payload)
    data.courseDiscussionCommentResponseVos.forEach((item,index)=>{
        item.ifShow=false;
        item.courseDiscussionReplyResponseVos.forEach((val)=>{
            val.ifShow=false;
        })
    })
    commit('getDiscussListMutations',data)
  },
  async getDiscussReplyPeopleAction ({commit}, payload) {
    let data =await discussReplyPeopleApi(payload)
    commit('getDiscussReplyPeopleMutations',data)
  },
  async getDiscussReplyGiveLikeAction ({commit}, payload) {
    let data =await discussReplyGiveLikeApi(payload)
    commit('getDiscussReplyGiveLikeMutations',data)
  },
  async getDiscussCommentGiveLikeAction ({commit}, payload) {
    let data =await discussCommentGiveLikeApi(payload)
    commit('getDiscussCommentGiveLikeMutations',data)
  },
  async getChanJieDetailHomeWorkSunRemoveCommentAction ({commit}, payload) {
    let data =await chanJieDetailHomeWorkSunRemoveCommentApi(payload)
    commit('getChanJieDetailHomeWorkSunRemoveCommentMutations',data)
  },
  async getChanJieDetailHomeWorkSunRemoveReplyAction ({commit}, payload) {
    let data =await chanJieDetailHomeWorkSunRemoveReplyApi(payload)
    commit('getChanJieDetailHomeWorkSunRemoveReplyMutations',data)
  },
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}