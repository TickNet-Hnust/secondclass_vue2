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
    "username": "lsh",
    "password": "lshlshlsh",
    "distPath": "dist",
    "webDir": "/home/lsh/secondclass",
    "bakDir": "/home/lsh/secondclassbak",
    "isRemoveRemoteFile": true,
    "isRemoveLocalFile": false
  }
}