/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:03:21
<<<<<<< HEAD
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-25 11:48:26
=======
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-28 15:32:06
>>>>>>> 0569ec8173519e8f0192c13064af2ed961eff6e0
 */
import Vue from 'vue'
import Cookies from 'js-cookie'
import { Steps, Dropdown, Menu, Icon, Anchor, Upload } from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/lib/steps/style/css'
import 'ant-design-vue/lib/dropdown/style/css'
import 'ant-design-vue/lib/menu/style/css'
import 'ant-design-vue/lib/icon/style/css'
import 'ant-design-vue/lib/anchor/style/css'
import 'ant-design-vue/lib/upload/style/css'

Vue.use(Steps)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Anchor)
Vue.use(Upload)
import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(VueViewer)
import '@/assets/styles/index.scss' // global cs
import '@/assets/styles/ruoyi.scss' // ruoyi css
import './style/index.css'
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'
import XScrollbar from 'x-scrollbar'
import './style/xscrollbar.css'
import './assets/icons' // icon
import './permission' // permission control
import './iconfont.js'
// import { getDicts } from '@/api/system/dict/data'
import { getDict } from '@/api/application/secondClass/dict/type.js'
import { getConfigKey } from '@/api/system/config'
import {
    parseTime,
    resetForm,
    addDateRange,
    selectDictLabel,
    selectDictLabels,
    download,
    handleTree
} from '@/utils/ruoyi'
import { alertDialog } from './utils/gather'
import Pagination from '@/components/Pagination'
// 自定义表格工具扩展
import RightToolbar from '@/components/RightToolbar'

// 全局方法挂载
Vue.prototype.getDict = getDict
Vue.prototype.getDicts = getDict
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

Vue.prototype.XScrollbar = XScrollbar

Vue.prototype.alertDialog = alertDialog

Vue.prototype.msgSuccess = function(msg) {
    this.$message({ showClose: true, message: msg, type: 'success' })
}

Vue.prototype.msgError = function(msg) {
    this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function(msg) {
    this.$message.info(msg)
}

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)

Vue.use(permission)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
    size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
