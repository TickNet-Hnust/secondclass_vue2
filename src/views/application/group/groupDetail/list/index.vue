<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-11 15:43:03
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-16 17:28:24
-->
<template>
    <div>
        <div class="erke-bottom">
            <el-row :gutter="10" style="margin-bottom: 20px">
                <el-col class="operation" :span="5">
                    <el-button size="small" type="primary"
                        >新增</el-button
                    >
                    <el-button size="small" plain>导出</el-button>
                </el-col>
                <el-col  :span="19">
                        <!-- v-model="queryList.activityStatusId" -->
                    <el-radio-group
                        size="mini"
                        style="float:right"
                        v-model="status"
                    >
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button
                            v-for="(item, index) in dict_sc_activity_status"
                            :key="index"
                            :label="item.dictValue"
                            >{{ item.dictLabel }}</el-radio-button
                        >
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-table :data="activitys" v-loading="loading">
                <el-table-column
                    prop="id"
                    label="活动ID"
                    fixed="left"
                    min-width="80"
                ></el-table-column>

                <el-table-column
                    prop="name"
                    label="活动名称"
                    fixed="left"
                    min-width="330"
                >
                    <!-- <template slot-scope="scope">
                        <router-link
                            class="textBlue"
                            :to="
                                '/application/erke/activityDetail/' +
                                    scope.row.id
                            "
                            >{{ scope.row.name }}</router-link
                        >
                    </template> -->
                </el-table-column>

                <el-table-column
                    prop="rankId"
                    label="级别"
                    :formatter="formatRank"
                ></el-table-column>

                <el-table-column
                    prop="schoolYearId"
                    label="学年"
                    min-width="120"
                    :formatter="formatSchoolYear"
                ></el-table-column>

                <el-table-column
                    prop="courseClassificationName"
                    label="课程分类"
                    min-width="140"
                    show-overflow-tooltip
                ></el-table-column>

                <el-table-column
                    prop="groupName"
                    label="活动主办方"
                    min-width="160"
                ></el-table-column>

                <el-table-column
                    prop="maxAdmissionNumber"
                    label="最大报名人数"
                    min-width="110"
                ></el-table-column>

                <el-table-column
                    prop="activityStatusId"
                    label="报名人数"
                    min-width="80"
                ></el-table-column>

                <el-table-column prop="status" label="状态" min-width="110">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            round
                            :class="sureClass(scope.row.activityStatusId)"
                            >{{ computedStatus(scope.row.activityStatusId) }}
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="createTime"
                    label="发布时间"
                    min-width="160"
                ></el-table-column>

                <el-table-column
                    prop="admissionWay"
                    label="录取方式"
                    :formatter="formatAdmissionWay"
                ></el-table-column>

                <el-table-column
                    prop="activityStartTime"
                    label="开始时间"
                    min-width="160"
                ></el-table-column>

                <el-table-column
                    prop="recommend"
                    label="是否为推荐活动"
                    min-width="120"
                >
                    <template slot-scope="scope">
                        {{ scope.row.recommend == 1 ? '是' : '否' }}
                    </template>
                </el-table-column>
            </el-table>

            <pagination
                v-show="queryParams.totalPage > 0"
                :total="queryParams.totalCount"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
            />
        </div>
    </div>
</template>
<script>
    import {
        activityList,
        getDict,
        schoolYearList
    } from '@/api/application/secondClass/index'
    export default {
        data() {
            return {
                loading:false,
                status:'',
                activitys:[],
                schoolYearIdMapName:[],
                dict_sc_activity_status:[],
                //活动录取方式
                dict_sc_activity_admission_way: [],
                //培养方案级别
                dict_sc_train_program_rank: [],
                queryParams: {
                    totalPage:0,
                    totalCount: 0,
                    pageNum:1,
                    pageSize:10
                }
            }
        },
        computed: {
            computedStatus() {
                return status => {
                    return (
                        status != null &&
                        this.dict_sc_activity_status[status]?.dictLabel
                    )
                }
            }
        },
        methods:{
            formatAdmissionWay(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_activity_admission_way[cellValue]?.dictLabel
                )
            },
            formatRank(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_train_program_rank[cellValue]?.dictLabel
                )
            },
            formatSchoolYear(row, column, cellValue) {
                return cellValue != null && this.schoolYearIdMapName[cellValue]
            },
            sureClass(status) {
                if ([0, 8, 4].includes(status)) {
                    return 'textGray'
                } else if ([1, 3, 6].includes(status)) {
                    return 'textRed'
                } else {
                    return 'textGreen'
                }
            },
            initDict() {
                Promise.all([
                    getDict('sc_activity_status'),
                    getDict('sc_activity_admission_way'),
                    getDict('sc_train_program_rank')
                ]).then(value => {
                    let tempArr = [
                        'dict_sc_activity_status',
                        'dict_sc_activity_admission_way',
                        'dict_sc_train_program_rank',
                    ]

                    value.forEach((item, index) => {
                        this[tempArr[index]] = item.data
                    })
                })
            },
        },
        created() {
            this.initDict()
            activityList({groupId: this.$route.params.gid}).then(value => {
                console.log(value)
                this.activitys = value.rows
                this.queryParams.totalCount = value.total
                this.queryParams.totalPage = Math.ceil(value.total / this.queryParams.pageSize)
            })
                schoolYearList().then(value => {
                    value.rows.forEach(item => {
                        this.schoolYearIdMapName[item.id] = item.yearName
                    })
                })
            
        }
    }
</script>
<style scoped>
    .erke-bottom {
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 15px;
        max-height: calc(100vh - 180px);
        overflow: auto;
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
    .textBlue {
        color: #1890ff;
    }
</style>