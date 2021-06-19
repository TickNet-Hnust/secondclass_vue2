import request from '@/utils/request.bak.js'

/* 获取学年列表 */
export function schoolYearList(Authorization) {
    return request({
        url: '/secondClass/schoolYear/list',
        method: 'get',
    })
}

/* 批量修改学年 */
export function schoolYearMulti(body) {
    return request({
        url: '/secondClass/schoolYear/mutlti',
        method: 'put',
        body: body
    })
}

export function schoolYearTestDelete(query) {
    return request({
        url: '/secondClass/schoolYear/mutili',
        method: 'get',
        params: query
    })
}