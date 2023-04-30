<template>
  <div class="message-board-container">
    <h2 class="title">留言板<i-ep-edit-pen class="title-icon"></i-ep-edit-pen></h2>
    <p class="text">欢迎在此留下您的意见！</p>
    <div class="input-msg">
      <textarea name="" id="msg" cols="50" rows="5" v-model.trim="content" @keyup.enter="sendMsg" placeholder="请输入评论内容"></textarea>
      <el-button class="send-msg" type="primary" @click="sendMsg">发送留言</el-button>
    </div>
    <div class="history">
      <h3 class="history-title">留言列表<i-ep-comment class="history-title-icon"></i-ep-comment></h3>
      <div class="msg-item" v-for="msg in tableData" :key="msg.id">
        <img class="header-img" :src="msg.avatarUrl" alt="" v-if="msg.avatarUrl" />
        <img class="header-img" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" alt="" v-else />
        <div>
          <h4>
            {{ msg.username }}<span class="msg-time">{{ dateFormat(msg.createTime) }}</span>
          </h4>
          <p class="content">{{ msg.content }}</p>
          <p class="control" v-if="curUser.id == msg.userId || curUser.roleType > msg.roleType">
            <el-button class="btn btn-edit" type="info" @click="handleEdit(msg)" plain>编辑</el-button>
            <el-button class="btn btn-del" type="danger" @click="handleDelete(msg.id)" plain>删除</el-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <CustomPages @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="pageInfo.pageNum" :total="pageInfo.total" :pageSize="pageInfo.pageSize"></CustomPages>
    <!-- 表单组件 -->
    <CustomDialog @close-dialog="isDialog = false" @submit-dialog="submitDialog" :form-data="formData" :rules-form="rulesForm" title="编辑留言" v-model="isDialog">
      <template #content>
        <el-form-item label="" prop="content" label-width="40">
          <el-input v-model="formData.content" type="textarea" :rows="7"></el-input>
        </el-form-item>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { dateFormat } from '@/utils/dateFormat'
import { usePage } from '@/composables/usePage'

const { proxy } = getCurrentInstance()
const api = {
  listUrl: '/message/list',
  saveUrl: '/message/save',
  delUrl: '/message/delBatch'
}
const content = ref('')
const formData = ref({
  id: null,
  content: ''
})
const rulesForm = reactive({
  content: [{ required: true, message: '留言不能为空！', trigger: 'blur' }]
})
const { tableData, pageInfo, isDialog, getList, submitDialog, saveForm, handleEdit, handleDelete, handleSizeChange, handleCurrentChange } = usePage({ api, formData })

const curUser = JSON.parse(localStorage.getItem('curUser'))
const sendMsg = () => {
  if (content.value == '') {
    proxy.$message.error('留言内容不能为空！')
    return
  }
  formData.value.content = content
  formData.value.status = '启用'
  formData.value.userId = curUser.id
  saveForm()
  content.value = ''
}
</script>
<!-- 如果想让这里编写的样式只对当前组件有效，style上添加一个scoped属性-->
<style lang="less">
.message-board-container {
  flex: 1;
  width: 75%;
  padding: 15px 25px 0;
  color: #303133;
  background-color: #fff;
  .title {
    display: flex;
    align-items: flex-end;
    padding-bottom: 5px;
    border-bottom: 2px solid #909399;
    .title-icon {
      font-size: 20px;
      margin-left: 2px;
      margin-bottom: 2px;
    }
  }
  .text {
    margin: 15px 0 25px;
  }
  .input-msg {
    width: 80%;
    margin: 20px auto;
    .send-msg {
      float: right;
      margin-top: 10px;
      padding: 15px 20px;
    }
    #msg {
      box-sizing: border-box;
      width: 100%;
      height: 140px;
      padding: 10px;
      outline: none;
      border: 1px solid #409eff;
      border-radius: 5px;
      resize: none;
      display: block;
      font-size: 16px;
    }
  }
  .history {
    padding: 70px 10px 20px;
    background-color: #fff;
    .history-title {
      display: flex;
      align-items: end;
      padding-bottom: 5px;
      border-bottom: 2px solid #909399;
      .history-title-icon {
        margin-left: 3px;
        margin-bottom: 1px;
        font-size: 17px;
        color: #54565d;
      }
    }
  }
  .el-dialog {
    width: 40%;
    .el-dialog__body {
      padding: 10px;
      .el-inputel-textarea__inner {
        min-height: 50px;
      }
    }
  }
}

.msg-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #dcdfe6;
  .header-img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }
  div {
    margin-left: 15px;
    width: 100%;
    p.content {
      font-size: 16px;
      margin: 5px 0 10px;
      word-wrap: break-word;
      white-space: pre-wrap;
      min-height: 50px;
      /* border: 1px solid red; */
    }
    .msg-time {
      float: right;
      font-size: 16px;
      font-weight: normal;
      color: #909399;
      margin-left: 20px;
    }
    .control {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
