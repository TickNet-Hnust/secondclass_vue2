<template>
    <div class="app-container">
        <div class="erke-top">
            <el-row type="flex" justify="space-between">
                <el-col :span="1" class="erke-top-head" style="min-width:380px">
                    <el-button
                        icon="el-icon-arrow-left"
                        circle
                        @click="back"
                        style="marginRight:15px"
                    ></el-button>
                    <span>{{name}}</span>
                </el-col>
                <el-col :span="2" style=";padding:10px 0;min-width:630px">
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
                    <el-button 
                        icon="el-icon-edit" 
                        circle
                        disabled
                    ></el-button>
                    <el-button
                        icon="el-icon-refresh"
                        circle
                        @click="refresh"
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
    import survey from '@/views/application/erke/activityDetail/survey/index.vue'
    import enrollment from '@/views/application/erke/activityDetail/enrollment/index.vue'
    import prize from '@/views/application/erke/activityDetail/prize/index.vue'
    import registration from '@/views/application/erke/activityDetail/registration/index.vue'
    import leave from '@/views/application/erke/activityDetail/leave/index.vue'
    import flocculus from '@/views/application/erke/activityDetail/flocculus/index.vue'
    import evaluation from '@/views/application/erke/activityDetail/evaluation/index.vue'
    import credit from '@/views/application/erke/activityDetail/credit/index.vue'

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
                name:this.$route.params.name,
                hackReset: true,
                /* 单选条件 */
                status: 'survey',
                queryParams: {
                    totalCount: 0,
                    totalPage: 50,
                    pageCount: 1,
                    pageSize: 4
                },
                aliveComponent: 'survey',
                aid:'',
                aName:'',
            }
        },
        created() {
            
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
                this.$router.push('/application/erke/activity')
            },
            getParams() {
                this.aid = this.$route.params.aid
                this.aName = this.$route.params.aName
            }
        },
        created(){
            this.getParams();
        },
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
        /* width: 370px; */
        padding: 0 20px;
        border-radius: 20px;
        text-align: center;
        line-height: 40px;
        color: #549eff;
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
