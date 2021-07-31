/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:03:21
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-07-31 15:24:30
 */
import request from '@/utils/request.bak.js'

/* GET查询课程详细 */
export function courseId(id) {
    return request({
        url: '/admin/secondClass/course/' + id,
        method: 'get'
    })
}

/* POST新增二课课程 */
export function coursePost(data) {
    return request({
        url: '/admin/secondClass/course',
        method: 'post',
        data
    })
}

/* PUT修改课程 */
export function coursePut(data) {
    return request({
        url: '/admin/secondClass/course',
        method: 'put',
        data
    })
}

/* DELETE批量删除二课课程 */
export function courseDelete(id) {
    return request({
        url: '/secondClass/course/' + id,
        method: 'delete'
    })
}