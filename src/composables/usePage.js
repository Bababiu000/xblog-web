/* eslint-disable no-unused-vars */
import { ref, onMounted, getCurrentInstance } from 'vue'

export const usePage = opts => {
  const { proxy } = getCurrentInstance()
  const {
    api = {
      listUrl: '',
      saveUrl: '',
      delUrl: ''
    },
    // 新增表单
    formData = {}
  } = opts

  const tableData = ref([])
  // 表单显示
  const isDialog = ref(false)
  // 删除提示框
  const isMessageBox = ref(false)
  // 删除数据
  const delArr = ref([])
  const isNoData = ref(false)
  // 分页信息
  const pageInfo = ref({
    pageSize: 10, //每页10条数据
    pageNum: 1, //当前页
    total: 0 //总条数
  })
  // 查询参数
  const queryParams = ref({})
  // 合并分页参数和其他查询参数
  const searchMerge = ref({})
  const statusList = ref([
    {
      value: '启用'
    },
    {
      value: '禁用'
    }
  ])
  const roleTypeList = ref([
    {
      label: 'ROLE_USER',
      value: 0
    },
    {
      label: 'ROLE_ADMIN',
      value: 1
    }
  ])
  // 获取数据
  const getList = () => {
    proxy.$http.post(api.listUrl, searchMerge.value).then(res => {
      tableData.value = res.data.records
      pageInfo.value.total = res.data.total
    })
  }
  // 发起删除请求
  const delData = () => {
    proxy.$http.post(api.delUrl, delArr.value).then(res => {
      proxy.$message({
        message: '操作成功',
        type: 'success'
      })
      getList()
    })
  }
  // 搜索
  const search = () => {
    searchMerge.value = { ...pageInfo.value, queryParams }
    getList()
    // this.throttle = this.conduct(this.Fn, 1000, 2000)
  }
  // 新增
  const handleAdd = () => {
    isDialog.value = true
    formData.value = { status: '启用' }
  }
  // 提交表单
  const submitDialog = formData => {
    isDialog.value = false
    formData.value = Object.assign({}, formData)
    saveForm()
  }
  // 提交新增或更新
  const saveForm = () => {
    proxy.$http.post(api.saveUrl, formData.value).then(res => {
      proxy.$message({
        message: '操作成功',
        type: 'success'
      })
      getList()
    })
  }
  // 重置查询参数
  const resetSearch = () => {
    queryParams.value = {}
    getList()
  }
  // 多选
  const selectionChange = data => {
    delArr.value = []
    data.forEach(item => {
      delArr.value.push(item.id)
    })
  }
  // 删除提示框
  const delMessage = () => {
    proxy
      .$confirm(`此操作将永久删除ID为：<span style="color:red;font-weight: bold">[${delArr.value}]</span>的数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        dangerouslyUseHTMLString: true
      })
      .then(() => {
        delData()
      })
      .catch(() => {
        proxy.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  // 点击全部删除
  const delAll = () => {
    // this.isMessageBox = true
    delMessage()
  }
  // 点击删除
  const handleDelete = id => {
    delArr.value = []
    delArr.value.push(id)
    delMessage()
  }
  // 编辑
  const handleEdit = item => {
    isDialog.value = true
    formData.value = item
  }
  // 控制每页页数
  const handleSizeChange = val => {
    pageInfo.value.pageSize = val
    searchMerge.value = { ...pageInfo.value, queryParams }
    getList()
  }
  // 控制页面切换
  const handleCurrentChange = val => {
    pageInfo.value.pageNum = val
    searchMerge.value = { ...pageInfo.value, queryParams }
    getList()
  }

  onMounted(() => {
    //很多问题都是和执行顺序有关
    searchMerge.value = { ...pageInfo.value, queryParams }
    try {
      getList()
    } catch (e) {
      console.log('getList方法不存在')
      console.log(e)
    }
  })

  return {
    tableData,
    isDialog,
    delArr,
    pageInfo,
    queryParams,
    searchMerge,
    statusList,
    roleTypeList,
    getList,
    search,
    handleAdd,
    submitDialog,
    saveForm,
    resetSearch,
    selectionChange,
    delMessage,
    delAll,
    handleDelete,
    handleEdit,
    delData,
    handleSizeChange,
    handleCurrentChange,
    onMounted
  }
}
