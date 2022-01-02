<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:03:22
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-02 16:52:05
-->
<docs>
    Todo:
        🎮竞赛报名
        📜电子证书
        📓待办
        📧消息
</docs>
<template>
    <div class="menubar">
        <div class="menubar-title">
            <img src="../../../assets/home/images/keda.png" alt="" />
        </div>

        <el-menu
            :unique-opened="true"
            text-color="#333"
            active-text-color="#1890ff"
            default-active="/home"
            :router="true"
        >
            <el-menu-item index="/home">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
    
            <el-menu-item index="/systemManage">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">系统管理</span>
                </template>
            </el-menu-item>

            <el-submenu index="/application">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">应用</span>
                </template>
                <el-menu-item index="/application/erke">
                    <template slot="title"> 第二课堂成绩单 </template>
                </el-menu-item>
                <el-menu-item index="/application/group">
                    <template slot="title"> 群组管理 </template>
                </el-menu-item>
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
            dev(){
                this.msgInfo('该功能正在开发中')
                return
            }
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
        height: calc(100vh - 1px);
        float: left;
    }
    .menubar-title {
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .menubar-title img {
        width: 130px;
    }
    .el-menu[role='menubar'] > li {
        padding: 0 !important;
    }
</style>
