import * as TYPES from '../mutations-types'
import * as allReq from 'src/api'
import { Message } from 'element-ui'

async function batchUserInfo(result,callback){
  if (result.data.total===0) {
    return 
  }else{
    let user_list = result.data.data.openid
    user_list = user_list.map(item=> ({'openid':item}))
    let result2 = await allReq.reqBatchReceiveUserInfo({user_list})
    if (result2.status===200) {
      callback(result2.data)
    }else{
      Message.error('获取标签下户信息出错')
    }
  }
}

export default {
  // 获取微信标签
  async getWeChatLabel({commit}){
    let result = await allReq.reqAllLabel()
    if (result.status===200) {
      commit(TYPES.ADD_WE_CHAT_LABEL,result.data.tags)
    }else {
      Message.error('微信标签获取失败')
    }
  },
  // 获取某个标签下的粉丝列表
  async getLableGategoryUser({commit},payload){
    let {tagid} = payload
    let result = await allReq.reqSomeLabelUserList(payload)
    if (result.status===200) {
      let user_list = result.data.data.openid
      user_list = user_list.map(item=> ({'openid':item}))
      let result2 = await allReq.reqBatchReceiveUserInfo({user_list})
      if (result2.status===200) {
        commit(TYPES.GET_SOME_LABEL_USER,{tagid,data:result2.data.user_info_list})
      }else{
        Message.error('获取标签下户信息出错')
      }
    }

  },
  // 获取所有关注用户的信息
  async getAllAttentionUser({commit}){
    let result = await allReq.reqBatchReceiveOpenId()
    if (result.status===200) {
      let user_list = result.data.data.openid
      user_list = user_list.map(item=> ({'openid':item}))
      let result2 = await allReq.reqBatchReceiveUserInfo({user_list})
      if (result2.status===200) {
        commit(TYPES.GET_ALL_ATTENTION_INFO,result2.data.user_info_list)
      }else{
        Message.error('获取用户信息出错')
      }
    }else{
      Message.error('获取用户openid出错')
    }
  },
  // 获取黑名单用户
  async getBlackListUser({commit}){
    let result = await allReq.reqBlackListUserInfo()
    console.log(result)
    if (result.status===200) {
       batchUserInfo(result,(data)=>{
         console.log(data)
        commit(TYPES.GET_BLACK_LIST,{data})
      })
    }else {
      Message.error('获取黑名单失败')
    }
  } 
}