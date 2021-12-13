import request from '@/utils/request.js'

export function integralAllList(params) {
    return request({
        url: `/admins/secondClass/activity/integral/allList`,
        method: 'get',
        params
    })
}