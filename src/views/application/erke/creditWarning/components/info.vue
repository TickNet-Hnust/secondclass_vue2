<template>
    <div>
        <el-dialog title="预警详情" :visible.sync="visible">
        <el-table :data="infoData.data" height="500px" size="mini">
            <el-table-column property="id" label="ID" ></el-table-column>
            <el-table-column property="deptName" label="学院名称" width="200px"></el-table-column>
            <el-table-column property="studentNumber" label="在校生人数"></el-table-column>
            <el-table-column property="reachStandardNumber" label="在校生人数"></el-table-column>
            <el-table-column property="ratio" label="在校生人数"></el-table-column>
        </el-table>
        

        <div slot="footer" class="dialog-footer">
            <el-button type="warning" @click="deleteData">删 除</el-button>
            <el-button type="primary" @click="dataExport">导 出</el-button>
        </div>
        </el-dialog>
    </div>
    
</template>

<script>
import {integralRequirementStatisticsExport} from '@/api/application/secondClass/creditWarning/index'

export default {
    props:{
        infoData: {
            type: Object,
            default:{}
        },
        dialogTableVisible: {
            type:Boolean,
            default:false
        }
    },
    data() {
      return {
        visible:false,
      }
    },
    methods: {
        deleteData() {
            const that = this
            // console.log(this.infoData)
            this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.$emit('deleteData',this.infoData['id'])
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        },
        /**
         * 导出
         */
        dataExport() {
            const that = this
            this.$confirm('是否确认导出数据项?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
                }).then(function() {
                return integralRequirementStatisticsExport({
                    id:that.infoData.id
                })}).then(response => {
                // console.log(response)
                this.download(response.msg)
                }).catch(err => {
                    console.log(err)
                })
        }
    },
    watch:{
        dialogTableVisible(val) {
            this.visible = val
        }
    }
}
</script>

<style>

</style>