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
    async getGroupInfo({commit}){
      let result =await allReq.reqGroupInfo()
      if(result.succeed){
        let data = result.data
        commit(TYPES.GET_GROUP_INFO,data)
      }else {
        Message.error('设备分组类别获取失败')
      }
      
    },
    //获取每组服务的具体数据
    async getGroupItemInfo({commit},payload){
      let {id,page,size} = payload
      let result = await allReq.reqGroupItemInfo(payload)
      if(result.succeed){
        let data = result.data
        commit(TYPES.GET_GROUP_ITEM_INFO,{data,id,page})
      }else {
        Message.error('获取设备分组具体数据失败')
      }
    },
    //保存当前请求的服务类的信息 
    saveServiceInfo({commit},data){
      commit(TYPES.SAVE_SERVICE_INFO,data)
    },
    // 展示最新的数据
    modiShowCurrent({commit},data){
      commit(TYPES.MODI_SHOW_CURRENT,data)
    },
    //开通服务成功后修改状态status
    modiServiceStatus({commit},status){
      console.log(status)
      commit(TYPES.MODI_SERVICE_STATUS,status)
    },

    //用户管理页面----------------------------------
    // 申请开通服务的用户列表
    async getApplyOpenServiceUserList({commit},data){
      let result = await allReq.reqApplyOpenServiceUserList(data)
      if (result.succeed) {
        commit(TYPES.GET_APPLY_SERVICE_USER_LIST,result.data.list)
      }
    },
    // 更新当前选中的意向用户
    getActiveIntentionUserId({commit},payload){
      commit(TYPES.GET_ACTIVE_INTENTION_USER_ID,payload)
    },
    // 获取某个用户的待审核信息
    async getUserAudit({commit},data){
      let result = await allReq.reqUserAudit(data)
      if (result.succeed) {
        console.log(result)
        commit(TYPES.GET_USER_AUDIT,result.data.list)
      }else {
        Message.warning('信息获取失败')
      }
    }
    







}