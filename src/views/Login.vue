<template>
  <div class="login-container">
    <!-- 登录面板 -->
    <div class="login-panel">
      <h3 class="login-title">登录</h3>
      <el-form label-position="left" label-width="85px" :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username">
            <template #prefix>
              <IEpUser style="color: #409eff" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" :type="pwdType">
            <template #prefix>
              <IEpLock style="color: #409eff"></IEpLock>
            </template>
            <template #suffix>
              <el-icon @click="pwdVisibility = !pwdVisibility" style="align-self: center; font-size: 14px">
                <IEpHide v-if="pwdVisibility" />
                <IEpView v-else />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-left: -74px; margin-bottom: 15px">
          <el-checkbox v-model="form.remember" label="记住密码" name="type" style="height: 14px"></el-checkbox>
        </el-form-item>
        <el-button type="primary" class="login-button" @click="login" size="large">登录</el-button>
        <el-button type="primary" class="login-button" @click="register" size="large" plain>注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, getCurrentInstance, onMounted } from 'vue'
import { setRoutes } from '@/router/router'
const Base64 = require('js-base64').Base64
const { proxy } = getCurrentInstance()

// 登录表单
const form = reactive({
  username: '',
  passWord: '',
  remember: true
})
// 登录表单校验规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const pwdVisibility = ref(false)
const pwdType = computed(() => {
  if (pwdVisibility.value) return 'text'
  else return 'password'
})
// 保存cookie
const setCookie = (cName, value, expiredays) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + decodeURIComponent(value) + (expiredays == null ? '' : ';expires=' + exdate.toGMTString())
}
// 储存表单信息
const setUserInfo = () => {
  // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
  // 如果没有勾选，储存的信息为空
  if (form.remember) {
    setCookie('username', form.username)
    // base64加密密码
    let password = Base64.encode(form.password)
    setCookie('password', password)
  } else {
    setCookie('username', '')
    setCookie('password', '')
  }
}
// 获取cookie
const getCookie = key => {
  if (document.cookie.length > 0) {
    var start = document.cookie.indexOf(key + '=')
    if (start !== -1) {
      start = start + key.length + 1
      var end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return document.cookie.substring(start, end)
    }
  }
  return ''
}
async function login() {
  await proxy.$refs.ruleFormRef.validate(async valid => {
    if (!valid) return
    const res = await proxy.$http.post('/user/login', form).catch(err => {
      return err
    })
    if (res.code === 200) {
      proxy.$message.success('登录成功')
      const { user, menuList, token } = res.data
      // 储存token（需要封装拦截器，将token放入请求头中）
      setCookie('token', token)
      localStorage.setItem('curUser', JSON.stringify(user))
      localStorage.setItem('menuList', JSON.stringify(menuList))
      localStorage.setItem('token', token)
      setRoutes()
      // 储存登录信息
      setUserInfo()
      proxy.$router.push('/')
    }
  })
}
const register = () => {
  proxy.$router.push('/register')
}
onMounted(() => {
  // 在页面加载时从cookie获取登录信息
  let username = getCookie('username')
  let password = Base64.decode(getCookie('password'))
  // 如果存在赋值给表单，并且将记住密码勾选
  if (username) {
    form.username = username
    form.password = password
    form.remember = true
  }
})
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: transparent url(../assets/login-bg.jpg) no-repeat fixed top center;
  background-size: cover;
  overflow: hidden;
}
// 登录框
.login-panel {
  overflow: hidden;
  width: 360px;
  height: 297px;
  margin: 160px auto 0;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  color: #606266;
  text-align: center;
  .login-title {
    padding: 20px 0;
    text-align: center;
    font-size: 25px;
    color: #606266;
  }
  .el-form {
    padding: 10px 40px 0;
    .el-form-item {
      margin-bottom: 20px;
    }
  }

  .login-button {
    width: 40%;
    margin: 10px 10px 0;
  }
}
</style>
