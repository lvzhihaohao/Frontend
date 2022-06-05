import axios from 'axios';
//我晒出得作业
export let myBaskHomeWorkApi = ({appid,pageIndex,signature,timestamp,token,typeKey}={})=> {
    return axios.post('/userhomeworksun/list',{  
        appid,
        pageIndex,
        signature,
        timestamp,
        token
    }).then(res=>{
        //console.log(res,'我晒出得作业')
        return res.data.result;
    })
}