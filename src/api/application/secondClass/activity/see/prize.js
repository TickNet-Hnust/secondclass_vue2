/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-05 11:10:30
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-10 14:14:46
 */
import request from '@/utils/request.js'

/**
 * @description: 获取活动奖项总信息
 * @param {*} params
 */
 export function activityPrizeRecord(params) {
    return request({
        url: '/admins/secondClass/activity/prize/record',
        method: 'get',
        params
    })
}

/**
 * @description: 获取活动奖项信息列表
 * @param {*} params
 */
 export function activityPrizeRecordList(params) {
    return request({
        url: '/admins/secondClass/activity/prize/record/list',
        method: 'get',
        params
    })
}

/**
 * @description: 发放登记新增或修改
 * @param {*} params
 */
 export function activityPrizeRecordPost(data) {
    return request({
        url: '/admins/secondClass/activity/prize/record',
        method: 'post',
        data
    })
}

/**
 * @description: 查询奖项信息
 * @param {*} params
 */
 export function activityPrizeManageList(params) {
    return request({
        url: '/admins/secondClass/activity/prize/manage/list',
        method: 'get',
        params
    })
}

/**
 * @description: 批量修改奖项信息
 * @param {*} data
 */
 export function activityPrizeManageMulti(data) {
    return request({
        url: '/admins/secondClass/activity/prize/manage/multi',
        method: 'put',
        data
    })
}

/**
 * @description: 删除奖项信息
 * @param {*} data
 */
 export function activityPrizeDelete(id) {
    return request({
        url: '/admins/secondClass/activity/prize/record' + id,
        method: 'delete',
    })
}