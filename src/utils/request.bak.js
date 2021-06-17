import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
export const baseURL = "http://localhost:8080"

const instance = axios.create({
    baseURL,
    timeout: 10000
})

instance.interceptors.request.use(
    function(config) {
        config.headers['Authorization'] = 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjhjODI5YTkzLTA4ZGUtNDQzYi1iNzI0LTczZTI5NWM2YjMxNSJ9.CXwyeeNbhl_lRGI5ynr9Id_1DHdkx-54oUjmTRwPwnaEVv-RScvDMYggpx-iHOnwqrvBGNR7y5OpwTPyFFDSgw'
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