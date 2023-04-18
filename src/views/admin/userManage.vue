<!-- eslint-disable no-unused-vars -->
<template>
  <div class="user-manage-container">
    <div class="search">
      <!-- 搜索框 -->
      <el-input @keyup.enter="search" class="search-input" clearable placeholder="请输入名称" v-model="queryParams.username">
        <template #prefix>
          <i-ep-user></i-ep-user>
        </template>
      </el-input>
      <el-input @keyup.enter="search" class="search-input" clearable placeholder="请输入邮箱" v-model="queryParams.email">
        <template #prefix>
          <i-ep-message></i-ep-message>
        </template>
      </el-input>
      <el-input @keyup.enter="search" class="search-input" clearable placeholder="请输入地址" v-model="queryParams.address">
        <template #prefix>
          <i-ep-location></i-ep-location>
        </template>
      </el-input>
      <el-button class="ml-5" type="primary" @click="search"><i-ep-search style="margin-right: 4px"> </i-ep-search>搜索</el-button>
      <el-button class="ml-5" type="success" @click="handleAdd">新建</el-button>
      <el-button type="warning" @click="resetForm">重置</el-button>
      <el-button type="danger" :disabled="delArr.length > 0 ? false : true" @click="delAll">全部删除</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table ref="multipleTable" :data="tableData" @selection-change="selectionChange" tooltip-effect="dark" border stripe>
      <el-table-column type="selection" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="id" label="ID" width="50"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <!-- <el-table-column prop="motto" label="座右铭"></el-table-column> -->
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
      <el-table-column prop="address" label="地址" width="150"></el-table-column>
      <el-table-column prop="roleType" label="类型" width="120">
        <template #default="scope">
          <el-tag :type="scope.row.roleType === 1 ? '' : 'success'" disable-transitions>{{ scope.row.roleType === 1 ? '管理员' : '普通用户' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="views" label="总浏览量" width="150"></el-table-column>
      <el-table-column prop="status" label="状态" width="80"></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <CustomPages @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="pageInfo.pageNum" :total="pageInfo.total" :pageSize="pageInfo.pageSize"></CustomPages>
    <!-- 表单组件 -->
    <CustomDialog @close-dialog="isDialog = false" @submit-dialog="submitDialog" :form-data="formData" :rules-form="rulesForm" v-model="isDialog">
      <template #content>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="座右铭" prop="motto">
          <el-input type="textarea" :rows="3" v-model="formData.motto" auto-complete="off" placeholder="座右铭"></el-input>
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
        <el-form-item label="类型" prop="roleType">
          <el-select v-model="formData.roleType" clearable placeholder="请选择">
            <el-option v-for="item in roleTypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" clearable placeholder="请选择">
            <el-option v-for="item in statusList" :key="item.value" :label="item.value" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import { usePage } from '@/composables/usePage'
const { proxy } = getCurrentInstance()
const api = reactive({
  listUrl: '/user/list',
  saveUrl: '/user/save',
  delUrl: '/user/delBatch'
})
const formData = ref({
  id: null,
  username: ''
})
// 验证用户名
const checkUsername = async (rule, value, callback) => {
  const res = await proxy.$http.get(`/user/${value}`)
  if (res.code == 200) {
    if (res.data != null) return callback(new Error('该用户名已被使用!'))
  } else {
    callback()
  }
}
const rulesForm = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
    // { validator: checkUsername, message: '该用户名已被使用！', trigger: 'blur' }
  ]
})

const { tableData, isDialog, delArr, pageInfo, queryParams, searchMerge, statusList, roleTypeList, getList, search, handleAdd, closeDialog, submitDialog, saveForm, resetForm, selectionChange, delMessage, delAll, handleDelete, handleEdit, delData, handleSizeChange, handleCurrentChange, onMounted } =
  usePage({
    api,
    formData
  })
</script>

<style scoped lang="less">
.user-manage-container {
  padding: 0 15px;
  .search {
    margin: 15px 0 10px;
    .search-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>
