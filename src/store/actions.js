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
    // 用户手机密码登陆
    // async getPhoneLogin({ commit }, data) {
    //     let result = await allReq.reqPhoneLogin(data)
    //     if (result.data) {
    //         localStorage.getItem('user-token')
    //         commit(TYPES.DELETE_USRE_TOKEN)
    //         return Promise.resolve(true)
    //     }
            
        
        
    // },
    //用户微信登陆之前用appid与openid换取usertoken
    // async getUserToken({ commit }, data) {
    //     let {succeed} = await allReq.reqWeChatLogin(data)
    //     if (succeed) {
    //         let userToken = localStorage.getItem('user-token')
    //         commit(TYPES.RECEIVE_USER_TOKEN, { userToken })
    //     }

    // },
    //用户信息获取
    async getUserInfo({ commit }) {
        let result =await allReq.reqUserInfo()
        if (result.succeed) {
            let data = result.data
            commit(TYPES.RECEIVE_USER_INFO, { data })
        }
    },
    //获取公众号信息
    async getWeChatAuthInfo({commit}){
        let {data,code,succeed} = await allReq.reqWeChatAuthInfo()
        if(succeed && data.id!==null){
            commit(TYPES.RECEIVE_WECHAT_AUTH_INFO,{data})
        }
    },
    // 更新公众号信息
    modiWeChatInfo({commit},data){
        // console.log(data)
        commit(TYPES.MODI_WECHAT_INFO,{data})
    },
    // 图片显示
    // modiWeChatImg({commit},data){
    //     commit(TYPES.MODI_WECHA_IMG,{data})
    // },
    // 查询阿里短信认证权限
    async getAliMessageAuth({commit}){
        let result = await allReq.reqMessageAuth()
        if (result.succeed) {
            let data = result.data
            commit(TYPES.ALI_MESSAGE_AUTH,{data})
        }
    },
    //查询短信服务信息
    async getFindMessage({commit},data){
        let result = await allReq.reqMessageAuth()
        if (result.succeed) {
            let data = result.data
            commit(TYPES.ALI_MESSAGE_INFO,{data})
        }else {
            Message.error('微信授权后可使用阿里短信业务')
        }
    },
    // 修改阿里短信服务
    modiAliMessageInfo({commit},data){
        commit(TYPES.MODI_ALI_MESSAGE_INFO,{data})
    }



}