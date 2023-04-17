const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// 域名和端口号
const host = process.env.host || process.env.VUE_APP_HOST || '127.0.0.1'
const port = process.env.port || process.env.VUE_APP_PORT || process.env.npm_config_port || 80

const pathSrc = path.resolve(__dirname, 'src')

module.exports = defineConfig({
  devServer: {
    host: host,
    port: port
  },
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': pathSrc
      }
    },
    plugins: [
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],

        dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      }),

      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],

        dts: path.resolve(pathSrc, 'components.d.ts')
      }),

      require('unplugin-element-plus/webpack')({
        // options
      }),

      Icons({
        autoInstall: true
      })
    ]
  }
})
