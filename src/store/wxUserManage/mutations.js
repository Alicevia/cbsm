import * as TYPES from '../mutations-types'
export default {
  // 标签的获取
  [TYPES.ADD_WE_CHAT_LABEL](state,payload){
    state.labelList = payload
  },
  // 获取某标签下的用户
  [TYPES.GET_SOME_LABEL_USER](state,payload){
    let {labelCagegoryUser} = state
    let {tagid,data} = payload
    labelCagegoryUser[tagid] = data
    state.currentTableList = data
  },
  // 获取所有关注本公众号的人
  [TYPES.GET_ALL_ATTENTION_INFO](state,payload){
    let {allAttentionUserList,currentTableList} =state
    allAttentionUserList = allAttentionUserList.concat(payload)
    state.allAttentionUserList = allAttentionUserList
    state.currentTableList = allAttentionUserList
  },
  // 获取黑名单
  [TYPES.GET_BLACK_LIST](state,payload){

    let {data:{user_info_list}} = payload
    state.blackList  = user_info_list

    state.currentTableList = user_info_list
  }
}