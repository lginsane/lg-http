/* 处理取消重复请求 */
import { CancelToken } from 'axios'

const cancelQueue = {
    _isOptimization: false,
    list: {},
    CancelToken: CancelToken,
    init({ isOptimization }) {
        this._isOptimization = isOptimization
    },
    getOptimization(attaches) {
        return this._isOptimization || (attaches && attaches.isOptimization)
    },
    add(name, cancel, attaches) {
        if (!this.getOptimization(attaches)) return
        if (this.list[name]) {
            this.list[name](msg)
            delete this.list[name]
        }
        this.list[name] = msg => {
            cancel(msg)
        }
    },
    cancel(name, attaches) {
        if (!this.getOptimization(attaches)) return
        if (this.list[name]) {
            delete this.list[name]
        }
    },
    cancelAll(msg = '', attaches) {
        if (!this.getOptimization(attaches)) return
        Object.keys(this.list).forEach(key => {
            this.list[key](msg)
        })
    },
    clear(attaches) {
        if (!this.getOptimization(attaches)) return
        this.list = {}
    }
}

export default cancelQueue
