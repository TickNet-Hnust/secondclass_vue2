<docs>
    🚀Todo 导入导出暂时隐藏，如有需要可以添加
            编辑活动
</docs>

<template>
    <div class="app-container">
        <el-form label-width="80px">
            <el-form-item label="学号">
                <el-input v-model="userName"></el-input>
                <el-button @click="findUserCredit" style="marginLeft: 20px">
                    查询
                </el-button>
            </el-form-item>
        </el-form>
        <el-descriptions v-if="nickName" title="用户信息">
            <el-descriptions-item label="用户姓名">
                {{nickName}}
            </el-descriptions-item>
            <el-descriptions-item label="学校">
                {{schoolName}}
            </el-descriptions-item>
            <el-descriptions-item label="所在学院">
                {{collegeName}}
            </el-descriptions-item>
            <el-descriptions-item label="年级">
                {{grade}}
            </el-descriptions-item>
            <el-descriptions-item label="积分总数">
                {{integralSum}}
            </el-descriptions-item>
        </el-descriptions>
        <el-table
            :data="integralList"
            style="width: 100%"
        >
            <el-table-column
                prop="integralType"
                label="积分类型"
                min-width="180">
            </el-table-column>
            <el-table-column
                prop="num"
                label="积分数"
                min-width="180">
            </el-table-column>
            <el-table-column
                prop="reason"
                label="获得原因"
                min-width="180">
            </el-table-column>
            <el-table-column
                prop="idValid"
                label="是否有效"
                min-width="180">
            </el-table-column>
            <el-table-column
                prop="senderName"
                label="发放者"
                min-width="180">
            </el-table-column>
            <el-table-column
                prop="getTime"
                label="获得时间"
                min-width="180">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {
        queryIntegralUserName
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
                userName: '',
                integralList: [],
                nickName: '',
                schoolName: '',
                collegeName:'',
                grade: '',
                integralSum: ''
            }
        },
        methods: {
            findUserCredit() {
                
                queryIntegralUserName({
                    userName: this.userName
                }).then(value => {
                    console.log(value)
                    this.nickName = value.nickName
                    this.schoolName = value.schoolName
                    this.collegeName = value.collegeName
                    this.grade = value.grade
                    this.integralSum = value.integralSum
                    this.integralList = value.integralQueryDetailVoList.rows
                }).catch((e) => {
                    console.log(e)
                })
            }
        },
        created() {
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
        height: calc(100vh - 230px);
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
    .app-container {
        background-color: #fff;
        padding: 10px;
        height: calc(100vh - 50px);
    }
</style>
