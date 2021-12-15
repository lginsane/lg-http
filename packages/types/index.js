export const defaultOptions = {
    baseURL: '',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // 加载
    showLoading: true,
    loadingMethods: {
        open: () => {
            console.log('打开loading')
        },
        close: () => {
            console.log('关闭loading')
        }
    },
    // 提示
    showToast: true,
    toastMethods: console.log,
    defaultErrorToastMessage: '服务异常，请重新再试',
    // 成功状态
    successRequestAssert: function (res) {
        return res.code === 200
    },
    // token 失效状态
    refreshRequestAssert: function (res) {
        return res.code === 401
    },
    // 刷新token
    refreshRequest: () => {
        return Promise.resolve(true)
    },
    // 是否刷新token
    isRefresh: false,
    // 是否优化重复请求
    isOptimization: false,
    // 根据code处理特殊情况
    requestAssert: function (res) {}
}
