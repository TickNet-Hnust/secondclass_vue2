/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2021-07-26 18:39:09
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-07-31 15:24:50
 */

import request from '@/utils/request.js'

/**
 * @description: 获取活动报名信息
 * @param {*} params
 */
export function activityEnroll(params) {
    return request({
        url: '/admin/secondClass/activity/enroll',
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
        url: '/admin/secondClass/activity/enroll/list',
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
        url: '/admin/secondClass/activity/enroll/verify',
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
        url: '/admin/secondClass/activity/prize',
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
        url: '/admin/secondClass/activity/leave',
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
        url: '/admin/secondClass/activity/leave/list',
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
        url: '/admin/secondClass/activity/leave/verify',
        method: 'put',
        params
    })
}

/** 活动管理起草开始 */
/**
 * @description: 条件查询活动分页
 * @param {*} params
 */
export function activityList(params) {
    return request({
        url: '/admin/secondClass/activity/list',
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
        url: '/admin/secondClass/activity',
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
        url: '/admin/secondClass/activityCancel',
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
        url: '/admin/secondClass/activity',
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
        url: `/admin/secondClass/activity/${id}/${nextStatus}`,
        method: 'put'
    })
}
/** 活动管理起草结束 */