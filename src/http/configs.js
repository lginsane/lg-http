/* 处理接口请求参数，用于token刷新后重新发起请求 */
export const configsQueuet = {
    list: {},
    add(config) {
        this.list[config.url] = config
    },
    remove(config) {
        if (this.list[config.url]) {
            delete this.list[config.url]
        }
    },
    clear() {
        this.list = []
    }
}
