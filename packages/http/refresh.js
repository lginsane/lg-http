/* 刷新 token */
export const refreshQueue = {
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
