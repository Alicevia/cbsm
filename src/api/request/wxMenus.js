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

// 获取微信菜单

// 微信生成菜单

// 微信删除菜单

// 编辑微信菜单
