<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-foot">
                        <el-row style="margin-bottom: 15px">
                            <el-col :span="10" style="min-width:410px">
                                <span class="labelSpan"> 签到时间：</span>
                                <span class="textSpan"
                                    >{{ registeStartTime }} ~
                                    {{ registeEndTime }}</span
                                >
                            </el-col>
                            <el-col :span="14">
                                <span class="labelSpan"> 活动负责人：</span>
                                <span class="textSpan">{{
                                    activityManager
                                }}</span>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom: 15px">
                            <el-col :span="10" style="min-width:410px">
                                <span class="labelSpan"> 活动地点：</span>
                                <span class="textSpan">{{
                                    activityPlaceName
                                }}</span>
                            </el-col>
                            <el-col :span="14">
                                <span class="labelSpan"> 活动组织者：</span>
                                <span class="textSpan">{{
                                    activityOrganizer
                                }}</span>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom: 15px">
                            <el-col :span="10" style="min-width:410px">
                                <span class="labelSpan"> 签到距离：</span>
                                <span class="textSpan"
                                    >{{ registeDistance }}米</span
                                >
                            </el-col>
                        </el-row>

                        <el-row :gutter="20">
                            <el-col :span="1" style="min-width:190px">
                                <el-input v-model="admissionNumber">
                                    <template slot="prepend">
                                        录取人数：
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="min-width:180px">
                                <el-input v-model="registeYes">
                                    <template slot="prepend">
                                        已签到
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="min-width:180px">
                                <el-input v-model="registeNo">
                                    <template slot="prepend">
                                        未签到
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="min-width:170px">
                                <el-input v-model="registeLate">
                                    <template slot="prepend">
                                        补签
                                    </template>
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div class="erke-bottom">
                    <div class="erke-buttom-left">
                        <el-menu
                            default-active=""
                            class="el-menu-vertical-demo"
                            @select="handleSelect"
                        >
                            <el-menu-item index="">
                                <span slot="title"
                                    >全部
                                    <span class="numbers">{{
                                        admissionNumber
                                    }}</span></span
                                >
                            </el-menu-item>

                            <el-menu-item
                                v-for="(item, index) in tabInfo"
                                :key="index"
                                :index="index + ''"
                            >
                                <span slot="title"
                                    >{{item.deptName}}
                                    <span class="numbers">{{ item.number }}</span>
                                </span>
                            </el-menu-item>
                        </el-menu>
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
                                    <el-col :span="1" style="min-width:60px;">
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            content="清空查询条件"
                                            placement="right"
                                        >
                                            <el-button
                                                circle
                                                icon="el-icon-refresh"
                                                @click="refresh"
                                            >
                                            </el-button>
                                        </el-tooltip>
                                    </el-col>

                                      <el-col
                                        :span="1"
                                        style="min-width:80px;"
                                    >
                                        <el-form-item >
                                             <a-dropdown>
                                                <a
                                                    class="ant-dropdown-link"
                                                    @click="
                                                        e => e.preventDefault()
                                                    "
                                                >
                                                    操作 <a-icon type="down" />
                                                </a>
                                                <a-menu slot="overlay">                                            
                                                    <a-menu-item>
                                                        <a href="javascript:;"
                                                        @click="handleExport"
                                                            >导出</a
                                                        >
                                                    </a-menu-item>
                                                </a-menu>
                                            </a-dropdown>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="学号:">
                                            <el-input
                                                data-text
                                                placeholder="学号"
                                                v-model="queryList.userName"
                                                @input="debounceFuzzyQuery(fuzzyQuery,300)"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="姓名:">
                                            <el-input
                                                data-text
                                                placeholder="姓名"
                                                v-model="queryList.nickName"
                                                @input="debounceFuzzyQuery(fuzzyQuery,300)"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:205px">
                                        <el-form-item label="签到状态:">
                                            <el-select
                                                v-model="queryList.status"
                                                placeholder="签到状态:不限"
                                                style="width:120px"
                                                @change="fuzzyQuery"
                                            >
                                                <el-option
                                                    value=""
                                                    label="签到状态:不限"
                                                ></el-option>
                                                <el-option
                                                    v-for="(item,
                                                    index) in dict_sc_activity_registe_status"
                                                    :key="index"
                                                    :value="item.dictValue"
                                                    :label="item.dictLabel"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:205px">
                                        <el-form-item label="签到情况:">
                                            <el-select
                                                v-model="queryList.situation"
                                                placeholder="签到情况:不限"
                                                style="width:120px"
                                                @change="fuzzyQuery"
                                            >
                                                <el-option
                                                    value=""
                                                    label="签到情况:不限"
                                                ></el-option>
                                                <el-option
                                                    v-for="(item,
                                                    index) in dict_sc_activity_registe_situation"
                                                    :key="index"
                                                    :value="item.dictValue"
                                                    :label="item.dictLabel"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:335px">
                                        <el-form-item label="签到时间:">
                                            <el-date-picker
                                                v-model="value2"
                                                type="datetimerange"
                                                :picker-options="pickerOptions"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                align="right"
                                                @change="fuzzyQuery"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>

                        <el-table
                            :data="leaveList"
                            v-loading="loading"
                            class="leaveMainTable"
                        >
                            <el-table-column type="selection" min-width="55">
                            </el-table-column>

                            <el-table-column
                                prop="id"
                                label="ID"
                                min-width="50"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="nickName"
                                label="姓名"
                                min-width="80"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="userName"
                                label="学号"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="className"
                                label="所在班级"
                                min-width="120"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="groupName"
                                label="群组"
                                min-width="120"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="status"
                                label="签到状态"
                                min-width="100"
                                :formatter="formatStatus"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        round
                                        :class="sureClassLeave(scope.row)"
                                        >{{
                                            computedStatus(scope.row.status)
                                        }}</el-button
                                    >
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="situation"
                                label="签到情况"
                                min-width="100"
                                :formatter="formatSituation"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        v-if="scope.row.situation != null"
                                        size="mini"
                                        round
                                        :class="sureClassSituation(scope.row)"
                                        >{{
                                            computedSituation(
                                                scope.row.situation
                                            )
                                        }}</el-button
                                    >
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="checkNickName"
                                label="签到人"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="createTime"
                                label="签到时间"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="operate"
                                label="操作"
                                fixed="right"
                                width="80"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-s-check"
                                        v-if="scope.row.status == 0"
                                        @click="lateLeave(scope.row)"
                                        >补签</el-button
                                    >
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-s-check"
                                        v-if="scope.row.status == 1"
                                        @click="cancelLeave(scope.row)"
                                        >取消签到</el-button
                                    >
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
    //导入活动签到相关接口
    import {
        activityRegiste,
        activityRegisteList,
        activityRegisteVerify,
        activityRegisteExport
    } from '@/api/application/secondClass/index'
    import {
        getDept,
        listDeptExcludeChild,
        listDept
    } from '@/api/system/dept.js'
    
    import {
        transformDate
    } from '@/utils/gather'

    import { getDict } from '@/api/application/secondClass/dict/type.js'

    export default {
        name: 'regiter',
        data() {
            return {
                timer:0,
                count:0,
                loading: false,
                action: '',
                //部门id 用于模糊查询
                deptId: '',
                activityManager: '',
                activityOrganizer: '',
                activityPlaceName: '',
                admissionNumber: '',
                registeDistance: '',
                registeStartTime: '',
                registeEndTime: '',
                registeLate: '',
                registeYes: '',
                registeNo: '',
                tabInfo: '',
                //部门id转部门名字
                deptIdMapDeptName: [],
                queryParams: {
                    totalCount: 0,
                    totalPage: 0,
                    pageNum: 1,
                    pageSize: 10,
                },
                queryList: {
                    userName: '',
                    nickName: '',
                    status: '',
                    situation: '',
                    registeStartTime: '',
                    registeEndTime: ''
                },
                leaveList: [],
                dict_sc_activity_registe_status: [],
                dict_sc_activity_registe_situation: [],
                //DateTimePicker
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 7
                                )
                                picker.$emit('pick', [start, end])
                            }
                        },
                        {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 30
                                )
                                picker.$emit('pick', [start, end])
                            }
                        },
                        {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 90
                                )
                                picker.$emit('pick', [start, end])
                            }
                        }
                    ]
                },
                value2: ''
            }
        },
        computed: {
            computedStatus() {
                return value => {
                    // console.log(this.dict_sc_course_status,temp,333)
                    // console.log(value)
                    return this.dict_sc_activity_registe_status[value]
                        ?.dictLabel
                }
            },
            computedSituation() {
                return value => {
                    // console.log(this.dict_sc_course_status,temp,333)
                    // console.log(value)
                    return this.dict_sc_activity_registe_situation[value]
                        ?.dictLabel
                }
            }
        },
        methods: {
            handleExport() {
            const queryParams = this.queryParams;
            this.$confirm('是否确认导出所有签到列表?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
                }).then(() => {
                this.exportLoading = true;
                return activityRegisteExport();
                }).then(response => {
                this.download(response.msg);
                this.exportLoading = false;
                }).catch(() => {});
            },
            //模糊查询防抖
            debounceFuzzyQuery(func,delayTime){
                    clearTimeout(this.timer);
                    console.log(this.count,'搜索次数');
                    if(this.count==0)
                    {
                        func();
                        this.count++;
                    }else{
                        this.timer = setTimeout( ()=>{
                        func();
                        this.count++;
                        },delayTime )
                    }
            },
            refresh() {
                ;(this.action = ''),
                    (this.queryList = {
                        userName: '',
                        nickName: '',
                        status: '',
                        situation: '',
                        registeStartTime: '',
                        registeEndTime: ''
                    })
                ;(this.value2 = ''), this.fuzzyQuery()
            },
            cancelLeave(row) {
                console.log(row)
                this.alertDialog.call(this, '取消签到', {
                    confirm: () => {
                        let option = {
                            ids: row.id,
                            status: 0
                        }
                        console.log(option, '取消签到传去的数据')
                        activityRegisteVerify(option).then(value => {
                            console.log(value, '取消签到后端传来的数据')
                            this.msgSuccess(value.msg)
                            this.fuzzyQuery()
                        })
                    }
                })
            },
            lateLeave(row) {
                this.alertDialog.call(this, '补签', {
                    confirm: () => {
                        let option = {
                            ids: row.id,
                            status: 1
                        }
                        console.log(option, '补签传去的数据')
                        activityRegisteVerify(option).then(value => {
                            console.log(value, '补签后端传来的数据')
                            this.msgSuccess(value.msg)
                            this.fuzzyQuery()
                        })
                    }
                })
            },
            //点击左下角部门触发的事件
            handleSelect(index) {
                console.log(index)
                if (index != '') {
                    this.deptId = this.tabInfo[index].deptId
                } else {
                    this.deptId = ''
                }
                this.fuzzyQuery()
            },
            //操作分页触发的事件
            getList(option) {
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.fuzzyQuery()
            },
            formatStatus(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_activity_registe_status[cellValue]?.dictLabel
                )
            },
            formatSituation(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_activity_registe_situation[cellValue]
                        ?.dictLabel
                )
            },
            /**
             * @description: 确定CSS类
             * @param {*} row
             */

            sureClassLeave(row) {
                if (row.status == 0) {
                    //ing
                    return 'textPlain'
                } else if (row.status == 1) {
                    //yes
                    return 'textgreen'
                } else if (row.status == 2) {
                    //no
                    return 'textyellow'
                } else {
                    //unpass
                    return 'textRed'
                }
            },
            sureClassSituation(row) {
                if (row.situation == 0) {
                    //ing
                    return 'textPlain'
                } else if (row.situation == 1) {
                    //yes
                    return 'textgreen'
                } else if (row.situation == 2) {
                    //no
                    return 'textyellow'
                } else {
                    //unpass
                    return 'textRed'
                }
            },
            getActivityRegiste(option) {
                activityRegiste(option).then(value => {
                    this.activityManager = value.data.activityManager
                    this.activityOrganizer = value.data.activityOrganizer
                    this.activityPlaceName = value.data.activityPlaceName
                    this.admissionNumber = value.data.admissionNumber
                    this.registeDistance = value.data.registeDistance
                    this.registeStartTime = value.data.registeStartTime
                    this.registeEndTime = value.data.registeEndTime
                    this.registeLate = value.data.registeLate
                    this.registeYes = value.data.registeYes
                    this.registeNo = value.data.registeNo
                    this.tabInfo = value.data.tab
                    console.log(value, '活动签到总信息')
                })
            },
            
            fuzzyQuery() {
                let option = {
                    deptId: this.deptId,
                    userName: this.queryList.userName,
                    nickName: this.queryList.nickName,
                    status: this.queryList.status,
                    situation: this.queryList.situation,
                    params:{
                    // registeStartTime: this.queryList.registeStartTime,
                    // registeEndTime: this.queryList.registeEndTime,
                    },
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize,
                    activityId: this.$route.params.aid
                    // orderByColumn:'',
                    // isAsc:''
                }
                if (this.value2) {
                    option.params.registeStartTime =  transformDate(this.value2)[0]
                    option.params.registeEndTime =  transformDate(this.value2 )[1]
                }
                console.log(option, '发送的数据')
                this.getRegisteList(option)
            },
            getRegisteList(option) {
                this.loading = true
                activityRegisteList(option).then(value => {
                    this.loading = true
                    /** 总共多少条，总共多少页 */
                    this.queryParams.totalCount = value.total
                    // this.queryParams.pageSize = value.data.pageSize
                    // this.queryParams.totalPage = value.data.totalPage
                    // this.queryParams.currPage = value.data.currPage
                   this.queryParams.totalPage = Math.ceil(
                        this.queryParams.totalCount / this.queryParams.pageSize
                    )
                    this.leaveList = value.rows
                    console.log(this.leaveList, '传来的数据')
                    this.loading = false
                })
            },
            initDict() {
                // getDict
                Promise.all([
                    getDict('sc_activity_registe_status'),
                    getDict('sc_activity_registe_situation')
                ]).then(value => {
                    console.log(value, 'initDict')
                    let tempArr = [
                        'dict_sc_activity_registe_status',
                        'dict_sc_activity_registe_situation'
                    ]
                    tempArr.forEach((item, index) => {
                        this[item] = value[index].data
                        console.log(value[index].data, '这是所有字典！！！')
                    })
                })
            }
        },
        async created() {
            // 初始化字典
            this.initDict()
            /** 通过活动id获取当前活动签到信息，aid代码活动id*/
            this.getActivityRegiste({
                activityId: this.$route.params.aid
            })
            /** 获得当前情况下的报名管理列表 */
            this.fuzzyQuery()

        }
    }
</script>

<style scoped>
    .ant-dropdown-link {
        border-radius: 4px;
        color: white;
        background-color: #1890ff;
        width: 80px;
        height: 32px;
        display: block;
        text-align: center;
        line-height: 32px;
        margin-top: 1px;
    }
    .adviceText {
        margin: 10px 0px;
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
        height: calc(100vh - 350px);
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

        width: 20px;
        text-align: center;
        top: 0;
    }
    .erke-buttom-left .numbers {
        position: absolute;
        right: -220px;
        width: 20px;
        text-align: center;
        top: 0;
    }
    .erke-buttom-right {
        background-color: #fff;
        margin-left: 305px;
        height: calc(100vh - 350px);
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: auto;
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
        width: 250px;
    }
    .el-row {
        height: initial;
    }
</style>
