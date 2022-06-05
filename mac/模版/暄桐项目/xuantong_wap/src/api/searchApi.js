import axios from 'axios';
//搜索文章
export let searchArticleApi = ({searchKeyword,pageIndex}={})=> {
    return axios.post('/search/articlelist',{
        searchKeyword,
        pageIndex
    },).then(res=>{
        return res.data;
    })
}
//搜索课程
export let searchCourseApi = ({searchKeyword,pageIndex}={})=> {
    return axios.post('/search/appCourselist',{
        searchKeyword,
        pageIndex
    },).then(res=>{
        return res.data;
    })
}
//搜索商品
export let searchShopApi = ({searchKeyword,pageIndex}={})=> {
    return axios.post('/search/commoditylist',{
        searchKeyword,
        pageIndex
    },).then(res=>{
        return res.data;
    })
}
//搜索视频
export let searchVideoApi = ({searchKeyword,pageIndex,token}={})=> {
    return axios.post('/search/coursefreelist',{
        searchKeyword,
        pageIndex,
        token
    },).then(res=>{
        return res.data;
    })
}