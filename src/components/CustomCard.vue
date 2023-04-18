<template>
  <el-card class="box-card" v-for="item in tableData" :key="item.id" shadow="never" @click="toArticleDetail(item.id)">
    <template #header>
      <div class="clearfix">
        <span>{{ item.title }}</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="primary" link> 查看</el-button> -->
      </div>
    </template>
    <div class="text item" v-html="contentSlice(item.content)"></div>
    <!-- {{ item.content === null ? '' : item.content.slice(0, 200) + '...' }} -->
    <div class="card-footer">
      <span class="author"> 作者: {{ item.username }} </span>
      <div class="time">
        <span class="create-time">
          发布时间: <i style="color: #409eff; font-style: normal">{{ item.createTime }}</i>
        </span>
        <span class="update-time" v-if="item.updateTime">
          更新时间: <i style="color: #409eff; font-style: normal">{{ item.updateTime }}</i>
        </span>
      </div>
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
  // margin-bottom: 20px;
  padding: 20px 25px;
  &:hover {
    cursor: pointer;
    background-color: #fafafa;
  }
  &.el-card {
    border: none;
    border-bottom: 1px solid #f0f0f2;
    border-radius: 0;
  }
  .el-card__header {
    font-size: 18px;
    color: #222226;
    padding: 0;
    // background-color: #fafafa;
    border: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .el-card__body {
    padding: 10px 0 0;
    color: #555666;
    .card-footer {
      display: flex;
      justify-content: space-between;
      // padding-top: 10px;
      font-size: 14px;
      .update-time {
        margin-left: 25px;
      }
    }
  }
}
</style>
