<template>
  <div class="editor-container">
    <v-md-editor v-model="editContent" @change="handleChange" @upload-image="handleUploadImage" :mode="mode"></v-md-editor>
  </div>
</template>

<style></style>

<script setup>
import { ref, defineProps, defineEmits, getCurrentInstance } from 'vue'

const proxy = getCurrentInstance()

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
const editContent = ref(props.content)
const emits = defineEmits(['content-change'])
const handleChange = () => {
  emits('content-change', editContent.value)
}

const handleUploadImage = async (event, insertImage, files) => {
  for (let i in files) {
    const formData = new FormData()
    formData.append('file', files[i])

    const res = await proxy.$http.post(`/uploadImg`, formData).catch(err => err)
    insertImage({ url: res.data, desc: 'DESC' })
  }
}
</script>

<style lang="less">
.editor-container {
  width: 100%;
  min-height: 500px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;

  .v-md-editor {
    box-shadow: none;
  }
  .v-md-textarea-editor {
    min-height: 500px;
    textarea {
      font-size: 16px;
    }
  }
  .github-markdown-body {
    font-size: 16px;
    text-indent: 2rem;
    padding: 16px;
  }
}
</style>
