/* 处理取消重复请求 */

const cancelQueue = {
    _isOptimization: false,
    list: {},
    init({ isOptimization }) {
        this._isOptimization = isOptimization
    },
    getOptimization(attaches) {
        if (attaches && attaches.isOptimization !== undefined) {
            return attaches.isOptimization
        }
        return this._isOptimization
    },
    add(name, cancel, attaches, msg = '') {
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
    cancelAll(attaches, msg = '') {
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
