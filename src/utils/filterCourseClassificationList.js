let test = {}

function temp(obj) {
    test = obj
    return filter(0)
}

function filter(layer) {
    let array = []

    test.data.forEach(item => {
        if (item.pid === layer) {
            array.push(item)
        }
    })
    array.forEach(item => {
        let temp = filter(item.id)
        if (temp.length != 0) {
            item.children = temp
        }
    })
    return array
}

export default temp

/* map版本 */
// function filter(layer) {
//     let array = []
//     let map = new Map()
//     test.data.forEach((item, index) => {
//         if (item.pid === layer) {
//             map.set(item.id, [])
//         }
//     })
//     array.push(map)
//     map.forEach((value, key, map) => {
//         map.set(key, filter(key))
//     })

//     return array
//         // console.log(map)
// }
