<template>
    <div class="menubar">
        <div class="menubar-title">第二课堂成绩单</div>

        <el-menu
            :unique-opened="true"
            text-color="#333"
            active-text-color="#1890ff"
            default-active="1"
            :router="true"
        >
            <el-submenu index="1" >
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>课堂</span>
                </template>
                <el-menu-item index="/application/erke/erkePlan">
                    培养方案
                </el-menu-item>
                <el-menu-item index="/application/erke/erkeStandard">
                        积分标准
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>活动</span>
                </template>
                <el-menu-item index="2-1">批次</el-menu-item>
                <el-menu-item index="2-2">积分标准</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    /*6.2lsh修改*/
    export default {
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
        border-bottom: 1px dashed #aaa;
    }
</style>
