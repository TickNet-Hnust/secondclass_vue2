<template>
    <div class="app-container credit">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-foot">
                        <el-row style="margin-bottom: 15px">
                            <el-col :span="10" style="min-width:450px">
                                <span class="labelSpan"> 活动级别：</span>
                                <span class="textSpan">{{
                                    computedRank(activityRank)
                                }}</span>
                            </el-col>

                            <el-col :span="14">
                                <span class="labelSpan"> 积分方案：</span>
                                <span class="textSpan">{{
                                    computedScheme(integralScheme)
                                }}</span>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom: 15px">
                            <el-col :span="10" style="min-width:900px">
                                <span class="labelSpan"> 活动分类：</span>
                                <span class="textSpan">{{
                                    courseClassificationName
                                }}</span>
                            </el-col>
                        </el-row>

                        <el-row :gutter="20">
                            <el-col :span="1" style="min-width:90px">
                                <span> 积分规则：</span>
                            </el-col>

                            <el-col
                                :span="1"
                                style="min-width:280px"
                                v-for="(item, index) in integrationRule"
                                :key="index"
                            >
                                <el-input
                                    :value="
                                        computedRule(
                                            item.integralType,
                                            item.integrationRange
                                        )
                                    "
                                >
                                    <template slot="prepend">
                                        {{ item.name }}
                                    </template>
                                </el-input>
                            </el-col>
                        </el-row>

                        <el-row style="margin-top: 15px">
                            <el-col
                                :span="10"
                                style="min-width:1300px"
                                class="explain"
                            >
                                <span style="margin-left:10px">
                                    说明 ：个人积分 = 积分项 + 加分项</span
                                >
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div class="erke-bottom">
                    <div class="erke-buttom-right">
                        <div class="operate">
                            <el-form :inline="true" class="demo-form-inline">
                                <el-row
                                    :gutter="0"
                                    type="flex"
                                    justify="space-between"
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

                                    <el-col
                                        :span="1"
                                        style="min-width:150px;margin-left: -24px;"
                                    >
                                        <el-form-item label="操作:">
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
                                                        <a
                                                            href="javascript:;"
                                                            @click="mutiCredit"
                                                            >批量认定</a
                                                        >
                                                    </a-menu-item>

                                                    <a-menu-item>
                                                        <a href="javascript:;"
                                                        @click="sortCredit"
                                                            >排序</a
                                                        >
                                                    </a-menu-item>


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
                                        <el-form-item label="姓名:">
                                            <el-input data-text
                                            placeholder="姓名"
                                            v-model="queryList.nickName"
                                            @input="debounceFuzzyQuery(fuzzyQuery,300)"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="学号:">
                                            <el-input data-text
                                            placeholder="学号"
                                            v-model="queryList.userName"
                                            @input="debounceFuzzyQuery(fuzzyQuery,300)"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:205px">
                                        <el-form-item label="申报理由:">
                                            <el-select
                                                v-model="queryList.reason"
                                                placeholder="申报理由:不限"
                                                style="width:120px"
                                                @change="fuzzyQuery"
                                            >
                                                <el-option
                                                    value=""
                                                    label="申报理由:不限"
                                                ></el-option>
                                                <el-option
                                                    v-for="(item,
                                                    index) in reasonList"
                                                    :key="index"
                                                    :value="item"
                                                    :label="item"
                                                ></el-option>
                                            </el-select>

                                           
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:205px">
                                        <el-form-item label="认定状态:">
                                            <el-select
                                                v-model="queryList.status"
                                                placeholder="认定状态:不限"
                                                style="width:120px"
                                                @change="fuzzyQuery"
                                            >
                                                <el-option
                                                    value=""
                                                    label="认定状态:不限"
                                                ></el-option>
                                                <el-option
                                                    v-for="(item,
                                                    index) in dict_sc_activity_integral"
                                                    :key="index"
                                                    :value="item.dictValue"
                                                    :label="item.dictLabel"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:205px">
                                        <el-form-item label="申请方式:">
                                            <el-select
                                                v-model="queryList.applyWay"
                                                placeholder="申请方式:不限"
                                                style="width:120px"
                                                @change="fuzzyQuery"
                                            >
                                                <el-option
                                                    value=""
                                                    label="申请方式:不限"
                                                ></el-option>
                                                <el-option
                                                    v-for="(item,
                                                    index) in dict_sc_activity_integral_apply_way"
                                                    :key="index"
                                                    :value="item.dictValue"
                                                    :label="item.dictLabel"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:335px">
                                        <el-form-item label="申请时间:">
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
                            :data="integralList"
                            v-loading="loading"
                            class="integralMainTable"
                        >

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
                                prop="reason"
                                label="申报理由"
                                min-width="120"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="status"
                                label="认定状态"
                                min-width="100"
                                :formatter="formatStatus"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        round
                                        :class="sureClassStatus(scope.row)"
                                        >{{
                                            computedStatus(scope.row.status)
                                        }}</el-button
                                    >
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="applyIntegral"
                                label="申请积分"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                label="申报材料"
                                :min-width="150"
                            >   
                                <template slot-scope="{ row }">
                                    <div
                                    v-if="row.material==null"
                                   >
                                       无材料
                                   </div>

                                    <img
                                        v-else
                                        :src="row.material"
                                        class="imgs"  
                                        alt="图片失效"
                                        @click="show(row.material)"
                                    />
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="confirmIntegral"
                                label="认定积分"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="applyWay"
                                label="申请方式"
                                min-width="100"
                                :formatter="formatApplyWay"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        round
                                        :class="sureClassApplyWay(scope.row)"
                                        >{{
                                            computedApplyWay(scope.row.applyWay)
                                        }}</el-button
                                    >
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="confirmUserNickName"
                                label="认定人"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="createTime"
                                label="申请时间"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="confirmTime"
                                label="认定时间"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="operate"
                                label="操作"
                                fixed="right"
                                width="100"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-s-check"
                                        @click="
                                            examIntegralOpenDialog(scope.row)
                                        "
                                        >积分认定</el-button
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

        <!-- 认定报名会话框 -->
        <el-dialog
            :title="examIntegralDialog.title"
            :visible.sync="examIntegralDialog.open"
            width="915px"
            append-to-body
            class="examIntegralDialog"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="10">姓名：</el-col>
                    <el-col :span="14">{{
                        examIntegralDialog.data.nickName
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">学号：</el-col>
                    <el-col :span="14">{{
                        examIntegralDialog.data.userName
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">申报理由：</el-col>
                    <el-col :span="14">{{
                        examIntegralDialog.data.reason
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">认定状态：</el-col>
                    <el-col :span="14">{{
                        computedStatus(examIntegralDialog.data.status)
                    }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">申请方式：</el-col>
                    <el-col :span="14">{{
                        computedApplyWay(examIntegralDialog.data.applyWay)
                    }}</el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">申请积分：</el-col>
                    <el-col :span="14">{{
                        examIntegralDialog.data.applyIntegral
                    }}</el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">认定积分：</el-col>
                    <el-col :span="3">
                        <el-input
                            data-text
                            placeholder="认定积分"
                            size="mini"
                            v-model="examIntegralDialog.data.confirmIntegral"
                        ></el-input>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-radio-group
                    v-if="examIntegralDialog.title == '积分认定'"
                    v-model="examIntegralDialog.post.status"
                    style="float:left;margin-top:15px"
                >
                    <el-radio :label="1">认定通过</el-radio>
                    <el-radio :label="0">认定未通过</el-radio>
                </el-radio-group>

                <el-input
                    type="textarea"
                    v-model="examIntegralDialog.post.content"
                    placeholder="填写认定意见"
                    rows="1"
                    class="adviceText"
                ></el-input>

                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="examIntegralSubmit"
                    >确 定</el-button
                >
            </div>
        </el-dialog>

        <!-- 批量积分认定会话框 -->
         <el-dialog
            :title="mutiExamCreditDialog.title"
            :visible.sync="mutiExamCreditDialog.open"
            width="1200px"
            append-to-body
        >
            <el-table
            ref="multipleTable" 
            :data="mutiCreditDialogList" 
            @selection-change="handleSelectionChange"
            >
                <template v-slot:empty>
                    暂无可审核数据
                </template>
               
                <el-table-column
                    type="selection"
                    width="55"
                    >
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
                    prop="reason"
                    label="申报理由"
                    min-width="100"
                >
                </el-table-column>

                <el-table-column
                    prop="status"
                    label="认定状态"
                    min-width="80"
                    :formatter="formatStatus"
                >
                </el-table-column>

                <el-table-column
                    prop="applyWay"
                    label="申请方式"
                    :formatter="formatApplyWay"
                    min-width="80"
                >
                </el-table-column>

                <el-table-column
                    prop="applyIntegral"
                    label="申请积分"
                    min-width="50"
                >
                </el-table-column>

                <el-table-column
                    label="申报材料"
                    :min-width="100"
                >   
                    <template slot-scope="scope">
                        <div
                        v-if="scope.row.material==null"
                        >
                            无材料
                        </div>

                        <img
                            v-else
                            :src="scope.row.material"
                            class="imgs"  
                            alt="图片失效"
                            @click="show(scope.row.material)"
                        />
                    </template>
                </el-table-column>

                <el-table-column prop="confirmIntegral" label="认定积分" min-width="50">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.confirmIntegral" class="nameOfPlan">
                        </el-input>
                    </template>
                </el-table-column>

            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-radio-group
                    style="float:left;margin-top:15px"
                    v-model="mutiExamCreditDialog.post.status"
                >
                    <el-radio :label="1">审核通过</el-radio>
                    <el-radio :label="0">审核未通过</el-radio>
                </el-radio-group>

                <el-input
                    type="textarea"
                    placeholder="填写指导意见"
                    rows="1"
                    v-model="mutiExamCreditDialog.post.content"
                    class="adviceText"
                ></el-input>

                <el-button @click="clearSelection">取消选择</el-button>
                <el-button @click="mutiCancel">关闭</el-button>
                <el-button type="primary" 
                 @click="mutiExamCreditSubmit"
                    >确 定</el-button
                >
            </div>
        </el-dialog>

        
        <!-- 排序会话框 -->
         <el-dialog
            :title="sortCreditDialog.title"
            :visible.sync="sortCreditDialog.open"
            width="400px"
            append-to-body
        >
         <el-form :inline="true" >  

           <el-row
           :gutter="0"
            type="flex"
            justify="space-around"
            style="flexWrap:wrap"
           >

           <el-col :span="8">
              <el-select
                v-model="
                    sortCreditDialog.data.orderByColumn
                "
                placeholder="排序字段"
                style="width:120px"
             >
               <el-option
                    value="id"
                    label="ID"
                ></el-option>
                <el-option
                    value="userName"
                    label="学号"
                ></el-option>
                <el-option
                    value="applyIntegral"
                    label="申请积分"
                ></el-option>
                <el-option
                    value="confirmIntegral"
                    label="认定积分"
                ></el-option>
             </el-select>
           </el-col>

           <el-col :span="8">
              <el-select
                v-model="
                    sortCreditDialog.data.isAsc
                "
                placeholder="降序升序"
                style="width:120px"
             >
                <el-option
                    value="desc"
                    label="降序"
                ></el-option>
                <el-option
                    value="asc"
                    label="升序"
                ></el-option>
             </el-select>
           </el-col>

           </el-row>

         </el-form>

         <div slot="footer" class="dialog-footer">
                <el-button @click="sortCancel">关闭</el-button>
                <el-button type="primary" @click="sortSubmit"
                    >确 定</el-button
                >
        </div>
        </el-dialog>

    </div>
</template>

<script>
    //导入活动报名相关接口
    import {
        activityIntegral,
        activityIntegralList,
        activityIntegralVerify,
        activityIntegralExport,
    } from '@/api/application/secondClass/index'

    import {
        courseClassificationList,
        courseClassificationUpdateTime,
    } from '@/api/application/secondClass/courseClassification.js'
    import {
        transformDate,
        filterCourseClassificationList2
    } from '@/utils/gather'
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
                count:0,
                timer:0,
                //积分规则数组:
                integrationRule: [],
                //单个认定报名会话框表单参数form
                form: {},
                //单个认定报名会话框数据
                examIntegralDialog: {
                    title: '积分认定',
                    open: false,
                    data: {
                        nickName: '',
                        userName: '',
                        reason: '',
                        status: '',
                        applyWay: '',
                        applyIntegral: '',
                        confirmIntegral: ''
                    },
                    post: {
                        activityId: '',
                        content: '',
                        ids: '',
                        status: '',
                        userIds: ''
                    }
                },
                //  批量认定 会话框数据数组
                mutiExamIntegralDialogDataList: [],
                //成功参与
                successfulParticipation: '积分项(定值)：1分',
                quarterFinalist: '积分项(定值)：1.5分',
                final: '积分项(定值)：2分',
                champion: '加分项(定值)：3分',
                activityRank: 0,
                courseClassificationId: 0,
                courseClassificationName: '',
                integralScheme: 0,
                //分页请求参数
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4,
                    currPage: 1
                },
                //下拉操作
                action: '',
                //模糊查询请求列表
                queryList: {
                    userName: '',
                    nickName: '',
                    reason: '',
                    applyWay: '',
                    status: '',
                    // params:{
                    beginCreateTime: '',
                    endCreateTime: ''
                },

                //报名列表
                integralList: [],
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
                //活动级别
                dict_sc_train_program_rank: [],
                //积分方案字典
                dict_sc_activity_integral_scheme: [],
                //积分类别字典 用于积分规则中显示是 定制还是范围用的
                dict_sc_integral_type: [],
                //积分申请方式字典
                dict_sc_activity_integral_apply_way: [],
                //活动认定状态
                dict_sc_activity_integral: [],
                currentCourseClassification:[],
                filterCourseClassificationList:[],
                maxLayer:null,
                //批量积分认定会话框
                mutiExamCreditDialog:{
                    title:'批量积分认定',
                    open:false,
                    post:{
                      activityId:this.$route.params.aid,
                      content:'',
                      status:'',
                      idIntegral:{

                      },
                      userIds:[],
                    },
                },
                mutiCreditList:[],
                mutiCreditDialogList:[],
                handSelectList:[],
                sortCreditDialog:{
                    title:'排序',
                    open:false,
                    data:{
                        orderByColumn:'',
                        isAsc:'',
                    }
                },
                reasonList:[]
            }
        },
        computed: {
            computedStatus() {
                return value => {
                    return this.dict_sc_activity_integral[value]?.dictLabel
                }
            },

            computedApplyWay() {
                return value => {
                    return this.dict_sc_activity_integral_apply_way[value]
                        ?.dictLabel
                }
            },

            computedRule() {
                return (integralType, integrationRange) => {
                    if (integralType == null || integrationRange == null) {
                        return '积分类型或范围为空'
                    } else {
                        return (
                            '积分项(' +
                            this.dict_sc_integral_type[integralType] +
                            '):' +
                            integrationRange
                        )
                    }
                }
            },
            //取活动级别字典计算方法
            computedRank() {
                return value => {
                    // console.log(this.dict_sc_course_status,temp,333)
                    // console.log(value)
                    return this.dict_sc_train_program_rank[value]?.dictLabel
                }
            },
            //取级别方案字典计算方法
            computedScheme() {
                return value => {
                    // console.log(this.dict_sc_course_status,temp,333)
                    // console.log(value)
                    return this.dict_sc_activity_integral_scheme[value]
                        ?.dictLabel
                }
            }
        },

        methods:{
            handleExport() {
            const queryParams = this.queryParams;
            this.$confirm('是否确认导出所有积分列表?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
                }).then(() => {
                this.exportLoading = true;
                return activityIntegralExport();
                }).then(response => {
                this.download(response.msg);
                this.exportLoading = false;
                }).catch(() => {});
            },
            show(material) {
                this.$viewerApi({
                images:[material],
                })
            },
            //排序对话框点击取消事件
            sortCancel(){
                this.sortCreditDialog.data.orderByColumn = ''
                this.sortCreditDialog.data.isAsc = ''
                this.sortCreditDialog.open = false;
            },
            //排序对话框点击确定事件
            sortSubmit(){
               console.log(this.sortCreditDialog.data,'排序点击确认要发送的数据');
               if(this.sortCreditDialog.data.isAsc==''||this.sortCreditDialog.data.orderByColumn=='')
               {
                   this.msgInfo('请填写完整信息')
               }else{
                   this.sortCreditDialog.open = false;
                    this.fuzzyQuery();
               }
            },
            //点击操作中的排序事件
            sortCredit(){
                this.sortCreditDialog.open = true
            },
            //多选取消按钮
            mutiCancel(){
               this.mutiExamCreditDialog.open=false;
            },
            //多选时触发的事件
            handleSelectionChange(val){
              console.log(val,'多选传来的数据');
              this.handSelectList = val;
            },
            mutiExamCreditSubmit(){
                this.mutiExamCreditDialog.post.idIntegral = {};
                this.mutiExamCreditDialog.post.userIds = [];
                this.handSelectList.forEach((item)=>{
                  this.mutiExamCreditDialog.post.idIntegral[item.id]=item.confirmIntegral
                  
                  this.mutiExamCreditDialog.post.userIds.push(item.userId);
              })
                console.log(this.mutiExamCreditDialog.post,'点击确认发送的数据');
                if(this.mutiExamCreditDialog.post.userIds.length==0)
                {
                    this.msgInfo('请选择要申报的人！')
                }
                else if(this.mutiExamCreditDialog.post.status==''){
                     this.msgInfo('请选择认定状态！')
                }
                else{
                   activityIntegralVerify(this.mutiExamCreditDialog.post).then(
                    value => {
                        console.log(value, '积分认定操作成功的返回！')
                        this.mutiExamCreditDialog.open = false
                        this.fuzzyQuery()
                    }
                ) 
                }
                
            },
            clearSelection(){
                this.$refs.multipleTable.clearSelection();
            },
            mutiCredit(){
                this.mutiExamCreditDialog.open = true;
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
            formatStatus(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_activity_integral[cellValue]?.dictLabel
                )
            },
            formatApplyWay(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_activity_integral_apply_way[cellValue]
                        ?.dictLabel
                )
            },
            /**
             * @description: 确定CSS类
             * @param {*} row
             */

            sureClassStatus(row) {
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
            sureClassApplyWay(row) {
                if (row.applyWay == 0) {
                    //ing
                    return 'textPlain'
                } else if (row.applyWay == 1) {
                    //yes
                    return 'textgreen'
                } else if (row.applyWay == 2) {
                    //no
                    return 'textyellow'
                } else {
                    //unpass
                    return 'textRed'
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
                        reason: '',
                        applyWay: '',
                        status: '',
                        // params:{
                        beginCreateTime: '',
                        endCreateTime: ''
                    })
                ;(this.value2 = ''), this.fuzzyQuery()
            },

            /**
             * @description: 确定CSS类
             * @param {*} row
             */

            sureClassIntegral(row) {
                if (row.integralStatus == 0) {
                    //ing
                    return 'textPlain'
                } else if (row.integralStatus == 1) {
                    //yes
                    return 'textgreen'
                } else if (row.integralStatus == 2) {
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
            //认定点击事件 开打会话框
            examIntegralOpenDialog(row) {
                //渲染会话框数据
                this.renderState(row)
                this.examIntegralDialog.title = '积分认定'
            },
            //渲染会话框数据 打开会话框
            renderState(row) {
                console.log(row)
                this.examIntegralDialog.data = {
                    nickName: row.nickName,
                    userName: row.userName,
                    reason: row.reason,
                    status: row.status,
                    applyWay: row.applyWay,
                    applyIntegral: row.applyIntegral,
                    confirmIntegral: row.confirmIntegral,
                    id: row.id
                }

                this.examIntegralDialog.post = {
                    activityId: row.activityId,
                    content: '',
                    idIntegral: {
                        [row.id]: row.confirmIntegral
                    },
                    //   idIntegral[row.id]=row.confirmIntegral,
                    userIds: [row.userId],
                    status: row.status
                }
                this.examIntegralDialog.open = true
            },
            //会话积分认定确定
            examIntegralSubmit() {
                //在点击确定之后 给idIntegral对象重新赋新修改的值
                this.examIntegralDialog.post.idIntegral[
                    this.examIntegralDialog.data.id
                ] = this.examIntegralDialog.data.confirmIntegral
                console.log(
                    this.examIntegralDialog.post,
                    '积分认定确定后发送的数据'
                )
                
                activityIntegralVerify(this.examIntegralDialog.post).then(
                    value => {
                        console.log(value, '积分认定操作成功的返回！')
                        this.examIntegralDialog.open = false
                        this.fuzzyQuery()
                    }
                )
                // console.log(this.examIntegralDialog.post,'积分认定确定后发送的数据');
                // console.log(JSON.stringify(this.examIntegralDialog.post),'积分认定确定后发送的数据');
            },
            //会话框取消
            cancel() {
                this.examIntegralDialog.open = false
                this.reset()
            },
            //会话框数据重置
            reset() {
                this.examIntegralDialog.data = {
                    nickName: '',
                    userName: '',
                    reason: '',
                    status: '',
                    applyWay: '',
                    applyIntegral: ''
                }
            },
            //点击左下角部门触发的事件
            handleSelect(index) {
                console.log(index)
                if (index != '') {
                    this.deptId = Object.entries(this.tabInfo)[index][0]
                } else {
                    this.deptId = ''
                }
                this.fuzzyQuery()
            },
            //通过活动id获取当前活动报名信息函数
            getActivityIntegral(option) {
                activityIntegral(option).then(async value => {
                    console.log(value, '活动积分管理总信息')
                    this.activityRank = value.data.activityRank
                    this.courseClassificationId =
                        value.data.courseClassificationId
                    this.courseClassificationName =
                        value.data.courseClassificationName
                    this.integralScheme = value.data.integralScheme
                    await this.getCourseClassificationList()
                })
            },

            /**获得当前情况下的报名管理列表  模糊查询 */
            fuzzyQuery() {
                let option = {
                    activityId: this.$route.params.aid,
                    userName: this.queryList.userName,
                    nickName: this.queryList.nickName,
                    reason: this.queryList.reason,
                    applyWay: this.queryList.applyWay,
                    status: this.queryList.status,
                    params: {
                        // beginCreateTime:this.queryList.beginCreateTime,
                        // endCreateTime:this.queryList.endCreateTime,
                    },
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize,
                    orderByColumn: this.sortCreditDialog.data.orderByColumn,
                    isAsc: this.sortCreditDialog.data.isAsc
                    // orderByColumn:'',
                    // isAsc:''
                }
                if (this.value2) {
                    option.params.beginCreateTime = transformDate(
                        this.value2
                    )[0]
                    option.params.endCreateTime = transformDate(this.value2)[1]
                }
                console.log(option, '发送的数据')
                this.getIntegralList(option)
            },

            getIntegralList(option) {
                this.loading = true
                activityIntegralList(option).then(value => {
                    /** 总共多少条，总共多少页 */
                    this.queryParams.totalCount = value.total
                    // this.queryParams.pageSize = value.data.pageSize
                    // this.queryParams.totalPage = value.data.totalPage
                    // this.queryParams.currPage = value.data.currPage
                    this.queryParams.pageCount = Math.ceil(
                        this.queryParams.totalCount / this.queryParams.pageSize
                    )
                    this.integralList = value.rows
                    console.log(this.integralList, '传来的数据')
                    this.loading = false
                })
            },
            initDict() {
                // getDict
                Promise.all([
                    getDict('sc_train_program_rank'),
                    getDict('sc_activity_integral_scheme'),
                    getDict('sc_integral_type'),
                    getDict('sc_activity_integral_apply_way'),
                    getDict('sc_activity_integral')
                ]).then(value => {
                    console.log(value, 'initDict')
                    let tempArr = [
                        'dict_sc_train_program_rank',
                        'dict_sc_activity_integral_scheme',
                        'dict_sc_integral_type',
                        'dict_sc_activity_integral_apply_way',
                        'dict_sc_activity_integral'
                    ]
                    tempArr.forEach((item, index) => {
                        this[item] = value[index].data
                    })
                })
            },
            getCourseClassificationList(id) {
                let courseUpdateTime = localStorage.getItem('courseUpdateTime')
                courseClassificationUpdateTime().then(value=>{
                    if(courseUpdateTime===value.data)
                    {
                        console.log('使用了local的缓存');
                        let courseList = JSON.parse(localStorage.getItem('courseList'))
                        courseList.forEach((item)=>{
                            if(item.id===id)
                            {
                                this.currentCourseClassification = JSON.parse(JSON.stringify(item));
                            }
                        })
                        this.filterCourseClassificationList =
                        filterCourseClassificationList2(courseList,this.currentCourseClassification,id);
                        console.log(this.filterCourseClassificationList,'过滤完的课程分类');
                        this.maxLayer = this.filterCourseClassificationList.maxLayer;

                        // 积分在第三层
                        if(this.maxLayer==3)
                        {
                            this.integrationRule = this.filterCourseClassificationList.children
                            this.filterCourseClassificationList.children.forEach((item1)=>{
                            if(item1.type==1||(item1.type==2&&item1.integrationRange)){
                                this.filterCourseClassificationList.children.forEach((item2)=>{
                                    if(item2.children)
                                    {
                                        item2.children.push(item1);
                                    }
                                })
                            }
                            })

                            console.log(this.filterCourseClassificationList,'处理之后的课程分类')

                            let reasonSet = new Set();

                            this.filterCourseClassificationList.children.forEach((item1)=>{
                                if(item1.children){
                                    item1.children.forEach((item2)=>{
                                reasonSet.add(item2.name)
                            })
                            }
                            })
                            this.reasonList = Array.from(reasonSet);
                            console.log(this.reasonList,'申报理由列表');
                            // this.reasonList = this.filterCourseClassificationList.children
                        }
                        //积分在第二层
                        if(this.maxLayer==2)
                        {
                            this.integrationRule = this.filterCourseClassificationList
                            this.filterCourseClassificationList.children.forEach((item)=>{
                                if(item.type==1||(item.type==2&&item.integrationRange))
                                {
                                    this.reasonList.push(item.name);
                                }
                            })
                        }
                        //积分在第一层
                        if(this.maxLayer==1||(this.maxLayer==2&&this.filterCourseClassificationList.children[0].type==2))
                        {
                            this.integrationRule = this.filterCourseClassificationList
                            this.reasonList.push(this.filterCourseClassificationList.name);
                            if(this.filterCourseClassificationList.children)
                            {
                                this.filterCourseClassificationList.children.forEach((item)=>{
                                    if(item.type==2&&item.integrationRange)
                                    {
                                        this.data.reasonList.push(item.name);
                                    }
                            })
                            }
                            
                        }
                    }
                    else{
                        //更新local里面的updateTime
                        localStorage.setItem('courseUpdateTime',value.data)
                        courseClassificationList().then(value => {                   
                        console.log('重新请求了数据并且更新');
                        //更新local里面的courseList
                        localStorage.setItem('courseList',JSON.stringify(value.data))
                        value.data.forEach((item)=>{
                            if(item.id===id)
                            {
                                this.currentCourseClassification = JSON.parse(JSON.stringify(item));
                            }
                        })
                        this.filterCourseClassificationList =
                        filterCourseClassificationList2(value.data,this.currentCourseClassification,id);
                        console.log(this.filterCourseClassificationList,'过滤完的课程分类');
                        this.maxLayer = this.filterCourseClassificationList.maxLayer;

                        // 积分在第三层
                        if(this.maxLayer==3)
                        {
                            this.integrationRule = this.filterCourseClassificationList.children
                            this.filterCourseClassificationList.children.forEach((item1)=>{
                            if(item1.type==1||(item1.type==2&&item1.integrationRange)){
                                this.filterCourseClassificationList.children.forEach((item2)=>{
                                    if(item2.children)
                                    {
                                        item2.children.push(item1);
                                    }
                                })
                            }
                            })

                            console.log(this.filterCourseClassificationList,'处理之后的课程分类')

                            let reasonSet = new Set();

                            this.filterCourseClassificationList.children.forEach((item1)=>{
                                if(item1.children){
                                    item1.children.forEach((item2)=>{
                                reasonSet.add(item2.name)
                            })
                            }
                            })
                            this.reasonList = Array.from(reasonSet);
                            console.log(this.reasonList,'申报理由列表');
                            // this.reasonList = this.filterCourseClassificationList.children
                        }
                        //积分在第二层
                        if(this.maxLayer==2)
                        {
                            this.integrationRule = this.filterCourseClassificationList
                            this.filterCourseClassificationList.children.forEach((item)=>{
                                if(item.type==1||(item.type==2&&item.integrationRange))
                                {
                                    this.reasonList.push(item.name);
                                }
                            })
                        }
                        //积分在第一层
                        if(this.maxLayer==1||(this.maxLayer==2&&this.filterCourseClassificationList.children[0].type==2))
                        {
                            this.integrationRule = this.filterCourseClassificationList
                            this.reasonList.push(this.filterCourseClassificationList.name);
                            if(this.filterCourseClassificationList.children)
                            {
                                this.filterCourseClassificationList.children.forEach((item)=>{
                                    if(item.type==2&&item.integrationRange)
                                    {
                                        this.data.reasonList.push(item.name);
                                    }
                            })
                            }
                            
                        }
                        })
                    }

                })     
            }
        },

        async created() {
            //初始化字典
            this.initDict()
            /** 通过活动id获取当前活动报名信息，aid代码活动id*/
            this.getActivityIntegral({
                activityId: this.$route.params.aid
            })
            /** 获得当前情况下的报名管理列表 */
            this.fuzzyQuery()
        }
    }
</script>

<style scoped>
    /* .champion >>> div{
        background-color:#93d6dc;
    } */
    .imgs{
        width: 80px;
        height: 60px;
    }
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
    .ruleInput >>> .el-input__inner{
        width: 300px;
    }
    .ruleInput2 >>> .el-input__inner{
        width: 70px;
    }
    .ruleInput3 >>> .el-input__inner{
        width: 70px;
    }
    .remark >>> .el-input__inner{
        visibility: hidden;
    }
    .remark >>> .el-input-group__prepend{
        background-color: #d2d97a;
        border-right:1px
    }
    .el-row >>> .explain{
        background-color:#549eff;
        height: 30px;
        line-height: 30px;
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
        height: calc(100vh - 315px);
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: auto
    }
    .labelSpan {
        height: 20px;
        line-height: 20px;
        display: inline-block;
        margin-right: 20px;
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
