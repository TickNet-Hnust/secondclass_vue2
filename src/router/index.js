import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/index.vue'
import rightShow from '@/layout/rightShow/index.vue'
// import ParentView from '@/components/ParentView'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */
/*erke*/
const erke = resolve => require(['@/views/application/erke/index.vue'], resolve)
const erkeStandard = resolve =>
    require(['@/views/application/erke/erkeStandard/index.vue'], resolve)
const erkePlan = resolve =>
    require(['@/views/application/erke/erkePlan/index.vue'], resolve)
const detail = resolve =>
    require(['@/views/application/erke/detail/index.vue'], resolve)

const activity = resolve =>
    require(['@/views/application/erke/activity/index.vue'], resolve)
const activityDetail = resolve =>
    require(['@/views/application/erke/activityDetail/index.vue'], resolve)
const survey = resolve =>
    require([
        '@/views/application/erke/activityDetail/survey/index.vue'
    ], resolve)
const enrollment = resolve =>
    require([
        '@/views/application/erke/activityDetail/enrollment/index.vue'
    ], resolve)

/*home*/
const home = resolve => require(['@/views/home/index.vue'], resolve)
const homeContent = resolve =>
    require(['@/views/home/homeContent/index.vue'], resolve)

/** system */

const system = resolve => require(['@/views/system/index.vue'], resolve)
const user = resolve => require(['@/views/system/user/index.vue'], resolve)
const role = resolve => require(['@/views/system/role/index.vue'], resolve)
const menu = resolve => require(['@/views/system/menu/index.vue'], resolve)
const dept = resolve => require(['@/views/system/dept/index.vue'], resolve)
const post = resolve => require(['@/views/system/post/index.vue'], resolve)
const dict = resolve => require(['@/views/system/dict/index.vue'], resolve)
const config = resolve => require(['@/views/system/config/index.vue'], resolve)
const notice = resolve => require(['@/views/system/notice/index.vue'], resolve)

/** dept群组 */
const group = resolve =>
    require(['@/views/application/group/index.vue'], resolve)
const guidance = resolve =>
    require(['@/views/application/group/guidanceUnit/index.vue'], resolve)
const groupClasify = resolve =>
    require(['@/views/application/group/groupClasify/index.vue'], resolve)
const groupSelf = resolve =>
    require(['@/views/application/group/groupSelf/index.vue'], resolve)
const groupDetail = resolve =>
    require(['@/views/application/group/groupDetail/index.vue'], resolve)

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: resolve => require(['@/views/redirect'], resolve)
            }
        ]
    },
    {
        path: '/login',
        component: resolve => require(['@/views/login'], resolve),
        hidden: true
    },
    {
        path: '/404',
        component: resolve => require(['@/views/error/404'], resolve),
        hidden: true
    },
    {
        path: '/401',
        component: resolve => require(['@/views/error/401'], resolve),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/index', //首页会少一级路由，后期可用index替代
        children: [
            // {
            //     path: 'index',
            //     component: resolve => require(['@/views/index'], resolve),
            //     name: '',
            //     meta: {
            //         title: '首页',
            //         icon: 'dashboard',
            //         noCache: true,
            //         affix: true
            //     }
            // },
            {
                path: '/index', //首页会少一级路由，后期可用index替代
                component: rightShow,
                redirect: '/home',
                meta: {
                    title: ''
                },
                children: [
                    {
                        path: '/home',
                        name: 'home',
                        meta: {
                            title: '首页'
                        },
                        component: home,
                        children: [
                            {
                                path: '/home/homeContent',
                                component: homeContent
                            }
                        ]
                    }
                ]
            },
            {
                path: '/application',
                component: rightShow,
                redirect: '/application/erke',
                name: 'rightShow',
                meta: {
                    title: '应用'
                },
                children: [
                    {
                        path: '/application/erke',
                        component: erke,
                        name: 'erke',
                        meta: {
                            title: '第二课堂成绩单'
                        },
                        redirect: '/application/erke/erkePlan',
                        children: [
                            {
                                path: '/application/erke/erkePlan',
                                component: erkePlan,
                                name: 'erkePlan',
                                meta: {
                                    title: '培养方案'
                                }
                            },
                            {
                                path: 'erkeStandard',
                                name: 'erkeStandard',
                                component: erkeStandard,
                                meta: {
                                    title: '积分标准'
                                }
                            },
                            {
                                path: '/application/erke/detail/:sid/:tid',
                                component: detail,
                                name: 'detail',
                                meta: {
                                    title: '培养方案-详情'
                                }
                            },
                            {
                                path: '/application/erke/activity',
                                component: activity,
                                name: 'activity',
                                meta: {
                                    title: '活动'
                                }
                            },
                            {
                                path: '/application/erke/activityDetail/:aid',
                                component: activityDetail,
                                // redirect: '/application/erke/activityDetail/:id/survey',
                                name: 'activityDetail',
                                meta: {
                                    title: '活动详情'
                                }
                                // children: [{
                                //         path: '/application/erke/activityDetail/:id/survey',
                                //         component: survey,
                                //         name: 'survey',
                                //         meta: {
                                //             title: '概况'
                                //         },
                                //     },
                                //     {
                                //         path: '/application/erke/activityDetail/:id/enrollment',
                                //         component: enrollment,
                                //         name: 'enrollment',
                                //         meta: {
                                //             title: '报名管理'
                                //         },
                                //     }
                                // ]
                            }
                        ]
                    },
                    {
                        path: '/application/group',
                        component: group,
                        name: 'group',
                        meta: {
                            title: '群组管理'
                        },
                        redirect: '/application/group/guidance',
                        children: [
                            {
                                path: '/application/group/guidance',
                                component: guidance,
                                name: 'guidance',
                                meta: {
                                    title: '指导单位'
                                }
                            },
                            {
                                path: '/application/group/groupClasify',
                                component: groupClasify,
                                name: 'groupClasify',
                                meta: {
                                    title: '分类'
                                }
                            },
                            {
                                path: '/application/group/groupSelf',
                                component: groupSelf,
                                name: 'groupSelf',
                                meta: {
                                    title: '群组'
                                }
                            },
                            {
                                path: '/application/group/groupDetail/:gid',
                                component: groupDetail,
                                name: 'groupDetail',
                                meta: {
                                    title: '群组详情'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                path: '/systemManage',
                component: rightShow,
                redirect: '/system',
                name: 'rightShow',
                meta: {
                    title: '系统'
                },
                children: [
                    {
                        path: '/system',
                        component: system,
                        name: 'erke',
                        redirect: '/system/user',
                        meta: {
                            title: '系统'
                        },
                        children: [
                            {
                                path: '/system/user',
                                component: user,
                                name: 'user',
                                meta: {
                                    title: '用户管理'
                                }
                            },
                            {
                                path: '/system/role',
                                component: role,
                                name: 'role',
                                meta: {
                                    title: '角色管理'
                                }
                            },
                            {
                                path: '/system/menu',
                                component: menu,
                                name: 'menu',
                                meta: {
                                    title: '菜单管理'
                                }
                            },
                            {
                                path: '/system/dept',
                                component: dept,
                                name: 'dept',
                                meta: {
                                    title: '部门管理'
                                }
                            },
                            {
                                path: '/system/post',
                                component: post,
                                name: 'post',
                                meta: {
                                    title: '岗位管理'
                                }
                            },
                            {
                                path: '/system/dict',
                                component: dict,
                                name: 'dict',
                                meta: {
                                    title: '字典管理'
                                }
                            },
                            {
                                path: '/system/config',
                                component: config,
                                name: 'config',
                                meta: {
                                    title: '参数管理'
                                }
                            },
                            {
                                path: '/system/notice',
                                component: notice,
                                name: 'notice',
                                meta: {
                                    title: '通知管理'
                                }
                            },
                            {
                                path: '/dict/type/data/:dictId(\\d+)',
                                component: resolve =>
                                    require([
                                        '@/views/system/dict/data'
                                    ], resolve),
                                name: 'Data',
                                meta: { title: '字典数据', icon: '' }
                            }
                        ]
                    }
                ]
            }
            // {
            //     path: '/application/erke',
            //     component: rightShow,
            //     redirect: '/application/erke/erkePlan',
            //     children: [{
            //             path: '/application/erke/erkePlan',
            //             component: erkePlan
            //         },
            //         {
            //             path: 'erkeStandard',
            //             component: erkeStandard
            //         },
            //         {
            //             path: '/application/erke/detail',
            //             component: detail
            //         }
            //     ]
            // }
        ]
    },
    {
        path: '/user',
        component: Layout,
        hidden: true,
        redirect: 'noredirect',
        children: [
            {
                path: 'profile',
                component: resolve =>
                    require(['@/views/system/user/profile/index'], resolve),
                name: 'Profile',
                meta: { title: '个人中心', icon: 'user' }
            }
        ]
    },
    {
        path: '/dict',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'type/data/:dictId(\\d+)',
                component: resolve =>
                    require(['@/views/system/dict/data'], resolve),
                name: 'Data',
                meta: { title: '字典数据', icon: '' }
            }
        ]
    },
    {
        path: '/job',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'log',
                component: resolve =>
                    require(['@/views/monitor/job/log'], resolve),
                name: 'JobLog',
                meta: { title: '调度日志' }
            }
        ]
    },
    {
        path: '/gen',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'edit/:tableId(\\d+)',
                component: resolve =>
                    require(['@/views/tool/gen/editTable'], resolve),
                name: 'GenEdit',
                meta: { title: '修改生成配置' }
            }
        ]
    }
]

export default new Router({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
