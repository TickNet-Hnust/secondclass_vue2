<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-foot">
                        <el-row style="margin-bottom: 15px">
                            <el-col :span="10" style="min-width:450px">
                                <span class="labelSpan"> 活动报名时间：</span>
                                <span class="textSpan"
                                    >{{ enrollStartTime }} ~
                                    {{ enrollEndTime }}</span
                                >
                            </el-col>
                            <el-col :span="14">
                                <span class="labelSpan"> 报名范围：</span>
                                <span class="textSpan">{{
                                    enrollRange
                                }}</span>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom: 15px">
                            <el-col :span="10" style="min-width:450px">
                                <span class="labelSpan"> 录取方式：</span>
                                <span class="textSpan">{{computedAdmissionWay(admissionWay)}}</span>
                            </el-col>
                            <el-col :span="14">
                                <span class="labelSpan"> 报名年纪：</span>
                                <span class="textSpan">{{
                                    enrollGrade
                                }}</span>
                            </el-col>
                        </el-row>

                        <el-row :gutter="20">
                            <el-col :span="1" style="min-width:250px">
                                <el-input  v-model="maxAdmissionNumber">
                                    <template slot="prepend">
                                        最大录取人数：
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="min-width:180px">
                                <el-input v-model="enrollFinish">
                                    <template slot="prepend">
                                        已报名：
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="min-width:180px">
                                <el-input v-model="enrollCancel">
                                    <template slot="prepend">
                                        取消报名
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="min-width:180px">
                                <el-input v-model="admissionYes">
                                    <template slot="prepend">
                                        已录取
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="min-width:180px">
                                <el-input v-model="admissionNo">
                                    <template slot="prepend">
                                        未录取
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
                            <el-menu-item
                                index=''
                            >
                                <span slot="title">全部 <span class="numbers">{{enrollRecordsNumber}}</span></span>
                            </el-menu-item>

                            <el-menu-item
                                v-for="(item, index) in Object.entries(tabInfo)" :key="index"
                                :index="index + ''"
                                 
                            >
                            <span slot="title" >{{ deptIdMapDeptName[item[0]] }} <span class="numbers">{{item[1]}}</span> </span>
                                
                            </el-menu-item>

                        </el-menu>
                    </div>
                    <div class="erke-buttom-right">
                        <div class="operate">
                            <el-form :inline="true" class="demo-form-inline">
                                <el-row
                                    :gutter="0"
                                    type="flex"
                                    justify="space-between"
                                    style="flexWrap:wrap"
                                >
                                <el-col :span="1" style="min-width:80px;" >
                                    <el-tooltip 
                                        class="item" 
                                        effect="dark" 
                                        content="清空查询条件" 
                                        placement="right">
                                    <el-button
                                        circle
                                        icon="el-icon-refresh"
                                        @click="refresh"
                                    >
                                    </el-button>
                                    </el-tooltip>
                                </el-col> 
                                
                                    <el-col :span="1" style="min-width:150px;margin-left: -24px;" >
                                        <el-form-item label="操作:">
                                            <el-select
                                                v-model="action"
                                                style="width:80px"
                                                placeholder="操作"
                                            >
                                                <el-option value="批量修改"></el-option>
                                                <el-option value="排序"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="学号:">
                                            <el-input data-text
                                            placeholder="学号"
                                            v-model="queryList.userName"
                                            @input="fuzzyQuery"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="姓名:">
                                            <el-input data-text
                                            placeholder="姓名"
                                            v-model="queryList.nickName"
                                            @input="fuzzyQuery"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:205px">
                                        <el-form-item label="报名状态:">
                                            <el-select
                                                v-model="queryList.enrollStatus"
                                                placeholder="报名状态:不限"
                                                style="width:120px"
                                                @change="fuzzyQuery"
                                            >
                                                <el-option
                                                    value=""
                                                    label="报名状态:不限"
                                                ></el-option>
                                                <el-option
                                                    v-for="(item,
                                                    index) in dict_sc_activity_enroll_status"
                                                    :key="index"
                                                    :value="item.dictValue"
                                                    :label="item.dictLabel"
                                                ></el-option>

                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:205px">
                                        <el-form-item label="录取状态:">
                                            <el-select
                                                v-model="queryList.admissionStatus"
                                                placeholder="录取状态:不限"
                                                style="width:120px"
                                                @change="fuzzyQuery"
                                            >
                                                <el-option
                                                    value=""
                                                    label="录取状态:不限"
                                                ></el-option>
                                                <el-option
                                                    v-for="(item,
                                                    index) in dict_sc_activity_admission_status"
                                                    :key="index"
                                                    :value="item.dictValue"
                                                    :label="item.dictLabel"
                                                ></el-option>

                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:335px">
                                        <el-form-item label="报名时间:">
                                            <el-date-picker
                                                v-model="value2"
                                                type="datetimerange"
                                                :picker-options="pickerOptions"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                align="right"
                                                @change="enrollDateChange">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>

                       <el-table
                            :data="enrollList"
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
                                prop="enrollStatus"
                                label="报名状态"
                                min-width="100"
                                :formatter="formatEnrollStatus"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        round
                                        :class="sureClassEnroll(scope.row)"
                                        >{{
                                            computedEnrollStatus(scope.row.enrollStatus)
                                        }}</el-button
                                    >
                                </template>
                            </el-table-column>

                           <el-table-column
                                prop="admissionStatus"
                                label="录取状态"
                                min-width="100"
                                :formatter="formatAdmissionStatus"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        round
                                        :class="sureClassAdmission(scope.row)"
                                        >{{
                                            computedAdmissionStatus(scope.row.admissionStatus)
                                        }}</el-button
                                    >
                                </template>
                            </el-table-column>     

                            <el-table-column
                                prop="createTime"
                                label="报名时间"
                                min-width="100"
                                
                            >
                            </el-table-column>

                            <el-table-column
                                prop="cancelTime"
                                label="取消报名时间"
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
                                        v-if="scope.row.enrollStatus==1&&admissionWay==1"
                                        @click="examEnrollOpenDialog(scope.row)"
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

        <!-- 审核报名会话框 -->
        <el-dialog
            :title="examEnrollDialog.title"
            :visible.sync="examEnrollDialog.open"
            width="915px"
            append-to-body
            class="examEnrollDialog"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="10">姓名：</el-col>
                    <el-col :span="14">{{
                        examEnrollDialog.data.nickName
                    }}</el-col>
                </el-row>
                 <el-row>
                    <el-col :span="10">学号：</el-col>
                    <el-col :span="14">{{
                        examEnrollDialog.data.userName
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">所在班级：</el-col>
                    <el-col :span="14">{{
                        examEnrollDialog.data.className
                    }}</el-col>
                </el-row> 
                <el-row>
                    <el-col :span="10">群组：</el-col>
                    <el-col :span="14">{{
                        examEnrollDialog.data.groupName
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">报名时间：</el-col>
                    <el-col :span="14">{{
                        examEnrollDialog.data.createTime
                    }}</el-col>
                </el-row>        

                
            </el-form>

            <div slot="footer" class="dialog-footer">
            <el-radio-group 
                v-if="examEnrollDialog.title=='报名审核'"
                v-model="examEnrollDialog.post.status" 
                style="float:left;margin-top:15px"
            >
                <el-radio :label="1">审核通过</el-radio>
                <el-radio :label="0">审核未通过</el-radio>
            </el-radio-group>

            <el-input
                type="textarea"
                v-model="examEnrollDialog.post.content"
                placeholder="填写指导意见"
                rows=1
                class="adviceText"
            ></el-input>

                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="examEnrollSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    //导入活动报名相关接口
     import {
        activityEnroll,
        activityEnrollList,
        activityEnrollVerify,
    } from '@/api/application/secondClass/activity'

    import { 
        getDept,
        listDeptExcludeChild,
        listDept
        } from '@/api/system/dept.js'

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

    import formaterDate from '@/utils/formatDate.js'
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
                //单个审核报名会话框表单参数form
                form:{},
                //单个审核报名会话框数据
                examEnrollDialog:{
                     title:'报名审核',
                     open:false,
                     data:{
                        nickName:'',
                        userName:'',
                        className:'',
                        groupName:'',
                        createTime:'',
                     },
                     post:{
                         activityId:1,
                         content:'',
                         ids:'',
                         status:0,
                         userIds:'',
                     }
                 },
                //  批量审核 会话框数据数组
                mutiExamEnrollDialogDataList:[],
       
                //活动报名开始时间
                enrollStartTime: '暂无数据',
                //活动报名结束时间
                enrollEndTime: '暂无数据',
                //报名范围
                enrollRange: ['计算机科学与工程学院', '商学院'],
                //报名年级
                enrollGrade:[2018,2019],
                //录取方式
                admissionWay:'',
                //报名年级范围
                enrollYearRange: [2018, 2019],
                //最大录取人数:
                maxAdmissionNumber:0,
                //已报名
                enrollFinish:0,
                //取消报名
                enrollCancel:0,
                //已录取
                admissionYes:0,
                //未录取
                admissionNo:0,
                //报名表记录数(全部)
                enrollRecordsNumber:0,
                //各学院报名情况 deptId:numbers的形式
                tabInfo:[
                ],
                //部门id转部门名字
                deptIdMapDeptName:[],
                //部门id 用于模糊查询
                deptId:'',
                //分页请求参数
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4,
                    currPage: 1,
                },
                //下拉操作
                action:'',
                //模糊查询请求列表
                queryList:{
                    userName:'',
                    nickName:'',
                    enrollStatus:'',
                    admissionStatus:'',
                    //学生开始报名时间
                    beginCreateTime:'',
                    //学生取消报名时间
                    endCreateTime:'',
                },
                
                //报名列表
                enrollList:[],
                //DateTimePicker
                pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
                },
                value2: '',
                //报名状态字典数组
                dict_sc_activity_enroll_status:[],
                //录取状态字典数组
                dict_sc_activity_admission_status:[],
                //录取状态方式数组
                dict_sc_activity_admission_way:[],

            }
        },
        computed: {
           //取报名状态计算方法 
           computedEnrollStatus(){
                return value => {
                    // console.log(this.dict_sc_course_status,temp,333)
                    // console.log(value)
                    return this.dict_sc_activity_enroll_status[value]?.dictLabel;
                }
            },
            //取录取状态字典计算方法
            computedAdmissionStatus(){
                
                    return value => {
                    // console.log(this.dict_sc_course_status,temp,333)
                    // console.log(value)
                    return this.dict_sc_activity_admission_status[value]?.dictLabel;
                }
                
            },

            //取录取方式字典计算方法
            computedAdmissionWay(){

                return value => {
                    // console.log(this.dict_sc_course_status,temp,333)
                    // console.log(value)
                    return this.dict_sc_activity_admission_way[value]?.dictLabel;
                }
            },
        },
        methods:{
            //操作分页触发的事件
            getList(option){
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.fuzzyQuery()
            },
            //清空查询条件
            refresh() {
                this.action='',
                this.queryList={
                    userName:'',
                    nickName:'',
                    enrollStatus:'',
                    admissionStatus:'',
                    beginCreateTime:'',
                    endCreateTime:'',
                }
                this.value2='',
                this.fuzzyQuery()
            },
            //格式化群组 要使用群组字典
            formatGroup(row, column, cellValue) {
                // console.log(cellValue);
            },
            // 格式化报名状态 要使用报名方式字典
            formatEnrollStatus(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_activity_enroll_status[cellValue]?.dictLabel
                )
            },
            //格式化录取状态 要使用录取状态字典
            formatAdmissionStatus(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_activity_admission_status[cellValue]?.dictLabel
                )
            },
            /**
             * @description: 确定CSS类
             * @param {*} row
             */            
            sureClassEnroll(row) {
                
                   if (row.enrollStatus == 0) {
                    //ing
                    return 'textPlain'
                } else if (row.enrollStatus == 1) {
                    //yes
                    return 'textgreen'
                } else if (row.enrollStatus == 2) {
                    //no
                    return 'textyellow'
                } else {
                    //unpass
                    return 'textRed'
                } 
            },
            sureClassAdmission(row) {
                
                   if (row.admissionStatus == 0) {
                    //ing
                    return 'textPlain'
                } else if (row.admissionStatus == 1) {
                    //yes
                    return 'textgreen'
                } else if (row.admissionStatus == 2) {
                    //no
                    return 'textyellow'
                } else {
                    //unpass
                    return 'textRed'
                } 
            },
            //审核点击事件 开打会话框
            examEnrollOpenDialog(row){
                console.log('open');
                //渲染会话框数据
                this.renderState(row)
    
                this.examEnrollDialog.title='报名审核'
                // this.alertDialog.call(this,'审核',{
                //     confirm:() => {
                //         console.log(row);
                //         option = {
                //             ids:[],
                //             status:[],
                //             userIds:[],
                //             activityId:[],
                //             content:[],
                //         }
                //         // activityEnrollVerify()
                //         this.msgSuccess('审核成功')
                //     }
                // })
                // console.log(row);
            },
            //渲染会话框数据 打开会话框
            renderState(row){
                console.log(row);
                this.examEnrollDialog.data={
                  nickName:row.nickName,
                  userName:row.userName,
                  className:row.className,
                  groupName:row.groupName,
                  createTime:row.createTime,
                };

                this.examEnrollDialog.post={
                  activityId:row.activityId,
                  content:'',
                  ids:row.id,
                  status:row.admissionStatus,
                  userIds:row.userId,
  
                };
                
                console.log(this.examEnrollDialog.post);
                this.examEnrollDialog.open = true;

            },
            //会话审核确定
            examEnrollSubmit(){
                console.log(this.examEnrollDialog.post,'审核确定后发送的数据');
                activityEnrollVerify(this.examEnrollDialog.post).then(value=>{
                    console.log(value);
                    this.examEnrollDialog.open = false
                    this.fuzzyQuery()
                })
            },
            //会话框取消
            cancel() {
                this.examEnrollDialog.open = false
                this.reset()
            },
            //会话框数据重置
            reset(){
               this.examEnrollDialog.data={
                  nickName:'',
                  userName:'',
                  className:'',
                  groupName:'',
                  createTime:'',
                  admissionStatus:0,
               }
            },
            //格式化时间
            formatDate(row, column, cellValue) {
                return cellValue != null && formaterDate(cellValue)
            },
            //筛选报名时间触发的事件
            enrollDateChange(){
               //发送时间的格式还需要调整一下
               if(this.value2!=null)
               {
                    this.queryList.beginCreateTime = this.value2[0];
                    this.queryList.endCreateTime = this.value2[1];
                    this.fuzzyQuery();
               }
               
            },
            //点击左下角部门触发的事件
            handleSelect(index){
                console.log(index);
               if(index!='')
               {
                  this.deptId = Object.entries(this.tabInfo)[index][0];
               }else{
                  this.deptId=''
               }
               this.fuzzyQuery()
            },
            //通过活动id获取当前活动报名信息函数
            getActivityEnroll(option){
               activityEnroll(option).then(value => {
                console.log(value,'活动总信息');
                this.enrollStartTime = value.data.enrollStartTime;
                this.enrollEndTime = value.data.enrollEndTime;
                this.enrollRange = value.data.enrollRange;
                this.admissionWay = value.data.admissionWay;
                this.maxAdmissionNumber = value.data. maxAdmissionNumber;
                this.enrollGrade = value.data.enrollGrade;
                this.enrollFinish =value.data.enrollFinish;
                this.enrollCancel =value.data.enrollCancel;
                this.admissionYes =value.data.admissionYes;
                this.admissionNo =value.data.admissionNo;
                this.enrollRecordsNumber = value.data.enrollRecordsNumber;
                this.tabInfo = value.data.tabInfo;
            })
           },
           getDeptIdMapDeptName(){
               listDept().then(value=>{
                console.log(value,'listDept()接口传来的数据');
                value.data.forEach(item=>{
                    //deptId映射deptName字典
                    this.deptIdMapDeptName[item.deptId]=item.deptName;
                });
                console.log(this.deptIdMapDeptName,'这是deptid和deptname的map');
               }) 
                
           },
           /**获得当前情况下的报名管理列表  模糊查询 */
            fuzzyQuery() {
                let option = {
                    deptId:this.deptId,
                    userName:this.queryList.userName,
                    nickName: this.queryList.nickName,
                    enrollStatus:this.queryList.enrollStatus,
                    admissionStatus:this.queryList.admissionStatus,
                    // params:{
                    beginCreateTime:this.queryList.beginCreateTime,
                    endCreateTime:this.queryList.endCreateTime,
                    // },
                    page: this.queryParams.pageCount,
                    limit: this.queryParams.pageSize,
                    activityId:this.$route.params.aid,
                    orderByColumn:'',
                    isAsc:''
                }
                console.log(option,'发送的数据')
                this.getEnrollList(option)
            },
            
            getEnrollList(option){
                 this.loading = true
                 activityEnrollList(option).then(value => {

                    // console.log(value);
                    /** 总共多少条，总共多少页 */
                    this.queryParams.totalCount  = value.total
                    // this.queryParams.pageSize = value.data.pageSize
                    // this.queryParams.totalPage = value.data.totalPage
                    // this.queryParams.currPage = value.data.currPage
                    this.queryParams.pageCount = Math.ceil(this.queryParams.totalCount/this.queryParams.pageSize);
                    this.enrollList = value.rows;
                    console.log(this.enrollList,'传来的数据');
                    this.loading = false
                    
                })
            },
            initDict(){
              // getDict
                Promise.all([
                    getDict('sc_activity_enroll_status'),
                    getDict('sc_activity_admission_status'),
                    getDict('sc_activity_admission_way'),             
                ]).then(value => {
                    console.log(value, 'initDict')
                    let tempArr = [
                        'dict_sc_activity_enroll_status',
                        'dict_sc_activity_admission_status',
                        'dict_sc_activity_admission_way',
                    ]
                    tempArr.forEach((item, index) => {
                        this[item] = value[index].data
                        console.log(value[index].data, '这是所有字典！！！')
                    })
                })
            },

        },
         async created() {
            //初始化字典
            this.initDict()
            /** 通过活动id获取当前活动报名信息，aid代码活动id*/
            this.getActivityEnroll({
                activityId: this.$route.params.aid
            });
            /** 获得当前情况下的报名管理列表 */
            this.fuzzyQuery()

            this.getDeptIdMapDeptName()
        },
    }
</script>

<style scoped>
   .adviceText{
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
        height: calc(100vh - 315px);
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
        height: calc(100vh - 315px);
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
        width: 250px;
    }
    .el-row {
        height: initial;
    }
</style>
