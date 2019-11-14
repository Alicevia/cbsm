import * as TYPES from '../mutations-types'
export default {
  [TYPES.GET_ALL_ATTENTION_INFO](state,payload){
    let allAttentionUserList =state.allAttentionUserList
    allAttentionUserList = allAttentionUserList.concat(payload)
    state.allAttentionUserList = allAttentionUserList
  }
}