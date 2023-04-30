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

    <!-- <div style="text-indent: 2em; padding: 0 10px" v-html="detail.content"></div> -->
    <!-- <custom-markdown-editor :content="detail.content" mode="preview"></custom-markdown-editor> -->
    <custom-markdown-editor :content="detail.content" mode="preview" v-if="flag"></custom-markdown-editor>
  </div>
</template>

<script setup>
import { ref, defineProps, getCurrentInstance } from 'vue'
import CustomMarkdownEditor from '@/components/CustomMarkdownEditor.vue'

const { proxy } = getCurrentInstance()

const flag = ref(false) // 请求是否完成
const detail = ref({})
const getArticleDetail = async () => {
  const res = await proxy.$http.get(`/article/detail/${proxy.$route.params.id}`).catch(err => err)
  if (res.code === 200) {
    detail.value = res.data
    flag.value = true
  }
}
getArticleDetail()
</script>

<style lang="less">
.article-detail-container {
  flex: 1;
  width: 75%;
  padding: 15px 25px 0;
  background-color: #fff;
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
  .editor-container {
    margin-top: 0;
    border: none;
    .github-markdown-body {
      padding: 0 0 16px;
    }
  }
}
</style>
