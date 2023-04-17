import { createApp } from 'vue'
import App from './App.vue'
// import 'element-plus/dist/index.css'
import './styles/index.css'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from './request/request.js'
import router from './router/router.js'

import CustomDrawer from '@/components/CustomDrawer.vue'
import CustomPages from '@/components/CustomPages.vue'
import CustomCard from '@/components/CustomCard.vue'
import CustomEditor from '@/components/CustomEditor.vue'
import CustomDialog from '@/components/CustomDialog.vue'

const app = createApp(App)

app.component('CustomDrawer', CustomDrawer)
app.component('CustomPages', CustomPages)
app.component('CustomCard', CustomCard)
app.component('CustomEditor', CustomEditor)
app.component('CustomDialog', CustomDialog)

app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox.confirm
app.config.globalProperties.$http = request

app.use(router)
app.mount('#app')

console.log('环境：', process.env.NODE_ENV)
console.log('服务器：', process.env.VUE_APP_SERVER)
