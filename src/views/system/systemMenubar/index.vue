<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-07-24 17:39:29
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-10-10 18:08:26
-->
<template>
    <div class="menubar">
        <div class="menubar-title">
            <router-link to="/home">
                <i class="el-icon-arrow-left"></i>
            </router-link>
            系统管理
        </div>
        <el-menu
            :unique-opened="true"
            text-color="#333"
            active-text-color="#1890ff"
            :default-active="$route.path"
            :router="true"
        >
            <el-menu-item index="/system/user" v-hasPermi="['system:user']">
                <i class="el-icon-user"></i>
                <template slot="title">用户管理</template>
            </el-menu-item>
            <el-menu-item index="/system/role" v-hasPermi="['system:role']">
                <i class="el-icon-user"></i>
                <template slot="title">角色管理</template>
            </el-menu-item>
            <el-menu-item index="/system/menu" v-hasPermi="['system:menu']">
                <i class="el-icon-user"></i>
                <template slot="title">菜单管理</template>
            </el-menu-item>
            <!-- <el-menu-item index="/system/dept">
                <i class="el-icon-user"></i>
                <template slot="title">部门管理</template>
            </el-menu-item> -->
            <el-menu-item index="/system/post" v-hasPermi="['system:post']">
                <i class="el-icon-user"></i>
                <template slot="title">岗位管理</template>
            </el-menu-item>
            <el-menu-item index="/system/dict" v-hasPermi="['system:dict']">
                <i class="el-icon-user"></i>
                <template slot="title">字典管理</template>
            </el-menu-item>
            <el-menu-item index="/system/config" v-hasPermi="['system:user']">
                <i class="el-icon-user"></i>
                <template slot="title">参数管理</template>
            </el-menu-item>
            <el-menu-item index="/system/notice" v-hasPermi="['system:notice']">
                <i class="el-icon-user"></i>
                <template slot="title">通知管理</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    /*6.2lsh修改*/
    import store from '@/store'
    export default {
        name: 'erkeMenubar',
        data() {
            return {}
        },
        mounted() {
            // console.log(this.$router,this.$route)
            const permissions = store.getters && store.getters.permissions
            console.log(permissions,123)
            
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
        text-align: left;
        padding-left: 0px;
        /* font-size: 18px; */
        border-bottom: 1px dashed #ccc;
    }
</style>
