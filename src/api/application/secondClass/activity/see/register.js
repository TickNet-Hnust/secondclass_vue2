/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:10:04
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-05 11:16:41
 */
import request from '@/utils/request.js'

/**
 * @description: 获取活动签到信息列表
 * @param {*} params
 */
export function activityRegisteList(params) {
    return request({
        url: '/admins/secondClass/activity/registe/list',
        method: 'get',
        params
    })
}


/**
 * @description: 批量补签/取消
 * @param {*} params
 */
export function activityRegisteVerify(params) {
    return request({
        url: '/admins/secondClass/activity/registe/verify',
        method: 'put',
        params
    })
}