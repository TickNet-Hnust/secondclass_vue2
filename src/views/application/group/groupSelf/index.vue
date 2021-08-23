<!--
 * @Descripttion: 培养方案详情
 * @Author: 林舒恒
 * @Date: 2021-06-03 16:39:52
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-18 19:27:14
-->
<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-head">
                        <span> <i>✈</i> 群组管理</span>
                    </div>
                    <div class="erke-top-foot">

                        <div style="margin-bottom: 10px" class="noneInput">
                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                                :value="allGroup.groupTotal"
                            >
                                <template slot="prepend">群组总数</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                                :value="allGroup.groupYes"
                            >
                                <template slot="prepend">有效群组</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                                :value="allGroup.groupVerify"
                            >
                                <template slot="prepend">申请中</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                                :value="allGroup.groupNo"
                            >
                                <template slot="prepend">已解散</template>
                            </el-input>
                        </div>

                        <el-button
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            size="mini"
                            @click="openAddDialog"
                            >新增</el-button
                        >

                        <el-button
                            type="warning"
                            plain
                            icon="el-icon-download"
                            size="mini"
                            v-hasPermi="['system:user:export']"
                            >导入</el-button
                        >
                        <el-button
                            type="info"
                            plain
                            icon="el-icon-download"
                            size="mini"
                            v-hasPermi="['system:user:export']"
                            >导出</el-button
                        >
                        <el-button
                            type="info"
                            plain
                            icon="el-icon-sort"
                            size="mini"
                            v-hasPermi="['system:user:export']"
                            >排序</el-button
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
                        <el-tabs>
                            <el-tab-pane label="根据分类">
                                <el-menu
                                    default-activt=""
                                    @select="typeChanged"
                                >
                                    <el-menu-item index="" class="father">
                                        <span slot="title">
                                            全部
                                            <span class="children">
                                                {{allGroup.groupTotal}}
                                            </span>
                                        </span>
                                    </el-menu-item>
                                    <el-menu-item
                                        class="father"
                                        v-for="(item,index) in allGroup.tabByType"
                                        :key="index"
                                        :index="item.typeId + ''"
                                    >
                                        <span slot="title">
                                            {{item.typeName}}
                                            <span class="children">
                                                {{item.number}}
                                            </span>
                                        </span>
                                    </el-menu-item>
                                    <!-- <el-menu-item>
                                        <span slot="title">社团与协会</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">年级组</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">校学生会组织</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">院学生会组织</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">校团委</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">院团委</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">校社联</span>
                                    </el-menu-item> -->
                                </el-menu>
                            </el-tab-pane>
                            <el-tab-pane label="根据指导单位">
                                <el-menu
                                    default-activt=""
                                    @select="parentChanged"
                                >
                                    <el-menu-item
                                        index=""
                                        class="father"
                                    >
                                        <span slot="title">
                                            全部
                                            <span class="children">
                                                {{allGroup.groupTotal}}
                                            </span>
                                        </span>
                                    </el-menu-item>
                                    <el-menu-item
                                        class="father"
                                        v-for="(item,index) in allGroup.tabByParent"
                                        :key="index"
                                        :index="item.parentId+''"
                                    >
                                        <span slot="title">
                                            {{item.parentName}}
                                            <span class="children">
                                                {{item.number}}
                                            </span>
                                        </span>
                                    </el-menu-item>
                                    <!-- <el-menu-item>
                                        <span slot="title">土木工程学院</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">机械工程学院</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <span slot="title">化学化工学院</span>
                                    </el-menu-item> -->
                                
                                </el-menu>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="erke-buttom-right">
                        <div class="operate">
                            <el-form>
                                <el-row
                                    :gutter="10"
                                    style="flexWrap:wrap"
                                    type="flex"
                                    justify="start"
                                >
                                    <el-col :span="1" style="min-width:280px">
                                        <el-form-item
                                            label="群组名称"
                                        >
                                            <el-input v-model="queryList.deptName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width:175px">
                                        <el-form-item
                                            label="群组ID"
                                        >
                                            <el-input class="data-text" v-model="queryList.deptId"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <!-- <el-col :span="1" style="min-width:280px">
                                        <el-form-item
                                            label="分类"
                                        >
                                            <el-select
                                                value="全部"
                                            >
                                                <el-option value="全部"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:310px">
                                        <el-form-item
                                            label="指导单位"
                                        >
                                            <el-select
                                                value="全部"
                                            >
                                                <el-option value="全部"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col> -->

                                    <el-col :span="1" style="min-width:200px">
                                        <el-form-item
                                            label="指导老师"
                                        >
                                            <el-input class="data-text" v-model="queryList.teacher"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:270px">
                                        <el-form-item
                                            label="状态"
                                        >
                                            <el-select
                                                v-model="queryList.status"
                                            >
                                                <el-option value="" label="全部"></el-option>
                                                <el-option 
                                                    v-for="(item,index) in dict_ga_group_status"
                                                    :key="index"
                                                    :value="item.dictValue"
                                                    :label="item.dictLabel"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:180px">
                                        <el-form-item
                                            label="负责人"
                                        >
                                            <el-input class="data-text" v-model="queryList.leader"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <!-- <el-col :span="1" style="min-width:210px">
                                        <el-form-item
                                            label="负责人学号"
                                        >
                                            <el-input class="data-text"></el-input>
                                        </el-form-item>
                                    </el-col> -->

                                    <el-col :span="1" style="min-width:480px">
                                        <el-form-item
                                            label="更新时间"
                                        >
                                            <el-date-picker
                                                v-model="queryList.updateTime"
                                                type="datetimerange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                @change="updateTimeChange"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:120px">
                                        <el-form-item
                                            label="推荐群组"
                                        >
                                            <el-switch 
                                                :value="!queryList.recommend"
                                                @change="queryList.recommend = Number(!$event)"
                                            ></el-switch>
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
                            :data="groupList"
                        >
                            <el-table-column
                                label="ID"
                                prop="deptId"
                            ></el-table-column>
                            <el-table-column
                                label="群组名称"
                                prop="deptName"
                            >
                                <template slot-scope="scope">
                                    <router-link
                                        class="textBlue"
                                        :to="
                                            '/application/group/groupDetail/' +
                                                scope.row.deptId
                                        "
                                        >{{ scope.row.deptName }}</router-link
                                    >
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="指导单位"
                                prop="parentName"
                            >
                            </el-table-column>
                            
                            <el-table-column
                                label="指导老师"
                                prop="teacher"
                            ></el-table-column>
                            
                            <el-table-column
                                label="负责人"
                                prop="leaderNickName"
                            ></el-table-column>

                            <el-table-column
                                label="学号"
                                prop="leaderUserName"
                            ></el-table-column>

                            <el-table-column
                                label="成员数"
                                prop="memberNumber"
                            ></el-table-column>

                            <el-table-column
                                label="状态"
                                prop="status"
                                :formatter="formatStatus"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        round
                                        :class="sureClass(scope.row.status)"
                                    >{{formatStatus(scope.row.status)}}</el-button>
                                </template>
                            </el-table-column>

                            <el-table-column
                                label="更新时间"
                                prop="updateTime"
                                min-width="120"
                            ></el-table-column>

                            <el-table-column
                                label="推荐群组"
                                prop="recommend"
                                :formatter="formatRecommend"
                            >
                                <template slot-scope="scope">
                                    <i 
                                        class="el-icon-check textGreen"
                                        v-if="scope.row.recommend!=null && scope.row.recommend"
                                    ></i>
                                </template>
                            </el-table-column>

                            <el-table-column
                                label="操作"
                                prop=""
                                fixed="right"
                                min-width="180"
                            >
                                <template slot-scope="scope">
                                    
                                    <el-button
                                        
                                        type="text"
                                        size="mini"
                                        icon="el-icon-edit"
                                        @click="editDialog(scope.row)"
                                    >编辑</el-button>
                                    <el-button
                                        type="text"
                                        size="mini"
                                        icon="el-icon-delete"
                                    >解散</el-button>
                                    <el-button
                                        v-if="scope.row.status == 1"
                                        type="text"
                                        size="mini"
                                        icon="el-icon-refresh"
                                        @click="refreshStatus(scope.row)"
                                    >启用</el-button>
                                    <el-button
                                        v-if="scope.row.status ==0"
                                        type="text"
                                        size="mini"
                                        icon="el-icon-video-pause"
                                        @click="pauseStatus(scope.row)"
                                    >停用</el-button>
                                        <!-- v-if="scope.row.status == 0" -->
                                    <el-button
                                        v-if="scope.row.status == 2"
                                        type="text"
                                        size="mini"
                                        icon="el-icon-edit-outline"
                                        @click="examStatus(scope.row)"
                                    >审核</el-button>
                                    <el-button
                                        v-if="scope.row.recommend == 0"
                                        type="text"
                                        size="mini"
                                        icon="el-icon-check"
                                        @click="recommend(scope.row)"
                                    >推荐</el-button>
                                    <el-button
                                        v-if="scope.row.recommend != 0"
                                        type="text"
                                        size="mini"
                                        icon="el-icon-close"
                                        @click="calcelRecommend(scope.row)"
                                    >取消推荐</el-button>
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
            width="700px"
            class="groupAddDialog"
            >
            <el-form label-width="100px" label-position="left">
                <el-form-item label="群组名称：" >
                    <el-input v-model="postData.deptName"></el-input>
                </el-form-item>
                <el-form-item label="分类：">
                    <el-select
                        v-model="fakeData.one"
                    >
                        <el-option
                            v-for="(item,index) in typeTreeList"
                            :key="index"
                            :label="item.name"
                            :value="index"
                        ></el-option>
                    </el-select>
                    ---
                    <el-select
                        v-model="fakeData.two"
                    >
                        <el-option
                            v-for="(item,index) in typeTreeList[fakeData.one] && typeTreeList[fakeData.one].children"
                            :key="index"
                            :label="item.name"
                            :value="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="指导单位：">
                    <el-select
                        v-model="postData.parentId"
                    >
                        <el-option
                            v-for="(item,index) in deptList"
                            :key="index"
                            :value="item.deptId"
                            :label="item.deptName"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="指导老师:">
                    
                    <el-autocomplete
                    :debounce="500"
                    value-key="label"
                    v-model="fakeData.teacher"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    @select="handName"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label="加入规则:">
                    <el-radio-group v-model="postData.joinRule">
                        <el-radio-button
                            v-for="(item,index) in dict_ga_group_join_rule"
                            :key="index"
                            :label="item.dictValue"
                        >{{item.dictLabel}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="推荐群组:">
                    <el-switch 
                        :value="Boolean(postData.recommend)"
                        @change="postData.recommend = Number($event)"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="群组头像：">
                    <el-upload
                    class="avatar-uploader"
                        :http-request="httpRequest"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                    >
                        
                        <i  class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="活动介绍：">
                    <editor
                        v-model="postData.introduce"
                        :min-height="192"
                    ></editor>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addGroup">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {
        getDict,

        groupList,
        groupInfo,
        groupPut,
        groupPost,
        groupId,
        groupTypeList,
        groupIdVerify,
        utilListCollege,
        utilListByName
    } from '@/api/application/secondClass/index'
    import {
        transformDate,
        filterGroupClassificationList
    } from '@/utils/gather.js'
    import { deptListByType } from '@/api/system/dept'
    import IMGURL_MIXINS from '@/mixins/upload.js'
    import Editor from '@/components/Editor'
    export default {
        name: 'detail',
        mixins: [IMGURL_MIXINS],
        components: {
            Editor
        },
        data() {
            return {
                dict_ga_group_status:[],
                dict_ga_group_recommend:[],
                dict_ga_group_join_rule:[],
                allGroup:{},
                deptList:[],
                typeTreeList:[],
                fakeData:{
                    one:0,
                    two:0,
                    teacher:''
                },
                postData:{
                    deptId:'',
                    deptName:'',
                    type: '',
                    parentId:'',
                    teacher: '',
                    joinRule:'',
                    recommend:'',
                    avatar:'',
                    introduce:''
                },
                queryList:{
                    parentId: '',//指导单位id
                    teacher: '',//指导老师
                    status:'',//状态,
                    recommend: '',//是否推荐
                    deptName: '',//群组名称
                    leader:'',
                    deptId: '',//群组id
                    type: '',//群组id
                    updateTime:'',
                    beginUpdateTime:'',
                    endUpdateTime:''
                },
                groupList:[],
                queryParams: {
                    totalCount: 10,
                    totalPage: 10,
                    pageNum: 1,
                    pageSize: 10
                },
                addDialog:{
                    title: '',
                    open:false
                }
            }
        },
        computed: {
        },
        methods: {
            formatRecommend(row,column,cellValue) {
                return cellValue!=null && this.dict_ga_group_recommend[cellValue]?.dictLabel
            },
            formatStatus(cellValue) {
                return cellValue!=null && this.dict_ga_group_status[cellValue]?.dictLabel
            },
            sureClass(cellValue) {
                if (cellValue == 0) {
                    //ing
                    return 'textGreen'
                } else if (cellValue == 1) {
                    //yes
                    return 'textPlain'
                } else if (cellValue == 2) {
                    //no
                    return 'textRed'
                } 
            },
            /**
             * @description: 取消推荐
             */            
            recommend(row) {
                this.alertDialog.call(this,'推荐',{
                    confirm:() =>{
                        groupId({id:row.deptId}).then(value => {
                            console.log(value,'ty')
                            value.data.recommend = 0
                            return value.data
                        }).then(value => {
                            console.log(value,'tm')
                            groupPut(value).then(value => {
                            this.msgSuccess('推荐成功')
                            this.fuzzyQuery()
                            })
                        })
                    }
                })
            },
            calcelRecommend(row) {
                this.alertDialog.call(this,'取消推荐',{
                    confirm:() =>{
                        groupId({id:row.deptId}).then(value => {
                            value.data.recommend = 1
                            return value.data
                        }).then(value => {
                            groupPut(value).then(value => {
                            this.msgSuccess('取消推荐成功')
                            this.fuzzyQuery()
                            })
                        })
                    }
                })
            },
            refreshStatus(row) {
                this.alertDialog.call(this,'启用',{
                    confirm:() =>{
                        groupIdVerify({
                            id:row.deptId,
                            status: 0
                        }).then(value => {
                            this.msgSuccess('启用成功')
                            this.fuzzyQuery()
                        })
                    }
                })
            },
            pauseStatus(row) {
                this.alertDialog.call(this,'停用',{
                    confirm:() =>{
                        groupIdVerify({
                            id:row.deptId,
                            status: 1
                        }).then(value => {
                            this.msgSuccess('停用成功')
                            this.fuzzyQuery()
                        })
                    }
                })
            },
            examStatus(row) {
                this.alertDialog.call(this,'审核',{
                    confirm:() =>{
                        groupIdVerify({
                            id:row.deptId,
                            status: 0
                        }).then(value => {
                            this.msgSuccess('审核成功')
                            this.fuzzyQuery()
                        })
                    }
                })
            },
            /**
             * @description: 根据分类改变了
             */            
            typeChanged(id) {
                this.queryList.type = id
                this.fuzzyQuery()
            },
            parentChanged(id) {
                this.queryList.parentId = id
                this.fuzzyQuery()
            },
            //时间选择器改变
            updateTimeChange(value) {
                if(!value) return 
                let fuckMan = transformDate(value)
                this.queryList.beginUpdateTime = fuckMan[0]
                this.queryList.endUpdateTime = fuckMan[1]
                console.log(fuckMan)
            },
            handName(item,k) {
                console.log(item,item.value,777)
                this.postData.teacher = item.value
            },
            querySearchAsync(qs,cb) {
                if(qs) {
                    utilListByName({name:qs}).then(value => {
                        console.log(value)
                        cb(value.data.map(item =>({
                            label: `${item.userName}-${item.nickName}`,
                            value: item.nickName
                        })))
                    })
                    return 
                }
                cb([])
            },
            getList(option) {
                console.log(option)
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.fuzzyQuery()
            },
            httpRequest(file) {
                this.getImgUrl(file).then(value => {
                    if (this.postData.avatar?.length)
                        this.postData.avatar += `;${value}`
                    else this.postData.avatar += `${value}`
                })
            },
            //点击编辑
            async editDialog(row) {
                await groupId({id:row.deptId}).then(value => {
                    console.log(value)
                    Object.keys(this.postData).forEach(item => {
                        this.postData[item] = value.data?.[item]
                    })
                    console.log(this.postData)
                })
                // console.log(row)
                this.addDialog.open = true
                this.addDialog.title = '编辑'
            },
            cancel() {
                this.reset()
                this.addDialog.open = false
            },
            /**
             * @description: 确定新增
             */            
            addGroup() {
                
                let state = this.addDialog.title == '新增' ? groupPost :groupPut
                if(state) {
                    this.postData.type = this.typeTreeList[this.fakeData.one].children[this.fakeData.two].id
                    this.postData.orderNum = 0
                    this.postData.ancestors = 0 + ',' + this.postData.parentId
                    this.postData.status = 2 //待审核
                } else {
                    
                }
                    console.log(this.postData)
                state(this.postData).then(value => {
                    console.log(value)
                    this.msgSuccess('操作成功')
                    this.addDialog.open = false
                    this.reset()
                    this.fuzzyQuery()
                })
            },
            openAddDialog() {
                // this.reset()
                this.addDialog.open = true
                this.addDialog.title = '新增'
            },
            closeAddDialog() {
                this.addDialog.open = false
            },
            /**
             * @description: 重置
             */            
            reset() {
                this.postData = {
                    deptName:'',
                    type: '',
                    parentId:'',
                    teacher: '',
                    joinRule:'',
                    recommend:'',
                    avatar:'',
                    introduce:''
                }
                this.queryList = {
                    parentId: '',//指导单位id
                    teacher: '',//指导老师
                    status:'',//状态,
                    leader: '',//负责人
                    recommend: '',//是否推荐
                    deptName: '',//群组名称
                    deptId: '',//群组id
                    type: '',//群组id
                    updateTime:'',
                    beginUpdateTime:'',
                    endUpdateTime:''
                }
                this.fuzzyQuery()
            },
            fuzzyQuery() {
                let option = {
                    parentId: this.queryList.parentId,
                    teacher: this.queryList.teacher,//指导老师
                    status:this.queryList.status,//状态,
                    leader: this.queryList.leader,//负责人
                    recommend: this.queryList.recommend,//是否推荐
                    deptName: this.queryList.deptName,//群组名称
                    deptId: this.queryList.deptId,//群组id
                    type: this.queryList.type,//群组id
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize
                }
                if(this.queryList.updateTime) {
                    option.params = {
                        beginUpdateTime: this.queryList.beginUpdateTime,
                        endUpdateTime: this.queryList.endUpdateTime
                    }
                }
                console.log(option)
                this.getGroupList(option)
            },
            getGroupList(option) {
                groupList(option).then(value => {
                    console.log(option,value,888)
                    this.groupList = value.rows
                    this.queryParams.totalCount = value.total
                    this.queryParams.totalPage = Math.ceil(value.total / this.queryParams.pageSize)
                })
            },
            initDict() {
                Promise.all([
                    getDict('ga_group_status'),
                    getDict('ga_group_recommend'),
                    getDict('ga_group_join_rule')
                ]).then(value => {
                    console.log(value)
                    let tempArr = [
                        'dict_ga_group_status',
                        'dict_ga_group_recommend',
                        'dict_ga_group_join_rule'
                    ]
                    tempArr.forEach((item,index) => {
                        this[item] = value[index].data
                    })
                })
            }
        },
        async created() {
            this.initDict()
            groupTypeList().then(value => {
                this.typeTreeList = filterGroupClassificationList(value.data)
                // this.fakeData.one = this.typeTreeList[0].id
                // this.fakeData.two = this.typeTreeList[0].chidlren[0].id
                console.log(value,'分类比诶')
            })
            groupInfo().then(value => {
                
                this.allGroup = value.data
            })
            utilListCollege().then(value => {
                this.deptList = value.data
            })
            this.fuzzyQuery()
            // this.getGroupList({pageNum:1,pageSize:10})
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
    .planExport {
        position: relative;
    }
    
    .el-form .el-row {
        height: initial;
    }
    .el-input.data-text,
    .el-input.data-text >>> .el-input__inner {
        width: 110px;
    }
    .operate >>> .el-input__inner[data-text] {
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
    .groupAddDialog >>> .el-dialog__body {
        max-height: 50vh;
        overflow: auto;
    }
    
</style>
