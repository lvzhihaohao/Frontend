import axios from 'axios';
//写字的事  更多
export let thingWriteApi = ({pageIndex,columnId}={})=> {
    return axios.post('/article/list',{  
        pageIndex,
        columnId
    }).then(res=>{
        return res.data.result;
    })
}