<!--
 * @Descripttion: 培养方案
 * @Author: 林舒恒
 * @Date: 2021-06-03 13:04:02
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-31 17:40:54
-->
<template>
    <div class="app-container">
        <div class="erke-top">
            <div class="erke-top-head">
                <span> <i>✈</i> 群组分类</span>
            </div>
        </div>

        <div class="erke-bottom">
            <el-form :inline="true">
            <el-row 
            :gutter="10"
            style="margin-bottom: 20px"
            >
                <el-col :span="1.5">
                    <el-button
                        type="primary"
                        plain
                        icon="el-icon-plus"
                        size="mini"
                        v-hasPermi="['system:user:add']"
                        @click="addData"
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
                    v-hasPermi="['system:role:export']"
                    >导出</el-button>
                </el-col>

                <el-col :span="1" style="min-width:290px">
                    <el-form-item label="分类名称:">
                        <el-button
                            size="mini"
                            v-hasPermi="['system:user:add']"
                            @click="addData"
                            >新增</el-button
                        >
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            type="warning"
                            plain
                            icon="el-icon-download"
                            size="mini"
                            v-hasPermi="['system:user:export']"
                            >导出</el-button
                        >
                    </el-col>

                    <el-col :span="1" style="min-width:290px">
                        <el-form-item label="分类名称:">
                            <el-input
                                size="mini"
                                suffix-icon="el-icon-search"
                                v-model="queryList.name"
                                @input="fuzzyQuery"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="1" style="min-width:205px">
                        <el-form-item label="类别:">
                            <el-select
                                v-model="queryList.category"
                                placeholder="类别:不限"
                                style="width:120px"
                                @change="fuzzyQuery"
                            >
                                <el-option
                                    value=""
                                    label="类别:不限"
                                ></el-option>
                                <el-option
                                    v-for="(item,
                                    index) in dict_ga_group_type_category"
                                    :key="index"
                                    :value="item.dictValue"
                                    :label="item.dictLabel"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="1" style="min-width:245px">
                        <el-form-item label="所在层级:">
                            <el-select
                                v-model="queryList.layer"
                                placeholder="所在层级:不限"
                                style="width:120px"
                                @change="fuzzyQuery"
                            >
                                <el-option
                                    value=""
                                    label="所在层级:不限"
                                ></el-option>
                                <el-option
                                    v-for="(item, index) in maxLayer"
                                    :key="index"
                                    :value="item - 1"
                                    :label="item - 1"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <el-table
                :data="treeData"
                row-key="id"
                default-expand-all
                :tree-props="{
                    children: 'children',
                    hasChildren: 'hasChildren'
                }"
            >
                <el-table-column type="index"> </el-table-column>

                <el-table-column
                    prop="name"
                    label="分类名称"
                    :show-overflow-tooltip="true"
                    min-width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="category"
                    label="类别"
                    min-width="100"
                    :formatter="formatCategory"
                >
                </el-table-column>
                <el-table-column prop="layer" label="所在层级" min-width="100">
                </el-table-column>
                <el-table-column prop="sort" label="同层排序" min-width="100">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    min-width="100"
                    :formatter="formatStatus"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            v-if="scope.row.status <= 10"
                            round
                            :class="sureClass(scope.row)"
                            >{{ computedStatus(scope.row.status) }}</el-button
                        >
                    </template>
                </el-table-column>

                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    min-width="120"
                >
                </el-table-column>

                <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    min-width="120"
                >
                </el-table-column>

                <el-table-column label="操作" fixed="right" min-width="100">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="updateData(scope.row, scope.$index)"
                            >编辑</el-button
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
        <el-dialog
            :title="addGroupClassifyDialog.title"
            :visible.sync="addGroupClassifyDialog.open"
            width="915px"
            append-to-body
        >
            <el-form ref="form" :model="form" label-width="300px">
                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                        分类名称:
                    </el-col>
                    <el-col :span="18">
                        <el-input
                            style="width:200px"
                            v-model="addGroupClassifyDialog.data.name"
                        >
                        </el-input>
                    </el-col>
                </el-row>

                <el-row
                    style="margin-bottom:10px"
                    v-if="addGroupClassifyDialog.title == '修改群组分类'"
                >
                    <el-col :span="6">
                        上级节点:
                    </el-col>
                    <el-col :span="18">
                        <el-select
                            v-if="addGroupClassifyDialog.data.parentId != 0"
                            style="width:200px"
                            v-model="addGroupClassifyDialog.data.parentId"
                        >
                            <el-option
                                v-for="(item, index) in parents"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>

                        <el-input
                            v-else
                            style="width:200px"
                            value="它没有上级节点"
                        >
                        </el-input>
                    </el-col>
                </el-row>

                <el-row
                    style="margin-bottom:10px"
                    v-if="addGroupClassifyDialog.title == '新增群组分类'"
                >
                    <el-col :span="6">
                        上级节点:
                    </el-col>
                    <el-col :span="18">
                        <el-select
                            v-if="addGroupClassifyDialog.data.parentId != 0"
                            style="width:200px"
                            v-model="addGroupClassifyDialog.data.parentId"
                            @change="filterLayer"
                        >
                            <el-option
                                v-for="(item, index) in Layer0Layer1Data"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>

                        <el-input
                            v-else
                            style="width:200px"
                            value="它没有上级节点"
                        >
                        </el-input>
                    </el-col>
                </el-row>

                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                        同层排序:
                    </el-col>
                    <el-col :span="18">
                        <el-input
                            style="width:200px"
                            v-model="addGroupClassifyDialog.data.sort"
                        >
                        </el-input>
                    </el-col>
                </el-row>

                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                        状态:
                    </el-col>
                    <el-col :span="18">
                        <el-radio-group
                            v-model="addGroupClassifyDialog.data.status"
                            style="float:left;margin-top:15px"
                        >
                            <el-radio :label="1">停用</el-radio>
                            <el-radio :label="0">正常</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        //群组分类列表
        groupTypeList,
        //新增群组分类
        groupTypePost,
        //编辑群组分类
        groupTypePut,
        //群组分类导出
        groupTypeExport,
        //通过id获取编辑回显
        groupType,
        //导出群组分裂
        exportGroupClasify
    } from '@/api/application/secondClass/index'
    import { filterGroupClassificationList } from '@/utils/gather'
    import { getDict } from '@/api/application/secondClass/dict/type.js'

    export default {
        name: 'erkePlan',
        data() {
            return {
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
                },
                //筛选数据
                queryList: {
                    name: '',
                    category: '',
                    layer: ''
                },
                maxLayer: 0,
                //表格里面的数据
                treeData: [],
                normalData: [],
                form: {},
                parents: [],
                Layer0Layer1Data: [],
                //群组分类类别字典
                dict_ga_group_type_category: [],
                dict_ga_group_status: [],
                addGroupClassifyDialog: {
                    title: '',
                    open: false,
                    data: {
                        id: '',
                        name: '',
                        parentId: '',
                        sort: '',
                        status: '',
                        category: '',
                        layer: ''
                    }
                },
                exportLoading: false,
            }
        },
        computed: {
            computedStatus() {
                return value => {
                    return this.dict_ga_group_status[value]?.dictLabel
                }
            }
        },
        methods: {
            getList(option) {
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.fuzzyQuery()
            },
            /** 导出按钮操作 */
            handleExport() {
            // const queryParams = this.queryParams;
            this.$confirm('是否确认导出所有群组分类项?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
                }).then(() => {
                this.exportLoading = true;
                return exportGroupClasify();
                }).then(response => {
                this.download(response.msg);
                this.exportLoading = false;
                }).catch(() => {});
            },
            //新增时选中上级节点之后计算当先layer
            filterLayer(value) {
                this.Layer0Layer1Data.forEach(item => {
                    if (item.id == value) {
                        this.addGroupClassifyDialog.data.layer = item.layer + 1
                        console.log(
                            this.addGroupClassifyDialog.data.layer,
                            '选中上级节点之后的自身的layer'
                        )
                    }
                })
            },
            //修改和新增的保存按钮
            save() {
                //要提交的数据
                console.log(
                    this.addGroupClassifyDialog.data,
                    '点击保存要发送的数据'
                )
                if (this.addGroupClassifyDialog.title == '新增群组分类') {
                    groupTypePost(this.addGroupClassifyDialog.data).then(
                        value => {
                            this.fuzzyQuery()
                        }
                    )
                }
                if (this.addGroupClassifyDialog.title == '修改群组分类') {
                    groupTypePut(this.addGroupClassifyDialog.data).then(
                        value => {
                            this.fuzzyQuery()
                        }
                    )
                }
                this.addGroupClassifyDialog.open = false
            },
            //新增群组分类
            addData() {
                this.reset()
                this.addGroupClassifyDialog.title = '新增群组分类'
                this.addGroupClassifyDialog.open = true
            },
            //会话框关闭
            cancel() {
                this.addGroupClassifyDialog.open = false
                this.reset()
            },
            //新增编辑会话框重置
            reset() {
                this.addGroupClassifyDialog.data = {
                    id: '',
                    name: '',
                    parentId: null,
                    sort: '',
                    status: '',
                    category: 1,
                    layer: ''
                }
            },
            //编辑群组分类
            updateData(row, index) {
                console.log(row, '刚点击编辑传来的数据')
                this.parents = []
                this.addGroupClassifyDialog.title = '修改群组分类'
                this.normalData.forEach((item, index) => {
                    if (item.layer == row._parent_?.layer) {
                        this.parents.push(item)
                    }
                })
                console.log(this.parents, '父亲那一层的数据数组')
                this.renderState(row)
            },
            renderState(row) {
                this.addGroupClassifyDialog.data = {
                    id: row.id,
                    name: row.name,
                    parentId: row.parentId,
                    sort: row.sort,
                    status: row.status,
                    category: row.category,
                    layer: row.layer
                }
                console.log(this.addGroupClassifyDialog.data, '渲染的数据')
                this.addGroupClassifyDialog.open = true
            },
            //模糊查询
            fuzzyQuery() {
                let option = {
                    name: this.queryList.name,
                    category: this.queryList.category,
                    layer: this.queryList.layer,
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize
                }
                console.log(option, '模糊查询发送的数据')
                this.getGroupClassificationList(option)
            },
            sureClass(row) {
                if (row.status == 0) {
                    //ing
                    return 'textgreen'
                } else if (row.status == 1) {
                    //yes
                    return 'textRed'
                } else if (row.status == 2) {
                    //no
                    return 'textyellow'
                } else {
                    //unpass
                    return 'textRed'
                }
            },
            formatStatus(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_ga_group_status[cellValue]?.dictLabel
                )
            },
            formatCategory(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_ga_group_type_category[cellValue]?.dictLabel
                )
            },
            getGroupClassificationList(option) {
                return groupTypeList(option).then(value => {
                    // 树表不分页！！！！！
                    // this.queryParams.totalCount = value.total;
                    // this.queryParams.totalPage = Math.ceil(this.queryParams.totalCount/this.queryParams.pageSize);
                    this.normalData = JSON.parse(JSON.stringify(value.data))
                    console.log(this.normalData, '群组分类列表')
                    JSON.parse(JSON.stringify(value.data)).forEach(item => {
                        if (item.layer <= 1) {
                            this.Layer0Layer1Data.push(item)
                        }
                    })
                    console.log(this.Layer0Layer1Data, 'layer为0、1的数据')
                    console.log(value.data, '过滤之前的数据')
                    this.treeData = filterGroupClassificationList(value.data)
                    console.log(this.treeData, '过滤之后的数据')

                    //导出群组分类
                    // var options = {
                    //     exportUrl: '/admins/group/type/export',
                    //     columns: [{
                    //         field: 'id',
                    //         title: '主键'
                    //     },
                    //     {
                    //         field: 'name',
                    //         title: '名称'
                    //     }]
                    // };
                    // $.table.init(options);
                })
            },
            initDict() {
                Promise.all([
                    getDict('ga_group_type_category'),
                    getDict('ga_group_status')
                ]).then(value => {
                    let tempArr = [
                        'dict_ga_group_type_category',
                        'dict_ga_group_status'
                    ]
                    tempArr.forEach((item, index) => {
                        this[item] = value[index].data
                        console.log(this[item], '这是所有字典')
                    })
                })
            }
        },
        async created() {
            await this.fuzzyQuery()
            this.maxLayer = this.treeData.maxLayer
            console.log(this.maxLayer, '数据中的最大层级')
            this.initDict()
        },
        mounted() {}
    }
</script>

<style scoped>
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
        margin-right: 10px;
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
        border-radius: 5px;
        max-height: calc(100vh - 140px);
        overflow: auto;
    }
</style>
