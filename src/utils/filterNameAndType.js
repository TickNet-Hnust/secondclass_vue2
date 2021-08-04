/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-07-27 21:48:25
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-07-28 21:43:52
 */
export default function(data, name) {
    if (!name) return data

    let findParent = node => {
        while (node.__parent__.__parent__) {
            node = node.__parent__
        }
        return node
    }
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
