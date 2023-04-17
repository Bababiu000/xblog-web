<template>
  <el-container class="layout-container">
    <Aside></Aside>
    <el-container class="right-side">
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
          <el-menu-item v-for="item in menuList" :key="item.path" :index="'/' + item.path">
            {{ item.name }}
          </el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/register">注册</el-menu-item>
          <el-sub-menu index="1">
            <template #title>个人中心</template>
            <el-menu-item index="/editUserInfo">修改个人信息</el-menu-item>
            <el-menu-item index="/login" @click="logout">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Aside from '@/views/Aside.vue'
import { ref, getCurrentInstance, computed } from 'vue'

const { proxy } = getCurrentInstance()
const activeIndex = computed(() => {
  return proxy.$route.path
})

// const menuList = [
//   {
//     routePath: '/articleList',
//     title: '文章列表',
//     children: [],
//     isShow: true
//   },
//   {
//     routePath: '/editArticle',
//     title: '写博客',
//     children: [],
//     isShow: true
//   },
//   {
//     routePath: '/articleManage',
//     title: '文章管理',
//     children: [],
//     isShow: true
//   },
//   {
//     routePath: '/userManage',
//     title: '用户管理',
//     children: [],
//     isShow: true
//   },
//   {
//     routePath: '/categoryManage',
//     title: '栏目管理',
//     children: [],
//     isShow: true
//   },
//   {
//     routePath: '/login',
//     title: '登录',
//     children: [],
//     isShow: true
//   },
//   {
//     routePath: '/register',
//     title: '注册',
//     children: [],
//     isShow: true
//   }
// ]

const menuList = localStorage.getItem('menuList') ? JSON.parse(localStorage.getItem('menuList')) : []

const logout = () => {
  proxy.$router.push('/login')
  localStorage.removeItem('curUser')
  localStorage.removeItem('menuList')
  localStorage.removeItem('token')
}
</script>

<style lang="less" scoped>
// style attribute {
//   --el-menu-active-color: #348cd9;
//   --el-menu-text-color: var(--el-menu-active-color);
// }
.layout-container {
  height: 100vh;
  .el-header {
    padding: 0;
    // 菜单项hover
    // .el-menu-item:hover {
    //   background-color: #fff;
    //   color: var(--el-menu-active-color);
    // }
    // // 选中菜单项的背景颜色
    // .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    //   background-color: #fff;
    // }
    // // 选中菜单项的字体颜色
    // .el-menu--horizontal > .el-menu-item.is-active {
    //   color: var(--el-menu-active-color) !important;
    // }
    // .el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover {
    //   color: var(--el-menu-active-color) !important;
    // }
    .el-menu {
      .el-icon {
        margin-top: 20px;
        margin-left: -20px;
        padding-right: 5px;
      }
    }
    .flex-grow {
      flex-grow: 1;
    }
  }
  .el-main {
    padding: 0;
  }
}
</style>
