/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2021-07-26 18:39:09
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-07-28 09:41:22
 */

import request from '@/utils/request.js'

/**
 * @description: 获取活动报名信息接口
 * @param {*} params
 */
export function activityEnroll(params) {
    return request({
        url: '/secondClass/activity/enroll',
        method: 'get',
        params
    })
}


export function activityEnrollList(params) {
    return request({
        url: '/secondClass/activity/enroll/list',
        method: 'get',
        params
    })
}