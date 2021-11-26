<template>
    <div @click="requestClick">测试请求{{ s }}</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { useHttp } from '../utils/http'
export default {
    setup() {
        const { proxy } = getCurrentInstance()
        console.log(proxy.$http)
        const requestClick = () => {
            proxy.$http
                .post(
                    'user',
                    {},
                    {
                        showLoading: false
                    }
                )
                .then((res) => {
                    console.log('res--')
                    console.log(res)
                })
                .catch((error) => {
                    console.log('error--')
                    console.log(error)
                })
        }
        const s = useHttp('/user', {
            method: 'post'
        })
        return { requestClick, s }
    }
}
</script>
