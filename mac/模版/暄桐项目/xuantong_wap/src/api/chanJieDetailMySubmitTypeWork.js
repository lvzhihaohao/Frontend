import axios from 'axios'
//单阶里面我的作业列表
export let chanJieDetailMySubmitTypeWorkApi = ({appid,homeworkAssignId,pageIndex,
    signature,timestamp,token}={}) =>{
    return axios.post('/userhomework/pastlist',{
        appid,
        homeworkAssignId,
        pageIndex,
        signature,
        timestamp,
        token
    }).then(res=>{
        let resData=res.data.result;
        resData.userHomeWorkPastResponseVos.forEach((item,index)=>{
            item.ifShow=false
        })
        return resData;
    })
}
//单阶里面进行晒作业
export let MySubmitTypeWorkSunApi = ({appid,homeworkFinishId,courseType,
    signature,timestamp,token}={}) =>{
    return axios.post('/userhomeworksun/sunbyhomeworkId',{
        appid,
        homeworkFinishId,
        courseType:1,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data;
    })
}
