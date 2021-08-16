/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-16 13:26:42
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-16 13:27:58
 */
import request from '@/utils/request.js'

export function utilListByName(params) {
    return request({
        url: '/user/util/listByName',
        method: 'get',
        params
    })
}