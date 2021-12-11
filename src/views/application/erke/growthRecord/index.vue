<docs>
    🚀Todo 导入导出暂时隐藏，如有需要可以添加
            编辑活动
</docs>

<template>
    <div class="app-container">
        <div class="erke-top">
            <div class="erke-top-foot">
                <el-row style="margin-bottom:10px">
                <el-col class="operation" :span="5">
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
                        <el-form-item label="发放用户学号">
                            <el-input v-model="postData.userId"></el-input>
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
                            <el-col class="line" :span="2">-</el-col>
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
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动一级分类">
                            <el-select v-model="postData.courseClassificationIdOne" @change="idOneChange">
                                <el-option 
                                    v-for="(item,index) in datadata"
                                    :label="item.name" 
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动二级分类">
                            <el-select v-model="postData.courseClassificationId">
                                <el-option 
                                    v-for="(item,index) in datadataTwo"
                                    :label="item.name" 
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="记录内容">
                            <el-input v-model="postData.content"></el-input>
                        </el-form-item>
                        <el-form-item label="奖项">
                            <el-input v-model="postData.prize"></el-input>
                        </el-form-item>
                        <el-form-item label="学分">
                            <el-input v-model="postData.integral"></el-input>
                        </el-form-item>
                    </el-form>    
                    <div slot="footer" class="dialog-footer">
                        <el-button>关闭</el-button>
                        <el-button type="primary" @click="postNewData"
                            >确 定</el-button
                        >
                    </div>
                </el-dialog>
            </el-row>
            </div>
        </div>
        <div class="erke-bottom" ref="erkeBottom">
            <el-table
                :data="recordList"
            >
                <el-table-column
                    prop="userId"
                    label="用户学号"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="beginTime"
                    label="参与开始时间"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="参与结束时间"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="记录内容"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="prize"
                    label="奖项"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="integral"
                    label="积分"
                    min-width="180">
                </el-table-column>
                <el-table-column label="操作" fixed="right" min-width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            icon="el-icon-check"
                            @click="withdrawRecord"
                        >
                            撤回记录
                        </el-button>
                        <el-button
                            size="mini"
                            icon="el-icon-check"
                            
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
        integralPatchShowList
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
                postData: {
                    userId: null,
                    beginTime: null,
                    endTime: null,
                    rank: null,
                    content: null,
                    prize: null,
                    integral: null,
                    courseClassificationIdOne:null,
                    courseClassificationId:null,
                    courseClassificationPath: null,
                    createTime: null,
                    createUserId: null,
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
            openAddDialog() {
                this.addDialog.visible = true
            },
            postNewData() {
                this.postData.courseClassificationPath = this.postData.courseClassificationIdOne + '、' + this.postData.courseClassificationId
                integralPatchAddOne({
                    id: xxx,
                    integral: xxx
                }).then(value => {
                    console.log('post result:', value)
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
            idOneChange(value) {
                let index = this.datadata.findIndex(item => {
                    return item.id == value
                })
                console.log(value, index)
                this.datadataTwo = this.datadata[index].children
            },
            getGrwthRecordList() {
                integralPatchShowList().then(value => {
                    this.recordList = value.rows
                })
            },
            withdrawRecord() {
                
            }
        },
        created() {
            getDict('sc_train_program_rank').then(value => {
                //console.log('rank:', value)
                this.dict_sc_train_program_rank = value.data
            })
            this.getCourseList()
            this.getGrwthRecordList()
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
    .groupRecordAddDialog >>> .el-dialog__body {
        height: 500px;
        max-height: 50vh;
        overflow: auto
    }
</style>
