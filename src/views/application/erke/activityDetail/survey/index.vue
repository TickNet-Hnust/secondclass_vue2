<template>
    <div class="erke-buttom survey">
        <el-row>
            <el-col :span="16" class="msgLeft">
                <div class="msgDetail">
                    <el-row class="textRow">
                        <el-col :span="12" style="min-width:405px">
                            <span class="labelSpan" style="marginRight:65px">
                                主办方：
                            </span>
                            <span class="textSpan">{{
                                activityVo.groupName
                            }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="labelSpan">录取方式：</span>
                            <span class="textSpan">{{
                                computedAdmissionWay(activityVo.admissionWay)
                            }}</span>
                        </el-col>
                    </el-row>

                    <el-row class="textRow">
                        <el-col :span="12" style="min-width:50px">
                            <span class="labelSpan" style="marginRight:65px">
                                发布人：</span
                            >
                            <span class="textSpan">{{
                                activityVo.activityReleaserName
                            }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="labelSpan"> 报名范围：</span>
                            <span class="textSpan">{{
                                computedDept(activityVo.enrollRange)
                            }}</span>
                        </el-col>
                    </el-row>

                    <el-row class="textRow">
                        <el-col :span="12" style="min-width:50px">
                            <span class="labelSpan"> 指导单位：</span>
                            <span class="textSpan">{{
                                activityVo.deptName
                            }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="labelSpan"> 报名年级：</span>
                            <span class="textSpan">{{
                                activityVo.enrollGrade
                            }}</span>
                        </el-col>
                    </el-row>

                    <el-row class="textRow">
                        <el-col :span="12" style="min-width:50px">
                            <span class="labelSpan"> 指导老师：</span>
                            <span class="textSpan">{{
                                activityVo.guideTeacherName
                            }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="labelSpan" style="marginRight:22px"
                                >最大录取人数：</span
                            >
                            <span class="textSpan">{{
                                activityVo.maxAdmissionNumber
                            }}</span>
                        </el-col>
                    </el-row>

                    <el-row class="textRow">
                        <el-col :span="12" style="min-width:50px">
                            <span class="labelSpan">活动级别：</span>
                            <span class="textSpan">{{
                                computedRank(activityVo.rankId)
                            }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="labelSpan"> 允许请假：</span>
                            <span class="textSpan">{{
                                computedVacate(activityVo.vacate)
                            }}</span>
                        </el-col>
                    </el-row>

                    <el-row class="textRow">
                        <el-col :span="12" style="min-width:50px">
                            <span class="labelSpan"> 活动标签：</span>
                            <span class="textSpan">{{
                                activityVo.activityTag
                            }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="labelSpan"> 活动地点：</span>
                            <span class="textSpan">{{
                                activityVo.activityPlaceName
                            }}</span>
                        </el-col>
                    </el-row>

                    <el-row class="textRow">
                        <el-col :span="12" style="min-width:50px">
                            <span class="labelSpan"> 活动分类：</span>
                            <span class="textSpan">{{
                                activityVo.courseClassificationName
                            }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="labelSpan" style="marginRight:35px"
                                >活动负责人：</span
                            >
                            <span class="textSpan">{{
                                activityVo.activityManagerName
                            }}</span>
                        </el-col>
                    </el-row>

                    <el-row class="textRow">
                        <el-col :span="12" style="min-width:50px">
                            <span class="labelSpan"> 报名时间：</span>
                            <span class="textSpan"
                                >{{ activityVo.enrollStartTime }} ~
                                {{ activityVo.enrollEndTime }}</span
                            >
                        </el-col>
                        <el-col :span="12">
                            <span class="labelSpan" style="marginRight:35px">
                                活动组织者：</span
                            >
                            <span class="textSpan">{{
                                activityVo.activityOrganizerName
                            }}</span>
                        </el-col>
                    </el-row>

                    <el-row class="textRow">
                        <el-col :span="12" style="min-width:50px">
                            <span class="labelSpan"> 活动时间：</span>
                            <span class="textSpan"
                                >{{ activityVo.activityStartTime }} ~
                                {{ activityVo.activityEndTime }}</span
                            >
                        </el-col>
                    </el-row>
                </div>
                <div class="msgStatus">
                    <el-row>
                        <el-col :span="2" class="msgStatus-left">
                            执行状态：
                        </el-col>
                        <el-col :span="22" class="msgStatus-nums">
                            <a-steps
                                :current="statusList.length - 1"
                                size="small"
                            >
                                <template v-for="(item, index) in statusList">
                                    <a-step
                                        :key="index"
                                        :title="
                                            dict_sc_activity_status[
                                                item.progress
                                            ].dictLabel
                                        "
                                        :description="item.completeTime"
                                        v-if="index != statusList.length - 1"
                                    ></a-step>
                                    <a-step :key="index" v-else>
                                        <template slot="title">
                                            <!-- {{dict_sc_activity_status}} -->
                                            {{
                                                dict_sc_activity_status[
                                                    item.progress
                                                ].dictLabel
                                            }}
                                            <!-- dict_sc_activity_status[item.progress].dictLabel:undefined}} -->
                                        </template>

                                        <!-- <span slot="subTitle">
                                            <a-dropdown :trigger="['click']">
                                                <a
                                                    class="ant-dropdown-link"
                                                    @click="
                                                        e => e.preventDefault()
                                                    "
                                                >
                                                    <a-icon type="down" />
                                                </a>
                                                <a-menu slot="overlay">
                                                    <a-menu-item key="0">
                                                        <a href="#">结束活动</a>
                                                    </a-menu-item>
                                                    <a-menu-item key="1">
                                                        <a href="#">暂停活动</a>
                                                    </a-menu-item>
                                                </a-menu>
                                            </a-dropdown>
                                        </span> -->
                                        <span slot="description">
                                            {{ item.completeTime }}
                                        </span>
                                    </a-step>
                                </template>
                                <!-- <a-step title="结束" description="" />
                                <a-step title="报名" description="人数：30" />
                                <a-step title="报名" description="人数：30" />
                                <a-step title="报名" description="人数：30" /> -->
                            </a-steps>
                        </el-col>
                    </el-row>
                </div>
                
                <div class="msgGraph">
                    <el-row>
                        
                        <el-col :span="17">
                            <div class="graphTitle">
                                <el-radio-group
                                    size="mini"
                                    v-model="range"
                                    @change="rangeChange"
                                >
                                    <!-- <el-radio-button label="1"
                                        >全年</el-radio-button
                                    >
                                    <el-radio-button label="2"
                                        >本月</el-radio-button
                                    >
                                    <el-radio-button label="3"
                                        >本周</el-radio-button
                                    > -->
                                    <el-radio-button label="4"
                                        >今天</el-radio-button
                                    >
                                </el-radio-group>
                            </div>
                            <div class="graph" ref="graph"></div>
                        </el-col>
                        <el-col :span="7" class="rank">
                            <el-date-picker disabled style="float:right">
                            </el-date-picker>
                            <div class="Ratetitle">
                                群组报名率（ 报名人数 / 群组人数 ）
                            </div>
                            <el-row 
                                class="groupRateRow"  
                                v-for="(item,index) in getFrontFive" 
                                :key="index"
                            >
                                <el-col :span="3"
                                    ><span class="circleBlack">{{index + 1}}</span></el-col
                                >
                                <el-col :span="18">{{item.deptName}}</el-col>
                                <el-col :span="3">{{(item.enrollRate * 100).toFixed(2) + '%'}}</el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :offset="1" :span="7" class="lisRight">
                <div class="lisRight-top">
                    <div class="title">活动统计</div>
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="报名情况" name="first">
                            <div class="lisRight-buttom">
                                <el-row class="listRowTop">
                                    <el-col :span="3">序号</el-col>
                                    <el-col :span="12">指导单位</el-col>
                                    <el-col :span="5">报名人数</el-col>
                                    <el-col :span="4">报名率</el-col>
                                </el-row>
                                <el-empty v-if="!deptEnrollStatisticsVoList.length" description="暂时还没有报名情况"></el-empty>
                                <el-row
                                    v-for="(item,
                                    index) in deptEnrollStatisticsVoList"
                                    :key="index"
                                    class="listRowButtom"
                                >
                                    <el-col :span="3">{{ index + 1 }}</el-col>
                                    <el-col :span="12">{{
                                        item.deptName
                                    }}</el-col>
                                    <el-col :span="5">{{
                                        item.enrollNumber
                                    }}</el-col>
                                    <el-col :span="4">{{
                                        (item.enrollRate * 100).toFixed(2) + '%'
                                    }}</el-col>
                                </el-row>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="签到情况" name="second">
                            <div class="lisRight-buttom">
                                <el-row class="listRowTop">
                                    <el-col :span="3">序号</el-col>
                                    <el-col :span="12">指导单位</el-col>
                                    <el-col :span="5">签到人数</el-col>
                                    <el-col :span="4">签到率</el-col>
                                </el-row>
                                <el-empty v-if="!deptRegisteStatisticsVoList.length" description="暂时还没有签到情况"></el-empty>
                                <el-row
                                    v-for="(item,
                                    index) in deptRegisteStatisticsVoList"
                                    :key="index"
                                    class="listRowButtom"
                                >
                                    <el-col :span="3">{{ index + 1 }}</el-col>
                                    <el-col :span="12">{{
                                        item.deptName
                                    }}</el-col>
                                    <el-col :span="5"
                                        >{{ item.registeNumber }}
                                    </el-col>
                                    <el-col :span="4">{{
                                        item.registeRate * 100 + '%'
                                    }}</el-col>
                                </el-row>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="请假情况" name="third">
                            <div class="lisRight-buttom">
                                <el-row class="listRowTop">
                                    <el-col :span="3">序号</el-col>
                                    <el-col :span="12">指导单位</el-col>
                                    <el-col :span="5">请假人数</el-col>
                                    <el-col :span="4">请假率</el-col>
                                </el-row>
                                <el-empty v-if="!deptLeaveStatisticsVoList.length" description="暂时还没有请假情况"></el-empty>
                                <el-row
                                    v-for="(item,
                                    index) in deptLeaveStatisticsVoList"
                                    :key="index"
                                    class="listRowButtom"
                                >
                                    <el-col :span="3">{{ index + 1 }}</el-col>
                                    <el-col :span="12"
                                        >&nbsp;{{ item.deptName }}</el-col
                                    >
                                    <el-col :span="5">
                                        {{ item.leaveNumber }}</el-col
                                    >
                                    <el-col :span="4">
                                        {{ item.leaveRate * 100 + '%' }}</el-col
                                    >
                                </el-row>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { getDict } from '@/api/application/secondClass/dict/type.js'
    import {
        activityIdDetail,
        activityIdEnrollBar,
        utilListCollege
    } from '@/api/application/secondClass/index'
    import * as echarts from 'echarts'
    export default {
        data() {
            return {
                dict_sc_activity_status: [],
                dict_sc_activity_admission_way: [],
                dict_sc_train_program_rank: [],
                dict_sc_activity_vacate: [],
                deptListMap: [],
                activityVo: {
                    groupName: '', //活动主办方
                    admissionWay: '', //录取方式

                    activityReleaserName: '', //发布人
                    enrollRange: '', //报名范围

                    deptName: '', //指导单位
                    enrollGrade: '', //报名年级

                    guideTeacherName: '', //指导老师
                    maxAdmissionNumber: '', //最大录取人数

                    rankId: '', //活动级别
                    vacate: '', //允许请假

                    activityTag: '', //活动标签
                    activityPlaceName: '', //活动地点

                    courseClassificationName: '', //活动分类
                    activityManagerName: '', //活动负责人

                    enrollStartTime: '', //报名开始时间
                    enrollEndTime: '', //报名结束时间
                    activityOrganizerName: '', //活动组织者

                    activityStartTime: '', //活动开始时间
                    activityEndTime: '' //活动结束时间
                },
                statusList: [],
                //报名率
                deptEnrollStatisticsVoList: [],
                //请假率
                deptLeaveStatisticsVoList: [],
                //签到率
                deptRegisteStatisticsVoList: [],
                range: '4',
                activeName: 'first',
                //挂载目标
                myChart: {},
                //基本配置
                defalutOption: {
                    color: ['#3ba1ff'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: true
                            }
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    calculable: true,
                    legend: {
                        data: ['Growth', '报名人数'],
                        itemGap: 5
                    },
                    grid: {
                        top: '12%',
                        left: '2%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true,
                        width: 'auto'
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: '' //需要修改this.data.names
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '活动报名情况',
                            axisLabel: {
                                formatter: function(a) {
                                    a = +a
                                    return isFinite(a)
                                        ? echarts.format.addCommas(+a / 1)
                                        : ''
                                }
                            }
                        }
                    ],
                    dataZoom: [
                        // {
                        //     show: true,
                        //     type: 'slider',
                        //     start: 94,
                        //     end: 100
                        // },
                        {
                            type: 'inside',
                            start: 0,
                            end: 100
                        }
                        // {
                        //     show: true,
                        //     type: 'slider',
                        //     yAxisIndex: 0,
                        //     filterMode: 'empty',
                        //     width: 30,
                        //     height: '80%',
                        //     showDataShadow: false,
                        //     left: '93%'
                        // }
                    ],
                    series: [
                        {
                            name: '报名人数',
                            type: 'bar',
                            data: '' //需要修改this.data.nums
                        }
                    ]
                },
                //全年数据
                yearEnrollList: {},
                //今天数据
                dayEnrollList: {},
                data: {},
                today: {}
            }
        },
        computed: {
            computedRank() {
                return value => {
                    return this.dict_sc_train_program_rank[value]?.dictLabel
                }
            },
            computedAdmissionWay() {
                return value => {
                    return this.dict_sc_activity_admission_way[value]?.dictLabel
                }
            },
            computedVacate() {
                return value => {
                    return this.dict_sc_activity_vacate[value]?.dictLabel
                }
            },
            computedDept() {
                return _array => {
                    return _array
                        .split(';')
                        .map(item => {
                            return this.deptListMap[item]
                        })
                        .join('、')
                }
            },
            getFrontFive() {
                return [...this.deptEnrollStatisticsVoList].sort((a,b) => b.enrollRate - a.enrollRate).filter((_,index) => index <=4)
            },
        },
        methods: {
            rangeChange(value) {
                let start, end
                this.option = {
                    color: ['#3ba1ff'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: true
                            }
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    calculable: true,
                    legend: {
                        data: ['Growth', 'Budget 2012'],
                        itemGap: 5
                    },
                    grid: {
                        top: '12%',
                        left: '2%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true,
                        width: 'auto'
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.data.names
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '活动报名情况',
                            axisLabel: {
                                formatter: function(a) {
                                    a = +a
                                    return isFinite(a)
                                        ? echarts.format.addCommas(+a / 1)
                                        : ''
                                }
                            }
                        }
                    ],
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 94,
                            end: 100
                        }
                    ],
                    series: [
                        {
                            name: 'Budget 2011',
                            type: 'bar',
                            data: this.data.nums
                        }
                    ]
                }

                if (value == 4) {
                    start = 0
                    end = 100
                    this.defalutOption.xAxis[0].data = this.dayEnrollList.names
                    this.defalutOption.series[0].data = this.dayEnrollList.nums
                } else {
                    if (value == 1) {
                        start = 0
                        end = 100
                    } else if (value == 2) {
                        start = 60
                        end = 68
                    } else {
                        start = 55
                        end = 56.7
                    }
                    this.defalutOption.xAxis[0].data = this.yearEnrollList.names
                    this.defalutOption.series[0].data = this.yearEnrollList.nums
                }
                console.log(value, this.option)
                this.defalutOption.dataZoom[0].start = start
                this.defalutOption.dataZoom[0].end = end
                this.myChart.setOption(this.defalutOption)
            },
            async initDict() {
                await Promise.all([
                    getDict('sc_activity_status'),
                    getDict('sc_activity_admission_way'),
                    getDict('sc_train_program_rank'),
                    getDict('sc_activity_vacate')
                ]).then(value => {
                    let tempArr = [
                        'dict_sc_activity_status',
                        'dict_sc_activity_admission_way',
                        'dict_sc_train_program_rank',
                        'dict_sc_activity_vacate'
                    ]
                    tempArr.forEach((item, index) => {
                        this[item] = value[index].data
                    })
                })
            }
        },
        async created() {
            this.initDict()
            utilListCollege().then(value => {
                console.log(value, '部门')
                value.data.forEach((item, index) => {
                    this.deptListMap[item.deptId] = item.deptName
                })
            })
            activityIdDetail({
                id: this.$route.params.aid
            }).then(value => {
                console.log(value, '活动详情')
                // this.activityVo = value.data.activitVo
                Object.keys(this.activityVo).forEach(item => {
                    this.activityVo[item] = value.data.activityVo[item]
                })
                this.statusList = value.data.statusList.reverse()
                this.deptEnrollStatisticsVoList =
                    value.data.deptEnrollStatisticsVoList
                this.deptRegisteStatisticsVoList =
                    value.data.deptRegisteStatisticsVoList
                this.deptLeaveStatisticsVoList =
                    value.data.deptLeaveStatisticsVoList
                console.log(this.activityVo)
            })
        },
        mounted() {
            //全年横坐标
            this.data = {
                nums: [
                    42,
                    21,
                    33,
                    1,
                    52,
                    57,
                    47,
                    58,
                    62,
                    75,
                    23,
                    60,
                    61,
                    5,
                    28,
                    50,
                    72,
                    11,
                    53,
                    21,
                    37,
                    9,
                    21,
                    48,
                    7,
                    18,
                    46,
                    74,
                    65,
                    79,
                    3,
                    17,
                    42,
                    28,
                    18,
                    19,
                    75,
                    75,
                    10,
                    19,
                    26,
                    55,
                    70,
                    15,
                    9,
                    4,
                    18,
                    72,
                    23,
                    5,
                    62,
                    67,
                    37,
                    1,
                    31,
                    61,
                    78,
                    38,
                    73,
                    9,
                    7,
                    20,
                    30,
                    52,
                    50,
                    56,
                    56,
                    58,
                    15,
                    71,
                    6,
                    70,
                    50,
                    3,
                    59,
                    64,
                    66,
                    26,
                    58,
                    19,
                    16,
                    76,
                    50,
                    18,
                    17,
                    39,
                    41,
                    76,
                    26,
                    45,
                    9,
                    64,
                    3,
                    72,
                    78,
                    50,
                    77,
                    69,
                    73,
                    19,
                    36,
                    69,
                    13,
                    20,
                    33,
                    59,
                    61,
                    55,
                    40,
                    30,
                    60,
                    72,
                    28,
                    40,
                    25,
                    67,
                    25,
                    67,
                    42,
                    42,
                    47,
                    34,
                    61,
                    42,
                    48,
                    42,
                    50,
                    76,
                    56,
                    64,
                    15,
                    43,
                    46,
                    75,
                    23,
                    26,
                    31,
                    7,
                    14,
                    14,
                    33,
                    53,
                    48,
                    75,
                    31,
                    46,
                    21,
                    79,
                    74,
                    22,
                    41,
                    65,
                    72,
                    60,
                    55,
                    50,
                    19,
                    58,
                    45,
                    34,
                    70,
                    79,
                    80,
                    73,
                    73,
                    20,
                    29,
                    49,
                    74,
                    64,
                    16,
                    66,
                    65,
                    23,
                    78,
                    51,
                    61,
                    57,
                    78,
                    57,
                    28,
                    78,
                    27,
                    9,
                    38,
                    32,
                    75,
                    47,
                    6,
                    47,
                    45,
                    15,
                    75,
                    13,
                    40,
                    76,
                    18,
                    31,
                    4,
                    58,
                    40,
                    5,
                    57,
                    13,
                    20,
                    18,
                    41,
                    57,
                    29,
                    28,
                    58,
                    50,
                    70,
                    43,
                    51,
                    16,
                    40,
                    77,
                    79,
                    76,
                    32,
                    5,
                    46,
                    45,
                    64,
                    27,
                    9,
                    57,
                    50,
                    1,
                    75,
                    23,
                    72,
                    6,
                    7,
                    44,
                    34,
                    20,
                    15,
                    29,
                    9,
                    49,
                    79,
                    15,
                    65,
                    22,
                    50,
                    75,
                    74,
                    59,
                    44,
                    6,
                    55,
                    64,
                    36,
                    77,
                    13,
                    35,
                    19,
                    41,
                    58,
                    44,
                    0,
                    0,
                    48,
                    53,
                    75,
                    41,
                    20,
                    65,
                    71,
                    12,
                    10,
                    23,
                    64,
                    32,
                    32,
                    69,
                    59,
                    27,
                    3,
                    58,
                    79,
                    41,
                    40,
                    64,
                    60,
                    73,
                    15,
                    72,
                    44,
                    1,
                    20,
                    54,
                    46,
                    16,
                    50,
                    2,
                    5,
                    73,
                    9,
                    79,
                    32,
                    55,
                    46,
                    76,
                    25,
                    19,
                    8,
                    71,
                    19,
                    52,
                    34,
                    65,
                    8,
                    62,
                    9,
                    73,
                    53,
                    70,
                    55,
                    9,
                    66,
                    62,
                    61,
                    76,
                    23,
                    27,
                    9,
                    50,
                    31,
                    70,
                    11,
                    51,
                    53,
                    34,
                    80,
                    52,
                    61,
                    39,
                    34,
                    52,
                    12,
                    76,
                    25,
                    58,
                    60,
                    38,
                    19,
                    35,
                    60,
                    29,
                    44,
                    78,
                    38,
                    25,
                    16,
                    17,
                    16,
                    47,
                    63,
                    26,
                    54,
                    48,
                    2
                ],
                names: [
                    '08-15',
                    '08-07',
                    '05-30',
                    '12-19',
                    '11-11',
                    '03-13',
                    '11-13',
                    '01-21',
                    '08-15',
                    '07-05',
                    '04-24',
                    '08-22',
                    '12-07',
                    '04-27',
                    '04-07',
                    '01-18',
                    '03-08',
                    '10-26',
                    '06-03',
                    '04-21',
                    '08-29',
                    '11-24',
                    '02-15',
                    '07-16',
                    '05-04',
                    '10-15',
                    '05-28',
                    '07-21',
                    '10-17',
                    '05-05',
                    '03-19',
                    '12-05',
                    '12-25',
                    '05-22',
                    '12-12',
                    '09-03',
                    '02-03',
                    '09-18',
                    '06-14',
                    '12-26',
                    '12-23',
                    '12-28',
                    '04-15',
                    '03-10',
                    '10-03',
                    '12-09',
                    '01-20',
                    '11-08',
                    '10-30',
                    '09-25',
                    '08-24',
                    '07-09',
                    '02-25',
                    '03-17',
                    '08-02',
                    '04-26',
                    '05-21',
                    '11-03',
                    '05-13',
                    '05-18',
                    '10-12',
                    '07-16',
                    '02-09',
                    '02-18',
                    '10-28',
                    '07-03',
                    '05-24',
                    '10-21',
                    '11-25',
                    '11-30',
                    '03-30',
                    '09-09',
                    '02-10',
                    '11-05',
                    '06-26',
                    '05-09',
                    '08-19',
                    '01-26',
                    '04-21',
                    '10-21',
                    '07-16',
                    '07-23',
                    '11-23',
                    '09-04',
                    '09-25',
                    '09-08',
                    '09-13',
                    '08-30',
                    '08-16',
                    '02-27',
                    '05-02',
                    '08-05',
                    '08-10',
                    '03-19',
                    '10-04',
                    '03-10',
                    '12-16',
                    '05-27',
                    '01-16',
                    '07-02',
                    '04-28',
                    '08-15',
                    '02-27',
                    '01-15',
                    '08-21',
                    '09-13',
                    '02-08',
                    '12-18',
                    '11-18',
                    '10-05',
                    '12-05',
                    '04-23',
                    '09-10',
                    '10-28',
                    '06-01',
                    '10-29',
                    '04-16',
                    '11-15',
                    '09-08',
                    '01-31',
                    '08-21',
                    '04-13',
                    '08-25',
                    '04-28',
                    '02-06',
                    '10-07',
                    '08-03',
                    '12-29',
                    '06-11',
                    '10-24',
                    '10-19',
                    '10-16',
                    '06-23',
                    '08-18',
                    '09-29',
                    '08-02',
                    '09-10',
                    '10-17',
                    '07-24',
                    '07-05',
                    '09-29',
                    '10-14',
                    '07-02',
                    '05-23',
                    '01-03',
                    '12-19',
                    '02-16',
                    '06-14',
                    '05-05',
                    '09-11',
                    '03-23',
                    '02-25',
                    '07-04',
                    '04-24',
                    '09-05',
                    '08-04',
                    '11-25',
                    '09-01',
                    '05-15',
                    '12-10',
                    '01-09',
                    '02-07',
                    '06-26',
                    '09-11',
                    '08-03',
                    '08-08',
                    '05-27',
                    '02-25',
                    '06-26',
                    '11-02',
                    '02-23',
                    '05-12',
                    '10-22',
                    '08-26',
                    '02-11',
                    '10-12',
                    '04-30',
                    '05-01',
                    '09-13',
                    '10-16',
                    '12-07',
                    '05-17',
                    '03-07',
                    '03-25',
                    '02-17',
                    '10-17',
                    '10-03',
                    '01-01',
                    '03-20',
                    '09-15',
                    '03-03',
                    '07-11',
                    '03-22',
                    '01-01',
                    '02-26',
                    '10-25',
                    '10-26',
                    '02-28',
                    '11-14',
                    '10-17',
                    '07-04',
                    '09-19',
                    '08-11',
                    '07-22',
                    '04-14',
                    '03-01',
                    '12-18',
                    '02-28',
                    '06-27',
                    '11-12',
                    '01-28',
                    '09-09',
                    '04-03',
                    '04-22',
                    '06-10',
                    '06-09',
                    '07-16',
                    '05-13',
                    '04-22',
                    '06-09',
                    '08-08',
                    '04-21',
                    '12-25',
                    '08-26',
                    '03-05',
                    '01-20',
                    '11-28',
                    '04-26',
                    '06-27',
                    '05-24',
                    '11-19',
                    '05-04',
                    '11-09',
                    '09-01',
                    '10-24',
                    '04-22',
                    '01-15',
                    '10-12',
                    '05-13',
                    '07-22',
                    '03-06',
                    '09-28',
                    '04-08',
                    '12-31',
                    '01-03',
                    '11-21',
                    '03-23',
                    '06-27',
                    '03-23',
                    '06-27',
                    '04-05',
                    '11-14',
                    '02-08',
                    '07-01',
                    '03-07',
                    '02-12',
                    '06-23',
                    '08-01',
                    '03-19',
                    '11-21',
                    '05-10',
                    '12-19',
                    '10-20',
                    '12-02',
                    '02-02',
                    '04-06',
                    '11-29',
                    '11-24',
                    '10-07',
                    '06-25',
                    '10-30',
                    '08-15',
                    '05-07',
                    '10-19',
                    '07-31',
                    '08-22',
                    '12-12',
                    '01-14',
                    '01-28',
                    '02-15',
                    '01-12',
                    '01-07',
                    '03-10',
                    '01-14',
                    '01-23',
                    '03-21',
                    '11-11',
                    '04-26',
                    '09-06',
                    '06-19',
                    '04-09',
                    '03-18',
                    '05-30',
                    '11-02',
                    '05-15',
                    '01-31',
                    '03-14',
                    '05-25',
                    '06-14',
                    '04-09',
                    '07-25',
                    '09-03',
                    '06-02',
                    '10-04',
                    '02-14',
                    '01-28',
                    '06-07',
                    '02-27',
                    '10-25',
                    '10-30',
                    '08-06',
                    '02-10',
                    '08-25',
                    '12-25',
                    '08-09',
                    '12-15',
                    '11-05',
                    '05-19',
                    '03-02',
                    '10-07',
                    '08-06',
                    '04-06',
                    '01-18',
                    '02-15',
                    '02-05',
                    '08-01',
                    '05-22',
                    '05-31',
                    '10-20',
                    '09-25',
                    '10-27',
                    '11-16',
                    '12-10',
                    '01-26',
                    '09-21',
                    '12-07',
                    '07-07',
                    '08-19',
                    '02-20',
                    '03-24',
                    '12-17',
                    '12-22',
                    '10-24',
                    '06-20',
                    '11-16',
                    '10-19',
                    '07-15',
                    '07-27',
                    '03-07',
                    '03-17',
                    '07-10',
                    '02-09',
                    '11-12',
                    '02-10',
                    '01-11',
                    '04-12',
                    '10-04',
                    '10-30',
                    '06-14',
                    '02-25',
                    '07-02',
                    '05-08',
                    '05-21',
                    '02-06',
                    '02-04'
                ]
            }

            //今天恒坐标
            this.today = {
                nums: [
                    28,
                    3,
                    4,
                    20,
                    2,
                    47,
                    3,
                    36,
                    24,
                    17,
                    17,
                    46,
                    49,
                    24,
                    44,
                    36,
                    44,
                    1,
                    11,
                    4,
                    28,
                    9,
                    34,
                    40
                ],
                names: [
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                    '15',
                    '16',
                    '17',
                    '18',
                    '19',
                    '20',
                    '21',
                    '22',
                    '23'
                ]
            }
            activityIdEnrollBar({
                id: this.$route.params.aid
            }).then(value => {
                console.log(value, 12)
                // this.yearEnrollList.names = value.data.yearEnrollList.map(
                //     item => item[0]
                // )
                // this.yearEnrollList.nums = value.data.yearEnrollList.map(
                //     item => item[1]
                // )

                //Todo: 后端接口需要完善
                this.dayEnrollList.names = value.data.yearEnrollList.map(
                    item => item.name
                )
                this.dayEnrollList.nums = value.data.yearEnrollList.map(
                    item => item.number
                )

                console.log(this.dayEnrollList, this.yearEnrollList)

                //mock Data of four
                // this.yearEnrollList.names = this.data.names
                // this.yearEnrollList.nums = this.data.nums
                // this.dayEnrollList.names = this.today.names
                // this.dayEnrollList.nums = this.today.nums

                this.defalutOption.xAxis[0].data = this.dayEnrollList.names
                this.defalutOption.series[0].data = this.dayEnrollList.nums
                this.myChart = echarts.init(this.$refs.graph)
                this.myChart.setOption(this.defalutOption)
                // this.$nextTick(() => {
                //     // console.log(this.$refs.graph.children[0].children.style="")
                // })
                window.addEventListener('resize', () => {
                    this.myChart.resize()
                })
            })

            // new this.XScrollbar(document.querySelector('.survey'))
            new this.XScrollbar(document.querySelector('.msgStatus-nums'), {
                onlyHorizontal: true
            })
        }
    }
</script>

<style scoped>
    .erke-buttom {
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #ddd;
        padding: 20px;
        height: calc(100vh - 144px);
        overflow: auto;
    }
    .msgLeft {
        /* border-bottom: 1px solid #ddd; */
        /* padding-right: 10px; */
    }
    .msgDetail {
        border-bottom: 1px solid #ddd;
    }
    .msgStatus {
        height: 112px;
        border-bottom: 1px solid #ddd;
    }
    .msgStatus-left {
        padding-top: 30px;
        min-width: 70px;
        /* color: #888; */
    }
    .msgStatus-nums {
        padding-top: 25px;
        overflow: auto;
        min-width: 600px;
        padding-bottom: 20px;
    }
    .ant-steps-item {
        min-width: 120px;
    }
    .msgGraph {
        padding: 20px 5px 0 5px;
    }
    .msgGraph .graphTitle {
        margin-bottom: 10px;
        height: 100%;
    }
    .msgGraph .graph {
        /* background-color: red; */
        /* height: calc(100vh - 670px); */
        height: 250px;
    }
    .labelSpan {
        display: inline-block;
        margin-right: 50px;
        font-size: 14px;
    }
    .textSpan {
        color: #888;
        font-size: 14px;
    }
    .lisRight {
        border-radius: 20px;
        overflow: hidden;
        height: 100%;
        background-color: #f9f9fb;
    }
    .lisRight >>> .el-tabs__nav {
        float: right;
    }
    .lisRight >>> .el-tabs__item {
        padding: 5px 5px 5px 5px;
        margin-bottom: 10px;
    }
    .lisRight >>> #tab-third {
        padding-right: 15px;
    }
    .lisRight-top {
        padding-top: 10px;
        /* height: calc(100vh - 180px); */
        position: relative;
    }
    .title {
        position: absolute;
        left: 20px;
        top: 15px;
        background-color: #fff;
        padding: 8px 10px;
        font-size: 14px;
        border-radius: 10px;
    }
    .lisRight-buttom {
        padding: 10px 30px;
    }
    .listRowTop {
        font-size: 15px;
        color: #555;
        font-weight: 700;
    }
    .listRowButtom {
        margin: 9px 0;
        font-size: 14px;
        color: #888;
    }
    .Ratetitle {
        margin-top: 70px;
        color: #333;
    }
    .groupRateRow {
        margin: 15px 0;
    }
    .textRow {
        margin-bottom: 15px;
    }
    @media screen and (min-height: 950px) {
        .msgGraph .graph {
            height: calc(100vh - 680px);
        }

        .rank {
            height: calc(100vh - 800px);
        }
        .groupRateRow {
            height: 20%;
        }
        .listRowButtom {
            height: 3.3%;
        }
    }
    .circleBlack {
        display: inline-block;
        background-color: #314659;
        border-radius: 10px;
        width: 20px;
        color: #fff;
        text-align: center;
    }
    .circleWrite {
        display: inline-block;
        background-color: #f0f2f5;
        border-radius: 10px;
        width: 20px;

        text-align: center;
    }
</style>
