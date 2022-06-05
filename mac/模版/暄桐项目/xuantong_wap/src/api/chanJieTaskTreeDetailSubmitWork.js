import axios from 'axios'
//写作业
export let chanJieTaskTreeDetailSubmitWorkApi = ({appid,content,homeworkAssignId,homeworkTypeId,
    isSun,picList,signature,timestamp,token,type,contentNum,courseId}={}) =>{
        
    return axios.post('/userhomework/add',{
        courseId,
        appid,
        content,
        homeworkAssignId,
        homeworkTypeId,
        isSun,
        picList,
        signature,
        timestamp,
        token,
        contentNum,
        courseType:1
    }).then(res=>{
        return res.data;
    })
}
