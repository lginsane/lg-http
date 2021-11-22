import Http from '@@/http/index'

export const $http = new Http({
    baseURL: 'http://localhost:3000',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json'
    },
    showLoading: true,
    loadingMethods: {
        open: () => { console.log('打开loading') },
        close: () => { console.log('关闭loading') }
    },
    showToast: true,
    toastMethods: {
        success: (msg) => {
            console.log(msg)
        }
    },
    defaultErrorToastMessage: '服务异常，请重新再试',
    successRequestAssert: function(res) {
        return res.code === 200
    },
    isOptimization: true,
    requestAssert: {}
})

const setupHttp = (app) =>{ 
    app.config.globalProperties.$http = $http
}
export default setupHttp
