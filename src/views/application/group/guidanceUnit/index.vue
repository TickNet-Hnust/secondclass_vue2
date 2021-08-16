<!--
 * @Descripttion: 培养方案
 * @Author: 林舒恒
 * @Date: 2021-06-03 13:04:02
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-16 22:40:07
-->
<template>
    <div class="app-container">
        <div class="erke-top">
            <div class="erke-top-head">
                <span> <i>✈</i> 指导单位</span>
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
                        v-hasPermi="['system:user:export']"
                        >导出</el-button
                    >
                </el-col>

                <el-col :span="1" style="min-width:290px">
                    <el-form-item label="单位名称:">
                        <el-input
                            size="mini"
                            suffix-icon="el-icon-search"
                            v-model="queryList.deptName"
                            @input="fuzzyQuery"
                        ></el-input>
                    </el-form-item>
                </el-col>

               <el-col :span="1" style="min-width:290px">
                    <el-form-item label="单位号:">
                        <el-input
                            size="mini"
                            suffix-icon="el-icon-search"
                            v-model="queryList.deptId"
                            @input="fuzzyQuery"
                        ></el-input>
                    </el-form-item>
                </el-col>
           
            </el-row>
            </el-form>
            
            <el-table
                :data="guidanceList"
            >

                <el-table-column type="index">
                </el-table-column>

                <el-table-column
                    prop="deptName"
                    label="单位名称"
                    min-width="100"
                >
                </el-table-column>

                <el-table-column
                    prop="type"
                    label="类别"
                    min-width="100"
                    :formatter="formatType"
                >
                </el-table-column>

                <el-table-column
                    prop="deptId"
                    label="单位号"
                    min-width="100"
                >
                </el-table-column>

                <el-table-column
                    prop="orderNum"
                    label="同类排序"
                    min-width="100"
                >
                </el-table-column>

                <el-table-column
                    prop="parentName"
                    label="所属学校"
                    min-width="100"
                >
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
                            v-if="scope.row.status<=10"
                            round
                            :class="sureClass(scope.row)"
                            >{{
                                computedStatus(
                                    scope.row.status
                                )
                            }}</el-button
                        >
                    </template>
                </el-table-column>

                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    min-width="150"
                >
                </el-table-column>

                <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    min-width="150"
                >
                </el-table-column>

                 <el-table-column
                    prop="operate"
                    label="操作"
                    fixed="right"
                    width="50"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-s-check"  
                            @click="
                                updateData(
                                    scope.row,
                                    scope.$index
                                )
                            "                      
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
            :title="addGuidanceUnitDialog.title"
            :visible.sync="addGuidanceUnitDialog.open"
            width="915px"
        >
          <el-form ref="form" :model="form" label-width="300px">
              <el-row style="margin-bottom:10px">  
                <el-col :span="6">
                    单位名称:
                </el-col>
                <el-col :span="18">
                    <el-input
                      style="width:200px"
                      v-model="addGuidanceUnitDialog.data.deptName"
                    >
                    </el-input>   
                </el-col>
              </el-row>
            
              <el-row style="margin-bottom:10px" >  
                <el-col :span="6">
                    类别:
                </el-col>
                <el-col :span="18">
                    <el-select 
                     style="width:200px"
                     v-model="addGuidanceUnitDialog.data.type"
                    >    
                       <el-option
                            v-for="(item, index) in dict_sys_dept_type"
                            :key="index"
                            :value="+item.dictValue"
                            :label="item.dictLabel"
                        ></el-option>  
                    </el-select>
                </el-col>
              </el-row>
             
              <el-row style="margin-bottom:10px">  
                <el-col :span="6">
                    单位号:
                </el-col>
                <el-col :span="18">
                    <el-input
                      style="width:200px"
                      v-model="addGuidanceUnitDialog.data.deptId"
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
                      v-model="addGuidanceUnitDialog.data.orderNum"
                    >
                    </el-input>   
                </el-col>
              </el-row>

               <el-row style="margin-bottom:10px">  
                <el-col :span="6">
                    所属学校:
                </el-col>
                <el-col :span="18">
                    <el-select 
                     style="width:200px"
                     v-model="addGuidanceUnitDialog.data.parentId"
                    >    
                       <el-option
                            v-for="(item, index) in schoolList"
                            :key="index"
                            :value="item.deptId"
                            :label="item.deptName"
                        ></el-option>  
                    </el-select>
                </el-col>
              </el-row>

              
              <el-row style="margin-bottom:10px">  
                <el-col :span="6">
                    状态:
                </el-col>
                <el-col :span="18">
                    <el-radio-group
                    v-model="addGuidanceUnitDialog.data.status"
                    style="float:left;margin-top:15px"
                    >
                    <el-radio :label="''+1">禁用</el-radio>
                    <el-radio :label="''+0">正常</el-radio>
                    </el-radio-group> 
                </el-col>
               </el-row> 
          </el-form>

          <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary"
                @click="save"
                    >保存</el-button
                >
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {
        //指导单位列表
        groupGuidanceList,
        //新增指导单位
        systemDeptPost,
        //编辑指导单位
        systemDeptPut,
        //通过id获取编辑回显
        systemDeptGet,

        deptUtilSchool,
    } from '@/api/application/secondClass/index'
    import { getDict } from '@/api/application/secondClass/dict/type.js'
    export default {
        name: 'erkePlan',
        data() {
            return {
                form:{},
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
                queryList:{
                    deptName:'',
                    deptId:'',
                },
                guidanceList:[],
                dict_sys_dept_type:[],
                dict_sys_dept_status:[],
                addGuidanceUnitDialog:{
                    title:'',
                    open:false,
                    data:{
                       deptName:'',
                       type:'',
                       deptId:'',
                       orderNum:'',
                       parentName:'',
                       status:'',
                    },
                },
                schoolList:[],
            }
        },
        computed: {
              computedStatus(){
                return value => {
                   return this.dict_sys_dept_status[value]?.dictLabel
                }
            }
        },
        methods: {
            sureClass(row){
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
            //点击保存
            save(){
              console.log(this.addGuidanceUnitDialog.data,'点击保存要发送的数据');
              if(this.addGuidanceUnitDialog.title == '修改指导单位')
              {
                  systemDeptPut(this.addGuidanceUnitDialog.data).then(value=>{
                      console.log(value,'修改接口返回的数据')
                      this.fuzzyQuery();
                  })
              }
              if(this.addGuidanceUnitDialog.title == '新增指导单位')
              {
                  systemDeptPost(this.addGuidanceUnitDialog.data).then(value=>{
                      console.log(value,'新增接口返回的数据')
                      this.fuzzyQuery();
                  })
              }
              
              this.addGuidanceUnitDialog.open = false;
              this.reset();
            },
            //点击关闭
            cancel() {
                this.addGuidanceUnitDialog.open = false
                this.reset()
            },
            formatType(row, column, cellValue){
                return (
                    cellValue != null &&
                    this.dict_sys_dept_type[-cellValue]?.dictLabel
                )
            },
            formatStatus(row, column, cellValue){
                return (
                    cellValue != null &&
                    this.dict_sys_dept_status[cellValue]?.dictLabel
                )
            },
            //点击新增按钮
            addData(){
                this.reset()
                this.addGuidanceUnitDialog.title = '新增指导单位'
                this.addGuidanceUnitDialog.open = true
            },
            reset(){
                this.addGuidanceUnitDialog.data={
                       deptName:'',
                       type:'',
                       deptId:'',
                       orderNum:'',
                       parentName:'',
                       status:'',
                       parentId:'',
                }
            },
            //点击编辑按钮
            updateData(row,index){
                this.addGuidanceUnitDialog.title = '修改指导单位'
                this.renderState(row)
            },
            renderState(row){
                 console.log(row,'点击编辑要渲染的数据');
                 this.addGuidanceUnitDialog.data ={                 
                       deptName:row.deptName,
                       type:row.type,
                       deptId:row.deptId,
                       orderNum:row.orderNum,
                       parentName:row.parentName,
                       status:row.status,
                       parentId:row.parentId,
                }
                 this.addGuidanceUnitDialog.open = true;
            },
            getList(option) {
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.fuzzyQuery()
            },
            fuzzyQuery(){
                let option ={
                   deptName:this.queryList.deptName,
                   deptId:this.queryList.deptId,
                   pageNum: this.queryParams.pageNum,
                   pageSize: this.queryParams.pageSize,
                }
                console.log(option,'模糊查询发送的数据')
                this.getGuidanceList(option);
            },
            getGuidanceList(option){
                groupGuidanceList(option).then(value=>{
                    this.guidanceList = value.rows;
                    console.log(this.guidanceList,'收到的指导单位列表');
                    this.queryParams.totalCount = value.total;
                    this.queryParams.totalPage = Math.ceil(this.queryParams.totalCount/this.queryParams.pageSize); 
                })
            },
            initDict(){
              Promise.all([
                  getDict('sys_dept_type'),
                  getDict('sys_dept_status')
              ]).then(value=>{
                  let tempArr =[
                      'dict_sys_dept_type',
                      'dict_sys_dept_status'
                  ];
                  tempArr.forEach((item,index)=>{
                    this[item] = value[index].data;
                    console.log(this[item],'这是所有字典');
                  })
              })
            },
            getDeptUtilSchool(){
               deptUtilSchool().then(value=>{
                   console.log(value,'学校列表');
                   this.schoolList = value.data;
               })
            }
        },
        async created() {
            this.fuzzyQuery();
            this.initDict();
            this.getDeptUtilSchool();
        },
        mounted() {
        
        }
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
        max-height: calc(100vh - 180px);
        overflow: auto;
    }
   
</style>
