<template>
  <el-dialog :title="title" width="30%" :before-close="handleClose" class="dialog">
    <el-form :model="formData" :rules="rulesForm" ref="formDataRef" label-width="100px" class="demo-ruleForm">
      <slot name="content">这里是中间</slot>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm"> 确认 </el-button>
        <el-button @click="handleClose">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, getCurrentInstance, computed, defineProps, defineEmits } from 'vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  title: {
    type: String,
    default: ''
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
const emits = defineEmits(['close-dialog', 'submit-dialog'])

const handleClose = () => {
  proxy.$nextTick(() => proxy.$refs['formDataRef'].clearValidate())
  emits('close-dialog')
}

const submitForm = () => {
  proxy.$nextTick(() => proxy.$refs['formDataRef'].clearValidate())
  proxy.$refs['formDataRef'].validate(valid => {
    if (valid) {
      emits('submit-dialog', props.formData)
    } else {
      proxy.$message.error('请填写符合条件的数据')
      return false
    }
  })
}
</script>

<style lang="less">
.dialog {
  padding-right: 45px;
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
}
</style>
