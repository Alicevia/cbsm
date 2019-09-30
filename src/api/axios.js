import axios from './axiosDefault'
import { Message } from 'element-ui';

import qs from 'qs'
function formatData(data) {
    data = qs.stringify(data, { encode: false })
    data = '?' + data
    return data
}

// export default function ajax(url, data = {}, type = 'GET', flag = true) {

export default function _axios({ url, data = {}, type = 'GET', flag = true }) {
    // console.log(url,data,type,flag)
    // if (flag) {
    //     data = formatData(data)
    //     url += data
    // }
    return new Promise((resolve, reject) => {
        let promise
        // 1. 执行异步ajax请求
        if (flag) {
            if (type === 'GET') {
                promise = axios.get(url, { params: data })
            } else {
                url += formatData(data)
                promise = axios[type.toLowerCase()](url)
            }
        } else {
            promise = axios[type.toLowerCase()](url, data)
        }


        // if (type === 'GET') { // 发GET请求
        //     promise = axios.get(url, { // 配置对象
        //         params: data // 指定请求参数
        //     })
        // } else if (type === 'POST') { // 发POST请求
        //     if (flag) {
        //         promise = axios.post(url)
        //     } else {
        //         promise = axios.post(url, data)
        //     }
        // } else if (type === 'PUT') {
        //     if (flag) {
        //         promise = axios.put(url)
        //     } else {
        //         promise = axios.put(url, data)
        //     }
        // } else if (type === 'DELETE') {
        //     promise = axios.delete(url)
        // }
        // 2. 如果成功了, 调用resolve(value)
        promise.then(response => {
            // console.log(response)
            // if (response.status === 200 ) {
            //     if (response.headers['user-token'] && response.data.succeed) {
            //         let userToken = response.headers['user-token']
            //         localStorage.setItem('user-token', userToken)
            //         axios.defaults.headers.common['user-token'] = userToken
            //         axios.defaults.headers.common['Cache-Control']='no-cache'
            //     }
            if (response.status === 200) {
                //普通请求成功
                resolve(response.data)
                // 请求成功了但是你的条件不符合后台要求               
            } else {//这一步用来处理非200状态下的响应数据
                Message.error('数据获取出错--' + response.data)
                // reject(response.data.msg)
                // console.log('失败')
            }
            // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
        }).catch(error => {
            // reject(error)
            Message.error('请求出错了--: ' + error.message)
        })
    })


}

// 请求登陆接口
// ajax('/login', {username: 'Tom', passsword: '12345'}, 'POST').then()
// 添加用户
// ajax('/manage/user/add', {username: 'Tom', passsword: '12345', phone: '13712341234'}, 'POST').then()
