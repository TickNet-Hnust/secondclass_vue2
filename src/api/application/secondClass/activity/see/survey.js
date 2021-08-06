/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:11:46
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-05 14:36:04
 */
import request from '@/utils/request.js'

/**
 * @description: 活动概况
 * @param {*} id
 */
export function activityIdDetail({ id }) {
    return request({
        url: `/admins/secondClass/activity/${id}/detail`,
        method: 'get'
    })
}
/**
 * @description: 统计图
 * @param {*} id
 */
export function activityIdEnrollBar({ id }) {
    return request({
        url: `/admins/secondClass/activity/${id}/enrollBar`,
        method: 'get'
    })
}