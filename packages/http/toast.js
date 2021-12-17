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
        if (attaches && attaches.showToast !== undefined) {
            return attaches.showToast
        }
        return this._showToast
    },
    success(attaches) {
        if (!this.getShowToast(attaches)) return
        const successMessage = attaches && attaches.successMessage
        if (successMessage) {
            let method
            if (isObject(this._methods)) {
                if (isFunction(this._methods.success)) {
                    method = this._methods.success
                }
            } else if (isFunction(this._methods)) {
                method = this._methods
            } else {
                throw new Error('toastMethods格式错误')
            }
            this._toast(successMessage, method)
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
        } else {
            throw new Error('toastMethods格式错误')
        }
        this._toast(errorMessage || this._defaultMessage, method)
    }
}

export default Toast
