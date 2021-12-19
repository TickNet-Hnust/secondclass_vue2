import request from '@/utils/request.js'

export function queryIntegralUserName({ userName }) {
    return request({
        url: `/admins/secondClass/activity/integral/queryIntegral/${userName}`,
        method: 'get'
    })
}