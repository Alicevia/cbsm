// import axios from '../axios'
import { axios1 as axios,ajax} from '../axios'

// 微信登陆用openid 与access_token 换取user-token
export const reqWeChatLogin = (data)=>axios({
    url:'register/wxlogin',
    data,
    type:'POST',
    flag:false
})
// 微信登陆获取openid access_token
export const reqWeChatQRCode=(data)=>axios({
    url:`register/wechaturl`,
    data,
    type:'PUT'
})
// 获取手机注册的验证码用于微信绑定 //也用于手机号的更换验证
export const reqWxBindPhoneCode=(data)=>axios({
    url:'register/phoneVerification',
    data,
    type:'GET',

})
//微信绑定手机号
export const reqWxBindPhone = (data)=>axios({
    url:'register/bindphone',
    data,
    type:"POST",
    flag:false

})


//用户退出清空usertoken
export const reqLogout=()=>axios({
    url:'register/logout'
})

// 用户手机密码登陆 获取userToken
export const reqPhoneLogin =(data)=>axios({
    url:'register/login',
    data,
    type:'POST',
    flag:false
})


//申请验证码重置密码
export const reqResetAuthCode=(data)=>axios({
    url:'register/phoneVerificationPwd',
    data
})
// 验证输入的短信code是否正确
export const reqCheckSMS = (data)=>axios({
    url:'register/password/forget/sms',
    data,
    type:'PUT',
})
//完成重置密码
export const reqResetPW=(data)=>axios({
    url:'register/password/forget',
    data,
    type:'PUT',
    flag:false
})
