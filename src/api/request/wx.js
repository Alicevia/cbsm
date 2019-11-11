// import axios from '../axios'
import { axios1 as axios,ajax} from '../axios'

// 微信管理页面----------------------------------------------------
// 获取公众号信息
export const reqWeChatAuthInfo = ()=>axios({
  url:'auth/getWeChatAuth',
  flag:false
})
//初始化公众号信息
export const reqInitWeChatAuthInfo = (data)=>axios({
  url:'auth/uploadCustomerImg',
  data,
  type:'POST',
  flag:false
})
//修改公众号信息
export const reqModiWeChatAuth = (data)=>axios({
  url:'auth/modifyWeChatAuth',
  data,
  type:'PUT',
  flag:false
})


// 通过appid查询公众号是否授权
export const reqCheckAuth = (data)=>{
  let url = `auth/queryAuthorization/${data.appId}`
  return axios({
      url,     
      flag:false
  })
}

// 用户扫码授权
export const reqUserScanQR=()=>axios({
url:'auth/getPreAuthCode',
flag:false
})

