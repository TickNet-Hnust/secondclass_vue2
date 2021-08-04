<template>
    <div class="app-container">
        <div class="erke-top">
            <div class="erke-top-head">
                <span> <i>✈</i> 活动管理</span>
            </div>
            <div class="erke-top-foot">
                <el-row :gutter="15" type="flex" justify="start">
                    <el-col :span="1" style="min-width:310px">
                        学年度：
                        <el-select v-model="schoolYearList.value">
                            <el-option value="" label="全部"></el-option>
                            <el-option
                                v-for="(item, index) in schoolYearList.rows"
                                :key="index"
                                :value="item.id"
                                :label="item.yearName"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="min-width:340px">
                        学院/二级单位:
                        <el-select v-model="queryList.deptId">
                            <el-option value="" label="全部"></el-option>
                            <el-option
                                v-for="(item, index) in deptListMap"
                                :key="index"
                                :value="item[0]"
                                :label="item[1]"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="min-width:270px;">
                        活动名称：
                        <el-input
                            v-model="queryList.name"
                            style="width:180px"
                        ></el-input>
                    </el-col>
                    <el-col :span="1" style="min-width:140px">
                        活动ID：
                        <el-input
                            v-model="queryList.id"
                            style="width:60px"
                        ></el-input>
                    </el-col>
                    <el-col :span="1" style="min-width:245px">
                        主办方：
                        <el-input
                            v-model="queryList.groupName"
                            style="width:160px"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row
                    style="margin-top: 15px"
                    :gutter="10"
                    type="flex"
                    justify="start"
                >
                    <el-col :span="1" style="min-width:165px">
                        录取方式：
                        <el-select
                            v-model="queryList.admissionWay"
                            style="width: 80px"
                        >
                            <el-option label="不限" value=""></el-option>
                            <el-option
                                v-for="(item,
                                index) in dict_sc_activity_admission_way"
                                :key="index"
                                :value="item.dictValue"
                                :label="item.dictLabel"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="min-width:320px">
                        发布时间:
                        <el-date-picker
                            style="max-width:230px"
                            v-model="queryList.time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                        >
                        </el-date-picker>
                    </el-col>
                    <el-col :span="1" style="min-width:460px">
                        课程分类：
                        <el-cascader
                            v-model="queryList.coursePath"
                            :options="datadata"
                            :props="{ checkStrictly: true }"
                            :show-all-levels="false"
                            class="activityCascader"
                            @change="handChangeNode"
                        ></el-cascader>
                        <el-select
                            v-model="queryList.courseId"
                            style="width: 130px; margin-left:10px"
                        >
                            <el-option label="不限" value=""></el-option>
                            <el-option
                                v-for="(item, index) in courseList"
                                :key="index"
                                :value="item.id"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="min-width:215px">
                        是否为推荐活动：
                        <el-select
                            v-model="queryList.recommend"
                            style="width: 80px"
                        >
                            <el-option label="不限" value=""></el-option>
                            <el-option :value="1" label="是"></el-option>
                            <el-option :value="0" label="否"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="min-width:135px">
                        <el-button
                            type="primary"
                            size="mini"
                            @click="fuzzyQuery"
                            >查询</el-button
                        >
                        <el-button size="mini" @click="reset">重置</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="erke-bottom">
            <el-row style="margin-bottom:10px">
                <el-col class="operation" :span="5">
                    <el-button size="small" type="primary" @click="handleImport"
                        >新增</el-button
                    >
                    <el-button size="small" plain>导出</el-button>
                </el-col>
                <el-col class="filterRadio" :span="19">
                    <el-radio-group
                        v-model="queryList.activityStatusId"
                        size="mini"
                        style="float:right"
                        @change="fuzzyQuery"
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
            <el-table :data="activityData" v-loading="loading">
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
                    <template slot-scope="scope">
                        <router-link
                            class="textBlue"
                            :to="
                                '/application/erke/activityDetail/' +
                                    scope.row.id
                            "
                            >{{ scope.row.name }}</router-link
                        >
                    </template>
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
                    prop="admissionWay"
                    label="参与方式"
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

                <el-table-column label="操作" fixed="right" min-width="350">
                    <template slot-scope="scope">
                        <el-button
                            v-for="(item, index) in operation[
                                scope.row.activityStatusId
                            ]"
                            :key="index"
                            type="text"
                            size="mini"
                            :icon="item.icon"
                            @click="changeStatus(scope.row.id, item.status)"
                        >
                            {{ item.title }}
                        </el-button>
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

        <!-- this is add dialog -->
        <el-dialog
            :title="addActivity.title"
            :visible.sync="addActivity.open"
            width="1060px"
            append-to-body
            class="addActivity"
        >
            <el-row>
                <el-col :span="5" style="padding-left:10px">
                    <a-anchor
                        :target-offset="targetOffset"
                        :getContainer="getContainer"
                        :bounds="-100"
                    >
                        <a-anchor-link href="#gy" title="概要" />
                        <a-anchor-link href="#bm" title="报名信息" />
                        <a-anchor-link href="#hd" title="活动信息" />
                    </a-anchor>
                </el-col>
                <el-col :span="19">
                    <el-form
                        label-position="left"
                        label-width="100px"
                        class="formDetail"
                    >
                        <el-form-item label="概要" class="bold"
                            ><a id="gy"></a
                        ></el-form-item>

                        <el-form-item label="活动名称：">
                            <el-input v-model="postData.name"></el-input>
                        </el-form-item>

                        <el-form-item label="主办方：">
                            <el-input
                                v-model="postData.groupPathName"
                            ></el-input>
                        </el-form-item>

                        <el-form-item label="发布人：">
                            <el-input></el-input>
                        </el-form-item>

                        <el-form-item label="指导单位">
                            <el-select v-model="postData.deptId">
                                <el-option
                                    v-for="(item, index) in deptListMap"
                                    :key="index"
                                    :value="item[0]"
                                    :label="item[1]"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="指导老师：">
                            <el-input></el-input>
                        </el-form-item>

                        <el-form-item label="报名信息" class="bold"
                            ><a id="bm"></a
                        ></el-form-item>

                        <el-form-item label="报名时间">
                            <el-date-picker
                                v-model="postData.enrollTime"
                                type="datetimerange"
                                @change="enrollTimeChange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                            >
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="录取方式">
                            <el-select v-model="postData.admissionWay">
                                <el-option
                                    v-for="(item,
                                    index) in dict_sc_activity_admission_way"
                                    :key="index"
                                    :value="item.dictValue"
                                    :label="item.dictLabel"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="报名范围">
                            <el-select
                                v-model="postData.enrollRange"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择文章标签"
                            >
                                <el-option
                                    v-for="(item, index) in deptListMap"
                                    :key="index"
                                    :value="item[0]"
                                    :label="item[1]"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="报名年级">
                            <el-tag
                                :key="tag"
                                v-for="tag in yearTags.dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="yearHandleClose(tag)"
                            >
                                {{ tag }}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="yearTags.inputVisible"
                                v-model="yearTags.inputValue"
                                ref="yearSaveTagInput"
                                size="small"
                                @keyup.enter.native="yearHandleInputConfirm"
                                @blur="yearHandleInputConfirm"
                            >
                            </el-input>
                            <el-button
                                v-else
                                class="button-new-tag"
                                size="small"
                                @click="yearShowInput"
                                >+</el-button
                            >
                        </el-form-item>

                        <el-form-item label="最大录取人数">
                            <el-radio-group
                                v-model="postFakeDate.maxAdmissionNumber"
                                @change="admissionNumberChange"
                            >
                                <el-radio :label="0">不限</el-radio>
                                <el-radio :label="1">
                                    限定人数
                                    <el-input
                                        v-model="postData.maxAdmissionNumber"
                                    ></el-input>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="报名须知">
                            <editor
                                v-model="postData.enrollNotice"
                                :min-height="192"
                            />
                        </el-form-item>

                        <el-form-item label="活动信息" class="bold"
                            ><a id="hd"></a
                        ></el-form-item>

                        <el-form-item label="活动级别">
                            <el-select v-model="postData.rankId">
                                <el-option
                                    v-for="(item,
                                    index) in dict_sc_train_program_rank"
                                    :key="index"
                                    :value="item.dictValue"
                                    :label="item.dictLabel"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="活动标签">
                            <el-tag
                                :key="tag"
                                v-for="tag in activityTags.dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="activityHandleClose(tag)"
                            >
                                {{ tag }}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="activityTags.inputVisible"
                                v-model="activityTags.inputValue"
                                ref="activitySaveTagInput"
                                size="small"
                                @keyup.enter.native="activityHandleInputConfirm"
                                @blur="activityHandleInputConfirm"
                            >
                            </el-input>
                            <el-button
                                v-else
                                class="button-new-tag"
                                size="small"
                                @click="activityShowInput"
                                >+</el-button
                            >
                        </el-form-item>

                        <el-form-item label="课程分类">
                            <el-cascader
                                v-model="postData.coursePath"
                                :options="datadata"
                                :props="{ checkStrictly: true }"
                                :show-all-levels="false"
                                class="activityCascader"
                                @change="handChangeNodePost"
                            ></el-cascader>
                            <el-select
                                v-model="postData.courseId"
                                style=" margin-left:10px"
                            >
                                <!-- <el-option label="无" value=""></el-option> -->
                                <el-option
                                    v-for="(item, index) in courseList"
                                    :key="index"
                                    :value="item.id"
                                    :label="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="积分方案">
                            <el-radio
                                v-model="postData.integralScheme"
                                label="1"
                                >活动签到获取积分 + 个人申报获取积分，管理员认定
                            </el-radio>
                        </el-form-item>
                        <el-form-item label="">
                            <el-radio
                                v-model="postData.integralScheme"
                                label="0"
                                >主办方申请，管理员认定</el-radio
                            >
                        </el-form-item>

                        <el-form-item label="活动时间">
                            <el-date-picker
                                v-model="postData.activityTime"
                                type="datetimerange"
                                @change="activityTimeChange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                            >
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="允许请假">
                            <el-switch
                                :value="Boolean(postData.vacate)"
                                @change="postData.vacate = Number($event)"
                            ></el-switch>
                        </el-form-item>

                        <el-form-item label="花絮管理">
                            <el-radio-group v-model="postData.flowerStatus">
                                <el-radio label="1">关闭</el-radio>
                                <el-radio label="2"
                                    >启动，且提交信息需审核</el-radio
                                >
                                <el-radio label="3"
                                    >启动，且提交信息不需要审核</el-radio
                                >
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="评价管理">
                            <el-radio-group v-model="postData.evaluateStatus">
                                <el-radio label="1">关闭</el-radio>
                                <el-radio label="2"
                                    >启动，且提交信息需审核</el-radio
                                >
                                <el-radio label="3"
                                    >启动，且提交信息不需要审核</el-radio
                                >
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="活动地点：">
                            <el-link
                                type="primary"
                                @click="openMap"
                                v-if="!mapDialog.lat"
                                >点击打开地图</el-link
                            >
                            <div v-else>
                                纬度：{{ this.mapDialog.lat }} ：经度{{
                                    this.mapDialog.lng
                                }}
                            </div>
                        </el-form-item>

                        <el-form-item label="地点描述：">
                            <el-input> </el-input>
                        </el-form-item>

                        <el-form-item label="签到时间">
                            <el-radio-group
                                v-model="postFakeDate.registeTime"
                                @change="registeTimeChange"
                            >
                                <el-radio :label="0">不限</el-radio>
                                <el-radio :label="1"
                                    >时间范围：
                                    <el-date-picker
                                        style="max-width:230px"
                                        v-model="postData.registeTime"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        align="right"
                                    >
                                    </el-date-picker>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="签到距离">
                            <el-radio-group
                                v-model="postFakeDate.activityRegisteDistance"
                                @change="activityRegisteDistanceChange"
                            >
                                <el-radio :label="0">不限</el-radio>
                                <el-radio :label="1"
                                    >签到距离：
                                    <el-input
                                        v-model="
                                            postData.activityRegisteDistance
                                        "
                                    ></el-input>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="活动负责人">
                            <el-tag
                                :key="tag"
                                v-for="tag in peopleTags.dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="peopleHandleClose(tag)"
                            >
                                {{ tag }}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="peopleTags.inputVisible"
                                v-model="peopleTags.inputValue"
                                ref="peopleSaveTagInput"
                                size="small"
                                @keyup.enter.native="peopleHandleInputConfirm"
                                @blur="peopleHandleInputConfirm"
                            >
                            </el-input>
                            <el-button
                                v-else
                                class="button-new-tag"
                                size="small"
                                @click="peopleShowInput"
                                >+</el-button
                            >
                        </el-form-item>

                        <el-form-item label="活动组织者">
                            <el-tag
                                :key="tag"
                                v-for="tag in groupTags.dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="groupHandleClose(tag)"
                            >
                                {{ tag }}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="groupTags.inputVisible"
                                v-model="groupTags.inputValue"
                                ref="groupSaveTagInput"
                                size="small"
                                @keyup.enter.native="groupHandleInputConfirm"
                                @blur="groupHandleInputConfirm"
                            >
                            </el-input>
                            <el-button
                                v-else
                                class="button-new-tag"
                                size="small"
                                @click="groupShowInput"
                                >+</el-button
                            >
                        </el-form-item>
                        <el-form-item label="图片素材">
                            <el-upload
                                action="#"
                                list-type="picture-card"
                                :auto-upload="false"
                            >
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{ file }">
                                    <img
                                        class="el-upload-list__item-thumbnail"
                                        :src="file.url"
                                        alt=""
                                    />
                                    <span class="el-upload-list__item-actions">
                                        <span
                                            class="el-upload-list__item-preview"
                                            @click="
                                                handlePictureCardPreview(file)
                                            "
                                        >
                                            <i class="el-icon-zoom-in"></i>
                                        </span>
                                        <span
                                            v-if="!disabled"
                                            class="el-upload-list__item-delete"
                                            @click="handleDownload(file)"
                                        >
                                            <i class="el-icon-download"></i>
                                        </span>
                                        <span
                                            v-if="!disabled"
                                            class="el-upload-list__item-delete"
                                            @click="handleRemove(file)"
                                        >
                                            <i class="el-icon-delete"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img
                                    width="100%"
                                    :src="dialogImageUrl"
                                    alt=""
                                />
                            </el-dialog>
                        </el-form-item>

                        <el-form-item label="相关附件">
                            <el-upload
                                class="upload-demo"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple
                            >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">
                                    将文件拖到此处，或<em>点击上传</em>
                                </div>
                                <div class="el-upload__tip" slot="tip">
                                    只能上传jpg/png文件，且不超过500kb
                                </div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="活动介绍">
                            <editor
                                v-model="postData.activityIntroduce"
                                :min-height="192"
                            ></editor>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button>关闭</el-button>
                <el-button type="primary" @click="postActivity">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="mapDialog.title" :visible.sync="mapDialog.open">
            <div id="mapContainer"></div>
            <div slot="footer" class="dialog-footer">
                <el-button>关闭</el-button>
                <el-button type="primary" @click="comfirmPlace"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        activityList,
        activityIdNextStatus
    } from '@/api/application/secondClass/activity'
    import { schoolYearList } from '@/api/application/secondClass/schoolYear'
    import { trainingProgramDetail } from '@/api/application/secondClass/trainingProgram'
    import { courseClassificationList } from '@/api/application/secondClass/courseClassification'
    import { deptListByType } from '@/api/system/dept'
    import filterCourseClassificationList from '@/utils/filterCourseClassificationList'
    import transformDate from '@/utils/transformDate'
    import addDialog from './addDialog'
    import formatDate from '@/utils/formatDate.js'
    import { getDict } from '@/api/application/secondClass/dict/type.js'
    import horwheel from 'horwheel'
    import Editor from '@/components/Editor'
    export default {
        name: 'activity',
        components: {
            addDialog,
            Editor
        },
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                courseList: [],
                postFakeDate: {
                    maxAdmissionNumber: 0,
                    registeTime: 0
                },
                postData: {
                    name: '', //活动名称
                    groupPathName: '', //主办方完整名字
                    groupId: '', //主办方ID
                    activityReleaserId: '', //发布人ID
                    deptId: '', //部门Id
                    guideTeacherId: '', //指导老师Id

                    enrollTime: '', //转换前的报名时间
                    enrollStartTime: '', //转后的报名开始时间
                    emrollEndTime: '', //转后的报名结束时间
                    admissionWay: '', //录取方式
                    enrollRange: '', //报名范围
                    enrollGrage: '', //报名年级
                    maxAdmissionNumber: '', //最大录取人数
                    enrollNotice: '', //报名须知

                    rankId: '', //活动级别
                    activityTag: '', //活动标签
                    courseClassificationId: '', //课程分类
                    courseClassificationName: '', //关联的课程的课程分类完整名字
                    integralScheme: '', //积分方案
                    activityTime: '', //转换前的活动时间
                    activityStartTime: '', //活动开始时间
                    activityEndTime: '', //活动结束时间
                    vacate: '', //允许请假
                    flowerStatus: '', //是否开启花絮
                    evaluateStatus: '', //是否开启评价
                    activityPlace: '', //活动地点坐标
                    activityRegisteDistance: '', //活动签到距离
                    activityPlaceName: '', //活动地点名称
                    registeTime: '', //签到时间
                    registeStartTime: '', //签到开始时间
                    registeEndTime: '', //签到结束时间
                    activityManagerId: '', //活动负责人
                    activityOrganizerId: '', //活动组织者
                    images: '', //活动素材
                    enclosure: '', //相关附件链接
                    activityIntroduce: '' //活动介绍
                },
                targetOffset: undefined,
                //map
                mapDialog: {
                    title: '地图',
                    open: false,
                    lat: '', //j
                    lng: '' //w
                },
                //积分类别
                integral: '',
                addActivity: {
                    title: '新增/修改',
                    open: false
                },
                groupTags: {
                    dynamicTags: ['2003010727 - 张光辉 '],
                    inputVisible: false,
                    inputValue: ''
                },
                peopleTags: {
                    dynamicTags: ['2003010727 - 张光辉 '],
                    inputVisible: false,
                    inputValue: ''
                },
                RangeTags: {
                    dynamicTags: ['机电工程学院', '土木工程学院'],
                    inputVisible: false,
                    inputValue: ''
                },
                //报名年级
                yearTags: {
                    dynamicTags: ['2018', '2019', '2020'],
                    inputVisible: false,
                    inputValue: ''
                },
                //活动标签
                activityTags: {
                    dynamicTags: ['创新创业'],
                    inputVisible: false,
                    inputValue: ''
                },

                deptListMap: [],
                loading: false,
                queryList: {
                    deptId: '', //部门名称
                    name: '', //活动名称
                    id: '', //活动ID
                    courseId: '', //课程id
                    groupName: '', //主办方名称
                    admissionWay: '', //录取方式
                    time: '', //发布时间
                    coursePath: '',
                    courseClassificationId: '', //活动分类Id
                    recommend: '', //是否推荐
                    activityStatusId: '',
                    beginCreateTime: '',
                    endCreateTime: ''
                },
                schoolYearList: {
                    value: '',
                    rows: []
                },
                schoolYearIdMapName: [],
                /** 积分标准 */
                datadata: [],
                queryParams: {
                    totalCount: 0,
                    totalPage: 0,
                    pageNum: 1,
                    pageSize: 10
                },
                activityData: [],
                //活动状态
                dict_sc_activity_status: [],
                //活动录取方式
                dict_sc_activity_admission_way: [],
                //培养方案级别
                dict_sc_train_program_rank: [],
                //操作映射
                operation: [
                    [
                        { title: '修改', status: 0, icon: 'el-icon-edit' },
                        {
                            title: '申请发布',
                            status: 1,
                            icon: 'el-icon-s-release'
                        },
                        {
                            title: '管理员发布',
                            status: 2,
                            icon: 'el-icon-s-release'
                        },
                        {
                            title: '取消',
                            status: 4,
                            icon: 'el-icon-circle-close'
                        }
                    ],
                    [
                        { title: '审批', status: 2, icon: 'el-icon-s-check' },
                        {
                            title: '撤回',
                            status: 0,
                            icon: 'el-icon-d-arrow-right'
                        }
                    ],
                    [
                        {
                            title: '启动报名',
                            status: 5,
                            icon: 'el-icon-caret-right'
                        },
                        {
                            title: '撤回',
                            status: 0,
                            icon: 'el-icon-d-arrow-right'
                        },
                        {
                            title: '取消',
                            status: 4,
                            icon: 'el-icon-circle-close'
                        }
                    ],
                    [
                        { title: '修改', status: 0, icon: 'el-icon-edit' },
                        {
                            title: '取消',
                            status: 4,
                            icon: 'el-icon-circle-close'
                        }
                    ],
                    [
                        {
                            title: '恢复',
                            status: 0,
                            icon: 'el-icon-refresh-right'
                        }
                    ],
                    [
                        {
                            title: '结束报名',
                            status: 6,
                            icon: 'el-icon-video-pause'
                        },
                        {
                            title: '启动活动',
                            status: 7,
                            icon: 'el-icon-caret-right'
                        },
                        {
                            title: '暂停报名',
                            status: 2,
                            icon: 'el-icon-video-pause'
                        },
                        {
                            title: '撤回',
                            status: 0,
                            icon: 'el-icon-d-arrow-right'
                        }
                    ],
                    [
                        {
                            title: '启动活动',
                            status: 7,
                            icon: 'el-icon-caret-right'
                        },
                        {
                            title: '恢复报名',
                            status: 5,
                            icon: 'el-icon-refresh-right'
                        }
                    ],
                    [
                        {
                            title: '结束活动',
                            status: 8,
                            icon: 'el-icon-video-pause'
                        },
                        {
                            title: '暂停活动',
                            status: 6,
                            icon: 'el-icon-video-pause'
                        }
                    ],
                    [
                        {
                            title: '取消',
                            status: 4,
                            icon: 'el-icon-circle-close'
                        },
                        {
                            title: '恢复活动',
                            status: 7,
                            icon: 'el-icon-refresh-right'
                        }
                    ]
                ]
            }
        },
        methods: {
            activityRegisteDistanceChange(label) {
                label == 0 && (this.postData.activityRegisteDistance = '')
            },
            registeTimeChange(label) {
                label == 0 && (this.postData.registeTime = '')
            },
            admissionNumberChange(label) {
                console.log(label)
                label == 0 && (this.postData.maxAdmissionNumber = '')
            },
            activityTimeChange() {},
            enrollTimeChange() {},
            getContainer() {
                return document.querySelector('.formDetail')
            },
            groupHandleClose(tag) {
                this.groupTags.dynamicTags.splice(
                    this.groupTags.dynamicTags.indexOf(tag)
                )
            },

            groupShowInput() {
                this.groupTags.inputVisible = true
                this.$nextTick(_ => {
                    this.$refs.groupSaveTagInput.$refs.input.focus()
                })
            },
            groupHandleInputConfirm() {
                let inputValue = this.groupTags.inputValue
                if (inputValue) {
                    this.groupTags.dynamicTags.push(inputValue)
                }
                this.groupTags.inputVisible = false
                this.groupTags.inputValue = ''
            },
            //people
            peopleHandleClose(tag) {
                this.peopleTags.dynamicTags.splice(
                    this.peopleTags.dynamicTags.indexOf(tag)
                )
            },

            peopleShowInput() {
                this.peopleTags.inputVisible = true
                this.$nextTick(_ => {
                    this.$refs.peopleSaveTagInput.$refs.input.focus()
                })
            },
            peopleHandleInputConfirm() {
                let inputValue = this.peopleTags.inputValue
                if (inputValue) {
                    this.peopleTags.dynamicTags.push(inputValue)
                }
                this.peopleTags.inputVisible = false
                this.peopleTags.inputValue = ''
            },
            //actiove
            activityHandleClose(tag) {
                this.activityTags.dynamicTags.splice(
                    this.activityTags.dynamicTags.indexOf(tag)
                )
            },

            activityShowInput() {
                this.activityTags.inputVisible = true
                this.$nextTick(_ => {
                    this.$refs.activitySaveTagInput.$refs.input.focus()
                })
            },

            activityHandleInputConfirm() {
                let inputValue = this.activityTags.inputValue
                if (inputValue) {
                    this.activityTags.dynamicTags.push(inputValue)
                }
                this.activityTags.inputVisible = false
                this.activityTags.inputValue = ''
            },
            //asdf
            yearHandleClose(tag) {
                this.yearTags.dynamicTags.splice(
                    this.yearTags.dynamicTags.indexOf(tag),
                    1
                )
            },

            yearShowInput() {
                this.yearTags.inputVisible = true
                this.$nextTick(_ => {
                    this.$refs.yearSaveTagInput.$refs.input.focus()
                })
            },

            yearHandleInputConfirm() {
                let inputValue = this.yearTags.inputValue
                if (inputValue) {
                    this.yearTags.dynamicTags.push(inputValue)
                }
                this.yearTags.inputVisible = false
                this.yearTags.inputValue = ''
            },
            //sdf
            RangeHandleClose(tag) {
                this.RangeTags.dynamicTags.splice(
                    this.RangeTags.dynamicTags.indexOf(tag),
                    1
                )
            },

            RangeShowInput() {
                this.RangeTags.inputVisible = true
                this.$nextTick(_ => {
                    this.$refs.RangeSaveTagInput.$refs.input.focus()
                })
            },

            RangeHandleInputConfirm() {
                let inputValue = this.RangeTags.inputValue
                if (inputValue) {
                    this.RangeTags.dynamicTags.push(inputValue)
                }
                this.RangeTags.inputVisible = false
                this.RangeTags.inputValue = ''
            },
            openMap() {
                this.mapDialog.open = true
                this.$nextTick(() => {
                    let map = new BMapGL.Map('mapContainer') // 创建Map实例
                    map.centerAndZoom(
                        new BMapGL.Point(112.927988, 27.908385),
                        17
                    ) // 初始化地图,设置中心点坐标和地图级别
                    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
                    let marker2
                    let menu = new BMapGL.ContextMenu()
                    let txtMenuItem = [
                        {
                            text: '放大一级',
                            callback: function() {
                                map.zoomIn()
                            }
                        },
                        {
                            text: '缩小一级',
                            callback: function() {
                                map.zoomOut()
                            }
                        }
                    ]
                    for (let i = 0; i < txtMenuItem.length; i++) {
                        menu.addItem(
                            new BMapGL.MenuItem(
                                txtMenuItem[i].text,
                                txtMenuItem[i].callback,
                                100
                            )
                        )
                    }
                    map.addEventListener('click', e => {
                        if (marker2) {
                            this.mapDialog.lng = e.latlng.lng
                            this.mapDialog.lat = e.latlng.lat
                            this.$forceUpdate()
                            return
                        }
                        let status = confirm('您确定该地为活动地点吗？')
                        console.log(e)

                        if (status) {
                            marker2 = new BMapGL.Marker(
                                new BMapGL.Point(e.latlng.lng, e.latlng.lat),
                                {
                                    enableDragging: true
                                }
                            )
                            map.addOverlay(marker2)
                            this.mapDialog.lng = e.latlng.lng
                            this.mapDialog.lat = e.latlng.lat
                            this.$forceUpdate()
                        }
                    })
                })
            },
            comfirmPlace() {
                this.mapDialog.open = false
            },

            formatAdmissionWay(row, column, cellValue) {
                return (
                    cellValue != null &&
                    this.dict_sc_activity_admission_way[cellValue].dictLabel
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
            handChangeNodePost(value) {
                this.postData.courseClassificationId = value[value.length - 1]
                this.getCourseList({
                    classificationId: value[value.length - 1]
                })
            },
            /** 有些问题 */
            handChangeNode(value) {
                this.queryList.courseClassificationId = value[value.length - 1]
                console.log(value)
                this.getCourseList({
                    classificationId: value[value.length - 1]
                })
            },
            getCourseList(option) {
                trainingProgramDetail(option).then(value => {
                    this.courseList = value.data.pageData.list
                    console.log(this.courseList)
                })
            },
            postActivity() {
                console.log(this.postData)
            },
            /**
             * @description: 改变活动状态
             * @param {*} id 活动当前状态id
             * @param {*} nextStatus 目标状态id
             */

            changeStatus(id, nextStatus) {
                console.log(id, nextStatus)
                activityIdNextStatus({
                    id,
                    nextStatus
                }).then(value => {
                    console.log(value)

                    this.fuzzyQuery()
                })
            },
            handleImport() {
                this.addActivity.open = true
            },
            /**
             * @description: 确定课程状态类名
             * @param {*} status
             */

            sureClass(status) {
                if ([0, 8, 4].includes(status)) {
                    return 'textGray'
                } else if ([1, 3, 6].includes(status)) {
                    return 'textRed'
                } else {
                    return 'textGreen'
                }
            },
            /**
             * @description: 初始化字典
             */

            async initDict() {
                await Promise.all([
                    getDict('sc_activity_status'),
                    getDict('sc_activity_admission_way'),
                    getDict('sc_train_program_rank'),
                    getDict('sc_activity_admission_way')
                ]).then(value => {
                    let tempArr = [
                        'dict_sc_activity_status',
                        'dict_sc_activity_admission_way',
                        'dict_sc_train_program_rank',
                        'dict_sc_activity_admission_way'
                    ]

                    value.forEach((item, index) => {
                        this[tempArr[index]] = item.data
                    })
                })
            },
            /**
             * @description: 获得分类列表
             */

            getClassificationList() {
                courseClassificationList().then(value => {
                    value.data = value.data.map(item => ({
                        ...item,
                        value: item.id,
                        label: item.name
                    }))
                    //挂载算法
                    this.datadata = filterCourseClassificationList(value)
                })
            },
            /**
             * @description: 获得学年列表
             */

            getSchoolYearList() {
                schoolYearList().then(value => {
                    this.schoolYearList.rows = value.rows
                    value.rows.forEach(item => {
                        this.schoolYearIdMapName[item.id] = item.yearName
                    })
                })
            },
            /**
             * @description: 模糊查询活动
             * @param schoolYearId 学年id
             * @param name 活动名称
             * @param id 活动ID
             * @param courseId 课程Id
             * @param groupName 主办方名称
             * @param deptId 部门id
             * @param admissionWay 录取方式
             * @param courseClassificationId 分类id
             * @param recommend 是否推荐
             * @param activityStatusId 活动状态id
             * @param pageNum 第几页
             * @param pageSize 多少条
             * @param {(2)Array} params 开始时间与结束时间
             */

            getActivityList(option) {
                this.loading = true
                activityList(option).then(value => {
                    console.log(value)
                    this.queryParams.totalCount = value.total
                    this.queryParams.totalPage = Math.ceil(
                        this.queryParams.totalCount / this.queryParams.pageSize
                    )
                    this.activityData = value.rows
                    this.loading = false
                })
            },
            /**
             * @description: 重置表单
             */

            reset() {
                this.schoolYearList.value = ''
                this.queryList = {
                    deptId: '', //部门名称
                    name: '', //活动名称
                    id: '', //活动ID
                    courseId: '', //课程id
                    groupName: '', //主办方名称
                    admissionWay: '', //录取方式
                    coursePath: '',
                    time: '', //发布时间
                    courseClassificationId: '', //活动分类Id
                    recommend: '', //是否推荐
                    activityStatusId: '',
                    beginCreateTime: '',
                    endCreateTime: ''
                }

                this.fuzzyQuery()
            },
            fuzzyQuery() {
                let option = {
                    schoolYearId: this.schoolYearList.value,
                    name: this.queryList.name,
                    id: this.queryList.id,
                    courseId: this.queryList.courseId,
                    groupName: this.queryList.groupName,
                    deptId: this.queryList.deptId,
                    admissionWay: this.queryList.admissionWay,
                    // createTime: this.queryList.createTime,
                    courseClassificationId: this.queryList
                        .courseClassificationId,
                    recommend: this.queryList.recommend,
                    activityStatusId: this.queryList.activityStatusId,
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize,
                    params: {
                        // beginCreateTime:'2021-07-15 16:19:50',
                        // endCreateTime: '2021-9-15 16:19:32'
                    }
                }
                if (this.queryList.time) {
                    let fuckMan = transformDate(this.queryList.time)
                    option.params.beginCreateTime = fuckMan[0]
                    option.params.endCreateTime = fuckMan[1]
                }
                this.getActivityList(option)
            }
        },
        computed: {
            computedStatus() {
                return status => {
                    return this.dict_sc_activity_status[status]?.dictLabel
                }
            }
        },
        async created() {
            await this.initDict()
            this.fuzzyQuery() //初次查询
            this.getSchoolYearList() //查询学年
            this.getClassificationList() //查询分类列表

            deptListByType({ type: 1 }).then(value => {
                this.deptListMap = Object.entries(value.data)
            })
        },
        mounted() {
            this.$nextTick(() => {
                // new XScrollbar(document.querySelector('.el-table--scrollable-x .el-table__body-wrapper'),{
                //     onlyHorizontal:true,
                //     preventDefault:false
                // })
            })
            this.targetOffset = window.innerHeight / 2
        }
    }
</script>

<style scoped>
    .erke-top {
        margin-right: 10px;
        height: 170px;
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
    }
    .el-input {
        width: 200px;
    }

    .el-dialog {
        /* height: 475px !important; */
        overflow: hidden;
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
    .activityCascader >>> .el-input__inner {
        width: 220px;
        /* margin-right: 10px; */
    }

    .addActivity >>> .el-input__inner {
        width: 300px;
    }
    .addActivity >>> .el-row {
        margin: 12px 0;
        overflow: hidden;
    }
    .addActivity >>> .el-form {
        overflow: auto;
        height: 553px;
    }
    .lh30 {
        line-height: 30px;
    }
    .addActivity >>> .el-tabs__header {
        width: 120px;
    }
    .addActivity >>> .el-form-item__content {
        padding-right: 80px;
    }
    .addActivity >>> .el-dialog__body {
        height: 560px;
        padding-top: 0;
        padding-bottom: 0;
        padding-right: 0;
    }
    .addActivity >>> .el-tabs__nav {
        padding-top: 20px !important;
    }
    .addActivity >>> .el-form-item__label {
        font-weight: 400;
    }
    .bold >>> label {
        font-weight: 700 !important;
        font-size: 18px;
    }
    .addActivity >>> .el-form-item {
        margin-bottom: 8px;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    #mapContainer {
        overflow: hidden;
        width: 100%;
        /* height: 100%; */
        height: 600px;
        margin: 0;
        font-family: '微软雅黑';
    }
    .addActivity >>> .ant-anchor-ink::before {
        left: 100px !important;
    }
    .addActivity >>> .ant-anchor-ink-ball {
        left: 101px !important;
    }
</style>
