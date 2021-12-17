# lg-http

> 注：只支持 get、post

## 介绍

基于 axios 二次封装，内置加载, 提示, 取消重复请求, 刷新 token

## 使用

引入

```引入
import Http, { useHttp } from 'lg-http'

```

### 演示 1

```js
import Http from 'lg-http'
/*
 * option option配置属性
 */
const $http = new Http(option)
/*
 * url 接口地址
 * data 接口参数
 * attaches attaches配置属性
 * axiosConfig axios配置属性
 */
$http
    .get(url, data, attaches, axiosConfig)
    .then((result) => {})
    .catch((error) => {})

$http.get(
    '/login',
    {
        account: 'admin',
        password: '123456'
    },
    {
        showLoading: false,
        showToast: false,
        codeCallback: {
            400: (result) => {
                console.log(result)
            }
        }
    },
    {
        header: {
            'Content-Type': 'application/json'
        }
    }
)
```

### 演示 2

> 注：useHttp 只适用 Vue3

根据 `loading` , 方便处理独立的加载效果

```js
import {
    useHttp
} from 'lg-http'

/*
 * option option配置属性
 * url 接口地址
 * data 接口参数
 * attaches attaches配置属性
 * axiosConfig axios配置属性
 * return resultAttr useHttp结果属性
 */
const resultAttr = useHttp(option, {
    url,
    data,
    attaches,
    axiosConfig
})

const {
    response,
    data,
    error,
    loading
} = useHttp(option, {
    '/login',
    {
        account: 'admin',
        password: '123456'
    },
    {
        showLoading: true,
        showToast: false,
        codeCallback: {
            400: (result) => {
                console.log(result)
            }
        }
    },
    {
        header: {
            'Content-Type': 'application/json'
        }
    }
})
```

### option 配置属性

| 属性名                   | 类型             | 默认值                                  | 说明                       |
| ------------------------ | ---------------- | --------------------------------------- | -------------------------- |
| baseURL                  | string           | -                                       | axios baseURL              |
| timeout                  | number           | 20000                                   | axios timeout              |
| headers                  | object           | {}                                      | axios headers              |
| showLoading              | boolean          | true                                    | 是否开启加载效果           |
| loadingMethods           | object           | {open: console.log, close: console.log} | 加载效果的配置             |
| showToast                | boolean          | true                                    | 是否开启提示               |
| toastMethods             | function, object | console.log                             | 提示配置                   |
| isRefresh                | boolean          | false                                   | 是否刷新 token             |
| refreshRequestAssert     | function         | (res)=>res.code===401                   | 刷新 token 的状态          |
| refreshRequest           | () => Promise    | -                                       | 刷新 token 的函数          |
| isOptimization           | boolean          | false                                   | 是否开启重复请求拦截       |
| successRequestAssert     | function         | (res)=>res.success                      | 请求正确的状态             |
| defaultErrorToastMessage | string           | '服务异常，请重新再试'                  | 错误提示文案               |
| codeCallback             | object           | {}                                      | 某种 code 状态下的特殊处理 |

### attaches 配置属性(可选)

| 属性名         | 类型    | 默认值 | 说明                       |
| -------------- | ------- | ------ | -------------------------- |
| showLoading    | boolean | -      | 是否开启加载效果           |
| showToast      | boolean | -      | 是否开启提示               |
| isRefresh      | boolean | -      | 是否刷新 token             |
| isOptimization | boolean | -      | 是否开启重复请求拦截       |
| codeCallback   | object  | {}     | 某种 code 状态下的特殊处理 |
| successMessage | string  | -      | 成功提示文案               |

### axios 配置属性

[axios 官网](https://axios-http.com/docs/req_config)

### useHttp 结果属性

| 属性名   | 类型    | 默认值 | 说明                                        |
| -------- | ------- | ------ | ------------------------------------------- |
| response | obeject | -      | 请求成功结果                                |
| data     | obeject | -      | response.data                               |
| error    | obeject | -      | 请求错误结果                                |
| loading  | boolean | -      | 是否加载中。默认为 true, 请求完成为 false   |
| finished | boolean | -      | 是否请求完成。默认为 false, 请求完成为 true |
