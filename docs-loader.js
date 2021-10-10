/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-10-09 18:08:37
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-10-09 18:27:02
 */
module.exports = function(source, map) {
    this.callback(
        null,
        `export default function (Component) {
        Component.options.__docs = ${
          JSON.stringify(source)
        }
      }`,
        map
    )
}