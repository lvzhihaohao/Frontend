import axios from 'axios'
//单阶写评价
export let chanJieDetailWriteEvaluateApi = ({appid,comment,courseId,courseType,scoreLevel,
    signature,timestamp,token,commentNum}={}) =>{
    return axios.post('/coursecomment/comment',{
        appid,
        comment,
        courseId,
        courseType,
        scoreLevel,
        signature,
        timestamp,
        commentNum,
        token
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}
