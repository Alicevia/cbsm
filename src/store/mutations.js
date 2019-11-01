import * as TYPES from './mutations-types'
import utils from 'src/utils'
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
      groupInformation = groupInformation.map((item)=>{
        if(item.id===id){
          if (!item['allPage']) {
            item['allPage']={}
            item['allPage'][page] = data.list
          }else {
            item['allPage'][page] = data.list
          }
         item.total = data.total
        }
        return item
      })
      state.showCurrent = data.list
      state.groupInformation = groupInformation
    },
    //保存当前正在请求类的信息
    [TYPES.SAVE_SERVICE_INFO](state,data){
      let keys = Object.keys(data)
      let {activeServiceInfo} = state
      keys.forEach(item=>{
        activeServiceInfo[item] = data[item]
      })
      state.activeServiceInfo=activeServiceInfo
    },
    [TYPES.MODI_SHOW_CURRENT](state,data){
      state.showCurrent = data
    },
    [TYPES.MODI_SERVICE_STATUS](state,status){
      let {groupInformation} = state
      let {index,page,manageId} = status
      let ary = groupInformation[index].allPage[page]
      console.log(ary)
      ary.forEach(item=>{
        if (item.id===manageId) {
          console.log(item)
          item.status=2

        }
      })
    },
    // 用户管理页面--------------------------
    // 获取所有意向用户
    [TYPES.GET_APPLY_SERVICE_USER_LIST](state,data){
      let ary = utils.changeAry(data,3)
      state.applyServiceUserList = ary
    },
    // 更新当前选中的意向用户
    [TYPES.SAVE_ACTIVE_INTENTION_USER_ID](state,payload){
      state.activeIntentionUser = payload
    },
    // 更新用户的备注
    [TYPES.MODI_USER_REMARK](state,payload){
      let {id,page,remark} = payload
      let {applyServiceUserList} = state
      applyServiceUserList[page].forEach(item=>{
        if (item.id === id) {
          item.remark = remark
        }
      })
      state.applyServiceUserList = applyServiceUserList
    },
    // 获取某个意向用户的所有待审核信息
    [TYPES.GET_USER_AUDIT](state,payload){
      let {activeIntentionUser,allAuditService} = state
      let {id} = activeIntentionUser
      if (payload) {
        let ary = utils.changeAry(payload,3)
        state.currentAudit = ary
        allAuditService[id] = ary
      }else{
        state.currentAudit=[]
        allAuditService[id]=[]
      }
     
    },
    [TYPES.UPDATE_USER_AUDIT_INFO](state,data){
      let { id,currentPage,auditId,time} = data
      let {allAuditService,currentAudit} = state
      allAuditService[id][currentPage].forEach(item=>{
         if (item.id===auditId) {
           item.expirationDate=time
         }
      })
      state.currentAudit = allAuditService[id]
      state.allAuditService = JSON.parse(JSON.stringify(allAuditService))

    }


}
