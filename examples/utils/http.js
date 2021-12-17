import Http, { useHttp as useLgHttp} from 'lg-http'
const option = {
    baseURL: 'http://localhost:8900',
    headers: {
        'Content-Type': 'application/json'
    },
    loadingMethods: {
        open: () => {
            console.log('打开loading')
        },
        close: () => {
            console.log('关闭loading')
        }
    },
    showToast: true,
    toastMethods: {
        success: (msg) => {
            console.log(msg)
        }
    },
    defaultErrorToastMessage: '服务异常，请重新再试',
    successRequestAssert: function (res) {
        return res.code === 200
    },
    refreshRequest: () => {
        return Promise.resolve(true)
    },
    isRefresh: true,
    isOptimization: true,
    codeCallback: {
        400: (result) => {
            console.log(result)
        }
    }
}
export const $http = new Http(option)

export const useHttp = (url, config, attaches) => {
    return useLgHttp(option, {
        url,
        data: config && config.data,
        attaches,
        config
    })
}

const setupHttp = (app) => {
    app.config.globalProperties.$http = $http
}
export default setupHttp
