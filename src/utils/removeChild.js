/*
 * @Descripttion: 删除树形数据中的某一个
 * @Author: 林舒恒
 * @Date: 2021-07-24 12:01:09
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-07-24 13:05:32
 */
export default function(classificationArray, path, id) {
    let tempArray = path.split(',')
    tempArray.push(id)
    let find = (array, layer) => {
        let index = array.findIndex(item => {
            return item.id == tempArray[layer]
        })
        if (layer == tempArray.length - 1) {
            array.splice(index, 1)
            return
        }
        find(array[index].children, layer + 1)
    }
    find(classificationArray, 0)
}
