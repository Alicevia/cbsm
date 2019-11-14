import {axios1 as axios ,ajax} from '../axios'


// 获取微信accesstoken
export const reqWeChatAccessToken = ()=>axios({
  url:'manage/customerAccessToken'
})

// 获取存在凝聚数据库微信菜单
export const reqUserWeChatMenus = ()=>axios({
  url:'manage/menuInformation',
  flag:false
})

// 将本地菜单同步到服务器
export const reqBatchEditMenus = (data)=>{
  return axios({
    url:'manage/batchEditMenu',
    data,
    type:'POST',
    flag:false
  })
}

// 微信生成菜单 获取到后端的传递的menu之后调用微信生成菜单接口实现 微信菜单更新
export const reqCreateWeChatMenus = ()=>axios({
  url:'manage/createMenu',
  type:'POST',
  flag:false
})

// 创建微信服务器的菜单
export const reqCreateOriginalWeChatMenus = (data)=>{
  let token = data.access_token
  delete data.access_token
  console.log(store)
  return ajax({
    url:`cgi-bin/menu/create?access_token=${token}`,
    data,
    method:'post',
    flag:false
  })
}