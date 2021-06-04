import request from '@/utils/request'

// 查询菜单列表
export function listErke(query) {
    return request({
        url: '/application/erke/list',
        method: 'get',
        params: query
    })
}

// 查询菜单详细
export function getMenu(menuId) {
    return request({
        url: '/application/erke/' + menuId,
        method: 'get'
    })
}

// 查询菜单下拉树结构
export function treeselect() {
    return request({
        url: '/application/erke/treeselect',
        method: 'get'
    })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
    return request({
        url: '/application/erke/roleMenuTreeselect/' + roleId,
        method: 'get'
    })
}

// 新增菜单
export function addMenu(data) {
    return request({
        url: '/application/erke',
        method: 'post',
        data: data
    })
}

// 修改菜单
export function updateMenu(data) {
    return request({
        url: '/application/erke',
        method: 'put',
        data: data
    })
}
