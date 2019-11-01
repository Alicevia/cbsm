import axios from '../axios'
// ------------------服务管理页面
// 获取分类列表
export const reqGroupInfo = ()=>axios({
  url:'manage/groupInformation',
  flag:false
})
// 获取某个分类具体数据
export const reqGroupItemInfo=(data)=>{
  return axios({
    url:`manage/managementInformation/${data.id}`,
    data
  })
}
// 获取所有分类的具体数据
export const reqAllGroupInfo=(data)=>{
  return axios({
    url:`manage/managementInformation/0`,
    data
  })
}
// 开通服务
export const reqOpenService=(data)=>axios({
  url:'manage/openingService',
  data,
  type:'POST',
  flag:false
})

//-------------------- 用户管理页面
// 获取申请开通服务的用户信息
export const reqApplyOpenServiceUserList = (data)=>axios({
  url:'manage/userSubscription',
  data
})
// 获取某个意向用户的待审核数据
export const reqUserAudit = (data)=>axios({
  url:'manage/examineStatusNews',
  data
})
//管理员同意用户开通请求
export const reqAuditPass = (data)=>axios({
  url:'manage/auditPass',
  data,
  type:'PUT'
})