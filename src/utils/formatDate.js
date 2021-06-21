function format(temp) {
    let date = new Date(temp)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${year}-${month}-${day}`
}
export default format

// format('2021-06-17T21:47:44.000+0800')