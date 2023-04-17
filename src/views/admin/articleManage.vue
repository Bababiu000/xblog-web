<template>
  <div>
    <div style="margin: 15px 0">
      <!-- 搜索框 -->
      <el-input @keyup.enter="search" class="search-input" clearable placeholder="请输入标题" v-model="queryParams.title">
        <template #prefix>
          <i-ep-document></i-ep-document>
        </template>
      </el-input>
      <el-input @keyup.enter="search" class="search-input" clearable placeholder="请输入作者" v-model="queryParams.username">
        <template #prefix>
          <i-ep-user></i-ep-user>
        </template>
      </el-input>
      <el-select v-model="queryParams.categoryId" clearable placeholder="请选择栏目" class="search-input">
        <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        <template #prefix>
          <i-ep-collection></i-ep-collection>
        </template>
      </el-select>
      <el-button class="ml-5" type="primary" @click="search"><i-ep-search style="margin-right: 4px"> </i-ep-search>搜索</el-button>
      <el-button class="ml-5" type="success" @click="handleAdd">新建</el-button>
      <el-button type="warning" @click="resetForm">重置</el-button>
      <el-button type="danger" :disabled="delArr.length > 0 ? false : true" @click="delAll">全部删除</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table ref="multipleTable" :data="tableData" @selection-change="selectionChange" tooltip-effect="dark" style="width: 100%" border stripe>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="50"> </el-table-column>
      <el-table-column prop="title" label="标题" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="categoryTitle" label="栏目" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="username" label="作者" show-overflow-tooltip> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)">删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <CustomPages @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="pageInfo.pageNum" :total="pageInfo.total" :pageSize="pageInfo.pageSize"></CustomPages>
    <!-- 表单组件 -->
    <CustomDrawer @close-drawer="isDialog = false" @submit-drawer="submitDialog" :form-data="formData" :rules-form="rulesForm" :is-dialog="isDialog" :size="'100%'">
      <template v-slot:content>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目" prop="categoryId">
          <el-select v-model="formData.categoryId" clearable placeholder="请选择">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <el-input v-model="formData.content"></el-input>
          <CustomEditor :content="formData.content" @content-change="contentChange"></CustomEditor>
        </el-form-item>
        <el-form-item label="状态" props="status">
          <el-select v-model="formData.status" clearable placeholder="请选择">
            <el-option v-for="item in statusList" :key="item.id" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </CustomDrawer>
  </div>
</template>

<script setup>
//引入混合
import { reactive, ref, getCurrentInstance } from 'vue'
import { usePage } from '@/composables/usePage'

const { proxy } = getCurrentInstance()
const api = reactive({
  listUrl: '/article/list',
  saveUrl: '/article/save',
  delUrl: '/article/delBatch'
})
const formData = ref({
  id: null,
  title: ''
})
const rulesForm = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
})
const categoryList = ref([])

const getCategoryList = async () => {
  const res = await proxy.$http.get('/category/all').catch(err => err)
  if (res.code === 200) categoryList.value = res.data
}

const contentChange = editor => {
  formData.value.content = editor
}

getCategoryList()

const { tableData, isDialog, delArr, pageInfo, queryParams, searchMerge, statusList, roleTypeList, getList, search, handleAdd, submitDialog, saveForm, resetForm, selectionChange, delMessage, delAll, handleDelete, handleEdit, delData, handleSizeChange, handleCurrentChange, onMounted } = usePage({
  api,
  formData
})
</script>

<style scoped>
.search-input {
  width: 200px;
  margin-right: 10px;
}
</style>
