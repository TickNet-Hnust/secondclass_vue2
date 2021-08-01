<template>
    <div>
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
                            <el-input v-model="postData.groupPathName"></el-input>
                        </el-form-item>

                        <el-form-item label="发布人：">
                            <el-input></el-input>
                        </el-form-item>

                        <el-form-item label="指导单位">
                            <el-select v-model="postData.deptId">
                                <el-option 
                                    v-for="(item,index) in deptListMap"
                                    :key="index"
                                    :value="item[0]"
                                    :label="item[1]"
                                ></el-option>

                            </el-select>
                        </el-form-item>

                        <el-form-item label="指导老师：">
                            <el-input ></el-input>
                        </el-form-item>

                        <el-form-item label="报名信息" class="bold"
                            ><a id="bm"></a
                        ></el-form-item>

                        <el-form-item label="报名时间">
                            <el-date-picker
                                v-model="postData.enrollTime"
                                type="datetimerange"
                                @change="TimeChange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="录取方式">
                            <el-select v-model="postData.admissionWay">
                                <el-option 
                                    v-for="(item,index) in dict_sc_activity_admission_way"
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
                                placeholder="请选择文章标签">
                                <el-option
                                    v-for="(item,index) in deptListMap"
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
                            <el-radio-group v-model="numberText"  @change="admissionNumberChange">
                                <el-radio :label="0">不限</el-radio>
                                <el-radio :label="1">
                                    限定人数
                                    <el-input 
                                        v-model="postData.maxAdmissionNumber"
                                    ></el-input>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="报名须知"> </el-form-item>

                        <el-form-item label="活动信息" class="bold"
                            ><a id="hd"></a
                        ></el-form-item>

                        <el-form-item label="活动级别">
                            <el-select :value="1">
                                <el-option value="1">1</el-option>
                                <el-option value="1">2</el-option>
                                <el-option value="1">3</el-option>
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

                        <el-form-item label="活动分类">
                            <el-select value="思想政治和人文素养">
                                <el-option value="1">1</el-option>
                                <el-option value="1">2</el-option>
                                <el-option value="1">3</el-option>
                            </el-select>
                            --
                            <el-select value="新生入学教育">
                                <el-option value="1">1</el-option>
                                <el-option value="1">2</el-option>
                                <el-option value="1">3</el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="积分方案">
                            <el-radio v-model="integral" label="1"
                                >活动签到获取积分 +
                                个人申报获取积分，管理员认定</el-radio
                            >
                        </el-form-item>
                        <el-form-item label="">
                            <el-radio v-model="integral" label="2"
                                >主办方申请，管理员认定</el-radio
                            >
                        </el-form-item>

                        <el-form-item label="报名时间">
                            <el-date-picker
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>
                        </el-form-item>

                        <el-form-item label="允许请假">
                            <el-switch></el-switch>
                        </el-form-item>

                        <el-form-item label="花絮管理">
                            <el-radio-group>
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
                            <el-radio-group>
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
                                经度：{{ this.mapDialog.lat }} 纬度：{{
                                    this.mapDialog.lng
                                }}
                            </div>
                        </el-form-item>

                        <el-form-item label="签到时间">
                            <el-radio-group>
                                <el-radio label="1">不限</el-radio>
                                <el-radio label="2"
                                    >时间范围 &nbsp;<el-date-picker
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                    ></el-date-picker
                                ></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="签到距离">
                            <el-radio-group>
                                <el-radio label="1">不限</el-radio>
                                <el-radio label="2">
                                    限定距离 &nbsp;
                                    <el-input></el-input>米
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
                    </el-form>
                </el-col>
            </el-row>

            <!-- <el-tabs class="addActivity" tab-position="left">
                <el-tab-pane label="概要">
                    
                </el-tab-pane>
                <el-tab-pane label="报名信息" style="padding: 30px">
                </el-tab-pane>
                <el-tab-pane label="活动信息" style="padding: 30px">
                </el-tab-pane>
            </el-tabs> -->
            <div slot="footer" class="dialog-footer">
                <el-button>关闭</el-button>
                <el-button type="primary">确 定</el-button>
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
    export default {
        props: ['deptListMap','dict_sc_activity_admission_way'],
        data() {
            return {
                numberText: 0,
                postData:{
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
                    integralScheme: '',//积分方案
                    activityTime: '', //转换前的活动时间
                    activityStartTime: '', //活动开始时间
                    activityEndTime: '', //活动结束时间
                    vacate: '', //允许请假
                    flowerStatus: '', //是否开启花絮
                    evaluateStatus: '', //是否开启评价
                    activityPlace: '', //活动地点坐标
                    activityRegisteDistance:'',//活动签到距离
                    activityPlaceName: '', //活动地点名称
                    registeTime: '', //签到时间
                    registeStartTime: '', //签到开始时间
                    registeEndTime: '', //签到结束时间
                    activityManagerId: '', //活动负责人
                    activityOrganizerId: '', //活动组织者
                    images: '', //活动素材
                    enclosure: '', //相关附件链接
                    activityIntroduce: '', //活动介绍
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
                }
            }
        },
        watch:{
            
        },
        computed: {},
        methods: {
            admissionNumberChange(label) {
                console.log(label)
                label == 0 && (this.postData.maxAdmissionNumber = '')
            },
            TimeChange() {

            },
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
            showDialog() {
                this.addActivity.open = true
                this.$forceUpdate()
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
            }
        },
        mounted() {
            console.log(this.deptListMap)
            this.targetOffset = window.innerHeight / 2
        }
    }
</script>

<style scoped>
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
