<template>
    <div>
    <el-table
    :data="tableData"
    border
    style="width: 100%"
    @row-click = "info"
    >
    <el-table-column
      prop="id"
      label="ID"
      width="50px">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称">
    </el-table-column>
    <el-table-column
      prop="deptName"
      label="学院名称">
    </el-table-column>
    <el-table-column
      prop="grade"
      label="年级"
      width="80px">
    </el-table-column>
    <!--后期修改成详细的积分类型-->
    <el-table-column
      prop="type"
      label="积分类型">
    </el-table-column>
    <!--后期修改成详细的积分类型-->
    <el-table-column
      prop="setting"
      label="积分详情">
    </el-table-column>
    <el-table-column
      prop="total"
      label="总学时">
    </el-table-column>
    <el-table-column
      prop="warnTime"
      label="预警时间"
      width="160px"
      >
    </el-table-column>
    <el-table-column
      prop="statisticsTime"
      label="统计时间"
      width="160px"
      >
    </el-table-column>
    <el-table-column
      prop="warnStatus"
      label="预警状态">
    </el-table-column>
    <el-table-column
      prop="status"
      label="统计状态">
    </el-table-column>
  </el-table>   
    </div>
</template>

<script>
export default {
    props:{
        tableData:{
            type: Array,
            default:[]
        }
    },
    data() {
      return {
        
      }
    },
    methods: {
        info(val) {
            this.$emit('info',val)
        },
    },
}
</script>

<style>

</style>

