/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:09:58
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-31 14:17:28
 */
import request from '@/utils/request.js'

/**
 * @description: 获取活动报名信息
 * @param {*} params
 */
export function activityEnroll(params) {
    return request({
        url: '/admins/secondClass/activity/enroll',
        method: 'get',
        params
    })
}

/**
 * @description: 获取活动报名列表
 * @param {*} params
 */
export function activityEnrollList(params) {
    return request({
        url: '/admins/secondClass/activity/enroll/list',
        method: 'get',
        params
    })
}

/**
 * @description: 导出活动报名列表
 * @param {*} params
 */
 export function activityEnrollExport(query) {
    return request({
        url: '/admins/secondClass/activity/enroll/export',
        method: 'get',
        params: query
    })
}

/**
 * @description: 活动报名批量审核
 * @param {*} params
 */
export function activityEnrollVerify(data) {
    return request({
        url: '/admins/secondClass/activity/enroll/verify',
        method: 'put',
        data
    })
}
