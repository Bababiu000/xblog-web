<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      locale: zhCn
    }
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}

body {
  font-size: 16px;
}
</style>
