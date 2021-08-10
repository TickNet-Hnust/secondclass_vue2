<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                <div class="erke-bottom">
                    <div class="erke-buttom-right">
                        <div class="operate">
                            <el-form :inline="true">
                                <el-row
                                    :gutter="10"
                                    type="flex"
                                    justify="start"
                                    style="flexWrap:wrap"
                                >
                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="学号：">
                                            <el-input data-text></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="姓名：">
                                            <el-input data-text></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 220px">
                                        <el-form-item label="评论发布审核：">
                                            <el-select
                                                value="全部"
                                                style="width:90px"
                                            >
                                                <el-option
                                                    value="全部"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 340px">
                                        <el-form-item label="评价时间">
                                            <el-date-picker
                                                align="right"
                                                type="datetimerange"
                                                range-separator="至"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width:150px">
                                        <el-form-item label="">
                                            <el-button
                                                type="primary"
                                                size="mini"
                                                >查询</el-button
                                            >
                                            <el-button size="mini"
                                                >重置</el-button
                                            >
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>

                        <pagination
                            v-show="queryParams.totalPage > 0"
                            :total="queryParams.totalCount"
                            :page.sync="queryParams.pageCount"
                            :limit.sync="queryParams.pageSize"
                            @pagination="getList($event)"
                        />
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'evaluation',
        data() {
            return {
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4
                }
            }
        }
    }
</script>

<style scoped>
    .erke-top {
        /* height: 120px; */
        padding: 15px;
        margin: 0 0 10px 0;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .erke-bottom {
        /* background-color: #fff; */

        overflow: hidden;
    }

    .erke-buttom-right {
        background-color: #fff;
        margin-left: 0px;
        height: calc(100vh - 140px);
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .operate >>> .el-input__inner[data-text] {
        width: 110px;
    }
    .operate >>> .el-date-editor {
        width: 250px;
    }
    .el-row {
        height: initial;
    }
</style>
