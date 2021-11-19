import Http from '@@/http/index'

export const $http = new Http({
    baseURL: '',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    showLoading: true,
    loadingMethods: {
        open: () => { console.log('打开loading') },
        close: () => { console.log('关闭loading') }
    },
    showToast: true,
    toastMethods: console.log,
    defaultErrorToastMessage: '服务异常，请重新再试',
    successRequestAssert: function(res) {
        return res.code === 200
    },
    isRefreshToken: false,
    refreshRequestAssert: function(res) {
        return res.code === 401
    },
    requestAssert: {}
})

const setupHttp = (app) =>{ 
    app.config.globalProperties.$http = $http
    console.log('$http')
    console.log($http.get)
    console.log($http.post)
}
export default setupHttp
