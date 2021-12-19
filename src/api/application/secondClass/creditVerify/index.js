import request from '@/utils/request.js'

export function integralAllList(params) {
    return request({
        url: `/admins/secondClass/activity/integral/allList`,
        method: 'get',
        params
    })
}

export function integralVerifyAll(data) {
    return request({
        url: `/admins/secondClass/activity/integral/verify/all`,
        method: 'put',
        data
    })
}