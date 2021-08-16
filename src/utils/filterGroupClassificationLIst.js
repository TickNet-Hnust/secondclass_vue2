/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2021-08-13 22:16:02
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-16 22:43:34
 */
/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2021-08-13 22:16:02
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-13 22:39:02
 */

export function filterGroupClassificationList(data)
{
    let maxLayer=0;
    let count = 0;
    let filter = (fahter,father_id) => {
        let array = []
        data.forEach(item => {
            if (item.parentId === father_id) {
                array.push(item)
            }
        })
        count++;
        if(count==1&&array.length==0)
        {
            return data
        }
        else{
           array.forEach(item => {
            let temp = filter(item,item.id)
            if (temp.length != 0) {
                item.children = temp
            }
            else
            {
                maxLayer = Math.max(maxLayer,item.layer);
            }
            item._parent_ = fahter;
           })
            return array 
        }
    }
    //排序
    let sortWay = array => {
        array.sort(function(a, b) {
            return a.sort - b.sort
        })
        array.forEach(item => {
            item.children && sortWay(item.children)
        })
        return array
    }
    //赋值第一层的id和parentId
    let temp = filter(null,0)
    //方便页面v-for渲染
    maxLayer++;
    temp = sortWay(temp);
    //给数组增加一个maxLayer属性
    Object.defineProperty(temp,'maxLayer',{
        value: maxLayer,
        //不可遍历 这样表格就不好遍历这个多余的数据
        enumerable:false
    })
    // temp.push(maxLayer);
    return temp
}
