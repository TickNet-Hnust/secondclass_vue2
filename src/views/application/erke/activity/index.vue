<template>
    <div class="app-container">
        <div class="erke-top">
            <div class="erke-top-head">
                <span> <i>✈</i> 活动管理</span>
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
            <el-row>
                <el-col class="operation" :span="5">
                    <el-button type="primary">新增</el-button>
                    <el-button>导出</el-button>
                </el-col>
                <el-col class="filterRadio" :span="19">
                    <el-radio-group
                        v-model="status"
                        size="mini"
                        style="float:right"
                    >
                        <el-radio-button label="全部"></el-radio-button>
                        <el-radio-button label="起草"></el-radio-button>
                        <el-radio-button label="待审核"></el-radio-button>
                        <el-radio-button label="审核通过"></el-radio-button>
                        <el-radio-button label="审核未通过"></el-radio-button>
                        <el-radio-button label="报名中"></el-radio-button>
                        <el-radio-button label="等待中"></el-radio-button>
                        <el-radio-button label="进行中"></el-radio-button>
                        <el-radio-button label="已结束"></el-radio-button>
                        <el-radio-button label="已取消"></el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-table :data="activityData">
                <el-table-column
                    prop="id"
                    label="活动ID"
                    fixed="left"
                    min-width="80"
                ></el-table-column>

                <el-table-column
                    prop="name"
                    label="活动名称"
                    fixed="left"
                    min-width="330"
                >
                    <template slot-scope="scope">
                        <router-link
                            class="textBlue"
                            :to="
                                '/application/erke/activityDetail/' +
                                    scope.row.id
                            "
                            >{{ scope.row.name }}</router-link
                        >
                    </template>
                </el-table-column>

                <el-table-column prop="rankId" label="级别"></el-table-column>

                <el-table-column
                    prop="schoolYearId"
                    label="学年"
                    min-width="120"
                ></el-table-column>

                <el-table-column
                    prop="courseClassificationId"
                    label="活动分类"
                    min-width="140"
                ></el-table-column>

                <el-table-column
                    prop="activityReleserId"
                    label="活动主办方"
                    min-width="160"
                ></el-table-column>

                <el-table-column
                    prop="maxEnrollNumber"
                    label="最大报名人数"
                    min-width="110"
                ></el-table-column>

                <el-table-column
                    prop="enrollNumber"
                    label="报名人数"
                    min-width="80"
                ></el-table-column>

                <el-table-column prop="status" label="状态" min-width="110">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            round
                            :class="sureClass(scope.row.status)"
                            >{{ computedStatus(scope.row.status) }}
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="releaseTime"
                    label="发布时间"
                    min-width="120"
                ></el-table-column>

                <el-table-column
                    prop="applyRange"
                    label="活动分类"
                ></el-table-column>

                <el-table-column
                    prop="enrollWay"
                    label="报名方式"
                ></el-table-column>

                <el-table-column
                    prop="applyWay"
                    label="参与方式"
                ></el-table-column>

                <el-table-column
                    prop="activityStartTime"
                    label="开始时间"
                    min-width="120"
                ></el-table-column>

                <el-table-column
                    prop="recommend"
                    label="是否为推荐活动"
                    min-width="120"
                ></el-table-column>

                <el-table-column label="操作" fixed="right" min-width="310">
                    <template slot-scope="scope">
                        <el-link
                            v-for="(item, index) in operation[scope.row.status]"
                            :key="index"
                            type="info"
                            style="marginRight:10px"
                        >
                            {{ item }}
                        </el-link>
                        <!-- <el-link type="info">修改</el-link> -->
                        <!-- <el-link type="info">申请发布</el-link> -->
                        <!-- <el-link type="info">管理员发布</el-link> -->
                        <!-- <el-link type="info">取消</el-link> -->
                    </template>
                </el-table-column>
            </el-table>
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
        name: 'activity',
        data() {
            return {
                /* 单选条件 */
                status: '全部',
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4,
                    userName: undefined,
                    phonenumber: undefined,
                    status: undefined,
                    deptId: undefined
                },
                activityData: [],
                //活动状态
                dict_sc_activity_status: [],
                //操作映射
                operation: [
                    ['修改', '申请发布', '管理员发布', '取消'],
                    ['审批', '撤回'],
                    ['启动报名', '撤回', '取消'],
                    ['修改', '取消'],
                    ['恢复'],
                    ['结束报名', '启动报名', '暂停报名', '撤回'],
                    ['启动活动', '恢复报名'],
                    ['结束活动', '暂停活动'],
                    ['取消', '回复活动']
                ]
            }
        },
        methods: {
            sureClass(status) {
                if ([0, 8, 4].includes(status)) {
                    return 'textGray'
                } else if ([1, 3, 6].includes(status)) {
                    return 'textRed'
                } else {
                    return 'textGreen'
                }
            },
            async initDict() {
                await Promise.all([getDict('sc_activity_status')]).then(
                    value => {
                        let tempArr = ['dict_sc_activity_status']
                        value.forEach((item, index) => {
                            this[tempArr[index]] = item.data
                        })
                    }
                )
            }
        },
        computed: {
            computedStatus() {
                return status => {
                    return this.dict_sc_activity_status[status].dictLabel
                }
            }
        },
        async created() {
            await this.initDict()
            this.activityData = [
                {
                    id: 1,
                    name: '20级机设五班5月份团活',
                    rankId: '院系级',
                    schoolYearId: '2021-2022学年',
                    courseClassificationId: '年级大会',
                    activityReleserId: '勤工助学部（化工）',
                    maxEnrollNumber: 20,
                    enrollNumber: 11,
                    status: 0,
                    guideTeacherId: 3,
                    releaseTime: '2021-7-25',
                    applyStartTime: '2021-7-22',
                    applyEndTime: '2021-7-25',
                    activityEndTime: '2021-7-25',
                    enrollWay: '报名方式',
                    applyWay: '参与方式',
                    applyRange: '活动分类',
                    activityStartTime: '2021-7-25',
                    recommend: 1
                },
                {
                    id: 2,
                    name: '『百年征程，党史回眸』书法展览学习活动',
                    rankId: '院系级',
                    schoolYearId: '2021-2022学年',
                    courseClassificationId: '诚信教育活动月',
                    activityReleserId: '乒乓球协会',
                    maxEnrollNumber: 220,
                    enrollNumber: 1,
                    status: 1,
                    guideTeacherId: 3,
                    releaseTime: '2021-7-25',
                    applyStartTime: '2021-7-22',
                    applyEndTime: '2021-7-25',
                    activityEndTime: '2021-7-25',
                    enrollWay: '报名方式',
                    applyWay: '参与方式',
                    applyRange: '活动分类',
                    activityStartTime: '2021-7-25',
                    recommend: 1
                },
                {
                    id: 3,
                    name: '乒乓球协会二级裁判实习活动',
                    rankId: '院系级',
                    schoolYearId: '2021-2022学年',
                    courseClassificationId: '团组织生活会',
                    activityReleserId: '勤工助学部（化工）',
                    maxEnrollNumber: 44,
                    enrollNumber: 21,
                    status: 2,
                    guideTeacherId: 3,
                    releaseTime: '2021-7-25',
                    applyStartTime: '2021-7-22',
                    applyEndTime: '2021-7-25',
                    activityEndTime: '2021-7-25',
                    enrollWay: '报名方式',
                    applyWay: '参与方式',
                    applyRange: '活动分类',
                    activityStartTime: '2021-7-25',
                    recommend: 1
                },
                {
                    id: 4,
                    name: '爱捣腾创新俱乐部团组织生活会',
                    rankId: '校级',
                    schoolYearId: '2021-2022学年',
                    courseClassificationId: '自主创业',
                    activityReleserId: '乒乓球协会',
                    maxEnrollNumber: 20,
                    enrollNumber: 11,
                    status: 3,
                    guideTeacherId: 3,
                    releaseTime: '2021-7-25',
                    applyStartTime: '2021-7-22',
                    applyEndTime: '2021-7-25',
                    activityEndTime: '2021-7-25',
                    enrollWay: '报名方式',
                    applyWay: '参与方式',
                    applyRange: '活动分类',
                    activityStartTime: '2021-7-25',
                    recommend: 1
                },
                {
                    id: 5,
                    name: '国际汉文化推广协会团组织生活会',
                    rankId: '院系级',
                    schoolYearId: '2021-2022学年',
                    courseClassificationId: '求职经验交流大会',
                    activityReleserId: '勤工助学部(化工)',
                    maxEnrollNumber: 15,
                    enrollNumber: 12,
                    status: 4,
                    guideTeacherId: 3,
                    releaseTime: '2021-7-25',
                    applyStartTime: '2021-7-22',
                    applyEndTime: '2021-7-25',
                    activityEndTime: '2021-7-25',
                    enrollWay: '报名方式',
                    applyWay: '参与方式',
                    applyRange: '活动分类',
                    activityStartTime: '2021-7-25',
                    recommend: 1
                },
                {
                    id: 6,
                    name: '『百年征程，党史回眸』书法展览学习活动',
                    rankId: '院系级',
                    schoolYearId: '2021-2022学年',
                    courseClassificationId: '年级大会',
                    activityReleserId: '勤工助学部（化工）',
                    maxEnrollNumber: 20,
                    enrollNumber: 11,
                    status: 5,
                    guideTeacherId: 3,
                    releaseTime: '2021-7-25',
                    applyStartTime: '2021-7-22',
                    applyEndTime: '2021-7-25',
                    activityEndTime: '2021-7-25',
                    enrollWay: '报名方式',
                    applyWay: '参与方式',
                    applyRange: '活动分类',
                    activityStartTime: '2021-7-25',
                    recommend: 1
                },
                {
                    id: 7,
                    name: '乒乓球协会二级裁判实习活动',
                    rankId: '院系级',
                    schoolYearId: '2021-2022学年',
                    courseClassificationId: '诚信教育活动月',
                    activityReleserId: '乒乓球协会',
                    maxEnrollNumber: 66,
                    enrollNumber: 11,
                    status: 6,
                    guideTeacherId: 3,
                    releaseTime: '2021-7-25',
                    applyStartTime: '2021-7-22',
                    applyEndTime: '2021-7-25',
                    activityEndTime: '2021-7-25',
                    enrollWay: '报名方式',
                    applyWay: '参与方式',
                    applyRange: '活动分类',
                    activityStartTime: '2021-7-25',
                    recommend: 1
                },
                {
                    id: 8,
                    name: '爱捣腾创新俱乐部团组织生活会',
                    rankId: '院系级',
                    schoolYearId: '2021-2022学年',
                    courseClassificationId: '团组织生活会',
                    activityReleserId: '分团校(化工)',
                    maxEnrollNumber: 20,
                    enrollNumber: 2,
                    status: 7,
                    guideTeacherId: 3,
                    releaseTime: '2021-7-25',
                    applyStartTime: '2021-7-22',
                    applyEndTime: '2021-7-25',
                    activityEndTime: '2021-7-25',
                    enrollWay: '报名方式',
                    applyWay: '参与方式',
                    applyRange: '活动分类',
                    activityStartTime: '2021-7-25',
                    recommend: 1
                },
                {
                    id: 9,
                    name: '国际汉文化推广协会团组织生活会',
                    rankId: '院系级',
                    schoolYearId: '2021-2022学年',
                    courseClassificationId: '自主创业',
                    activityReleserId: '乒乓球协会',
                    maxEnrollNumber: 20,
                    enrollNumber: 9,
                    status: 8,
                    guideTeacherId: 3,
                    releaseTime: '2021-7-25',
                    applyStartTime: '2021-7-22',
                    applyEndTime: '2021-7-25',
                    activityEndTime: '2021-7-25',
                    enrollWay: '报名方式',
                    applyWay: '参与方式',
                    applyRange: '活动分类',
                    activityStartTime: '2021-7-25',
                    recommend: 1
                }
            ]
            console.log(this.dict_sc_activity_status)
        },
        mounted() {}
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
    .textGreen {
        color: #54d7b4;
    }
    .textRed {
        color: #de3c50;
    }
    .textGray {
        color: #808080;
    }
    .textBlue {
        color: #1890ff;
    }
</style>
