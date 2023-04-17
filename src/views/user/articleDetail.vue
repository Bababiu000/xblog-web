<template>
  <div class="article-detail-container">
    <el-descriptions :title="detail.title">
      <el-descriptions-item label="发布时间:">{{ detail.createTime }}</el-descriptions-item>
      {{ detail.categoryTitle === null }}
      <el-descriptions-item label="所属栏目:">{{ detail.categoryTitle === null ? '未知' : detail.categoryTitle }} </el-descriptions-item>
      <el-descriptions-item label="更新时间:">{{ detail.updateTime }}</el-descriptions-item>
      <el-descriptions-item label="发布人:">{{ detail.username === null ? '未知' : detail.username }} </el-descriptions-item>
      <el-descriptions-item label="浏览量:">
        <el-tag size="small">{{ detail.views }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <div style="text-indent: 2em" v-html="detail.content"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  id: {
    type: [Number, String],
    default: '1'
  }
})
const detail = ref({})
const getArticleDetail = async id => {
  const res = await proxy.$http.get(`/article/detail/${id}`).catch(err => err)
  if (res.code === 200) {
    detail.value = res.data
  }
}
getArticleDetail(props.id)
</script>

<style lang="less">
.article-detail-container {
  padding: 15px 25px 0;
  .el-descriptions__title {
    font-size: 28px;
  }
  .el-descriptions__body {
    padding: 10px 10px 0;
    margin-bottom: 15px;
    border-radius: 5px;
    background-color: #f8f8f8;
    color: #999aaa;
  }
}
</style>
