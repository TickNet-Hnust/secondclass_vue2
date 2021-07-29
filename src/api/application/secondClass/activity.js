/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2021-07-26 18:39:09
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-07-29 16:34:51
 */

import request from '@/utils/request.js'

/**
 * @description: 获取活动报名信息
 * @param {*} params
 */
export function activityEnroll(params) {
    return request({
        url: '/secondClass/activity/enroll',
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
        url: '/secondClass/activity/enroll/list',
        method: 'get',
        params
    })
}

/**
 * @description: 活动报名批量审核
 * @param {*} params
 */
 export function activityEnrollVerify(params) {
    return request({
        url: '/secondClass/activity/enroll/verify',
        method: 'put',
        params
    })
}


/**
 * @description: 获取活动奖项信息
 * @param {*} params
 */
 export function activityPrize(params) {
    return request({
        url: '/secondClass/activity/prize',
        method: 'get',
        params
    })
}

/**
 * @description: 获取活动请假信息
 * @param {*} params
 */
 export function activityLeave(params) {
    return request({
        url: '/secondClass/activity/leave',
        method: 'get',
        params
    })
}

/**
 * @description: 获取活动请假列表
 * @param {*} params
 */
 export function activityLeaveList(params) {
    return request({
        url: '/secondClass/activity/leave/list',
        method: 'get',
        params
    })
}

/**
 * @description: 请假批量审核
 * @param {*} params
 */
 export function activityLeaveVerify(params) {
    return request({
        url: '/secondClass/activity/leave/verify',
        method: 'put',
        params
    })
}

