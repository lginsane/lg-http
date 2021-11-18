/* 处理取消请求 */
import { CancelToken } from 'axios'

export const cancelQueuet = {
    list: {},
    CancelToken: CancelToken,
    add(name, cancel) {
        this.list[name] = msg => {
            cancel(msg)
        }
    },
    remove(name) {
        if (this.list[name]) {
            delete this.list[name]
        }
    },
    cancel(name, msg = '') {
        if (this.list[name]) {
            this.list[name](msg)
        }
    },
    cancelAll(msg = '') {
        Object.keys(this.list).forEach(key => {
            this.list[key](msg)
        })
    }
}
