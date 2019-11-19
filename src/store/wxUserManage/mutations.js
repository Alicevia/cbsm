import * as TYPES from '../mutations-types'
export default {
  // 标签的获取
  [TYPES.GET_WE_CHAT_LABEL](state,payload){
    state.labelList = payload
  },
  // 添加标签
  [TYPES.ADD_WE_CHAT_LABEL](state,payload){
    let {labelList} = state
    labelList.push(payload)
  },
  // 修改标签
  [TYPES.MODI_WE_CHAT_LABEL](state,payload){
    let {tag:{id,name}} = payload
    let {labelList} = state
    labelList = labelList.map(item=>{
      if (item.id===id) {
        item.name = name
      }
      return item
    })
    state.labelList = labelList
  },
  // 获取某标签下的用户
  [TYPES.GET_SOME_LABEL_USER](state,payload){
    let {labelCagegoryUser} = state
    let {tagid,data} = payload
    if (data.length===0) {
      
      state.currentTableList =data
    }else{
      labelCagegoryUser[tagid] = data
      state.currentTableList = data
    }

  },
  // 获取所有关注本公众号的人
  [TYPES.GET_ALL_ATTENTION_INFO](state,data){
    let {flag,payload} =data
    let {allAttentionUserList,currentTableList} =state
    if (flag==='init') {
      allAttentionUserList = payload
      state.allAttentionUserList = allAttentionUserList
      // state.currentTableList = allAttentionUserList
    }else{
      state.currentTableList = allAttentionUserList
    }

  },
  // 显示未分组下的人
  [TYPES.CHANGE_CURRENT_LIST](state,data){
    state.currentTableList =data
  },
  // 获取黑名单
  [TYPES.GET_BLACK_LIST](state,payload){
    let {data:{user_info_list=[]},flag} = payload
    let {blackList} = state
    if (flag==='init') {
      state.blackList  = user_info_list
    }else if (flag==='empty') {
      state.blackList = []
      state.currentTableList = blackList
    }else{
      state.currentTableList = blackList
    }
  }
}