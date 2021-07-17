<!--
 * @Descripttion: 积分标准
 * @Author: 林舒恒
 * @Date: 2021-06-03 14:51:27
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-07-17 19:56:15
-->
<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-head">
                        <span> <i>✈</i> 积分标准</span>
                    </div>
                </div>

                <div class="erke-bottom">
                    <div class="typeSet" @click="handleSetting">
                        <i class="el-icon-setting"></i>
                    </div>
                    <el-tabs tab-position="left" v-model="activeName">
                        <div class="operate">
                            <el-row :gutter="10" style="height: 50px">
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
                                        suffix-icon="el-icon-search"
                                        placeholder="课程名称"
                                    >
                                    </el-input>
                                </el-col>
                                <el-col :span="1.5">
                                    <el-select
                                        v-model="value"
                                        placeholder="选择"
                                    >
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="1.5">
                                    <el-select
                                        v-model="value"
                                        placeholder="选择"
                                    >
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </div>
                        <!-- 表单下面 -->
                        <template v-for="item in datadata">
                            <!-- default-expand-all -->
                            <el-tab-pane
                                :label="item.name"
                                :key="item.id"
                                :name="item.name"
                            >
                                <div class="erke-buttom-right">
                                    <el-table
                                        :data="item.children"
                                        row-key="id"
                                        v-loading="loading"
                                        :tree-props="{
                                            children: 'children',
                                            hasChildren: 'hasChildren'
                                        }"
                                    >
                                        <el-table-column type="index">
                                        </el-table-column>

                                        <!-- <el-table-column
                                            prop="id"
                                            label="ID"
                                            width="150"
                                        > -->
                                        <!-- </el-table-column> -->
                                        <el-table-column
                                            prop="name"
                                            label="项目名称"
                                            min-width="300"
                                            :show-overflow-tooltip="true"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="type"
                                            label="类型"
                                            :formatter="formatType"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="integralType"
                                            label="积分类别"
                                            min-width="120"
                                            :formatter="formatIntegralType"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="integrationRange"
                                            label="分值"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="updateTime"
                                            label="修订时间"
                                            :show-overflow-tooltip="true"
                                            :formatter="formatUpdateTime"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            label="操作"
                                            fixed="right"
                                            width="120"
                                        >
                                            <template slot-scope="scope">
                                                <el-link type="primary"
                                                    >修改</el-link
                                                >
                                                <el-link type="info"
                                                    >排序</el-link
                                                >
                                                <el-link
                                                    type="info"
                                                    @click="
                                                        deleteCourseClassificaiton(
                                                            scope.row
                                                        )
                                                    "
                                                    >删除</el-link
                                                >
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
                            </el-tab-pane>
                        </template>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>

        <!-- 设置 -->
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
                        prop="nameOflearn"
                        label="学年名称"
                        min-width="250"
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
                        <template slot-scope="">
                            <input
                                type="checkbox"
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

        <!-- 新增 -->
        <el-dialog
            :title="addStardardDialog.title"
            :visible.sync="addStardardDialog.open"
            append-to-body
            class="addStardardDialog"
            width="850px"
        >
            <el-row>
                <el-col :span="4"> 上级节点： </el-col>
                <el-col :span="20">
                    <el-cascader
                        :options="datadata"
                        :props="{ checkStrictly: true }"
                        :show-all-levels="false"
                        @change="handleNodeChange"
                    >
                        <!-- <template slot-scope="{ node, data }">
                            <span>{{ data.name }}</span>
                            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                        </template> -->
                    </el-cascader>

                    <!-- <el-select v-model="activeName" class="longSelect">
                        <el-option
                            v-for="item in datadata"    
                            :key="item.id"
                            :value="item.name"
                            :label="item.name"    
                        >
                        </el-option>
                    </el-select> -->
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4"> 节点名称： </el-col>
                <el-col :span="20">
                    <el-input
                        type="textarea"
                        v-model="postCourseClassification.name"
                    >
                    </el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4"> 类型： </el-col>
                <el-col :span="20">
                    <el-select v-model="postCourseClassification.type">
                        <el-option
                            v-for="item in dict_sc_course_classification_type"
                            :key="item.dictCode"
                            :value="item.dictSort"
                            :label="item.dictLabel"
                        >
                        </el-option>
                        <!-- <el-option value="积分项"></el-option> -->
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4"> 分值： </el-col>
                <el-col :span="20">
                    <el-row>
                        <el-radio
                            v-model="addStardardDialog.radio"
                            :label="0"
                            @change="handleIntegralType"
                            >定值</el-radio
                        >
                        <el-input
                            v-model="addStardardDialog.fixed"
                            :disabled="isFixed"
                            @change="handleFixed"
                        ></el-input>
                    </el-row>
                    <el-row>
                        <el-radio
                            v-model="addStardardDialog.radio"
                            :label="1"
                            @change="handleIntegralType"
                            >范围</el-radio
                        >
                        <el-input
                            v-model="addStardardDialog.start"
                            :disabled="isRange"
                            @change="handleRange"
                        ></el-input>
                        至
                        <el-input
                            v-model="addStardardDialog.end"
                            :disabled="isRange"
                            @change="handleRange"
                        ></el-input>
                    </el-row>
                    <el-row>
                        <el-radio
                            v-model="addStardardDialog.radio"
                            :label="2"
                            @change="handleIntegralType"
                            >不定值</el-radio
                        >
                    </el-row>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="addCourseClassification"
                    >确定</el-button
                >
            </div>
        </el-dialog>
        <!-- 导出 -->
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
                        <el-tree :data="exportDialog.units"></el-tree>
                    </div>
                </el-col>
                <el-col :span="15" class="planChoose">
                    <el-checkbox-group v-model="exportDialog.checkboxGroup">
                        <el-checkbox
                            label="第二课堂项目(活动、竞赛类)积分标准表"
                            border
                        ></el-checkbox>
                        <!-- <el-checkbox label="第二课堂项目(活动、竞赛类)积分名录" border ></el-checkbox>-->
                        <!-- <el-checkbox label="第二课堂项目（活动、竟赛类)积分要求表" border ></el-checkbox> -->
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
    </div>
</template>

<script>
    import {
        courseClassificationSortList,
        courseClassificationMulti,
        courseClassificationJudgeId,
        courseClassificationList,
        courseClassificationIds,
        courseClassification
    } from '@/api/application/secondClass/courseClassification.js'
    import filterCourseClassificationList from '@/utils/filterCourseClassificationList'
    import formatDate from '@/utils/formatDate.js'
    import { getDict } from '@/api/application/secondClass/dict/type.js'

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
                loading: false,
                postCourseClassification: {
                    createTime: null,
                    createUserId: null,
                    deleteTime: null,
                    daleteUserId: null,
                    // id:
                    integralType: 0,
                    integrationRange: 5,
                    layer: 1,
                    name: '',
                    pid: 1,
                    remark: 'elit cod sdf s',
                    sort: 0,
                    type: 0,
                    updateTime: null,
                    updateUserId: null
                },
                /* 弹窗 -> 类型  */
                label: '',
                /* tab栏 */
                activeName: '思想政治与人文素养',
                dict_sc_integral_type: {},
                dict_sc_course_classification_type: {},
                exportDialog: {
                    title: '',
                    open: false,
                    checkboxGroup: [],
                    units: [
                        {
                            label: '全部'
                        },
                        {
                            label: '湖南科技大学'
                        },
                        {
                            label: '学术科技与创新'
                        },
                        {
                            label: '社会实线与志愿公'
                        },
                        {
                            label: '文化体育与艺术'
                        },
                        {
                            label: '社会工作与履历'
                        },
                        {
                            label: '职业技能与特长'
                        }
                    ]
                },
                addStardardDialog: {
                    title: '新增/编辑',
                    open: false,
                    radio: 0,
                    fixed: '',
                    start: '',
                    end: ''
                },
                textareaContent: '',

                managerDialog: {
                    title: '',
                    open: false,
                    radio: '1',
                    config: [
                        {
                            sort: '1',
                            nameOflearn: '思想政治与人文素养',
                            idOfLearnYear: '1',
                            learnYearNo: '1'
                        },
                        {
                            sort: '2',
                            nameOflearn: '学术科技与创新',
                            idOfLearnYear: '2',
                            learnYearNo: '2'
                        },
                        {
                            sort: '3',
                            nameOflearn: '社会实践与志愿公益',
                            idOfLearnYear: '3',
                            learnYearNo: '3'
                        },
                        {
                            sort: '4',
                            nameOflearn: '文化体育与艺术',
                            idOfLearnYear: '4',
                            learnYearNo: '4'
                        },
                        {
                            sort: '5',
                            nameOflearn: '社会工作与原历',
                            idOfLearnYear: '5',
                            learnYearNo: '4'
                        },
                        {
                            sort: '6',
                            nameOflearn: '职业技能与特长',
                            idOfLearnYear: '6',
                            learnYearNo: '4'
                        }
                    ]
                },
                datadata: [],
                count: {
                    classCount: 50,
                    apyling: 5,
                    haspass: 40,
                    nopass: 5
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
                            detail: '/application/erke/erkePlan/datail',
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
                            detail: '/application/erke/erkePlan/datail',
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
                            detail: '/application/erke/erkePlan/datail',
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
                            detail: '/application/erke/erkePlan/datail',
                            delete: ''
                        }
                    }
                ],
                value: '1',
                options: [
                    {
                        value: '1',
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
        computed: {
            isFixed() {
                return this.addStardardDialog.radio != 0
            },
            isRange() {
                return this.addStardardDialog.radio != 1
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
            async deleteCourseClassificaiton(row) {
                this.$alert('您确定要删除吗吗', '提示框', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass: 'message_box_alert',
                    callback: async action => {
                        if (action == 'cancel') {
                            this.$message.info('取消删除')
                        } else {
                            await courseClassificationIds(row.id)
                                .then(value => {
                                    console.log(value)
                                    this.$message.success('删除成功')
                                    this.getCourseClassificationList()
                                })
                                .catch(err => {
                                    this.$message.error('删除失败')
                                })
                        }
                    }
                })
            },
            handleFixed() {
                this.postCourseClassification.integrationRange = this.addStardardDialog.fixed
            },
            handleRange() {
                this.postCourseClassification.integrationRange =
                    this.addStardardDialog.start +
                    ':' +
                    this.addStardardDialog.end
            },
            handleIntegralType(value) {
                this.postCourseClassification.integralType = value + 1
                console.log(this.postCourseClassification.integralType)
            },
            /* 选择上级节点触发的事件 */
            handleNodeChange(value) {
                this.postCourseClassification.pid = value[value.length - 1]
                this.postCourseClassification.layer = value.length
                console.log(value)
            },
            /* 新增积分类别 */
            async addCourseClassification() {
                console.log(this.postCourseClassification)
                await courseClassification(this.postCourseClassification).then(
                    value => {
                        console.log(value, 777)
                        this.addStardardDialog.open = false
                        this.$message.success('添加成功')
                        this.getCourseClassificationList()
                    }
                )
                // console.log()
            },
            formatIntegralType(row, column, cellValue) {
                if (cellValue != null) {
                    return this.dict_sc_integral_type[cellValue].remark
                }
                return cellValue
            },
            formatType(row, column, cellValue) {
                if (cellValue != null) {
                    return this.dict_sc_course_classification_type[cellValue]
                        .dictLabel
                }
                return cellValue
            },
            formatUpdateTime(row, column, cellValue) {
                if (cellValue != null) {
                    return formatDate(cellValue)
                }
                return cellValue
            },
            renderHeader(h) {
                return h(
                    'span',
                    {
                        class: 'addOrMinus',
                        on: {
                            click: this.addManagerDialog
                        }
                    },
                    '+'
                )
            },
            addManagerDialog() {},
            handleSetting() {
                this.reset()
                this.getTreeselect()

                // this.postOptions = response.posts
                // this.roleOptions = response.roles
                this.managerDialog.open = true
                this.managerDialog.title = '学年配置'
                this.form.password = this.initPassword
            },
            sureClass(row) {
                if (row.state === '申请中') {
                    return 'textPlain'
                } else if (row.state === '有效') {
                    return 'textgreen'
                } else {
                    return 'textRed'
                }
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
                    .then(function() {
                        return changeUserStatus(row.userId, row.status)
                    })
                    .then(() => {
                        this.msgSuccess(text + '成功')
                    })
                    .catch(function() {
                        row.status = row.status === '0' ? '1' : '0'
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
            handleAdd() {
                this.addStardardDialog.open = true
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
            submitForm: function() {
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
                    .then(function() {
                        return delUser(userIds)
                    })
                    .then(() => {
                        this.getList()
                        this.msgSuccess('删除成功')
                    })
            },
            /** 导出按钮操作 */
            handleExport() {
                this.exportDialog.open = true
            },
            /** 导入按钮操作 */
            handleImport() {
                this.upload.title = '用户导入'
                this.upload.open = true
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
            },
            //根据参数查询二课课程分类列表
            async getCourseClassificationList() {
                this.loading = true
                await courseClassificationList().then(value => {
                    /* 保证value存在且唯一 */
                    /* label保证渲染视图 */
                    value.data = value.data.map(item => ({
                        ...item,
                        value: item.id,
                        label: item.name
                    }))
                    this.datadata = filterCourseClassificationList(value)
                    console.log(this.datadata)
                })
                this.loading = false
            }
        },
        async created() {
            await getDict('sc_course_classification_type').then(value => {
                console.log(value, 'sc_course_classification_type')
                this.dict_sc_course_classification_type = value.data
                this.label = this.dict_sc_course_classification_type[0].dictLabel
            })
        },
        async mounted() {
            this.getCourseClassificationList()
            await getDict('sc_integral_type').then(value => {
                console.log(value, 'sc_integral_type')
                this.dict_sc_integral_type = value.data
            })
        }
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
    .erke-top-head {
        height: 50px;
        line-height: 50px;
    }
    .erke-top-head span {
        display: inline-block;
        background-color: #e8f4ff;
        margin-left: 10px;
        font-weight: 700;
        height: 37px;
        width: 130px;
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
        /* background-color: #fff; */
        position: relative;
        overflow: hidden;
    }
    .erke-buttom-left {
        width: 220px;
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
        width: 192px;
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
    .typeSet {
        margin-top: 10px;
        position: absolute;
        left: 17px;
        top: 255px;
        z-index: 99;
        height: 40px;
        width: 186px;
        border: dashed 1px #ccc;
        cursor: pointer;
    }
    .typeSet i {
        position: absolute;
        left: calc(50% - 8px);
        top: calc(50% - 8px);
        color: #999;
    }
    .erke-buttom-right {
        /* overflow: auto;
        background-color: #fff;

        height: calc(100vh - 140px);
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 5px; */
    }
    .el-input {
        width: 200px;
    }
    .textRed {
        color: #de3c50;
    }
    .textgreen {
        color: #54d7b4;
    }
    .textPlain {
        color: #8b8b8b;
    }
    /**/
    .addOrMine {
        display: inline-block;
        height: 30px;
        width: 30px;
        text-align: center;
        vertical-align: top;
        line-height: 30px;
        border: 1px solid #aaa;
        border-radius: 3px;
    }
    .addClassDialog .el-dialog__body {
        height: 500px;
        overflow: auto;
    }
    .addClassDialog .el-form > .el-row {
        margin: 13px 0;
    }
    .addClassDialog .el-dialog__body {
        padding-top: 15px;
    }

    .addClassDialog .el-dialog__header {
        border-bottom: 1px solid #ddd;
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
    .addStardardDialog .el-row {
        margin: 16px 0;
    }
    .longSelect >>> .el-input__inner {
        width: 600px !important;
    }
    .addStardardDialog textarea {
        outline: none;
        height: 70px;
        border-radius: 5px;
        width: 600px;
    }
    .addOrMine {
        display: inline-block;
        height: 30px;
        width: 30px;
        text-align: center;
        vertical-align: top;
        line-height: 30px;
        border: 1px solid #aaa;
        border-radius: 3px;
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

    .erke-bottom >>> .el-tabs__header {
        background-color: #fff;
        width: 220px;
        border-radius: 5px;
        border: 1px solid #ddd;
        height: calc(100vh - 140px);
        margin-right: 10px;
        padding: 15px;
    }
    .erke-bottom >>> .el-tabs__content {
        padding: 15px !important;
        background-color: #fff;
        overflow: auto;
        border-radius: 5px;
        border: 1px solid #ddd;
        height: calc(100vh - 140px);
    }
    .erke-bottom >>> .el-tabs__item {
        text-align: left;

        border-bottom: 1px dashed #ddd;
    }
    .erke-bottom,
    .erke-bottom >>> .el-tabs__nav-scroll {
        overflow: visible !important;
    }
    .erke-bottom >>> .el-tabs__nav-wrap {
        position: relative;
        overflow: visible !important;
    }
    .erke-bottom >>> .el-tabs__nav-wrap::after {
        content: '';
        width: 0;
    }
    .erke-bottom >>> .el-tabs__active-bar {
        display: none;
    }
    .erke-bottom >>> .el-tabs__content {
        padding: 0 10px 10px 10px;
    }
    .erke-bottom >>> .el-input__inner {
        /* width: 300px; */
    }
</style>
