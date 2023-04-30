<template>
  <div class="article-manage-container">
    <div class="search">
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
      <el-button type="warning" @click="resetSearch">重置</el-button>
      <el-button type="danger" :disabled="delArr.length > 0 ? false : true" @click="delAll">全部删除</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table ref="multipleTable" :data="tableData" @selection-change="selectionChange" tooltip-effect="dark" style="width: 100%" border stripe>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="50"> </el-table-column>
      <el-table-column prop="title" label="标题" width="250"> </el-table-column>
      <el-table-column prop="categoryTitle" label="栏目" width="120"> </el-table-column>
      <el-table-column prop="tags" label="标签" width="180" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="username" label="作者" width="100"> </el-table-column>
      <el-table-column prop="views" label="浏览量" width="100"></el-table-column>
      <el-table-column prop="createTime" label="发布时间" width="180"> </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template v-slot="scope">
          <el-button @click="handleEdit(scope.row)">编辑 </el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)">删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <CustomPages @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="pageInfo.pageNum" :total="pageInfo.total" :pageSize="pageInfo.pageSize"></CustomPages>
    <!-- 表单组件 -->
    <CustomDrawer @close-drawer="onCloseDrawer" @submit-drawer="submit" :form-data="formData" :rules-form="rulesForm" :is-dialog="isDialog" size="100%">
      <template v-slot:content>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目" prop="categoryId">
          <el-select v-model="formData.categoryId" clearable placeholder="请选择">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-check-tag v-for="tag in tagList" :key="tag.id" :checked="currentTagList.includes(tag.id)" type="info" effect="plain" round @change="tagChange($event, tag.id)">
            {{ tag.name }}
          </el-check-tag>
        </el-form-item>
        <el-form-item label="" props="content">
          <CustomMarkdownEditor :content="formData.content" @content-change="contentChange"></CustomMarkdownEditor>
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
import CustomMarkdownEditor from '@/components/CustomMarkdownEditor.vue'
import { picurlMatch } from '@/utils/picurlMatch.js'

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

const contentChange = editor => {
  formData.value.content = editor
}

const curUser = JSON.parse(localStorage.getItem('curUser'))
// 编辑
const handleEdit = item => {
  isDialog.value = true
  formData.value = item
  getCurrentTagList()
}
const tagChange = (status, tagId) => {
  if (status) currentTagList.value.push(tagId)
  else currentTagList.value.pop(categoryList.value.indexOf(tagId))
}
const onCloseDrawer = () => {
  isDialog.value = false
  currentTagList.value = []
}
const submit = async () => {
  isDialog.value = false
  formData.value.userId = curUser.id
  formData.value.picture = picurlMatch(formData.value.content)
  saveForm()
}
// 提交新增或更新
const saveForm = async () => {
  const res1 = await proxy.$http.post(api.saveUrl, formData.value).catch(err => err)
  if (res1.code != '200') return
  let articleId = res1.data
  let articleTagList = currentTagList.value.map(tagId => {
    return { articleId: articleId, tagId: tagId }
  })
  const res2 = await proxy.$http.post(`/article-tag/save`, articleTagList).catch(err => err)
  if (res2.code == '200') {
    proxy.$message({ message: '操作成功', type: 'success' })
    getList()
  }
  currentTagList.value = []
}

const categoryList = ref([])
const tagList = ref([])
const currentTagList = ref([])
const getCategoryList = async () => {
  const res = await proxy.$http.get('/category/all').catch(err => err)
  if (res.code === 200) categoryList.value = res.data
}
const getTagList = async () => {
  const res = await proxy.$http.get('/tag/all').catch(err => err)
  if (res.code === 200) tagList.value = res.data
}
const getCurrentTagList = async () => {
  const res = await proxy.$http.get(`/article-tag/${formData.value.id}`).catch(err => err)
  if (res.code === 200) currentTagList.value = res.data
}
getCategoryList()
getTagList()
const { tableData, isDialog, delArr, pageInfo, queryParams, searchMerge, statusList, roleTypeList, getList, search, handleAdd, submitDialog, resetSearch, selectionChange, delMessage, delAll, handleDelete, delData, handleSizeChange, handleCurrentChange, onMounted } = usePage({
  api,
  formData
})
</script>

<style lang="less">
.article-manage-container {
  flex: 1;
  padding: 1px 15px;
  background-color: #fff;
  .search {
    margin: 15px 0 10px;
    .search-input {
      width: 200px;
      margin-right: 10px;
    }
  }
  .el-check-tag {
    margin-right: 10px;
  }
}
</style>
