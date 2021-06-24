<template>
    <div class="erke-bottom">
        <el-tabs tab-position="left">
            <div class="operate">
                <el-row :gutter="10" style="height: 50px">
                    <el-col :span="1.5">
                        <el-select
                            style="width: 80px"
                            v-model="value"
                            placeholder="选择"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1.5">
                        <el-input
                            suffix-icon="el-icon-search"
                            placeholder="课程名称"
                        >
                        </el-input>
                    </el-col>

                    <el-col :span="1.5">
                        <el-select
                            style="width: 120px"
                            v-model="value"
                            placeholder="选择"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="1.5">
                        <el-select
                            style="width: 120px"
                            v-model="value"
                            placeholder="选择"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="1.5">
                        <el-select
                            style="width: 120px"
                            v-model="value"
                            placeholder="选择"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="1.5">
                        <el-select
                            style="width: 120px"
                            v-model="value"
                            placeholder="选择"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="1.5">
                        <el-select
                            style="width: 120px"
                            v-model="value"
                            placeholder="选择"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="1.5">
                        <el-button size="mini" round>全部</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button size="mini" round>申请中</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button size="mini" round>审核未通过</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button size="mini" round>有效</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button size="mini" round>无效</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-tab-pane label="全部">
                <div class="erke-buttom-right">
                    <el-table :data="datadata">
                        <el-table-column type="selection" width="55">
                        </el-table-column>

                        <el-table-column prop="ID" label="ID" width="50">
                        </el-table-column>

                        <el-table-column prop="className" label="课程名称">
                        </el-table-column>

                        <el-table-column prop="trainPlan" label="培养方案">
                        </el-table-column>

                        <el-table-column prop="termLearn" label="学年">
                        </el-table-column>

                        <el-table-column prop="classsort" label="分类">
                        </el-table-column>

                        <el-table-column prop="joinWay" label="加入方式">
                        </el-table-column>

                        <el-table-column prop="classMust" label="必修课">
                        </el-table-column>

                        <el-table-column
                            prop="TermDown"
                            label="学期积分下限要求"
                            width="130"
                        >
                        </el-table-column>

                        <el-table-column prop="state" label="状态">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    round
                                    :class="sureClass(scope.row)"
                                    >{{ scope.row.state }}</el-button
                                >
                            </template>
                        </el-table-column>

                        <el-table-column prop="modifyTime" label="修改时间">
                        </el-table-column>

                        <el-table-column
                            prop="operate"
                            label="操作"
                            fixed="right"
                            width="200"
                        >
                            <template>
                                <el-link
                                    style="margin-right: 10px"
                                    type="primary"
                                    >修改/详情</el-link
                                >
                                <el-link style="margin-right: 10px" type="info"
                                    >审核</el-link
                                >
                                <el-link type="info">删除</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination
                        v-show="total > 0"
                        :total="total"
                        :page.sync="queryParams.pageNum"
                        :limit.sync="queryParams.pageSize"
                        @pagination="getList"
                    />
                </div>
            </el-tab-pane>
            <el-tab-pane label="思想政治与人文素养"
                >思想政治与人文素养</el-tab-pane
            >
            <el-tab-pane label="学术科技与创新">学术科技与创新</el-tab-pane>
            <el-tab-pane label="社会时间与志愿公益"
                >社会时间与志愿公益</el-tab-pane
            >
            <el-tab-pane label="文化体育与艺术">文化体育与艺术</el-tab-pane>
            <el-tab-pane label="社会工作与阅历">社会工作与阅历</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped></style>
