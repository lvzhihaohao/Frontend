import axios from 'axios'
//帖子详情
export let chanJieDetailDiscussApi = ({appid,id,signature,timestamp,token}={}) =>{
    return axios.post('/coursediscussion/detail',{
        appid,
        id,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data.result;
    })
}
//帖子评论列表
export let discussListApi = ({appid,id,pageIndex,signature,timestamp,token}={}) =>{
    return axios.post('/coursediscussion/commentlist',{
        appid,
        id,
        pageIndex,
        signature,
        timestamp,
        token
    }).then(res=>{
        //console.log(res)
        return res.data.result;
    })
}
//评论他人 和  回复他人回复 和  评论
export let discussReplyPeopleApi = ({appid,content,discussionId,replyId,signature,timestamp,token,beReplyUser,contentNum,isCourseDiscussion,courseId}={})=>{
    return axios.post('/coursediscussion/reply',{
        courseId,
        isCourseDiscussion,
        appid, 
        content,
        discussionId,
        replyId,
        signature,
        timestamp,
        token,
        beReplyUser,
        contentNum
    }).then(res=>{
        //console.log(res,'pinglun  huifu')
        return res.data;
    })
}
// 评论点赞 
export let discussReplyGiveLikeApi = ({appid,id,signature,timestamp,token}={})=>{
    return axios.post('/coursediscussion/commentLike',{
        appid,
        id,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data;
    })
}
//回复点赞
export let discussCommentGiveLikeApi = ({appid,id,signature,timestamp,token}={})=>{
    return axios.post('/coursediscussion/replyLike',{
        appid,
        id,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data;
    })
}
//删除评论 
export let chanJieDetailHomeWorkSunRemoveCommentApi = ({appid,homeworkFinishId,signature,timestamp,token}={}) => {
    return axios.post('/userhomeworksun/delDiscussionComment',{
        appid,
        homeworkFinishId,
        signature,
        timestamp,
        token
    }).then(res=>{
        //console.log(res,'删除评论')
        return res.data;
    })
}
//删除回复
export let chanJieDetailHomeWorkSunRemoveReplyApi = ({appid,homeworkFinishId,signature,timestamp,token}={}) => {
    return axios.post('/userhomeworksun/delDiscussionReply',{
        appid,
        homeworkFinishId,
        signature,
        timestamp,
        token
    }).then(res=>{
        //console.log(res,'删除回复')
        return res.data;
    })
}
