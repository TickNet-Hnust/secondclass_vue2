/*
 * @Descripttion: 群组管理
 * @Author: 林舒恒
 * @Date: 2021-08-14 11:38:19
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-16 17:31:39
 */
import request from '@/utils/request.js'

/**
 * @description: 获取所有群组信息
 */
export function groupInfo() {
    return request({
        url: '/admins/group/info',
        method: 'get'
    })
}
/**
 * @description: 获取群组列表
 * @param {*} params
 */
export function groupList(params) {
    return request({
        url: '/admins/group/list',
        method: 'get',
        params
    })
}
/**
 * @description: 新增群组
 * @param {*} data
 */
export function groupPost(data) {
    return request({
        url: '/admins/group',
        method: 'post',
        data
    })
}
/**
 * @description: 编辑群组信息
 * @param {*} data
 */
export function groupPut(data) {
    return request({
        url: '/admins/group',
        method: 'put',
        data
    })
}

export function groupId({ id }) {
    return request({
        url: `/admins/group/${id}`,
        method: 'get'
    })
}
/**
 * @description: 修改群组状态
 * @param {*} id
 */
export function groupIdVerify({ id, status }) {
    return request({
        url: `/admins/group/${id}/verify`,
        method: 'put',
        params: {
            status
        }
    })
}

export function groupDelete({ id }) {
    return request({
        url: `/admins/group/${id}`,
        method: 'delete',
    })
}