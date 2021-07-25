/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:03:21
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-07-25 22:48:37
 */
export default function(type, { confirm, cencel }) {
    console.log(this)
    this.$confirm(`您确定要${type}吗`, '提示框', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message_box_alert',
        callback: async action => {
            if (action == 'cancel') {
                this.msgInfo(`取消${type}`)
                cencel && cencel()
            } else {
                confirm && confirm()
            }
        }
    })
}