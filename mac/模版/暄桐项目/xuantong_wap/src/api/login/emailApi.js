import axios from 'axios';
//检测邮箱是否存在
export let emailHaveApi = ({email}={})=> {
    return axios.post('/user/checkEmail',{  
        email,
    }).then(res=>{
        return res.data;
    })
}
//邮箱登录
export let emailLoginApi = ({account,password}={})=> {
    return axios.post('/user/loginbypassword',{  
        account,
        password,
    }).then(res=>{
        return res.data;
    })
}
//邮箱发送验证
export let emailGetCaptchaApi = ({emailList,sendType}={})=> {
    return axios.post('/send/sendEmail',{  
        emailList,
        sendType,
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}
//检测验证码是否存在
export let captchaHaveApi = ({confirmCode,findWay,nowTime,type,isExist}={})=> {
    return axios.post('/user/checkConfirmCode',{  
        confirmCode,
        findWay,
        nowTime,
        type,
        isExist
    }).then(res=>{
        //console.log(res,'检测验证码')
        return res.data;
    })
}
//邮箱注册
export let emailRegisterApi= ({confirmCode,email,newPassword,newPasswordConfirm,nickName,nowTime}={})=> {
    return axios.post('/user/registerbyemail',{  
        confirmCode,
        email,
        newPassword,
        newPasswordConfirm,
        nickName,
        nowTime
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}
//邮箱找回密码
export let emailForgetPasswordApi = ({confirmCode,emailAddress,nowTime,newPassword,newPasswordConfirm}={})=> {
    return axios.post('/user/getpasswordbyemail',{  
        confirmCode,
        emailAddress,
        nowTime,
        newPassword,
        newPasswordConfirm
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}