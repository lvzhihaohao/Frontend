import axios from 'axios';
//手机绑定
export let phoneBoundSecurityApi = ({confirmCode,mobile,nowTime,studentId}={})=> {
    return axios.post('/user/bindingmobile',{  
        confirmCode,
        mobile,
        nowTime,
        studentId
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}
//修改密码
export let phoneForgetPasswordApi = ({confirmCode,mobile,newPassword,newPasswordConfirm,nowTime}) =>{
    return axios.post('/user/getpasswordbymobile',{
        confirmCode,
        mobile,
        newPassword,
        newPasswordConfirm,
        nowTime
    }).then(res=>{
        //console.log(res)
        return res.data
    })
}