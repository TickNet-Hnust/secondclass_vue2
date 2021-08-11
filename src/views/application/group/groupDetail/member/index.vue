<!--
 * @Descripttion: 培养方案详情
 * @Author: 林舒恒
 * @Date: 2021-06-03 16:39:52
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-11 16:05:12
-->
<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-foot">
                        <el-button
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            size="mini"
                            v-hasPermi="['system:user:add']"
                            >新增</el-button
                        >

                        <el-button
                            type="warning"
                            plain
                            icon="el-icon-download"
                            size="mini"
                            v-hasPermi="['system:user:export']"
                            >导出</el-button
                        >
                        <el-tooltip
                            effect="dark"
                            content="清空查询条件"
                            placement="right"
                        >
                            <el-button
                                circle
                                icon="el-icon-refresh"
                            >
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>

                <div class="erke-bottom">
                    <div class="erke-buttom-left">
                        <el-menu
                            default-active=""
                            class="el-menu-vertical-demo"
                        >
                            
                        </el-menu>
                        <!-- <ul>
                            <li
                                v-for="(item, index) in classificationList"
                                :key="index"
                                @click="renderPlanData(item.id)"
                            >
                                {{ item.name }}
                            </li>
                        </ul> -->
                    </div>
                    <div class="erke-buttom-right">
                        <div class="operate">
                            <el-form>
                                <el-row
                                    :gutter="10"
                                    style="flexWrap:wrap"
                                    type="flex"
                                    justify="space-around"
                                >
                                    <el-col :span="1" style="min-width:280px">
                                        <el-form-item
                                            label="活动名称"
                                        >
                                            <el-input></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width:175px">
                                        <el-form-item
                                            label="活动ID"
                                        >
                                            <el-input class="data-text"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:280px">
                                        <el-form-item
                                            label="分类"
                                        >
                                            <el-select
                                                value="全部"
                                            >
                                                <el-option value="全部"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:310px">
                                        <el-form-item
                                            label="指导单位"
                                        >
                                            <el-select
                                                value="全部"
                                            >
                                                <el-option value="全部"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:200px">
                                        <el-form-item
                                            label="指导老师"
                                        >
                                            <el-input class="data-text"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:270px">
                                        <el-form-item
                                            label="状态"
                                        >
                                            <el-select
                                                value="全部"
                                            >
                                                <el-option value="全部"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:180px">
                                        <el-form-item
                                            label="负责人"
                                        >
                                            <el-input class="data-text"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:210px">
                                        <el-form-item
                                            label="负责人学号"
                                        >
                                            <el-input class="data-text"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:430px">
                                        <el-form-item
                                            label="更新时间"
                                        >
                                            <el-date-picker
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                            >
                                                </el-date-picker>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:120px">
                                        <el-form-item
                                            label="推荐群组"
                                        >
                                            <el-switch></el-switch>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:140px">
                                        <el-form-item
                                            label=""
                                        >
                                            <el-button
                                                size="mini"
                                                type="primary"
                                            >查询</el-button>
                                            <el-button
                                                size="mini"
                                            >重置</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                        
                        <pagination
                            v-show="queryParams.totalPage > 0"
                            :total="queryParams.totalCount"
                            :page.sync="queryParams.pageNum"
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
    import {
        
    } from '@/api/application/secondClass/index'

    import { getDict } from '@/api/application/secondClass/dict/type.js'

    import { filterCourseClassificationList, format } from '@/utils/gather.js'
    import horwheel from 'horwheel'

    import { importTemplate } from '@/api/system/user'
    import { getToken } from '@/utils/auth'

    export default {
        name: 'detail',
        data() {
            return {
                queryParams: {
                    totalCount: 0,
                    totalPage: 0,
                    pageNum: 1,
                    pageSize: 10
                },
            }
        },
        computed: {
        },
        methods: {

        },
        async created() {

        },
        async beforeMount() {},
        async mounted() {}
    }
</script>

<style scoped>
    .erke-top {
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
        margin-left: 10px;
        font-weight: 700;
        height: 37px;
        width: 180px;
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
    .erke-buttom-left {
        width: 220px;
        float: left;
        padding: 16px;
        height: calc(100vh - 220px);
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .erke-buttom-right {
        background-color: #fff;
        margin-left: 225px;
        height: calc(100vh - 220px);
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: auto;
    }
    .operate >>> .el-col {
        height: 58px;
    }
    .el-input {
        width: 200px;
    }

    .el-form .el-row {
        height: initial;
    }
    .el-input.data-text,
    .el-input.data-text >>> .el-input__inner {
        width: 110px;
    }
</style>
