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
                                <span class="textSpan">{{admissionWay}}</span>
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
                                index=""
                            >
                                <span slot="title">全部 <span class="numbers">{{enrollRecordsNumber}}</span></span>
                            </el-menu-item>

                            <el-menu-item
                                v-for="(item, index) in deptList" :key="index"
                                :index="index + ''"
                            >
                                <span slot="title">{{ item.deptName }} <span class="numbers">{{Object.values(tabInfo)[index]}}</span> </span>
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
                                    <el-col :span="1" style="min-width:80px">
                                        <el-form-item label="">
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
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="姓名:">
                                            <el-input data-text
                                            placeholder="姓名"
                                            v-model="queryList.nickName"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:205px">
                                        <el-form-item label="报名状态:">

                                            <el-select
                                                v-model="queryList.enrollStatus"
                                                placeholder="报名状态:不限"
                                                style="width:120px"
                                            >
                                                <el-option
                                                    value=""
                                                    label="报名状态:不限"
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
                                            >
                                                <el-option
                                                    value=""
                                                    label="录取状态:不限"
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
                                    <el-col :span="1" style="min-width:130px">
                                        <el-button type="primary" size="mini"
                                            >查询</el-button
                                        >
                                        <el-button size="mini">重置</el-button>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>

                       <el-table
                            :data="enrollList"
                            v-loading="loading"
                            class="detailMainTable"
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
                                label="课程名称"
                                min-width="200"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="userName"
                                label="学号"
                                min-width="150"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="deptName"
                                label="所在学院"
                                min-width="120"
                            >
                            </el-table-column>

                            <el-table-column
                                prop=""
                                label="群组"
                                min-width="150"
                                :formatter="formatClassificationId"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="joinType"
                                label="加入方式"
                                min-width="80"
                                :formatter="formatJoinType"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="necessary"
                                label="必修课"
                                min-width="80"
                                :formatter="formatNecessary"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="lowestValue"
                                label="学期积分下限要求"
                                width="140"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="status"
                                label="状态"
                                min-width="120"
                                :formatter="formatStatus"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        round
                                        :class="sureClass(scope.row)"
                                        >{{
                                            computedStatus(scope.row.status)
                                        }}</el-button
                                    >
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="updateTime"
                                label="修改时间"
                                min-width="120"
                                :formatter="formatDate"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="departmentName"
                                label="发布单位"
                                min-width="120"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="type"
                                label="性质"
                                min-width="80"
                                :formatter="formatType"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="classificationDetail"
                                label="分类明细"
                                min-width="180"
                                :formatter="formatClassificationDetail"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="createTime"
                                label="创建时间"
                                min-width="150"
                                :formatter="formatDate"
                            >
                            </el-table-column>


                            <el-table-column
                                prop="remark"
                                label="备注"
                                min-width="200"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="operate"
                                label="操作"
                                fixed="right"
                                width="200"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-s-check"
                                        @click="examCourse(scope.row)"
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
    </div>
</template>

<script>
    //导入活动相关接口
     import {
        activityEnroll,
        activityEnrollList,
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
                //活动报名开始时间
                enrollStartTime: '暂无数据',
                //活动报名结束时间
                enrollEndTime: '暂无数据',
                //报名范围
                enrollRange: ['计算机科学与工程学院', '商学院'],
                //报名年级
                enrollGrade:[2018,2019],
                //录取方式
                admissionWay:'评审',
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
                //部门报名列表
                deptList:[

                ],
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
                },
                //学生报名开始时间
                beginCreateTime:'',
                //学生报名结束时间
                endCreateTime:'',
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

            }
        },
        methods:{
            //筛选报名事件触发的事件
            enrollDateChange(){
               console.log(this.value2[0]);
               console.log(this.value2[1]);
               this.beginCreateTime = this.value2[0];
               this.endCreateTime = this.value2[1];
            },
            //点击左小角部门触发的事件
            handleSelect(index){
               if(this.deptList[index])
               {
                  this.deptId = this.deptList[index].deptId
               }else{
                  this.deptId=''
               }
               console.log(this.deptId)
               this.fuzzyQuery()
            },
            //通过活动id获取当前活动报名信息函数
            getActivityEnroll(option){
               activityEnroll(option).then(async value => {

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
                let {data} = await listDept() 
                this.deptList = data;
             
            })
           },
           /**获得当前情况下的报名管理列表  模糊查询 */
            fuzzyQuery() {
                let option = {
                    depId:this.deptId,
                    userName:this.queryList.userName,
                    nickName: this.queryList.nickName,
                    enrollStatus:this.queryList.enrollStatus,
                    admissionStatus:this.queryList.admissionStatus,
                    // params:{
                    beginCreateTime:this.beginCreateTime,
                    endCreateTime:this.endCreateTime,
                    // },
                    page: this.queryParams.pageCount,
                    limit: this.queryParams.pageSize,
                    activityId:this.$route.params.aid,
                    orderByColumn:'',
                    isAsc:''
                }
                console.log(option)
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
                    console.log(this.enrollList);
                    this.loading = false
                    
                })
            },

        },
         async created() {

            /** 通过活动id获取当前活动报名信息，aid代码活动id*/
            this.getActivityEnroll({
                activityId: this.$route.params.aid
            });
            /** 获得当前情况下的报名管理列表 */
            this.fuzzyQuery()
            
        },
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
