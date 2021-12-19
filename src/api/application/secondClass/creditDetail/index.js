import request from '@/utils/request.js'

export function integralQueryIntegralDetail(params) {
    return request({
        url: `/admins/secondClass/activity/integral/queryIntegralDetail`,
        method: 'get',
        params
    })
}