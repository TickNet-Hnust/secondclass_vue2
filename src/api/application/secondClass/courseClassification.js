/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:03:21
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-07-27 20:13:23
 */
import request from '@/utils/request.bak.js'
/* PUT批量修改分类排序 */
export function courseClassificationSortList(data) {
    return request({
        url: '/secondClass/courseClassification/sortList',
        method: 'put',
        data: data
    })
}
/* PUT批量修改积分类别 */
export function courseClassificationMulti(data) {
    return request({
        url: '/secondClass/courseClassification/multi',
        method: 'put',
        data: data
    })
}

/* GET判断能否删除积分类别 */
export function courseClassificationJudgeId(id) {
    return request({
        url: '/secondClass/courseClassification/' + id,
        method: 'get'
    })
}
/* GET根据参数查询二课课程分类列表 */
export function courseClassificationList(params) {
    return request({
        url: '/secondClass/courseClassification/list',
        method: 'get',
        params
    })
}
/* GET子类别排序列表 */
export function SortListClassificationId(classificationId) {
    return request({
        url: '/secondClass/courseClassification/sort/list/' + classificationId,
        method: 'get'
    })
}

/* DELETE删除积分类别 */
export function courseClassificationIds(ids) {
    return request({
        url: '/secondClass/courseClassification/' + ids,
        method: 'delete'
    })
}

/* POST新增积分类别 */
export function courseClassification(data) {
    return request({
        url: '/secondClass/courseClassification',
        method: 'post',
        data: data
    })
}