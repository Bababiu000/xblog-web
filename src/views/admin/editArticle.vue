<template>
  <div class="article-container">
    <el-form :rules="rulesForm" ref="formDataRef" :model="formData">
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
      <CustomMarkdownEditor :content="formData.content" @content-change="contentChange"> </CustomMarkdownEditor>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="submitForm"> 发布文章 </el-button>
      <el-button @click="handleClose">取消</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
import CustomMarkdownEditor from '@/components/CustomMarkdownEditor.vue'
import { picurlMatch } from '@/utils/picurlMatch.js'

const { proxy } = getCurrentInstance()

const formData = reactive({})
const rulesForm = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
})
const currentTagList = ref([])
const curUser = JSON.parse(localStorage.getItem('curUser'))

const contentChange = editor => {
  formData.content = editor
}
const tagChange = (status, tagId) => {
  if (status) currentTagList.value.push(tagId)
  else currentTagList.value.pop(categoryList.value.indexOf(tagId))
}

const submitForm = async () => {
  proxy.$nextTick(() => proxy.$refs['formDataRef'].clearValidate())
  proxy.$refs['formDataRef'].validate(valid => {
    if (!valid) {
      proxy.$message.error('请填写符合条件的数据')
      return false
    } else {
      saveForm()
    }
  })
}

const saveForm = async () => {
  formData.userId = curUser.id
  formData.picture = picurlMatch(formData.content)
  const res1 = await proxy.$http.post('/article/save', formData).catch(err => err)
  if (res1.code != '200') return
  let articleId = res1.data
  let articleTagList = currentTagList.value.map(tagId => {
    return { articleId: articleId, tagId: tagId }
  })
  const res2 = await proxy.$http.post(`/article-tag/save`, articleTagList).catch(err => err)
  if (res2.code === 200) {
    proxy.$message.success('发布成功')
    proxy.$router.go(-1)
  }
}

const handleClose = () => {
  proxy.$router.go(-1)
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
getCategoryList()
getTagList()
</script>

<style lang="less">
.article-container {
  flex: 1;
  padding: 20px 25px 75px;
  background-color: #fff;
  .el-check-tag {
    margin-right: 10px;
  }
  .footer {
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 98.9%;
    padding: 10px 80px;
    padding: 10px 2%;
    margin-right: 50px;
    text-align: right;
    background-color: #fff;
    border-top: 1px solid #e5e6eb;
  }
}
</style>
