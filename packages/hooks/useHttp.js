import { ref, shallowRef } from 'vue'
import Http from '@@/http/index'

export function useHttp(option, { url, data: requestData, attaches, config }) {
    const $http = new Http(option)
    const method = (config && config.method) || 'get'

    const response = shallowRef()
    const data = shallowRef()
    const isFinished = ref(false)
    const isLoading = ref(true)
    const error = shallowRef()
    const _attaches = {
        showLoading: false,
        ...attaches
    }
    $http[method](url, requestData, _attaches, config)
        .then((r) => {
            response.value = r
            data.value = r.data
        })
        .catch((e) => {
            error.value = e
        })
        .finally(() => {
            isLoading.value = false
            isFinished.value = true
        })
    return {
        response,
        data,
        error,
        finished: isFinished,
        loading: isLoading,
        isFinished,
        isLoading
    }
}
