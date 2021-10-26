/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-10-05 15:21:17
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-10-17 21:52:13
 */
module.exports = {
  "projectName": "secondclass",
  "privateKey": "C:\\Users\\Admin/.ssh/id_rsa",
  "passphrase": "",
  "cluster": [],
  "prod": {
    "name": "production",
    "script": "npm run build:prod",
    "host": "49.123.0.27",
    "port": 22,
    "username": "root",
    "password": "Hnust.ticknet@2021",
    "distPath": "dist",
    "webDir": "/app/secondclass",
    "bakDir": "/app/secondclassbak",
    "isRemoveRemoteFile": true,
    "isRemoveLocalFile": false
  }
}