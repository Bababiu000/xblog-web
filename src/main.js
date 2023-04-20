import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from './request/request.js'
import router from './router/router.js'

import CustomDrawer from '@/components/CustomDrawer.vue'
import CustomPages from '@/components/CustomPages.vue'
import CustomDialog from '@/components/CustomDialog.vue'

import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// highlightjs 核心代码
import hljs from 'highlight.js/lib/core'
// 按需引入语言包
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import java from 'highlight.js/lib/languages/java'

hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('java', java)

VMdEditor.use(githubTheme, {
  Hljs: hljs,
  config: {
    toc: {
      includeLevel: [1, 2, 3, 4]
    }
  }
})

const app = createApp(App)

app.component('CustomDrawer', CustomDrawer)
app.component('CustomPages', CustomPages)
app.component('CustomDialog', CustomDialog)

app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox.confirm
app.config.globalProperties.$http = request

app.use(router)
app.use(VMdEditor)
app.mount('#app')

console.log('环境：', process.env.NODE_ENV)
console.log('服务器：', process.env.VUE_APP_SERVER)
