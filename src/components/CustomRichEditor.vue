<template>
  <div style="border: 1px solid #ccc; margin-top: 20px">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, defineProps, defineEmits, getCurrentInstance } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  // 文章内容
  content: {
    type: String,
    default: ''
  }
})

// 内容改变触发事件
const emits = defineEmits(['content-change'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const mode = 'default' // 或 'simple'

const handleCreated = editor => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const handleChange = editor => {
  emits('content-change', editor.getHtml())
}

onMounted(() => {
  proxy.$nextTick(() => (valueHtml.value = props.content))
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

handleCreated(editorRef.value)
</script>
