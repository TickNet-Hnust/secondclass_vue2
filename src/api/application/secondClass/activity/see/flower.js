/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:10:49
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-05 11:17:48
 */
import request from '@/utils/request.js'

/**
 * @description: 活动花絮列表
 * @param {*} params
 */
export function activityFlowerList(params) {
    return request({
        url: '/admins/secondClass/activity/flower/list',
        method: 'get',
        params
    })
}

/**
 * @description: 活动花絮审核
 * @param {*} params
 */
export function activityFlowerVerify(params) {
    return request({
        url: '/admins/secondClass/activity/flower/verify',
        method: 'put',
        params
    })
}
