import axios from 'axios';
//我的订单
export let myOrderApi = ({appid,orderStatus,pageIndex,signature,timestamp,token}={})=> {
    return axios.post('/order/list',{  
        appid,
        orderStatus,
        pageIndex,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data.result;
    })
}