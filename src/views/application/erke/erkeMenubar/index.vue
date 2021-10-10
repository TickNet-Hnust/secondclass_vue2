<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:20:23
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-10-10 19:09:30
-->
<template>
    <div class="menubar">
        <div class="menubar-title">
            <router-link to="/home">
                <i class="el-icon-arrow-left"></i>
            </router-link>
            第二课堂成绩单
        </div>
        <el-menu
            :unique-opened="true"
            text-color="#333"
            active-text-color="#1890ff"
            :default-active="$route.path"
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>课程</span>
                </template>
                <el-menu-item index="/application/erke/erkePlan" @click="jump('/application/erke/erkePlan')">
                    培养方案
                </el-menu-item>
                <el-menu-item index="/application/erke/erkeStandard" @click="jump('/application/erke/erkeStandard')">
                    积分标准
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>活动</span>
                </template>
                <el-menu-item index="/application/erke/activity" @click="jump('/application/erke/activity')"
                    >活动管理</el-menu-item
                >
                <el-menu-item index="1" @click="dev">场地申请</el-menu-item>
                <el-menu-item index="2" @click="dev">成长记录认证</el-menu-item>
                <el-menu-item index="3" @click="dev">内容管理</el-menu-item>
                <el-menu-item index="4" @click="dev">待办管理</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    /*6.2lsh修改*/
    export default {
        name: 'erkeMenubar',
        data() {
            return {}
        },
        methods:{
            dev(e) {
                this.msgInfo('该功能正在开发中')
                return
            },
            jump(path) {
                this.$router.push(path)
            }
        },
        mounted() {
            // console.log(this.$router,this.$route)
        }
    }
</script>

<style scoped>
    .menubar {
        padding: 15px;
        margin-left: 60px;
        margin-top: 1px;
        background: #fff;
        width: 200px;
        min-height: calc(100vh - 1px);
        float: left;
    }
    .menubar-title {
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px dashed #ccc;
    }
</style>
