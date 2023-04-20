<template>
  <div class="userinfo-container">
    <div class="user-form">
      <h3 class="title">用户信息</h3>
      <el-upload class="avatar-uploader" :action="uploadPath" :show-file-list="false" :on-success="handleAvatarSuccess">
        <img v-if="formData.avatarUrl" :src="formData.avatarUrl" class="avatar" />
        <i v-else class="avatar-uploader-icon"><i-ep-plus /></i>
      </el-upload>
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

// 上传文件的接口
const uploadPath = `${process.env.VUE_APP_SERVER}/file/upload`

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

const handleAvatarSuccess = res => {
  formData.avatarUrl = res.data
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
    // padding: 25px 35px 35px 0;
    padding: 25px 0;
    width: 30%;
    background-color: #fff;
    border-radius: 5px;
    .el-form {
      padding-right: 35px;
    }
    .title {
      text-align: center;
      // padding-left: 35px;
      padding-bottom: 15px;
      font-size: 25px;
      color: #606266;
    }
    .footer {
      padding-right: 35px;
      text-align: right;
    }
  }
  .avatar-uploader {
    text-align: center;
    padding-bottom: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
