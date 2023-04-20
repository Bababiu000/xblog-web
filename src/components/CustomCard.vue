<template>
  <div class="card-box" v-for="item in tableData" :key="item.id" @click="toArticleDetail(item.id)">
    <div class="article-cover" v-if="item.picture">
      <img :src="item.picture" alt="" />
    </div>
    <el-card shadow="never">
      <template #header>
        <div class="clearfix">
          <span>{{ item.title }}</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="primary" link> 查看</el-button> -->
        </div>
      </template>
      <div class="text item" v-html="contentSlice(item.content)"></div>
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
  </div>
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
  return content.length > 200 ? content.slice(0, 200).concat('...') : content
}

const toArticleDetail = id => {
  proxy.$router.push({ name: props.routeName, params: { id } })
}
</script>
<style lang="less">
.text {
  font-size: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.card-box {
  display: flex;
  height: 120px;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f2;
  background-color: #fff;

  &:hover {
    cursor: pointer;
    background-color: #fafafa;
  }

  .article-cover {
    width: 200px;
    height: 120px;
    margin-right: 15px;
    border: 1px solid #e3e3e3;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .el-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 0;
    background-color: transparent;
  }
  .el-card__header {
    font-size: 18px;
    color: #222226;
    padding: 0;
    border: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .el-card__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0 0;
    color: #555666;
    flex-direction: column;
    justify-content: space-between;
    .card-footer {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .update-time {
        margin-left: 25px;
      }
    }
  }
}
</style>
