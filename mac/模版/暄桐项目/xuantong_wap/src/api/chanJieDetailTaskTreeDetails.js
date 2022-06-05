import axios from 'axios'
//课时大纲详情
export let chanJieDetailTaskTreeDetailsApi = ({appid,classhourId,signature,timestamp,token}={}) =>{
    return axios.post('/userclasshour/detail',{
        appid,
        classhourId,
        signature,
        timestamp,
        token
    }).then(res=>{
        //console.log(res)
        return res.data.result;
    })
}
//资料列表
export let taskTreeDetailsClassDataApi = ({classhourId,pageIndex}={}) =>{
    return axios.post('/coursematerial/list',{
        classhourId,
        pageIndex
    }).then(res=>{
        // let Fulllist = res.data.result.list;
        // Fulllist.map((item,index)=>{
        //     item.fileUri = item.fileUri.replace(/http:/,'')
        //     return item.fileUri
        // })
        return res.data.result;
    })
}
