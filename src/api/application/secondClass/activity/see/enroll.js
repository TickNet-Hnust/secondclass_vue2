/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:09:58
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-05 11:15:29
 */
import request from '@/utils/request.js'

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
 * @description: 活动报名批量审核
 * @param {*} params
 */
export function activityEnrollVerify(params) {
    return request({
        url: '/admins/secondClass/activity/enroll/verify',
        method: 'put',
        params
    })
}