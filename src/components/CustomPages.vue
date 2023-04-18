<template>
  <el-pagination background :is-show="isPagesShow" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :layout="layout" :total="total"> </el-pagination>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  currentPage: {
    type: [String, Number],
    default: 1
  },
  total: {
    type: [String, Number],
    default: 0
  },
  pageSizes: {
    type: Array,
    default: function () {
      return [5, 10, 15, 20]
    }
  },
  pageSize: {
    type: [String, Number],
    default: 10
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  isPagesShow: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['size-change', 'current-change'])
const handleSizeChange = val => {
  emits('size-change', val)
}
const handleCurrentChange = val => {
  emits('current-change', val)
}
</script>
<style scoped>
.el-pagination {
  margin: 15px 5px;
}
.page {
  text-align: center;
  color: #409eff;
}
</style>
