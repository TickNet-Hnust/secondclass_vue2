<!--
 * @Descripttion: 培养方案详情
 * @Author: 林舒恒
 * @Date: 2021-06-03 16:39:52
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-09-17 20:50:06
-->
<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                 <transition name="el-fade-in-linear">
                <div class="erke-top" v-show="isFull">
                    <div class="erke-top-head">
                        <router-link to="/application/erke/erkePlan"
                            ><el-button
                                circle
                                icon="el-icon-arrow-left"
                            ></el-button
                        ></router-link>
                        <span> <i>✈</i> 培养方案-详情</span>
                    </div>
                    <div class="erke-top-foot">
                        <div style="margin-bottom: 10px">
                            学年度：<el-select
                                v-model="schoolYearList.value"
                                placeholder="请选择"
                                @change="schoolYearChange"
                            >
                                <!-- <el-option :key="-1" label="全部" :value="-1"> </el-option> -->
                                <el-option
                                    v-for="item in schoolYearList.rows"
                                    :key="item.id"
                                    :label="item.yearName"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>

                            培养方案：<el-select
                                v-model="trainingProgramList.value"
                                @change="fuzzyQuery"
                                placeholder="请选择"
                            >
                                <el-option value="" label="全部"></el-option>
                                <el-option
                                    v-for="item in trainingProgramList.rows"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </div>

                        <div style="margin-bottom: 10px" class="noneInput">
                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                                :value="countState.courseCount"
                            >
                                <template slot="prepend">课程总数</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                                :value="countState.applyingCount"
                            >
                                <template slot="prepend">申请中</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                                :value="countState.validCount"
                            >
                                <template slot="prepend">审核通过</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="0"
                                :value="countState.failCount"
                            >
                                <template slot="prepend">审核未通过</template>
                            </el-input>
                        </div>

                        <el-button
                            type="primary"
                            :disabled="trainingProgramList.value == ''"
                            plain
                            icon="el-icon-plus"
                            size="mini"
                            @click="addCourse"
                            v-hasPermi="['system:user:add']"
                            >新增</el-button
                        >

                        <el-button
                            type="warning"
                            plain
                            icon="el-icon-download"
                            size="mini"
                            :load="exportLoading"
                            @click="handleExport"
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
                                @click="refresh"
                            >
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
                </transition>
                <div class="erke-bottom">
                    <transition name="el-fade-in-linear">
                    <div class="erke-buttom-left" v-show="isFull">
                        <el-menu
                            default-active=""
                            class="el-menu-vertical-demo"
                            @select="handleSelect"
                        >
                            <el-menu-item index="">
                                <span slot="title">全部</span>
                            </el-menu-item>

                            <el-menu-item
                                v-for="(item, index) in classificationList.rows"
                                :key="index"
                                :index="index + ''"
                            >
                                <span slot="title">{{ item.name }}</span>
                            </el-menu-item>
                        </el-menu>
                    </div>
                    </transition>
                    <div class="erke-buttom-right" ref="erkeButtomRight">
                        <div class="operate">
                            <el-row
                                :gutter="10"
                                style="flexWrap:wrap"
                                type="flex"
                                justify="space-around"
                            >
                                <el-col :span="1" style="min-width:40px">
                                    <el-button @click="changeIsFullState" icon="el-icon-full-screen" circle></el-button>
                                </el-col>
                                <el-col :span="1" style="min-width:80px">
                                    <el-select
                                        style="width: 80px"
                                        v-model="value"
                                        placeholder="操作"
                                    >
                                        <el-option value="批量修改"></el-option>
                                        <el-option value="排序"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="1" style="min-width:200px">
                                    <el-input
                                        suffix-icon="el-icon-search"
                                        placeholder="课程名称"
                                        v-model="queryList.name"
                                        @input="fuzzyQuery"
                                    >
                                    </el-input>
                                </el-col>

                                <el-col :span="1" style="min-width:100px">
                                    <el-select
                                        style="width: 100px"
                                        v-model="queryList.joinType"
                                        placeholder="加入方式:不限"
                                        @change="fuzzyQuery"
                                    >
                                        <el-option
                                            value=""
                                            label="加入方式:不限"
                                        ></el-option>
                                        <el-option
                                            v-for="(item,
                                            index) in dict_sc_course_join_type"
                                            :key="index"
                                            :value="item.dictValue"
                                            :label="item.dictLabel"
                                        ></el-option>
                                        <!-- <el-option value="预设"></el-option> -->
                                        <!-- <el-option value="临增"></el-option> -->
                                    </el-select>
                                </el-col>

                                <el-col :span="1" style="min-width:100px">
                                    <el-select
                                        style="width: 100px"
                                        v-model="queryList.necessary"
                                        placeholder="必修课：不限"
                                        @change="fuzzyQuery"
                                    >
                                        <el-option
                                            value=""
                                            label="必修课：不限"
                                        ></el-option>
                                        <el-option
                                            v-for="(item,
                                            index) in dict_sc_course_necessary"
                                            :key="index"
                                            :value="item.dictValue"
                                            :label="item.dictLabel"
                                        ></el-option>
                                        <!-- <el-option value="是"></el-option>
                                        <el-option value="否"></el-option> -->
                                    </el-select>
                                </el-col>

                                <el-col :span="1" style="min-width:120px">
                                    <el-select
                                        style="width: 120px"
                                        v-model="queryList.term"
                                        placeholder="开课学期：不限"
                                        @change="fuzzyQuery"
                                    >
                                        <el-option
                                            value=""
                                            label="开课学期：不限"
                                        ></el-option>
                                        <el-option
                                            v-for="it in 8"
                                            :key="it"
                                            :label="'第' + it + '学期'"
                                            :value="it"
                                        ></el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="1" style="min-width:120px">
                                    <el-select
                                        style="width: 120px"
                                        v-model="queryList.departmentId"
                                        placeholder="发布单位：不限"
                                    >
                                        <el-option
                                            value="0"
                                            label="发布单位：不限"
                                        ></el-option>

                                        <el-option value="保卫处"></el-option>
                                        <el-option value="网络中心"></el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="1" style="min-width:120px">
                                    <el-select
                                        style="width: 120px"
                                        v-model="queryList.type"
                                        placeholder="课程性质：不限"
                                        @change="fuzzyQuery"
                                    >
                                        <el-option
                                            value=""
                                            label="课程性质：不限"
                                        ></el-option>
                                        <el-option
                                            v-for="(item,
                                            index) in dict_sc_course_type"
                                            :key="index"
                                            :value="item.dictValue"
                                            :label="item.dictLabel"
                                        ></el-option>
                                        <!-- <el-option value="活动"></el-option>
                                        <el-option value="竞赛"></el-option> -->
                                    </el-select>
                                </el-col>

                                <el-col :span="1" style="min-width:340px">
                                    <el-radio-group
                                        v-model="radioType"
                                        size="mini"
                                        @change="radioChange"
                                    >
                                        <el-radio-button
                                            label="全部"
                                        ></el-radio-button>
                                        <el-radio-button
                                            v-for="(item,
                                            index) in dict_sc_course_status"
                                            :key="index"
                                            :label="item.dictLabel"
                                        ></el-radio-button>
                                    </el-radio-group>
                                </el-col>
                            </el-row>
                        </div>
                        <el-table
                            :data="courseList"
                            v-loading="loading"
                            stripe
                            class="detailMainTable"
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
                                prop="name"
                                label="课程名称"
                                min-width="150"
                                show-overflow-tooltip
                            >
                            </el-table-column>

                            <el-table-column
                                prop="trainingProgramId"
                                label="培养方案"
                                min-width="120"
                                show-overflow-tooltip
                                :formatter="formatTrainingProgram"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="schoolYearName"
                                label="学年"
                                min-width="120"
                                show-overflow-tooltip
                            >
                            </el-table-column>

                            <el-table-column
                                prop="classificationId"
                                label="分类"
                                min-width="150"
                                show-overflow-tooltip
                                :formatter="formatClassificationId"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="classificationIdPath"
                                label="分类明细"
                                min-width="150"
                                show-overflow-tooltip
                                :formatter="formatClassificationDetail"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="joinType"
                                label="加入方式"
                                min-width="80"
                                :formatter="formatJoinType"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="necessary"
                                label="必修课"
                                min-width="80"
                                :formatter="formatNecessary"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="lowestValue"
                                label="学期积分下限要求"
                                width="140"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="status"
                                label="状态"
                                min-width="120"
                                :formatter="formatStatus"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        round
                                        :class="sureClass(scope.row)"
                                        >{{
                                            computedStatus(scope.row.status)
                                        }}</el-button
                                    >
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="updateTime"
                                label="修改时间"
                                min-width="120"
                                :formatter="formatDate"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="departmentName"
                                label="发布单位"
                                min-width="120"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="type"
                                label="性质"
                                min-width="80"
                                :formatter="formatType"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="createTime"
                                label="创建时间"
                                min-width="150"
                                :formatter="formatDate"
                            >
                            </el-table-column>

                            <!-- 后端还没有数据 -->
                            <!-- <el-table-column prop="createUserId" label="创建人">
                            </el-table-column>

                            <el-table-column prop="updateUserId" label="修改人">
                            </el-table-column>

                            <el-table-column
                                prop="remark"
                                label="备注"
                                min-width="200"
                            >
                            </el-table-column> -->

                            <el-table-column
                                prop="operate"
                                label="操作"
                                fixed="right"
                                width="200"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-edit"
                                        @click="updateCourse(scope.row)"
                                        >修改/详情</el-button
                                    >
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-s-check"
                                        @click="examCourse(scope.row)"
                                        >审核</el-button
                                    >
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-delete"
                                        @click="deleteCourse(scope.row)"
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

        <!-- 用户导入对话框 -->
        <el-dialog
            :title="upload.title"
            :visible.sync="upload.open"
            width="400px"
            append-to-body
        >
            <el-upload
                ref="upload"
                :limit="1"
                accept=".xlsx, .xls"
                :headers="upload.headers"
                :action="upload.url + '?updateSupport=' + upload.updateSupport"
                :disabled="upload.isUploading"
                :on-progress="handleFileUploadProgress"
                :on-success="handleFileSuccess"
                :auto-upload="false"
                drag
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                    <el-checkbox
                        v-model="upload.updateSupport"
                    />是否更新已经存在的用户数据
                    <el-link
                        type="info"
                        style="font-size: 12px"
                        @click="importTemplate"
                        >下载模板</el-link
                    >
                </div>
                <div class="el-upload__tip" style="color: red" slot="tip">
                    提示：仅允许导入“xls”或“xlsx”格式文件！
                </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFileForm"
                    >确 定</el-button
                >
                <el-button @click="upload.open = false">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 详情新增 -->
        <el-dialog
            :title="addDetailDialog.title"
            :visible.sync="addDetailDialog.open"
            width="915px"
            append-to-body
            class="addDetailDialog"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="14">
                        <el-row>
                            <el-col :span="5">学年：</el-col>
                            <el-col :span="19">{{
                                schoolYearIdMapName[schoolYearList.value]
                            }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10">
                        <el-row>
                            <el-col :span="6">发布单位：</el-col>
                            <el-col :span="18">
                                <el-select
                                    v-model="addDetailDialog.unitValue"
                                    class="unitValue"
                                >
                                    <el-option
                                        label="校团委"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="校团委2"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="校团委3"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="14">
                        <el-row>
                            <el-col :span="5">培养方案</el-col>
                            <el-col :span="19">{{
                                trainingProgramIdMapname[
                                    trainingProgramList.value
                                ]
                            }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10">
                        <el-row>
                            <el-col :span="6">必修课程：</el-col>
                            <el-col :span="18">
                                <el-switch
                                    v-model="addDetailDialog.config.necessary"
                                    active-text="是"
                                    :active-value="1"
                                    inactive-text="否"
                                    :inactive-value="0"
                                    class="switchStyle"
                                >
                                </el-switch>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="14">
                        <el-row>
                            <el-col :span="5">课程名称：</el-col>
                            <el-col :span="19">
                                <el-input
                                    class="className"
                                    v-model="addDetailDialog.config.name"
                                ></el-input>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10">
                        <el-row>
                            <el-col :span="6">加入方式：</el-col>
                            <el-col :span="18">
                                <el-select
                                    v-model="addDetailDialog.config.joinType"
                                    class="shoutInput"
                                >
                                    <el-option
                                        v-for="it in dict_sc_course_join_type"
                                        :key="it.id"
                                        :label="it.dictLabel"
                                        :value="it.dictValue"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="14">
                        <el-row>
                            <el-col :span="5">分类：</el-col>
                            <el-col :span="19">
                                <el-select
                                    v-model="
                                        addDetailDialog.config.classificationId
                                    "
                                    class="sortClass"
                                >
                                    <el-option
                                        v-for="it in classificationList.rows"
                                        :key="it.id"
                                        :label="it.name"
                                        :value="it.id"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10">
                        <el-row>
                            <el-col :span="6">性质：</el-col>
                            <el-col :span="18">
                                <el-select
                                    v-model="addDetailDialog.config.type"
                                    class="shoutInput"
                                >
                                    <el-option
                                        v-for="it in dict_sc_course_type"
                                        :key="it.id"
                                        :label="it.dictLabel"
                                        :value="it.dictValue"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3" style="height: 49px; line-height: 49px">
                        <i class="el-icon-share"></i> 其他信息
                    </el-col>
                    <el-col :span="21">
                        <el-divider></el-divider>
                    </el-col>
                </el-row>

                <el-row :gutter="4">
                    <el-col :span="3"> 分类明细： </el-col>
                    <el-col :span="5.5">
                        <!-- :props="{ checkStrictly: true }" -->
                        <el-cascader
                            :options="datadata"
                            :value="
                                addDetailDialog.config.classificationIdPath
                                    .split(',')
                                    .map(item => +item)
                            "
                            @change="handleNodeChange"
                        ></el-cascader>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3"> 积分下限要求： </el-col>
                    <el-col :span="21">
                        <el-row
                            class="mb10"
                            v-for="(item,
                            index) in addDetailDialog.lowestValueArray"
                            :key="index"
                            :gutter="5"
                        >
                            <el-col :span="5.5">
                                <el-select v-model="item[0]" class="shoutInput">
                                    <el-option
                                        v-for="n in 10"
                                        :key="n"
                                        :label="`第${n}学期`"
                                        :value="n"
                                    ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5.5">
                                <el-select v-model="item[1]" class="shoutInput">
                                    <el-option
                                        v-for="n in 10"
                                        :key="n"
                                        :label="n"
                                        :value="n"
                                    ></el-option>
                                </el-select>
                            </el-col>

                            <el-col :span="5.5">
                                <span
                                    class="addOrMine"
                                    @click="mineLowest(index)"
                                    v-show="
                                        addDetailDialog.lowestValueArray
                                            .length != 1
                                    "
                                    >-</span
                                >
                            </el-col>

                            <el-col :span="5.5">
                                <span
                                    class="addOrMine"
                                    @click="addLowest(index)"
                                    >+</span
                                >
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3"> 备注： </el-col>
                    <el-col :span="21">
                        <el-input
                            type="textarea"
                            v-model="addDetailDialog.config.remark"
                        ></el-input>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-radio-group
                    v-if="addDetailDialog.title == '审核'"
                    v-model="addDetailDialog.config.status"
                    style="float:left;margin-top:15px"
                >
                    <el-radio :label="1">审核通过</el-radio>
                    <el-radio :label="3">审核未通过</el-radio>
                </el-radio-group>

                <el-button @click="cancel">关闭</el-button>
                <el-button type="primary" @click="addDetail">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 导出数据 -->
        <el-dialog
            :title="exportDialog.title"
            :visible.sync="exportDialog.open"
            width="635px"
            append-to-body
            class="exportDialog"
        >
            <el-row>
                <el-col :span="9" class="planExport">
                    <div>
                        <el-tree :data="exportDialog.units"></el-tree>
                    </div>
                </el-col>
                <el-col :span="15" class="planChoose">
                    <el-checkbox-group v-model="exportDialog.checkboxGroup">
                        <el-checkbox
                            label="第二课堂项目(活动、竞赛类)培养方案"
                            border
                        ></el-checkbox>
                        <el-checkbox
                            label="第二课堂项目(活动、竞赛类)积分名录"
                            border
                        ></el-checkbox>
                        <el-checkbox
                            label="第二课堂项目（活动、竟赛类)积分要求表"
                            border
                        ></el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm"
                    >导出数据</el-button
                >
                <el-button @click="cancel">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        trainingProgramDetail,
        trainingProgramList,
        trainingProgramId,
        courseClassificationList,
        courseClassificationUpdateTime,
        schoolYearList,
        schoolYearMulti,
        courseId,
        coursePost,
        coursePut,
        courseDelete
    } from '@/api/application/secondClass/index'

    import { getDict } from '@/api/application/secondClass/dict/type.js'

    import { filterTwoLayer, format } from '@/utils/gather.js'
    import horwheel from 'horwheel'

    import { importTemplate } from '@/api/system/user'
    import { getToken } from '@/utils/auth'

    export default {
        name: 'detail',
        data() {
            return {
                isFull: true, //是否全屏
                /** 学年度列表 */
                schoolYearList: {
                    value: Number(this.$route.params.sid),
                    rows: []
                },
                /** 培养方案列表 */
                trainingProgramList: {
                    value: Number(this.$route.params.tid),
                    rows: []
                },
                /** 分类列表 */
                classificationList: {
                    value: '',
                    rows: []
                },
                /** 课程列表 */
                courseList: [],
                radioType: '全部',
                queryList: {
                    name: '',
                    departmentId: '',
                    joinType: '',
                    necessary: '',
                    status: '',
                    term: '',
                    type: ''
                },
                //课程加入方式
                dict_sc_course_join_type: [],
                //是否必修
                dict_sc_course_necessary: [],
                //课程状态
                dict_sc_course_status: [],
                //课程类型/性质
                dict_sc_course_type: [],
                //课程分类类型/分类明细?
                dict_sc_course_classification_type: [],
                //加载
                loading: false,
                //课程状态数量
                countState: {
                    applyingCount: 0,
                    courseCount: 0,
                    failCount: 0,
                    validCount: 0
                },
                //培养方案
                trainingProgramIdMapname: [],
                /* 方便分类挂载其子列表，分类id => 分类数组所在index */
                classificationIdMapIndex: new Map(),
                /* 分类Id映射Name */
                classificationIdMapName: [],
                //学年id =>学年名称
                schoolYearIdMapName: [],
                // 分页请求参数
                queryParams: {
                    totalCount: 0,
                    totalPage: 0,
                    pageNum: 1,
                    pageSize: 10
                },
                /** 导出弹窗 */
                exportDialog: {
                    title: '',
                    open: false,
                    checkboxGroup: [],
                    units: [
                        {
                            label: '湖南科技大学'
                        },
                        {
                            label: '全部'
                        },
                        {
                            label: '指定单位',
                            children: [
                                {
                                    label: '资源环境与安全工程学院'
                                },
                                {
                                    label: '计算机科学与工程学院'
                                },
                                {
                                    label: '化学化工实验'
                                }
                            ]
                        }
                    ]
                },
                addDetailDialog: {
                    title: '新增课程',
                    open: false,
                    radio: '',
                    config: {
                        id: null,
                        schoolYearId: 0,
                        schoolYearName: '',
                        trainingProgramId: 8,
                        name: '',
                        classificationId: '',
                        classificationIdPath: '',
                        joinType: '0',
                        necessary: 1,
                        type: '0',
                        status: 0,
                        lowestValue: '',
                        remark: ''
                    },
                    lowestValueArray: [[1, 1]],
                    //发布单位，现在没用
                    unitValue: '1'
                },
                /** 分类树 */
                datadata: [],
                //下拉操作
                value: '',
                // 导出遮罩层
                exportLoading: false,
                // 表单参数，以后有用
                form: {},
                // 用户导入参数
                upload: {
                    // 是否显示弹出层（用户导入）
                    open: false,
                    // 弹出层标题（用户导入）
                    title: '',
                    // 是否禁用上传
                    isUploading: false,
                    // 是否更新已经存在的用户数据
                    updateSupport: 0,
                    // 设置上传的请求头部
                    headers: { Authorization: 'Bearer ' + getToken() },
                    // 上传的地址
                    url:
                        process.env.VUE_APP_BASE_API + '/system/user/importData'
                }
            }
        },
        computed: {
            computedStatus() {
                return temp => {
                    // console.log(this.dict_sc_course_status,temp,333)
                    return this.dict_sc_course_status[temp]?.dictLabel
                }
            }
        },
        methods: {
            // 控制全屏
            changeIsFullState() {
                let height = window.innerHeight
                    this.isFull = !this.isFull
                if(!this.isFull) {
                    this.$refs.erkeButtomRight.style.height = `${height - 50}px`
                    // this.$refs.erkeButtomRight.style.marginLeft = '0'
                } else {
                    this.$refs.erkeButtomRight.style.height = `${height - 260}px`
                    // this.$refs.erkeButtomRight.style.marginLeft = '228px'
                }
            },
            formatDate(row, column, cellValue) {
                return cellValue != null && format(cellValue)
            },
            formatClassificationId(row, column, cellValue) {
                return (
                    cellValue != null && this.classificationIdMapName[cellValue]
                )
            },
            formatClassificationDetail(row, column, cellValue) {
                if (cellValue != null) {
                    let str = ''
                    return cellValue
                        .split(',')
                        .reduce(
                            (pre, cur) =>
                                `${pre}--${this.classificationIdMapName[cur]}`,
                            '全部'
                        )
                }
                return cellValue
            },
            formatStatus(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_course_status[cellValue]?.dictLabel
                )
            },
            formatType(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_course_type[cellValue]?.dictLabel
                )
            },
            formatNecessary(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_course_necessary[cellValue]?.dictLabel
                )
            },
            formatJoinType(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_course_join_type[cellValue]?.dictLabel
                )
            },
            formatTrainingProgram(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.trainingProgramIdMapname[cellValue]
                )
            },
            refresh() {
                this.queryList = {
                    name: '',
                    joinType: '',
                    necessary: '',
                    term: '',
                    departmentId: '',
                    status: '',
                    type: ''
                }
                this.radioType = '全部'
                this.fuzzyQuery()
            },
            /**
             * @description: 处理路径
             * @param {*} value 例如：[1,2,4]
             */

            handleNodeChange(value) {
                this.addDetailDialog.config.classificationId =
                    value[value.length - 1]
                this.addDetailDialog.config.classificationIdPath = value.join(
                    ','
                )
                this.addDetailDialog.config.layer = value.length
                console.log(value)
            },
            /**
             * @description: 确定CSS类
             * @param {*} row
             */

            sureClass(row) {
                if (row.status == 0) {
                    //ing
                    return 'textPlain'
                } else if (row.status == 1) {
                    //yes
                    return 'textgreen'
                } else if (row.status == 2) {
                    //no
                    return 'textyellow'
                } else {
                    //unpass
                    return 'textRed'
                }
            },
            /** 操作分页触发的事件 */
            getList(option) {
                this.queryParams.pageNum = option.page
                this.queryParams.pageSize = option.limit
                this.fuzzyQuery()
            },
            // 取消按钮
            cancel() {
                this.addDetailDialog.open = false
                this.reset()
            },
            // 表单重置
            reset() {
                this.addDetailDialog.config = {
                    id: null,
                    schoolYearId: 0,
                    schoolYearName: '',
                    trainingProgramId: 8,
                    name: '',
                    classificationId: '',
                    classificationIdPath: '',
                    joinType: '0',
                    necessary: 1,
                    type: '0',
                    status: 0,
                    lowestValue: '',
                    remark: ''
                }
                this.addDetailDialog.lowestValueArray = [[1, 1]]
            },
            /** 导出数据 */
            submitForm() {},
            /** 导出按钮操作 */
            handleExport() {
                this.exportDialog.open = true
            },
            /** 导入按钮操作 */
            handleImport() {
                this.upload.title = '用户导入'
                this.upload.open = true
            },
            /** 下载模板操作 */
            importTemplate() {
                importTemplate().then(response => {
                    this.download(response.msg)
                })
            },
            // 文件上传中处理
            handleFileUploadProgress(event, file, fileList) {
                this.upload.isUploading = true
            },
            // 文件上传成功处理
            handleFileSuccess(response, file, fileList) {},
            // 提交上传文件
            submitFileForm() {
                this.$refs.upload.submit()
            },
            /**
             * @description: 点击新增触发
             */

            addCourse() {
                this.reset()
                this.addDetailDialog.title = '新增'
                this.addDetailDialog.open = true

                this.addDetailDialog.config.schoolYearId = this.schoolYearList.value
                this.addDetailDialog.config.trainingProgramId = this.trainingProgramList.value
                this.addDetailDialog.config.schoolYearName = this.schoolYearIdMapName[
                    this.schoolYearList.value
                ]
            },
            /**
             * @description: 新增
             */

            addDetail() {
                this.addDetailDialog.config.lowestValue = this.addDetailDialog.lowestValueArray
                    .map(item => {
                        return item.join(':')
                    })
                    .join(',')

                let state =
                    this.addDetailDialog.title == '新增'
                        ? coursePost
                        : coursePut
                state(this.addDetailDialog.config).then(value => {
                    this.addDetailDialog.open = false
                    this.fuzzyQuery()
                })
            },
            /**
             * @description: 回显
             * @param {*} row
             */

            renderState(row) {
                this.addDetailDialog.config = {
                    id: row.id,
                    schoolYearId: row.schoolYearId,
                    schoolYearName: row.schoolYearName,
                    trainingProgramId: row.trainingProgramId,
                    name: row.name,
                    classificationId: row.classificationId,
                    classificationIdPath: row.classificationIdPath,
                    joinType: row.joinType + '',
                    necessary: row.necessary,
                    type: row.type + '',
                    status: row.status,
                    // lowestValue:row.lowestValue,
                    remark: row.remark
                }
                //"2:3,3:4" => [[2,3],[3,4]]
                this.addDetailDialog.lowestValueArray = row.lowestValue
                    .split(',')
                    .map(item => item?.split(':'))
                    .map(item => [+item[0], +item[1]])

                this.addDetailDialog.open = true
            },
            /**
             * @description: 审核
             * @param {*} row
             */

            examCourse(row) {
                this.renderState(row)
                this.addDetailDialog.title = '审核'
            },
            /**
             * @description: 点击修改触发
             * @param {*} row 数据
             */

            updateCourse(row) {
                this.renderState(row)
                this.addDetailDialog.title = '修改'
            },
            /** + */
            mineLowest(index) {
                this.addDetailDialog.lowestValueArray.splice(index, 1)
            },
            /** - */
            addLowest(index) {
                this.addDetailDialog.lowestValueArray.splice(index, 0, [1, 1])
            },
            /**
             * @description: 删除课程
             * @param row 对应的课程
             */

            deleteCourse(row) {
                this.alertDialog.call(this, '删除', {
                    confirm: () => {
                        courseDelete(row.id)
                            .then(value => {
                                this.msgSuccess('删除成功')
                                this.fuzzyQuery()
                            })
                            .catch(err => {
                                this.msgError('删除失败')
                            })
                    }
                })
            },
            /** 状态改变 */
            radioChange(value) {
                let map = new Map([
                    ['全部', ''],
                    ['申请中', '0'],
                    ['有效', '1'],
                    ['无效', '2'],
                    ['未通过', '3']
                ])
                /** 因为按钮获得的值只能是label，所以需要自己转换为对应的value */
                this.queryList.status = map.get(value)
                console.log(value, this.queryList.status)
                this.fuzzyQuery()
            },
            /** 学年改变 */
            schoolYearChange(value) {
                this.getTrainingProgramList({
                    schoolYearId: this.schoolYearList.value
                })
                this.fuzzyQuery()
            },
            /** 培养方案改变 */
            trainingProgramChange(value) {
                // this.trainingProgramList.value = value
                this.fuzzyQuery()
            },
            /** 分类改变 */
            handleSelect(index) {
                if (this.classificationList.rows[index]) {
                    this.classificationList.value = this.classificationList.rows[
                        index
                    ].id
                } else {
                    this.classificationList.value = ''
                }
                console.log(this.classificationList.value)
                this.queryParams.pageNum = 1
                this.queryParams.pageSize = 10
                this.fuzzyQuery()
            },
            /** 初始化字典 */
            initDict() {
                // getDict
                Promise.all([
                    getDict('sc_course_join_type'),
                    getDict('sc_course_necessary'),
                    getDict('sc_course_status'),
                    getDict('sc_course_type'),
                    getDict('sc_course_classification_type')
                ]).then(value => {
                    console.log(value, 'initDict')
                    let tempArr = [
                        'dict_sc_course_join_type',
                        'dict_sc_course_necessary',
                        'dict_sc_course_status',
                        'dict_sc_course_type',
                        'dict_sc_course_classification_type'
                    ]
                    tempArr.forEach((item, index) => {
                        this[item] = value[index].data
                        console.log(item, value[index])
                    })
                })
            },
            /** @description 查询培养方案分页
             *  @param name 模糊查询方案名称
             *  @param schoolYearId 学年id
             *  @param pageNum 第几页
             *  @param pageSize 限制每页的条数
             */

            getTrainingProgramList(option) {
                trainingProgramList(option).then(value => {
                    this.trainingProgramList.rows = value.rows
                    this.trainingProgramList.value = value.rows[0].id

                    this.queryParams.totalCount = value.total
                    this.queryParams.totalPage =
                        value.total / this.queryParams.pageSize

                    value.rows.forEach((item, index) => {
                        this.trainingProgramIdMapname[item.id] = item.name
                    })

                    console.log(value, 'trainingProgramList')
                })
            },
            /**
             * @description: 查询课程
             * @param classificationId 分类id
             * @param name 课程名字
             * @param departmentId 部门id
             * @param joinType 加入方式
             * @param necessary 是必修课吗
             * @param schoolYearId 学年id
             * @param status 状态
             * @param term 学期
             * @param trainingProgramId 培养方案id
             * @param type
             * @param pageNum 第几页
             * @param pageSize 限制多少条
             */

            getTrainingProgramDetail(option) {
                this.loading = true
                trainingProgramDetail(option).then(value => {
                    /** 总共多少条，总共多少页 */
                    this.queryParams.totalCount = value.data.pageData.totalCount
                    this.queryParams.totalPage = value.data.pageData.totalPage

                    /** 左侧分类获取/默认值/字典映射 */
                    this.classificationList.rows = value.data.classificationList
                    // this.classificationList.value = this.classificationList.rows[0].id

                    //课程总数-申请中-审核通过-审核未通过
                    this.countState = {
                        applyingCount: value.data.applyingCount,
                        courseCount: value.data.courseCount,
                        failCount: value.data.failCount,
                        validCoun: value.data.validCount
                    }
                    this.courseList = value.data.pageData.list
                    console.error(this.courseList)
                    this.loading = false
                })
            },
            /** 模糊查询 */
            fuzzyQuery() {
                let option = {
                    schoolYearId: this.schoolYearList.value,
                    trainingProgramId: this.trainingProgramList.value,
                    classificationId: this.classificationList.value,
                    name: this.queryList.name,
                    departmentId: '',
                    joinType: this.queryList.joinType,
                    necessary: this.queryList.necessary,
                    status: this.queryList.status,
                    term: this.queryList.term,
                    type: this.queryList.type,
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize
                }
                console.log(option)
                this.getTrainingProgramDetail(option)
            },
            /**
             * @description: 根据参数查询二课课程分类列表
             * @param name
             * @param type
             * @param integralType
             */

            getCourseClassificationList() {
                let courseUpdateTime = localStorage.getItem('courseUpdateTime')
                courseClassificationUpdateTime().then(value=>{
                    if(value.data===courseUpdateTime)
                    {
                        console.log('使用了local的缓存');
                        let courseList = JSON.parse(localStorage.getItem('courseList'))
                        courseList.forEach(item => {
                        this.classificationIdMapName[item.id] = item.name
                        })

                        /* value保证存在且唯一 */
                        /* label保证渲染视图 */
                        console.log(courseList, 'courseClassificationList')
                        // 往value里面加value和label属性 用于级联展示课程分类
                        courseList = courseList.map(item => ({
                            ...item,
                            value: item.id,
                            label: item.name
                        }))
                        this.datadata = filterTwoLayer(courseList)
                        console.log(this.datadata, 'datadata')
                        }
                    else{
                        localStorage.setItem('courseUpdateTime',value.data)
                        courseClassificationList().then(value => {
                        console.log('重新请求了数据并且更新');
                        //更新local里面的courseList
                        localStorage.setItem('courseList',JSON.stringify(value.data))
                        value.data.forEach(item => {
                            this.classificationIdMapName[item.id] = item.name
                        })

                        /* value保证存在且唯一 */
                        /* label保证渲染视图 */
                        console.log(value, 'courseClassificationList')
                        // 往value里面加value和label属性 用于级联展示课程分类
                        value.data = value.data.map(item => ({
                            ...item,
                            value: item.id,
                            label: item.name
                        }))
                        this.datadata = filterTwoLayer(value.data)
                        console.log(this.datadata, 'datadata')
                        })
                    }
                })
            }
        },
        async created() {
            //初始化字典
            this.initDict()

            /** 获得所有学年 */
            schoolYearList().then(value => {
                value.rows.forEach(item => {
                    //学年id映射name
                    this.schoolYearIdMapName[item.id] = item.yearName
                })

                console.log(value, 'schoolYearList')
                //记录所有学年，用于学年度展示
                this.schoolYearList.rows = value.rows
            })

            /** 获得当前学年所有的培养方案列表 */
            this.getTrainingProgramList({
                schoolYearId: this.$route.params.sid
            })

            /** 获得当前学年下 当前培养方案下 当前课程分类下 课程列表 */
            this.fuzzyQuery()

            this.getCourseClassificationList()
        },
        async beforeMount() {},
        async mounted() {
            window.addEventListener('resize',() => {
                let height = window.innerHeight
                if(!this.isFull) {
                    this.$refs.erkeButtomRight.style.height = `${height - 50}px`
                    this.$refs.erkeButtomRight.style.marginLeft = '0'
                } else {
                    this.$refs.erkeButtomRight.style.height = `${height - 260}px`
                    this.$refs.erkeButtomRight.style.marginLeft = '228px'
                }
            })
        }
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
        margin-right: 8px;
        height: calc(100vh - 260px);
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
    }
    .erke-buttom-right {
        transition: all .5s;
        background-color: #fff;
        height: calc(100vh - 260px);
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
    .unitValue .el-input__inner,
    .unitValue .el-input--suffix {
        width: 260px;
    }
    .unitValue .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    /*two*/
    .switchStyle .el-switch__label {
        position: absolute;
        display: none;
        color: #fff;
    }
    .switchStyle .el-switch__label--left {
        z-index: 9;
        left: 22px;
    }
    .switchStyle .el-switch__label--right {
        z-index: 9;
        left: -2px;
    }
    .switchStyle .el-switch__label.is-active {
        display: block;
    }
    .switchStyle.el-switch .el-switch__core,
    .el-switch .el-switch__label {
        width: 45px !important;
    }
    /*three*/
    .className .el-input__inner {
        width: 330px;
    }

    .shoutInput .el-input__inner,
    .shoutInput .el-input--suffix {
        width: 130px;
    }
    .shoutInput .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    /*four line */
    .sortClass .el-input__inner,
    .sortClass .el-input--suffix {
        width: 200px;
    }
    .sortClass .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    /*five */
    .classSort .el-input__inner,
    .classSort .el-input--suffix {
        width: 180px;
    }
    .classSort .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }

    .activitySort .el-input__inner,
    .activitySort .el-input--suffix {
        width: 320px;
    }
    .activitySort .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }

    .rankSort .el-input__inner,
    .rankSort .el-input--suffix {
        width: 100px;
    }
    .rankSort .el-input__icon::before {
        color: #000;
        font-weight: 700;
    }
    textarea {
        resize: none !important;
        height: 150px;
        width: 690px !important;
        border: 1px solid #aaa !important;
    }
    .addDetailDialog >>> .el-dialog__body {
        height: 500px;
        overflow: auto;
    }
    .addDetailDialog .el-form > .el-row {
        margin: 13px 0 !important;
    }

    .addDetailDialog .el-dialog__header {
        border-bottom: 1px solid #ddd;
    }
    .addOrMine {
        cursor: pointer;
        display: inline-block;
        height: 30px;
        width: 30px;
        text-align: center;
        vertical-align: top;
        line-height: 30px;
        border: 1px solid #aaa;
        border-radius: 3px;
    }
    .exportDialog >>> .el-dialog {
        width: 762px !important;
    }
    .exportDialog >>> .el-dialog__body {
        padding-top: 10px;
        height: 390px;
    }
    .exportDialog >>> .el-tabs__header {
        width: 260px;
    }
    .exportDialog >>> .el-tabs__item {
        text-align: left;
    }
    .planExport {
        position: relative;
    }
    .planExport::after {
        position: absolute;
        right: 0;
        top: -40px;
        content: '';
        width: 1px;
        height: 400px;
        background-color: #ddd;
    }
    .planExport >>> .el-tree-node__content {
        height: 40px;
        line-height: 20px;
        padding: 10px;
    }
    * >>> .is-current {
        background-color: #f6f7f9;
        color: #5f9dfd;
        cursor: pointer;
    }
    .planChoose >>> .el-checkbox {
        margin: 5px 20px !important;
        width: 320px;
    }
    .detailMainTable >>> .el-table__body-wrapper {
        /* overflow: auto; */
    }
    .mb10 {
        margin-bottom: 10px;
    }
    .el-form .el-row {
        height: initial;
    }
</style>
