import * as TYPES from '../mutations-types'
import * as allReq from 'src/api'
import { Message } from 'element-ui'

export default {
  // 获取微信标签
  async getWeChatLabel(){
    let result = await allReq.reqAllLabel()

    if (result.errcode===0) {
    }
  },
  // 获取所有关注用户的信息
  async getAllAttentionUser({commit}){
    let result = await allReq.reqBatchReceiveOpenId()
    if (result.status===200) {
      let user_list = result.data.data.openid
      user_list = user_list.map(item=>{
        return {
          'openid':item
        }
      })
      let result2 = await allReq.reqBatchReceiveUserInfo({user_list})
      if (result2.status===200) {

        commit(TYPES.GET_ALL_ATTENTION_INFO,result2.data.user_info_list)
      }else{
        Message.error('获取用户信息出错')
      }
    }else{
      Message.error('获取用户openid出错')
    }
  } 
}