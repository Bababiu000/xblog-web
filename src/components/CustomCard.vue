<template>
  <el-card class="box-card" v-for="item in tableData" :key="item.id" shadow="hover">
    <template #header>
      <div class="clearfix">
        <span>{{ item.title }}</span>
        <el-button style="float: right; padding: 3px 0" type="primary" link @click="toArticleDetail(item.id)"> 查看</el-button>
      </div>
    </template>
    <div class="text item" v-html="contentSlice(item.content)"></div>
    <!-- {{ item.content === null ? '' : item.content.slice(0, 200) + '...' }} -->
    <div class="card-footer">
      <span class="author"> 作者: {{ item.username }} </span>
      <span class="update-time">
        更新时间: <i style="color: #409eff; font-style: normal">{{ item.updateTime }}</i>
      </span>
    </div>
  </el-card>
</template>
<script setup>
import { defineProps, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  tableData: {
    type: Array,
    default: function () {
      return []
    }
  },
  routeName: {
    type: String,
    default: ''
  }
})

const contentSlice = content => {
  return content.length > 200 ? content.slice(0, 200) : content
}

const toArticleDetail = id => {
  proxy.$router.push({ name: props.routeName, params: { id } })
}
</script>
<style lang="less">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.box-card {
  /* width: 480px; */
  margin-bottom: 10px;
  .card-footer {
    padding-top: 10px;
    // text-align: left;
    > span {
      margin-right: 25px;
    }
  }
}
</style>
