import axios from 'axios';
//我收藏的课程
export let myCollectionClassesApi = ({appid,pageIndex,signature,timestamp,token,typeKey}={})=> {
    return axios.post('/usercourse/list',{  
        appid,
        pageIndex,
        signature,
        timestamp,
        token,
        typeKey
    }).then(res=>{
        //console.log(res,'我的收藏作业')
        return res.data.result;
    })
}