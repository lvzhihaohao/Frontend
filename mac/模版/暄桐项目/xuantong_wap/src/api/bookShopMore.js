import axios from 'axios';
//商城标题列表
export let bookShopMoreTieleApi = ()=> {
    return axios.post('/commodity/typelist').then(res=>{
        //console.log('商品坐标',res)
        return res.data.result;
    })
}
//商城展示单个
export let bookShopMoreApi = ({pageIndex=1,typeId=1}={})=> {
    return axios.post('/commodity/list',{  
        pageIndex,
        typeId
    }).then(res=>{
        return res.data.result.commodityResponseVos;
    })
}