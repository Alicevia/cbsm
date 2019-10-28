import axios from '../axios'

// 获取分类列表
export const reqGroupInfo = ()=>axios({
  url:'manage/groupInformation',
  flag:false
})
// 获取分类具体数据
export const reqGroupItemInfo=(data)=>axios({
  url:`manage/managementInformation/${data.id}`,
  flag:false
})
