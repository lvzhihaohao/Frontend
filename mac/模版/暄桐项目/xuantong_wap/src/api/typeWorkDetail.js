import axios from 'axios';
//作业详情
export let typeWorkDetailApi = ({id}={})=> {
    return axios.post('/homework/detail',{  
        id
    }).then(res=>{
        return res.data.result;
    })
}