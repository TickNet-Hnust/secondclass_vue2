<template>
    <div
        :class="classObj"
        class="app-wrapper"
        :style="{ '--current-color': theme }"
    >
        <div class="avatar" @click="logout">
            注销
        </div>
        <div
            v-if="device === 'mobile' && sidebar.opened"
            class="drawer-bg"
            @click="handleClickOutside"
        />
        <sidebar
            class="sidebar-container"
            :style="{
                backgroundColor:
                    sideTheme === 'theme-dark'
                        ? variables.menuBg
                        : variables.menuLightBg
            }"
        />

        <!-- <div
            style=" ;"
            :class="{ hasTagsView: needTagsView }"
            class="main-container"
        >
            <div :class="{ 'fixed-header': fixedHeader }">
                
                <tags-view v-if="needTagsView" />
            </div>
            <app-main />
            <right-panel v-if="showSettings">
                <settings />
            </right-panel>
        </div> -->
        <router-view></router-view>
    </div>
</template>

<script>
    import XScrollbar from 'x-scrollbar'
    import RightPanel from '@/components/RightPanel'
    import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
    import ResizeMixin from './mixin/ResizeHandler.js'
    import { mapState } from 'vuex'
    import variables from '@/assets/styles/variables.scss'
    import {
        getInfo,
        logout
    } from '@/api/login.js'

    export default {
        name: 'Layout',
        components: {
            AppMain,
            Navbar,
            RightPanel,
            Settings,
            Sidebar,
            TagsView
        },
        mixins: [ResizeMixin],
        computed: {
            ...mapState({
                theme: state => state.settings.theme,
                sideTheme: state => state.settings.sideTheme,
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                showSettings: state => state.settings.showSettings,
                needTagsView: state => state.settings.tagsView,
                fixedHeader: state => state.settings.fixedHeader
            }),
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            },
            variables() {
                return variables
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('app/closeSideBar', {
                    withoutAnimation: false
                })
            },
            logout() {
                this.$confirm('确定注销并退出系统吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('LogOut').then(() => {
                        location.href = '/index'
                    })
                })
            }
        },
        mounted() {
            // getInfo().then(value => {
            //     console.error(value)
            // })
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/styles/mixin.scss';
    @import '~@/assets/styles/variables.scss';

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px);
    }

    .mobile .fixed-header {
        width: 100%;
    }
    .avatar {
        cursor: pointer;
        text-align: center;
        line-height: 45px;
        width: 45px;
        position: fixed;
        bottom: 7px;
        border-radius: 5px;
        background-color: #fff;
        font-size: 7px;
        color: #000;
        left: 7px;
        height: 45px;
        z-index: 1111;
    }
</style>
