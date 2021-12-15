<docs>
    🚀Todo 导入导出暂时隐藏，如有需要可以添加
            编辑活动
</docs>

<template>
    <div class="app-container">
        <div class="erke-top">
            <el-form :inline="true" label-width="80px">
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option
                        label="全部"
                        :value="undefined">
                        </el-option>
                        <el-option
                        v-for="item in dict_sc_activity_integral_status"
                        :key="item.dictCode"
                        :label="item.dictLabel"
                        :value="item.dictValue">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动Id">
                    <el-input v-model="form.activityId"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button @click="getIntegralList" style="marginLeft: 20px">
                        查询
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="erke-bottom" ref="erkeBottom">
            <el-row style="margin-bottom:10px">
                <el-button size="mini" @click="getAll" style="marginLeft: 20px">
                    全选
                </el-button>
                <el-button size="mini" @click="selectVerify" style="marginLeft: 20px">
                    批量认定
                </el-button>

            </el-row>
            <el-table
                ref="multipleTable"
                :data="creditList"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                    prop="activityName"
                    label="活动名称"
                    min-width="200">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    min-width="140">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 0" type="info">
                            待认定
                        </el-tag>
                        <el-tag v-else-if="scope.row.status == 1" type="success">
                            已认定
                        </el-tag>
                        <el-tag v-else-if="scope.row.status == 2" type="danger">
                            未通过
                        </el-tag>
                        <el-tag v-else-if="scope.row.status == 3" type="default">
                            待校级审核
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="学号"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="nickName"
                    label="学生姓名"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="className"
                    label="班级"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="collegeName"
                    label="学院"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="reason"
                    label="获奖原因"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="applyIntegral"
                    label="申报积分"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="confirmIntegral"
                    label="认定积分"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="confirmUserNickName"
                    label="认定者"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="confirmTime"
                    label="认定时间"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="material"
                    label="材料"
                    min-width="180">
                    <template slot-scope="scope">
                        <img 
                            v-if="scope.row.material" 
                            class="material" 
                            :src="scope.row.material"
                            @click="showImg(scope.row.material)"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" min-width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="pass(scope)"
                        >
                            认定积分
                        </el-button>
                        <el-button
                            size="mini"
                            @click="fail(scope)"
                        >
                            取消认定
                        </el-button>
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

    </div>
</template>

<script>
    import {
        integralAllList,
        integralVerifyAll
    } from '@/api/application/secondClass/index'

    import {
        transformDate,
        filterTwoLayer,
        filterCourseClassificationList
    } from '@/utils/gather'
    import { getDict } from '@/api/application/secondClass/dict/type.js'

    import Editor from '@/components/Editor'
    import wangEditor from '@/components/WangEditor'
    export default {
        name: 'activity',
        mixins: [],
        components: {
            Editor,
            wangEditor
        },
        data() {
            return {
                creditList: [],
                selectCreditList: [],
                form:{
                    status: undefined,
                    activityId: undefined
                },
                dict_sc_activity_integral_status:[],
                queryParams: {
                    totalCount: 10,
                    totalPage: 0,
                    pageNum: 1,
                    pageSize: 10
                }
            }
        },
        methods: {
            showImg(img) {
                this.$viewerApi({
                    images: [img],
                })
            },
            getList(option) {
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.getIntegralList()
            },
            pass(scope) {
                console.log(scope)
                this.$prompt('请输入认定的积分', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    return activityIntegralVerify({
                        activityId: scope.row.activityId,
                        status: 1,
                        userIds: [scope.row.userId],
                        idIntegral:{
                            [scope.row.id]: value
                        }
                    })
                }).then(value => {
                    if(value.code == 200) {
                        this.msgSuccess('添加成功')
                        this.getIntegralList()
                    } else {
                        this.msgError('添加失败')
                    }
                })
            },
            fail(scope) {
                this.alertDialog('取消认定',{
                    confirm: () => {
                        activityIntegralVerify({
                            activityId: scope.row.activityId,
                            status: 0,
                            userIds: [scope.row.userId],
                            idIntegral:{
                                [scope.row.id]: 0
                            }
                        }).then(value => {
                            if(value.code == 200) {
                                this.msgSuccess('取消认定成功')
                                this.getIntegralList()
                            } else {
                                this.msgError('取消认定失败')
                            }
                        })
                    }
                })
            },
            getIntegralList() {
                const queryList = {
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize,
                    status: this.form.status,
                    activityId: this.form.activityId
                }
                integralAllList(queryList).then(value => {
                    console.log(value)
                    this.creditList = value.rows
                    this.queryParams.totalCount = value.total
                    this.queryParams.totalPage = value.total / this.queryParams.pageSize
                })
            },
            handleSelectionChange(value) {
                this.selectCreditList = value
            },
            getAll() {
                this.selectCreditList = this.creditList
                this.$refs.multipleTable.toggleAllSelection();
            },
            selectVerify() {
                this.$prompt('请输入认定的积分数', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[0-9]*$/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    const userIds = this.selectCreditList.map(item => item.userId)
                    const idIntegral = {}
                    this.selectCreditList.map(item => {
                        idIntegral[item.id] = value
                    })
                    return integralVerifyAll({
                        // activityId: this.selectCreditList[0].activityId,
                        status: 1,
                        // userIds: userIds,
                        idIntegral:idIntegral
                    })
                }).then(value => {
                    if(value.code == 200) {
                        this.msgSuccess('添加成功')
                        this.getIntegralList()
                    } else {
                        this.msgError('添加失败')
                    }
                })
            }
        },
        created() {
            this.getIntegralList()
            getDict('sc_activity_integral_status').then(value => {
                this.dict_sc_activity_integral_status = value.data
            })
        }
        
    }
</script>

<style scoped>
    .erke-top {
        margin-right: 10px;
        height: 70px;
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
        transition: all .5s;
        background-color: #fff;
        height: calc(100vh - 130px);
        border: 1px solid #ddd;
        padding: 15px;
        overflow: auto;
    }
    .el-input {
        width: 200px;
    }

    .el-dialog {
        /* height: 475px !important; */
        overflow: hidden;
    }
    .material {
        width: 50px;
        height: 50px;
    }
</style>
