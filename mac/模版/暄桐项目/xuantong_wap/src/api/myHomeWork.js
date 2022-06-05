import axios from 'axios';
//我的作业全部
export let myHomeWorkApi = ({appid,courseId,pageIndex,signature,timestamp,token,typeKey,typeId}={})=> {
    return axios.post('/userhomework/list',{
        appid,
        courseId,
        pageIndex,
        signature,
        timestamp,
        token,
        typeKey,
        typeId
    }).then(res=>{
        // userHomeWorkCommnetResponseVos
        res.data.result.userHomeWorkResponseVos.forEach((item)=>{
            if(item.userHomeWorkCommnetResponseVos.length>0){
                item.userHomeWorkCommnetResponseVos.forEach((txt)=>{
                   if(txt.homeworkReviewReplies.length>0){
                       txt.homeworkReviewReplies.forEach((itemTxt)=>{
                            itemTxt.ifShow=false
                       })
                   }
                })
            }
           
        })
        return res.data.result;
    })
}