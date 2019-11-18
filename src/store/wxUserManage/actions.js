import * as TYPES from '../mutations-types'
import * as allReq from 'src/api'
import { Message } from 'element-ui'

async function batchUserInfo(result, callback) {
  if (result.data.total === 0) {
    return
  } else {
    let user_list = result.data.data.openid
    user_list = user_list.map(item => ({ 'openid': item }))
    let result2 = await allReq.reqBatchReceiveUserInfo({ user_list })
    if (result2.status === 200) {
      callback(result2.data)
    } else {
      Message.error('获取标签下户信息出错')
    }
  }
}
function showErrorMessage(code) {
  switch (code) {
    case -1:
      Message.error('系统繁忙，请稍后再试')
      break;
    case 45157:
      Message.error('标签名非法，请注意不能和其他标签重名')
      break;
    case 45158:
      Message.error('标签名长度超过30个字节')
      break;
    case 45056:
      Message.error('创建的标签数过多，请注意不能超过100个')
      break;
    default:
      Message.error('未知错误')
      break;
  }
}

export default {
  // 获取微信标签
  async getWeChatLabel({ commit }) {
    let result = await allReq.reqAllLabel()
    if (result.status === 200 && !result.data.errcode) {
      commit(TYPES.GET_WE_CHAT_LABEL, result.data.tags)
    } else {
      Message.error('微信标签获取失败')
    }
  },
  // 添加标签
  async addWeChatLabel({ commit }, payload) {

    let result = await allReq.reqCreateLabel(payload)
    console.log(result)
    if (result.status === 200 && !result.data.errcode) {
      commit(TYPES.ADD_WE_CHAT_LABEL, result.data.tag)
    } else {
      showErrorMessage(result.data.errcode)
    }
  },
  // 修改标签
  async modiWeChatLabel({commit},payload){
    let result = await allReq.reqEditLabel(payload)
    if (result.data.errcode===0) {
      commit(TYPES.MODI_WE_CHAT_LABEL,payload)
    }else{
      showErrorMessage(result.data.errcode)
    }
  },
  // 获取某个标签下的粉丝列表
  async getLableGategoryUser({ commit }, payload) {
    let { tagid } = payload
    let result = await allReq.reqSomeLabelUserList(payload)
    if (result.status === 200&& result.data.count!==0) {
      let user_list = result.data.data.openid
      user_list = user_list.map(item => ({ 'openid': item }))
      
      let result2 = await allReq.reqBatchReceiveUserInfo({ user_list })
      if (result2.status === 200) {
        commit(TYPES.GET_SOME_LABEL_USER, { tagid, data: result2.data.user_info_list })
      } else {
        Message.error('获取标签下户信息出错')
      }
    }else{
      Message.warning('该标签下没有用户')
    }

  },
  // 获取所有关注用户的信息
  async getAllAttentionUser({ commit }, payload) {
    let { flag } = payload
    let result = await allReq.reqBatchReceiveOpenId()
    if (result.status === 200) {
      let user_list = result.data.data.openid
      user_list = user_list.map(item => ({ 'openid': item }))
      let result2 = await allReq.reqBatchReceiveUserInfo({ user_list })
      if (result2.status === 200) {
        commit(TYPES.GET_ALL_ATTENTION_INFO,
          { payload: result2.data.user_info_list, flag }
        )
      } else {
        Message.error('获取用户信息出错')
      }
    } else {
      Message.error('获取用户openid出错')
    }
  },
  // 展示未分组
  async showUnGroup({commit,getters}){
    let {unGroupUserList} = getters
    commit(TYPES.SHOW_UN_GROUP,unGroupUserList)
  },
  // 批量操作用户的标签
  async batchUserLabel({commit},payload){
    let result  = await allReq.reqDivideUser(payload)
  },
  // 批量取消用户标签
  async batchCancelUserLabel({commit},payload){
    let result = await allReq.reqCancelDivideUser(payload)
    console.log(result)
  },
  // 获取黑名单用户
  async getBlackListUser({ commit }, payload) {
    let { flag='' } = payload
    let result = await allReq.reqBlackListUserInfo()
    console.log(result)
    if (result.status === 200) {
      batchUserInfo(result, (data) => {
        console.log(data)
        console.log(flag)
        commit(TYPES.GET_BLACK_LIST, { data, flag })
      })
    } else {
      Message.error('获取黑名单失败')
    }
  },
 
}