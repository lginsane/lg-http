import axios from 'axios'
import CancelQueue from './cancel'
import RefreshQueue from './refresh'
import Loading from './loading'
import Toast from './toast'
import { defaultOptions } from '../types/index'
import { mergeConfig } from '../utils/index'
import { isFunction, isObject } from '../utils/is'

export default class Http {
    constructor(option) {
        this.instance = null
        this._params = null
        this.option = {
            ...defaultOptions,
            ...option
        }
        this.init()
    }

    init() {
        const { baseURL, timeout, headers } = this.option
        if (headers && isObject(headers)) {
            for (const key in headers) {
                if (Object.hasOwnProperty.call(headers, key)) {
                    if (isFunction(headers[key])) {
                        headers[key] = headers[key]()
                    }
                }
            }
        } else {
            throw new Error('headers 格式不正确')
        }
        this.instance = axios.create({
            baseURL,
            timeout,
            headers
        })
        Loading.init(this.option)
        Toast.init(this.option)
        CancelQueue.init(this.option)
        RefreshQueue.init(this.option)
    }

    request(method, url, data, attaches, axiosConfig) {
        const isBodyData = method.toLowerCase() === 'post'
        const path = url

        // attaches config
        const _attaches = {
            ...this.option,
            ...attaches
        }

        // axios config
        const _config = mergeConfig(isBodyData, data, axiosConfig)

        // repeated requests
        if (_attaches.isOptimization) {
            _config.cancelToken = new axios.CancelToken(function executor(c) {
                CancelQueue.add(path, c, attaches)
            })
        }
        // refresh add
        if (_attaches.isRefresh) {
            this._params = { method, url, data, attaches, axiosConfig }
        }
        // open loading
        Loading.open(attaches)

        return this.instance[method](
            path,
            isBodyData ? _config.data : _config,
            isBodyData ? { ..._config, data: undefined } : undefined
        )
    }

    commonThen(response, attaches) {
        const { config, data: result } = response
        const successRequestAssert = this.option.successRequestAssert
        const isRefresh = (attaches && attaches.isRefresh !== undefined) ? attaches.isRefresh : this.option.isRefresh

        Loading.close(attaches)

        const finalResponse = {
            ...result,
            attaches
        }

        // repeated requests
        CancelQueue.cancel(config.url, attaches)

        // success
        if (
            successRequestAssert &&
            typeof successRequestAssert === 'function' &&
            successRequestAssert(result)
        ) {
            Toast.success(attaches)
            return Promise.resolve(finalResponse)
        }

        // refresh token
        if (isRefresh) {
            if (!RefreshQueue.freshing) {
                RefreshQueue.freshing = true
                RefreshQueue.refresh()
            }
            return Promise.resolve(
                new Promise((resolve) => {
                    RefreshQueue.add(() => {
                        const { method, url, data, attaches, axiosConfig } =
                            this._params
                        resolve(
                            this.request(
                                method,
                                url,
                                data,
                                attaches,
                                axiosConfig
                            )
                        )
                    })
                })
            )
        }

        return Promise.reject(finalResponse)
    }

    commonCatch(error, attaches) {
        if (axios.isCancel(error)) {
            return new Promise(() => {})
        }
        const isResponseReject = error.success !== undefined
        const finalError = isResponseReject
            ? error
            : {
                  attaches,
                  error,
                  message: error.message || error.msg,
                  success: false,
                  code: error.code
              }
        const { codeCallback } = {
            ...this.option,
            ...attaches
        }
        if (codeCallback && error.code && codeCallback[error.code]) {
            codeCallback[error.code]
        } else {
            Toast.error(finalError, attaches)
        }
        Loading.close(attaches)
        return Promise.reject(finalError)
    }

    get(url, data, attaches, axiosConfig) {
        return this.request('get', url, data, attaches, axiosConfig)
            .then((response) => {
                return this.commonThen(response, attaches)
            })
            .catch((error) => {
                return this.commonCatch(error, attaches)
            })
    }

    post(url, data, attaches, axiosConfig) {
        return this.request('post', url, data, attaches, axiosConfig)
            .then((response) => {
                return this.commonThen(response, attaches)
            })
            .catch((error) => {
                return this.commonCatch(error, attaches)
            })
    }
}
