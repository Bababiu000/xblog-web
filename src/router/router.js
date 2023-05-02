import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/index',
      component: () => import('../views/Home'),
      children: [
        { path: 'index', name: 'Index', component: () => import('../views/ArticleList') },
        { path: '/articleDetail/:id', name: 'ArticleDetail', component: () => import('../views/ArticleDetail') },
        { path: '/messageBoard', name: 'MessageBoard', component: () => import('../views/user/MessageBoard') }
      ]
    },
    { path: '/login', name: 'Login', component: () => import('../views/Login') },
    { path: '/register', name: 'Register', component: () => import('../views/Register') },
    { path: '/editUserInfo', name: 'EditUserInfo', component: () => import('../views/user/EditUserInfo') }
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

// 免登录白名单
const whiteList = ['Home', 'Index', 'ArticleDetail', 'MessageBoard', 'Login', 'Register']
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token || whiteList.indexOf(to.name) != -1) {
    next()
  } else {
    ElMessage.warning('请登录！')
    next('/login')
  }
})

setRoutes()

export default router
