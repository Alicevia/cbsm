import axios from 'axios'
import router from 'src/router/'
import { Message } from 'element-ui'
import store from '../store'
// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = 'https://www.baidu.com';} 
// else if (process.env.NODE_ENV == 'debug') {    
//     axios.defaults.baseURL = 'https://www.ceshi.com';
// } 
// else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = 'https://www.production.com';
// }
// axios.defaults.baseURL = 'http://192.168.1.224:8888';//赵小超
// axios.defaults.baseURL = 'http://192.168.50.163:8888';//赵俊
// axios.defaults.baseURL='http://192.168.50.30:8082/'//杨卓
//axios.defaults.baseURL = 'http://iot.cluster-iot.com:7070/gs/';//外网测试
//axios.defaults.baseURL='http://192.168.50.236:8080'; //本地测试
// axios.defaults.baseURL='http://192.168.50.144:8888/monitor-pc-api/'
//axios.defaults.withCredentials = false;// 表示跨域请求时是否需要使用凭证
axios.defaults.baseURL = 'http://www.cluster-dt.com:8082/'
// axios.defaults.baseURL = 'http://www.cluster-dt.com:8888/opwx/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.timeout = 10000;
//请求拦截器
axios.interceptors.request.use(function (config) {
    let userToken = store.state.userToken
    if (userToken) {
        config.headers['user-token'] = userToken;
    }
    //console.log(config)//获取到所有的设置
    return config;
}, function (err) {
    return Promise.reject(err)
});
//响应拦截器设置user-token过期，重新授权
axios.interceptors.response.use(function (response) {
    // console.log(response) 
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
    return response
}, error => {
    return Promise.reject(error)
});

export default axios;
