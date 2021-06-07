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
                学年度：<el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
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
                <el-table-column prop="pcid" label="批次ID"> </el-table-column>
                <el-table-column prop="plan" label="培养方案">
                </el-table-column>
                <el-table-column prop="xnid" label="学年ID"> </el-table-column>
                <el-table-column prop="xn" label="学年"> </el-table-column>
                <el-table-column prop="jb" label="级别"> </el-table-column>
                <el-table-column prop="classCount" label="课程数">
                </el-table-column>
                <el-table-column prop="state" label="状态"> </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="createPerson" label="创建人">
                </el-table-column>
                <el-table-column prop="modifyTime" label="修改时间">
                </el-table-column>
                <el-table-column prop="modifyPerson" label="修改人">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    width="150"
                    prop="oprator"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-link type="primary">修改</el-link>
                        <router-link type="info" to="/application/erke/detail"
                            >详情</router-link
                        >
                        <el-link type="info">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>

            <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
            />
        </div>
        <!-- </el-col> -->
        <!-- </el-row> -->

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog
            :title="title"
            :visible.sync="open"
            width="600px"
            append-to-body
        >
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户昵称" prop="nickName">
                            <el-input
                                v-model="form.nickName"
                                placeholder="请输入用户昵称"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="归属部门" prop="deptId">
                            <treeselect
                                v-model="form.deptId"
                                :options="deptOptions"
                                :show-count="true"
                                placeholder="请选择归属部门"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号码" prop="phonenumber">
                            <el-input
                                v-model="form.phonenumber"
                                placeholder="请输入手机号码"
                                maxlength="11"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input
                                v-model="form.email"
                                placeholder="请输入邮箱"
                                maxlength="50"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            v-if="form.userId == undefined"
                            label="用户名称"
                            prop="userName"
                        >
                            <el-input
                                v-model="form.userName"
                                placeholder="请输入用户名称"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            v-if="form.userId == undefined"
                            label="用户密码"
                            prop="password"
                        >
                            <el-input
                                v-model="form.password"
                                placeholder="请输入用户密码"
                                type="password"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户性别">
                            <el-select v-model="form.sex" placeholder="请选择">
                                <el-option
                                    v-for="dict in sexOptions"
                                    :key="dict.dictValue"
                                    :label="dict.dictLabel"
                                    :value="dict.dictValue"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-radio-group v-model="form.status">
                                <el-radio
                                    v-for="dict in statusOptions"
                                    :key="dict.dictValue"
                                    :label="dict.dictValue"
                                    >{{ dict.dictLabel }}</el-radio
                                >
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="岗位">
                            <el-select
                                v-model="form.postIds"
                                multiple
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in postOptions"
                                    :key="item.postId"
                                    :label="item.postName"
                                    :value="item.postId"
                                    :disabled="item.status == 1"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="角色">
                            <el-select
                                v-model="form.roleIds"
                                multiple
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in roleOptions"
                                    :key="item.roleId"
                                    :label="item.roleName"
                                    :value="item.roleId"
                                    :disabled="item.status == 1"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input
                                v-model="form.remark"
                                type="textarea"
                                placeholder="请输入内容"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
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
            >
                <el-table :data="managerDialog.config" stripe>
                    <el-table-column prop="sort" label="排序" width="80">
                        <template slot-scope="scope">
                            <el-input
                                class="sortInput"
                                v-model="scope.row.sort"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="nameOflearn"
                        label="学年名称"
                        width="300"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.nameOflearn">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="idOfLearnYear"
                        label="学年ID"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="learnYearNo"
                        label="当前学年"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <input
                                type="radio"
                                name="isNow"
                                value="scope.row.learnYearNo"
                            />
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
                        <el-col :span="15" >
                            <el-select>
                                <el-option label="2021-2022学年"></el-option>
                                <el-option label="2021-2022学年"></el-option>
                                <el-option label="2021-2022学年"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" >
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
                <el-tab-pane  label="根据模版导入">
                    这里是根据模板导入
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
            <el-tabs class="exportDialog" tab-position="left">
                <el-tab-pane label="湖南科技大学">
                    梵蒂冈的发
                </el-tab-pane>
                <el-tab-pane  label="全部">
                    这里是根据模板导入
                </el-tab-pane>
                <el-tab-pane  label="指定单位" disabled>
                    这里是根据模板导入
                </el-tab-pane>
                <el-tab-pane  label="资源环境与安全工程学院">
                    这里是根据模板导入
                </el-tab-pane>
                <el-tab-pane  label="计算机科学与工程学院">
                    这里是根据模板导入
                </el-tab-pane>
                <el-tab-pane  label="化学化工学院">
                    这里是根据模板导入
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 用户导入对话框 -->
        <el-dialog
            :title="upload.title"
            :visible.sync="upload.open"
            width="400px"
            append-to-body
        >
            <el-upload
                ref="upload"
                :limit="1"
                accept=".xlsx, .xls"
                :headers="upload.headers"
                :action="upload.url + '?updateSupport=' + upload.updateSupport"
                :disabled="upload.isUploading"
                :on-progress="handleFileUploadProgress"
                :on-success="handleFileSuccess"
                :auto-upload="false"
                drag
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                    <el-checkbox
                        v-model="upload.updateSupport"
                    />是否更新已经存在的用户数据
                    <el-link
                        type="info"
                        style="font-size: 12px"
                        @click="importTemplate"
                        >下载模板</el-link
                    >
                </div>
                <div class="el-upload__tip" style="color: red" slot="tip">
                    提示：仅允许导入“xls”或“xlsx”格式文件！
                </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFileForm"
                    >确 定</el-button
                >
                <el-button @click="upload.open = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
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
        name: 'erkePlan',
        components: { Treeselect },
        data() {
            return {
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
                    open: false,

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
                    },
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
                    },
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
                    },
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
                value: '',

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
                total: 0,
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
                    pageNum: 1,
                    pageSize: 10,
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
            handleManage() {
                this.manager.open = true
            },
            cancelManager() {
                this.manager.open = false
            },
            /** 查询用户列表 */
            getList() {
                this.loading = true
                listUser(
                    this.addDateRange(this.queryParams, this.dateRange)
                ).then(response => {
                    this.userList = response.rows
                    this.total = response.total
                    this.loading = false
                })
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
                this.reset()
                this.getTreeselect()
                getUser().then(response => {
                    this.postOptions = response.posts
                    this.roleOptions = response.roles
                    this.open = true
                    this.title = '新增课程'
                    this.form.password = this.initPassword
                })
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
                getUser().then(response => {
                    this.postOptions = response.posts
                    this.roleOptions = response.roles
                    this.managerDialog.open = true
                    this.managerDialog.title = '学年配置'
                    this.form.password = this.initPassword
                })
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
            submitForm: function () {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.userId != undefined) {
                            updateUser(this.form).then(response => {
                                this.msgSuccess('修改成功')
                                this.open = false
                                this.getList()
                            })
                        } else {
                            addUser(this.form).then(response => {
                                this.msgSuccess('新增成功')
                                this.open = false
                                this.getList()
                            })
                        }
                    }
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
        height: 350px;
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

    .exportDialog >>> .el-dialog{
        width: 762px !important;
    }
    .exportDialog >>> .el-dialog__body {
        height: 390px;
    }
    .exportDialog >>> .el-tabs__header {
        width: 260px;
    }
    .exportDialog >>> .el-tabs__item {
        text-align: left;
    }
</style>
