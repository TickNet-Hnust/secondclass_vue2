/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:10:30
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-05 11:16:19
 */
import request from '@/utils/request.js'

/**
 * @description: 获取活动奖项信息
 * @param {*} params
 */
export function activityPrize(params) {
    return request({
        url: '/admins/secondClass/activity/prize',
        method: 'get',
        params
    })
}