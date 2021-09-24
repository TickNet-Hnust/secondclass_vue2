/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:12:10
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-09-23 21:06:23
 */
import request from '@/utils/request.js'

/**
 * @description: 条件查询活动分页
 * @param {*} params
 */
export function activityList(params) {
    return request({
        url: '/admins/secondClass/activity/list',
        method: 'get',
        params
    })
}
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
 * @description: 活动撤回
 * @param {*} params
 */
export function activityCancel(params) {
    return request({
        url: '/admins/secondClass/activityCancel',
        method: 'get',
        params
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
/**
 * @description: 活动详细
 * @param {*} id 当前id
 */
export function activityId({ id }) {
    return request({
        url: `/admins/secondClass/activity/${id}`,
        method: 'get'
    })
}
/**
 * @description: 
 * @param {*} id 活动id
 * @param {*} isRecomment 1推荐，0不推荐
 */
export function activityRecommendChange({ id, isRecomment }) {
    return request({
        url: `/admins/secondClass/activity/recommendChange/${id}/${isRecomment}`,
        method: 'put'
    })
}