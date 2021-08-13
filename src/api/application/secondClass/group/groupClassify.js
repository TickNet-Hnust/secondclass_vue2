/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2021-08-13 21:38:39
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-13 22:10:38
 */


import request from '@/utils/request.js'


//获取分类列表
export function groupTypeList(params){
    return request({
        url:'/admins/group/type/list',
        methods:'get',
        params
    })
}

//新增群组分类
export function groupTypePost(data){
    return request({
        url:'/admins/group/type',
        methods:'post',
        data
    })
}

//编辑群组分类
export function groupTypePut(data){
    return request({
        url:'/admins/group/type',
        methods:'put',
        data
    })
}

//根据id获取编辑回显
export function groupType(id){
    request({
        url:`/admins/group/type/${id}`,
        methods:'get',
    })
}



