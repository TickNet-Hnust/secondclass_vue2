<template>
    <div class="app-container">
        <div class="erke-top">
            <div class="erke-top-head">
                <span> <i>✈</i> 培养方案</span>
            </div>
            <div class="erke-top-foot">
                <el-row>
                    <el-col :span="4.5">
                        学年度：
                        <el-select value="2021-2022学年">
                            <el-option value="2021-2022学年 "></el-option>
                            <el-option value="2022-2023学年"></el-option>
                            <el-option value="2023-2024学年"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        学院/二级单位:
                        <el-select value="资源环境与安全工程学院">
                            <el-option value="计算机科学与工程学院"></el-option>
                            <el-option value="商学院"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4.5">
                        活动名称：
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="4.5">
                        活动ID：
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="4.5">
                        主办方：
                        <el-input></el-input>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 15px" :gutter="10">
                    <el-col :span="4.5">
                        录取方式：
                        <el-select value="全部" style="width: 80px">
                            <el-option value="全部"></el-option>
                            <el-option value="报名"></el-option>
                            <el-option value="审核"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        发布事件:
                        <el-date-picker
                            type="monthrange"
                            range-separator="至"
                            start-placeholder="开始月份"
                            end-placeholder="结束月份"
                        >
                        </el-date-picker>
                    </el-col>
                    <el-col :span="4.5">
                        活动分类：
                        <el-select value="全部" style="width: 120px">
                            <el-option value="全部"></el-option>
                            <el-option value="报名"></el-option>
                            <el-option value="审核"></el-option>
                        </el-select>
                        --
                        <el-select value="全部" style="width: 120px">
                            <el-option value="全部"></el-option>
                            <el-option value="报名"></el-option>
                            <el-option value="审核"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        推荐活动：
                        <el-switch></el-switch>
                    </el-col>
                    <el-col :span="5">
                        <el-button type="primary" size="mini">查询</el-button>
                        <el-button size="mini">重置</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="erke-bottom">
            asdf
            <pagination
                v-show="queryParams.totalPage > 0"
                :total="queryParams.totalCount"
                :page.sync="queryParams.pageCount"
                :limit.sync="queryParams.pageSize"
                @pagination="getList($event)"
            />
        </div>
    </div>
</template>

<script>
    import formatDate from '@/utils/formatDate.js'
    import { getDict } from '@/api/application/secondClass/dict/type.js'
    import horwheel from 'horwheel'
    import { getToken } from '@/utils/auth'

    export default {
        name: 'erkePlan',
        data() {
            return {
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4,
                    userName: undefined,
                    phonenumber: undefined,
                    status: undefined,
                    deptId: undefined
                }
            }
        },
        created() {},
        methods: {}
    }
</script>

<style scoped>
    .erke-top {
        margin-right: 10px;
        height: 170px;
        padding: 15px;
        margin: 0 0 10px 0;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .erke-top-head {
        height: 50px;
        line-height: 50px;
    }
    .erke-top-head span {
        display: inline-block;
        background-color: #e8f4ff;
        font-weight: 700;
        height: 37px;
        width: 136px;
        border-radius: 20px;
        text-align: center;
        line-height: 40px;
    }
    .erke-top-head span i {
        display: inline-block;
        height: 24px;
        width: 24px;
        border-radius: 12px;
        margin-left: -18px;
        margin-right: 8px;
        line-height: 28px;
        background-color: #1890ff;
    }
    .erke-bottom {
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 15px;
    }
    .el-input {
        width: 200px;
    }

    .el-dialog {
        /* height: 475px !important; */
        overflow: hidden;
    }
</style>
