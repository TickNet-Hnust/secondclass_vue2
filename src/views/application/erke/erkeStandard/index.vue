<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-head">
                        <span> <i>✈</i> 积分方案</span>
                    </div>
                </div>

                <div class="erke-bottom">
                    <div class="erke-buttom-left">
                        <ul>
                            <li>全部</li>
                            <li>思想政治与人文素养</li>
                            <li>学术科技与创新</li>
                            <li>社会时间与志愿公益</li>
                            <li>文化体育与艺术</li>
                            <li>社会工作与阅历</li>
                        </ul>
                    </div>
                    <div class="erke-buttom-right">
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
                        <el-table
                            :data="datadata"
                            row-key="id"
                            default-expand-all
                            :tree-props="{
                                children: 'children',
                                hasChildren: 'hasChildren'
                            }"
                        >
                            <el-table-column prop="id" label="ID">
                            </el-table-column>
                            <el-table-column
                                prop="itemName"
                                label="项目名称"
                                width="700"
                            >
                            </el-table-column>
                            <el-table-column prop="type" label="类型">
                            </el-table-column>
                            <el-table-column prop="markType" label="积分类别">
                            </el-table-column>
                            <el-table-column prop="mark" label="分值">
                            </el-table-column>
                            <el-table-column prop="modifyTime" label="修订时间">
                            </el-table-column>
                            <el-table-column
                                prop="id"
                                label="操作"
                                fixed="right"
                            >
                                <template slot-scope="scope">
                                    <el-link type="primary">修改</el-link>
                                    <el-link type="info">排序</el-link>
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
                </div>
            </el-col>
        </el-row>

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog
            :title="title"
            :visible.sync="open"
            width="915px"
            append-to-body
            class="addClassDialog"
        >
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="14">
                        <el-row>
                            <el-col :span="5">学年：</el-col>
                            <el-col :span="19">{{ yearOfLean }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10">
                        <el-row>
                            <el-col :span="6">发布单位：</el-col>
                            <el-col :span="18">
                                <el-select
                                    v-model="unitValue"
                                    class="unitValue"
                                >
                                    <el-option
                                        label="校团委"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="校团委2"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="校团委3"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="14">
                        <el-row>
                            <el-col :span="5">培养方案</el-col>
                            <el-col :span="19">{{ planOfgrain }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10">
                        <el-row>
                            <el-col :span="6">必修课程：</el-col>
                            <el-col :span="18">
                                <el-switch
                                    v-model="isRequire"
                                    active-text="是"
                                    active-value="是"
                                    inactive-text="否"
                                    class="switchStyle"
                                >
                                </el-switch>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="14">
                        <el-row>
                            <el-col :span="5">课程名称：</el-col>
                            <el-col :span="19">
                                <el-input class="className"></el-input>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10">
                        <el-row>
                            <el-col :span="6">加入方式：</el-col>
                            <el-col :span="18">
                                <el-select
                                    v-model="unitValue"
                                    class="shoutInput"
                                >
                                    <el-option
                                        label="预设"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="预设2"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="预设3"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="14">
                        <el-row>
                            <el-col :span="5">分类：</el-col>
                            <el-col :span="19">
                                <el-select
                                    v-model="sortClass"
                                    class="sortClass"
                                >
                                    <el-option
                                        label="思想政治和人文素养"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="思想政治和人文素养"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="思想政治和人文素养"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10">
                        <el-row>
                            <el-col :span="6">性质：</el-col>
                            <el-col :span="18">
                                <el-select v-model="nature" class="shoutInput">
                                    <el-option
                                        label="活动"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="活动"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="活动"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <!-- 其他信息 -->
                <el-row>
                    <el-col :span="3" style="height: 49px; line-height: 49px">
                        <i class="el-icon-share"></i> 其他信息
                    </el-col>
                    <el-col :span="21">
                        <el-divider></el-divider>
                    </el-col>
                </el-row>

                <el-row :gutter="4">
                    <el-col :span="3"> 分类明细： </el-col>
                    <el-col :span="5.5">
                        <el-select v-model="classSort" class="classSort">
                            <el-option
                                label="思想政治和人文素养"
                                value="1"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="2"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="3"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="9.5">
                        <el-select v-model="activitySort" class="activitySort">
                            <el-option
                                label="思想政治和人文素养"
                                value="1"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="2"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="3"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="rankSort" class="rankSort">
                            <el-option
                                label="思想政治和人文素养"
                                value="1"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="2"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="3"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3"> 积分标准号 </el-col>
                    <el-col :span="21">
                        {{ integral }}
                    </el-col>
                </el-row>

                <el-row style="height: 80px">
                    <el-col :span="3"> 积分下限要求： </el-col>
                    <el-col :span="21">
                        <el-row :gutter="5" style="margin-bottom: 12px">
                            <el-col :span="5.5">
                                <el-select
                                    v-model="unitValue"
                                    class="shoutInput"
                                >
                                    <el-option
                                        label="预设"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="预设2"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="预设3"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5.5">
                                <el-select
                                    v-model="unitValue"
                                    class="shoutInput"
                                >
                                    <el-option
                                        label="预设"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="预设2"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="预设3"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>

                            <el-col :span="5.5">
                                <span class="addOrMine">-</span>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :span="5.5">
                                <el-select
                                    v-model="unitValue"
                                    class="shoutInput"
                                >
                                    <el-option
                                        label="预设"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="预设2"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="预设3"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5.5">
                                <el-select
                                    v-model="unitValue"
                                    class="shoutInput"
                                >
                                    <el-option
                                        label="预设"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="预设2"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="预设3"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>

                            <el-col :span="5.5">
                                <span class="addOrMine">-</span>
                            </el-col>

                            <el-col :span="5.5">
                                <span class="addOrMine">+</span>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3"> 备注： </el-col>
                    <el-col :span="21">
                        <el-input
                            type="textarea"
                            v-model="textareaContent"
                        ></el-input>
                    </el-col>
                </el-row>
            </el-form>
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
        name: 'User',
        components: { Treeselect },
        data() {
            return {
                //first line
                yearOfLean: '2021-2022学年',
                unitValue: '1',
                //second line
                planOfgrain: '湖南科技大学',
                isRequire: true,
                //thrid
                wayValue: '1',
                //fouth
                sortClass: '1',
                nature: '1',
                //fiv
                classSort: '1',
                activitySort: '1',
                rankSort: '1',
                //
                integral: '5',
                //
                textareaContent: '',
                datadata: [
                    {
                        id: 1,
                        itemName: '参加党、团学习培训并顺利完成',
                        type: '分类',
                        markType: '',
                        modifyTime: '2021-3.02',
                        children: [
                            {
                                id: 2,
                                type: '积分项',
                                itemName: '院级',
                                markType: '定值',
                                mark: null,
                                modifyTime: '2021-3.02'
                            },
                            {
                                id: 3,
                                type: '积分项',
                                itemName: '校级',
                                markType: '定值',
                                mark: 2,
                                modifyTime: '2021-3.02'
                            },
                            {
                                id: 4,
                                type: '积分项',
                                itemName: '市级',
                                markType: '定值',
                                mark: 5,
                                modifyTime: '2021-3.02'
                            },
                            {
                                id: 5,
                                type: '积分项',
                                itemName: '省部级',
                                markType: '定值',
                                mark: 2,
                                modifyTime: '2021-3.02'
                            },
                            {
                                id: 6,
                                type: '积分项',
                                itemName: '国家级',
                                markType: '定值',
                                mark: 2,
                                modifyTime: '2021-3.02'
                            },
                            {
                                id: 7,
                                type: '积分项',
                                itemName: '在培训学习中被评为优秀可另加一分',
                                markType: '定值',
                                mark: 5,
                                modifyTime: '2021-3.02'
                            }
                        ]
                    },
                    {
                        id: 8,
                        itemName:
                            '参加思想政治与人文素养类主题教育讲座、报告、读书会等教育活动(含竞赛)',
                        type: '分类',
                        markType: '',
                        modifyTime: '2021-3.02',
                        children: [
                            {
                                id: 9,
                                type: '积分项',
                                itemName: '院级',
                                markType: '定值',
                                mark: 2,
                                modifyTime: '2021-3.02',
                                children: [
                                    {
                                        id: 10,
                                        itemName: '成功参与',
                                        markType: '定值',
                                        type: '积分项',
                                        mark: 1,
                                        modifyTime: '2021-3.02'
                                    },
                                    {
                                        id: 11,
                                        itemName: '进入复赛',
                                        markType: '定值',
                                        mark: 1.5,
                                        type: '积分项',

                                        modifyTime: '2021-3.02'
                                    },
                                    {
                                        id: 12,
                                        type: '积分项',
                                        itemName: '进入决赛',
                                        markType: '定值',
                                        mark: 2,
                                        modifyTime: '2021-3.02'
                                    }
                                ]
                            },
                            {
                                id: 13,
                                type: '积分项',
                                itemName: '校级',
                                mark: 2,
                                markType: '定值',
                                modifyTime: '2021-3.02'
                            },
                            {
                                id: 14,
                                type: '积分项',
                                mark: 5,
                                itemName: '市级',
                                markType: '定值',
                                modifyTime: '2021-3.02'
                            },
                            {
                                id: 15,
                                type: '积分项',
                                itemName: '省部级',
                                markType: '定值',
                                mark: 5,
                                modifyTime: '2021-3.02'
                            },
                            {
                                id: 16,
                                type: '积分项',
                                itemName: '国家级',
                                mark: 2,
                                markType: '定值',
                                modifyTime: '2021-3.02'
                            },
                            {
                                id: 17,
                                type: '积分项',
                                itemName: '在培训学习中被评为优秀可另加一分',
                                markType: '定值',
                                mark: 5,
                                modifyTime: '2021-3.02'
                            }
                        ]
                    }
                ],
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
                const queryParams = this.queryParams
                this.$confirm('是否确认导出所有用户数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.exportLoading = true
                        return exportUser(queryParams)
                    })
                    .then(response => {
                        this.download(response.msg)
                        this.exportLoading = false
                    })
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
            }
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

        overflow: hidden;
    }
    .erke-buttom-left {
        width: 220px;
        float: left;
        padding: 16px;
        height: calc(100vh - 140px);
        background-color: #fff;
    }
    .erke-buttom-left ul {
        margin: 0;
        padding: 0;
    }
    .erke-buttom-left li {
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
    .erke-buttom-right {
        background-color: #fff;
        margin-left: 230px;
        height: calc(100vh - 140px);
        padding: 16px;
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
    .unitValue .el-input__inner,
    .unitValue .el-input--suffix {
        width: 260px;
    }
    .unitValue .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    /*two*/
    .switchStyle .el-switch__label {
        position: absolute;
        display: none;
        color: #fff;
    }
    .switchStyle .el-switch__label--left {
        z-index: 9;
        left: 22px;
    }
    .switchStyle .el-switch__label--right {
        z-index: 9;
        left: -2px;
    }
    .switchStyle .el-switch__label.is-active {
        display: block;
    }
    .switchStyle.el-switch .el-switch__core,
    .el-switch .el-switch__label {
        width: 45px !important;
    }
    /*three*/
    .className .el-input__inner {
        width: 330px;
    }

    .shoutInput .el-input__inner,
    .shoutInput .el-input--suffix {
        width: 130px;
    }
    .shoutInput .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    /*four line */
    .sortClass .el-input__inner,
    .sortClass .el-input--suffix {
        width: 200px;
    }
    .sortClass .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    /*five */
    .classSort .el-input__inner,
    .classSort .el-input--suffix {
        width: 180px;
    }
    .classSort .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }

    .activitySort .el-input__inner,
    .activitySort .el-input--suffix {
        width: 320px;
    }
    .activitySort .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }

    .rankSort .el-input__inner,
    .rankSort .el-input--suffix {
        width: 100px;
    }
    .rankSort .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    textarea {
        resize: none !important;
        height: 150px;
        width: 690px !important;
        border: 1px solid #aaa !important;
    }
    .addClassDialog .el-dialog__header {
        border-bottom: 1px solid #ddd;
    }
</style>
