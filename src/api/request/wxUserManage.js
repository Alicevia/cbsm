import { axios1 as axios, ajax } from '../axios'
import store from 'src/store'

// 标签类-----------------------------
//获取已经创建的所有标签分组
export const reqAllLabel = () => {
  return ajax({
    url: `cgi-bin/tags/get?access_token=${store.state.weChatAccessToken}`,
  })
}

// 创建标签分组
export const reqCreateLabel = (data) => {
  let token = data.access_token
  delete data.access_token
  return ajax({
    url: `cgi-bin/tags/create?access_token=${token}`,
    data,
    method:'post',
    flag:false

  })
}

// 编辑标签分组
export const reqEditLabel = (data) => {
  let token = data.access_token
  delete data.access_token
  return ajax({
    url: `cgi-bin/tags/update?access_token=${token}`,
    data,
    method:'post',
    flag:false
  })
}

// 删除标签分组
export const reqDeleteLabel = (data) => {
  let token = data.access_token
  delete data.access_token
  return ajax({
    url: `cgi-bin/tags/delete?access_token=${token}`,
    data,
    method:'post',
    flag:false
  })
}

// 获取标签下的粉丝列表
export const reqLabelUserList = (data) => {
  let token = data.access_token
  delete data.access_token
  return ajax({
    url: `cgi-bin/user/tag/get?access_token=${token}`,
    data,
    method:'post',
    flag:false
  })
}

// 批量对用户进行分组
export const reqDivideUser = (data) => {
  let token = data.access_token
  delete data.access_token
  return ajax({
    url: `cgi-bin/tags/members/batchtagging?access_token=${token}`,
    data,
    method:'post',
    flag:false
  })
}

// 批量对用户取消分组
export const reqCancelDivideUser = (data) => {
  let token = data.access_token
  delete data.access_token
  return ajax({
    url: `cgi-bin/tags/members/batchuntagging?access_token=${token}`,
    data,
    method:'post',
    flag:false
  })
}

// 批量获取用户 openid
export const reqBatchReceiveOpenId = (data) => {
  return ajax({
    url: `cgi-bin/user/get?access_token=${store.state.weChatAccessToken}`,
    data,
  })
}


// 批量获取用户基本信息by openid
export const reqBatchReceiveUserInfo = (data) => {
  return ajax({
    url: `cgi-bin/user/info/batchget?access_token=${store.state.weChatAccessToken}`,
    data,
    method:'post',
    flag:false
  })
}



//获取公众号黑名单列表
export const reqBlackListUserInfo = (data) => {
  let token = data.access_token
  delete data.access_token
  return ajax({
    url: `cgi-bin/tags/members/getblacklist?access_token=${token}`,
    data,
    method:'post',
    flag:false
  })
}

// 批量将用户拉进黑名单
export const reqBatchUserIntoBlackList = (data) => {
  let token = data.access_token
  delete data.access_token
  return ajax({
    url: `cgi-bin/tags/members/batchblacklist?access_token=${token}`,
    data,
    method:'post',
    flag:false
  })
}

// 取消用户黑名单
export const reqBatchUserOutBlackList = (data) => {
  let token = data.access_token
  delete data.access_token
  return ajax({
    url: `cgi-bin/tags/members/batchunblacklist?access_token=${token}`,
    data,
    method:'post',
    flag:false
  })
}