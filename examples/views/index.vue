<template>
    <div class="test">
        <div class="btn" @click="requestClick">测试请求</div>
        <div>结果：{{s}}</div>
    </div>
</template>
<script>
import { getCurrentInstance, ref } from 'vue'
import { useHttp } from '../utils/http'
export default {
    setup() {
        const { proxy } = getCurrentInstance()
        const s = ref(null)
        const requestClick = () => {
            proxy.$http
                .post(
                    '/user',
                    {},
                    {
                        showLoading: false
                    }
                )
                .then((res) => {
                    s.value = res
                    console.log('res--')
                    console.log(res)
                })
                .catch((error) => {
                    s.value = error
                    console.log('error--')
                    console.log(error)
                })
        }
        return { requestClick, s }
    }
}
</script>
<style>
    .btn {
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #ccc;
        cursor: pointer;
        font-size: 14px;
    }
</style>
