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
                                    <el-col :span="1" style="min-width:80px;">
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

                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="学号：">
                                            <el-input data-text
                                            placeholder="学号"
                                            v-model="queryList.userName"
                                            @input="debounceFuzzyQuery(fuzzyQuery,500)()"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="姓名：">
                                            <el-input data-text
                                            placeholder="姓名"
                                            v-model="queryList.nickName"
                                            @input="debounceFuzzyQuery(fuzzyQuery,500)()"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 280px">
                                        <el-form-item label="评论发布审核：">
                                            <el-select
                                                v-model="queryList.status"
                                                placeholder="评论状态:不限"
                                                style="width:150px"
                                                @change="fuzzyQuery"
                                            >
                                                <el-option
                                                    value=""
                                                    label="评论状态:不限"
                                                ></el-option>
                                                <el-option
                                                    v-for="(item,
                                                    index) in dict_sc_activity_evaluation_status"
                                                    :key="index"
                                                    :value="item.dictValue"
                                                    :label="item.dictLabel"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 400px">
                                        <el-form-item label="评价时间">
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
                            :data="evaluationList"
                            v-loading="loading"
                            class="evaluationMainTable"
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
                                prop="createTime"
                                label="评价时间"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="score"
                                label="评价"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="status"
                                label="评论发布审核"
                                min-width="100"
                                :formatter="formatEvaluationStatus"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        v-if="scope.row.status<4"
                                        size="mini"
                                        round
                                        :class="sureClassEvaluation(scope.row)"
                                        >{{
                                            computedEvaluationStatus(
                                                scope.row.status
                                            )
                                        }}</el-button
                                    >
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="content"
                                label="评论"
                                min-width="200"
                            >
                            </el-table-column>

                            <el-table-column
                                label="操作"
                                fixed="right"
                                width="50"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-s-check"
                                        @click="
                                            examEvaluationOpenDialog(scope.row)
                                        "
                                        >审核</el-button
                                    >
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
            </el-col>
        </el-row>

        <!-- 审核评价会话框 -->
        <el-dialog
            :title="examEvaluationDialog.title"
            :visible.sync="examEvaluationDialog.open"
            width="915px"
            append-to-body
            class="examEvaluationDialog"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="10">姓名：</el-col>
                    <el-col :span="14">{{
                        examEvaluationDialog.data.nickName
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">学号：</el-col>
                    <el-col :span="14">{{
                        examEvaluationDialog.data.userName
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">所在班级：</el-col>
                    <el-col :span="14">{{
                        examEvaluationDialog.data.className
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">群组：</el-col>
                    <el-col :span="14">{{
                        examEvaluationDialog.data.groupName
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">报名时间：</el-col>
                    <el-col :span="14">{{
                        examEvaluationDialog.data.createTime
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">评论内容时间：</el-col>
                    <el-col :span="14">{{
                        examEvaluationDialog.data.content
                    }}</el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-radio-group
                    v-if="examEvaluationDialog.title == '评价审核'"
                    v-model="examEvaluationDialog.post.status"
                    style="float:left;margin-top:15px"
                >
                    <el-radio :label="1">审核通过</el-radio>
                    <el-radio :label="2">审核未通过</el-radio>
                </el-radio-group>

                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="examEvaluationSubmit"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
    //导入活动评价相关接口
    import {
        activityEvaluationList,
        activityEvaluationVerify
    } from '@/api/application/secondClass/index'
    import {
        transformDate
    } from '@/utils/gather'
    import {
        trainingProgramDetail,
        trainingProgramList,
        trainingProgramId
    } from '@/api/application/secondClass/trainingProgram'
    import {
        schoolYearList,
        schoolYearMulti
    } from '@/api/application/secondClass/schoolYear'
    import {
        courseId,
        coursePost,
        courstPut,
        courseDelete
    } from '@/api/application/secondClass/course'
    import { getDict } from '@/api/application/secondClass/dict/type.js'

    import horwheel from 'horwheel'

    import {
        listUser,
        getUser,
        delUser,
        addUser,
        updateUser,
        exportUser,
        resetUserPwd,
        changeUserStatus,
        importTemplate
    } from '@/api/system/user'
    import { getToken } from '@/utils/auth'
    import { treeselect } from '@/api/system/dept'
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        name: 'User',
        components: { Treeselect },
        data() {
            return {
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4
                },
                queryList: {
                    userName: '',
                    nickName: '',
                    status: '',
                    createStartTime: '',
                    createEndTime: ''
                },
                evaluationList: [],
                dict_sc_activity_evaluation_status: [],
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
                value2: '',
                examEvaluationDialog: {
                    title: '评价审核',
                    open: false,
                    data: {
                        nickName: '',
                        userName: '',
                        className: '',
                        groupName: '',
                        createTime: '',
                        content: ''
                    },
                    post: {
                        ids: '',
                        status: 0
                    }
                },
                form: {}
            }
        },
        computed: {
            //取报名状态计算方法
            computedEvaluationStatus() {
                return value => {
                    // console.log(this.dict_sc_course_status,temp,333)
                    // console.log(value)
                    return this.dict_sc_activity_evaluation_status[value]
                        ?.dictLabel
                }
            }
        },
        methods:{
            //模糊查询防抖
            debounceFuzzyQuery(func,delayTime){
                return function(){
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
                }.bind(this)
            },
            //会话框取消
            cancel() {
                this.examEvaluationDialog.open = false
                this.reset()
            },
            //会话框数据重置
            reset() {
                this.examEvaluationDialog.data = {
                    nickName: '',
                    userName: '',
                    className: '',
                    groupName: '',
                    createTime: '',
                    content: ''
                }
                this.examEvaluationDialog.post = {
                    ids: '',
                    status: ''
                }
            },
            //审核点击事件 开打会话框
            examEvaluationOpenDialog(row) {
                //渲染会话框数据
                this.renderState(row)

                this.examEvaluationDialog.title = '评价审核'
            },
            //渲染会话框数据 打开会话框
            renderState(row) {
                console.log(row, '要渲染的数据')

                this.examEvaluationDialog.data = {
                    nickName: row.nickName,
                    userName: row.userName,
                    className: row.className,
                    groupName: row.groupName,
                    createTime: row.createTime,
                    content: row.content
                }

                this.examEvaluationDialog.post = {
                    ids: row.id,
                    status: row.status
                }
                this.examEvaluationDialog.open = true
            },
            //会话审核确定
            examEvaluationSubmit() {
                console.log(
                    this.examEvaluationDialog.post,
                    '审核确定后发送的数据'
                )
                activityEvaluationVerify(this.examEvaluationDialog.post).then(
                    value => {
                        console.log(value, '审核确定后传来的数据')
                        this.examEvaluationDialog.open = false
                        this.fuzzyQuery()
                    }
                )
            },
            //操作分页触发的事件
            getList(option) {
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.fuzzyQuery()
            },
            //清空查询条件
            refresh() {
                this.queryList = {
                    userName: '',
                    nickName: '',
                    status: '',
                    createStartTime: '',
                    createEndTime: ''
                }
                ;(this.value2 = ''), this.fuzzyQuery()
            },
            
            /**
             * @description: 确定CSS类
             * @param {*} row
             */

            sureClassEvaluation(row) {
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
            formatEvaluationStatus(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_activity_evaluation_status[cellValue]
                        ?.dictLabel
                )
            },
            fuzzyQuery() {
                let option = {
                    activityId: this.$route.params.aid,
                    userName: this.queryList.userName,
                    nickName: this.queryList.nickName,
                    status:this.queryList.status,
                    params:{
                    // beginCreateTime:this.queryList.createStartTime,
                    // endCreateTime:this.queryList.createEndTime,
                    },
                    page: this.queryParams.pageCount,
                    limit: this.queryParams.pageSize
                    // orderByColumn:'',
                    // isAsc:''
                }
                if (this.value2) {
                    option.params.beginCreateTime =  transformDate(this.value2)[0]
                    option.params.endCreateTime =  transformDate(this.value2 )[1]
                }
                console.log(option,'fuzzyQuery发送的数据')
                this.getEvaluationList(option)
            },
            getEvaluationList(option) {
                this.loading = true
                activityEvaluationList(option).then(value => {
                    // console.log(value,'传来的数据');
                    /** 总共多少条，总共多少页 */
                    this.queryParams.totalCount = value.total
                    // this.queryParams.pageSize = value.data.pageSize
                    // this.queryParams.totalPage = value.data.totalPage
                    // this.queryParams.currPage = value.data.currPage
                    this.queryParams.pageCount = Math.ceil(
                        this.queryParams.totalCount / this.queryParams.pageSize
                    )
                    this.evaluationList = value.rows
                    console.log(this.evaluationList, '传来的数据')
                    this.loading = false
                })
            },
            initDict() {
                Promise.all([getDict('sc_activity_evaluation_status')]).then(
                    value => {
                        let tempArr = ['dict_sc_activity_evaluation_status']
                        tempArr.forEach((item, index) => {
                            this[item] = value[index].data
                        })
                    }
                )
            }
        },
        async created() {
            //初始化字典
            this.initDict()
            /** 获得当前情况下的报名管理列表 */
            this.fuzzyQuery()
        }
    }
</script>

<style scoped>
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
        color: rgba(4, 0, 255, 0.959);
    }
    .textPlain {
        color: #8b8b8b;
    }
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
