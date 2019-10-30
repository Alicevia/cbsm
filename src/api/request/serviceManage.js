import axios from '../axios'
// ------------------服务管理页面
// 获取分类列表
export const reqGroupInfo = ()=>axios({
  url:'manage/groupInformation',
  flag:false
})
// 获取分类具体数据
export const reqGroupItemInfo=(data)=>{
  return axios({
    url:`manage/managementInformation/${data.id}`,
    data:{
      page:data.page,
      size:data.size
    }
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