export default function(type, { confirm, cencel }) {
    console.log(this)
    this.$alert(`您确定要${type}吗吗`, '提示框', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message_box_alert',
        callback: async action => {
            if (action == 'cancel') {
                this.msgInfo(`取消${type}`)
                cencel()
            } else {
                confirm()
            }
        }
    })
}