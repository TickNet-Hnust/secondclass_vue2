/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2021-08-13 21:38:39
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-17 10:48:49
 */


import request from '@/utils/request.js'


//获取分类列表
export function groupTypeList(params){
    return request({
        url:'/admins/group/type/list',
        method:'get',
        params
    })
}

//新增群组分类
export function groupTypePost(data){
    return request({
        url:'/admins/group/type',
        method:'post',
        data
    })
}

//编辑群组分类
export function groupTypePut(data){
    return request({
        url:'/admins/group/type',
        method:'put',
        data
    })
}

//根据id获取编辑回显
export function groupType(id){
    return request({
        url:`/admins/group/type/${id}`,
        method:'get',
    })
}

//获取学校列表
export function deptUtilSchool(){
    return request({
        url:'/dept/util/school',
        method:'get',
    })
}

//导出分类列表
export function groupTypeExport(){
    return request({
        url:'/admins/group/type/export',
        method:'get',
    })
}


