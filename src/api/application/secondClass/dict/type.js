import request from '@/utils/request.js'

/* 获取积分类型 */
export function getDict(type) {
    return request({
        url: '/system/dict/data/type/' + type,
        method: 'get'
    })
}