/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-10-05 15:21:17
 * @LastEditors: 张津瑞
 * @LastEditTime: 2021-11-04 19:02:45
*/
module.exports = {
  "projectName": "secondclass",
  // "privateKey": "C:\\Users\\86183\\.vscode\\extensions\\liximomo.sftp-1.12.9\\node_modules\\ssh2\\test\\fixtures\\id_rsa",
  "privateKey": "C:\\Users\\86183\\.vscode\\extensions\\liximomo.sftp-1.12.9\\node_modules\\ssh2\\test\\fixtures\\id_rsa",
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