/* 消息提示 */
import { isObject, isFunction } from '../utils/is'
const Toast = {
    methods: null,
    defaultMessage: '',
    init({ toastMethods, message, showToast }) {
        this._methods = toastMethods
        this._defaultMessage = message
        this._showToast = showToast
    },
    _toast(msg, cb) {
        cb && cb(msg)
    },
    getShowToast(attaches) {
        return this._showToast || (attaches && attaches.showToast)
    },
    success(attaches) {
        const successMessage = attaches && attaches.successMessage
        if (this.getShowToast(attaches) && successMessage) {
            this._toast(successMessage, this._methods.success)
        }
    },
    error(response, attaches) {
        const errorMessage = response ? response.message || response.msg : ''
        let method
        if (isObject(this._methods)) {
            if (isFunction(this._methods.error)) {
                method = this._methods.error
            }
        } else if (isFunction(this._methods)) {
            method = this._methods
        }
        if (this.getShowToast(attaches)) {
            this._toast(errorMessage || this._defaultMessage, method)
        }
    }
}

export default Toast
