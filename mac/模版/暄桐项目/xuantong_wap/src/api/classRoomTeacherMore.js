import axios from 'axios'
//文章列表 关于暄桐
export let classRoomTeacherXuantongApi=({pageIndex,columnId}={})=>{
    return axios.post('/article/list',{  
        pageIndex,
        columnId
    }).then(res=>{
        return res.data.result;
    })
}
//文章列表 关于林溪
export let classRoomTeacherLinxiApi=({pageIndex,columnId}={})=>{
    return axios.post('/article/list',{  
        pageIndex,
        columnId
    }).then(res=>{
        return res.data.result;
    })
}