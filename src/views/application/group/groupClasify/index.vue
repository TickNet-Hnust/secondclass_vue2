<!--
 * @Descripttion: 培养方案
 * @Author: 林舒恒
 * @Date: 2021-06-03 13:04:02
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-13 22:29:03
-->
<template>
    <div class="app-container">
        <div class="erke-top">
            <div class="erke-top-head">
                <span> <i>✈</i> 群组分类</span>
            </div>
        </div>

        <div class="erke-bottom">
            <el-row :gutter="10" style="margin-bottom: 20px">
                <el-col :span="1.5">
                    <el-button
                        type="primary"
                        plain
                        icon="el-icon-plus"
                        size="mini"
                        v-hasPermi="['system:user:add']"
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
                <el-col :span="1.5">
                    <el-input
                        size="mini"
                        suffix-icon="el-icon-search"
                    ></el-input>
                </el-col>

                <!-- <right-toolbar
                        :showSearch.sync="showSearch"
                        @queryTable="getList"
                        :columns="columns"
                    ></right-toolbar> -->
            </el-row>

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
    // //导出活动分类
    // export function groupTypeExport(){
    //     request({
    //         url:'/admins/group/type/export',
    //         methods:'get'
    //     })
    // }
    import {
        //群组分类列表
        groupTypeList,
        //新增群组分类
        groupTypePost,
        //编辑群组分类
        groupTypePut,
        //通过id获取编辑回显
        groupType,
    } from '@/api/application/secondClass/index'
    import{
         filterGroupClassificationList
    } from '@/utils/gather'

    export default {
        name: 'erkePlan',
        data() {
            return {
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
                //表格里面的数据
                treeData:[],
            }
        },
        computed: {
        },
        methods: {
            getGroupClassificationList(option){
                this.$loading = true;
                groupTypeList(option).then(value=>{
                    console.log(value,'群组分类列表');
                    this.treeData = filterGroupClassificationList(value.data);
                    console.log(this.treeData,'过滤之后的数据');
                    this.loading = false
                })

            }
           
        },
        async created() {
            this.getGroupClassificationList()
        },
        mounted() {
        
        }
    }
</script>

<style scoped>
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
