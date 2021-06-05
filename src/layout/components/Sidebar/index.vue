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
        <logo v-if="showLogo" :collapse="isCollapse" />
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
                <sidebar-item
                    v-for="(route, index) in sidebarRouters"
                    :key="route.path + index"
                    :item="route"
                    :kk="route.path + index"
                    :base-path="route.path"
                />
                
                <sidebar-item
                    :item="erke"
                    :key="count"
                    :kk="count"
                    :base-path="erke.path"
                />
            </el-menu>
        </el-scrollbar>
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
                count: "dfgdf",
                erke: {
                    name: 'Application',
                    path: '/application',
                    redirect: 'noRedirect',
                    alwaysShow: true,
                    meta: {
                        title: '应用',
                        icon: 'system',
                        noCache: false
                    },
                    children: [
                        {
                            name: 'erke',
                            path: 'erke',
                            hidden: false,
                            meta: {
                                title: '第二课堂成绩单',
                                icon: 'peoples',
                                noCache: false
                            }
                        },
                        {
                            name: 'erke',
                            path: 'erke',
                            hidden: false,
                            meta: {
                                title: '学生会报名',
                                icon: 'peoples',
                                noCache: false
                            }
                        },
                        {
                            name: 'erke',
                            path: 'erke',
                            hidden: false,
                            meta: {
                                title: '竞赛报名',
                                icon: 'peoples',
                                noCache: false
                            }
                        },
                        {
                            name: 'erke',
                            path: 'erke',
                            hidden: false,
                            meta: {
                                title: '电子证书',
                                icon: 'peoples',
                                noCache: false
                            }
                        },
                    ]
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
                // return false
                return !this.sidebar.opened
            }
        },
        mounted() {
            console.log()
        }
    }
</script>
