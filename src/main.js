import Vue from 'vue'
import router from './router'
import store from './store'
import axios from './api/axiosDefault'
//按需加载
import {button,input,form,upload,Alert,MessageBox,Message,
    formItem,Switch} from 'element-ui'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'

Vue.use(element)
Vue.use(Alert)
Vue.use(button)
Vue.use(input)
Vue.use(form)
Vue.use(formItem)
Vue.use(Switch)
Vue.use(upload)


Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = Message.confirm



Vue.config.productionTip = false

function syncStorageToAxios() {
    if (localStorage.getItem('user-token')) {
        axios.defaults.headers.common['user-token'] = localStorage.getItem('user-token');
 
    }
}
syncStorageToAxios()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:show=>show(App)
})
