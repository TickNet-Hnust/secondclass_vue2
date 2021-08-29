/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-08-16 13:26:42
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-16 21:36:07
 */
import request from '@/utils/request.js'

export function utilListByName(params) {
    return request({
        url: '/user/util/listByName',
        method: 'get',
        params
    })
}

export function utilListCollege(params) {
    return request({
        url: '/dept/util/listCollege',
        method: 'get',
        params
    })
}
