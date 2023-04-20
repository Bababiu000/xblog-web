<template>
  <div class="category-manage-container">
    <div class="search">
      <!-- 搜索框 -->
      <el-input @keyup.enter="search" style="width: 200px" clearable placeholder="请输入名称" v-model="queryParams.title">
        <template #prefix>
          <IEpSearch></IEpSearch>
        </template>
      </el-input>
      <el-button class="ml-5" type="primary" @click="search">搜索</el-button>
      <el-button class="ml-5" type="success" @click="handleAdd">新建</el-button>
      <el-button type="warning" @click="resetSearch">重置</el-button>
      <el-button type="danger" :disabled="delArr.length > 0 ? false : true" @click="delAll">全部删除</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table ref="multipleTable" :data="tableData" @selection-change="selectionChange" tooltip-effect="dark" style="width: 100%" border stripe>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="50"> </el-table-column>
      <el-table-column prop="title" label="标题" show-overflow-tooltip> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="handleEdit(scope.row)">编辑 </el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)">删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <CustomPages @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="pageInfo.pageNum" :total="pageInfo.total" :pageSize="pageInfo.pageSize"></CustomPages>
    <!-- 表单组件 -->
    <CustomDialog @close-dialog="isDialog = false" @submit-dialog="submitDialog" :form-data="formData" :rules-form="rulesForm" :title="'栏目'" v-model="isDialog">
      <template v-slot:content>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { usePage } from '@/composables/usePage'
const api = reactive({
  listUrl: '/category/list',
  saveUrl: '/category/save',
  delUrl: '/category/delBatch'
})
const formData = ref({
  id: null,
  title: ''
})
const rulesForm = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
})

const {
  tableData,
  isDialog,
  delArr,
  pageInfo,
  queryParams,
  searchMerge,
  statusList,
  roleTypeList,
  getList,
  search,
  handleAdd,
  closeDialog,
  submitDialog,
  saveForm,
  resetSearch,
  selectionChange,
  delMessage,
  delAll,
  handleDelete,
  handleEdit,
  delData,
  handleSizeChange,
  handleCurrentChange,
  onMounted
} = usePage({
  api,
  formData
})
</script>

<style lang="less">
.category-manage-container {
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
