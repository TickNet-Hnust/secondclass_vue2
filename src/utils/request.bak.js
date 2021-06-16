import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
export const baseURL = "http://localhost:3000"

const instance = axios.create({
    baseURL,
    timeout: 10000
})

instance.interceptors.request.use(
    function(config) {
        config.headers['Authorization'] = 'thisisAuthorization'
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