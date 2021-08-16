/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-14 14:51:25
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-14 20:22:10
 */
import request from '@/utils/request.js'

export function guidanceList(params) {
    return request({
        url: '/admins/group/guidance/list',
        method: 'get',
        params
    })
}