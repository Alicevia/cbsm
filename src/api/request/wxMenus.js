import {axios1 as axios ,ajax} from '../axios'

// 获取微信accesstoken
export const reqWeChatAccessToken = ()=>axios({
  url:'manage/customerAccessToken'
})
// 获取用户本来的wx菜单
// export const reqUserOriginalWeChatMenus = (data)=>ajax({//注意：此接口优先获取获取用户个性化菜单，
//   url:`cgi-bin/menu/get`,
//   data
// })
// export const reqUserOriginalWeChatMenus = (data)=>ajax({
//   url:`cgi-bin/get_current_selfmenu_info`,
//   data
// })
// 



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

// 微信生成菜单 获取到后端的传递的menu之后调用微信生成菜单接口实现 微信菜单更新
export const reqCreateWeChatMenus = ()=>axios({
  url:'manage/createMenu',
  type:'POST',
  flag:false
})


// 更新微信的菜单
export const reqCreateOriginalWeChatMenus = (data)=>{
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