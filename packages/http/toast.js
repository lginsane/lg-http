/* 消息提示 */
import { isObject, isFunction } from '../utils/is'
const Toast = {
    _methods: null,
    _defaultMessage: '',
    _showToast: false,
    init({ toastMethods, defaultErrorToastMessage, showToast }) {
        this._methods = toastMethods
        this._defaultMessage = defaultErrorToastMessage
        this._showToast = showToast
    },
    _toast(msg, cb) {
        cb && cb(msg)
    },
    getShowToast(attaches) {
        return this._showToast || (attaches && attaches.showToast)
    },
    success(attaches) {
        if (!this.getShowToast(attaches)) return
        const successMessage = attaches && attaches.successMessage
        if (successMessage) {
            this._toast(successMessage, this._methods.success)
        }
    },
    error(response, attaches) {
        if (!this.getShowToast(attaches)) return 
        const errorMessage = response ? response.message || response.msg : ''
        let method
        if (isObject(this._methods)) {
            if (isFunction(this._methods.error)) {
                method = this._methods.error
            }
        } else if (isFunction(this._methods)) {
            method = this._methods
        }
        this._toast(errorMessage || this._defaultMessage, method)
    }
}

export default Toast
