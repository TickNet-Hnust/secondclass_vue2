/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:12:10
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-05 11:19:27
 */
import request from '@/utils/request.js'

/**
 * @description: 新增活动
 * @param {*} data
 */
export function activityPost(data) {
    return request({
        url: '/admins/secondClass/activity',
        method: 'post',
        data
    })
}
/**
 * @description: 编辑活动
 * @param {*} data
 */
export function activityPut(data) {
    return request({
        url: '/admins/secondClass/activity',
        method: 'put',
        data
    })
}

/**
 * @description: 改变活动状态
 * @param {*} id 当前id
 * @param {*} nextStatus 下一个状态
 */
export function activityIdNextStatus({ id, nextStatus }) {
    return request({
        url: `/admins/secondClass/activity/${id}/${nextStatus}`,
        method: 'put'
    })
}