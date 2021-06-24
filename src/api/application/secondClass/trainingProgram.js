import request from '@/utils/request.bak.js'

/* GET课程数量 */
export function trainingProgramFindClassNumber(query) {
    return request({
        url: '/secondClass/trainingProgram/findClassNumber',
        method: 'get',
        params: query
    })
}
/* GET查询详情信息 */
export function trainingProgramId(id) {
    return request({
        url: '/secondClass/trainingProgram/' + id,
        method: 'get'
    })
}
/* GET查询培养方案分页 */
export function trainingProgramList(query) {
    return request({
        url: '/secondClass/trainingProgram/list',
        method: 'get',
        params: query
    })
}
/* GET查询方案详细课程信息 */
export function trainingProgramDetail(query) {
    return request({
        url: '/secondClass/trainingProgram/detail',
        method: 'get',
        params: query
    })
}

/* POST添加 */
export function trainingProgram(data) {
    return request({
        url: '/secondClass/trainingProgram',
        method: 'post',
        data: data
    })
}

/* PUT批量操作 */
export function trainingProgramMulti(data) {
    return request({
        url: '/secondClass/trainingProgram/multi',
        method: 'put',
        data: data
    })
}