<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->

            <!--用户数据-->
            <el-col :span="24" :xs="24">


                <div class="erke-bottom">
                    
                    <div class="erke-buttom-right">
                        <div class="operate">
                            <el-form :inline="true">
                                <el-row :gutter="10" type="flex" justify="start" style="flexWrap:wrap">
                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="学号：">
                                            <el-input data-text></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width: 185px">
                                        <el-form-item label="姓名：">
                                            <el-input data-text></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1"  style="min-width: 180px">
                                        <el-form-item label="花絮状态">
                                            <el-select value="全部" style="width:90px">
                                                <el-option value="全部"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1"  style="min-width: 340px">
                                        <el-form-item label="发布时间">
                                            <el-date-picker
                                                align="right"
                                                type="datetimerange"
                                                range-separator="至"
                                                >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="min-width:150px">
                                        <el-form-item label="">
                                            <el-button type="primary" size="mini">查询</el-button>
                                            <el-button size="mini">重置</el-button>
                                        </el-form-item>
                                        
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                        <el-table
                            :data="flocculus"
                            height="550"
                            class="msgTable"
                        >
                            <el-table-column
                                label="发布者信息"
                                align="center"
                                width="120"
                            >
                                <template slot-scope="{row}">
                                    <img :src="row.avatar" alt="" class="avatar">
                                    <br>{{row.name }}
                                    <br>{{row.sno}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                label="发布内容"
                                width="800"
                            >
                                <template slot-scope="{row}">
                                    {{row.remark}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                label="发布图片"
                                prop="imgs"
                                :min-width="computedLength"
                            >
                                <template slot-scope="{row}">
                                    <img 
                                        v-for="(item,index) in row.imgs"
                                        :key="index"
                                        :src="item" 
                                        class="imgs"
                                    >
                                </template>
                            </el-table-column>

                            <el-table-column
                                label="操作"
                                width="100"
                                align="center"
                                fixed="right"
                            >
                                <template slot-scope="{row}">
                                    已发布<br>
                                    <el-button type="primary" size="mini">同意发布</el-button><br>
                                    <el-button size="mini">取消发布</el-button>
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
                maxLength: 0,
                flocculus: [],
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4
                }
            }
        },
        computed: {
            computedLength() {
                
                
                // return this.flocculus
                return this.maxLength * 150 + ''
            }
        },
        methods:{
            initimgLength() {
                this.flocculus.forEach((item) => {
                    this.maxLength = Math.max(this.maxLength,item.imgs.length)
                })
                console.log('this.maxLength:' ,this.maxLength)
            }
        },
        mounted() {
            this.flocculus = [
                {
                    avatar: 'https://img2.baidu.com/it/u=1205915504,3217808836&fm=26&fmt=auto&gp=0.jpg',
                    name: '士大夫',
                    sno:1905010504,
                    remark: '本次活动主持人们提前就位预先排练，两个友好社团的吉他和情书节目令人喜爱，本社团的赛车视频宣传和赛车模拟驾驶博得了大家的好评，整体氛围热烈而有序，是一次值得肯定的优秀的团组织生活会',
                    imgs:[
                        'https://img2.baidu.com/it/u=2499781449,1300549406&fm=15&fmt=auto&gp=0.jpg',
                        'https://img1.baidu.com/it/u=2010302211,4096592834&fm=15&fmt=auto&gp=0.jpg',
                        'https://img2.baidu.com/it/u=2499781449,1300549406&fm=15&fmt=auto&gp=0.jpg',
                        'https://img1.baidu.com/it/u=2010302211,4096592834&fm=15&fmt=auto&gp=0.jpg',
                        'https://img2.baidu.com/it/u=2499781449,1300549406&fm=15&fmt=auto&gp=0.jpg',
                        'https://img1.baidu.com/it/u=2010302211,4096592834&fm=15&fmt=auto&gp=0.jpg',
                    ]
                },
                {
                    avatar: 'https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg',
                    name: '风格化',
                    sno:1903010124,
                    remark: '本次活动主持人们提前就位预先排练，两个友好社团的吉他和情书节目令人喜爱，本社团的赛车视频宣传和赛车模拟驾驶博得了大家的好评，整体氛围热烈而有序，是一次值得肯定的优秀的团组织生活会',
                    imgs:[
                        'https://img2.baidu.com/it/u=58773708,423404861&fm=15&fmt=auto&gp=0.jpg',
                        'https://img0.baidu.com/it/u=425326927,1587096560&fm=26&fmt=auto&gp=0.jpg'
                    ]
                }
            ]
            this.initimgLength()
            let view = document.querySelector('.msgTable .el-table__body-wrapper')
            view && horwheel(view) && console.log(view)
            // new this.XScrollbar(view)
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
    .erke-bottom {
        /* background-color: #fff; */

        overflow: hidden;
    }

    .erke-buttom-right {
        background-color: #fff;
        margin-left: 0px;
        height: calc(100vh - 140px);
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .operate >>> .el-input__inner[data-text] {
        width: 110px;
    }
    .operate >>> .el-date-editor {
        width: 250px;
    }
    .el-row {
        height: initial;
    }
    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
    }
    .imgs {
        width: 120px;
        height: 80px;
        margin: 0 10px;
    }
</style>
