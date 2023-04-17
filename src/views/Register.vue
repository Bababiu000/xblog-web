<template>
  <div class="register-container">
    <!-- 注册面板 -->
    <div class="register-panel">
      <h3 class="register-title">注册</h3>
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
              <IEpLock style="color: #409eff" />
            </template>
            <template #suffix>
              <el-icon @click="pwdVisibility = !pwdVisibility" style="align-self: center; font-size: 14px">
                <IEpHide v-if="pwdVisibility" />
                <IEpView v-else />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" :type="pwdType">
            <template #prefix>
              <IEpLock style="color: #409eff" />
            </template>
            <template #suffix>
              <el-icon @click="pwdVisibility = !pwdVisibility" style="align-self: center; font-size: 14px">
                <IEpHide v-if="pwdVisibility" />
                <IEpView v-else />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" class="register-button" @click="register" size="large">注册</el-button>
        <el-button type="primary" class="register-button" @click="login" size="large" plain>返回登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
// 注册表单
const form = reactive({})
// 注册表单校验规则
// 验证用户名
const checkUsername = async (rule, value, callback) => {
  const res = await proxy.$http.get(`/user/${value}`)
  if (res.code == 200) {
    if (res.data != null) return callback(new Error('该用户名已被使用!'))
  } else {
    callback()
  }
}
// 验证密码
const checkPassword = (rule, value, callback) => {
  if (value !== form.password) {
    return callback(new Error('两次密码输入不一致!'))
  } else {
    callback()
  }
}
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { validator: checkUsername, message: '该用户名已被使用！', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { validator: checkPassword, message: '两次密码输入不一致!', trigger: 'blur' }
  ]
}
// 密码可见性
const pwdVisibility = ref(false)
const pwdType = computed(() => {
  if (pwdVisibility.value) return 'text'
  else return 'password'
})
async function register() {
  await proxy.$refs.ruleFormRef.validate(async valid => {
    if (!valid) return
    const res = await proxy.$http.post('/user/register', form).catch(err => {
      return err
    })
    if (res.code === 200) {
      proxy.$message.success('注册成功，请登录')
      proxy.$router.push('/login')
    }
  })
}
const login = () => {
  proxy.$router.push('/login')
}
</script>

<style lang="less" scoped>
.register-container {
  width: 100%;
  height: 100vh;
  background: transparent url(../assets/login-bg.jpg) no-repeat fixed top center;
  background-size: cover;
  overflow: hidden;
}
// 注册框
.register-panel {
  width: 360px;
  height: 320px;
  margin: 160px auto 0;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  color: #606266;
  text-align: center;
  .register-title {
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
  .register-button {
    width: 40%;
    margin: 10px 10px 0;
  }
}
</style>
