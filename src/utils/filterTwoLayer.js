/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-12 19:17:15
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-12 19:22:32
 */

export function filterTwoLayer(array) {
    let temp = array.filter(item => item.pid == 0)
    temp.forEach(item => item.children = array.filter(it => it.pid == item.id));
    return temp
}