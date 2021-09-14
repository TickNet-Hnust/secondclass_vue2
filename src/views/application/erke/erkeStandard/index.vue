<!--
 * @Descripttion: 积分标准
 * @Author: 林舒恒
 * @Date: 2021-06-03 14:51:27
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-09-14 11:32:32
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

                <div class="erke-bottom standard">
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
                                        v-model="queryList.name"
                                    >
                                    </el-input>
                                </el-col>
                                <!-- <el-col :span="1.5">
                                    <el-select
                                        v-model="queryList.type"
                                        placeholder="类型：不限"
                                    >
                                        <el-option
                                            label="类型：不限"
                                            value=""
                                        ></el-option>
                                        <el-option
                                            v-for="item in dict_sc_course_classification_type"
                                            :key="item.dictValue"
                                            :label="item.dictLabel"
                                            :value="item.dictValue"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="1.5">
                                    <el-select
                                        v-model="queryList.integralType"
                                        placeholder="积分类别：不限"
                                    >
                                        <el-option
                                            label="积分类别：不限"
                                            value=""
                                        ></el-option>
                                        <el-option
                                            v-for="item in dict_sc_integral_type"
                                            :key="item.dictValue"
                                            :label="item.dictLabel"
                                            :value="item.dictValue"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-col> -->
                            </el-row>
                        </div>
                        <el-tab-pane label="全部" name="" :key="0">
                            <div class="erke-buttom-right">
                                <el-table
                                    :data="
                                        datadata.flatMap(item => item.children)
                                    "
                                    row-key="id"
                                    v-loading="loading"
                                    :tree-props="{
                                        children: 'children',
                                        hasChildren: 'hasChildren'
                                    }"
                                    :row-class-name="heightLight"
                                >
                                    <el-table-column type="index">
                                    </el-table-column>

                                        
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
                                            width="180"
                                        >
                                            <template slot-scope="scope">
                                                <el-button
                                                    size="mini"
                                                    type="text"
                                                    icon="el-icon-edit"
                                                    @click="
                                                        updateData(
                                                            scope.row,
                                                            scope.$index
                                                        )
                                                    "
                                                    >修改</el-button
                                                >
                                                <el-button
                                                    size="mini"
                                                    type="text"
                                                    icon="el-icon-key"
                                                    @click="sortData(scope.row)"
                                                    >排序</el-button
                                                >
                                                <el-button
                                                    size="mini"
                                                    type="text"
                                                    icon="el-icon-delete"
                                                    @click="
                                                        deleteCourseClassificaiton(
                                                            scope.row
                                                        )
                                                    "
                                                    >删除</el-button
                                                >
                                            </template>
                                        </el-table-column>
                                    </el-table>
                            </div>
                        </el-tab-pane>
                        <!-- 表单下面 -->
                        <template v-for="(item, index) in datadata">
                            <!-- default-expand-all -->

                            <el-tab-pane
                                :label="item.name"
                                :key="index + 1"
                                :name="index + 1 + ''"
                            >
                                <div class="erke-buttom-right">
                                    <el-table
                                        :data="item.children"
                                        row-key="id"
                                        v-loading="loading"
                                        default-expand-all
                                        :tree-props="{
                                            children: 'children',
                                            hasChildren: 'hasChildren'
                                        }"
                                        :row-class-name="heightLight"
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
                                            width="180"
                                        >
                                            <template slot-scope="scope">
                                                <el-button
                                                    size="mini"
                                                    type="text"
                                                    icon="el-icon-edit"
                                                    @click="
                                                        updateData(
                                                            scope.row,
                                                            scope.$index
                                                        )
                                                    "
                                                    >修改</el-button
                                                >
                                                <el-button
                                                    size="mini"
                                                    type="text"
                                                    icon="el-icon-key"
                                                    @click="sortData(scope.row)"
                                                    >排序</el-button
                                                >
                                                <el-button
                                                    size="mini"
                                                    type="text"
                                                    icon="el-icon-delete"
                                                    @click="
                                                        deleteCourseClassificaiton(
                                                            scope.row
                                                        )
                                                    "
                                                    >删除</el-button
                                                >
                                            </template>
                                        </el-table-column>
                                    </el-table>
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
                <el-table :data="datadata" stripe>
                    <!-- :default-sort="{ prop: 'sort' }" -->
                    <el-table-column
                        lable="sdf"
                        width="40"
                        :render-header="renderHeader"
                    >
                        <template slot-scope="scope">
                            <span
                                @click="
                                    deleteManagerDialog(scope.row, scope.$index)
                                "
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
                        label="分类名称"
                        min-width="250"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.name"> </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="ID" align="center">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="id"
                        label="启用"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <input
                                type="checkbox"
                                name="isNow"
                                :value="scope.row.id"
                            />
                        </template>
                    </el-table-column> -->
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="updateClassification"
                    >确 定</el-button
                >
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
                        :value="
                            postCourseClassification.path
                                .split(',')
                                .map(item => +item)
                        "
                        @change="handleNodeChange"
                    ></el-cascader>
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
                            :key="item.dictvalue"
                            :value="item.dictValue"
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
                            v-model="postCourseClassification.integralType"
                            :label="0"
                            @change="handleIntegralType"
                            >无</el-radio
                        >
                    </el-row>
                    <el-row>
                        <el-radio
                            :disabled="computeType"
                            v-model="postCourseClassification.integralType"
                            :label="1"
                            @change="handleIntegralType"
                            >定值</el-radio
                        >
                        <el-input
                            v-model="addStardardDialog.fixed"
                            :disabled="computeFixed"
                            @change="handleFixed"
                        ></el-input>
                    </el-row>
                    <el-row>
                        <el-radio
                            :disabled="computeType"
                            v-model="postCourseClassification.integralType"
                            :label="2"
                            @change="handleIntegralType"
                            >范围</el-radio
                        >
                        <el-input
                            v-model="addStardardDialog.start"
                            :disabled="computeRange"
                            @change="handleRange"
                        ></el-input>
                        至
                        <el-input
                            v-model="addStardardDialog.end"
                            :disabled="computeRange"
                            @change="handleRange"
                        ></el-input>
                    </el-row>
                    <el-row>
                        <el-radio
                            :disabled="computeType"
                            v-model="postCourseClassification.integralType"
                            :label="3"
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

        <el-dialog
            :title="sortDialog.title"
            :visible.sync="sortDialog.open"
            width="635px"
            append-to-body
            class="sortDialog"
        >
            <el-table :data="sortDialog.config" stripe>
                <el-table-column label="排序" width="80">
                    <template slot-scope="scope">
                        <el-input
                            v-model="scope.row.sort"
                            class="sortInput"
                        ></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="项目名称" prop="name">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="updateSort">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        courseClassificationMulti,
        courseClassificationList,
        courseClassificationUpdateTime,
    } from '@/api/application/secondClass/index'
    import {
        filterCourseClassificationList,
        filterNameAndType,
        format
    } from '@/utils/gather'

    import removeChild from '@/utils/removeChild.js'
    import { getDict } from '@/api/application/secondClass/dict/type.js'

    import { importTemplate } from '@/api/system/user'
    import { getToken } from '@/utils/auth'

    export default {
        name: 'standard',
        data() {
            return {
                loading: false,
                postCourseClassification: {
                    // id:
                    integralType: 0,
                    integrationRange: null,
                    layer: 1,
                    name: '',
                    pid: 1,
                    remark: '',
                    sort: 0,
                    type: '0',
                    path: ''
                },
                queryList: {
                    name: '',
                    type: '',
                    integralType: ''
                },
                deleteIds: [],
                /* 弹窗 -> 类型  */
                label: '',
                /* tab栏 */
                datadata: [],
                activeName: 0,
                dict_sc_integral_type: {},
                dict_sc_course_classification_type: {},
                sortDialog: {
                    title: '',
                    open: false,
                    config: []
                },
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
                    fixed: '',
                    start: '',
                    end: ''
                },
                managerDialog: {
                    title: '',
                    open: false,
                    radio: '1',
                    config: []
                },
                //模糊查询
                value: '1',
                options: [
                    {
                        value: '1',
                        label: '全部'
                    }
                ],
                // 导出遮罩层
                exportLoading: false,
                // 表单参数
                form: {},
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
                // 表单校验
                rules: {}
            }
        },
        computed: {
            filterData() {
                return data => {
                    if (!data) {
                        return []
                    }
                    let temp = filterNameAndType(
                        JSON.parse(
                            JSON.stringify(data, (key, val) => {
                                if (key != '__parent__') return val
                            })
                        ),
                        this.queryList.name
                    )
                    // return temp
                    return filterNameAndType(
                        this.clone(data),
                        this.queryList.name
                    )
                }
            },

            /* 还需要优化选择时候的UI界面 */
            computeType() {
                return this.postCourseClassification.type == 0
            },
            computeFixed() {
                return this.postCourseClassification.integralType != 1
            },
            computeRange() {
                return this.postCourseClassification.integralType != 2
            }
        },
        methods: {
            clone(o) {
                let temp = Array.from(o)
                Object.values(temp).forEach(item => {
                    console.log(item.name)
                    if (typeof item == 'object') {
                        this.clone(item)
                    }
                })
                return temp
            },
            /**
             * @description: 行背景颜色
             */

            heightLight({ row }) {
                if (row.children) {
                    return 'red'
                }
            },
            /**
             * @description: 删除积分分类
             * @param {*} row 对应积分分类
             */
            deleteCourseClassificaiton(row) {
                this.alertDialog.call(this, '删除', {
                    confirm: () => {
                        courseClassificationMulti({
                            deleteIds: [row.id],
                            courseClassificationEntityList: []
                        })
                            .then(value => {
                                console.log(value)
                                this.$message.success('删除成功')
                                // removeChild(this.datadata,row.path,row.id)
                                this.getCourseClassificationList()
                            })
                            .catch(err => {
                                this.$message.error('删除失败')
                            })
                    }
                })
            },
            /**
             * @description: 积分分类是否是 定值
             */

            handleFixed() {
                this.postCourseClassification.integrationRange = this.addStardardDialog.fixed
            },
            /**
             * @description: 积分分类是否是 范围
             */

            handleRange() {
                this.postCourseClassification.integrationRange =
                    this.addStardardDialog.start +
                    ':' +
                    this.addStardardDialog.end
            },
            /**
             * @description: 积分分类改变时触发
             * @param
             */

            handleIntegralType(value) {
                if ([0, 1, 3].includes(value)) {
                    this.addStardardDialog.start = ''
                    this.addStardardDialog.end = ''
                }
                if ([0, 2, 3].includes(value)) {
                    this.addStardardDialog.fixed = ''
                }
                if ([0, 3].includes(value)) {
                    this.postCourseClassification.integrationRange = 0
                }
                // this.postCourseClassification.integralType = value + 1
                // console.log(this.postCourseClassification.integralType)
            },
            /**
             * @description: 选择上级节点触发的事件
             * @param value 父节点数组，例如：[1,2,4]
             */

            handleNodeChange(value) {
                this.postCourseClassification.path = value.join(',')
                this.postCourseClassification.pid = value[value.length - 1]
                this.postCourseClassification.layer = value.length
                console.log(value)
            },
            /* 新增积分类别 */
            addCourseClassification() {
                console.log(this.postCourseClassification)
                courseClassificationMulti({
                    courseClassificationEntityList: [
                        this.postCourseClassification
                    ]
                }).then(value => {
                    console.log(value, 777)
                    this.addStardardDialog.open = false
                    this.$message.success('添加成功')
                    this.getCourseClassificationList()
                })
                ;(this.postCourseClassification = {
                    // id:
                    integralType: 0,
                    integrationRange: null,
                    layer: 1,
                    name: '',
                    pid: 1,
                    remark: '',
                    sort: 0,
                    type: '0',
                    path: ''
                }),
                    console.log()
            },
            formatIntegralType(row, column, cellValue) {
                if (cellValue != null) {
                    return this.dict_sc_integral_type[cellValue]?.dictLabel
                }
                return cellValue
            },
            formatType(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_course_classification_type[cellValue]?.dictLabel
                )
            },
            formatUpdateTime(row, column, cellValue) {
                return cellValue != null && format(cellValue)
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
            /**
             * @description: 类别配置 +
             */

            addManagerDialog() {
                console.log(this.datadata, 777)
                this.datadata.push({
                    id: null,
                    pid: 0,
                    sort: '',
                    name: ''
                })
                // this.$nextTick(() => {
                //     let tableBody = document.querySelector(
                //         '.managerDialog .el-table__body-wrapper'
                //     )
                //     tableBody.scrollTop = 9999
                // })
            },
            /**
             * @description: 类别配置 -
             */

            deleteManagerDialog(row, index) {
                this.alertDialog.call(this, '预删除', {
                    confirm: () => {
                        this.deleteIds.push(row.id)
                        this.datadata.splice(index, 1)
                    }
                })
            },
            handleSetting() {
                this.managerDialog.open = true
                this.managerDialog.title = '类别配置'
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

            // 取消按钮
            cancel() {
                this.managerDialog.open = false
                this.addStardardDialog.open = false
                this.exportDialog.topen = false
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
            /** 新增按钮操作 */
            handleAdd() {
                this.clearForm()
                this.addStardardDialog.open = true
            },
            /** 提交按钮 */
            submitForm: function() {},
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
            /**
             * @description: 清空新增表单
             */

            clearForm() {
                this.addStardardDialog.fixed = this.addStardardDialog.start = this.addStardardDialog.end =
                    ''
                this.postCourseClassification = {
                    // id:
                    integralType: 0,
                    integrationRange: null,
                    layer: 1,
                    name: '',
                    pid: 1,
                    remark: '',
                    sort: 0,
                    type: '0',
                    path: ''
                }
            },
            /** 确定修改排序 */
            updateSort() {
                courseClassificationMulti({
                    courseClassificationEntityList: this.sortDialog.config
                })
                    .then(value => {
                        console.log(value)
                        return this.getCourseClassificationList()
                    })
                    .then(value => {
                        this.msgSuccess('修改成功')
                        this.sortDialog.open = false
                    })
            },
            /**
             * @description: 配置根级分类
             */

            updateClassification() {
                let isFull = this.datadata.every(item => {
                    console.log(item.sort, item.name)
                    return item.sort != undefined && item.name
                })
                if (!isFull) {
                    this.msgInfo('请填写完整信息')
                    return
                }
                // this.datadata.forEach(item => {
                //     // console.log(item, 11)
                //     item.hasOwnProperty('children') &&
                //         delete item.children &&
                //         this.$delete(item, item.children)
                //     item.hasOwnProperty('__parent__') &&
                //         delete item.__parent__ &&
                //         this.$delete(item, item.__parent__)
                // })
                console.log(this.datadata, 123)
                courseClassificationMulti({
                    deleteIds: this.deleteIds,
                    courseClassificationEntityList: this.datadata
                })
                    .then(value => {
                        console.log(value)
                        return this.getCourseClassificationList()
                    })
                    .then(value => {
                        this.msgSuccess('修改成功')
                        this.managerDialog.open = false
                    })
            },
            /**
             * @description:  表格 操作 排序
             */

            sortData(row) {
                console.log(row)
                this.sortDialog.title = '同级排序'
                this.sortDialog.open = true
                this.sortDialog.config = row.__parent__.children
            },
            /**
             * @description:  表格 操作 修改触发
             * @param row 某行数据
             * @param index 某行下标
             */
            async updateData(row, index) {
                console.log(row, index, 'updata')
                this.addStardardDialog.open = true
                this.clearForm()
                this.postCourseClassification = {
                    id: row.id,
                    integralType: row.integralType,
                    layer: row.layer,
                    name: row.name,
                    pid: row.pid,
                    remark: row.remark,
                    path: row.path,
                    sort: row.sort,
                    type: row.type + '' //需是字符串
                }
                if (row.integralType == 1) {
                    this.addStardardDialog.fixed = row.integrationRange
                }
                if (row.integralType == 2) {
                    this.addStardardDialog.start = row.integrationRange.split(
                        ':'
                    )[0]
                    this.addStardardDialog.end = row.integrationRange.split(
                        ':'
                    )[1]
                }
            },
            /**
             * @description: 根据参数查询二课课程分类列表
             * @param name 积分标准分类名称
             * @param type 类型
             * @param integralType 积分类别
             */

            getCourseClassificationList() {
                this.loading = true
                let courseUpdateTime = localStorage.getItem('courseUpdateTime')
                courseClassificationUpdateTime().then(value=>{
                    if(value.data===courseUpdateTime)
                    {
                        console.log('使用了local的缓存');
                        let courseList = JSON.parse(localStorage.getItem('courseList'))
                         courseList = courseList.map(item => ({
                        ...item,
                        value: item.id,
                        label: item.name
                        }))
                        console.log(courseList, '过滤之前的courseClassificationList')
                        //挂载算法
                        this.datadata = filterCourseClassificationList(courseList)
                        console.log(this.datadata, '过滤之后的datadata')
                        this.loading = false
                    }
                    else{
                        localStorage.setItem('courseUpdateTime',value.data)
                        courseClassificationList().then(value => {
                        console.log('重新请求了数据并且更新');
                        //更新local里面的courseList
                        localStorage.setItem('courseList',JSON.stringify(value.data))
                        value.data = value.data.map(item => ({
                            ...item,
                            value: item.id,
                            label: item.name
                        }))
                        console.log(value, '过滤之前的courseClassificationList')
                        //挂载算法
                        this.datadata = filterCourseClassificationList(value.data)
                        console.log(this.datadata, '过滤之后的datadata')
                        this.loading = false
                        })
                    }
                })
                
            },
            /**
             * @description:  初始化字典
             */
            initDict() {
                Promise.all([
                    getDict('sc_course_classification_type'),
                    getDict('sc_integral_type')
                ]).then(value => {
                    let temp = [
                        'dict_sc_course_classification_type',
                        'dict_sc_integral_type'
                    ]
                    temp.forEach((item, index) => {
                        this[item] = value[index].data
                        console.log(item, value[index])
                    })
                    this.label = this.dict_sc_course_classification_type[0]?.dictLabel
                })
            }
        },
        created() {
            //字典初始化
            this.initDict()
            //数据初始化
            this.getCourseClassificationList()
        },
        mounted() {}
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
        margin-top: 15px;
        position: absolute;
        left: 17px;
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
        width: 50px !important;
    }
    .managerDialog >>> .el-dialog__body {
        height: 350px;
    }

    .managerDialog >>> .el-table__row td {
        padding: 5px 0;
    }
    .sortDialog >>> .el-table__row td {
        padding: 5px 0;
    }
    .sortDialog >>> .el-dialog__body {
        height: 350px;
        overflow-y: auto;
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
    .standard >>> .el-tabs__nav {
        top: 45px;
    }
    .managerDialog >>> .el-table__body-wrapper {
        overflow-y: auto;
        height: 250px;
    }

    .el-table >>> .red {
        background-color: #f9fafa;
    }
    .el-table >>> .green {
        background-color: green;
    }
    .el-table >>> .blue {
        background-color: blue;
    }
</style>
