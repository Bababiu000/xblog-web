import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'Home', redirect: '/articleList', component: () => import('../views/Home') },
    { path: '/login', name: 'Login', component: () => import('../views/Login') },
    { path: '/register', name: 'Register', component: () => import('../views/Register') },
    { path: '/editUserInfo', name: 'EditUserInfo', component: () => import('../views/editUserInfo') }
  ]
})

export const setRoutes = () => {
  let menuList = JSON.parse(localStorage.getItem('menuList')) ? JSON.parse(localStorage.getItem('menuList')) : []
  if (menuList.length > 0) {
    // store.commit('setMenu', menuList)
    menuList.forEach(menuItem => {
      let routeItem = {
        path: '/' + menuItem.path,
        name: menuItem.name,
        component: () => import('../views/' + menuItem.pagePath)
      }
      router.addRoute('Home', routeItem)
    })
  }
}

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token || to.path == '/login' || to.path == '/register') {
    next()
  } else {
    ElMessage.warning('请登录！')
    next('/login')
  }
})

setRoutes()

export default router
