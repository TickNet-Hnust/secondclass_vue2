/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-08-16 13:26:42
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-09-20 11:43:12
 */
import request from '@/utils/request.js'

/**
 * @description: 查询人名
 * @param {*} params
 */
export function utilListByName(params) {
    return request({
        url: '/user/util/listByName',
        method: 'get',
        params
    })
}
/**
 * @description: 获取指导单位列表
 * @param {*} params
 */

export function utilListCollege(params) {
    return request({
        url: '/dept/util/listCollege',
        method: 'get',
        params
    })
}