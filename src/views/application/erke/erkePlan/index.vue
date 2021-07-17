<!--
 * @Descripttion: 培养方案
 * @Author: 林舒恒
 * @Date: 2021-06-03 13:04:02
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-07-17 19:04:49
-->
<template>
    <div class="app-container">
        <div class="erke-top">
            <div class="erke-top-head">
                <span> <i>✈</i> 培养方案</span>
            </div>
            <div class="erke-top-foot">
                学年度：<el-select
                    v-model="list.value"
                    placeholder="请选择"
                    @change="schoolYearChange"
                >
                    <el-option :key="-1" label="全部" :value="-1"> </el-option>
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
                        @click="handleExport"
                        v-hasPermi="['system:user:export']"
                        >导出</el-button
                    >
                </el-col>
                <el-col :span="1.5">
                    <el-input
                        size="mini"
                        suffix-icon="el-icon-search"
                        v-model="FuzzyInput"
                        @input="findFuzzyName"
                    ></el-input>
                </el-col>

                <!-- <right-toolbar
                        :showSearch.sync="showSearch"
                        @queryTable="getList"
                        :columns="columns"
                    ></right-toolbar> -->
            </el-row>

            <!-- table start here -->
            <el-table
                :data="planData"
                stripe
                v-loading="loading"
                class="erkePlanMainTable"
            >
                <el-table-column prop="id" label="批次ID" width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="培养方案"
                    min-width="180"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column prop="schoolYearId" label="学年ID" width="80">
                </el-table-column>
                <el-table-column
                    prop="schoolYearId"
                    label="学年"
                    min-width="120"
                    :formatter="formatSchoolYearName"
                >
                </el-table-column>
                <el-table-column
                    prop="rank"
                    label="级别"
                    :formatter="formatRank"
                >
                </el-table-column>
                <el-table-column prop="courseCount" label="课程数">
                </el-table-column>
                <el-table-column prop="applyingCount" label="申请中">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    :formatter="formatStatus"
                >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    min-width="120"
                    :formatter="formatUpdateTime"
                >
                </el-table-column>
                <el-table-column prop="createBy" label="创建人">
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="修改时间"
                    min-width="120"
                    :formatter="formatUpdateTime"
                >
                </el-table-column>
                <el-table-column prop="updateBy" label="修改人">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    width="150"
                    prop="oprator"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-link type="primary" @click="updateTrainingProgram(scope.row,scope.$index)">修改</el-link>
                        <router-link
                            type="info"
                            :to="
                                '/application/erke/detail/' +
                                    scope.row.schoolYearId +
                                    '/' +
                                    scope.row.id
                            "
                            >详情</router-link
                        >
                        <el-link
                            type="info"
                            @click="deletePlan(scope.row, scope.$index)"
                            >删除</el-link
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

        <!-- this is manage button -->
        <el-dialog
            :title="managerDialog.title"
            :visible.sync="managerDialog.open"
            width="635px"
            append-to-body
            class="managerDialog"
        >
            <el-form ref="managerDialog" label-width="80px" height="250">
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
                    <el-table-column 
                        prop="sort" 
                        label="排序" 
                        width="80"
                        sortable
                    >
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
                    <!-- <el-table-column
                        prop="learnYearNo"
                        label="当前学年"
                        align="center"
                    >
                        <template slot-scope="scope">
                            
                            <input
                                type="radio"
                                name="isNow"
                                :value="scope.$index"
                                v-model="managerDialog.radio"
                                @change="tt"
                            />
                        </template>
                    </el-table-column> -->
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
                                <el-option value="2021-2022学年"></el-option>
                                <el-option value="2021-2022学年"></el-option>
                                <el-option value="2021-2022学年"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="lh30">
                        <el-col :span="5"> 被导入年度： </el-col>
                        <el-col :span="15">
                            <el-select>
                                <el-option value="2021-2022学年"></el-option>
                                <el-option value="2021-2022学年"></el-option>
                                <el-option value="2021-2022学年"></el-option>
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
        
        <!-- this is addButton -->
        <el-dialog
            :title="addPlanDialog.title"
            :visible.sync="addPlanDialog.open"
            width="635px"
            append-to-body
            class="addPlanDialog"
        >
            <el-form ref="addPlanDialog" label-width="80px">
                
                <el-table 
                    :data="preAddplanData" 
                    height="350" 
                    stripe
                >
                    <template v-slot:empty>
                        暂无新增数据，点击左上角 + 号新增
                    </template>
                    <el-table-column
                        lable="sdf"
                        width="40"
                        :render-header="renderHeader"
                    >
                        <template slot-scope="scope">
                            <span
                                @click="
                                    deletePlanDialog(scope.row, scope.$index)
                                "
                                class="addOrMinus"
                                >-</span
                            >
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="sort" label="排序" width="80">
                        <template slot-scope="scope">
                            <el-input
                                class="sortInput"
                                v-model="scope.row.sort"
                            ></el-input>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        prop="name"
                        label="培养方案名称"
                        min-width="250"
                    >
                        <template slot-scope="scope">
                            <el-input
                                :value="scope.row.name"
                                @input="nameChanged(scope.row, $event)"
                                class="nameOfPlan"
                            >
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="级别"
                        align="center"
                        width="120"
                        :formatter="formatRank"
                    >
                        <template slot-scope="scope">
                            <el-select
                                :value="rankSelect(scope.row.rank)"
                                @change="rankChanged(scope.row, $event)"
                            >
                                <el-option
                                    v-for="item in dict_sc_train_program_rank"
                                    :key="item.id"
                                    :value="item.dictValue"
                                    :label="item.dictLabel"
                                >
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="启用" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                :value="!!scope.row.status"
                                @change="statusChanged(scope.row, $event)"
                            >
                            </el-switch>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">关闭</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- this is updateButton -->
        <el-dialog
            :title="updatePlanDialog.title"
            :visible.sync="updatePlanDialog.open"
            width="635px"
            append-to-body
            class="updatePlanDialog"
        >
            <el-form ref="updatePlanDialog" label-width="120px" label-position="left">
                <el-form-item label="批次ID：">
                    {{updatePlanDialog.config.id}}
                </el-form-item>
                <el-form-item label="学年：">
                    {{this.schoolYearIdMapName[updatePlanDialog.config.schoolYearId]}}
                </el-form-item>
                <el-form-item label="培养方案名称：">
                    <el-input v-model="updatePlanDialog.config.name"></el-input>
                </el-form-item>
                <el-form-item label="级别：">
                    <el-select 
                        v-model="updatePlanDialog.config.rank"
                        >
                        <el-option
                            v-for="(item,index) in dict_sc_train_program_rank"
                            :key="index"
                            :value="+item.dictValue"
                            :label="item.dictLabel"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="启用：">
                    <el-switch 
                        :value="Boolean(updatePlanDialog.config.status)"
                        @change="updatePlanDialog.config.status = Number($event)"
                    ></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelUpdate">关闭</el-button>
                <el-button type="primary" @click="submitUpdateForm">确 定</el-button>
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
    // import alertDialog from '@/utils/alertDialog.js'
    import { getDict } from '@/api/application/secondClass/dict/type.js'
    import horwheel from 'horwheel'

    import { getToken } from '@/utils/auth'

    export default {
        name: 'erkePlan',
        data() {
            return {
                //用于模糊查询
                FuzzyInput: '',
                //表格加载的loading
                loading: false,
                //学年id =>学年名称
                schoolYearIdMapName: [],
                //记录的分页状态
                t: {},
                /* 培养方案级别字典 */
                dict_sc_train_program_rank: {},
                /* 培养方案状态字典 */
                dict_sc_train_program_status: {},
                /* 某一学年度的列表，value为-1时为全部学年 */
                list: {
                    value: 7,
                    rows: []
                },
                //新增弹窗里面的数据
                addPlanDialog: {
                    title: '新增培养方案',
                    open: false,
                    config: [
                        {
                            sort: 1,
                            nameOfPlan: '湖南科技大学',
                            level: '校级',
                            isUse: true
                        }
                    ]
                },
                //预增加的数据
                preAddplanData: [],
                //导入弹窗里面的数据
                importDialog: {
                    title: '导入方案',
                    open: false,
                    config: [
                        {
                            isChoose: true,
                            nameOfPlan: '湖南科技大学',
                            level: '校级',
                            classNumber: 84
                        }
                    ]
                },                
                updatePlanDialog:{
                    open: false,
                    title: '编辑',
                    index: '',
                    config: {
                        id: 0,
                        schoolYearId: 0,
                        name: '',
                        rank: 0,
                        status: 0,
                    }
                },
                //导出弹窗里面的数据
                exportDialog: {
                    title: '',
                    open: false
                },
                //导出弹窗里面的多选按钮组
                checkboxGroup: [],
                //导出弹窗里面的树形数据
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

                //管理弹窗里面的数据
                managerDialog: {
                    title: '',
                    open: false,
                    radio: '0', //当前学年 在学年列表里的下标
                    config: [
                        {
                            sort: '1',
                            nameOflearn: '2018-2019学年',
                            idOfLearnYear: '1',
                            learnYearNo: '1'
                        }
                    ]
                },
                //删除列表
                deleteIds: [],
                //新增列表
                newAddList: [],
                //修改列表
                updateList: [],
                //培养方案表格数据
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
                    //总共多少页,需要计算得出
                    totalPage: 0,
                    //总共多少条
                    totalCount: 0,
                    //第几页
                    pageNum: 1,
                    // 一页多少条
                    pageSize: 10
                }
            }
        },
        computed: {
            //新增时的级别下拉框
            rankSelect() {
                return index => {
                    if (index == null) return null
                    return this.dict_sc_train_program_rank[index].dictLabel
                }
            }
        },
        methods: {
            nameChanged(row, value) {
                !this.updateList.includes(row) && this.updateList.push(row)
                row.name = value
            },
            rankChanged(row, value) {
                !this.updateList.includes(row) && this.updateList.push(row)
                row.rank = value
            },
            statusChanged(row, value) {
                !this.updateList.includes(row) && this.updateList.push(row)
                row.status = Number(value)
            },
            tt(q) {
                console.log(this.managerDialog.radio)
            },
            async deletePlan(row, index) {
                console.log(row, index)
                this.alertDialog.call(this, '删除', {
                    confirm: async () => {
                        await trainingProgramMulti({
                            deleteIds: [row.id]
                        })
                            .then(value => {
                                this.planData.splice(index, 1)
                                this.$forceUpdate()
                                this.msgSuccess('删除成功')
                            })
                            .catch(err => {
                                this.msgError('删除失败')
                            })
                    }
                })
            },
            /**
             * @description:  学年改变触发，重新渲染表格数据
             * @param {*} value 学年id， -1为全部学年
             */            
            async schoolYearChange(value) {
                console.log(value)
            
                let option = {
                    pageNum: 1,
                    pageSize: 10,
                }
                value != -1 && (option.schoolYearId = value)

                this.queryParams.pageNum = 1
                this.queryParams.pageSize = 10
                await this.getTrainingProgramList(option)

            },
            /**
             * @description: 表格 学年 id转化name
             * @param {*} cellValue 要转换的数据
             */            
            formatSchoolYearName(row, column, cellValue) {
                return cellValue != null && this.schoolYearIdMapName[cellValue]
            },
            /**
             * @description: 表格 日期 格式化
             * @param {*} cellValue 要转换的数据
             */
            formatUpdateTime(row, column, cellValue) {
                return cellValue != null && formatDate(cellValue)
            },
            /**
             * @description: 表格 状态 字典转化
             * @param {*} cellValue 要转换的数据
             */            
            formatStatus(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_train_program_status[cellValue].dictLabel
                )
            },
            /** 
             * @description: 表格 级别 字典转化
             * @param {*} cellValue 要转换的数据
             */            
            formatRank(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_train_program_rank[cellValue].dictLabel
                )
            },
            /**
             * @description: 新增 表头 渲染+
             * @param {*} h 
             */            
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
            /**
             * @description: 管理 表头 渲染+
             * @param {*} h
             */            
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
                this.list.row.push({
                    creteTime: null,
                    delateTime: null
                })
            },
            async addtrainingProgram() {
                let data = {
                    schoolYearId: this.list.value,
                    name: '',
                    rank: null,
                    status: 0
                }
                this.preAddplanData.push(data)
                // this.newAddList.push(data) //先存在提交数据里面
                // this.planData.push(data) //为了展示视图，也添加
                this.$nextTick(() => {
                    let tableBody = document.querySelector(
                        '.addPlanDialog .el-table__body-wrapper'
                    )
                    tableBody.scrollTop = 9999
                })
            },
            async deleteManagerDialog() {
                // this.alertDialog.call(this,'删除',{
                //     confirm: ()=> {
                //         trainingProgramMulti
                //         this.msgSuccess('删除成功')
                //     }
                // })
            },
            /**
             * @description: 只有预添加的数据才能删除
             * @param {*} row 
             * @param {*} index
             */            
            async deletePlanDialog(row, index) {
                this.preAddplanData.splice(index,1) ;return 
                //删除预添加的数据，需要同时在欲添加/实际两个数组中删除
                if (row.id == undefined) {
                    this.newAddList.splice(
                        this.newAddList.length -
                            (this.planData.length - index - 1) -
                            1,
                        1
                    )
                    this.planData.splice(index, 1)
                }
                // console.log(row.id,555)
                // this.alertDialog.call(this,'删除',{
                //     confirm: ()=> {
                //         trainingProgramMulti
                //         this.msgSuccess('删除成功')
                //     }
                // })
            },
            /** 操作分页触发的事件 */
            async getList(option) {
                console.log(option)
                let temp = {
                    pageNum: option.page,
                    pageSize: option.limit,
                }
                this.list.value != -1 && (temp.schoolYearId = this.list.value)

                // this.queryParams.pageNum = 1
                // this.queryParams.pageSize = 10
                await this.getTrainingProgramList(temp)
            },
            /**
             * @description: 打开修改的弹窗
             */            
            updateTrainingProgram(row,index) {
                console.log(row)
                this.updatePlanDialog.open = true
                this.updatePlanDialog.index = index
                this.updatePlanDialog.config = {
                    id: row.id,
                    schoolYearId: row.schoolYearId,
                    name: row.name,
                    rank: row.rank,
                    status: row.status
                }
            },
            /** 筛选节点 */ 
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            // 节点单击事件
            handleNodeClick(data) {
                this.queryParams.deptId = data.id
                this.getList()
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
            /** 新增按钮操作 */
            handleManager() {
                this.reset()
                // this.getTreeselect()

                // this.postOptions = response.posts
                // this.roleOptions = response.roles
                this.managerDialog.open = true
                this.managerDialog.title = '学年配置'
            },
            /** 关闭添加按钮 */
            cancelAdd() {
                this.addPlanDialog.open = false
                this.preAddplanData = []
                // this.planData.splice(
                //     this.planData.length - this.newAddList.length
                // )
                // this.newAddList = []
                // this.updateList = []
                this.$forceUpdate()
            },
            /** 关闭修改按钮 */
            cancelUpdate() {
                this.updatePlanDialog.open = false
            },
            /** 新增培养方案 */          
            async submitForm() {
                console.log(this.newAddList)
                let msgFull = this.preAddplanData.every(item => {
                    if (item.name == '' || item.rank == null) return false
                    return true
                })
                if (!msgFull) {
                    this.msgInfo('请填入完整信息')
                    return
                }
                //等待后端优化，批量添加
                this.preAddplanData.forEach(async item => {
                    await trainingProgram(item).then(value => {
                        this.msgSuccess('添加成功')
                    })
                })
                // this.updateList
                // 这里等待后端修改
                // await trainingProgramMulti({
                //     schoolYearList: this.updateList
                // }).then(value => {
                //     this.msgSuccess('修改成功')
                // })
                this.cancelAdd()

                // console.log(this.managerDialog.radio,445)
                // let temp = this.planData
                // delete temp[temp.length - 1].isUse
                // console.log(temp[temp.length - 1])
                // trainingProgram(temp[temp.length - 1]).then(value => {
                //     console.log(value, 'trainingProgram')
                //     this.addPlanDialog.open = false
                //     this.$message.success('添加成功')
                //     this.schoolYearChange(this.list.value)
                // })
            },
            async submitUpdateForm() {
                await trainingProgramMulti({
                    trainingProgramList: [this.updatePlanDialog.config]
                }).then(value => {
                    Object.assign(this.planData[this.updatePlanDialog.index],this.updatePlanDialog.config)
                    this.msgSuccess('修改成功')
                    console.log(this.updatePlanDialog.config)
                    this.$forceUpdate()
                    this.cancelUpdate()
                })
            },
            /**
             * @description:  模糊查询培养方案名字
             */            
            async findFuzzyName() {
                let option = {
                    name: this.FuzzyInput,
                    pageNum:1,
                    pageSize: 10
                }
                this.list.value != -1 && (option.schoolYearId = this.list.value)
                await this.getTrainingProgramList(option)
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
                this.exportDialog.title = '导出数据'
                this.exportDialog.open = true
            },
            /** 导入按钮操作 */
            handleImport() {
                this.importDialog.title = '导入方案'
                this.importDialog.open = true
            },

            /** 获取学年列表 */
            async getSchoolYearList() {
                    await schoolYearList().then(value => {
                    value.rows.forEach(item => {
                        /** 这里还需要改进，否则数组到后面将会很大，影响性能 */
                        this.schoolYearIdMapName[item.id] = item.yearName
                    })
                    //默认选中学年的第一个
                    // this.managerDialog.radio = value.rows[0].id
                    console.log(value, 'schoolYearList')
                    this.list.rows = value.rows
                    this.list.value = -1
                })
            },
            /** @description 查询培养方案分页
             *  @param name 模糊查询方案名称
             *  @param schoolYearId 学年id
             *  @param pageNum 第几页
             *  @param pageSize 限制每页的条数
             */                                                    
            async getTrainingProgramList(option) {
                
                await trainingProgramList(option).then(value => {
                    this.planData = value.rows
                    this.queryParams.totalCount = value.total
                    this.queryParams.totalPage = value.total / this.queryParams.pageSize
                    console.log(value, 'trainingProgramList')
                    console.log(this.queryParams)
                })
            },
            /**
             * @description:  初始化字典
             */            
            async initDict() {
                await Promise.all([
                    getDict('sc_train_program_rank'),
                    getDict('sc_train_program_status')
                ]).then(value => {
                    let temp = [
                        'dict_sc_train_program_rank',
                        'dict_sc_train_program_status'
                    ]
                    temp.forEach((item,index) => {
                        this[item] = value[index].data
                    })
                })
            }
        },
        async created() {
            //字典初始化
            await this.initDict()

            //表格加载
            this.loading = true
            /* 调用 获取学年列表 */
            await this.getSchoolYearList()
            
            /** 这里可以对schoolYear排序，并赋值让radio为最新的年度 */

            this.queryParams.pageNum = 1
            this.queryParams.pageSize = 10
            /* 调用 查询培养方案分页 */
            await this.getTrainingProgramList({
                // schoolYearId: this.list.rows[this.managerDialog.radio].id,
                pageNum: 1,
                pageSize: 10
            })
            //表格加载完成
            this.loading = false
            
            
        },
        async mounted() {

            /** 横向滚动条 */
            let view = document.querySelector(
                '.erkePlanMainTable .el-table__body-wrapper'
            )
            console.log(view)
            view && horwheel(view)
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
    .updatePlanDialog >>> .el-dialog__body {
        border-top: 1px solid #ddd;
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
