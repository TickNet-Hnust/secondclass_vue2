import request from '@/utils/request.bak.js'

/* 课程数量 */
export function trainingProgramFindClassNumber(query) {
    return request({
        url: '/secondClass/trainingProgram/findClassNumber',
        method: 'get',
        params: query
    })
}

/* 批量操作 */
export function trainingProgramMulti() {
    return request({
        url: '/secondClass/trainingProgram/multi',
        method: 'put',
    })
}

/* 查询详情信息 */
export function trainingProgramId(id) {
    return request({
        url: '/secondClass/trainingProgram/' + id,
        method: 'get',
    })
}

/* 查询培养方案分页 */
export function trainingProgramList(query) {
    return request({
        url: '/secondClass/trainingProgram/list',
        method: 'get',
        params: query,
    })
}

/* 添加 */
export function trainingProgram(body) {
    return request({
        url: '/secondClass/trainingProgram',
        method: 'post',
        body: body
    })
}