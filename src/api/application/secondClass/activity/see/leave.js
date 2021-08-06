/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:10:23
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-05 11:17:14
 */
import request from '@/utils/request.js'

/**
 * @description: 获取活动请假信息
 * @param {*} params
 */
export function activityLeave(params) {
    return request({
        url: '/admins/secondClass/activity/leave',
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
        url: '/admins/secondClass/activity/leave/list',
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
        url: '/admins/secondClass/activity/leave/verify',
        method: 'put',
        params
    })
}