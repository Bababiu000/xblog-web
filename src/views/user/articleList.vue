<template>
  <div class="content-container">
    <div class="article-list-container">
      <div class="search">
        <!-- 搜索框 -->
        <el-input @keyup.enter="search" class="search-input" clearable placeholder="搜索文章" v-model="queryParams.title">
          <template #prefix>
            <i-ep-search></i-ep-search>
          </template>
        </el-input>
        <el-button class="ml-5" type="primary" @click="search"><i-ep-search style="padding-left: 4px"></i-ep-search></el-button>
      </div>
      <CustomCard :table-data="tableData" :route-name="routeName"></CustomCard>
      <!-- 分页组件 -->
      <CustomPages @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="pageInfo.pageNum" :total="pageInfo.total" :pageSize="pageInfo.pageSize"></CustomPages>
    </div>
    <div class="side-bar">
      <el-card class="box-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span>标签</span>
          </div>
        </template>
        <div class="tags">
          <el-tag v-for="tag in tagList" :key="tag.id" type="" effect="plain" round @click="selectTag(tag.id)" :class="{ isActive: tag.id == selectedTagId }">
            {{ tag.name }}
          </el-tag>
        </div>
      </el-card>
    </div>
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

const { tableData, pageInfo, queryParams, searchMerge, getList, search, handleSizeChange, handleCurrentChange } = usePage({ api })

const selectedTagId = ref(0)
const selectTag = tagId => {
  selectedTagId.value = tagId
  queryParams.value.tagId = tagId
  search()
  queryParams.value.tagId = 0
}

const categoryList = ref([])
const tagList = ref([])
const getCategoryList = async () => {
  const res = await proxy.$http.get('/category/all').catch(err => err)
  if (res.code === 200) categoryList.value = res.data
}
const getTagList = async () => {
  const res = await proxy.$http.get('/tag/all').catch(err => err)
  if (res.code === 200) tagList.value = res.data
}
getList()
getCategoryList()
getTagList()
</script>

<style lang="less">
.content-container {
  flex: 1;
  display: flex;
  .article-list-container {
    background-color: #fff;
    width: 75%;
    .search {
      margin: 15px 25px 10px;
      .search-input {
        width: 300px;
      }
      .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .el-button {
      margin-left: -5px;
    }
    .el-pagination {
      margin: 15px 25px;
    }
  }
  .side-bar {
    overflow: hidden;
    margin: 0 10px;
    flex: 1;
    background-color: transparent;
    border-radius: 5px;
    .box-card {
      min-height: 500px;
      .el-card__header {
        padding: 12px;
      }
      .el-card__body {
        padding: 10px;
        .el-tag {
          font-size: 14px;
          margin: 6px;
          &:hover {
            color: #fff;
            background-color: #409eff;
          }
          .el-tag__content {
            display: inline-block;
            padding: 5px;
          }
        }
      }
    }
  }
  .isActive {
    color: #fff;
    background-color: #409eff;
  }
}
</style>
