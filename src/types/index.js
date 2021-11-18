export const defaultOptions = {
    baseURL: '',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    loadingMethods: {
        open: () => { console.log('打开loading') },
        close: () => { console.log('关闭loading') }
    },
    showLoading: true,
    toastMethods: console.log,
    defalutErrorToastMessage: '服务异常，请重新再试',
    showToast: true,
    isRefreshToken: false
}
