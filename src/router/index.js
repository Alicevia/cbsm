import Vue from 'vue'
import Router from 'vue-router'
import store from 'src/store'
Vue.use(Router)
let router = new Router({
  linkActiveClass: 'active',
  // mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/home/wx',
      component: () => import('pages/Home/Home'),
      beforeEnter: (to, from, next) => {
        // console.log(to) 
        // console.log(window.location)
        // console.log(from)
        // console.log(store.state)
        if (from.path === '/') {
          next()
          return
        }
        if (store.state.userToken) {
          next()
        } else {
          next({ path: '/login' })
        }
      },
      children: [
        {
          path: '/home/wx',
          redirect:'/home/wx/public',
          component: () => import('pages/Home/NavRouter/WxManage/WxManage.vue'),
          children:[
            {
              path:'/home/wx/public',
              component:()=> import('pages/Home/NavRouter/WxManage/WxRouter/WxPublic')
            },
            {
              path:'/home/wx/menus',
              component:()=> import('pages/Home/NavRouter/WxManage/WxRouter/WxMenus') 
            }
          ]
        },
        {
          path: '/home/message',
          component: () => import('pages/Home/NavRouter/MessageServer')
        },
        {
          path: '/home/account',
          component: () => import('pages/Home/NavRouter/AccountInfo')
        },
        {
          path: '/home/service',
          component: () => import('pages/Home/NavRouter/ServiceManage/ServiceManage.vue'),
        },
        {
          path: '/home/admin',
          component: () => import('pages/Home/NavRouter/Admin/Admin.vue')
        },
      ]
    },
    {
      path: '/login',
      redirect: '/login/phone',
      component: () => import('pages/Login/Login'),
      beforeEnter: (to, from, next) => {
        let userToken = localStorage.getItem('user-token')
        console.log(to)
        if (userToken) {
          next({ path: '/' })
        } else {
          next()
        }
      },
      children: [
        {
          path: '/login/phone',
          component: () => import('pages/Login/LoginRouter/LoginLand')
        },
        {
          path: '/login/forget',
          component: () => import('pages/Login/LoginRouter/Forget')
        },
        {
          path: '/login/wx',
          component: () => import('pages/Login/LoginRouter/WxLogin')
        },

      ]
    },
    {
      path: '/bindphone',
      component: () => import('pages/CheckPhone/WxBindPhone'),
      beforeEnter: (to, from, next) => {
        if (from.path.includes('/home/wx') ) {
          next()

        } else {
          next({ path: '/login' })
        }
      },
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// router.beforeEach((to,from,next)=>{
//     let isLogin = window.localStorage.getItem('user-token')
//     if (!isLogin && to.path!=='/login/phone') {
//         next({path:'/login/phone'})
//     }else{
//         next();
//     }



// })

export default router