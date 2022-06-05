import axios from 'axios';
//写字的人  更多
export let peopleWriteApi = ({pageIndex,columnId}={})=> {
    return axios.post('/article/list',{  
        pageIndex,
        columnId
    }).then(res=>{
        return res.data.result;
    })
}