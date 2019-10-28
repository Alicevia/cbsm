import * as TYPES from './mutations-types'

export default {
    // [TYPES.RECEIVE_ADDRESS](state,{address}){
    //     state.address = address
    // },
    [TYPES.DELETE_USRE_TOKEN](state){
        state.userToken=''
    },
    [TYPES.RECEIVE_USER_TOKEN](state,{userToken}){
        state.userToken = userToken
    },
    [TYPES.RECEIVE_USER_INFO](state,{data}){
        state.userInfo = data
    },
    [TYPES.RECEIVE_WECHAT_AUTH_INFO](state,{data}){
        state.weChatInfo = data
    },
    // [TYPES.MODI_WECHA_IMG](state,{data}){
    //     state.weChatInfo = data
    // },
    [TYPES.ALI_MESSAGE_AUTH](state,{data}){
        state.aliId = data.id
  
    },
    [TYPES.ALI_MESSAGE_INFO](state,{data}){
        state.aliMessageInfo = data
    },
    [TYPES.MODI_ALI_MESSAGE_INFO](state,{data}){
        let keys = Object.keys(data)
        state.aliMessageInfo[keys[0]] =data[keys[0]]
        state.aliMessageInfo = JSON.parse(JSON.stringify(state.aliMessageInfo))
    },
    [TYPES.MODI_WECHAT_INFO](state,{data}){
        let keys = Object.keys(data)
        state.weChatInfo[keys[0]] =data[keys[0]]

        state.weChatInfo = JSON.parse(JSON.stringify(state.weChatInfo))

    },
    //获取分类别
    [TYPES.GET_GROUP_INFO](state,data){
      state.groupInformation=data
    },
    //获取每个分类的数据
    [TYPES.GET_GROUP_ITEM_INFO](state,{data,id,page}){
      let {groupInformation} = state
      groupInformation.forEach((item,index)=>{
        if(item.id===id){
          if (item['list']) {
            item['list'].concat(data.list)
          }else{
            item['list'] = data.list
            item['total'] = data.total
          }
        }
      })
      state.showCurrent = data.list
      console.log(state.showCurrent)
    }

}
