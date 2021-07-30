<template>
    <div class="app-container">
        <div class="erke-top">
            <div class="erke-top-head">
                <span> <i>✈</i> 活动管理</span>
            </div>
            <div class="erke-top-foot">
                <el-row :gutter="15" type="flex" justify="start">
                    <el-col :span="1" style="min-width:310px">
                        学年度：
                        <el-select v-model="schoolYearList.value">
                            <el-option 
                                value=""
                                label="全部"
                            ></el-option>
                            <el-option 
                                v-for="(item,index) in schoolYearList.rows"
                                :key="index"
                                :value="item.id"
                                :label="item.yearName"
                            ></el-option>
                            
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="min-width:340px">
                        学院/二级单位:
                        <el-select value="资源环境与安全工程学院">
                            <el-option value="计算机科学与工程学院"></el-option>
                            <el-option value="商学院"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="min-width:270px;">
                        活动名称：
                        <el-input v-model="queryList.name" style="width:180px"></el-input>
                    </el-col>
                    <el-col :span="1" style="min-width:140px">
                        活动ID：
                        <el-input v-model="queryList.id" style="width:60px"></el-input>
                    </el-col>
                    <el-col :span="1" style="min-width:245px">
                        主办方：
                        <el-input v-model="queryList.groupName" style="width:160px"></el-input>
                    </el-col>
                </el-row>
                <el-row
                    style="margin-top: 15px"
                    :gutter="10"
                    type="flex"
                    justify="start"
                >
                    <el-col :span="1" style="min-width:165px">
                        录取方式：
                        <el-select v-model="queryList.admissionWay" style="width: 80px">
                            <el-option label="不限" value=""></el-option>
                            <el-option 
                                v-for="(item,index) in dict_sc_activity_admission_way"
                                :key="index"
                                :value="item.dictValue"
                                :label="item.dictLabel"
                            ></el-option>
                            
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="min-width:380px">
                        发布时间:
                        <el-date-picker
                        style="max-width:280px"
                            v-model="queryList.createTime"
                            type="datetimerange"
                            @change="TimeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                            </el-date-picker>
                    </el-col>
                    <el-col :span="1" style="min-width:470px">
                        活动分类：
                        <el-cascader
                        :options="datadata"
                        :props="{ checkStrictly: true }"
                        :show-all-levels="true"
                        class="activityCascader"
                        
                    ></el-cascader>
                    </el-col>
                    <el-col :span="1" style="min-width:140px">
                        推荐活动：
                        <el-switch
                            :value="Boolean(queryList.recommend)"
                            @change="queryList.recommend = Number($event)"
                        ></el-switch>
                    </el-col>
                    <el-col :span="1" style="min-width:135px">
                        <el-button type="primary" size="mini" @click="fuzzyQuery">查询</el-button>
                        <el-button size="mini">重置</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="erke-bottom">
            <el-row style="margin-bottom:10px">
                <el-col class="operation" :span="5">
                    <el-button size="small" type="primary" @click="handleImport"
                        >新增</el-button
                    >
                    <el-button size="small" plain>导出</el-button>
                </el-col>
                <el-col class="filterRadio" :span="19">
                    <el-radio-group
                        v-model="queryList.activityStatusId"
                        size="mini"
                        style="float:right"
                        @change="fuzzyQuery"
                    >
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button 
                            v-for="(item,index) in dict_sc_activity_status"
                            :key="index"
                            :label="item.dictValue"
                        >{{item.dictLabel}}</el-radio-button>
                        
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-table :data="activityData" v-loading="loading">
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
                    prop="activityReleaserId"
                    label="活动主办方"
                    min-width="160"
                ></el-table-column>

                <el-table-column
                    prop="maxAdmissionNumber"
                    label="最大报名人数"
                    min-width="110"
                ></el-table-column>

                <el-table-column
                    prop="activityStatusId"
                    label="报名人数"
                    min-width="80"
                ></el-table-column>

                <el-table-column prop="status" label="状态" min-width="110">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            round
                            :class="sureClass(scope.row.activityStatusId)"
                            >{{ computedStatus(scope.row.activityStatusId) }}
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="createTime"
                    label="发布时间"
                    min-width="120"
                ></el-table-column>

                <el-table-column
                    prop="applyRange"
                    label="活动分类"
                ></el-table-column>

                <el-table-column
                    prop="admissionWay"
                    label="录取方式"
                ></el-table-column>

                <el-table-column
                    prop="admissionWay"
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

                <el-table-column label="操作" fixed="right" min-width="350">
                    <template slot-scope="scope">
                        <el-button
                            v-for="(item, index) in operation[scope.row.activityStatusId]"
                            :key="index"
                            type="text"
                            size="mini"
                            :icon="item.icon"
                        >
                            {{ item.title }}
                        </el-button>
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
        
        <!-- this is add dialog -->
        <addDialog ref="addActivity"></addDialog>
    </div>
</template>

<script>
    import {
        activityList
    } from '@/api/application/secondClass/activity'
    import {
        schoolYearList
    } from '@/api/application/secondClass/schoolYear'
    import {
        courseClassificationList
    } from '@/api/application/secondClass/courseClassification'
    import filterCourseClassificationList from '@/utils/filterCourseClassificationList'
    import addDialog from './addDialog'
    import formatDate from '@/utils/formatDate.js'
    import { getDict } from '@/api/application/secondClass/dict/type.js'
    import horwheel from 'horwheel'

    export default {
        name: 'activity',
        components: {
            addDialog
        },
        data() {
            return {
                loading:false,
                queryList: {
                    name: '',//活动名称
                    id: '',//活动ID
                    groupName: '',//主办方名称
                    admissionWay: '',//录取方式
                    createTime: '',//发布时间
                    activityClassificationId:'',//活动分类Id
                    recommend: 1,//是否推荐
                    activityStatusId:'',
                },
                schoolYearList:{
                    value: '',
                    rows:[]
                },
                /** 积分标准 */
                datadata: [],
                status: '全部',
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageNum: 1,
                    pageSize: 10,
                },
                activityData: [],
                //活动状态
                dict_sc_activity_status: [],
                //活动录取方式
                dict_sc_activity_admission_way:[],
                //操作映射
                operation: [
                    [
                        { title: '修改', icon: 'el-icon-edit' },
                        { title: '申请发布', icon: 'el-icon-s-release' },
                        { title: '管理员发布', icon: 'el-icon-s-release' },
                        { title: '取消', icon: 'el-icon-circle-close' }
                    ],
                    [
                        { title: '审批', icon: 'el-icon-s-check' },
                        { title: '撤回', icon: 'el-icon-d-arrow-right' }
                    ],
                    [
                        { title: '启动报名', icon: 'el-icon-caret-right' },
                        { title: '撤回', icon: 'el-icon-d-arrow-right' },
                        { title: '取消', icon: 'el-icon-circle-close' }
                    ],
                    [
                        { title: '修改', icon: 'el-icon-edit' },
                        { title: '取消', icon: 'el-icon-circle-close' }
                    ],
                    [{ title: '恢复', icon: 'el-icon-refresh-right' }],
                    [
                        { title: '结束报名', icon: 'el-icon-video-pause' },
                        { title: '启动报名', icon: 'el-icon-caret-right' },
                        { title: '暂停报名', icon: 'el-icon-video-pause' },
                        { title: '撤回', icon: 'el-icon-d-arrow-right' }
                    ],
                    [
                        { title: '启动活动', icon: 'el-icon-caret-right' },
                        { title: '恢复报名', icon: 'el-icon-refresh-right' }
                    ],
                    [
                        { title: '结束活动', icon: 'el-icon-video-pause' },
                        { title: '暂停活动', icon: 'el-icon-video-pause' }
                    ],
                    [
                        { title: '取消', icon: 'el-icon-circle-close' },
                        { title: '恢复活动', icon: 'el-icon-refresh-right' }
                    ]
                ]
            }
        },
        methods: {
            radioChange(val) {
                console.log(val)
            },
            handleImport() {
                this.$refs.addActivity.showDialog()
            },
            TimeChange(val) {
                console.log(val)
            },
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
                await Promise.all([
                    getDict('sc_activity_status'),
                    getDict('sc_activity_admission_way')
                ]).then(
                    value => {
                        let tempArr = [
                            'dict_sc_activity_status',
                            'dict_sc_activity_admission_way'
                        ]
                        
                        value.forEach((item, index) => {
                            this[tempArr[index]] = item.data
                        })
                    }
                )
            },
            getClassificationList() {
                courseClassificationList().then(value => {
                    value.data = value.data.map(item => ({
                        ...item,
                        value: item.id,
                        label: item.name
                    }))
                    //挂载算法
                    this.datadata = filterCourseClassificationList(value)
                })
            },
            getSchoolYearList() {
                schoolYearList().then(value => {
                    this.schoolYearList.rows = value.rows
                })
            },
            getActivityList(option) {
                this.loading = true
                activityList(option).then(value => {
                    console.log(value)
                    this.activityData = value.rows
                    this.loading = false
                })
            },
            fuzzyQuery() {
                let option = {
                    schoolYearId: this.schoolYearList.value,
                    departmentId: '',
                    name: this.queryList.name,
                    id: this.queryList.id,
                    groupName: this.queryList.groupName,
                    admissionWay: this.queryList.admissionWay,
                    // createTime: this.queryList.createTime,
                    activityClassificationId: this.queryList.activityClassificationId,
                    recommend:this.queryList.recommend,
                    activityStatusId: this.queryList.activityStatusId,
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize,
                    beginCreateTime:'',
                    endCreateTime: '2021-07-18 16:19:30'
                }
                this.getActivityList(option)
            }
        },
        computed: {
            computedStatus() {
                return status => {
                    return this.dict_sc_activity_status[status]?.dictLabel
                }
            }
        },
        async created() {
            await this.initDict()
            this.fuzzyQuery()
            this.getSchoolYearList()
            this.getClassificationList()
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
                }
            ]
            console.log(this.dict_sc_activity_status)
           
        },
        mounted() {
            this.$nextTick(() => {
                // new XScrollbar(document.querySelector('.el-table--scrollable-x .el-table__body-wrapper'),{
                //     onlyHorizontal:true,
                //     preventDefault:false
                // })
            })
        }
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
    .activityCascader >>> .el-input__inner {
        width: 365px;
    }
</style>
