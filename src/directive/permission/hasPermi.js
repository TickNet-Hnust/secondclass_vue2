/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:03:21
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-10-10 18:07:50
 */
/**
 * 操作权限处理
 * Copyright (c) 2019 ruoyi
 */

import store from '@/store'

export default {
    inserted(el, binding, vnode) {
        const { value } = binding
        const all_permission = '*:*:*'
        const permissions = store.getters && store.getters.permissions
        function regTest(arr,str) {
            return arr.some(item => str.includes(item))
        }
        if (value && value instanceof Array && value.length > 0) {
            const permissionFlag = value

            const hasPermissions = permissions.some(permission => {
                return (
                    all_permission === permission ||
                    permissionFlag.includes(permission) ||
                    regTest(permissionFlag,permission)
                )
            })

            if (!hasPermissions) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error(`请设置操作权限标签值`)
        }
    }
}
