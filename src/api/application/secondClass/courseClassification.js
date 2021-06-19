export function courseClassification() {
    return request({
        url: '/courseClassification/courseClassification/sortList',
        method: 'put'
    })
}