/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:11:06
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-10 13:37:23
 */

import request from '@/utils/request.js'

/**
 * @description: 活动花絮列表
 * @param {*} params
 */
export function activityEvaluationList(params) {
    return request({
        url: '/admins/secondClass/activity/evaluation/list',
        method: 'get',
        params
    })
}

/**
 * @description: 活动花絮审核
 * @param {*} params
 */
export function activityEvaluationVerify(params) {
    return request({
        url: '/admins/secondClass/activity/evaluation/verify',
        method: 'put',
        params
    })
}
