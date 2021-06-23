import axios from 'axios'
import { getToken } from '@/utils/auth'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
export const baseURL = 'http://localhost:8080'

const instance = axios.create({
    baseURL,
    timeout: 10000
})

instance.interceptors.request.use(
    function(config) {
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
        return config.data
    },
    error => {
        return error
    }
)

export default instance
