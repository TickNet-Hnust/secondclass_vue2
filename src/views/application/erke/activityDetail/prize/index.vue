<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-foot">
                        <el-row :gutter="20">
                            <el-col :span="1" style="min-width:140px">
                                <el-button icon="el-icon-plus" type="primary"
                                    >奖项管理</el-button
                                >
                            </el-col>
                            <el-col :span="1" style="min-width:190px">
                                <el-input value="200">
                                    <template slot="prepend">
                                        奖项种类：
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="min-width:190px">
                                <el-input value="50">
                                    <template slot="prepend">
                                        奖项数量：
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="min-width:190px">
                                <el-input value="50">
                                    <template slot="prepend">
                                        获奖人数：
                                    </template>
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div class="erke-bottom">
                    <div class="erke-buttom-left">
                        <ul>
                            <li>全部<span>50</span></li>
                            <li>长板轴承</li>
                            <li>桥钉</li>
                            <li>手指滑板</li>
                            <li>滑板项链</li>
                        </ul>
                    </div>
                    <div class="erke-buttom-right">
                        <div class="operate">
                            <el-form :inline="true" class="demo-form-inline">
                                <el-row
                                    :gutter="0"
                                    type="flex"
                                    justify="space-around"
                                    style="flexWrap:wrap"
                                >
                                    <el-col :span="1" style="min-width:80px">
                                        <el-form-item label="">
                                            <el-select
                                                value="操作"
                                                style="width:80px"
                                            >
                                                <el-option
                                                    value="fuckyou"
                                                    label="操作"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="学号:">
                                            <el-input data-text></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="姓名:">
                                            <el-input data-text></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="奖品:">
                                            <el-input data-text></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:205px">
                                        <el-form-item label="奖项类别:">
                                            <el-select
                                                value="操作"
                                                style="width:120px"
                                            >
                                                <el-option
                                                    value="fuckman"
                                                    label="操作"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:250px">
                                        <el-form-item label="发放时间:">
                                            <el-date-picker
                                                align="right"
                                                type="date"
                                                placeholder="选择日期"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width:130px">
                                        <el-button type="primary" size="mini"
                                            >查询</el-button
                                        >
                                        <el-button size="mini">重置</el-button>
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
    //导入活动奖项相关接口
    import { activityPrize } from '@/api/application/secondClass/index'

    export default {
        name: 'Prize',
        data() {
            return {
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4
                }
            }
        },
        methods: {
            getActivityPrize(option) {
                //  后端接口还没写好，之后再写
                //   activityPrize(option).then(value=>{
                //       console.log(value);
                //   })
            }
        },
        async created() {
            //初始化字典
            // this.initDict()

            //获取活动奖项总信息
            this.getActivityPrize({
                activityId: this.$route.params.aid
            })
            /** 获得当前情况下的奖项管理列表 */
            // this.fuzzyQuery()
        }
    }
</script>

<style scoped>
    .erke-top {
        /* height: 120px; */
        padding: 30px;
        margin: 0 0 10px 0;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .erke-bottom {
        /* background-color: #fff; */

        overflow: hidden;
    }
    .erke-buttom-left {
        width: 300px;
        float: left;
        padding: 16px;
        height: calc(100vh - 250px);
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .erke-buttom-left ul {
        margin: 0;
        padding: 0;
    }
    .erke-buttom-left li {
        position: relative;
        list-style: none;
        font-size: 13px;
        /* width: px; */
        height: 40px;
        padding: 0 20px;
        color: #979797;
        line-height: 40px;
        border-radius: 5px;
        border-bottom: 1px dashed #ddd;
    }
    .erke-buttom-left li:hover {
        background-color: #e6f7ff;
        color: #0084d1;
        cursor: pointer;
    }
    .erke-buttom-left li span {
        position: absolute;
        right: 10px;
        width: 20px;
        text-align: center;
        top: 0;
    }
    .erke-buttom-right {
        background-color: #fff;
        margin-left: 305px;
        height: calc(100vh - 250px);
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .labelSpan {
        display: inline-block;
        margin-right: 50px;
    }
    .textSpan {
        color: #888;
    }
    .erke-top-foot {
        font-size: 14px;
    }
    .operate >>> .el-input__inner[data-text] {
        width: 110px;
    }
    .operate >>> .el-date-editor {
        width: 160px;
    }
    .el-row {
        height: initial;
    }
</style>
