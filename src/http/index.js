import { defaultOptions } from './type'
import axios from 'axios'
class Http {
    constructor(option) {
        this.instance = null
        this.option = {
            ...defaultOptions,
            ...option
        }
        this.init()
    }
    init () {
        const { baseURL, timeout, headers } = this.option
        this.instance = axios.create({
            baseURL, timeout, headers
        })
    }
}
