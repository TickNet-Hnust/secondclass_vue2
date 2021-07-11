import request from '@/utils/request.bak.js'

/* GET查询课程详细 */
export function courseId(id) {
    return request({
        url: '/secondClass/course/' + id,
        method: 'get'
    })
}

/* POST新增二课课程 */
export function coursePost(data) {
    return request({
        url: '/secondClass/course',
        method: 'post',
        data
    })
}

/* PUT修改课程 */
export function courstPut(data) {
    return request({
        url: '/secondClass/course',
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
