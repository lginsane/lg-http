import { defaultOptions } from '../types/index'
import axios from 'axios'
export default class Http {
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
    request() {
        
    }
    then () {

    }
    catch () {
        
    }
    get () {

    }
    post () {
        
    }
}
