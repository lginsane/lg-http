<template>
    <div @click="requestClick">
        测试请求
    </div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { useHttp } from '@@/hooks/useHttp'
export default {
    setup() {
        const { proxy } = getCurrentInstance()
        console.log(proxy.$http)
        const requestClick = () => {
            proxy.$http.post('user', {}, {
                showLoading: false
            }).then(res => {
                console.log('res--')
                console.log(res)
            }).catch(error => {
                console.log('error--')
                console.log(error)
            })
        }
        const { response, data, error, loading } = useHttp('/user', { method: 'post' }, proxy.$http.instance)
        return { requestClick }
    }
}
</script>
