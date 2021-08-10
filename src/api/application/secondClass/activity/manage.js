/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:12:10
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-05 14:35:29
 */
import request from '@/utils/request.js'

/**
 * @description: 条件查询活动分页
 * @param {*} params
 */
export function activityList(params) {
    return request({
        url: '/admins/secondClass/activity/list',
        method: 'get',
        params
    })
}
/**
 * @description: 新增活动
 * @param {*} data
 */
export function activityPost(data) {
    return request({
        url: '/admins/secondClass/activity',
        method: 'post',
        data
    })
}
/**
 * @description: 活动撤回
 * @param {*} params
 */
export function activityCancel(params) {
    return request({
        url: '/admins/secondClass/activityCancel',
        method: 'get',
        params
    })
}
/**
 * @description: 编辑活动
 * @param {*} data
 */
export function activityPut(data) {
    return request({
        url: '/admins/secondClass/activity',
        method: 'put',
        data
    })
}
/**
 * @description: 改变活动状态
 * @param {*} id 当前id
 * @param {*} nextStatus 下一个状态
 */
export function activityIdNextStatus({ id, nextStatus }) {
    return request({
        url: `/admins/secondClass/activity/${id}/${nextStatus}`,
        method: 'put'
    })
}
