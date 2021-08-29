/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-08-14 14:51:32
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-29 10:53:43
 */
import request from '@/utils/request.js'

/**
 * @description: 
 * @param {*} groupId
 * @param {*} pageNum
 * @param {*} pageSize
 */
export function recordList(params) {
    return request({
        url: '/admins/group/member/record/list',
        method: 'get',
        params
    })
}