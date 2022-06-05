import axios from 'axios'
//单阶详情
export let chanJieDetailApi=({appid,courseId,signature,timestamp,token}={})=>{
    return axios.post('/course/singledetail',{
        appid,
        courseId,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data.result;
    })
}
//单阶简介
export let chanJieDetailUserCourseIntroduceApi = ({courseId,courseType}={}) => {
   let dataTime = new Date().getTime()
    return axios.post('/usercourse/courseIntroduce?dateTime'+dataTime,{
        courseId,
        courseType
    }).then(res=>{
        return res.data.result;
    })
}
//单阶任务树  课时大纲列表
export let chanJieDetailUserclasshourApi = ({appid,courseId,signature,timestamp,token}={}) => {
    return axios.post('/userclasshour/list',{
        appid,
        courseId,
        signature,
        timestamp,
        token
    }).then(res=>{
        //console.log(res.data.result,"8484881848")
        return res.data.result;
    })
}
//单阶晒作业  课程帖子列表
export let chanJieDetailHomeWorkSunApi = ({appid,courseId,courseType,pageIndex,signature
    ,sortType,timestamp,token}={}) => {
          // listforweb
          let newDataItem = new Date().getTime()
          //console.log(newDataItem,"---------newDataItem-----------")
    return axios.post('/coursediscussion/listforweb?newDataTiem='+newDataItem,{
        appid,
        courseId,
        courseType,
        pageIndex,
        signature,
        sortType,
        timestamp,
        token
    }).then(res=>{
        //console.log("---------",res,"--------")
        return res.data.result;
    })
}
//单阶 课程评价列表
export let chanJieDetailCourseCommentApi = ({appid,courseId,courseType,pageIndex,signature
    ,typeKey,timestamp,token}={}) => {
    return axios.post('/coursecomment/list',{
        appid,
        courseId,
        courseType,
        pageIndex,
        signature,
        typeKey,
        timestamp,
        token
    }).then(res=>{
        res.data.result.courseCommentResponseVos.forEach((item,index)=>{
            item.ifShow=false;
        })
        return res.data.result;
    })
}
//帖子点赞
export let chanJieDetailHomeWorkSunTieZiGiveLikeApi = ({appid,id,signature,timestamp,token}={}) => {
    return axios.post('/coursediscussion/praise',{
        appid,
        id,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data;
    })
}
// 删除帖子
export let chanJieDetailHomeWorkSunRemoveTieZiApi = ({appid,homeworkFinishId,signature,timestamp,token}={}) => {
    return axios.post('/userhomeworksun/delDiscussion',{
        appid,
        homeworkFinishId,
        signature,
        timestamp,
        token
    }).then(res=>{
        //console.log(res,'删除帖子')
        return res.data;
    })
}