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
      <el-button type="warning" @click="resetForm">重置</el-button>
    </div>
    <CustomCard :table-data="tableData" :route-name="routeName"></CustomCard>
    <!-- 分页组件 -->
    <CustomPages @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="pageInfo.pageNum" :total="pageInfo.total" :pageSize="pageInfo.pageSize"></CustomPages>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import CustomCard from '@/components/CustomCard.vue'
import { usePage } from '@/composables/usePage'

const { proxy } = getCurrentInstance()

const api = {
  listUrl: '/article/list'
}
const routeName = ref('ArticleDetail')
const categoryList = ref([])

const getCategoryList = async () => {
  const res = await proxy.$http.get('/category/all').catch(err => err)
  if (res.code === 200) categoryList.value = res.data
}

const { tableData, pageInfo, queryParams, searchMerge, getList, search, resetForm, handleSizeChange, handleCurrentChange } = usePage({ api })

getList()

getCategoryList()
</script>

<style>
.search-input {
  width: 200px;
  margin-right: 10px;
}
</style>
