<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-10 16:31:31
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-10 16:50:09
-->
<template>
    <div class="menubar">
        <div class="menubar-title">
            <router-link to="/home">
                <i class="el-icon-arrow-left"></i>
            </router-link>
            群组管理
        </div>
        <el-menu
            :unique-opened="true"
            text-color="#333"
            active-text-color="#1890ff"
            :default-active="$route.path"
            :router="true"
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>指导单位</span>
                </template>
                <el-menu-item index="/application/group/guidance">
                    指导单位
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>群组</span>
                </template>
                <el-menu-item index="/application/group/groupClasify">分类</el-menu-item>
                <el-menu-item index="/application/group/groupSelf">群组</el-menu-item>
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
