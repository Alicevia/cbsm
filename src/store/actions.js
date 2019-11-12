import * as TYPES from './mutations-types'
import * as allReq from '../api'
import { Message } from 'element-ui'

export default {
  // recordUser({commit,state},userInfo){

  //     commit(TYPES.RECEIVE_USER_INFO,{userInfo})
  // },
  // async getUserLogout(){
  //     let result = await allReq.reqLogout()
  //     return Promise.resolve(result)
  // },
  // 删除usertoken
  deleteUserToken({ commit }) {
    commit(TYPES.DELETE_USRE_TOKEN)
  },
  //保存userToken
  getUserToken({ commit }, userToken) {
    commit(TYPES.RECEIVE_USER_TOKEN, { userToken })
  },
  //用户信息获取
  async getUserInfo({ commit }) {
    let result = await allReq.reqUserInfo()
    if (result.succeed) {
      let data = result.data
      commit(TYPES.RECEIVE_USER_INFO, { data })
    }
  },
  //获取公众号信息
  async getWeChatAuthInfo({ commit }) {
    let { data, code, succeed } = await allReq.reqWeChatAuthInfo()
    if (succeed && data.id !== null) {
      commit(TYPES.RECEIVE_WECHAT_AUTH_INFO, { data })
    }
  },
  // 更新公众号信息
  modiWeChatInfo({ commit }, data) {
    // console.log(data)
    commit(TYPES.MODI_WECHAT_INFO, { data })
  },
  // 图片显示
  // modiWeChatImg({commit},data){
  //     commit(TYPES.MODI_WECHA_IMG,{data})
  // },
  // 查询阿里短信认证权限
  async getAliMessageAuth({ commit }) {
    let result = await allReq.reqMessageAuth()
    if (result.succeed) {
      let data = result.data
      commit(TYPES.ALI_MESSAGE_AUTH, { data })
    }
  },
  //查询短信服务信息
  async getFindMessage({ commit }, data) {
    let result = await allReq.reqMessageAuth()
    if (result.succeed) {
      let data = result.data
      commit(TYPES.ALI_MESSAGE_INFO, { data })
    } else {
      Message.error('微信授权，初始化信息后可使用阿里短信业务')
    }
  },
  // 修改阿里短信服务
  modiAliMessageInfo({ commit }, data) {
    commit(TYPES.MODI_ALI_MESSAGE_INFO, { data })
  },
  //--------------------------------服务管理
  //获取服务分组类别
  async getGroupInfo({ commit }) {
    let result = await allReq.reqGroupInfo()
    if (result.succeed) {
      let data = result.data
      commit(TYPES.GET_GROUP_INFO, data)
    } else {
      Message.error('设备分组类别获取失败')
    }

  },
  //获取每组服务的具体数据
  async getGroupItemInfo({ commit }, payload) {
    let { id, page, size } = payload
    console.log(payload)
    let result = await allReq.reqGroupItemInfo(payload)
    console.log(result)
    if (result.succeed) {
      let data = result.data
      commit(TYPES.GET_GROUP_ITEM_INFO, { data, id, page })
    } else {
      Message.error('获取设备分组具体数据失败')
    }
  },
  //保存当前请求的服务类的信息 
  saveServiceInfo({ commit }, data) {
    commit(TYPES.SAVE_SERVICE_INFO, data)
  },
  // 展示最新的数据
  modiShowCurrent({ commit }, data) {
    commit(TYPES.MODI_SHOW_CURRENT, data)
  },
  //开通服务成功后修改状态status
  modiServiceStatus({ commit }, status) {
    // console.log(status)
    commit(TYPES.MODI_SERVICE_STATUS, status)
  },

  //用户管理页面----------------------------------
  // 申请开通服务的用户列表
  async getApplyOpenServiceUserList({ commit }, data) {
    let result = await allReq.reqApplyOpenServiceUserList(data)
    // console.log(result)
    if (result.succeed) {
      commit(TYPES.GET_APPLY_SERVICE_USER_LIST, result.data.list)
    }
  },
  // 更新当前选中的意向用户
  saveActiveIntentionUserId({ commit }, payload) {
    commit(TYPES.SAVE_ACTIVE_INTENTION_USER_ID, payload)
  },
  // 更新选中用户的备注信息
  modiUserRemark({ commit }, payload) {
    commit(TYPES.MODI_USER_REMARK, payload)
  },
  // 获取某个用户的待审核信息
  async getUserAudit({ commit }, data) {
    let result = await allReq.reqUserAudit(data)
    if (result.succeed) {
      commit(TYPES.GET_USER_AUDIT, result.data.list)
    } else {
      Message.warning('信息获取失败')
    }
  },
  // 更新正在显示的待审核信息
  updateCurrentAudit({ commit }, payload) {
    commit(TYPES.UPDATE_CURRENT_AUDIT, payload)
  },
  //更新意向用户下的待处理信息
  updateUserAuditInfo({ commit }, data) {
    commit(TYPES.UPDATE_USER_AUDIT_INFO, data)
  },



  // 获取到所有种类的服务
  async getAllServiceDevice({ commit }, data) {
    let result = await allReq.reqAllGroupInfo(data)
    // console.log(result)
    if (result.succeed) {
      commit(TYPES.GET_ALL_SERVICE_DEVICE, result.data.list)
    } else {
      Message.error('获取所有种类服务失败')
    }
  },
  // 更新某个人的所有种类服务的信息
  updateAllServiceDevice({ commit }, data) {
    commit(TYPES.UPDATE_ALL_SERVICE_DEVICE, data)
  },



  // 微信自定义菜单页面-------------------------------------------
  // 获取用户的accesstoken
  async getWeChatAccessToken({ commit }) {
    let result = await allReq.reqWeChatAccessToken()
    // console.log(result)
    if (result.code === 0) {
      commit(TYPES.GET_WE_CHAT_ACCESSTOKEN, result.data)
    } else {
      // Message.warning('请先在公众号设置内微信扫码授权')
    }
  },

  // 获取用户存在数据库的wx菜单
  async getUserWeChatMenu({ commit }) {
    let result = await allReq.reqUserWeChatMenus()
    if (result.succeed) {
      commit(TYPES.GET_USER_WE_CHAT_MENUS, result.data.buttonResponses)
    }
  },
  //  新建数据库的wx菜单
   addUserWeChatMenu({ commit }, payload) {
    if (payload.menuType === 'CLICK') {
      payload.url = ''
    } else if (payload.menuType === 'VIEW') {
      payload.keyWord = ''
    }
    commit(TYPES.ADD_USER_WE_CHAT_MENUS, payload)

  },
  // 更新微信菜单
  updateUserWeChatMenu({commit},payload){
    if (payload.menuType === 'CLICK') {
      payload.url = ''
    } else if (payload.menuType === 'VIEW') {
      payload.keyWord = ''
    }
    console.log('-',payload)
    commit(TYPES.UPDATE_USER_WE_CHAT_MENUS,payload)
  },
  // 删除用户本地的某条菜单
  deleteUserWeChatMenu({ commit }, payload) {
    commit(TYPES.DELETE_USER_WE_CHAT_MENUS, payload)
  },

  //获得格式化后的微信菜单并且传到微信服务器
  async createFormatWeChatMenu({state}){
    let {weChatAccessToken} = state
    let result = await allReq.reqCreateWeChatMenus()
    console.log(result)
    let result2  = await allReq.reqCreateOriginalWeChatMenus({
      access_token:weChatAccessToken,
      button:result.data.button
    })
    console.log(result2)

  }





}