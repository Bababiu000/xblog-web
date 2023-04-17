<template>
  <el-aside :width="asideWidth + 'px'">
    <div class="collapse-button">
      <el-icon size="20" style="color: #595959" v-if="!isCollapse"> <i-ep-fold @click="isCollapse = !isCollapse" /> </el-icon>
      <el-icon size="20" style="color: #595959" v-else>
        <i-ep-expand @click="isCollapse = !isCollapse" />
      </el-icon>
    </div>
    <el-descriptions :column="1" :size="size" border v-show="!isCollapse">
      <template #title>
        <el-avatar shape="square" :size="80" :src="curUser.avatarUrl" />
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><i-ep-CaretBottom /></el-icon> id
          </div>
        </template>
        {{ curUser.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><i-ep-user /></el-icon> 用户名
          </div>
        </template>
        {{ curUser.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><i-ep-EditPen /></el-icon> 个性签名
          </div>
        </template>
        {{ curUser.motto }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><i-ep-view /></el-icon> 访问量
          </div>
        </template>
        {{ curUser.views }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><i-ep-iphone /></el-icon> 手机
          </div>
        </template>
        {{ curUser.mobile }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><i-ep-location /></el-icon>地址
          </div>
        </template>
        {{ curUser.address }}
      </el-descriptions-item>
    </el-descriptions>
  </el-aside>
</template>
<script setup>
import { computed, ref } from 'vue'
const isCollapse = ref(false)
const asideWidth = computed(() => {
  return isCollapse.value ? 40 : 300
})
const curUser = JSON.parse(localStorage.getItem('curUser'))
const size = ref('')
</script>

<style lang="less">
.el-aside {
  position: relative;
  padding: 100px 15px 0;
  .collapse-button {
    position: absolute;
    top: 19px;
    right: 8px;
  }
  .el-descriptions {
    .el-descriptions__header {
      justify-content: center;
    }
    .el-icon {
      margin-right: 6px;
    }
  }
}
.cell-item {
  display: flex;
  align-items: center;
}
</style>
