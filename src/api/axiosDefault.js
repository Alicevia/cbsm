import axios from 'axios'
import router from 'src/router/'
import { Message } from 'element-ui'
import store from '../store'
import qs from 'qs'
// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = 'https://www.baidu.com';} 
// else if (process.env.NODE_ENV == 'debug') {    
//     axios.defaults.baseURL = 'https://www.ceshi.com';
// } 
// else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = 'https://www.production.com';
// }
//axios.defaults.baseURL = 'http://192.168.1.224:8888';//赵小超
//axios.defaults.baseURL = 'http://192.168.50.163:8888';//赵俊
//axios.defaults.baseURL='http://192.168.50.30:8082/'//杨卓
//axios.defaults.baseURL = 'http://iot.cluster-iot.com:7070/gs/';//外网测试
//axios.defaults.baseURL='http://192.168.50.236:8080'; //本地测试
//axios.defaults.baseURL='http://192.168.50.144:8888/monitor-pc-api/'
//axios.defaults.withCredentials = false;// 表示跨域请求时是否需要使用凭证
axios.defaults.baseURL = 'https://www.cluster-dt.com/pcwechat/'
// axios.defaults.baseURL = 'http://www.cluster-dt.com:8082/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.timeout = 10000;
// axios.defaults.transformResponse=[(data) => {
//   //向服务器发送前，修改请求数据
//   //必须返回字符串
//   //只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
//   return JSON.parse(data)
// }]
//请求拦截器
axios.interceptors.request.use(function (config) {
    let userToken = store.state.userToken
    if (userToken) {
        config.headers['user-token'] = userToken;
    }
    // console.log(config)//获取到所有的设置
    return config;
}, function (err) {
  //  console.log(err) 目前没见到可以进来的请求错误 大都是响应出错
    return Promise.reject(err)
});

//响应拦截器设置user-token过期，重新授权
axios.interceptors.response.use(function (response) {
    if (response.data.succeed === false && response.data.code === 401) {//检测所有的响应
        Message.error('用户信息已过期')
        localStorage.removeItem('user-token');
        store.dispatch('deleteUserToken')
        router.replace({ path: '/login' })
        // location.href="http://192.168.50.236:8080/login"
    }//如果返回的数据提示user-token过期 那么会自动跳转到login
    //   console.log('1')先被拦截后传入到你封装的函数中
    if (response.status === 200) {
        if (response.headers['user-token'] && response.data.succeed) {
            let userToken = response.headers['user-token']
            localStorage.setItem('user-token', userToken)
            store.dispatch('getUserToken',userToken)
            // axios.defaults.headers.common['user-token'] = userToken
            // axios.defaults.headers.common['Cache-Control'] = 'no-cache'
        }
    }
    // console.log(response)
    return response
}, error => {
    // console.log('response',error) 会被后面的catch
    console.log(error)
    return Promise.reject(error)
});

// -------------------------------
let instance1 = axios.create({
  baseURL:'',
  // baseURL:'https://www.cluster-dt.com/wx/',
  timeout:10000,

})

instance1.interceptors.request.use(config=>{
  
  let userToken = store.state.userToken
  if (userToken) {
      config.headers['user-token'] = userToken;
  }
  // console.log(config)
  return config
},err=>{
  return Promise.reject(err)
})

instance1.interceptors.response.use(response=>{
  return response
},err=>{
  return Promise.reject(err)
})




export  {axios,instance1};
