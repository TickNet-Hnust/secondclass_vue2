<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <div class="erke-top">
                    <div class="erke-top-foot">
                        <el-row :gutter="20">
                            <el-col :span="1" style="min-width:140px">
                                <el-button icon="el-icon-plus" type="primary"
                                @click="managePrizeOpenDialog"    
                                >奖项管理</el-button>
                            </el-col>
                            <el-col :span="1" style="min-width:190px">
                                <el-input v-model="prizeType">
                                    <template slot="prepend">
                                        奖项种类：
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="min-width:190px">
                                <el-input v-model="prizeNumber">
                                    <template slot="prepend">
                                        奖项数量：
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="min-width:190px">
                                <el-input v-model="prizePerson">
                                    <template slot="prepend">
                                        获奖人数：
                                    </template>
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div class="erke-bottom">
                    <div class="erke-buttom-left">
                        <el-menu
                            default-active=""
                            class="el-menu-vertical-demo"
                            @select="handleSelect"
                        >
                            <el-menu-item
                                index=''
                            >
                                <span slot="title">全部 <span class="numbers">{{prizeNumber}}</span></span>
                            </el-menu-item>

                            <el-menu-item
                                v-for="(item, index) in tabInfo" :key="index"
                                :index="index + ''"
                                 
                            >
                            <span slot="title" >{{ item.prizeType }} <span class="numbers">{{item.prizeNumber}}</span> </span>
                            </el-menu-item>

                        </el-menu>
                    </div>
                    <div class="erke-buttom-right">
                        <div class="operate">
                            <el-form :inline="true" class="demo-form-inline">
                                <el-row
                                    :gutter="0"
                                    type="flex"
                                    justify="space-around"
                                    style="flexWrap:wrap"
                                >
                                   <el-col :span="1" style="min-width:80px;" >
                                    <el-tooltip 
                                        class="item" 
                                        effect="dark" 
                                        content="清空查询条件" 
                                        placement="right">
                                    <el-button
                                        circle
                                        icon="el-icon-refresh"
                                        @click="refresh"
                                    >
                                    </el-button>
                                    </el-tooltip>
                                </el-col> 

                                    <el-col :span="1" style="min-width:90px">
                                        <el-form-item label="">
                                            <a-dropdown>
                                                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                                操作 <a-icon type="down" />
                                                </a>
                                                <a-menu slot="overlay">
                                                <a-menu-item>
                                                    <a href="javascript:;" @click="PrizeRegistration">发放登记</a>
                                                </a-menu-item>
                                                <a-menu-item>
                                                    <a href="javascript:;">导出</a>
                                                </a-menu-item>
                                                <a-menu-item>
                                                    <a href="javascript:;">排序</a>
                                                </a-menu-item>
                                                </a-menu>
                                            </a-dropdown>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="姓名:">
                                            <el-input data-text
                                            placeholder="姓名"
                                            v-model="queryList.nickName"
                                            @input="fuzzyQuery">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="学号:">
                                            <el-input data-text
                                            placeholder="学号"
                                            v-model="queryList.userName"
                                            @input="fuzzyQuery"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <!-- <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="奖项:">
                                            <el-input data-text
                                            placeholder="奖项"
                                            v-model="queryList.prizeType"
                                            @input="fuzzyQuery"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col> -->

                                    <el-col :span="1" style="min-width:165px">
                                        <el-form-item label="奖品:">
                                            <el-input data-text
                                            placeholder="奖品"
                                            v-model="queryList.prizeName"
                                            @input="fuzzyQuery"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="1" style="min-width:300px">
                                        <el-form-item label="发放时间:">
                                            <el-date-picker
                                                v-model="value2"
                                                type="datetimerange"
                                                :picker-options="pickerOptions"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                align="right"
                                                @change="prizeDateChange">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                             
                                </el-row>
                            </el-form>
                        </div>
                        
                         <el-table
                            :data="prizeList"
                            v-loading="loading"
                            class="enrollMainTable"
                        >
                            <el-table-column type="selection" min-width="55">

                            </el-table-column>

                            <el-table-column
                                prop="id"
                                label="ID"
                                min-width="50"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="nickName"
                                label="姓名"
                                min-width="80"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="userName"
                                label="学号"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="className"
                                label="所在班级"
                                min-width="120"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="groupName"
                                label="群组"
                                min-width="120"
                                
                            >
                            </el-table-column>

                             <el-table-column
                                prop="prizeType"
                                label="奖项"
                                min-width="120"
                                
                            >
                            </el-table-column>

                            <el-table-column
                                prop="prizeName"
                                label="奖品"
                                min-width="120"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="number"
                                label="发放数量"
                                min-width="100"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="deliverUserName"
                                label="发放人"
                                min-width="120"
                            >
                            </el-table-column>   
                               

                            <el-table-column                
                                prop="createTime"
                                label="发放时间"
                                min-width="120"                          
                            >
                            </el-table-column>


                            <el-table-column
                                prop="operate"
                                label="操作"
                                fixed="right"
                                width="110"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-s-check"
                                        @click="updatePrize(scope.row)"
                                        >修改</el-button
                                    >
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-s-check"

                                        >删除</el-button
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
    
     <!-- 奖项管理会话框 -->
        <el-dialog
            :title="managePrizeDialog.title"
            :visible.sync="managePrizeDialog.open"
            width="915px"
            append-to-body
            class="managePrizeDialog"
        >
            <el-table :data="managePrizeDialogList" height="350" stripe>
                    <template v-slot:empty>
                        暂无新增数据，点击左上角 + 号新增
                    </template>
                    <el-table-column
                        lable="sdf"
                        width="40"
                        :render-header="renderHeader"
                    >
                        <template slot-scope="scope">
                            <span
                                @click="
                                    deletePrizeDialog(scope.row, scope.$index)
                                "
                                class="addOrMinus"
                                >-</span
                            >
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="sort" label="排序" width="80">
                        <template slot-scope="scope">
                            <el-input
                                class="sortInput"
                                v-model="scope.row.sort"
                            ></el-input>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        prop="sort"
                        label="排序"
                        min-width="60"
                    >
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.sort"
                                class="nameOfPlan"
                            >
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="type"
                        label="奖项"
                        min-width="150"
                    >
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.type"
                                class="nameOfPlan"
                            >
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="name"
                        label="奖品"
                        min-width="150"
                    >
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.name"
                                class="nameOfPlan"
                            >
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="number"
                        label="数量"
                        min-width="50"
                    >
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.number"
                                class="nameOfPlan"
                            >
                            </el-input>
                        </template>
                    </el-table-column>   
                   
                </el-table>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelManagePrizeOpenDialog">关闭</el-button>
                <el-button type="primary" @click="multiPrizeMange">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog
            :title="addPrizeDialogList.title"
            :visible.sync="addPrizeDialogList.open"
            width="915px"
            append-to-body
            class="addDetailDialog"
        >
          
          <el-form ref="form" :model="form" label-width="300px">
                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                       奖项：
                    </el-col>
                    <el-col :span="18">
                       <el-select
                        v-model="addPrizeDialogList.data.prizeType"
                        class="shoutInput"
                        @change="filterManagePrizeDialogList"
                        >
                            <el-option
                                v-for="(item,index) in tabInfo"
                                :key="index"
                                :label="item.prizeType"
                                :value="item.prizeType"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                       奖品：
                    </el-col>
                    <el-col :span="18">
                       <el-select
                        v-model="addPrizeDialogList.data.prizeName"
                        class="shoutInput"
                        @change="filterManagePrizeDialogList2"
                        >
                            <el-option
                                v-for="(item,index) in managePrizeDialogList2"
                                :key="index"
                                :label="item.name"
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                       数量：
                    </el-col>
                    <el-col :span="18">
                       <el-input
                            v-model="addPrizeDialogList.data.number"
                            style="width: 200px;"
                        ></el-input>
                    </el-col>
                </el-row>

                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                       发放对象：
                    </el-col>
                    <el-col :span="18">
                       <el-input
                            v-model="addPrizeDialogList.data.userId"
                            style="width: 200px;"
                        ></el-input>
                    </el-col>
                </el-row>

                <el-row style="margin-bottom:10px">
                    <el-col :span="6">
                       发放人：
                    </el-col>
                    <el-col :span="18">
                       <el-input
                            v-model="addPrizeDialogList.data.deliverUserId"
                            style="width: 200px;"
                        ></el-input>
                    </el-col>
                </el-row>

                <el-row  style="margin-bottom:10px">
                    <el-col :span="6">
                       发放时间：
                    </el-col>
                    <el-col :span="18">
                       <el-date-picker
                            v-model="addPrizeDialogList.data.createTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            >
                        </el-date-picker>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button >关闭</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>

         </el-dialog>

    </div>
</template>

<script>
    //导入活动奖项相关接口
     import {
        activityPrizeRecord,
        activityPrizeRecordList,
        activityPrizeManageList,
        activityPrizeManageMulti,
        activityPrizeRecordPost,
    } from '@/api/application/secondClass/activity'

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

    import formaterDate from '@/utils/formatDate.js'
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
                form:{},
                action:'',
                prizeType:'',
                prizePerson: '',
                prizeNumber: '',
                tabInfo : '',
                queryParams: {
                    totalCount: 0,
                    totalPage: 0,
                    pageNum: 1,
                    pageSize: 5,
                },
                queryList:{
                    userName:'',
                    nickName: '',
                    prizeName:'',
                    prizeType: '',  
                    // params:{
                    beginCreateTime:'',
                    endCreateTime:'',
                },
                prizeList:[],

                managePrizeDialog:{
                    title:'奖项管理',
                    open:false,
                },
                //奖项管理列表
                managePrizeDialogList:[],
                managePrizeDialogListBak:[],
                //奖项管理要删除的ids
                deleteIds:[],
                //DateTimePicker
                pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
                },
                value2: '',
                value1: '',
                addPrizeDialogList:{
                    title: '',
                    open: false,
                    data:{
                        activityId:this.$route.params.aid,
                        prizeId:'',
                        prizeType:'',
                        prizeName:'',
                        number:'',
                        userId:'',
                        deptId:'',
                        deliverUserId:'',
                        createTime:'',
                    }
                },
                //managePrizeDialogList第一次过滤后的数组
                managePrizeDialogList2:[],
            }
        },
        methods:{
            handleSelect(index){
                console.log(this.tabInfo[index].prizeType,'左下角点击的奖项');
                if (index != '') {
                    this.queryList.prizeType = this.tabInfo[index].prizeType
                } else {
                    this.queryList.prizeType = ''
                }
                this.fuzzyQuery()
            },
            prizeUpdateDateChange(){
               if(value1!=null) 
               this.addPrizeDialogList.data.createTime = this.value1;
            },
            //修改和新增的保存按钮
            save(){
               //要提交的数据
               console.log(this.addPrizeDialogList.data,'点击保存要发送的数据');
               activityPrizeRecordPost(this.addPrizeDialogList.data).then(value=>{
                   console.log(value,'发布登记修改新增接口返回的数据');
               })
            },
            filterManagePrizeDialogList(value){
               console.log(value,'选中的奖项值！！！')
               this.managePrizeDialogList.forEach((item,index)=>{
                   if(item.type==value){
                       this.managePrizeDialogList2.push(item);
                   }
               })
               console.log(this.managePrizeDialogList2,'managePrizeDialogList第一次过滤后的数组');
            },
            filterManagePrizeDialogList2(value){
               console.log(value,'经过第一次过滤后选中的奖品值！！！')
               this.managePrizeDialogList2.forEach((item,index)=>{
                   if(item.name==value){
                       this.addPrizeDialogList.data.prizeId=item.id
                       console.log(this.addPrizeDialogList.data.prizeId,'两次过滤选中的奖项id！！！');
                   }
               })
               
            },
            //点击修改
            updatePrize(row) {
                this.addPrizeDialogList.title = '修改奖项记录'
                console.log(row,'点击修改奖项传来的数据')
                this.renderState(row)        
            },
            renderState(row){
               this.addPrizeDialogList.data = {
                    id:row.id,
                    activityId:this.$route.params.aid,
                    prizeId:row.prizeId,
                    prizeType:row.prizeType,
                    prizeName:row.prizeName,
                    number:row.number,
                    userId:row.userId,
                    deptId:row.deptId,  
                    deliverUserId:row.deliverUserId,
                    createTime:row.createTime,
               }
               this.addPrizeDialogList.open = true
            },
            //点击发放登记按钮
            PrizeRegistration(){
                 console.log('我是发放登记！');
                 this.reset()
                 this.addPrizeDialogList.title='发放登记'
                 this.addPrizeDialogList.open = true
               
            },
            // 表单重置
            reset() {
                this.addPrizeDialogList.data = {
                        activityId:this.$route.params.aid,
                        prizeId:'',
                        prizeType:'',
                        prizeName:'',
                        number:'',
                        userId:'',
                        deptId:'',
                        id:'',
                        deliverUserId:'',
                        createTime:'',
                }
                this.value1 = ''

            },
            //清空查询条件
            refresh() {
                this.queryList={
                    userName:'',
                    nickName: '',
                    prizeName:'',
                    prizeType: '',  
                    // params:{
                    beginCreateTime:'',
                    endCreateTime:'',
                }
                this.value2='',
                this.fuzzyQuery()
            },
            //筛选报名时间触发的事件
            prizeDateChange(){
               //发送时间的格式还需要调整一下
               if(this.value2!=null)
               {
                    this.queryList.beginCreateTime = this.value2[0];
                    this.queryList.endCreateTime = this.value2[1];
                    this.fuzzyQuery();
               }
            },
            /**
             * @description: 批量操作奖项管理
             */
            multiPrizeMange() {
                console.log(this.managePrizeDialogList)
                let isFull = this.managePrizeDialogList.every(item => {
                    return item.name && item.sort && item.type && item.number
                })
                if (!isFull) {
                    this.msgInfo('请填写完整信息')
                    return
                }
                activityPrizeManageMulti({
                    deleteIds: this.deleteIds,
                    prizeManageList: this.managePrizeDialogList
                }).then(value => {
                    
                    console.log(value,'批量修改接口返回的数据！！！');
                    this.msgSuccess(value.msg);
                    this.fuzzyQuery();
                    this.managePrizeDialog.open = false
                })
            },
            /**
             * @description: 奖项管理 - 
             * @param {*} row
             * @param {*} index
             */            
            deletePrizeDialog(row, index) {
                this.alertDialog.call(this, '预删除', {
                    confirm: () => {
                        this.deleteIds.push(row.id)
                        console.log(this.deleteIds,'预删除ids数组')
                        this.managePrizeDialogList.splice(index, 1)
                    }
                })
            },
            managePrizeOpenDialog(){
               this.managePrizeDialog.open = true
            },
            cancelManagePrizeOpenDialog(){
                this.managePrizeDialog.open = false
                this.deleteIds=[];
                // this.managePrizeDialogList = this.managePrizeDialogListBak;
                this.managePrizeDialogList = this.managePrizeDialogListBak.map(item => ({...item}))
                
            },
            /**
             * @description: 新增 表头 渲染+
             * @param {*} h
             */

            renderHeader(h) {
                return h(
                    'span',
                    {
                        class: 'addOrMinus',
                        on: {
                            click: this.addPrizeDialog
                        }
                    },
                    '+'
                )
            },
            /**
             * @description: 奖项管理 + 
             */            
            addPrizeDialog() {
                this.managePrizeDialogList.push({
                    sort: '',
                    type: '',
                    name:'',
                    number:'',
                })
                // this.preAddSchoolYear()
                // this.$nextTick(() => {
                //     let tableBody = document.querySelector(
                //         '.managerDialog .el-table__body-wrapper'
                //     )
                //     tableBody.scrollTop = 9999
                // })
            },
            //操作分页触发的事件
            getList(option){
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.fuzzyQuery()
            },
            /**获得当前情况下的报名管理列表  模糊查询 */
            fuzzyQuery() {
                let option = {
                    activityId:this.$route.params.aid,
                    userName:this.queryList.userName,
                    nickName: this.queryList.nickName,
                    prizeName: this.queryList.prizeName,
                    prizeType: this.queryList.prizeType,  
                    // params:{
                    beginCreateTime:this.queryList.beginCreateTime,
                    endCreateTime:this.queryList.endCreateTime,
                    // },
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize,
                    // orderByColumn:'',
                    // isAsc:''
                }
                console.log(option,'发送的数据')
                this.getPrizeList(option)
            },
            getPrizeList(option){
                 this.loading = true
                 activityPrizeRecordList(option).then(value => {
                    /** 总共多少条，总共多少页 */
                    this.queryParams.totalCount  = value.total
                    // this.queryParams.pageSize = value.data.pageSize
                    // this.queryParams.totalPage = value.data.totalPage
                    // this.queryParams.currPage = value.data.currPage
                    this.queryParams.totalPage = Math.ceil(this.queryParams.totalCount/this.queryParams.pageSize);
                    this.prizeList = value.rows;
                    console.log(this.prizeList,'传来的数据');
                    this.loading = false
                    
                })
            }, 

            getActivityPrizeRecord(option){
              activityPrizeRecord(option).then(value=>{
                  console.log(value,'活动奖项总信息');
                  this.prizeType = value.data.prizeType;
                  this.prizePerson = value.data.prizePerson;
                  this.prizeNumber = value.data.prizeNumber;
                  this.tabInfo = value.data.tabInfo;
              })
            },
            getPrizeManageList(option){
                 activityPrizeManageList(option).then(value=>{
                     this.managePrizeDialogList = value.data;

                     this.managePrizeDialogListBak = value.data.map(item => ({...item}));
                    // this.managePrizdeDialogListBak=this.managePrizeDialogList.slice(0)
                     console.log(this.managePrizeDialogList,'奖项信息列表')
                 })
            }
        },
        async created() {
            //初始化字典
            // this.initDict()

            //获取活动奖项总信息
            this.getActivityPrizeRecord({
                activityId: this.$route.params.aid
            })
            /** 获得当前情况下的奖项管理列表 */
            this.fuzzyQuery()

            this.getPrizeManageList({
                activityId: this.$route.params.aid
            })
            
        },
        

    }
</script>

<style scoped>
    .erke-top {
        /* height: 120px; */
        padding: 30px;
        margin: 0 0 10px 0;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .erke-bottom {
        /* background-color: #fff; */

        overflow: hidden;
    }
    .erke-buttom-left {
        width: 340px;
        float: left;
        padding: 16px;
        height: calc(100vh - 250px);
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .erke-buttom-left ul {
        margin: 0;
        padding: 0;
    }
    .erke-buttom-left li {
        position: relative;
        list-style: none;
        font-size: 13px;
        /* width: px; */
        height: 40px;
        padding: 0 20px;
        color: #979797;
        line-height: 40px;
        border-radius: 5px;
        border-bottom: 1px dashed #ddd;
    }
    .erke-buttom-left li:hover {
        background-color: #e6f7ff;
        color: #0084d1;
        cursor: pointer;
    }
    .erke-buttom-left li span {
        position: absolute;
        width: 20px;
        text-align: center;
        top: 0;
    }
    .erke-buttom-left .numbers {
        position: absolute;
        right: -276px;
        width: 20px;
        text-align: center;
        top: 0;
    }
    .erke-buttom-right {
        overflow: auto;
        background-color: #fff;
        margin-left: 350px;
        height: calc(100vh - 250px);
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .labelSpan {
        display: inline-block;
        margin-right: 50px;
    }
    .textSpan {
        color: #888;
    }
    .erke-top-foot {
        font-size: 14px;
    }
    .operate >>> .el-input__inner[data-text] {
        width: 110px;
    }
    .operate >>> .el-date-editor {
        width: 160px;
    }
    .el-row {
        height: initial;
    }
</style>
