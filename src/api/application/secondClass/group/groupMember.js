/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-14 14:50:57
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-14 14:59:57
 */
import request from '@/utils/request.js'
/**
 * @description: 获取群组成员列表
 * @param {*} params
 */
export function memberList(params) {
    return request({
        url: '/admins/group/member/list',
        method: 'get',
        params
    })
}
/**
 * @description: 新增群组成员
 * @param {*} params
 */
export function memberPost(data) {
    return request({
        url: '/admins/group/member',
        method: 'post',
        data
    })
}
/**
 * @description: 获取群组tab信息
 * @param {*} params
 */
export function memberInfo(params) {
    return request({
        url: '/admins/group/member/info',
        method: 'get',
        params
    })
}

/**
 * @description: 编辑成员信息
 * @param {*} data
 */
export function memberPut(data) {
    return request({
        url: '/admins/group/member',
        method: 'put',
        data
    })
}
/**
 * @description: 修改成员状态
 * @param {*} id
 * @param {*} status
 */
export function memberIdVerify({ id, status }) {
    return request({
        url: `/admins/group/member/${id}/verify`,
        method: 'put',
        params: {
            status
        }
    })
}
/**
 * @description: 获取群组发布活动列表
 * @param {*} params
 */
export function memberActivityList(params) {
    return request({
        url: '/admins/secondClass/activity/list',
        method: 'get',
        params
    })
}

/**
 * @description: 获取群组成员详细信息（回显）
 * @param {*} id
 */
export function memberId({ id }) {
    return request({
        url: `/admins/group/member/${id}`,
        method: 'get'
    })
}