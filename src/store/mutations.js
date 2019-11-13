import * as TYPES from './mutations-types'
import utils from 'src/utils'
export default {
  // [TYPES.RECEIVE_ADDRESS](state,{address}){
  //     state.address = address
  // },
  [TYPES.DELETE_USRE_TOKEN](state) {
    state.userToken = ''
  },
  [TYPES.RECEIVE_USER_TOKEN](state, { userToken }) {
    state.userToken = userToken
  },
  [TYPES.RECEIVE_USER_INFO](state, { data }) {
    state.userInfo = data
  },
  [TYPES.RECEIVE_WECHAT_AUTH_INFO](state, { data }) {
    state.weChatInfo = data
  },
  // [TYPES.MODI_WECHA_IMG](state,{data}){
  //     state.weChatInfo = data
  // },
  [TYPES.ALI_MESSAGE_AUTH](state, { data }) {
    state.aliId = data.id

  },
  [TYPES.ALI_MESSAGE_INFO](state, { data }) {
    state.aliMessageInfo = data
  },
  [TYPES.MODI_ALI_MESSAGE_INFO](state, { data }) {
    let keys = Object.keys(data)
    state.aliMessageInfo[keys[0]] = data[keys[0]]
    state.aliMessageInfo = JSON.parse(JSON.stringify(state.aliMessageInfo))
  },
  [TYPES.MODI_WECHAT_INFO](state, { data }) {
    let keys = Object.keys(data)
    state.weChatInfo[keys[0]] = data[keys[0]]

    state.weChatInfo = JSON.parse(JSON.stringify(state.weChatInfo))

  },
  //获取分类别
  [TYPES.GET_GROUP_INFO](state, data) {
    state.groupInformation = data
  },
  //获取每个分类的数据
  [TYPES.GET_GROUP_ITEM_INFO](state, { data, id, page }) {
    let { groupInformation } = state
    groupInformation = groupInformation.map((item) => {
      if (item.id === id) {
        if (!item['allPage']) {
          item['allPage'] = {}
          item['allPage'][page] = data.list
        } else {
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
  [TYPES.SAVE_SERVICE_INFO](state, data) {
    let keys = Object.keys(data)
    let { activeServiceInfo } = state
    keys.forEach(item => {
      activeServiceInfo[item] = data[item]
    })
    state.activeServiceInfo = activeServiceInfo
  },
  [TYPES.MODI_SHOW_CURRENT](state, data) {
    state.showCurrent = data
  },
  [TYPES.MODI_SERVICE_STATUS](state, status) {
    let { groupInformation } = state
    let { index, page, manageId } = status
    let ary = groupInformation[index].allPage[page]
    console.log(ary)
    ary.forEach(item => {
      if (item.id === manageId) {
        console.log(item)
        item.status = 2

      }
    })
  },
  // 用户管理页面--------------------------
  // 获取所有意向用户
  [TYPES.GET_APPLY_SERVICE_USER_LIST](state, data) {
    let ary = utils.changeAry(data, 3)
    state.applyServiceUserList = ary
  },
  // 更新当前选中的意向用户
  [TYPES.SAVE_ACTIVE_INTENTION_USER_ID](state, payload) {
    state.activeIntentionUser = payload
  },
  // 更新用户的备注
  [TYPES.MODI_USER_REMARK](state, payload) {

    let { id, page, index, remark } = payload
    let { applyServiceUserList } = state
    try {
      applyServiceUserList[page][index].remark = remark
    } catch (error) {
      console.log(error)
    }

    state.applyServiceUserList = applyServiceUserList
  },
  // 获取某个意向用户的所有待审核信息
  [TYPES.GET_USER_AUDIT](state, payload) {
    let { activeIntentionUser, allAuditService } = state
    let { id } = activeIntentionUser
    if (payload) {
      let ary = utils.changeAry(payload, 3)
      state.currentAudit = ary
      allAuditService[id] = ary
    } else {
      state.currentAudit = []
      allAuditService[id] = []
    }

  },
  // 更新用户的待审核信息
  [TYPES.UPDATE_USER_AUDIT_INFO](state, data) {
    let { id, currentPage, auditId, time = null, status = null } = data
    let { allAuditService, currentAudit } = state
    allAuditService[id][currentPage].forEach(item => {
      if (item.id === auditId) {
        if (time) {
          item.expirationDate = time
        }
        if (status !== null) {
          item.status = status
        }
      }
    })
    state.currentAudit = JSON.parse(JSON.stringify(allAuditService[id]))
    state.allAuditService = JSON.parse(JSON.stringify(allAuditService))
  },

  // 更新正在显示的待审核信息
  [TYPES.UPDATE_CURRENT_AUDIT](state, data) {
    state.currentAudit = data
  },
  // 获取所有服务的信息
  [TYPES.GET_ALL_SERVICE_DEVICE](state, data) {
    let { id } = state.activeIntentionUser
    let { allServiceDevice } = state
    allServiceDevice[id] = data
    state.allServiceDevice = JSON.parse(JSON.stringify(allServiceDevice))
    // state.allServiceDevice = utils.changeAry(data,3)
  },
  // 更新个人下所有的服务信息
  [TYPES.UPDATE_ALL_SERVICE_DEVICE](state, data) {
    let { allServiceDevice } = state
    let { id, time, auditId, status = null } = data
    console.log(time, status)
    allServiceDevice[id].forEach(item => {
      if (item.id === auditId) {
        if (time) {
          item.expirationDate = time
        }
        if (status !== null) {
          item.status = status
        }
      }
    })
    state.allServiceDevice = JSON.parse(JSON.stringify(allServiceDevice))
  },

  // 微信自定义菜单页面-------------------------------------------
  // 获取wxaccesstoken
  [TYPES.GET_WE_CHAT_ACCESSTOKEN](state, data) {
    state.weChatAccessToken = data
  },
  // 删除公众号微信菜单
  [TYPES.DELETE_USER_WE_CHAT_MENUS](state, payload) {
    let { weChatMenus } = state
    let { parentId, currentId,id } = payload
    
    if (currentId !== 0) {//删除的是父
      weChatMenus.forEach((item, index) => {
        if (item.currentId === currentId) {
          weChatMenus.splice(index, 1)
        }
      })
    } else {
      for (let i = 0; i < weChatMenus.length; i++) {
        const item = weChatMenus[i];
        if (item.childrenResponse) {
          let children = item.childrenResponse
          children.forEach((value, index) => {
            if (value.id === id) {
              console.log(id)
              children.splice(index, 1)
            }
          })
        }
      }
      state.weChatMenus = JSON.parse(JSON.stringify(weChatMenus))
    }
  },
  // 获取用户在凝聚的wx菜单
  [TYPES.GET_USER_WE_CHAT_MENUS](state, data) {
    // console.log(data)
    state.weChatMenus = data
  },
  // 添加菜单
  [TYPES.ADD_USER_WE_CHAT_MENUS](state, payload) {
    let { weChatMenus } = state
    let { parentId } = payload
    if (parentId === 0) {//添加的是父
      weChatMenus.push(payload)
    } else {//添加的是子
      weChatMenus = weChatMenus.map(item => {
        if (item.currentId === parentId) {
          if (!item.childrenResponse) {
            item.childrenResponse = []
            item['childrenResponse'] = []
          }
          // console.log(item)
          item.childrenResponse.push(payload)

        }
        // console.log(item)
        return item
      })
      // console.log(weChatMenus)
      state.weChatMenus = weChatMenus
    }
  },
  // 更新微信菜单
  [TYPES.UPDATE_USER_WE_CHAT_MENUS](state,payload){
    let { weChatMenus } = state
    let { parentId,currentId,id } = payload
    // console.log('payload',payload)
    if (currentId !== 0) {//更新的是父
      weChatMenus = weChatMenus.map((item, index) => {
        // console.log(item.currentId,currentId)
        if (item.currentId === currentId) {
          for (const key in payload) {
            if (!item.hasOwnProperty(key)) return
            console.log(item)
            item[key]=payload[key]
          }
        }
        return item
      })
      // console.log('wechat',weChatMenus)
      // state.weChatMenus = JSON.parse(JSON.stringify(weChatMenus))
    }else{
      weChatMenus.forEach(item=>{
        if (item.currentId===parentId) {
          item.childrenResponse.forEach((value,index)=>{
            if (value.id===id) {
              item.childrenResponse.splice(index,1,payload)
            }
          })
        }
      })
      state.weChatMenus = JSON.parse(JSON.stringify(weChatMenus))
    }
  }




}
