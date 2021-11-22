/* 加载效果 */
import { isFunction } from '../utils/is'

const Loading = {
    _methods: null,
    _showLoading: false,
    init({ showLoading, loadingMethods }) {
        this._methods = loadingMethods
        this._showLoading = showLoading
    },
    getShowLoading(attaches) {
        return this._showLoading || (attaches && attaches.showLoading)
    },
    open(attaches) {
        if (!this.getShowLoading(attaches)) return
        if (this._methods && this._methods.open && isFunction(this._methods.open)) {
            this._methods.open()
        }
    },
    close(attaches) {
        if (!this.getShowLoading(attaches)) return
        if (this._methods && this._methods.close && isFunction(this._methods.close)) {
            this._methods.close()
        }
    }

}
export default Loading
