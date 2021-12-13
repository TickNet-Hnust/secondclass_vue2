<docs>
    🚀Todo 导入导出暂时隐藏，如有需要可以添加
            编辑活动
</docs>

<template>
    <div class="app-container">
        <div class="erke-bottom" ref="erkeBottom">
            <el-table
                :data="creditList"
                style="width: 100%"
            >
                <el-table-column
                    prop="activityName"
                    label="活动名称"
                    min-width="200">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    min-width="80">
                    <template slot-scope="scope">
                        <el-tag type="info">标签三</el-tag>
                        <el-tag type="success"></el-tag>
                        <el-tag type="success"></el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="学号"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="collegeName"
                    label="学院"
                    min-width="180">
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
                    prop="reason"
                    label="获奖原因"
                    min-width="180">
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
                    label="确认者"
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
                <el-table-column label="操作" fixed="right" min-width="100">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="pass(scope)"
                        >
                            认定积分
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
        activityIntegralVerify
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
            getIntegralList() {
                const queryList = {
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize
                }
                integralAllList(queryList).then(value => {
                    console.log(value)
                    this.creditList = value.rows
                    this.queryParams.totalCount = value.total
                    this.queryParams.totalPage = value.total / this.queryParams.pageSize
                })
            }
        },
        created() {
            this.getIntegralList()
        }
        
    }
</script>

<style scoped>
    .erke-top {
        margin-right: 10px;
        height: 170px;
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
        height: calc(100vh - 50px);
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
