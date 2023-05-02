<template>
  <el-aside :width="asideWidth + 'px'">
    <div class="collapse-button">
      <el-icon size="20" style="color: #595959" v-if="!isCollapse"> <i-ep-fold @click="isCollapse = !isCollapse" /> </el-icon>
      <el-icon size="20" style="color: #595959" v-else>
        <i-ep-expand @click="isCollapse = !isCollapse" />
      </el-icon>
    </div>
    <div class="aside-content" v-show="!isCollapse">
      <el-descriptions :column="1" :size="size" border>
        <template #title>
          <img :src="curUser.avatarUrl" alt="" class="avatar" v-if="curUser.avatarUrl" />
          <img src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" alt="" class="avatar" v-else />
        </template>
        <el-descriptions-item width="50%">
          <template #label>
            <div class="cell-item">
              <el-icon><i-ep-CaretBottom /></el-icon> id
            </div>
          </template>
          {{ curUser.id || '--' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><i-ep-user /></el-icon> 用户名
            </div>
          </template>
          {{ curUser.username || '--' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><i-ep-EditPen /></el-icon> 个性签名
            </div>
          </template>
          {{ curUser.motto || '--' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><i-ep-view /></el-icon> 访问量
            </div>
          </template>
          {{ curUser.views || '--' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><i-ep-iphone /></el-icon> 手机
            </div>
          </template>
          {{ curUser.mobile || '--' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><i-ep-location /></el-icon>地址
            </div>
          </template>
          {{ curUser.address || '--' }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="tip" v-if="!curUser.id"><span class="loginBtn" @click="proxy.$router.push('/login')">登录</span>以查看个人信息</div>
    </div>
  </el-aside>
</template>
<script setup>
import { computed, ref, getCurrentInstance } from 'vue'
const isCollapse = ref(false)
const asideWidth = computed(() => {
  return isCollapse.value ? 40 : 300
})
const curUser = JSON.parse(localStorage.getItem('curUser')) || {}
const size = ref('')

const { proxy } = getCurrentInstance()
</script>

<style lang="less">
.aside-container {
  .el-aside {
    position: relative;
    padding: 100px 15px 0;
    height: 100vh;
    .collapse-button {
      position: absolute;
      top: 19px;
      right: 8px;
    }
    .el-descriptions {
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        border: 1px solid #e3e3e3;
      }
      .el-descriptions__header {
        justify-content: center;
      }
      .el-icon {
        margin-right: 6px;
      }
    }
    .tip {
      margin-top: 25px;
      text-align: center;
      color: #303133;
      .loginBtn {
        cursor: pointer;
        color: #409eff;
        margin-right: 1px;
      }
    }
  }
  .cell-item {
    display: flex;
    align-items: center;
  }
}
</style>
