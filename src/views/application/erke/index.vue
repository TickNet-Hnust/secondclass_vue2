<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:03:22
 * @LastEditors: Wang Dejiang(aei)
 * @LastEditTime: 2021-12-10 20:47:45
-->
<template>
    <div class="body">
        <Menubar/>
        <div
            :class="{ hasTagsView: needTagsView }"
            class="main-container"
        >
            <div :class="{ 'fixed-header': fixedHeader }">
                <tags-view v-if="needTagsView" />
            </div>

            <app-main />
        </div>
    </div>
</template>

<script>
    import Menubar from './erkeMenubar'
    import RightPanel from '@/components/RightPanel'
    import { AppMain, Navbar, TagsView } from '@/layout/components'
    // import ResizeMixin from '../mixin/ResizeHandler'
    import { mapState } from 'vuex'
    import variables from '@/assets/styles/variables.scss'

    export default {
        name: 'erke',
        components: {
            Menubar,
            AppMain,
            Navbar,

            TagsView
        },
        // mixins: [ResizeMixin],
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
            }
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
    .main-container {
        padding-right: 10px;
    }
    @media screen and (max-width: 1600px) {
        .main-container {
            width: 1320px;
        }
    }
</style>
