import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getToken } from '@/utils/auth'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
export const baseURL = 'http://192.168.124.8:8080'

const instance = axios.create({
    baseURL,
    timeout: 10000
})

let loading //定义loading变量

function startLoading() {
    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    //使用Element loading-close 方法
    loading.close()
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

instance.interceptors.request.use(
    function(config) {
        showFullScreenLoading()
        const isToken = (config.headers || {}).isToken === false
        if (getToken() && !isToken) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }

        if (config.method === 'get' && config.params) {
            let url = config.url + '?'
            for (const propName of Object.keys(config.params)) {
                let part = encodeURIComponent(propName) + '='
                const value = config.params[propName]
                url += part + encodeURIComponent(value) + '&'
            }
            config.params = {}
            config.url = url.slice(0, -1)
        }
        return config
    },
    function(error) {
        Promise.reject(error)
    }
)

instance.interceptors.response.use(
    config => {
        tryHideFullScreenLoading()
        return config.data
    },
    error => {
        return error
    }
)

export default instance