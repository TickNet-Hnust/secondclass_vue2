<template>
<div>
  <header class="header">
    <form-option @getSearch="search" @create="addData"/>
  </header>
  <body class="body">  
    <list :tableData="tableData" @info="getListinfo"/>
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
  <info-page :infoData="infoData" :dialogTableVisible="infoVisible" @deleteData="deleteData"/>
</div>
</template>

<script>
import list from './components/list.vue'
import option from './components/option.vue'
import info from './components/info.vue'
import {
  integralRequirementList,
  integralRequirementAdd,
  integralRequirementDelete,
  integralRequirementStatistics
} from '@/api/application/secondClass/creditWarning/index'
export default {
  components: {
    'list':list,
    'form-option':option,
    'info-page':info
  },
  data() {
    return {
      tableData:[],
      currentPage: 1,
      currentPageSize:10,
      total:0,
      condition:{},
      fcourseList:{},//学分类型表
      infoData:{},
      infoVisible:false
    }
  },
  methods: {
    /**
     * 查询条件
     */
    search(form) {
      this.condition = form 
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
    },
    /**
     * 查询info
     */
    async getListinfo(val) {
      let data = []
      if(val.status === '已统计') {
        const res = await integralRequirementStatistics({id:val['id']})
        if(res.data) data = res.data
      }
      this.infoData = {
        id:val.id,
        data
      }
      if(this.infoVisible === true) this.infoVisible = false
      setTimeout(()=>{this.infoVisible = true},200)
    },
    /**
     * 新增条目
     */
    addData(data) {
      integralRequirementAdd(data).then(res=>{
        this.$message({
                    message: '添加成功',
                    type: 'success'
              });
        this.search()
      }).catch(err=>{
        this.$message({
                    message: '添加失败',
                    type: 'warning'
              });
      })
    },
    /**
     * 转换setting成汉字
     */
    translateSetting(data) {
      return data.split('&&')
      .map(val => {
        let str = ''
        str += this.fcourseList[val.split(':')[0]]
        str += val.split(':')[1]
        str += '分'
        return str
      })
      .join(";")
    },
    /**
     * 删除数据
     */
    deleteData(id) {
      integralRequirementDelete({id}).then(res => {
        this.$message({
            type: 'success',
            message: '删除成功!'
        });
        this.infoVisible = false
      })
    }
  },
  watch:{
    //更新数据
    tableData:function(value) {
      value.forEach(val => {
        if(val.setting)
        val.setting = this.translateSetting(val.setting)
        else val.setting = "无"
        if(val.type == 0) val.type = '达标总分类型 '
        else val.type = '各学分类型'
        if(val.warnStatus == 1) val.warnStatus = '已预警'
        else val.warnStatus = '未预警'
        if(val.status == 1) val.status = '已统计'
        else val.status = '未统计'
      });
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
    JSON.parse(localStorage.getItem('courseList')).forEach(val => {
      if(val.pid == 0)
      this.fcourseList[val.id] = val.name
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
  display: block;
  position: sticky;
  top: 0;
  z-index: 2;
  box-sizing: border-box;
  background-color:white;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  position: -webkit-sticky;
}
.body {
  box-sizing: border-box;
  border-radius: 5px;
  height: calc(100vh - 185px);
  overflow: auto;
}
.infopage {
  display: flex;
  position: fixed;
  top: 50px;
  z-index: 7;
  background-color: sandybrown;
}
</style>