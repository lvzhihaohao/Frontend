import axios from 'axios';
//邮箱绑定
export let emailBoundSecurityApi = ({confirmCode,email,nowTime,studentId}={})=> {
    return axios.post('/user/bindingemail',{  
        confirmCode,
        email,
        nowTime,
        studentId
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}
//修改密码
export let emailForgetPasswordApi = ({confirmCode,emailAddress,newPassword,newPasswordConfirm,nowTime}) =>{
    return axios.post('/user/getpasswordbyemail',{
        confirmCode,
        emailAddress,
        newPassword,
        newPasswordConfirm,
        nowTime
    }).then(res=>{
        //console.log(res)
        return res.data
    })
}