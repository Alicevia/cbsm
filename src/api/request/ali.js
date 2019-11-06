// import axios from '../axios'
import { axios1 as axios,ajax} from '../axios'

// 阿里云短信页面--------------------------------------------------------------
export const reqMessageAuth = ()=>axios({
  url:'/ali/message/findMessage',
  flag:false
})
//阿里云短信修改
export const reqModiAliMessage = (data)=>axios({
  url:'ali/message/updateMessage',
  data,
  type:'POST',
  flag:false
})