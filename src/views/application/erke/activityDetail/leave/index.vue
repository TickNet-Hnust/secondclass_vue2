<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                <div class="erke-bottom">
                    <div class="erke-buttom-left">
                        <ul>
                            <li>全部</li>
                            <li>资源环境与安全工程学院</li>
                            <li>土木工程学院</li>
                            <li>机械工程学院</li>
                            <li>计算机科学与工程学院</li>
                        </ul>
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
                                    <el-col :span="1" style="min-width: 90px">
                                        <el-form-item label="">
                                            <el-select
                                                value="操作"
                                                style="width:80px"
                                            >
                                                <el-option
                                                    label="操作"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="学号：">
                                            <el-input data-text></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="姓名：">
                                            <el-input data-text></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 180px">
                                        <el-form-item label="请假状态">
                                            <el-select
                                                value="全部"
                                                style="width:90px"
                                            >
                                                <el-option
                                                    value="全部"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 340px">
                                        <el-form-item label="请假时间">
                                            <el-date-picker
                                                align="right"
                                                type="datetimerange"
                                                range-separator="至"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width:150px">
                                        <el-form-item label="">
                                            <el-button
                                                type="primary"
                                                size="mini"
                                                >查询</el-button
                                            >
                                            <el-button size="mini"
                                                >重置</el-button
                                            >
                                        </el-form-item>
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
    //导入活动请假相关接口
     import {
        activityLeave,
        activityLeaveList,
        activityLeaveVerify,
    } from '@/api/application/secondClass/activity' 
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
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4
                },
                deptId:'',
                queryList:{
                    userName:'',
                    nickName:'',
                    leaveStatus:'',
                    leaveStartTime:'',
                    leaveEndTime:'',
                },
            }
        },
        methods:{
          //通过活动id获取当前活动请假信息
           getActivityLeave(option){
                activityLeave(option).then(value=>{
                   console.log(value,'请假总信息');
                });
           },
            /**获得当前情况下的请假管理列表  模糊查询 */
            fuzzyQuery() {
                let option = {
                    deptId:this.deptId,
                    userName:this.queryList.userName,
                    nickName: this.queryList.nickName,
                    leaveStatus:this.queryList.leaveStatus,
                    // params:{
                    leaveStartTime:this.queryList.leaveStartTime,
                    leaveEndTime:this.queryList.leaveEndTime,
                    // },
                    page: this.queryParams.pageCount,
                    limit: this.queryParams.pageSize,
                    activityId:this.$route.params.aid,
                    orderByColumn:'',
                    isAsc:''
                }
                console.log(option,'发送的数据')
                this.getLeaveList(option)
            },
            getLeaveList(option){
                   this.loading = true
                   activityLeaveList(option).then(value => {
                    console.log(value,'传来的数据');
                    this.loading = false
                    
                })
            }
        },
        async created() {
            //初始化字典
            // this.initDict()

            /** 通过活动id获取当前活动请假信息，aid代码活动id*/
            this.getActivityLeave({
                activityId: this.$route.params.aid
            });
            this.fuzzyQuery()
            /** 获得当前情况下的报名管理列表 */
            // this.fuzzyQuery()
            
        },
    }
</script>

<style scoped>
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
        right: 10px;
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
