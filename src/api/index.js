export * from './request/ali'
export * from './request/user'
export * from './request/auth'
export * from './request/wx'
export * from './request/serviceManage'
export * from './request/wxMenus'
export * from './request/wxUserManage'
// import axios from './axios'

// // 微信登陆用openid 与access_token 换取user-token
// export const reqWeChatLogin = (data)=>axios({
//     url:'register/wxlogin',
//     data,
//     type:'POST',
//     flag:false
// })
// // 微信登陆获取openid access_token
// export const reqWeChatQRCode=(data)=>axios({
//     url:`register/wechaturl`,
//     data,
//     type:'PUT'
// })
// // 获取手机注册的验证码用于微信绑定 //也用于手机号的更换验证
// export const reqWxBindPhoneCode=(data)=>axios({
//     url:'register/phoneVerification',
//     data,
//     type:'GET',

// })
// //微信绑定手机号
// export const reqWxBindPhone = (data)=>axios({
//     url:'register/bindphone',
//     data,
//     type:"POST",
//     flag:false

// })

// // 获取通过userToken获得用户信息
// export const reqUserInfo=()=>axios({
//     url:`user/userinfo`,
    
//     flag:false
// })

// //用户退出清空usertoken
// export const reqLogout=()=>axios({
//     url:'register/logout'
// })

// // 用户手机密码登陆 获取userToken
// export const reqPhoneLogin =(data)=>axios({
//     url:'register/login',
//     data,
//     type:'POST',
//     flag:false
// })


// //申请验证码重置密码
// export const reqResetAuthCode=(data)=>axios({
//     url:'register/phoneVerificationPwd',
//     data
// })
// // 验证输入的短信code是否正确
// export const reqCheckSMS = (data)=>axios({
//     url:'register/password/forget/sms',
//     data,
//     type:'PUT',
// })
// //完成重置密码
// export const reqResetPW=(data)=>axios({
//     url:'register/password/forget',
//     data,
//     type:'PUT',
//     flag:false
// })

// // account--------------------------------------------------------------
// export const reqModiUserInfo = (data)=>axios({
//     url:'user/info',
//     data,
//     type:'PUT',
//     flag:false
// })

// // 更换密码
// export const reqChangePassword = (data)=>axios({
//     url:'user/password/change',
//     data,
//     type:'PUT',
//     flag:false
// })
// // 更换手机号
// export const reqChangePhone = (data)=>axios({
//     url:'user/updatephone',
//     data,
//     type:'POST',
//     flag:false
// })

// // 微信管理页面----------------------------------------------------
// // 获取公众号信息
// export const reqWeChatAuthInfo = ()=>axios({
//     url:'openwechat/auth/getWeChatAuth',
//     flag:false
// })
// //初始化公众号信息
// export const reqInitWeChatAuthInfo = (data)=>axios({
//     url:'openwechat/auth/uploadCustomerImg',
//     data,
//     type:'POST',
//     flag:false
// })
// //修改公众号信息
// export const reqModiWeChatAuth = (data)=>axios({
//     url:'openwechat/auth/modifyWeChatAuth',
//     data,
//     type:'PUT',
//     flag:false

// })


// // 通过appid查询公众号是否授权
// export const reqCheckAuth = (data)=>{
//     let url = `openwechat/auth/queryAuthorization/${data.appId}`
//     return axios({
//         url,     
//         flag:false
//     })
    
// }

// // 用户扫码授权
// export const reqUserScanQR=()=>axios({
//   url:'openwechat/auth/getPreAuthCode',
//   flag:false
// })

// // 阿里云短信页面--------------------------------------------------------------
// export const reqMessageAuth = ()=>axios({
//     url:'/ali/message/findMessage',
//     flag:false
// })
// //阿里云短信修改
// export const reqModiAliMessage = (data)=>axios({
//     url:'ali/message/updateMessage',
//     data,
//     type:'POST',
//     flag:false
// })