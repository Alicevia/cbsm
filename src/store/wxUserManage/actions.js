import * as TYPES from '../mutations-types'
import * as allReq from 'src/api'
import { Message } from 'element-ui'
import utils from 'src/utils'

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
function showErrorMessage(code,message='本页',custom='获取信息失败') {
  switch (code) {
    case -1:
      Message.error('系统繁忙，请稍后再试')
      break;
    case 45157:
      Message.error('标签名非法，请注意不能和其他标签重名')
      break;
    case 48001:
      Message.error('您暂时没有权限获取'+message+'信息')
      break;
    case 45158:
      Message.error('标签名长度超过30个字节')
      break;
    case 45056:
      Message.error('创建的标签数过多，请注意不能超过100个')
      break;
    default:
      Message.error(custom)
      break;
  }
}

export default {
  // 获取微信标签
  async getWeChatLabel({ commit }) {
    let result = await allReq.reqAllLabel()
    if (result.data.errcode===0||!result.data.errcode) {
      commit(TYPES.GET_WE_CHAT_LABEL, result.data.tags)
    } else {
      showErrorMessage(result.data.errcode,'微信标签','获取微信标签信息失败')
    }
  },
  // 添加标签
  async addWeChatLabel({ commit }, payload) {

    let result = await allReq.reqCreateLabel(payload)

    if (result.status === 200 && !result.data.errcode) {
      commit(TYPES.ADD_WE_CHAT_LABEL, result.data.tag)
    } else {
      showErrorMessage(result.data.errcode)
    }
  },
  // 修改标签
  async modiWeChatLabel({ commit }, payload) {
    let result = await allReq.reqEditLabel(payload)
    if (result.data.errcode === 0) {
      commit(TYPES.MODI_WE_CHAT_LABEL, payload)
    } else {
      showErrorMessage(result.data.errcode)
    }
  },
  // 获取某个标签下的粉丝列表
  async getLableGategoryUser({ commit }, payload) {
    let { tagid } = payload
    let result = await allReq.reqSomeLabelUserList(payload)
    if (result.status === 200 && result.data.count !== 0) {
      let user_list = result.data.data.openid
      user_list = user_list.map(item => ({ 'openid': item }))

      let result2 = await allReq.reqBatchReceiveUserInfo({ user_list })
      if (result2.status === 200) {
        commit(TYPES.GET_SOME_LABEL_USER, { tagid, data: result2.data.user_info_list })
      } else {
        Message.error('获取标签下户信息出错')
      }
    } else {
      commit(TYPES.GET_SOME_LABEL_USER, { tagid, data: [] })
    }

  },
  // 获取所有关注用户的信息
  async getAllAttentionUser({ commit }, payload) {
    let { flag } = payload
    let result = await allReq.reqBatchReceiveOpenId()
    console.log(result)

    if (!result.data.errcode) {
      let user_list = result.data.data.openid
      user_list = user_list.map(item => ({ 'openid': item })) || []
      let newAry = utils.changeAry(user_list, 100)
      if (newAry.length === 0) {
        Message.warning('该公众号没有被任何用户关注')
        return
      }
      let resultAll = await Promise.all(newAry.map(user_list => {
        return allReq.reqBatchReceiveUserInfo({ user_list })
      }))
      if (resultAll[0]) {
        let user_info_list = []
        resultAll.forEach(item => {
          user_info_list = user_info_list.concat(item.data.user_info_list)
        })
        commit(TYPES.GET_ALL_ATTENTION_INFO, { payload: user_info_list, flag })
      } else {
        Message.error('获取用户信息出错')
      }

    } else {
     showErrorMessage(result.data.errcode,undefined,'获取用户openid出错')
    }
  },
  // 展示未分组
  showUnGroup({ commit, getters }) {
    let { unGroupUserList } = getters
    commit(TYPES.CHANGE_CURRENT_LIST, unGroupUserList)
  },
  // 展示搜索列表
  showSearchList({ commit, state }, payload) {
    state.searchList = payload
    commit(TYPES.CHANGE_CURRENT_LIST, payload)
  },
  // 显示用户选择的列表
  showUserSelect({ commit, state, getters, dispatch }, payload) {
    let unGroupUserList = getters.unGroupUserList
    let data
    if (typeof payload === 'number') {
      dispatch('getLableGategoryUser', { tagid: payload })
    } else {
      switch (payload) {
        case '未分组':
          data = unGroupUserList
          break;
        case '黑名单':
          data = state.blackList
          break;
        case '搜索':
          data = state.searchList
          break;
      }
      commit(TYPES.CHANGE_CURRENT_LIST, data)
    }

  },
  // 批量操作用户的标签
  async batchUserLabel({ commit }, payload) {
    let result = await allReq.reqDivideUser(payload)
    if (result.data.errcode !== 0) {
      Message.error('用户打标签失败')
    }
  },
  // 批量取消用户标签
  async batchCancelUserLabel({ commit }, payload) {
    let result = await allReq.reqCancelDivideUser(payload)
    if (result.data.errcode !== 0) {
      Message.error('取消用户标签失败')
    }
  },
  // 获取黑名单用户
  async getBlackListUser({ commit }, payload) {
    let { flag = '' } = payload
    let result = await allReq.reqBlackListUserInfo()
    if (result.data.errcode===0||!result.data.errcode) {
      if (result.data.count === 0) {
        
        commit(TYPES.GET_BLACK_LIST, { data: {}, flag: 'empty' })
      } else {
     
        batchUserInfo(result, (data) => {
          commit(TYPES.GET_BLACK_LIST, { data, flag })
        })
      }

    } else {
        showErrorMessage(result.data.errcode,'黑名单','获取黑名单openid失败')
    }
  },
  // 批量拉黑用户
  async batchUserToBlackList({ commit }, payload) {
    let result = await allReq.reqBatchUserIntoBlackList(payload)
    if (result.data.errcode !== 0) {
      Message.error('拉黑用户失败')
    }
  },
  // 批量取消拉黑用户
  async batchUserOutBlackList({ }, payload) {
    let result = await allReq.reqBatchUserOutBlackList(payload)
    if (result.data.errcode !== 0) {
      Message.error('取消用户黑名单失败')
    }
  }

}