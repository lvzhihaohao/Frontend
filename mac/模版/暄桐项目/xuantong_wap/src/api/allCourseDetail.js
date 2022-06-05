import axios from 'axios';
//全阶详请
export let allCourseDetailApi = ({appid,courseFullId,signature,timestamp,token}={})=> {
    return axios.post('/course/fulldetail',{ 
        appid,
        courseFullId,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data.result;
    })
}
//全阶简介
export let allCourseDetailUserCourseIntroduceApi= ({courseId,courseType}={})=> {
    return axios.post('/usercourse/courseIntroduce',{  
        courseId,
        courseType
    }).then(res=>{
        return res.data.result;
    })
}
//购买前提示
export let allCourseBuyHintApi = ()=>{
    return axios.post('/course/purchasetips',{}).then(res=>{
        return res.data.result;
    })
}
//购买前协议
export let allCourseBuyAgreementApi = ({courseId,courseType}={}) => {
    return axios.post('/course/purchaseagreement',{
        courseId,
        courseType
    }).then(res=>{
        return res.data.result;
    })
}