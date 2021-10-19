/*
 * @Descripttion:
 * @Author: 王德江  
 * @Date: 2021-10-13 14:56:01
 * @LastEditors: 王德江
 * @LastEditTime: 2021-10-13 15:56:58
 */
import request from '@/utils/request.js'


/**
 * @description: 查询积分要求表列表
 * @param {object} params
 * @returns {promise}
 */
export function integralRequirementList(params) {
    return request({
        url: '/admins/secondClass/growthRecord/integralRequirement/list',
        method: 'get',
        params
    })
}

/**
 * @description: 添加积分要求表
 * @param {object} data
 * @returns {promise}
 */
export function integralRequirementAdd(data) {
    return request({
        url: '/admins/secondClass/growthRecord/integralRequirement',
        method: 'post',
        data
    })
}

/**
 * @description: 删除积分要求表列表,需要把要删除的id放到url后/:id
 * @param {object} params
 * @returns {promise}
 */
 export function integralRequirementDelete({id}) {
    return request({
        url: `/admins/secondClass/growthRecord/integralRequirement/${id}`,
        method: 'delete',
    })
}


/**
 * @description: 查看积分要求统计情况
 * @param {number} params
 * @returns {promise}
 */
 export function integralRequirementStatistics(params) {
    return request({
        url: '/admins/secondClass/growthRecord/integralRequirement/statistics',
        method: 'get',
        params
    })
}


/**
 * @description: 导出积分要求统计情况
 * @param {object} params
 * @returns {promise}
 */
 export function integralRequirementStatisticsExport(params) {
    return request({
        url: `/admins/secondClass/growthRecord/integralRequirement/statistics/${params.id}/export`,
        method: 'get',
    })
}