<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:03:22
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-10 16:36:35
-->
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
                <!-- <el-menu-item index="/system/user">
                    <template slot="title">用户管理</template>
                </el-menu-item>
                <el-menu-item index="/system/role">
                    <template slot="title">角色管理</template>
                </el-menu-item>
                <el-menu-item index="/system/menu">
                    <template slot="title">菜单管理</template>
                </el-menu-item>
                <el-menu-item index="/system/dept">
                    <template slot="title">部门管理</template>
                </el-menu-item>
                <el-menu-item index="/system/post">
                    <template slot="title">岗位管理</template>
                </el-menu-item>
                <el-menu-item index="/system/dict">
                    <template slot="title">字典管理</template>
                </el-menu-item>
                <el-menu-item index="/system/config">
                    <template slot="title">参数管理</template>
                </el-menu-item>
                <el-menu-item index="/system/notice">
                    <template slot="title">通知管理</template>
                </el-menu-item> -->
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
                <el-menu-item>
                    <template slot="title"> 竞赛报名 </template>
                </el-menu-item>
                <el-menu-item>
                    <template slot="title"> 电子证书 </template>
                </el-menu-item>
            </el-submenu>
            <el-menu-item>
                <i class="el-icon-menu"></i>
                <span slot="title">待办</span>
            </el-menu-item>
            <el-menu-item>
                <i class="el-icon-menu"></i>
                <span slot="title">消息</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    /*6.2lsh修改*/
    export default {
        name: 'erkeMenubar',
        data() {
            return {}
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
