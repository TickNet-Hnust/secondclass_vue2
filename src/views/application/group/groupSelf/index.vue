<!--
 * @Descripttion: 培养方案详情
 * @Author: 林舒恒
 * @Date: 2021-06-03 16:39:52
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-11 15:36:00
-->
<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-head">
                        <span> <i>✈</i> 群组管理</span>
                    </div>
                    <div class="erke-top-foot">

                        <div style="margin-bottom: 10px" class="noneInput">
                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                            >
                                <template slot="prepend">群组总数</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                            >
                                <template slot="prepend">有效群组</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                            >
                                <template slot="prepend">申请中</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                            >
                                <template slot="prepend">已解散</template>
                            </el-input>
                        </div>

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
                            >导入</el-button
                        >
                        <el-button
                            type="info"
                            plain
                            icon="el-icon-download"
                            size="mini"
                            v-hasPermi="['system:user:export']"
                            >导出</el-button
                        >
                        <el-button
                            type="info"
                            plain
                            icon="el-icon-sort"
                            size="mini"
                            v-hasPermi="['system:user:export']"
                            >排序</el-button
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
                        <el-tabs>
                            <el-tab-pane label="根据分类">
                                <el-menu>
                                    <el-menu-item>
                                        <span slot="title">全部</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">班级</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">社团与协会</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">年级组</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">校学生会组织</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">院学生会组织</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">校团委</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">院团委</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">校社联</span>
                                    </el-menu-item>
                                </el-menu>
                            </el-tab-pane>
                            <el-tab-pane label="根据指导单位">
                                <el-menu>
                                    <el-menu>
                                    <el-menu-item>
                                        <span slot="title">全部</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">资环环境与安全工程学院</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">土木工程学院</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">机械工程学院</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">化学化工学院</span>
                                    </el-menu-item>
                                </el-menu>
                                </el-menu>
                            </el-tab-pane>
                        </el-tabs>
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
                        <el-table
                            :data="groupList"
                        >
                            <el-table-column
                                label="ID"
                                prop="id"
                            ></el-table-column>
                            <el-table-column
                                label="群组名称"
                                prop="name"
                            >
                                <template slot-scope="scope">
                                    <router-link
                                        class="textBlue"
                                        :to="
                                            '/application/group/groupDetail/' +
                                                scope.row.id
                                        "
                                        >{{ scope.row.name }}</router-link
                                    >
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop=""
                            >
                                <template>
                                    恢复
                                </template>
                            </el-table-column>
                        </el-table>
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
        trainingProgramDetail,
        trainingProgramList,
        trainingProgramId,
        courseClassificationList,
        schoolYearList,
        schoolYearMulti,
        courseId,
        coursePost,
        coursePut,
        courseDelete
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
                groupList:[{
                    id: 1,
                    name: '第二课堂服务部',
                },{
                    id: 2,
                    name: '第二课堂部'
                }],
                queryParams: {
                    totalCount: 10,
                    totalPage: 10,
                    pageNum: 1,
                    pageSize: 10
                }
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
    .textRed {
        color: #de3c50;
    }
    .textgreen {
        color: #54d7b4;
    }
    .textyellow {
        color: yellow;
    }
    .textPlain {
        color: #8b8b8b;
    }
    .unitValue .el-input__inner,
    .unitValue .el-input--suffix {
        width: 260px;
    }
    .unitValue .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    /*two*/
    .switchStyle .el-switch__label {
        position: absolute;
        display: none;
        color: #fff;
    }
    .switchStyle .el-switch__label--left {
        z-index: 9;
        left: 22px;
    }
    .switchStyle .el-switch__label--right {
        z-index: 9;
        left: -2px;
    }
    .switchStyle .el-switch__label.is-active {
        display: block;
    }
    .switchStyle.el-switch .el-switch__core,
    .el-switch .el-switch__label {
        width: 45px !important;
    }
    /*three*/
    .className .el-input__inner {
        width: 330px;
    }

    .shoutInput .el-input__inner,
    .shoutInput .el-input--suffix {
        width: 130px;
    }
    .shoutInput .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    /*four line */
    .sortClass .el-input__inner,
    .sortClass .el-input--suffix {
        width: 200px;
    }
    .sortClass .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    /*five */
    .classSort .el-input__inner,
    .classSort .el-input--suffix {
        width: 180px;
    }
    .classSort .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }

    .activitySort .el-input__inner,
    .activitySort .el-input--suffix {
        width: 320px;
    }
    .activitySort .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }

    .rankSort .el-input__inner,
    .rankSort .el-input--suffix {
        width: 100px;
    }
    .rankSort .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    textarea {
        resize: none !important;
        height: 150px;
        width: 690px !important;
        border: 1px solid #aaa !important;
    }
    .addDetailDialog >>> .el-dialog__body {
        height: 500px;
        overflow: auto;
    }
    .addDetailDialog .el-form > .el-row {
        margin: 13px 0 !important;
    }

    .addDetailDialog .el-dialog__header {
        border-bottom: 1px solid #ddd;
    }
    .addOrMine {
        cursor: pointer;
        display: inline-block;
        height: 30px;
        width: 30px;
        text-align: center;
        vertical-align: top;
        line-height: 30px;
        border: 1px solid #aaa;
        border-radius: 3px;
    }
    .exportDialog >>> .el-dialog {
        width: 762px !important;
    }
    .exportDialog >>> .el-dialog__body {
        padding-top: 10px;
        height: 390px;
    }
    .exportDialog >>> .el-tabs__header {
        width: 260px;
    }
    .exportDialog >>> .el-tabs__item {
        text-align: left;
    }
    .planExport {
        position: relative;
    }
    .planExport::after {
        position: absolute;
        right: 0;
        top: -40px;
        content: '';
        width: 1px;
        height: 400px;
        background-color: #ddd;
    }
    .planExport >>> .el-tree-node__content {
        height: 40px;
        line-height: 20px;
        padding: 10px;
    }
    * >>> .is-current {
        background-color: #f6f7f9;
        color: #5f9dfd;
        cursor: pointer;
    }
    .planChoose >>> .el-checkbox {
        margin: 5px 20px !important;
        width: 320px;
    }
    .detailMainTable >>> .el-table__body-wrapper {
        /* overflow: auto; */
    }
    .mb10 {
        margin-bottom: 10px;
    }
    .el-form .el-row {
        height: initial;
    }
    .el-input.data-text,
    .el-input.data-text >>> .el-input__inner {
        width: 110px;
    }
    .operate >>> .el-input__inner[data-text] {
        width: 110px;
    }
    .textBlue {
        color: #1890ff;
    }
</style>
