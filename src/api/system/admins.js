/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-10-17 13:01:54
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-10-17 13:19:20
 */
import request from '@/utils/request'

/**
 * @description: 查询角色为管理员的用户
 * @param {*} params
 */
export function getAdminRoleUsers(params) {
    return request({
        url: '/system/role/adminRoleUsers',
        method: 'get',
        params
    })
}

/**
 * @description: 修改管理员角色
 * @param {*} params
 */
export function postAdminRoleUsers(params) {
    return request({
        url: '/system/role/adminRoleUsers',
        method: 'post',
        params
    })
}

/**
 * @description: 删除管理员角色
 * @param {*} params
 */
export function deleteAdminRoleUsers(data) {
    return request({
        url: '/system/role/adminRoleUsers',
        method: 'delete',
        data
    })
}