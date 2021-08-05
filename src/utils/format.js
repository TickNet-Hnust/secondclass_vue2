/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:03:21
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-05 15:19:35
 */
export function format(temp) {
    let date = new Date(temp)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${year}-${month}-${day}`
}

// format('2021-06-17T21:47:44.000+0800')