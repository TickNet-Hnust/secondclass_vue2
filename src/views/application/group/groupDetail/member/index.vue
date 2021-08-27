<!--
 * @Descripttion: 培养方案详情
 * @Author: 林舒恒
 * @Date: 2021-06-03 16:39:52
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-17 09:44:31
-->
<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-foot">
                        <el-button
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            size="mini"
                            v-hasPermi="['system:user:add']"
                            @click="openAddDialog"
                            >新增</el-button
                        >

                        <el-button
                            type="warning"
                            plain
                            icon="el-icon-download"
                            size="mini"
                            v-hasPermi="['system:user:export']"
                            >导出</el-button
                        >
                        <el-tooltip
                            effect="dark"
                            content="清空查询条件"
                            placement="right"
                        >
                            <el-button
                                circle
                                icon="el-icon-refresh"
                            >
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>

                <div class="erke-bottom">
                    <div class="erke-buttom-left">
                        <el-menu
                            default-active=""
                            class="el-menu-vertical-demo"
                            @select="statusChanged"
                        >
                            <el-menu-item
                                index=""
                            >
                                <template slot="title">
                                    全部
                                    <span class="children">
                                         {{tabbarList.get('全部')}}
                                    </span>
                                </template>
                            </el-menu-item>
                            <el-menu-item
                                v-for="(item,index) in dict_ga_group_user_status"
                                :key="index"
                                :index="item.dictValue+''"
                            >
                                <template slot="title">
                                    {{item && item.dictLabel}}
                                    <span class="children">
                                        {{tabbarList.size!=0 && tabbarList.get(item.dictLabel)}}
                                    </span>
                                </template>
                            </el-menu-item>
                        </el-menu>
                        <!-- <ul>
                            <li
                                v-for="(item, index) in classificationList"
                                :key="index"
                                @click="renderPlanData(item.id)"
                            >
                                {{ item.name }}
                            </li>
                        </ul> -->
                    </div>
                    <div class="erke-buttom-right">
                        <div class="operate">
                            <el-form>
                                <el-row
                                    :gutter="10"
                                    style="flexWrap:wrap"
                                    type="flex"
                                    justify="space-around"
                                >
                                    <el-col :span="1" style="min-width:160px">
                                        <el-form-item
                                            label="姓名"
                                        >
                                            <el-input class="data-text" v-model="queryList.nickName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width:160px">
                                        <el-form-item
                                            label="学号"
                                        >
                                            <el-input class="data-text" v-model="queryList.userName"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:170px">
                                        <el-form-item
                                            label="性别"
                                        >
                                            <el-select
                                                v-model="queryList.sex"
                                                style="width:120px"
                                            >
                                                <el-option value="" label="全部"></el-option>
                                                <el-option 
                                                    v-for="(item,index) in dict_sys_user_sex"
                                                    :key="index"
                                                    :label="item.dictLabel"
                                                    :value="item.dictValue"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:200px">
                                        <el-form-item
                                            label="所在学院"
                                        >
                                            <el-select
                                                v-model="queryList.deptName"
                                                style="width:120px"
                                            >
                                                <el-option value="" label="全部"></el-option>
                                                <el-option 
                                                    v-for="(item,index) in deptList"
                                                    :key="index"
                                                    :label="item.deptName"
                                                    :value="item.deptId"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:200px">
                                        <el-form-item
                                            label="届次"
                                        >
                                            <el-input class="data-text" v-model="queryList.session"></el-input>
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="1" style="min-width:200px">
                                        <el-form-item
                                            label="群内分组"
                                        >
                                            <el-input class="data-text" v-model="queryList.fenzu"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:190px">
                                        <el-form-item
                                            label="群内职务"
                                        >
                                            <el-input class="data-text" v-model="queryList.job"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <!-- <el-col :span="1" style="min-width:270px">
                                        <el-form-item
                                            label="人员状态"
                                        >
                                            <el-select
                                                value="全部"
                                                style="width:120px"
                                            >
                                                <el-option value="全部"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col> -->

                                    <el-col :span="1" style="min-width:430px">
                                        <el-form-item
                                            label="加入时间"
                                        >
                                            <el-date-picker
                                                v-model="queryList.createTime"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                @change="createTimeChaned"
                                            >
                                                </el-date-picker>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:430px">
                                        <el-form-item
                                            label="退出时间"
                                        >
                                            <el-date-picker
                                                v-model="queryList.quitTime"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                @change="quitTimeChanged"
                                            >
                                                </el-date-picker>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:140px">
                                        <el-form-item
                                            label=""
                                        >
                                            <el-button
                                                size="mini"
                                                type="primary"
                                                @click="fuzzyQuery"
                                            >查询</el-button>
                                            <el-button
                                                size="mini"
                                                @click="reset"
                                            >重置</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                        <el-table
                            :data="members"
                        >
                            <el-table-column
                                label="ID"
                                prop="id"
                            ></el-table-column>

                            <el-table-column
                                label="姓名"
                                min-width="100"
                                show-overflow-tooltip
                                prop="nickName"
                            ></el-table-column>

                            <el-table-column
                                label="学号"
                                prop="userName"
                            ></el-table-column>

                            <el-table-column
                                label="性别"
                                prop="sex"
                            ></el-table-column>

                            <el-table-column
                                label="所在学院"
                                prop="deptName"
                            ></el-table-column>

                            <el-table-column
                                label="分组"
                                prop="fenzu"
                            ></el-table-column>

                            <el-table-column
                                label="群内职务"
                                prop="job"
                            ></el-table-column>

                            <el-table-column
                                label="届次"
                                prop="session"
                            ></el-table-column>

                            <el-table-column
                                label="状态"
                                min-width="100"
                                prop="status"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        round
                                        size="mini"
                                        :class="sureClass(scope.row.status)"
                                    >{{dict_ga_group_user_status.length!=0 && dict_ga_group_user_status[scope.row.status].dictLabel}}</el-button>
                                </template>
                            </el-table-column>

                            <el-table-column
                                label="加入时间"
                                min-width="130"
                                prop="createTime"
                            ></el-table-column>

                            <el-table-column
                                label="退出时间"
                                min-width="130"
                                prop="quitTime"
                            ></el-table-column>

                            <el-table-column
                                label="操作"
                                fixed="right"
                                min-width="120"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        v-if="[1,2,3,4].includes(scope.row.status)"
                                        type="text"
                                        size="mini"
                                        icon="el-icon-edit"
                                        @click="editDialog(scope.row)"
                                    >编辑</el-button>
                                    <el-button
                                        v-if="[3,4].includes(scope.row.status)"
                                        type="text"
                                        size="mini"
                                        icon="el-icon-delete"
                                    >清退</el-button>
                                    <el-button
                                        v-if="scope.row.status == 5"
                                        type="text"
                                        size="mini"
                                        icon="el-icon-refresh"
                                    >恢复</el-button>
                                    <el-button
                                        v-if="scope.row.status == 0"
                                        type="text"
                                        size="mini"
                                        icon="el-icon-edit-outline"
                                    >审核</el-button>
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
        <el-dialog
            :title="addDialog.title"
            :visible.sync="addDialog.open"
            width="800px"
            class="memberAddDialog"
            >
            <el-form label-width="100px" label-position="left">
                <el-form-item label="学号-姓名" v-show="addDialog.title=='新增'">
                    <el-autocomplete
                        :debounce="500"
                        value-key="label"
                        v-model="fakeData.userId"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                        @select="handName"
                        ></el-autocomplete>
                </el-form-item>
                <el-form-item label="群内分组">
                    <el-input v-model="postData.fenzu"></el-input>
                </el-form-item>
                <el-form-item label="群内职务">
                    <el-input v-model="postData.job"></el-input>
                </el-form-item>
                <el-form-item label="届次">
                    <el-input v-model="postData.session"></el-input>
                </el-form-item>
                <el-form-item label="人员状态">
                    <el-radio-group v-model="postData.status">
                        <el-radio-button
                            v-for="(item,index) in dict_ga_group_user_status"
                            :key="index"
                            :label="item.dictValue"
                        >{{item.dictLabel}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addMember">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getDict,
        memberList,
        memberPut,
        memberInfo,
        guidanceList,
        utilListByName,
        memberPost
    } from '@/api/application/secondClass/index'

    import {
        transformDate
    } from '@/utils/gather.js'
    export default {
        name: 'detail',
        data() {
            return {
                deptList:[],//部门列表
                dict_sys_user_sex:[],
                dict_ga_group_user_status:[],
                tabbarList:new Map, //map对象
                members:[],//表格人员
                fakeData:{
                    userId:'',
                },
                postData:{
                    userId: '',
                    fenzu:'',
                    groupId:this.$route.params.gid,
                    job:'',
                    session:'',
                    status:'',
                },
                addDialog:{
                    title:'',
                    open:false
                },
                queryList:{
                    groupId: this.$route.params.gid,
                    nickName: '',
                    userName: '',
                    sex: '',
                    deptName: '',
                    session: '',
                    fenzu: '',
                    job: '',
                    status: '',
                    createTime:'',
                    beginCreateTime: '',
                    endCreateTime: '',
                    quitTime:'',
                    beginQuitTime:'',
                    endQuitTime: ''
                },
                queryParams: {
                    totalCount: 0,
                    totalPage: 0,
                    pageNum: 1,
                    pageSize: 10
                },
            }
        },
        computed: {
        },
        methods: {
            statusChanged(index) {
                console.log(index)
                this.queryList.status = index
                this.fuzzyQuery()
            },
            createTimeChaned(value) {
                const fuckMan = transformDate(value)
                this.queryList.beginCreateTime = fuckMan[0]
                this.queryList.endCreateTime = fuckMan[1]
            },
            quitTimeChanged(value) {
                const fuckMan = transformDate(value)
                this.queryList.beginQuitTime = fuckMan[0]
                this.queryList.endQuitTime = fuckMan[1]
            },
            sureClass(cellValue) {
                if (cellValue == 2) {
                    //ing
                    return 'textGreen'
                } else if (cellValue == 1) {
                    //yes
                    return 'textBlue'
                } else if (cellValue == 0) {
                    //no
                    return 'textRed'
                } else {
                    return 'textPlain'
                }
            },
            editDialog(row) {
                let fuckRow = {...row}
                console.log(fuckRow,'准备编辑的数据')
                this.addDialog.title = '修改'
                this.addDialog.open = true
                //id 与userid有差别
                this.postData = fuckRow
                
            },
            addMember() {
                let state = this.addDialog.title =='新增' ? memberPost : memberPut
                console.log(this.postData)
                state(this.postData).then(value => {
                    console.log(value)
                    this.msgSuccess('修改成功')
                    this.fuzzyQuery()
                    this.addDialog.open = false
                })
            },
            /**
             * @description: 姓名改变
             */            
            handName(item,k) {
                console.log(item,item.value)
                this.postData.userId = item.value
            },
            /**
             * @description: 姓名原创搜索
             * @param {*} qs
             * @param {*} cb
             */            
            querySearchAsync(qs,cb) {
                if(qs) {
                    utilListByName({name:qs}).then(value => {
                        console.log(value)
                        cb(value.data.map(item =>({
                            label: `${item.userName}-${item.nickName}`,
                            value: item.userId
                        })))
                    })
                    return 
                }
                cb([])
            },
            openAddDialog() {
                this.addDialog.title='新增'
                this.addDialog.open = true
                this.reset()
            },
            getList(option) {
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.fuzzyQuery()
            },
            /**
             * @description: 获得成员列表
             * @param {*} option
             */            
            getMemberList(option) {
                memberList(option).then(value => {
                    console.log(value,777)
                    this.queryParams.totalPage = Math.ceil(this.queryParams.totalCount / this.queryParams.pageSize)
                    this.members = value.rows
                })
            },
            cancel() {
                this.addDialog.open = false
            },
            reset() {
                this.queryList = {
                    groupId: this.$route.params.gid,
                    nickName: '',
                    userName: '',
                    sex: '',
                    deptName: '',
                    session: '',
                    fenzu: '',
                    job: '',
                    status: '',
                    createTime:'',
                    beginCreateTime: '',
                    endCreateTime: '',
                    quitTime:'',
                    beginQuitTime:'',
                    endQuitTime: ''
                }
                this.postData={
                    userId: '',
                    fenzu:'',
                    groupId:this.$route.params.gid,
                    job:'',
                    session:'',
                    status:'',
                    userId:''
                }
                this.fuzzyQuery()
            },
            fuzzyQuery() {
                let option = {
                    groupId: this.$route.params.gid,
                    nickName: this.queryList.nickName,
                    userName: this.queryList.userName,
                    sex: this.queryList.sex,
                    deptName: this.queryList.deptName,
                    session: this.queryList.session,
                    fenzu: this.queryList.fenzu,
                    job: this.queryList.job,
                    status: this.queryList.status,
                    pageNum: this.queryParams.pageNum,
                    pageSize:this.queryParams.pageSize
                }
                if(this.queryList.createTime) {
                    option.params = {}
                    option.params.beginCreateTime = this.queryList.beginCreateTime,
                    option.params.endCreateTime = this.queryList.endCreateTime
                }
                if(this.queryList.quitTime) {
                    option.params = {}
                    option.params.beginQuitTime = this.queryList.beginQuitTime
                    option.params.endQuitTime = this.queryList.endQuitTime
                }
                console.log(option)
                this.getMemberList(option)
            },
            initDict() {
                Promise.all([
                    getDict('ga_group_user_status'),
                    getDict('sys_user_sex'),
                    getDict('ga_group_user_status')
                ]).then(value => {
                    let tempArr = [
                        'dict_ga_group_user_status',
                        'dict_sys_user_sex',
                        'dict_ga_group_user_status'
                    ]
                    tempArr.forEach((item,index) => {
                        this[item] = value[index].data
                    })
                })
            }
        },
        async created() {
            this.initDict()
            this.fuzzyQuery()
            // this.getMemberList()
            memberInfo({groupId:this.$route.params.gid}).then(value => {
                this.tabbarList = new Map(Object.entries(value.data))
                this.queryParams.totalCount = this.tabbarList.get('全部')
                console.log(this.tabbarList)
            })
            guidanceList().then(value => {
                console.log(value)
                this.deptList = value.rows
            })
        },
        async beforeMount() {},
        async mounted() {}
    }
</script>

<style scoped>
    .erke-top {
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
        width: 180px;
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
    .erke-buttom-left {
        width: 220px;
        float: left;
        padding: 16px;
        height: calc(100vh - 220px);
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .erke-buttom-right {
        background-color: #fff;
        margin-left: 225px;
        height: calc(100vh - 220px);
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: auto;
    }
    .operate >>> .el-col {
        height: 58px;
    }
    .el-input {
        width: 200px;
    }

    .el-form .el-row {
        height: initial;
    }
    .el-input.data-text,
    .el-input.data-text >>> .el-input__inner {
        width: 110px;
    }
    .textBlue {
        color: #1890ff;
    }
    .textGreen {
        color: #54d7b4;
    }
    .textRed {
        color: #de3c50;
    }
    .textGray {
        color: #808080;
    }
    .father {
        position: relative;
    }
    .children {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>
