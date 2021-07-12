<template>
    <div class="app-container">
        <div class="erke-top">
            <el-row type="flex" justify="space-between">
                <el-col :span="1" class="erke-top-head" style="min-width:380px">
                    <span> <i>✈</i>『百年征程，党史回眸』书法展览学习活动</span>
                </el-col>
                <el-col :span="1" style=";padding:10px 0;min-width:610px">
                    <el-radio-group
                        v-model="status"
                        size="mini"
                        @change="switchStatus"
                    >
                        <el-radio-button label="survey">概况</el-radio-button>
                        <el-radio-button label="enrollment"
                            >报名管理</el-radio-button
                        >
                        <el-radio-button label="prize"
                            >奖项管理</el-radio-button
                        >
                        <el-radio-button label="registration"
                            >签到管理</el-radio-button
                        >
                        <el-radio-button label="leave"
                            >请假管理</el-radio-button
                        >
                        <el-radio-button label="flocculus"
                            >花絮管理</el-radio-button
                        >
                        <el-radio-button label="evaluation"
                            >评价管理</el-radio-button
                        >
                        <el-radio-button label="credit"
                            >学分管理</el-radio-button
                        >
                    </el-radio-group>
                </el-col>
                <el-col :span="1" style="min-width:130px">
                    <el-button icon="el-icon-edit" circle></el-button>
                    <el-button icon="el-icon-refresh" circle></el-button>
                    <el-button icon="el-icon-close" circle></el-button>
                </el-col>
            </el-row>
        </div>

        <!-- <keep-alive> -->
        <transition name="fade-transform" mode="out-in">
            <component :is="aliveComponent"></component>
        </transition>
        <!-- </keep-alive> -->
        <!-- <div class="erke-bottom"> -->
        <!-- <router-view></router-view> -->
        <!-- </div> -->
    </div>
</template>

<script>
    import survey from '@/views/application/erke/activityDetail/survey/index.vue'
    import enrollment from '@/views/application/erke/activityDetail/enrollment/index.vue'
    import prize from '@/views/application/erke/activityDetail/prize/index.vue'
    import registration from '@/views/application/erke/activityDetail/registration/index.vue'
    import leave from '@/views/application/erke/activityDetail/leave/index.vue'
    import flocculus from '@/views/application/erke/activityDetail/flocculus/index.vue'
    import evaluation from '@/views/application/erke/activityDetail/evaluation/index.vue'
    import credit from '@/views/application/erke/activityDetail/credit/index.vue'

    import formatDate from '@/utils/formatDate.js'
    import horwheel from 'horwheel'
    import { getToken } from '@/utils/auth'

    export default {
        name: 'activityDetail',
        components: {
            survey,
            enrollment,
            prize,
            registration,
            leave,
            flocculus,
            evaluation,
            credit
        },
        data() {
            return {
                /* 单选条件 */
                status: 'survey',
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4
                },
                aliveComponent: 'survey'
            }
        },
        methods: {
            switchStatus(target) {
                this.aliveComponent = target
            }
        }
    }
</script>

<style scoped>
    .erke-top {
        margin-right: 10px;
        /* height: 170px; */
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
        width: 370px;
        border-radius: 20px;
        text-align: center;
        line-height: 40px;
        color: #549eff;
    }
    .erke-top-head span i {
        display: inline-block;
        height: 24px;
        width: 24px;
        color: initial;
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
</style>
