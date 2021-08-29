/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-07-27 21:48:25
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-13 19:32:10
 */
export function filterNameAndType(data, name) {
    if (!name) return data

    // let findParent = node => {
    //     while (node.__parent__.__parent__) {
    //         node = node.__parent__
    //     }
    //     return node
    // }

    let tempSet = new Set()

    let dfs = array => {
        array.forEach(item => {
            item.children && dfs(item.children)
            if (item.name.includes(name)) {
                delete item.children
                tempSet.add(item)
            }
        })
    }
    dfs(data)
    return [...tempSet]
}
