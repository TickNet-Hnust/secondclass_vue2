import request from '@/utils/request.js'

export function integralPatchAddOne(data) {
    return request({
        url: '/secondClass/integralPatch/addOne',
        method: 'post',
        data
    })
}

export function integralPatchShowList(params) {
    return request({
        url: '/secondClass/integralPatch/showList',
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
        url : `/secondClass/integralPatch/${id}`,
        method: 'delete'
    })
}
export function updateIntegral(params) {
    return request({
        url : `/secondClass/integralPatch/alert`,
        method: 'put',
        params
    })
    
}