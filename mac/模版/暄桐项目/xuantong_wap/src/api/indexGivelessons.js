import axios from 'axios';
//首页赠课给好友
export let indexGiveLessonsApi = ({appid,columnId,pageIndex,signature,sortName,sortType,timestamp,token}={})=> {
    return axios.post('/course/list',{
        appid,
        columnId,
        pageIndex,
        signature,
        sortName,
        sortType,
        timestamp,
        token
    }
).then(res=>{
        //console.log(res)
        return res.data.result
    })
}