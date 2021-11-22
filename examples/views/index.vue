<template>
    <div @click="requestClick">
        测试请求
    </div>
</template>
<script>
import { getCurrentInstance } from 'vue'
export default {
    setup() {
        const { proxy } = getCurrentInstance()
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
        return { requestClick }
    }
}
</script>
