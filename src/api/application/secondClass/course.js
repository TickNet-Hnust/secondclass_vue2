import request from '@/utils/request.bak.js'

export function courseListId(id) {
    return request({
        url: '/secondClass/course/list/' + id,
        method: 'get'
    })
}