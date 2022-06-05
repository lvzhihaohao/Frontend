import axios from 'axios';
//免费视频列表
export let chairListMoreApi = ({appid,pageIndex,signature,timestamp,token}={})=> {
    return axios.post('/coursefree/list',{
        appid,
        pageIndex,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data.result;
    })
}
//免费视频详情
export let chairListMoreDetailApi = ({appid,courseFreeId,signature,timestamp,token}={})=> {
    return axios.post('/coursefree/detail',{  
        appid,
        courseFreeId,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data.result;
    })
}