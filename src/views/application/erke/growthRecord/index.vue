<docs>
    🚀Todo 导入导出暂时隐藏，如有需要可以添加
            编辑活动
</docs>

<template>
    <div class="app-container">
        <div class="erke-top">
            <div class="erke-top-foot">
                <el-row style="margin-bottom:10px">
                    <el-col class="operation">
                        <el-button size="small" 
                            type="primary"
                            @click="openAddDialog"
                        >成长记录补录</el-button>
                        
                    </el-col>
                    <el-dialog 
                        title="成长记录补录" 
                        :visible.sync="addDialog.visible"
                        class="groupRecordAddDialog"
                    >
                        <el-form ref="form" label-width="120px">
                            <el-form-item label="发放对象">
                                <!-- <el-input v-model="postData.userId"></el-input> -->
                                <el-autocomplete
                                    value-key="label"
                                    v-model="userId"
                                    :fetch-suggestions="querySearchAsync"
                                    placeholder="请输入发放对象完整姓名"
                                    @select="handRelease"
                                ></el-autocomplete>
                            </el-form-item>
                            <el-form-item label="参与时间">
                                <el-col :span="11">
                                    <el-date-picker
                                        type="date" 
                                        placeholder="开始时间" 
                                        v-model="postData.beginTime" 
                                        style="width: 100%;"
                                        value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="1">——</el-col>
                                <el-col :span="11">
                                    <el-date-picker 
                                        type="date" 
                                        placeholder="结束时间" 
                                        v-model="postData.endTime" 
                                        style="width: 100%;"
                                        value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="活动级别">
                                <el-select v-model="postData.rank">
                                    <el-option 
                                        v-for="(item,index) in dict_sc_train_program_rank"
                                        :label="item.dictLabel" 
                                        :value="item.dictValue"
                                        :key="index.dictValue"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动一级分类">
                                <el-select v-model="courseClassificationIdOne" @change="idOneChange">
                                    <el-option 
                                        v-for="(item,index) in datadata"
                                        :label="item.name" 
                                        :value="item.id"
                                        :key="index.dictValue"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动二级分类">
                                <el-select v-model="postData.courseClassificationId">
                                    <el-option 
                                        v-for="(item,index) in datadataTwo"
                                        :label="item.name" 
                                        :value="item.id"
                                        :key="index.dictValue"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="获得原因">
                                <el-input v-model="postData.content"></el-input>
                            </el-form-item>
                            <el-form-item label="奖项">
                                <el-input placeholder="选填" v-model="postData.prize"></el-input>
                            </el-form-item>
                            <el-form-item label="积分">
                                <el-input v-model="postData.integral"></el-input>
                            </el-form-item>
                        </el-form>    
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="closeAddDialog">关闭</el-button>
                            <el-button type="primary" @click="postNewData"
                                >确 定</el-button
                            >
                        </div>
                    </el-dialog>
                </el-row>
                    <el-form
                        label-position="right"
                        label-width="100px"
                        class="formDetail"
                        :inline="true"
                    >
                        <el-form-item label="活动级别：">
                            <el-switch 
                                v-model="form.rank"
                                active-value="1"
                                inactive-value="0"
                                active-text="院级"
                                inactive-text="校级"
                                active-color="#13ce66"
                                inactive-color="#1890ff"
                            ></el-switch>
                        </el-form-item>
                        <el-form-item label="学生姓名：">
                            <el-input v-model="form.studentName"></el-input>
                        </el-form-item>
                        <el-form-item label="学生学号：">
                            <el-input v-model="form.studentId"></el-input>
                        </el-form-item>
                    </el-form>
                <el-row>
                    <el-button size="small" 
                        type="primary"
                        @click="findForm"
                    >查询</el-button>
                    <el-button size="small" 
                        type="primary"
                        @click="clearForm"
                    >清空</el-button>
                </el-row>
            </div>
        </div>
        <div class="erke-bottom" ref="erkeBottom">
            <el-table
                :data="recordList"
            >
                <el-table-column
                    prop="id"
                    label="Id"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="studentName"
                    label="学生姓名"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="integral"
                    label="积分"
                    min-width="60">
                </el-table-column>
                <el-table-column
                    prop="studentId"
                    label="学号"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="collegeName"
                    label="学院"
                    show-overflow-tooltip
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    label="参与开始时间"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="参与结束时间"
                    min-width="150">
                </el-table-column>
                <!-- <el-table-column
                    prop="classfication"
                    label="classfication"
                    min-width="150">
                </el-table-column> -->
                <el-table-column
                    prop="rankType"
                    label="活动级别"
                    :formatter="formatRank"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="活动名称"
                    show-overflow-tooltip
                    min-width="220">
                </el-table-column>
                <el-table-column label="操作" fixed="right" min-width="300">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="withdrawRecord(scope)"
                        >
                            撤回记录
                        </el-button>
                        <el-button
                            size="mini"
                            @click="modifyIntegral(scope)"
                        >
                            修改积分
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
        integralPatchAddOne,
        integralPatchShowList,
        integralPatchIds,
        integralPatchAlert,
        utilListByName,
        integralPatchQueryDetail
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
                addDialog:{
                    visible: false
                },
                datadata:[],
                datadataTwo: [],
                recordList: [],
                dict_sc_train_program_rank: [],
                userId:'',
                courseClassificationIdOne:null,
                postData: {
                    studentId: null,
                    beginTime: null,
                    endTime: null,
                    rank: null,
                    content: null,
                    prize: null,
                    integral: null,
                    courseClassificationId:null,
                    courseClassificationPath: null,
                },
                form: {
                    rank: 0,
                    studentName: undefined,
                    studentId: undefined,
                },
                queryParams: {
                    totalCount: 10,
                    totalPage: 10,
                    pageNum: 1,
                    pageSize: 10
                },
            }
        },
        methods: {
            formatRank(row,column,index = 0) {
                return this.dict_sc_train_program_rank[index]?.dictLabel
            },
            openAddDialog() {
                this.addDialog.visible = true
            },
            closeAddDialog() {
                this.addDialog.visible = false
            },
            postNewData() {
                this.postData.courseClassificationPath = this.courseClassificationIdOne + '、' + this.postData.courseClassificationId
                console.log(this.postData,'postdata')
                integralPatchAddOne(this.postData).then(value => {
                    console.log('post result:', value)
                    if(value.code == 200) {
                        this.msgSuccess('添加成功')
                        this.getGrwthRecordList()
                    } else {
                        this.msgError('添加失败')
                    }
                    this.closeAddDialog()
                })
                console.log(this.postData)
            },
            getCourseList() {
                let courseList = JSON.parse(localStorage.getItem('courseList'))
                courseList = courseList.map(item => ({
                    ...item,
                    value: item.id,
                    label: item.name
                }))
                //挂载算法
                this.datadata = filterTwoLayer(courseList)
                console.log(this.datadata)
            },
            getList(option) {
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.getGrwthRecordList()
            },
            idOneChange(value) {
                let index = this.datadata.findIndex(item => {
                    return item.id == value
                })
                console.log(value, index)
                this.datadataTwo = this.datadata[index].children
            },
            filterObj(obj) {
                for(let key in obj) {
                    if(typeof obj[key] == 'string' && obj[key] == '') {
                        obj[key] = undefined
                    }
                }
            },
            getGrwthRecordList() {
                const queryList = {
                    rank: this.form.rank,
                    nickName: this.form.studentName,
                    userName: this.form.studentId,
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize
                }
                this.filterObj(queryList)
                console.log(queryList)
                integralPatchShowList(queryList).then(value => {
                    console.log(value)
                    this.queryParams.totalCount = value.total
                    this.queryParams.totalPage = Math.ceil(value.total / this.queryParams.pageSize)
                    this.recordList = value.rows
                })
            },
            findForm() {
                this.queryParams.pageNum = 1
                this.getGrwthRecordList()
            },
            clearForm() {
                this.form =  {
                    rank: 0,
                    studentName: undefined,
                    studentId: undefined,
                }
                this.getGrwthRecordList()
            },
            querySearchAsync(queryString,cb) {
                if(queryString) {
                    utilListByName({name:queryString}).then(value => {
                        console.log(value)
                        cb(value.data.map(item =>({
                            label: `${item.userName}-${item.nickName}`,
                            value: item.userName
                        })))
                    })
                } 
            },
            handRelease(item) {
                this.postData.studentId = item.value
            },
            withdrawRecord(scope) {
                console.log(scope.row.id)
                this.alertDialog('删除',{
                    confirm: () => {
                        integralPatchIds({
                            id: scope.row.id
                        }).then(value => {
                            console.log(value)
                            if(value.code == 200) {
                                this.msgSuccess('撤回成功')
                                this.getGrwthRecordList()
                            } else {
                                this.msgError('撤回失败')
                            }
                        })
                    },
                    cancel: ()=> {
                        this.msgInfo('取消删除')
                    }
                })
            },
            modifyIntegral(scope) {
                this.$prompt('请输入新的积分', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    console.log({
                        id: scope.row.id,
                        integral: value
                    })
                    return integralPatchAlert({
                        id: scope.row.id,
                        integral: value
                    })
                }).then(value => {
                    console.log(value)
                    if(value) {
                        this.msgSuccess('修改成功')
                        this.getGrwthRecordList()
                    } else {
                        this.msgError('修改失败')
                    }
                })
            }
        },
        created() {
            getDict('sc_train_program_rank').then(value => {
                //console.log('rank:', value)
                this.dict_sc_train_program_rank = value.data
            })
            this.getCourseList()
        },
        mounted() {    
            this.getGrwthRecordList()
        },
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
    .groupRecordAddDialog >>> .el-dialog__body {
        height: 500px;
        max-height: 50vh;
        overflow: auto
    }
</style>
