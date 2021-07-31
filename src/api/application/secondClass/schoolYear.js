import request from '@/utils/request.bak.js'

/* GET获取学年列表 */
export function schoolYearList() {
    return request({
        url: '/admins/secondClass/schoolYear/list',
        method: 'get'
    })
}

/* PUT批量修改学年 */
export function schoolYearMulti(data) {
    return request({
        url: '/admins/secondClass/schoolYear/multi',
        method: 'put',
        data: data
    })
}
/* GET批量修改学年-测试能否删除 */
export function schoolYearTestDeleteIds(ids) {
    return request({
        url: '/admins/secondClass/testDelete/' + ids,
        method: 'get'
    })
}