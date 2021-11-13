/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-10-05 15:21:17
<<<<<<< HEAD
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-10-26 21:27:18
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
    },
    "test": {
        "name": "test",
        "script": "npm run build:prod",
        "host": "49.123.0.27",
        "port": 22,
        "username": "root",
        "password": "Hnust.ticknet@2021",
        "distPath": "dist",
        "webDir": "/app/secondclassTest",
        "bakDir": "/app/secondclassTestbak",
        "isRemoveRemoteFile": true,
        "isRemoveLocalFile": false
    }
=======
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
>>>>>>> 1858bd9c6c7a3d62a2c48adc52444adba7cbe96b
}