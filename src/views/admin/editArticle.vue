<template>
  <div class="article-container">
    <el-form>
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="所属栏目" prop="categoryId">
        <el-select v-model="formData.categoryId" clearable placeholder="请选择">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- <CustomRichEditor :content="formData.content" @content-change="contentChange"></CustomRichEditor> -->
      <CustomMarkdownEditor></CustomMarkdownEditor>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="submit"> 发布文章 </el-button>
      <!-- <el-button @click="handleClose">取消</el-button> -->
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import CustomRichEditor from '@/components/CustomRichEditor.vue'
import CustomMarkdownEditor from '@/components/CustomMarkdownEditor.vue'

const { proxy } = getCurrentInstance()

const formData = reactive({})
const categoryList = ref([])
const curUser = JSON.parse(localStorage.getItem('curUser'))

const getCategoryList = async () => {
  const res = await proxy.$http.get('/category/all').catch(err => err)
  if (res.code === 200) categoryList.value = res.data
}

const contentChange = editor => {
  formData.content = editor
  console.log(formData)
}

const submit = () => {
  formData.userId = curUser.id
  proxy.$http.post('/article/save', formData).then(res => {
    if (res.code === 200) {
      proxy.$message.success('发布成功')
      proxy.$router.go(-1)
    }
  })
}

const handleClose = () => {
  proxy.$router.go(-1)
}

getCategoryList()
</script>

<style lang="less">
.article-container {
  padding: 20px 25px 75px;
  .footer {
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 80px;
    text-align: right;
    background-color: #fff;
    border-top: 1px solid #e5e6eb;
  }
}
</style>
