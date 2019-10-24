import axios from '../axios'
// 微信管理页面----------------------------------------------------
// 获取公众号信息
export const reqWeChatAuthInfo = ()=>axios({
  url:'openwechat/auth/getWeChatAuth',
  flag:false
})
//初始化公众号信息
export const reqInitWeChatAuthInfo = (data)=>axios({
  url:'openwechat/auth/uploadCustomerImg',
  data,
  type:'POST',
  flag:false
})
//修改公众号信息
export const reqModiWeChatAuth = (data)=>axios({
  url:'openwechat/auth/modifyWeChatAuth',
  data,
  type:'PUT',
  flag:false

})


// 通过appid查询公众号是否授权
export const reqCheckAuth = (data)=>{
  let url = `openwechat/auth/queryAuthorization/${data.appId}`
  return axios({
      url,     
      flag:false
  })
  
}

// 用户扫码授权
export const reqUserScanQR=()=>axios({
url:'openwechat/auth/getPreAuthCode',
flag:false
})