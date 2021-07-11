<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">
                <div class="erke-top">
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
                                v-model="list.value"
                                placeholder="请选择"
                                @change="schoolYearChange"
                            >
                                <!-- <el-option :key="-1" label="全部" :value="-1"> </el-option> -->
                                <el-option
                                    v-for="item in list.rows"
                                    :key="item.id"
                                    :label="item.yearName"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>

                            培养方案：<el-select
                                :value="schoolYearIdMapProgramArray.value"
                                @change="
                                    schoolYearIdMapProgramArray.value = $event
                                "
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in schoolYearIdMapProgramArray
                                        .rows[list.value]"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </div>

                        <div style="margin-bottom: 10px">
                            <el-input
                                style="margin-right: 10px"
                                placeholder="请输入内容"
                                :value="countState.courseCount"
                            >
                                <template slot="prepend">课程总数</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="请输入内容"
                                :value="countState.applyingCount"
                            >
                                <template slot="prepend">申请中</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="请输入内容"
                                :value="countState.validCount"
                            >
                                <template slot="prepend">审核通过</template>
                            </el-input>

                            <el-input
                                style="margin-right: 10px"
                                placeholder="请输入内容"
                                :value="countState.failCount"
                            >
                                <template slot="prepend">审核未通过</template>
                            </el-input>
                        </div>

                        <el-button
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            size="mini"
                            @click="handleAdd"
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

                        <el-button
                            circle
                            icon="el-icon-refresh"
                            @click="refresh"
                        >
                        </el-button>
                    </div>
                </div>

                <div class="erke-bottom">
                    <div class="erke-buttom-left">
                        <ul>
                            <li
                                v-for="(item,index) in classificationList"
                                :key="index"
                                @click="renderPlanData(item.id)"
                            >
                            {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="erke-buttom-right">
                        <div class="operate">
                <el-row :gutter="10" style="height: 50px">
                    <el-col :span="1.5">
                        <el-select
                            style="width: 80px"
                            v-model="value"
                            placeholder="操作"
                        >
                            <el-option value="批量修改"></el-option>
                            <el-option value="排序"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1.5">
                        <el-input
                            suffix-icon="el-icon-search"
                            placeholder="课程名称"
                            v-model="queryDetail.courseName"
                        >
                        </el-input>
                    </el-col>

                    <el-col :span="1.5">
                        <el-select
                            style="width: 120px"
                            v-model="queryDetail.joinType"
                            placeholder="加入方式"
                        >
                            <el-option
                                value="加入方式：不限"
                            ></el-option>
                            <el-option value="预设"></el-option>
                            <el-option value="临增"></el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="1.5">
                        <el-select
                            style="width: 120px"
                            v-model="queryDetail.neccessary"
                            placeholder="必修课"
                        >
                            <el-option
                                value="必修课：不限"
                            ></el-option>
                            <el-option value="是"></el-option>
                            <el-option value="否"></el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="1.5">
                        <el-select
                            style="width: 120px"
                            v-model="queryDetail.term"
                            placeholder="开课学期：不限"
                        >
                            <el-option
                                value="开课学期：不限"
                            ></el-option>
                            <el-option
                                v-for="it in 8"
                                :key="it"
                                :value="'第' + it + '学期'"
                            ></el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="1.5">
                        <el-select
                            style="width: 120px"
                            v-model="value"
                            placeholder="发布单位：不限"
                        >
                            <el-option
                                value="发布单位：不限"
                            ></el-option>
                            <el-option value="保卫处"></el-option>
                            <el-option value="网络中心"></el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="1.5">
                        <el-select
                            style="width: 120px"
                            v-model="value"
                            placeholder="课程性质：不限"
                        >
                            <el-option
                                value="课程性质：不限"
                            ></el-option>
                            <el-option value="活动"></el-option>
                            <el-option value="竞赛"></el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="1.5">
                        <el-radio-group
                            v-model="statusRadio"
                            size="small"
                        >
                            <el-radio-button
                                label="全部"
                                value="0"
                            ></el-radio-button>
                            <el-radio-button
                                label="申请中"
                                value="1"
                            ></el-radio-button>
                            <el-radio-button
                                label="审核未通过"
                                value="2"
                            ></el-radio-button>
                            <el-radio-button
                                label="有效"
                                value="3"
                            ></el-radio-button>
                            <el-radio-button
                                label="无效"
                                value="4"
                            ></el-radio-button>
                        </el-radio-group>
                    </el-col>
                    <!-- <el-col :span="1.5">
                        <el-button size="mini" round
                            >申请中</el-button
                        >
                    </el-col>
                    <el-col :span="1.5">
                        <el-button size="mini" round
                            >审核未通过</el-button
                        >
                    </el-col>
                    <el-col :span="1.5">
                        <el-button size="mini" round
                            >有效</el-button
                        >
                    </el-col>
                    <el-col :span="1.5">
                        <el-button size="mini" round
                            >无效</el-button
                        >
                    </el-col> -->
                </el-row>
            </div>
                        <el-table
                            :data="planData"
                            v-loading="loading"
                            class="detailMainTable"
                        >
                            <el-table-column
                                type="selection"
                                min-width="55"
                            >
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
                                min-width="200"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="trainingProgramId"
                                label="培养方案"
                                min-width="150"
                                :formatter="formatTrainingProgram"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="schoolYearName"
                                label="学年"
                                min-width="120"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="classificationId"
                                label="分类"
                                min-width="150"
                                :formatter="formatClassificationId"
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
                                        :class="
                                            sureClass(scope.row)
                                        "
                                        >{{
                                            computedStatus(
                                                scope.row.status
                                            )
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
                                prop="classificationDetail"
                                label="分类明细"
                                min-width="180"
                                :formatter="
                                    formatClassificationDetail
                                "
                            >
                            </el-table-column>

                            <el-table-column
                                prop="createTime"
                                label="创建时间"
                                min-width="150"
                                :formatter="formatDate"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="createUserId"
                                label="创建人"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="updateUserId"
                                label="修改人"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="remark"
                                label="备注"
                            >
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
                                    <el-link
                                        style="margin-right: 10px"
                                        type="info"
                                        >审核</el-link
                                    >
                                    <el-link type="info"
                                        >删除</el-link
                                    >
                                </template>
                            </el-table-column>
                        </el-table>
                        <pagination
                            v-show="queryParams.totalPage > 0"
                            :total="queryParams.totalCount"
                            :page.sync="queryParams.pageCount"
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
                                schoolMap[list.value]
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
                                    schoolYearIdMapProgramArray.value
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
                                        v-for="it in classificationList"
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
                        <el-select
                            v-model="addDetailDialog.classSort"
                            class="classSort"
                        >
                            <el-option
                                label="思想政治和人文素养"
                                value="1"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="2"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="3"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="9.5">
                        <el-select
                            v-model="addDetailDialog.activitySort"
                            class="activitySort"
                        >
                            <el-option
                                label="思想政治和人文素养"
                                value="1"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="2"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="3"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select
                            v-model="addDetailDialog.rankSort"
                            class="rankSort"
                        >
                            <el-option
                                label="思想政治和人文素养"
                                value="1"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="2"
                            ></el-option>
                            <el-option
                                label="思想政治和人文素养"
                                value="3"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3"> 积分标准号 </el-col>
                    <el-col :span="21">
                        {{ addDetailDialog.integral }}
                    </el-col>
                </el-row>

                <el-row style="height: 80px">
                    <el-col :span="3"> 积分下限要求： </el-col>
                    <el-col :span="21">
                        <el-row :gutter="5" style="margin-bottom: 12px">
                            <el-col :span="5.5">
                                <el-select
                                    v-model="addDetailDialog.unitValue"
                                    class="shoutInput"
                                >
                                    <el-option
                                        label="预设"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="预设2"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="预设3"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5.5">
                                <el-select
                                    v-model="addDetailDialog.unitValue"
                                    class="shoutInput"
                                >
                                    <el-option
                                        label="预设"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="预设2"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="预设3"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>

                            <el-col :span="5.5">
                                <span class="addOrMine">-</span>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :span="5.5">
                                <el-select
                                    v-model="addDetailDialog.unitValue"
                                    class="shoutInput"
                                >
                                    <el-option
                                        label="预设"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="预设2"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="预设3"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5.5">
                                <el-select
                                    v-model="addDetailDialog.unitValue"
                                    class="shoutInput"
                                >
                                    <el-option
                                        label="预设"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="预设2"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="预设3"
                                        value="3"
                                    ></el-option>
                                </el-select>
                            </el-col>

                            <el-col :span="5.5">
                                <span class="addOrMine">-</span>
                            </el-col>

                            <el-col :span="5.5">
                                <span class="addOrMine">+</span>
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
                //学年度id映射培养方案/方便下拉列表
                schoolYearIdMapProgramArray: {
                    value: Number(this.$route.params.tid),
                    rows: []
                },
                //培养方案
                trainingProgramIdMapname: [],
                /* 左下侧分类列表以及其子列表 */
                classificationList: [],
                /* 方便分类挂载其子列表，分类id => 分类数组所在index */
                classificationIdMapIndex: new Map(),
                /* 分类Id映射Name */
                classificationIdMapName: [],
                statusRadio: '全部',
                /* 查询详情的条件 */
                queryDetail: {
                    classification: '',
                    courseName: '',
                    departmentId: '',
                    joinType: '',
                    necessary: '',
                    shoolYearId: '',
                    status: '',
                    term: '',
                    trainingProgramId: '',
                    type: ''
                },
                //学年id =>学年名称
                schoolMap: [],
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4,
                    userName: undefined,
                    phonenumber: undefined,
                    status: undefined,
                    deptId: undefined
                },
                list: {
                    value: Number(this.$route.params.sid),
                    rows: []
                },

                t: {},
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
                    config: {
                        necessary: 1,
                        name: '',
                        joinType: '0',
                        classificationId: 1,
                        type: '0',
                        remark: '',
                        status: 0
                    },
                    yearOfLean: '2021-2022学年',
                    unitValue: '1',
                    //second line
                    planOfgrain: '湖南科技大学',
                    isRequire: true,
                    //thrid
                    wayValue: '1',
                    //fouth
                    sortClass: '1',
                    nature: '1',
                    //fiv
                    classSort: '1',
                    activitySort: '1',
                    rankSort: '1',
                    //
                    integral: '5'
                },
                textareaContent: '',
                datadata: [
                    {
                        ID: 1,
                        className: '青年马克思主义者培养工程',
                        trainPlan: '湖南科技大学',
                        termLearn: '2021-2022学年',
                        classsort: '思想政治与人文素养',
                        joinWay: '预设',
                        classMust: '是',
                        TermDown: '1:3,3:3,5:3,7:3',
                        state: '申请中',
                        modifyTime: '2021-03-02',
                        operate: ''
                    },
                    {
                        ID: 2,
                        className: '明月讲坛',
                        trainPlan: '湖南科技大学',
                        termLearn: '2021-2022学年',
                        classsort: '思想政治与人文素养预设',
                        joinWay: '预设',
                        classMust: '是',
                        TermDown: '1:3,3:3,5:3,7:3',
                        state: '有效',
                        modifyTime: '2021-03-02',
                        operate: ''
                    },
                    {
                        ID: 3,
                        className: '诚信教育活动月',
                        trainPlan: '湖南科技大学',
                        termLearn: '2021-2022学年﹑',
                        classsort: '思想政治与人文素养―预设',
                        joinWay: '预设',
                        classMust: '是',
                        TermDown: '1:3,3:3,5:3,7:3',
                        state: '有效',
                        modifyTime: '2021-03-02',
                        operate: ''
                    },
                    {
                        ID: 4,
                        className: '文明校园行系列活动',
                        trainPlan: '湖南科技大学',
                        termLearn: '2021-2022学年',
                        classsort: '思想政治与人文素养临增',
                        joinWay: '预设',
                        classMust: '是',
                        TermDown: '1:3,3:3,5:3,7:3',
                        state: '审核未通过',
                        modifyTime: '2021-03-02',
                        operate: ''
                    }
                ],
                count: {
                    classCount: 50,
                    apyling: 5,
                    haspass: 40,
                    nopass: 5
                },
                planData: [
                    
                ],
                value: '1',
                options: [
                    {
                        value: '1',
                        label: '全部'
                    },
                    {
                        value: '选项2',
                        label: '2021-2022学年'
                    },
                    {
                        value: '选项3',
                        label: '2020-2021学年'
                    },
                    {
                        value: '选项4',
                        label: '2019-2021学年'
                    },
                    {
                        value: '选项5',
                        label: '北京烤鸭'
                    }
                ],
                value: '',

                // 遮罩层
                loading: true,
                // 导出遮罩层
                exportLoading: false,
                // 选中数组
                ids: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                // 显示搜索条件
                showSearch: true,
                // 总条数
                total: 0,
                // 用户表格数据
                userList: null,
                // 弹出层标题
                title: '',
                // 部门树选项
                deptOptions: undefined,
                // 是否显示弹出层
                open: false,
                // 部门名称
                deptName: undefined,
                // 默认密码
                initPassword: undefined,
                // 日期范围
                dateRange: [],
                // 状态数据字典
                statusOptions: [],
                // 性别状态字典
                sexOptions: [],
                // 岗位选项
                postOptions: [],
                // 角色选项
                roleOptions: [],
                // 表单参数
                form: {},
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
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
                    return this.dict_sc_course_status[temp].dictLabel
                }
            }
        },
        watch: {
            schoolYearIdMapProgramArray: {
                handler(newV, oldV) {
                    console.log(newV, 111111111111)
                },
                deep: true
            },
            // 根据名称筛选部门树
            deptName(val) {
                this.$refs.tree.filter(val)
            }
        },
        created() {
            this.getList()
            this.getTreeselect()
            this.getDicts('sys_normal_disable').then(response => {
                this.statusOptions = response.data
            })
            this.getDicts('sys_user_sex').then(response => {
                this.sexOptions = response.data
            })
            this.getConfigKey('sys.user.initPassword').then(response => {
                this.initPassword = response.msg
            })
        },
        methods: {
            formatDate(row, column, cellValue) {
                return cellValue && formaterDate(cellValue)
            },
            formatClassificationId(row, column, cellValue) {
                return cellValue && this.classificationIdMapName[cellValue]
            },
            formatClassificationDetail(row, column, cellValue) {
                // console.log(this.dict_sc_course_classification_type,cellValue,'formatClassificationDetail')
                // if(cellValue != null) {
                //     return this.dict_sc_course_classification_type[cellValue]
                // }
                return cellValue
            },
            formatStatus(row, column, cellValue) {
                return (
                    cellValue && this.dict_sc_course_status[cellValue].dictLabel
                )
            },
            formatType(row, column, cellValue) {
                return (
                    cellValue && this.dict_sc_course_type[cellValue].dictLabel
                )
            },
            formatNecessary(row, column, cellValue) {
                return (
                    cellValue &&
                    this.dict_sc_course_necessary[cellValue].dictLabel
                )
            },
            formatJoinType(row, column, cellValue) {
                return (
                    cellValue &&
                    this.dict_sc_course_join_type[cellValue].dictLabel
                )
            },
            formatTrainingProgram(row, column, cellValue) {
                return cellValue && this.trainingProgramIdMapname[cellValue]
            },
            async addDetail() {
                this.addDetailDialog.config.schoolYearId = this.list.value
                this.addDetailDialog.config.trainingProgramId = this.schoolYearIdMapProgramArray.value
                this.addDetailDialog.config.schoolYearName = this.schoolMap[
                    this.list.value
                ]

                console.log(this.addDetailDialog.config, 999)
                await coursePost(this.addDetailDialog.config).then(value => {
                    console.log(value, 789789)
                })
            },
            refresh() {
                this.$forceUpdate()
            },
            async schoolYearChange(value) {
                console.log(value)
                this.list.value = value
                this.loading = true
                await this.initTableData(value)
                this.loading = false
                if (!!this.schoolYearIdMapProgramArray.rows[value]) {
                    this.schoolYearIdMapProgramArray.value = this.schoolYearIdMapProgramArray.rows[
                        value
                    ][0].id
                } else {
                    this.schoolYearIdMapProgramArray.value = '无数据'
                }

                console.log(this.schoolYearIdMapProgramArray)

                await trainingProgramList({
                    page: this.t.page ? this.t.page : 1,
                    limit: this.t.limit ? this.t.limit : 10,
                    schoolYearId: value
                })
                    .then(value => {
                        console.log(value,'培养方案详细')
                        this.queryParams.pageSize = value.data.pageSize
                        this.queryParams.totalCount = value.data.totalCount
                        this.queryParams.totalPage = value.data.totalPage
                        this.planData = value.data.list
                        console.log(this.planData,7777)
                        this.$forceUpdate()
                        this.loading = false
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
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
            /** 查询用户列表 */
            async getList(option) {
                this.t = option
                this.loading = true
                await trainingProgramList({
                    page: option.page,
                    limit: option.limit
                }).then(value => {
                    this.planData = value.data.list
                    console.log(value.data.list)
                    this.$forceUpdate()
                    this.loading = false
                })
            },
            /** 查询部门下拉树结构 */
            getTreeselect() {
                treeselect().then(response => {
                    console.log(response)
                    this.deptOptions = response.data
                })
            },
            // 筛选节点
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            // 节点单击事件
            handleNodeClick(data) {
                this.queryParams.deptId = data.id
                this.getList()
            },
            // 用户状态修改
            handleStatusChange(row) {
                let text = row.status === '0' ? '启用' : '停用'
                this.$confirm(
                    '确认要"' + text + '""' + row.userName + '"用户吗?',
                    '警告',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                )
                    .then(function() {
                        return changeUserStatus(row.userId, row.status)
                    })
                    .then(() => {
                        this.msgSuccess(text + '成功')
                    })
                    .catch(function() {
                        row.status = row.status === '0' ? '1' : '0'
                    })
            },
            // 取消按钮
            cancel() {
                this.open = false
                this.reset()
            },
            // 表单重置
            reset() {
                this.form = {
                    userId: undefined,
                    deptId: undefined,
                    userName: undefined,
                    nickName: undefined,
                    password: undefined,
                    phonenumber: undefined,
                    email: undefined,
                    sex: undefined,
                    status: '0',
                    remark: undefined,
                    postIds: [],
                    roleIds: []
                }
                this.resetForm('form')
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.page = 1
                this.getList()
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.dateRange = []
                this.resetForm('queryForm')
                this.handleQuery()
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.userId)
                this.single = selection.length != 1
                this.multiple = !selection.length
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.addDetailDialog.open = true
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                this.getTreeselect()
                const userId = row.userId || this.ids
                getUser(userId).then(response => {
                    this.form = response.data
                    this.postOptions = response.posts
                    this.roleOptions = response.roles
                    this.form.postIds = response.postIds
                    this.form.roleIds = response.roleIds
                    this.open = true
                    this.title = '修改用户'
                    this.form.password = ''
                })
            },
            /** 重置密码按钮操作 */
            handleResetPwd(row) {
                this.$prompt('请输入"' + row.userName + '"的新密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then(({ value }) => {
                        resetUserPwd(row.userId, value).then(response => {
                            this.msgSuccess('修改成功，新密码是：' + value)
                        })
                    })
                    .catch(() => {})
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.userId != undefined) {
                            updateUser(this.form).then(response => {
                                this.msgSuccess('修改成功')
                                this.open = false
                                this.getList()
                            })
                        } else {
                            addUser(this.form).then(response => {
                                this.msgSuccess('新增成功')
                                this.open = false
                                this.getList()
                            })
                        }
                    }
                })
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                const userIds = row.userId || this.ids
                this.$confirm(
                    '是否确认删除用户编号为"' + userIds + '"的数据项?',
                    '警告',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                )
                    .then(function() {
                        return delUser(userIds)
                    })
                    .then(() => {
                        this.getList()
                        this.msgSuccess('删除成功')
                    })
            },
            /** 导出按钮操作 */
            handleExport() {
                this.exportDialog.open = true
                // const queryParams = this.queryParams
                // this.$confirm('是否确认导出所有用户数据项?', '警告', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // })
                //     .then(() => {
                //         this.exportLoading = true
                //         return exportUser(queryParams)
                //     })
                //     .then(response => {
                //         this.download(response.msg)
                //         this.exportLoading = false
                //     })
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
            handleFileSuccess(response, file, fileList) {
                this.upload.open = false
                this.upload.isUploading = false
                this.$refs.upload.clearFiles()
                this.$alert(response.msg, '导入结果', {
                    dangerouslyUseHTMLString: true
                })
                this.getList()
            },
            // 提交上传文件
            submitFileForm() {
                this.$refs.upload.submit()
            },
            //左
            renderPlanData(id) {
                console.log(id)
                trainingProgramDetail({
                    classification:id
                    
                }).then(value => {
                    this.planData = value.data.pageData.list
                    console.log(value)
                })
            },
            //得到当前学年的培养方案详细信息
            async initTableData(schoolYearId) {
                await trainingProgramDetail({
                    schoolYearId,
                    limit:99
                }).then(value => {
                    console.log(value, 88)
                    const {
                        applyingCount,
                        courseCount,
                        failCount,
                        validCount
                    } = value.data
                    this.countState = {
                        applyingCount,
                        courseCount,
                        failCount,
                        validCount
                    }
                    console.log(value, 'trainingProgramDetail')
                    this.classificationList = value.data.classificationList
                    console.log(this.classificationList, 8988)
                    value.data.classificationList.forEach((item, index) => {
                        //分类id映射分类数组下标
                        this.classificationIdMapIndex.set(item.id, index)
                        //分类id映射Name
                        this.classificationIdMapName[item.id] = item.name
                    })
                    
                    value.data.pageData.list.forEach(item => {
                        let index = this.classificationIdMapIndex.get(
                            item.classificationId
                        )
                        /* 添加成员 */
                        let { children } = this.classificationList[index]

                        if (children) {
                            children.push(item)
                        } else {
                            //增加属性
                            this.classificationList[index].children = [item]
                        }
                    })
                    console.log(
                        this.classificationList,
                        'trainingProgramDetail'
                    )
                })
            },
            async initDict() {
                // getDict
                await Promise.all([
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
                    value.forEach((item, index) => {
                        this[tempArr[index]] = item.data
                    })
                })
            }
        },
        async created() {
            //初始化字典
            await this.initDict()

            await schoolYearList().then(value => {
                console.log(value)
                value.rows.forEach(item => {
                    //学年id映射name
                    this.schoolMap[item.id] = item.yearName 
                })

                console.log(value, 'schoolYearList')
                //记录所有学年，用于学年度展示
                this.list.rows = value.rows
            })
        },
        async beforeMount() {
            //拿到所有培养方案
            await trainingProgramList({
                limit: 1000
            }).then(value => {
                console.log(value, '1000')

                //学年Id映射其下培养方案数组
                value.data.list.forEach(item => {
                    this.schoolYearIdMapProgramArray.rows[item.schoolYearId]
                        ? this.schoolYearIdMapProgramArray.rows[
                              item.schoolYearId
                          ].push(item)
                        : (this.schoolYearIdMapProgramArray.rows[
                              item.schoolYearId
                          ] = [item])
                    //培养方案Id映射名字
                    this.trainingProgramIdMapname[item.id] = item.name
                })
                console.log(this.schoolYearIdMapProgramArray,'学年Id映射其下培养方案数组' )
                console.log(this.trainingProgramIdMapname, '培养方案Id映射名字')
            })
        },
        async mounted() {
            
            console.log(this.$route.params, 77)
            this.loading = true
            this.initTableData(this.$route.params.sid)
            this.loading = false

            //not a good way to mounted
            // setTimeout(() => {
            //     let view = document.querySelectorAll(
            //         '.detailMainTable .el-table__body-wrapper'
            //     )
            //     view.forEach(item => {
            //         item && horwheel(item)
            //     })
            // }, 1000)
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
    .erke-bottom {
        /* background-color: #fff; */

        overflow: hidden;
    }
    .erke-buttom-left {
        width: 220px;
        float: left;
        padding: 16px;
        height: calc(100vh - 270px);
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
        width: 192px;
        height: 40px;
        padding: 0 20px;
        color: #979797;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
    }
    .erke-buttom-left li:hover {
        background-color: #e6f7ff;
        color: #0084d1;
        cursor: pointer;
    }
    .erke-buttom-left li span {
        position: absolute;
        right: 10px;
        width: 20px;
        text-align: center;
        top: 0;
    }
    .erke-buttom-right {
        background-color: #fff;
        margin-left: 225px;
        height: calc(100vh - 270px);
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
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
    .addDetailDialog .el-dialog__body {
        height: 500px;
        overflow: auto;
    }
    .addDetailDialog .el-form > .el-row {
        margin: 13px 0 !important;
    }
    .addDetailDialog .el-dialog__body {
        padding-top: 15px;
    }

    .addDetailDialog .el-dialog__header {
        border-bottom: 1px solid #ddd;
    }
    .addOrMine {
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

    .erke-bottom >>> .el-tabs__header {
        background-color: #fff;
        width: 220px;
        border-radius: 5px;
        border: 1px solid #ddd;
        height: calc(100vh - 270px);
        margin-right: 10px;
        padding: 15px;
    }
    .erke-bottom >>> .el-tabs__content {
        padding: 15px !important;
        background-color: #fff;
        overflow: auto;
        border-radius: 5px;
        border: 1px solid #ddd;
        height: calc(100vh - 270px);
    }
    .erke-bottom >>> .el-tabs__item {
        text-align: left;

        border-bottom: 1px dashed #ddd;
    }
    .erke-bottom,
    .erke-bottom >>> .el-tabs__nav-scroll {
        overflow: visible !important;
    }
    .erke-bottom >>> .el-tabs__nav-wrap {
        position: relative;
        overflow: visible !important;
    }
    .erke-bottom >>> .el-tabs__nav-wrap::after {
        content: '';
        width: 0;
    }
    .erke-bottom >>> .el-tabs__active-bar {
        display: none;
    }
    .erke-bottom >>> .el-tabs__content {
        padding: 0 10px 10px 10px;
    }
</style>
