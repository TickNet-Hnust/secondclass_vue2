/*
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2021-12-28 13:47:33
 * @LastEditors: peterroe
 * @LastEditTime: 2021-12-28 13:57:44
 */
import request from '@/utils/request.js'

export function activityHotPost(data) {
    return request({
        url: `/admins/secondClass/activity/hot`,
        method: 'post',
        data
    })
}

export function activityHotDelete({ id }) {
    return request({
        url: `/admins/secondClass/activity/hot/${id}`,
        method: 'delete',
    })
}

export function activityHotPut(data) {
    return request({
        url: `/admins/secondClass/activity/hot`,
        method: 'put',
        data
    })
}

export function activityHotGet(params) {
    return request({
        url: `/admins/secondClass/activity/hot`,
        method: 'get',
        params
    })
}