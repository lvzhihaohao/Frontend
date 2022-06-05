import axios from 'axios';
//同学作品列表
export let classMateMoreApi = ({appid,pageIndex,signature,timestamp,token}={})=> {
    return axios.post('/production/list',{  
        appid,
        pageIndex,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data.result;
    })
}
//同学作品点赞
export let classMateGiveLikeApi = ({appid,productionId,signature,timestamp,token}={})=> {
    return axios.post('/production/praise',{  
        appid,
        productionId,
        signature,
        timestamp,
        token
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}