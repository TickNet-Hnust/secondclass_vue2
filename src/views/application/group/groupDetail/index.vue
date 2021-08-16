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
                        <el-radio-button label="member">成员</el-radio-button>
                        <el-radio-button label="change"
                            >管理变更</el-radio-button
                        >
                        <el-radio-button label="list"
                            >活动列表</el-radio-button
                        >
                    </el-radio-group>
                </el-col>
                <el-col :span="1" style="min-width:130px">
                    <el-button icon="el-icon-edit" circle></el-button>
                    <el-button
                        icon="el-icon-refresh"
                        circle
                        @click="refresh"
                    ></el-button>
                    <el-button
                        icon="el-icon-close"
                        circle
                        @click="back"
                    ></el-button>
                </el-col>
            </el-row>
        </div>

        <transition name="fade-transform" mode="out-in">
            <keep-alive>
                <component v-if="hackReset" :is="aliveComponent"></component>
            </keep-alive>
        </transition>
        <!-- <div class="erke-bottom"> -->
        <!-- <router-view></router-view> -->
        <!-- </div> -->
    </div>
</template>

<script>
    import change from './change/index.vue'
    import list from './list/index.vue'
    import member from './member/index.vue'
    import { format } from '@/utils/gather.js'
    import horwheel from 'horwheel'
    import { getToken } from '@/utils/auth'

    export default {
        name: 'activityDetail',
        components:{
            change,
            list,
            member
        },
        data() {
            return {
                hackReset:true,
                status: 'member',
                queryParams: {
                    totalCount: 50,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4
                },
                aliveComponent: 'member'
            }
        },
        methods: {
            switchStatus(target) {
                this.aliveComponent = target
            },
            refresh() {
                this.hackReset = false
                this.$nextTick(() => {
                    this.hackReset = true
                })
            },
            back() {
                this.$router.push('/application/group/groupSelf')
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
