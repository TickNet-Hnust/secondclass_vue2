<!--
 * @Descripttion: 培养方案详情
 * @Author: 林舒恒
 * @Date: 2021-06-03 16:39:52
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-10 17:03:31
-->
<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-head">
                        <router-link to="/application/erke/erkePlan"
                            ><el-button
                                circle
                                icon="el-icon-arrow-left"
                            ></el-button
                        ></router-link>
                        <span> <i>✈</i> 群组管理</span>
                    </div>
                    <div class="erke-top-foot">

                        <div style="margin-bottom: 10px" class="noneInput">
                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                            >
                                <template slot="prepend">课程总数</template>
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
                                <template slot="prepend">审核通过</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                            >
                                <template slot="prepend">审核未通过</template>
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
                        
                    </div>
                    <div class="erke-buttom-right">
                        <div class="operate">
                            <el-row
                                :gutter="10"
                                style="flexWrap:wrap"
                                type="flex"
                                justify="space-around"
                            >
                                <el-col :span="1" style="min-width:80px">
                                    <el-select
                                        style="width: 80px"
                                        placeholder="操作"
                                        value="批量修改"
                                    >
                                        <el-option value="批量修改"></el-option>
                                        <el-option value="排序"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="1" style="min-width:200px">
                                    <el-input
                                        suffix-icon="el-icon-search"
                                        placeholder="课程名称"
                                    >
                                    </el-input>
                                </el-col>

                                <el-col :span="1" style="min-width:100px">
                                    <el-select
                                    value="批量修改"
                                        style="width: 100px"
                                    >
                                    </el-select>
                                </el-col>

                                <el-col :span="1" style="min-width:100px">
                                    <el-select
                                    value="批量修改"
                                        style="width: 100px"
                                    >
                                        <el-option
                                            value=""
                                            label="必修课：不限"
                                        ></el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="1" style="min-width:120px">
                                    <el-select
                                        style="width: 120px"
                                        value="批量修改"
                                    >
                                        <el-option
                                            value=""
                                            label="开课学期：不限"
                                        ></el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="1" style="min-width:120px">
                                    <el-select
                                        style="width: 120px"
                                        value="批量修改"
                                        placeholder="发布单位：不限"
                                    >
                                        <el-option
                                            value="0"
                                            label="发布单位：不限"
                                        ></el-option>

                                        <el-option value="保卫处"></el-option>
                                        <el-option value="网络中心"></el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="1" style="min-width:120px">
                                    <el-select
                                        style="width: 120px"
                                        value="批量修改"
                                    >
                                        <el-option
                                            value=""
                                            label="课程性质：不限"
                                        ></el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="1" style="min-width:340px">
                                    <el-radio-group
                                        size="mini"
                                    >
                                        <el-radio-button
                                            label="全部"
                                        ></el-radio-button>
                                    </el-radio-group>
                                </el-col>
                            </el-row>
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
    
                queryParams: {
                    totalCount: 0,
                    totalPage: 0,
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
        height: calc(100vh - 260px);
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .erke-buttom-right {
        background-color: #fff;
        margin-left: 225px;
        height: calc(100vh - 260px);
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
</style>
