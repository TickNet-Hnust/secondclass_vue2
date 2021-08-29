<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-11 15:43:03
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-29 11:53:35
-->
<template>
    <div>
        <div class="erke-bottom">
            <el-table
                :data="record"

            >
                <el-table-column
                    prop="id"
                    label="ID"
                ></el-table-column>

                <el-table-column
                    prop="nickName"
                    label="姓名"
                ></el-table-column>

                <el-table-column
                    prop="beforeName"
                    label="变更前"
                ></el-table-column>

                <el-table-column
                    prop="afterName"
                    label="变更后"
                ></el-table-column>

                <el-table-column
                    prop="changeUserName"
                    label="操作人"
                ></el-table-column>

                <el-table-column
                    prop="createTime"
                    label="操作时间"
                ></el-table-column>
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
import {recordList} from '@/api/application/secondClass/index'
    export default {
        data() {
            return {
                record:[],
                queryParams: {
                    totalPage: 0,
                    totalCount: 0,
                    pageNum: 1,
                    pageSize: 10
                }
            }
        },
        methods:{
            getList(option) {
                console.log(option)
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
            },
            getRecord() {
                recordList({
                activityId: this.$route.params.gid,
                pageNum:this.queryParams.pageNum,
                pageSize:this.queryParams.pageSize
            }).then(value => {
                console.log(value)
                this.record = value.rows
                this.queryParams.totalCount = value.total
                this.queryParams.totalPage = Math.ceil(value.total / this.queryParams.pageSize)
            })
            }
        },
        created(){
            this.getRecord()
        }
    }
</script>
<style scoped>
    .erke-bottom {
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 15px;
        border-radius: 5px;
        max-height: calc(100vh - 180px);
        overflow: auto;
    }
</style>
