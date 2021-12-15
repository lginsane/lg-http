const RefreshQueue = {
    _isRefresh: false,
    freshing: false,
    list: [],
    _refreshRequest: null,
    init({ isRefresh, refreshRequest }) {
        this._isRefresh = isRefresh
        this._refreshRequest = refreshRequest
    },
    add(cb) {
        this.list.push(cb)
    },
    refresh() {
        this._refreshRequest().then(() => {
            this.list.forEach(cb => cb())
            this.list = []
            this.freshing = false
        })
    }
}

export default RefreshQueue
