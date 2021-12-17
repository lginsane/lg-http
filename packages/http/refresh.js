import { isFunction } from "../utils/is"

const RefreshQueue = {
    _isRefresh: false,
    freshing: false,
    list: [],
    _refreshTokenRequest: null,
    init({ isRefresh, refreshTokenRequest }) {
        this._isRefresh = isRefresh
        this._refreshTokenRequest = refreshTokenRequest
    },
    add(cb) {
        this.list.push(cb)
    },
    refresh() {
        if (this._refreshTokenRequest && isFunction(refreshTokenRequest)) {
            this._refreshTokenRequest().then(() => {
                this.list.forEach(cb => cb())
                this.list = []
                this.freshing = false
            })
        } else {
            throw new Error('refreshTokenRequest格式错误')
        }
    }
}

export default RefreshQueue
