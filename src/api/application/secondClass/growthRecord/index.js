import request from '@/utils/request.js'

export function integralPatchAddOne(params) {
    return request({
        url: '/secondClass/integralPatch/addOne',
        method: 'post',
        params
    })
}

export function integralPatchShowList(params) {
    return request({
        url: '/secondClass/integralPatch/showList',
        method: 'get',
        params
    })
}

export function integralPatchQueryDetail(params) {
    return request({
        url: '/secondClass/integralPatch/queryDetail',
        method: 'get',
        params
    })
}

export function integralPatchIds({ id }) {
    return request({
        url: `/secondClass/integralPatch/${id}`,
        method: 'delete'
    })
}
export function withdrawRecord({ id }) {
    return request({
        url: `/secondClass/integralPatch/${id}`,
        method: 'delete'
    })
}
export function integralPatchAlert(params) {
    return request({
        url: `/secondClass/integralPatch/alert`,
        method: 'put',
        params
    })

}