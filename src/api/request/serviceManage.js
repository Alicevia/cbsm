import axios from '../axios'

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