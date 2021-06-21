<template>
    <div class="app-container">
        <!-- <el-row :gutter="20"> -->
        <!--部门数据-->

        <!--用户数据-->
        <!-- <el-col :span="24" :xs="24"> -->
        <div class="erke-top">
            <div class="erke-top-head">
                <span> <i>✈</i> 培养方案</span>
            </div>
            <div class="erke-top-foot">
                学年度：<el-select v-model="list.value" placeholder="请选择">
                    <el-option
                        v-for="item in list.rows"
                        :key="item.id"
                        :label="item.yearName"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
                <el-button
                    style="margin-left: 10px"
                    circle
                    icon="el-icon-refresh"
                ></el-button>
                <el-button style="margin-left: 10px" @click="handleManager"
                    >管理</el-button
                >
            </div>
        </div>

        <div class="erke-bottom">
            <el-row :gutter="10" style="margin-bottom: 20px">
                <el-col :span="1.5">
                    <el-button
                        type="primary"
                        plain
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                        v-hasPermi="['system:user:add']"
                        >新增</el-button
                    >
                </el-col>

                <el-col :span="1.5">
                    <el-button
                        type="info"
                        plain
                        icon="el-icon-upload2"
                        size="mini"
                        @click="handleImport"
                        v-hasPermi="['system:user:import']"
                        >导入</el-button
                    >
                </el-col>
                <el-col :span="1.5">
                    <el-button
                        type="warning"
                        plain
                        icon="el-icon-download"
                        size="mini"
                        :loading="exportLoading"
                        @click="handleExport"
                        v-hasPermi="['system:user:export']"
                        >导出</el-button
                    >
                </el-col>
                <el-col :span="1.5">
                    <el-input
                        size="mini"
                        suffix-icon="el-icon-search"
                    ></el-input>
                </el-col>

                <!-- <right-toolbar
                        :showSearch.sync="showSearch"
                        @queryTable="getList"
                        :columns="columns"
                    ></right-toolbar> -->
            </el-row>

            <!-- table start here -->
            <el-table :data="planData" stripe>
                <el-table-column prop="id" label="批次ID"> </el-table-column>
                <el-table-column prop="name" label="培养方案">
                </el-table-column>
                <el-table-column prop="schoolYearId" label="学年ID"> </el-table-column>
                <el-table-column prop="schoolYearName" label="学年"> </el-table-column>
                <el-table-column prop="rank" label="级别" :formatter="formatRank"> </el-table-column>
                <el-table-column prop="courseCount" label="课程数">
                </el-table-column>
                <el-table-column prop="applyingCount" label="申请中">
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter="formarStatus"> </el-table-column>
                <el-table-column prop="createTime" label="创建时间" :formatter="formatUpdateTime">
                </el-table-column>
                <el-table-column prop="createBy" label="创建人">
                </el-table-column>
                <el-table-column prop="updateTime" label="修改时间" :formatter="formatUpdateTime">
                </el-table-column>
                <el-table-column prop="updateBy" label="修改人">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    width="150"
                    prop="oprator"
                    label="操作"
                >
                    <template slot-scope="">
                        <el-link type="primary">修改</el-link>
                        <router-link type="info" to="/application/erke/detail"
                            >详情</router-link
                        >
                        <el-link type="info">删除</el-link>
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

        <!-- this is manage button -->
        <el-dialog
            :title="managerDialog.title"
            :visible.sync="managerDialog.open"
            width="635px"
            append-to-body
            class="managerDialog"
        >
            <el-form
                ref="managerDialog"
                :model="form"
                :rules="rules"
                label-width="80px"
                height="250"
            >
                <el-table :data="list.rows" stripe>
                    <el-table-column
                        lable="sdf"
                        width="40"
                        :render-header="renderSchoolYear"
                    >
                        <template slot-scope="scope">
                            <span
                                @click="deleteManagerDialog(scope.row)"
                                class="addOrMinus"
                                >-</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" label="排序" width="80">
                        <template slot-scope="scope">
                            <el-input
                                class="sortInput"
                                v-model="scope.row.sort"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="yearName"
                        label="分类名称"
                        min-width="250"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.yearName"> </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="ID" align="center">
                    </el-table-column>
                    <el-table-column
                        prop="learnYearNo"
                        label="启用"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <input type="radio" name="isNow" value="true" />
                            <!-- :value="scope.row.learnYearNo" -->
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <!-- this is importButton -->
        <el-dialog
            :title="importDialog.title"
            :visible.sync="importDialog.open"
            width="635px"
            append-to-body
            class="importDialog"
        >
            <el-tabs class="importDialog" tab-position="left">
                <el-tab-pane label="导入之前年度数据">
                    <el-row class="lh30">
                        <el-col :span="5"> 目标年度： </el-col>
                        <el-col :span="19">
                            <el-select>
                                <el-option label="2021-2022学年"></el-option>
                                <el-option label="2021-2022学年"></el-option>
                                <el-option label="2021-2022学年"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="lh30">
                        <el-col :span="5"> 被导入年度： </el-col>
                        <el-col :span="15">
                            <el-select>
                                <el-option label="2021-2022学年"></el-option>
                                <el-option label="2021-2022学年"></el-option>
                                <el-option label="2021-2022学年"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox></el-checkbox>导入全部
                        </el-col>
                    </el-row>
                    <el-row style="text-align: center">
                        <el-checkbox></el-checkbox> 导入课程后，自动发布培养方案
                    </el-row>
                    <el-row>
                        <el-table :data="importDialog.config">
                            <el-table-column
                                prop="isChoose"
                                label="选中"
                                width="70"
                            >
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.isChoose">
                                    </el-checkbox>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="nameOfPlan"
                                label="培养方案名称"
                                width="250"
                            ></el-table-column>

                            <el-table-column
                                prop="level"
                                label="级别"
                                width="70"
                            ></el-table-column>

                            <el-table-column
                                prop="classNumber"
                                label="课程数"
                                width="70"
                            ></el-table-column>
                        </el-table>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="根据模版导入" style="padding: 30px">
                    <el-row>
                        <div class="templateDownload" style="float: right">
                            <el-button type="primary" icon="el-icon-download"
                                >模板文件下载</el-button
                            >
                        </div>
                    </el-row>
                    <el-row>
                        <el-upload
                            class="uploadPlan"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                点击或将<em><b>补充后的模板文件</b></em
                                >拖拽到这里导入
                            </div>
                            <div class="el-upload__tip" slot="tip">
                                只能上传jpg/png文件，且不超过500kb
                            </div>
                        </el-upload>
                    </el-row>
                    <el-row>
                        <div class="uploadMessage">
                            <i class="el-icon-warning-outline"></i>
                            成功导入记录： 421，<span
                                ><i class="el-icon-error"></i>
                                失败3条错误记录下载</span
                            >
                        </div>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- this is exportButton -->
        <el-dialog
            :title="exportDialog.title"
            :visible.sync="exportDialog.open"
            width="635px"
            append-to-body
            class="exportDialog"
        >
            <el-row>
                <el-col :span="9" class="planExport">
                    <div>
                        <el-tree :data="units"></el-tree>
                    </div>
                </el-col>
                <el-col :span="15" class="planChoose">
                    <el-checkbox-group v-model="checkboxGroup">
                        <el-checkbox
                            label="第二课堂项目(活动、竞赛类)培养方案"
                            border
                        ></el-checkbox>
                        <el-checkbox
                            label="第二课堂项目(活动、竞赛类)积分名录"
                            border
                        ></el-checkbox>
                        <el-checkbox
                            label="第二课堂项目（活动、竟赛类)积分要求表"
                            border
                        ></el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm"
                    >导出数据</el-button
                >
                <el-button @click="cancel">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 新增 -->
        <el-dialog
            :title="addPlanDialog.title"
            :visible.sync="addPlanDialog.open"
            width="635px"
            append-to-body
            class="addPlanDialog"
        >
            <el-form
                ref="addPlanDialog"
                :model="form"
                :rules="rules"
                label-width="80px"
            >
                <el-table :data="planData" height="350" stripe>
                    <el-table-column
                        lable="sdf"
                        width="40"
                        
                        :render-header="renderHeader"
                    >
                        <template slot-scope="scope">
                            <span
                                @click="deleteManagerDialog(scope.row)"
                                class="addOrMinus"
                                >-</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" label="排序" width="80">
                        <template slot-scope="scope">
                            <el-input
                                class="sortInput"
                                v-model="scope.row.sort"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="培养方案名称"
                        min-width="250"
                    >
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.name"
                                class="nameOfPlan"
                            >
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="rank"
                        label="级别"
                        align="center"
                        width="120"
                        :formatter="formatRank"
                    >
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.rank">
                                <el-option
                                    v-for="item in dict_sc_train_program_rank"
                                    :key="item.id"
                                    :value="item.dictValue"
                                    :label="item.dictLabel"
                                >
                                </el-option>
                                <!-- <el-option value="校级" label="校级"></el-option> -->
                                <!-- <el-option value="院级" label=></el-option> -->
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="isUse"
                        label="当前学年"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.isUse"></el-switch>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        trainingProgramFindClassNumber,
        trainingProgramMulti,
        trainingProgramId,
        trainingProgramList,
        trainingProgram
    } from '@/api/application/secondClass/trainingProgram'
    import {
        schoolYearList,
        schoolYearMulti
    } from '@/api/application/secondClass/schoolYear'
    import formatDate from '@/utils/formatDate.js'
    import {getDict} from '@/api/application/secondClass/dict/type.js'

    import { getToken } from '@/utils/auth'
    import { treeselect } from '@/api/system/dept'
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        name: 'erkePlan',
        components: { Treeselect },
        data() {
            return {
                /* 培养方案级别 */
                dict_sc_train_program_rank: {},
                /* 培养方案状态 */
                dict_sc_train_program_status: {},
                /* 学年列表 */
                list: {
                    value: '2021',
                    rows: []
                },

                addPlanDialog: {
                    title: '新增培养方案',
                    open: false,
                    config: [
                        {
                            sort: 1,
                            nameOfPlan: '湖南科技大学',
                            level: '校级',
                            isUse: true
                        },
                        {
                            sort: 2,
                            nameOfPlan: '湖南科技大学',
                            level: '院级',
                            isUse: true
                        },
                        {
                            sort: 3,
                            nameOfPlan: '资源环境与安全工程学院',
                            level: '院级',
                            isUse: true
                        },
                        {
                            sort: 4,
                            nameOfPlan: '化学化工学院',
                            level: '院级',
                            isUse: true
                        }
                    ]
                },
                checkboxGroup: [],
                units: [
                    {
                        label: '湖南科技大学'
                    },
                    {
                        label: '全部'
                    },
                    {
                        label: '指定单位',
                        children: [
                            {
                                label: '资源环境与安全工程学院'
                            },
                            {
                                label: '计算机科学与工程学院'
                            },
                            {
                                label: '化学化工实验'
                            }
                        ]
                    }
                ],
                importDialog: {
                    title: '导入方案',
                    open: false,
                    config: [
                        {
                            isChoose: true,
                            nameOfPlan: '湖南科技大学',
                            level: '校级',
                            classNumber: 84
                        },
                        {
                            isChoose: false,
                            nameOfPlan: '资源环境与安全工程学',
                            level: '院级',
                            classNumber: 53
                        },
                        {
                            isChoose: true,
                            nameOfPlan: '土木工程学院',
                            level: '院级',
                            classNumber: 7
                        },
                        {
                            isChoose: true,
                            nameOfPlan: '计算机科学与工程',
                            level: '院级',
                            classNumber: 25
                        },
                        {
                            isChoose: false,
                            nameOfPlan: '教育学院',
                            level: '院级',
                            classNumber: 14
                        },
                        {
                            isChoose: true,
                            nameOfPlan: '湖南科技大学',
                            level: '校级',
                            classNumber: 84
                        },
                        {
                            isChoose: false,
                            nameOfPlan: '湖南科技大学',
                            level: '校级',
                            classNumber: 28
                        },
                        {
                            isChoose: true,
                            nameOfPlan: '湖南科技大学',
                            level: '校级',
                            classNumber: 84
                        }
                    ]
                },
                exportDialog: {
                    title: '',
                    open: false
                },
                managerDialog: {
                    title: '',
                    open: false,
                    radio: '1',
                    config: [
                        {
                            sort: '1',
                            nameOflearn: '2018-2019学年',
                            idOfLearnYear: '1',
                            learnYearNo: '1'
                        },
                        {
                            sort: '2',
                            nameOflearn: '2019-2020学年',
                            idOfLearnYear: '2',
                            learnYearNo: '2'
                        },
                        {
                            sort: '3',
                            nameOflearn: '2020-2021学年',
                            idOfLearnYear: '3',
                            learnYearNo: '3'
                        },
                        {
                            sort: '4',
                            nameOflearn: '2021-2022学年',
                            idOfLearnYear: '4',
                            learnYearNo: '4'
                        }
                    ]
                },

                manager: {
                    open: false
                },
                planData: [
                    {
                        pcid: 1,
                        plan: '湖南科技大学',
                        xnid: 1,
                        xn: '2021-2022学年',
                        jb: '校级',
                        classCount: 30,
                        state: '启用',
                        createTime: '2021-03-01',
                        createPerson: '袁建国',
                        modifyTime: '2021-03-02',
                        modifyPerson: '袁建国',
                        oprator: {
                            modify: '',
                            detail: '/application/erke/datail',
                            delete: ''
                        }
                    }
                ],
                options: [
                    {
                        value: '选项1',
                        label: '全部'
                    },
                    {
                        value: '选项2',
                        label: '2021-2022学年'
                    },
                    {
                        value: '选项3',
                        label: '2020-2021学年'
                    },
                    {
                        value: '选项4',
                        label: '2019-2021学年'
                    },
                    {
                        value: '选项5',
                        label: '北京烤鸭'
                    }
                ],
                value: 'hello',

                // 遮罩层
                loading: true,
                // 导出遮罩层
                exportLoading: false,
                // 选中数组
                ids: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                // 显示搜索条件
                showSearch: true,
                // 总条数
                total: 40,
                // 用户表格数据
                userList: null,
                // 弹出层标题
                title: '',
                // 部门树选项
                deptOptions: undefined,
                // 是否显示弹出层
                open: false,
                // 部门名称
                deptName: undefined,
                // 默认密码
                initPassword: undefined,
                // 日期范围
                dateRange: [],
                // 状态数据字典
                statusOptions: [],
                // 性别状态字典
                sexOptions: [],
                // 岗位选项
                postOptions: [],
                // 角色选项
                roleOptions: [],
                // 表单参数
                form: {},
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                // 用户导入参数
                upload: {
                    // 是否显示弹出层（用户导入）
                    open: false,
                    // 弹出层标题（用户导入）
                    title: '',
                    // 是否禁用上传
                    isUploading: false,
                    // 是否更新已经存在的用户数据
                    updateSupport: 0,
                    // 设置上传的请求头部
                    headers: { Authorization: 'Bearer ' + getToken() },
                    // 上传的地址
                    url:
                        process.env.VUE_APP_BASE_API + '/system/user/importData'
                },
                // 查询参数
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
                // 列信息
                columns: [
                    { key: 0, label: `用户编号`, visible: true },
                    { key: 1, label: `用户名称`, visible: true },
                    { key: 2, label: `用户昵称`, visible: true },
                    { key: 3, label: `部门`, visible: true },
                    { key: 4, label: `手机号码`, visible: true },
                    { key: 5, label: `状态`, visible: true },
                    { key: 6, label: `创建时间`, visible: true }
                ],
                // 表单校验
                rules: {
                    userName: [
                        {
                            required: true,
                            message: '用户名称不能为空',
                            trigger: 'blur'
                        }
                    ],
                    nickName: [
                        {
                            required: true,
                            message: '用户昵称不能为空',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '用户密码不能为空',
                            trigger: 'blur'
                        }
                    ],
                    email: [
                        {
                            type: 'email',
                            message: "'请输入正确的邮箱地址",
                            trigger: ['blur', 'change']
                        }
                    ],
                    phonenumber: [
                        {
                            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                            message: '请输入正确的手机号码',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        watch: {
            // 根据名称筛选部门树
            deptName(val) {
                this.$refs.tree.filter(val)
            }
        },
        created() {
            this.getList()
            this.getTreeselect()
            this.getDicts('sys_normal_disable').then(response => {
                this.statusOptions = response.data
            })
            this.getDicts('sys_user_sex').then(response => {
                this.sexOptions = response.data
            })
            this.getConfigKey('sys.user.initPassword').then(response => {
                this.initPassword = response.msg
            })
        },
        methods: {
            formatUpdateTime(row,column,cellValue) {
                if(cellValue != null) {
                    return formatDate(cellValue)
                }
                return cellValue
            },
            formarStatus(row,column,cellValue) {
                if(cellValue != null) {
                    return this.dict_sc_train_program_status[cellValue].dictLabel
                }
                return cellValue
            },
            formatRank(row,column,cellValue) {
                if(cellValue != null) {
                    return this.dict_sc_train_program_rank[cellValue].dictLabel
                }
                return cellValue
            },
            renderHeader(h) {
                return h(
                    'span',
                    {
                        class: 'addOrMinus',
                        on: {
                            click: this.addtrainingProgram
                        }
                    },
                    '+'
                )
            },
            renderSchoolYear(h) {
                return h(
                    'span',
                    {
                        class: 'addOrMinus',
                        on: {
                            click: this.addSchoolYear
                        }
                    },
                    '+'
                )
            },
            async addSchoolYear() {
                /* 后端未写添加的接口。。。 */
                this.list.row.push({
                    creteTime: null,
                    delateTime: null,
                    
                })
            },
            async addtrainingProgram() {
                this.planData.push({
                    schoolYearId: 5,
                    name: "",
                    rank: 0,
                    status: 1,
                })
            },
            deleteManagerDialog() {},
            handleManage() {
                this.manager.open = true
            },
            cancelManager() {
                this.manager.open = false
            },
            /** 查询用户列表 */
            async getList(t) {
                console.log(t)
                this.loading = true
                await trainingProgramList({
                    page: t.page,
                    limit: t.limit
                }).then(value => {
                    this.planData = value.data.list
                    console.log(value.data.list)
                    this.$forceUpdate()
                    this.loading = false
                })
                // listUser(
                //     this.addDateRange(this.queryParams, this.dateRange)
                // ).then(response => {
                //     this.userList = response.rows
                //     this.total = response.total
                    
                // })
            },
            /** 查询部门下拉树结构 */
            getTreeselect() {
                treeselect().then(response => {
                    console.log(response)
                    this.deptOptions = response.data
                })
            },
            // 筛选节点
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            // 节点单击事件
            handleNodeClick(data) {
                this.queryParams.deptId = data.id
                this.getList()
            },
            // 用户状态修改
            handleStatusChange(row) {
                let text = row.status === '0' ? '启用' : '停用'
                this.$confirm(
                    '确认要"' + text + '""' + row.userName + '"用户吗?',
                    '警告',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                )
                    .then(function () {
                        return changeUserStatus(row.userId, row.status)
                    })
                    .then(() => {
                        this.msgSuccess(text + '成功')
                    })
                    .catch(function () {
                        row.status = row.status === '0' ? '1' : '0'
                    })
            },
            handleAdd() {
                this.addPlanDialog.open = true
            },
            // 取消按钮
            cancel() {
                this.open = false
                this.reset()
            },
            // 表单重置
            reset() {
                this.form = {
                    userId: undefined,
                    deptId: undefined,
                    userName: undefined,
                    nickName: undefined,
                    password: undefined,
                    phonenumber: undefined,
                    email: undefined,
                    sex: undefined,
                    status: '0',
                    remark: undefined,
                    postIds: [],
                    roleIds: []
                }
                this.resetForm('form')
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.page = 1
                this.getList()
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.dateRange = []
                this.resetForm('queryForm')
                this.handleQuery()
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.userId)
                this.single = selection.length != 1
                this.multiple = !selection.length
            },
            /** 新增按钮操作 */
            handleManager() {
                this.reset()
                this.getTreeselect()

                // this.postOptions = response.posts
                // this.roleOptions = response.roles
                this.managerDialog.open = true
                this.managerDialog.title = '学年配置'
                this.form.password = this.initPassword
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                this.getTreeselect()
                const userId = row.userId || this.ids
                getUser(userId).then(response => {
                    this.form = response.data
                    this.postOptions = response.posts
                    this.roleOptions = response.roles
                    this.form.postIds = response.postIds
                    this.form.roleIds = response.roleIds
                    this.open = true
                    this.title = '修改用户'
                    this.form.password = ''
                })
            },
            /** 重置密码按钮操作 */
            handleResetPwd(row) {
                this.$prompt('请输入"' + row.userName + '"的新密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then(({ value }) => {
                        resetUserPwd(row.userId, value).then(response => {
                            this.msgSuccess('修改成功，新密码是：' + value)
                        })
                    })
                    .catch(() => {})
            },
            /** 提交按钮 */
            async submitForm () {
                let temp = this.planData
                delete temp[temp.length-1].isUse
                console.log(temp[temp.length-1])
                trainingProgram(temp[temp.length-1]).then(value => {
                    console.log(value, 'trainingProgram')
                })
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                const userIds = row.userId || this.ids
                this.$confirm(
                    '是否确认删除用户编号为"' + userIds + '"的数据项?',
                    '警告',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                )
                    .then(function () {
                        return delUser(userIds)
                    })
                    .then(() => {
                        this.getList()
                        this.msgSuccess('删除成功')
                    })
            },
            /** 导出按钮操作 */
            handleExport() {
                this.exportDialog.title = '导出数据'
                this.exportDialog.open = true
                // const queryParams = this.queryParams
                // this.$confirm('是否确认导出所有用户数据项?', '警告', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // })
                //     .then(() => {
                //         this.exportLoading = true
                //         return exportUser(queryParams)
                //     })
                //     .then(response => {
                //         this.download(response.msg)
                //         this.exportLoading = false
                //     })
            },
            /** 导入按钮操作 */
            handleImport() {
                this.importDialog.title = '导入方案'
                this.importDialog.open = true
            },
            /** 下载模板操作 */
            importTemplate() {
                importTemplate().then(response => {
                    this.download(response.msg)
                })
            },
            // 文件上传中处理
            handleFileUploadProgress(event, file, fileList) {
                this.upload.isUploading = true
            },
            // 文件上传成功处理
            handleFileSuccess(response, file, fileList) {
                this.upload.open = false
                this.upload.isUploading = false
                this.$refs.upload.clearFiles()
                this.$alert(response.msg, '导入结果', {
                    dangerouslyUseHTMLString: true
                })
                this.getList()
            },
            // 提交上传文件
            submitFileForm() {
                this.$refs.upload.submit()
            }
        },
        async created() {
            /* 获取学年列表over */
            await schoolYearList().then(value => {
                console.log(value, 'schoolYearList')
                this.list.rows = value.rows
                this.list.value = value.rows[0].yearName
            })
            /* 批量修改学年 */
            await schoolYearMulti({
                deleteIds: [
                    6,7
                ],
                schoolYearList:[
                    {
                        id: 11,
                        nowYear:5,
                        sort: 43,
                        yearName: "2022"
                    },
                    {
                        id: 12,
                        nowYear:5,
                        sort: 43,
                        yearName: "2023"
                    }
                ]
            }).then(value => {
                console.log(value, 'schoolYearMulti')
            })

            trainingProgramFindClassNumber({
                schoolYearName: 'das',
                trainingName: 4
            }).then(value => {
                console.log(value, 'traningProgramFindClassNumber')
            })
            trainingProgramMulti({
                deleteIds: [
                    6,7
                ],
                schoolYearList:[
                    {
                        id: 11,
                        nowYear:5,
                        sort: 43,
                        yearName: "2022"
                    },
                    {
                        
                        nowYear:5,
                        sort: 43,
                        yearName: "2023"
                    }
                ]
            }).then(value => {
                console.log(value, 'trainingProgramMulti')
            })
            trainingProgramId(2).then(value => {
                console.log(value, 'trainingProgramId')
            })
            /* 查询培养方案分页 */
            await trainingProgramList().then(value => {
                this.planData = value.data.list
                this.queryParams.totalCount = value.data.totalCount
                this.queryParams.totalPage = value.data.totalPage
                this.queryParams.pageSize = value.data.pageSize
                this.queryParams.currPage = value.data.currPage
                console.log(value, 'trainingProgramList')
            })
            
        },
        async mounted() {
            await getDict('sc_train_program_rank').then(value => {
                console.log(value)
                this.dict_sc_train_program_rank = value.data
            })
            await getDict('sc_train_program_status').then(value => {
                console.log(value)
                this.dict_sc_train_program_status = value.data
            })
        }
    }
</script>

<style scoped>
    .erke-top {
        margin-right: 10px;
        height: 120px;
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
    .sortInput >>> .el-input__inner {
        width: 40px !important;
    }
    .managerDialog >>> .el-dialog__body {
        /* overflow: auto; */
        height: 350px;
    }
    .managerDialog >>> .el-table__body-wrapper {
        overflow: auto;
         height: 250px;
    }
    .managerDialog >>> .el-table__row td {
        padding: 5px 0;
    }

    /*import button */
    .importDialog >>> .el-dialog {
        width: 745px !important;
    }
    .importDialog >>> .el-tabs__item {
        text-align: left;
    }
    .importDialog,
    .importDialog >>> .el-tabs__nav-scroll {
        overflow: visible !important;
    }
    .importDialog >>> .el-tabs__nav-wrap {
        position: relative;
        overflow: visible !important;
    }
    .importDialog >>> .el-tabs__nav-wrap::after {
        content: '';
        position: absolute;
        top: -45px;
        right: 0;
        width: 1px;
        background-color: #ddd;
        height: 450px !important;
    }
    .importDialog >>> .el-tabs__active-bar {
        display: none;
    }
    .importDialog >>> .el-tabs__content {
        padding: 0 10px 10px 10px;
    }
    .importDialog >>> .el-input__inner {
        width: 300px;
    }
    .importDialog >>> .el-row {
        margin: 12px 0;
        /* line-height: 30px; */
        overflow: hidden;
    }
    .lh30 {
        line-height: 30px;
    }
    .importDialog >>> .el-table {
        height: 270px;
        /* border: 1px solid #ddd; */
        /* border-radius: 5px; */
        overflow: auto;
    }
    .importDialog >>> .el-table::before {
        content: none;
    }
    .importDialog >>> td {
        height: 40px !important;
        padding: 5px 0;
    }
    .importDialog >>> .el-tabs__header {
        width: 163px;
    }
    .importDialog >>> .el-dialog__body {
        height: 420px;
        padding-top: 0;
        padding-bottom: 0;
        padding-right: 0;
    }
    .importDialog >>> .el-tabs__nav {
        padding-top: 20px !important;
    }

    .exportDialog >>> .el-dialog {
        width: 762px !important;
    }
    .exportDialog >>> .el-dialog__body {
        padding-top: 10px;
        height: 390px;
    }
    .exportDialog >>> .el-tabs__header {
        width: 260px;
    }
    .exportDialog >>> .el-tabs__item {
        text-align: left;
    }
    .planExport {
        position: relative;
    }
    .planExport::after {
        position: absolute;
        right: 0;
        top: -40px;
        content: '';
        width: 1px;
        height: 400px;
        background-color: #ddd;
    }
    .planExport >>> .el-tree-node__content {
        height: 40px;
        line-height: 20px;
        padding: 10px;
    }
    * >>> .is-current {
        background-color: #f6f7f9;
        color: #5f9dfd;
        cursor: pointer;
    }
    .planChoose >>> .el-checkbox {
        margin: 5px 20px !important;
        width: 320px;
    }
    .uploadPlan {
        /* width: 500px !important; */
    }
    .uploadPlan >>> .el-upload-dragger {
        border: 1px dashed #1890ff;
        width: 440px !important;
    }
    .uploadMessage {
        background-color: red;
        height: 32px;
        background-color: #e8f4ff;
        line-height: 32px;
        border: 1px solid #ddd;
        padding: 0 20px;
    }
    .uploadMessage span {
        color: #de3c50;
    }
    .addPlanDialog >>> .el-dialog {
        width: 740px !important;
    }
    .addPlanDialog >>> .el-table {
        /* height: 350px; */
    }
    .nameOfPlan {
        width: 300px;
    }
    .nameOfPlan >>> .el-input__inner {
        width: 300px !important;
    }
</style>
