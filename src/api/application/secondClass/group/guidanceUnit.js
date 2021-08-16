/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2021-08-16 14:26:49
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-16 16:45:47
 */
/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2021-08-13 21:38:39
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-13 22:10:38
 */


import request from '@/utils/request.js'


//获取指导单位列表
export function groupGuidanceList(params){
    return request({
        url:'/admins/group/guidance/list',
        method:'get',
        params
    })
}

//新增指导单位
export function systemDeptPost(data){
    return request({
        url:'/system/dept',
        method:'post',
        data
    })
}

//编辑指导单位
export function systemDeptPut(data){
    return request({
        url:'/system/dept',
        method:'put',
        data
    })
}

//根据deptId获取编辑回显
export function systemDeptGet(deptId){
    return request({
        url:`/system/dept/${deptId}`,
        method:'get',
    })
}



