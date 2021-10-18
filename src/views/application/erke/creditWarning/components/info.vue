<template>
    <div>
        <el-dialog title="预警详情" :visible.sync="visible">
        <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
        
        {{infoData.data}}

        <div slot="footer" class="dialog-footer">
            <el-button type="warning" @click="deleteData">删 除</el-button>
            <el-button type="primary" @click="dataExport">导 出</el-button>
        </div>
        </el-dialog>
    </div>
    
</template>

<script>
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
        gridData : [],
        visible:false
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
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        },
        dataExport() {
            console.log('xxxx')
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