import request from '@/utils/request.bak.js'

/* GET课程数量 */
export function trainingProgramFindClassNumber(query) {
    return request({
        url: '/admins/secondClass/trainingProgram/findClassNumber',
        method: 'get',
        params: query
    })
}
/* GET查询详情信息 */
export function trainingProgramId(id) {
    return request({
        url: '/admins/secondClass/trainingProgram/' + id,
        method: 'get'
    })
}
/* GET查询培养方案分页 */
export function trainingProgramList(query) {
    return request({
        url: '/admins/secondClass/trainingProgram/list',
        method: 'get',
        params: query
    })
}
/* GET查询方案详细课程信息 */
export function trainingProgramDetail(query) {
    return request({
        url: '/admins/secondClass/trainingProgram/detail',
        method: 'get',
        params: query
    })
}

/* POST添加 */
export function trainingProgram(data) {
    return request({
        url: '/admins/secondClass/trainingProgram',
        method: 'post',
        data: data
    })
}

/* PUT批量操作 */
export function trainingProgramMulti(data) {
    return request({
        url: '/admins/secondClass/trainingProgram/multi',
        method: 'put',
        data: data
    })
}
