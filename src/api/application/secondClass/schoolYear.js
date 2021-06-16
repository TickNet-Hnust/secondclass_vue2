import request from '@/utils/request.bak.js'

/* 获取学年列表 */
export function schoolYearList(Authorization) {
    return request({
        url: '/secondClass/schoolYear/list',
        method: 'get',
    })
}

/* 批量修改学年 */
export function schoolYearMulti() {
    return request({
        url: '/secondClass/schoolYear/mutlti',
        method: 'put'
    })
}