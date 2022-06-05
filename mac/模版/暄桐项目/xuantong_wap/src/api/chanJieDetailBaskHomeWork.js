import axios from 'axios'
//晒作业(发帖)
export let chanJieDetailBaskHomeWorkApi = ({appid,content,courseId,courseType,
    picturesUrlList,title,signature,timestamp,token,contentNum}={}) =>{
    return axios.post('/coursediscussion/add',{
        appid,
        content,
        courseId,
        courseType,
        picturesUrlList,
        title,
        signature,
        timestamp,
        contentNum,
        token
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}
