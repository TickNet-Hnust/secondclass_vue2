<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
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
                                        recordsNumber
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

                                    <el-col :span="1" style="min-width: 90px">
                                        <el-form-item label="">

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
                                                    <!-- <a-menu-item>
                                                        <a
                                                            href="javascript:;"
                                                           @click="mutiExamLeave"
                                                            >批量审核</a
                                                        >
                                                    </a-menu-item> -->
                                                    <a-menu-item>
                                                        <a href="javascript:;"
                                                        @click="leaveRegister"
                                                            >请假登记</a
                                                        >
                                                    </a-menu-item>
                                                    <a-menu-item>
                                                        <a href="javascript:;"
                                                            >导出</a
                                                        >
                                                    </a-menu-item>
                                                </a-menu>
                                            </a-dropdown>

                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="学号：">
                                            <el-input
                                                data-text
                                                placeholder="学号"
                                                v-model="queryList.userName"
                                                style="width:100px"
                                                @input="debounceFuzzyQuery(fuzzyQuery,300)"
                                            >
                                            </el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="姓名：">
                                            <el-input
                                                data-text
                                                placeholder="姓名"
                                                v-model="queryList.nickName"
                                                style="width:100px"
                                                @input="debounceFuzzyQuery(fuzzyQuery,300)"
                                            >
                                            </el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width: 230px">
                                        <el-form-item label="请假状态：">
                                            <el-select
                                                v-model="queryList.status"
                                                placeholder="请假状态:不限"
                                                style="width:120px"
                                                @change="fuzzyQuery"
                                            >
                                                <el-option
                                                    value=""
                                                    label="请假状态:不限"
                                                >
                                                </el-option>
                                                <el-option
                                                    v-for="(item,
                                                    index) in dict_sc_activity_leave_status"
                                                    :key="index"
                                                    :value="item.dictValue"
                                                    :label="item.dictLabel"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 340px">
                                        <el-form-item label="请假时间">
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
                            class="enrollMainTable"
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
                                prop="reason"
                                label="请假理由"
                                min-width="120"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="createTime"
                                label="请假时间"
                                min-width="120"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="status"
                                label="请假状态"
                                min-width="100"
                                :formatter="formatLeaveStatus"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        round
                                        :class="sureClassLeave(scope.row)"
                                        >{{
                                            computedLeaveStatus(
                                                scope.row.status
                                            )
                                        }}</el-button
                                    >
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="approveNickName"
                                label="批假人"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="operate"
                                label="操作"
                                fixed="right"
                                width="50"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-s-check"
                                        @click="examLeaveOpenDialog(scope.row)"
                                        >审核</el-button
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
        <!-- 审核请假会话框 -->
        <el-dialog
            :title="examLeaveDialog.title"
            :visible.sync="examLeaveDialog.open"
            width="915px"
            append-to-body
            class="examLeaveDialog"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="10">姓名：</el-col>
                    <el-col :span="14">{{
                        examLeaveDialog.data.nickName
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">学号：</el-col>
                    <el-col :span="14">{{
                        examLeaveDialog.data.userName
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">所在班级：</el-col>
                    <el-col :span="14">{{
                        examLeaveDialog.data.className
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">群组：</el-col>
                    <el-col :span="14">{{
                        examLeaveDialog.data.groupName
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">请假时间：</el-col>
                    <el-col :span="14">{{
                        examLeaveDialog.data.createTime
                    }}</el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">请假理由：</el-col>
                    <el-col :span="14">{{
                        examLeaveDialog.data.reason
                    }}</el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-radio-group
                    v-if="examLeaveDialog.title == '请假审核'"
                    v-model="examLeaveDialog.post.status"
                    style="float:left;margin-top:15px"
                >
                    <el-radio :label="1">审核通过</el-radio>
                    <el-radio :label="2">审核未通过</el-radio>
                </el-radio-group>

                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="examLeaveSubmit"
                    >确 定</el-button
                >
            </div>
        </el-dialog>

          <!-- 请假登记会话框 -->
         <el-dialog
            :title="leaveRegisterDialog.title"
            :visible.sync="leaveRegisterDialog.open"
            width="915px"
            append-to-body
        >
        
        <el-form ref="form1" :model="form1" label-width="300px">
                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                        请假人：
                    </el-col>
                    <el-col :span="18">
                        <!-- 感觉这里还是要防抖 到时候再说 -->
                        <el-autocomplete
                            value-key="label"
                            v-model="postFakeData.userId"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请手动输入完整姓名"
                            style="width: 200px;"
                            @select="handUserId"
                        ></el-autocomplete>
                    </el-col>
                </el-row>

                
                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                        请假理由：
                    </el-col>
                    <el-col :span="18">

                        <el-input
                            type="textarea"
                            v-model="leaveRegisterDialog.data.reason"
                            rows="2"
                            style="width: 300px;"
                        ></el-input>
                    </el-col>
                </el-row>

                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                        批假人：
                    </el-col>
                    <el-col :span="18">
                        <el-autocomplete
                            value-key="label"
                            v-model="postFakeData.approveUserId"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请手动输入完整姓名"
                            style="width: 200px;"
                            @select="handApproveUserId"
                        ></el-autocomplete>
                    </el-col>
                </el-row>


                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                        批假时间：
                    </el-col>
                    <el-col :span="18">
                       <el-date-picker
                            v-model="value1"
                            @change="prizeLeaveDateChange"
                            type="datetime"
                            placeholder="选择日期时间"
                        >
                        </el-date-picker>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="registerCancel">关闭</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>

        </el-dialog>

    </div>
</template>

<script>
    //导入活动请假相关接口
    import {
        activityLeave,
        activityLeaveList,
        //请假批量审核
        activityLeaveVerify,
        //请假登记
        activityLeavePost,
        utilListByName,
    } from '@/api/application/secondClass/index'
    import {
        transformDate,
        transformDateSingle,
    } from '@/utils/gather'
    //导入获取dept信息函数
    import {
        getDept,
        listDeptExcludeChild,
        listDept
    } from '@/api/system/dept.js'

    import { getDict } from '@/api/application/secondClass/dict/type.js'
    export default {
        name: 'Leave',
        data() {
            return {
                timer:0,
                count:0,
                //单个审核请假会话框表单参数form
                form: {},
                form1:{},
                postFakeData:{
                    userId:'',
                    approveUserId:'',
                },
                //单个审核请假会话框数据
                examLeaveDialog: {
                    title: '请假审核',
                    open: false,
                    data: {
                        nickName: '',
                        userName: '',
                        className: '',
                        groupName: '',
                        createTime: '',
                        reason: ''
                    },
                    post: {
                        ids: '',
                        status: 0
                    }
                },
                queryParams: {
                    totalCount: 0,
                    totalPage: 0,
                    pageNum: 1,
                    pageSize: 10,
                },
                deptId: '',
                queryList: {
                    userName: '',
                    nickName: '',
                    status: '',
                    leaveStartTime: '',
                    leaveEndTime: ''
                },
                //请假列表
                leaveList: [],
                //各学院请假情况 deptId:numbers的形式
                tabInfo: [],
                //请假记录全部人数
                recordsNumber: '',
                //请假状态字典数组
                dict_sc_activity_leave_status: [],
                //搜索框 操作
                action: '',
                //部门id转部门名字
                deptIdMapDeptName: [],
                //部门id 用于模糊查询
                deptId: '',
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
                //绑定请假时间
                value2: '',
                value1:'',
                leaveRegisterDialog:{
                    title:'请假登记',
                    open:false,
                    data:{
                        activityId:this.$route.params.aid,
                        userId:'',
                        approveUserId:'',
                        reason:'',
                        createTime:'',
                        status:1,
                    }
                }
            }
        },
        computed: {
            computedLeaveStatus() {
                return value => {
                    // console.log(this.dict_sc_course_status,temp,333)
                    // console.log(value)
                    return this.dict_sc_activity_leave_status[value]?.dictLabel
                }
            }
        },
        methods: {
            registerCancel(){
                 this.leaveRegisterDialog.data={
                        activityId:this.$route.params.aid,
                        userId:'',
                        approveUserId:'',
                        reason:'',
                        createTime:'',
                        status:1,
                    }
                this.leaveRegisterDialog.open=false;
            },
            handUserId(item){
               this.leaveRegisterDialog.data.userId = item.value
            },
            handApproveUserId(item){
               this.leaveRegisterDialog.data.approveUserId = item.value
            },
           //点击请假登记触发的事件
            leaveRegister(){
                this.leaveRegisterDialog.open = true
            },
            prizeLeaveDateChange(){
                if(this.value1!=null)
               {
                   this.leaveRegisterDialog.data.createTime =transformDateSingle(this.value1);
               } 
            },
            save(){
               console.log(this.leaveRegisterDialog.data,'点击保存要发送的数据');
               activityLeavePost(this.leaveRegisterDialog.data).then(value=>{
                   console.log(value,'请假登记接口返回的数据');
                   this.fuzzyQuery();
               })
            },
            querySearchAsync(queryString,cb) {
                if(queryString) {
                    utilListByName({name:queryString}).then(value => {
                        console.log(value)
                        cb(value.data.map(item =>({
                            label: `${item.userName}-${item.nickName}`,
                            value: item.userId
                        })))
                        // cb(value.data)
                    })
                } 
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
            //操作分页触发的事件
            getList(option) {
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.fuzzyQuery()
            },
            //清空查询条件
            refresh() {
                ;(this.action = ''),
                    (this.queryList = {
                        userName: '',
                        nickName: '',
                        status: '',
                        leaveStartTime: '',
                        leaveEndTime: ''
                    })
                ;(this.value2 = ''), this.fuzzyQuery()
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
            //格式化请假状态
            formatLeaveStatus(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_activity_leave_status[cellValue]?.dictLabel
                )
            },
            //审核点击事件 开打会话框
            examLeaveOpenDialog(row) {
                //渲染会话框数据
                this.renderState(row)
                this.examLeaveDialog.title = '请假审核'
            },
            //渲染会话框数据 打开会话框
            renderState(row) {
                console.log(row)
                this.examLeaveDialog.data = {
                    nickName: row.nickName,
                    userName: row.userName,
                    className: row.className,
                    groupName: row.groupName,
                    createTime: row.createTime,
                    reason: row.reason
                }

                this.examLeaveDialog.post = {
                    ids: row.id,
                    status: row.status
                }
                this.examLeaveDialog.open = true
                console.log(this.examLeaveDialog.post, '确认前发送的数据')
            },
            //会话审核确定
            examLeaveSubmit() {
                console.log(this.examLeaveDialog.post, '审核确定后发送的数据')
                activityLeaveVerify(this.examLeaveDialog.post).then(value => {
                    console.log(value)
                    this.examLeaveDialog.open = false
                    this.fuzzyQuery()
                })
            },
            //会话框取消
            cancel() {
                this.examLeaveDialog.open = false
                this.reset()
            },
            //会话框数据重置
            reset() {
                this.examLeaveDialog.data = {
                    nickName: '',
                    userName: '',
                    className: '',
                    groupName: '',
                    createTime: '',
                    admissionStatus: 0
                }
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
            //请假审核点击 打开会话框
            //通过活动id获取当前活动请假信息
            getActivityLeave(option) {
                activityLeave(option).then(async value => {
                    console.log(value, '请假总信息')
                    this.recordsNumber = value.data.recordsNumber
                    this.tabInfo = value.data.tab
                })
            },
           
            /**获得当前情况下的请假管理列表  模糊查询 */
            fuzzyQuery() {
                let option = {
                    deptId: this.deptId,
                    userName: this.queryList.userName,
                    nickName: this.queryList.nickName,
                    status: this.queryList.status,
                    params:{
                    // leaveStartTime: this.queryList.leaveStartTime,
                    // leaveEndTime: this.queryList.leaveEndTime,
                    },
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize,
                    activityId: this.$route.params.aid,
                    orderByColumn: '',
                    isAsc: ''
                }
                if (this.value2) {
                    option.params.leaveStartTime =  transformDate(this.value2)[0]
                    option.params.leaveEndTime =  transformDate(this.value2 )[1]
                }
                console.log(option, '发送的数据')
                this.getLeaveList(option)
            },
            getLeaveList(option) {
                this.loading = true
                activityLeaveList(option).then(value => {
                    this.queryParams.totalCount = value.total
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
                Promise.all([getDict('sc_activity_leave_status')]).then(
                    value => {
                        let tempArr = ['dict_sc_activity_leave_status']
                        tempArr.forEach((item, index) => {
                            this[item] = value[index].data
                            console.log(value[index].data, '这是所有字典！！！')
                        })
                    }
                )
            }
        },
        async created() {
            //初始化字典
            this.initDict()
            
            /** 通过活动id获取当前活动请假信息，aid代码活动id*/
            this.getActivityLeave({
                activityId: this.$route.params.aid
            })
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
    /* 状态样式 */
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
        color: rgba(195, 0, 255, 0.329);
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
    .erke-buttom-left {
        width: 300px;
        float: left;
        padding: 16px;
        height: calc(100vh - 140px);
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
        height: 40px;
        padding: 0 20px;
        color: #979797;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
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
