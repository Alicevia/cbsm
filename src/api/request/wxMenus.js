import {axios1 as axios ,ajax} from '../axios'

// 获取微信accesstoken
export const reqWeChatAccessToken = ()=>axios({
  url:'manage/customerAccessToken'
})
// 获取用户本来的wx菜单
export const reqUserOriginalWeChatMenus = (data)=>ajax({
  url:`cgi-bin/get_current_selfmenu_info`,
  data
})
// 更新用户公众号
export const reqModiOriginalWeChatMenus = (data)=>{
  console.log(data)

  let token = data.access_token
  delete data.access_token
  return ajax({
    url:`cgi-bin/menu/create?access_token=${token}`,
    data,
    method:'post',
    flag:false
  })
}


// 获取微信菜单
export const reqUserWeChatMenus = ()=>axios({
  url:'manage/menuInformation'
})

// 编辑微信菜单
export const reqEditWeChatMenus = (data)=>axios({
  url:'manage/editMenu',
  data,
  type:'POST',
  flag:false
})


// 微信删除菜单
export const reqDeleteWeChatMenus = (data)=>axios({
  url:`manage/createMenu/${data.id}`,
  type:'DELETE',
  flag:false
})

// 微信生成菜单
export const reqCreateWeChatMenus = ()=>axios({
  url:'manage/createMenu',
  type:'POST',
  flag:false
})


