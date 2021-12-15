/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:11:19
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-31 20:21:26
 */

import request from '@/utils/request.js'

/**
 * @description: 活动花絮列表
 * @param {*} params
 */
export function activityIntegral(params) {
    return request({
        url: '/admins/secondClass/activity/integral',
        method: 'get',
        params
    })
}

/**
 * @description: 活动花絮列表
 * @param {*} params
 */
export function activityIntegralList(params) {
    return request({
        url: '/admins/secondClass/activity/integral/list',
        method: 'get',
        params
    })
}

/**
 * @description: 活动花絮列表
 * @param {*} params
 */
export function activityIntegralExport(query) {
    return request({
        url: '/admins/secondClass/activity/integral/export',
        method: 'get',
        params: query
    })
}

/**
 * @description: 活动花絮审核
 * @param {*} params
 */
export function activityIntegralVerify(data) {
    return request({
        url: '/admins/secondClass/activity/integral/verify',
        method: 'put',
        data
    })
}