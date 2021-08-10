/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-07-31 19:43:58
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-08-10 12:15:31
 */
/**
 * @description:
 * @param {(2)Array[Date,Date]} date 例如[Sun Aug 01 2021 12:57:32 GMT+0800 (中国标准时间),Sun Aug 01 2021 12:57:47 GMT+0800 (中国标准时间)]
 * @return {(2)Array[String,String]} 例如 [yyyy-mm-dd HH:MM:SS,yyyy-mm-dd HH:MM:SS]
 */
export function transformDate(date) {
    return [transformDateSingle(date[0]), transformDateSingle(date[1])]
}

export function transformDateSingle(date) {
    function format(t){
        let time = new Date(t)
        let yy = time.getFullYear()
        let mm = time.getMonth() + 1
        let dd = time.getDate()
        let hh = time.getHours()
        let MM = time.getMinutes()
        let ss = time.getSeconds()
        return `${yy}-${mm}-${dd} ${hh}:${MM}:${ss}`
    }
    return format(date)
}