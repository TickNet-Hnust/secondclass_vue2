<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                <div class="erke-bottom">
                    <div class="erke-buttom-right">
                        <div class="operate">
                            <el-form :inline="true">
                                <el-row
                                    :gutter="10"
                                    type="flex"
                                    justify="start"
                                    style="flexWrap:wrap"
                                >
                                    
                                    <el-col :span="1" style="min-width:80px;">
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            content="清空查询条件"
                                            placement="right"
                                        >
                                            <el-button
                                                circle
                                                icon="el-icon-refresh"
                                                @click="refresh"
                                            >
                                            </el-button>
                                        </el-tooltip>
                                    </el-col>

                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="学号：">
                                            <el-input
                                                data-text
                                                placeholder="学号"
                                                v-model="queryList.userName"
                                                @input="debounceFuzzyQuery(fuzzyQuery,500)"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="姓名：">
                                            <el-input
                                                data-text
                                                placeholder="姓名"
                                                v-model="queryList.nickName"
                                                @input="debounceFuzzyQuery(fuzzyQuery,500)"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 220px">
                                        <el-form-item label="花絮状态">
                                            <el-select
                                                v-model="queryList.status"
                                                placeholder="花絮状态:不限"
                                                style="width:120px"
                                                @change="fuzzyQuery"
                                            >
                                                <el-option
                                                    value=""
                                                    label="花絮状态:不限"
                                                ></el-option>
                                                <el-option
                                                    v-for="(item,
                                                    index) in dict_sc_activity_flower_status"
                                                    :key="index"
                                                    :value="item.dictValue"
                                                    :label="item.dictLabel"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 340px">
                                        <el-form-item label="发布时间">
                                            <el-date-picker
                                                v-model="value2"
                                                type="datetimerange"
                                                :picker-options="pickerOptions"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                align="right"
                                                @change="fuzzyQuery"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                        <el-table
                            :data="flowerList"
                            height="550"
                            class="msgTable"
                            highlight-current-row
                        >
                            <el-table-column
                                label="发布者信息"
                                align="center"
                                width="120"
                            >
                                <template slot-scope="{ row }">
                                    <img
                                        :src="row.userImage"
                                        alt="图片失效"
                                        class="avatar"
                                    />
                                    <br />{{ row.nickName }} <br />{{
                                        row.userName
                                    }}
                                </template>
                            </el-table-column>

                            <el-table-column label="发布内容" width="700">
                                <template slot-scope="{ row }">
                                    {{ row.content }}
                                </template>
                            </el-table-column>

                            <el-table-column
                                label="发布图片"
                                :min-width="computedLength"
                            >
                                <template slot-scope="{ row }">
                                    <div
                                   v-if="row.picture==null"
                                   >
                                       该活动无图片
                                   </div>
                                    <img
                                        v-else
                                        v-for="(item, index) in row.picture"
                                        :key="index"
                                        :src="item"
                                        class="imgs"  
                                        alt="图片失效"
                                    />
                                </template>
                            </el-table-column>

                            <el-table-column
                                label="操作"
                                width="100"
                                align="center"
                                fixed="right"
                            >
                                <template slot-scope="{ row }">
                                    {{ computedFlowerStatus(row.status) }}
                                    <br />
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        v-if="
                                            row.status == 0 || row.status == 2
                                        "
                                        @click="yes(row)"
                                        >同意发布</el-button
                                    >
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        v-if="row.status == 1"
                                        @click="no(row)"
                                        >取消发布</el-button
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
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //导入活动花絮相关接口
    import {
        activityFlowerList,
        activityFlowerVerify
    } from '@/api/application/secondClass/index'
    import { transformDate } from '@/utils/gather'
    import {
        trainingProgramDetail,
        trainingProgramList,
        trainingProgramId
    } from '@/api/application/secondClass/trainingProgram'
    import {
        schoolYearList,
        schoolYearMulti
    } from '@/api/application/secondClass/schoolYear'
    import {
        courseId,
        coursePost,
        courstPut,
        courseDelete
    } from '@/api/application/secondClass/course'
    import { getDict } from '@/api/application/secondClass/dict/type.js'

    import horwheel from 'horwheel'

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
                count:0,
                timer:0,
                maxLength: 0,
                flocculus: [],
                queryParams: {
                    totalCount: 0,
                    totalPage: 0,
                    pageNum: 1,
                    pageSize: 10,
                },
                queryList: {
                    userName: '',
                    nickName: '',
                    status: '',
                    createStartTime: '',
                    createEndTime: ''
                },
                flowerList: [],
                dict_sc_activity_flower_status: [],
                //DateTimePicker
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 7
                                )
                                picker.$emit('pick', [start, end])
                            }
                        },
                        {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 30
                                )
                                picker.$emit('pick', [start, end])
                            }
                        },
                        {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 90
                                )
                                picker.$emit('pick', [start, end])
                            }
                        }
                    ]
                },
                value2: ''
            }
        },
        computed: {
            computedLength() {
                // return this.flocculus
                return this.maxLength * 150 + ''
            },
            //取花絮状态计算方法
            computedFlowerStatus() {
                return value => {
                    // console.log(this.dict_sc_course_status,temp,333)
                    // console.log(value)
                    return this.dict_sc_activity_flower_status[value]?.dictLabel
                }
            }
        },

        methods: {
            refresh() {
                this.queryList = {
                    userName: '',
                    nickName: '',
                    status: '',
                    createStartTime: '',
                    createEndTime: ''
                }
                ;(this.value2 = ''), this.fuzzyQuery()
            },
            //模糊查询防抖
            debounceFuzzyQuery(func,delayTime){
                    clearTimeout(this.timer);
                    console.log(this.count,'搜索次数');
                    if(this.count==0)
                    {
                        func();
                        this.count++;
                    }else{
                        this.timer = setTimeout( ()=>{
                        func();
                        this.count++;
                        },delayTime )
                    }
            },
            yes(row) {
                this.alertDialog.call(this, '同意发布', {
                    confirm: () => {
                        let option = {
                            ids: row.id,
                            status: 1
                        }
                        console.log(option, '同意发布传去的数据')
                        activityFlowerVerify(option).then(value => {
                            console.log(value, '同意发布后端传来的数据')
                            this.msgSuccess(value.msg)
                            this.fuzzyQuery()
                        })
                    }
                })
            },
            no(row) {
                this.alertDialog.call(this, '取消发布', {
                    confirm: () => {
                        let option = {
                            ids: row.id,
                            status: 2
                        }
                        console.log(option, '取消发布传去的数据')
                        activityFlowerVerify(option).then(value => {
                            console.log(value, '取消发布后端传来的数据')
                            this.msgSuccess(value.msg)
                            this.fuzzyQuery()
                        })
                    }
                })
            },
            //操作分页触发的事件
            getList(option) {
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.fuzzyQuery()
            },
            initimgLength() {
                console.log('进入了initimgLength函数')

                this.flowerList.forEach(item => {
                    if (item.picture != null) {
                        this.maxLength = Math.max(
                            this.maxLength,
                            item.picture.length
                        )
                    } else {
                        this.maxLength = 1
                    }
                })

                console.log('this.maxLength:', this.maxLength)
            },
            fuzzyQuery() {
                let option = {
                    activityId: this.$route.params.aid,
                    userName: this.queryList.userName,
                    nickName: this.queryList.nickName,
                    status: this.queryList.status,
                    params: {
                        // createStartTime: this.queryList.createStartTime,
                        // createEndTime: this.queryList.createEndTime,
                    },
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize

                    // orderByColumn:'',
                    // isAsc:''
                }
                if (this.value2) {
                    option.params.createStartTime = transformDate(
                        this.value2
                    )[0]
                    option.params.createEndTime = transformDate(this.value2)[1]
                }
                console.log(option, 'fuzzyQuery发送的数据')
                this.getFlowerList(option)
            },
            getFlowerList(option) {
                this.loading = true
                activityFlowerList(option).then(value => {
                    console.log(value)
                    /** 总共多少条，总共多少页 */
                    this.queryParams.totalCount = value.total
                    // this.queryParams.pageSize = value.data.pageSize
                    // this.queryParams.totalPage = value.data.totalPage
                    // this.queryParams.currPage = value.data.currPage
                    this.queryParams.totalPage = Math.ceil(
                        this.queryParams.totalCount / this.queryParams.pageSize
                    )
                    this.flowerList = value.rows
                    console.log(this.flowerList, '传来的数据')
                    this.initimgLength()
                    this.loading = false
                })
            },
            initDict() {
                Promise.all([getDict('sc_activity_flower_status')]).then(
                    value => {
                        let tempArr = ['dict_sc_activity_flower_status']
                        tempArr.forEach((item, index) => {
                            this[item] = value[index].data
                        })
                    }
                )
            }
        },
        mounted() {
            // this.initimgLength()
            // let view = document.querySelector(
            //     '.msgTable .el-table__body-wrapper'
            // )
            // view && horwheel(view) && console.log(view)
            // new this.XScrollbar(view)
        },
        async created() {
            // 初始化字典
            this.initDict()

            /** 获得当前情况下的活动花絮管理列表 */
            this.fuzzyQuery()
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
    .erke-bottom {
        /* background-color: #fff; */

        overflow: hidden;
    }

    .erke-buttom-right {
        background-color: #fff;
        margin-left: 0px;
        height: calc(100vh - 140px);
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .operate >>> .el-input__inner[data-text] {
        width: 110px;
    }
    .operate >>> .el-date-editor {
        width: 250px;
    }
    .el-row {
        height: initial;
    }
    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
    }
    .imgs {
        width: 120px;
        height: 80px;
        margin: 0 10px;
    }
</style>
