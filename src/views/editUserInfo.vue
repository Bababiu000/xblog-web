<template>
  <div class="userinfo-container">
    <div class="user-form">
      <h3 class="title">用户信息</h3>
      <el-form :model="formData" :rules="rulesForm" ref="formDataRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="个性签名" prop="motto">
          <el-input type="textarea" :rows="3" v-model="formData.motto" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" @click="submit"> 确认 </el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const curUser = JSON.parse(localStorage.getItem('curUser'))
const formData = reactive(Object.assign({}, curUser))

// 验证用户名
const checkUsername = async (rule, value, callback) => {
  if (value == curUser.username) return
  const res = await proxy.$http.get(`/user/${value}`)
  if (res.code == 200) {
    if (res.data != null) return callback(new Error('该用户名已被使用!'))
  } else {
    callback()
  }
}
const rulesForm = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { validator: checkUsername, message: '该用户名已被使用！', trigger: 'blur' }
  ]
})

const submit = () => {
  proxy.$http.post('/user/save', formData).then(res => {
    if (res.code === 200) {
      proxy.$message.success('操作成功')
      localStorage.setItem('curUser', JSON.stringify(formData))
      proxy.$router.go(-1)
    }
  })
}

const handleClose = () => {
  proxy.$router.go(-1)
}
</script>

<style lang="less">
.userinfo-container {
  width: 100%;
  height: 100vh;
  background: transparent url(../assets/login-bg.jpg) no-repeat fixed top center;
  background-size: cover;
  overflow: hidden;
  .user-form {
    margin: 100px auto 0;
    padding: 25px 35px 35px 0;
    width: 30%;
    background-color: #fff;
    border-radius: 5px;
    .title {
      text-align: center;
      padding-left: 35px;
      padding-bottom: 25px;
      font-size: 25px;
      color: #606266;
    }
    .footer {
      text-align: right;
    }
  }
}
</style>
