import axios from 'axios';
//首页轮播图
//axios.baseUrl="http://118.190.202.65:8081"
export let indexBannerApi = ()=> {
    return axios.post('/carouselimg/listforweb').then(res=>{
        return res.data;
    })
}
//首页课程展示
export let indexCourseRecommendApi = ({courseTypeKey,token}={})=> {
    return axios.post('/course/recommendlist',{
        courseTypeKey,
        token
    }
).then(res=>{
        return res.data.result.courseFullResponseVos[0]
    })
}
//首页进阶课程展示
export let indexCourseRecommendTwoApi = ({courseTypeKey,token}={})=> {
    return axios.post('/course/recommendlist',{
        courseTypeKey,
        token
    }
).then(res=>{
        return res.data.result.courseFullResponseVos
    })
}
//首页商品展示
export let indexCommodityRecommendApi = ()=> {
    return axios.post('/commodity/recommendlist',{}).then(res=>{
        return res.data;
    })
}
//首页免费讲座
export let indexCoursefreeRecommendApi = ({appid,pageIndex,signature,timestamp,token}={})=> {
    return axios.post('/coursefree/recommendlist',{
        // appid,
        pageIndex,
        // signature,
        // timestamp,
        // token
    }).then(res=>{
        return res.data.result;
    })
}
//首页作品展示
export let indexProductionRecommendApi = ({appid,pageIndex,signature,timestamp,token}={})=> {
    return axios.post('/production/recommendlist',{
        appid,
        pageIndex,
        signature,
        timestamp,
        token,
    }).then(res=>{
        return res.data.result;
    })
}
//首页教室与老师
export let indexArticleRecommendApi = ()=> {
    return axios.post('/article/recommendlist',{}).then(res=>{
        return res.data.result;
    })
}
//首页视频点赞
export let indexCoursefreeGiveLikeApi = ({appid,courseFreeId,signature,timestamp,token}={})=> {
    return axios.post('/coursefree/praise',{
        appid,
        courseFreeId,
        signature,
        timestamp,
        token
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}
