<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-11 15:43:03
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-11 16:10:50
-->
<template>
    <div>
        <div class="erke-bottom">
            <el-row :gutter="10" style="margin-bottom: 20px">
                <el-col :span="1.5">
                    <el-button
                        type="primary"
                        plain
                        icon="el-icon-plus"
                        size="mini"
                        v-hasPermi="['system:user:add']"
                        >新增</el-button
                    >
                </el-col>

                <el-col :span="1.5">
                    <el-button
                        type="info"
                        plain
                        icon="el-icon-upload2"
                        size="mini"
                        v-hasPermi="['system:user:import']"
                        >导入</el-button
                    >
                </el-col>
                <el-col :span="1.5">
                    <el-button
                        type="warning"
                        plain
                        icon="el-icon-download"
                        size="mini"
                        v-hasPermi="['system:user:export']"
                        >导出</el-button
                    >
                </el-col>
                <el-col :span="1.5">
                    <el-input
                        size="mini"
                        suffix-icon="el-icon-search"
                    ></el-input>
                </el-col>

                <!-- <right-toolbar
                        :showSearch.sync="showSearch"
                        @queryTable="getList"
                        :columns="columns"
                    ></right-toolbar> -->
            </el-row>


            <pagination
                v-show="queryParams.totalPage > 0"
                :total="queryParams.totalCount"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
            />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            queryParams: {
                totalPage:0,
                totalCount: 0,
                pageNum:1,
                pageSize:10
            }
        }
    }
}
</script>
<style scoped>
.erke-bottom {
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 15px;
        max-height: calc(100vh - 180px);
        overflow: auto;
    }
</style>