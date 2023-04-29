<template>
  <div>
    <el-drawer :size="size" :title="formData.id == null ? '新增数据' : '编辑数据'" :before-close="handleClose" direction="rtl" class="demo-drawer" ref="drawer" :model-value="isDialog">
      <div class="demo-drawer__content">
        <el-form :model="formData" :rules="rulesForm" ref="formDataRef" label-width="100px" class="demo-ruleForm">
          <slot name="content">这里是中间</slot>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitForm" :loading="loading">提 交</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object,
    default: function () {
      return {}
    }
  },
  rulesForm: {
    type: Object,
    default: function () {
      return {}
    }
  },
  size: {
    type: String,
    default: '30%'
  }
})

const emits = defineEmits(['close-drawer', 'submit-drawer'])

const loading = ref(false)

const handleClose = () => {
  emits('close-drawer')
  proxy.$nextTick(() => proxy.$refs['formDataRef'].clearValidate())
}
const submitForm = () => {
  proxy.$nextTick(() => proxy.$refs['formDataRef'].clearValidate())
  proxy.$refs['formDataRef'].validate(valid => {
    if (valid) {
      emits('submit-drawer', props.formData)
    } else {
      proxy.$message.error('请填写符合条件的数据')
      return false
    }
  })
}
</script>

<style lang="less">
.demo-drawer__content {
  width: 80%;
  margin: 0 auto;
  .el-form {
    padding-bottom: 50px;
  }
  .demo-drawer__footer {
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 98.9%;
    padding: 10px 184px;
    text-align: right;
    background-color: #fff;
    border-top: 1px solid #e5e6eb;
  }
}
</style>
