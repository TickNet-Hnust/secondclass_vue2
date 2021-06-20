import request from '@/utils/request.bak.js'
/* PUT批量修改分类排序 */
export function courseClassificationSortList(data) {
    return request({
        url: '/courseClassification/courseClassification/sortList',
        method: 'put',
        data: data
    })
}
/* PUT批量修改积分类别 */
export function courseClassificationMulti(data) {
    return request({
        url: '/courseClassification/courseClassification/multi',
        method: 'put',
        data: data
    })
}

/* GET判断能否删除积分类别 */
export function courseClassificationJudgeId(id) {
    return request({
        url: '/courseClassification/courseClassification/' + id,
        method: 'get',
    })
}
/* GET根据参数查询二课课程分类列表 */
export function courseClassificationList(id) {
    return request({
        url: '/courseClassification/courseClassification/list',
        method: 'get',
    })
}


/* DELETE删除积分类别 */
export function courseClassificationIds(ids) {
    return request({
        url: '/courseClassification/courseClassification/' + ids,
        method: 'delete',
    })
}

/* POST新增积分类别 */
export function courseClassification(data) {
    return request({
        url: '/courseClassification/courseClassification',
        method: 'post',
        data: data
    })
}