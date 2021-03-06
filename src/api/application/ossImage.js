/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-08-04 16:19:11
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-10-02 14:03:05
 */
// import { getUUID } from '@/utils/utils'
import request from '@/utils/request.js'
import axios from 'axios'
// import api from './index'
import Compressor from 'compressorjs'

// 获取上传签名
export function getPolicy() {
    return request({
        url: '/oss/secondClass/getCertificate',
        method: 'get'
    })
}

function getUUID() {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'
    return s.join('')
}
// "ossData": {
//   "accessid": "LTAI4GBuAcXuvfaoqa9HgA6S",
//     "policy": "eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0xOVQwODowNjozNi41MzVaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCIyMDIwLTEyLTE5Il1dfQ==",
//     "signature": "w1p5M/Y9W4s4ukVbG+BFlXRYRfc=",
//     "dir": "2020-12-19",
//     "host": "https://ticknet-swzl.oss-cn-hangzhou.aliyuncs.com",
//     "expire": "1608365196"
// }
/**
 * 通过getOssFileUrl获取上传到oss后的完整路径
 * 再通过upload上传图片
/*
  获取图片路径
  */
export function getOssFileUrl(ossData, file) {
    // const url = 'https://ticknet-swzl.oss-cn-hangzhou.aliyuncs.com'
    const host = ossData.host
    const photoName = file.file.name // 原图片的名称 abc.jpg
    const catalogue = ossData.dir // Todo .replace('-', '/')
    const randName = getUUID() + photoName.substring(photoName.lastIndexOf('.')) // sdfsdfssadfe.jpg
    const key = catalogue + '/' + randName // 存储到oss的图片名称 自己定，必须确保唯一性，不然会覆盖oss中原有的文件
    console.log(host + `/${key}`)
    return host + `/${key}`
}
/*
 上传图片,status: 0成功，data为上传成功时的文件url
 */
export function upload(ossData, file, ossFileUrl) {
    const photoName = file.file.name // 原图片的名称 abc.jpg
    const policy = ossData.policy // 服务器端同事调oss的API，通过接口返回给前端的 policy
    const OSSAccessKeyId = ossData.accessid
        // const callback = "callback"  // 服务器端同事调oss的API，通过接口返回给前端的 callback。这个是需要 oss 触发这个回调来通知服务器操作结果。
    const signature = ossData.signature
    const host = ossData.host
    const key = ossFileUrl.substring(host.length + 1)
    const param = new FormData()
    param.append('name', `${photoName}`)
    param.append('key', `${key}`)
    param.append('policy', `${policy}`)
    param.append('OSSAccessKeyId', `${OSSAccessKeyId}`)
    param.append('Signature', `${signature}`)
    param.append('success_action_status', 200)
        // param.append('callback', `${callback}`)
        // return new Promise((resolve, reject) => {
        //     new Compressor(file.file, {
        //         quality: 0.1,
        //         success: resolve,
        //         error: reject
        //     })
        // }).then(res => {
        // param.append('file', res)
    param.append('file', file.file)
        // .post('http://localhost:8080/utils/imgSecCheck', param, {
        //         headers: {
        //             'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImExM2QxMmFkLTMzY2EtNGRmNS05YzE4LTJkNjQyNjdhMzZhYiJ9.0SfhI3qg4_fHRDUNZ5QLbJzsHZKo7DZEV4c3CnllJe75am70vD2SFIvcgIF8hpDmMLRiAUzPrKwYBla8xB42_g'
        //         }
        //     })
        // debugger
    return axios
        .post(host, param)
        .then(res => {
            console.error(res, '图片返回的信息')
            return Promise.resolve(res)
        })
        .catch(err => {
            return Promise.reject(err)
        })
        // })
}