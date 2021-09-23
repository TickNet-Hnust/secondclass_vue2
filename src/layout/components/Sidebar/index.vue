<template>
    <div
        :class="{ 'has-logo': showLogo }"
        :style="{
            backgroundColor:
                settings.sideTheme === 'theme-dark'
                    ? variables.menuBg
                    : variables.menuLightBg
        }"
    >
        <div class="logo">
            <img src="../../../assets/sidebar/logo.png" alt="" />
        </div>

        <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
            <!-- style="width: 300% !important" -->
        <el-scrollbar
            :class="settings.sideTheme"
            wrap-class="scrollbar-wrapper"
        >
            <el-menu
                :default-active="activeMenu"
                :collapse="true"
                :background-color="
                    settings.sideTheme === 'theme-dark'
                        ? variables.menuBg
                        : variables.menuLightBg
                "
                :text-color="
                    settings.sideTheme === 'theme-dark'
                        ? variables.menuText
                        : 'rgba(0,0,0,.65)'
                "
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
            >
                <!-- <sidebar-item
                    v-for="(route, index) in sidebarRouters"
                    :key="route.path + index"
                    :item="route"
                    :kk="route.path + index"
                    :base-path="route.path"
                /> -->

                <sidebar-item
                    :item="home"
                    icon="home"
                    :key="44646"
                    :base-path="home.path"
                />
                <sidebar-item
                    :item="system"
                    icon="setting"
                    :key="564"
                    :base-path="system.path"
                />
                <sidebar-item
                    :item="application"
                    icon="appstore"
                    :key="count"
                    :base-path="application.path"
                />
            </el-menu>
        </el-scrollbar>
        <span style="">退出登录</span>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import Logo from './Logo'
    import SidebarItem from './SidebarItem'
    import variables from '@/assets/styles/variables.scss'

    export default {
        components: { SidebarItem, Logo },
        data() {
            return {
                count: 'dfgdf',
                home: {
                    name: 'Home',
                    path: '/home',
                    hidden: false,
                    meta: {
                        title: '首页',
                        icon: 'home',
                        noCache: false
                    }
                },
                application: {
                    name: 'Application',
                    path: '/application',
                    alwaysShow: true,
                    meta: {
                        title: '应用',
                        icon: 'appstore',
                        noCache: false
                    },
                    children: [
                        {
                            name: 'erke',
                            path: 'erke',
                            hidden: false,
                            meta: {
                                title: '第二课堂成绩单',
                                icon: '',
                                noCache: false
                            }
                        },
                        {
                            name: 'group',
                            path: 'group',
                            hidden: false,
                            meta: {
                                title: '群组管理',
                                icon: '',
                                noCache: false
                            }
                        },
                        {
                            name: 'js',
                            path: 'js',
                            hidden: true,
                            meta: {
                                title: '竞赛报名',
                                icon: '',
                                noCache: false
                            }
                        },
                        {
                            name: 'dz',
                            path: 'dz',
                            hidden: true,
                            meta: {
                                title: '电子证书',
                                icon: '',
                                noCache: false
                            }
                        }
                    ]
                },
                system: {
                    name: 'System',
                    path: '/system',
                    hidden: false,
                    meta: {
                        title: '系统管理',
                        icon: 'setting',
                        noCache: false
                    }
                }
            }
        },
        computed: {
            ...mapState(['settings']),
            ...mapGetters(['sidebarRouters', 'sidebar']),
            activeMenu() {
                const route = this.$route
                const { meta, path } = route
                // if set path, the sidebar will highlight the path you set
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            },
            showLogo() {
                // return false
                return this.$store.state.settings.sidebarLogo
            },
            variables() {
                return variables
            },
            isCollapse() {
                return true
                // return !this.sidebar.opened
            }
        },
        mounted() {
            console.log()
        }
    }
</script>

<style scope>
    div.logo {
        text-align: center;
        height: 70px;
        /* line-height: 50px; */
    }
    .logo img {
        width: 30px;
        margin-top: 18px;
    }
</style>
