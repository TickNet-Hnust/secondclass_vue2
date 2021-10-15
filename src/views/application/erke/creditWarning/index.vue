<template>
<div>
  <header class="header">
    <form-option @getSearch="search"/>
  </header>
  <body class="body">  
    <list :tableData="tableData" />
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page.sync="currentPage"
      :page-sizes="[5,10, 20, 50]"
      :page-size="10"
      layout="total,sizes,prev, pager, next"
      :total="total">
    </el-pagination>
  </body>
</div>
</template>

<script>
import list from './components/list.vue'
import option from './components/option.vue'
import {integralRequirementList} from '@/api/application/secondClass/creditWarning/index'
export default {
  components: {
    'list':list,
    'form-option':option
  },
  data() {
    return {
      tableData:[],
      currentPage: 1,
      currentPageSize:10,
      total:0,
      condition:{}
    }
  },
  methods: {
    search(form) {
      this.condition = form 
      console.log(this.condition)
      integralRequirementList(Object.assign({
      pageSize:this.currentPageSize,
      pageNum:1,
      },this.condition)).then(res => {
          this.tableData = res.rows
          this.total = res.total
      })
    },
    handleSizeChange(val) {
      this.currentPageSize = val
      integralRequirementList(Object.assign({
      pageSize:val,
      pageNum:1
      },this.condition)).then(res => {
          this.tableData = res.rows
          this.total = res.total
      })
    },
    handleCurrentChange(val) {
        integralRequirementList(Object.assign({
        pageSize:this.currentPageSize,
        pageNum:val
        },this.condition)).then(res => {
            this.tableData = res.rows
            this.total = res.total
        })
    }
  },
  mounted() {
    //请求数据(10条)
    integralRequirementList({
      pageSize:10,
      pageNum:1
    }).then(res => {
        this.tableData = res.rows
        this.total = res.total
    })
  }
}
</script>

<style scoped>
/*微调UI样式*/
::v-deep .el-pagination {
  text-align: end;
  padding-right: 50px;
}
.header {
  box-sizing: border-box;
  background-color:white;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
.body {
  box-sizing: border-box;
  border-radius: 5px;
}
</style>