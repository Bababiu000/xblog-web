<template>
  <div class="editor-container">
    <!-- 上传图片菜单默认为禁用状态 设置 disabled-menus 为空数组可以开启。 -->
    <v-md-editor v-model="editContent" @change="handleChange" autofocus @upload-image="handleUploadImage" :mode="mode" :disabled-menus="[]" :include-level="[1, 2, 3, 4]" height="600px"></v-md-editor>
  </div>
</template>

<style></style>

<script setup>
import { ref, defineProps, defineEmits, getCurrentInstance, computed } from 'vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'edit'
  }
})
const editContent = computed(() => props.content)
const emits = defineEmits(['content-change'])
const handleChange = () => {
  emits('content-change', editContent.value)
}

const handleUploadImage = (event, insertImage, files) => {
  event.preventDefault()
  files.forEach(async file => {
    let formData = new FormData()
    formData.append('file', file)
    let res = await proxy.$http.post('/file/upload', formData).catch(err => err)
    insertImage({ url: res.data, desc: 'DESC' })
  })
}
</script>

<style lang="less">
.editor-container {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;

  .v-md-editor {
    box-shadow: none;
  }

  .v-md-textarea-editor {
    // min-height: 500px;
    textarea {
      font-size: 16px;
    }
  }
  .github-markdown-body {
    font-size: 16px;
    padding: 16px;
  }
}
</style>
