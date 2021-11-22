import axios from "axios";
import CancelQueue from "./cancel";
import RefreshQueue from "./refresh";
import Loading from "./loading";
import Toast from "./toast";
import { defaultOptions } from "../types/index";
import { mergeConfig } from "../utils/index";
import { isFunction, isObject } from '../utils/is'

export default class Http {

  constructor(option) {
    this.instance = null;
    this.option = {
      ...defaultOptions,
      ...option,
    };
    this.init();
  }

  init() {
    const { baseURL, timeout, headers } = this.option;
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
      headers,
    });
    Loading.init(this.option);
    Toast.init(this.option);
    CancelQueue.init(this.option);
    // RefreshQueue.init(this.option);
  }

  request(method, url, data, attaches, axiosConfig) {
    const isBodyData = method.toLowerCase() === "post";
    const path = url;

    // attaches config
    const _attaches = {
      ...this.option,
      ...attaches,
    };

    // axios config
    const _config = mergeConfig(isBodyData, data, axiosConfig);

    // repeated requests
    if (_attaches.isOptimization) {
      _config.cancelToken = new CancelQueue.CancelToken(function executor(c) {
        CancelQueue.add(path, c, attaches);
      });
    }
  
    // open loading
    Loading.open(attaches);

    return this.instance[method](
      path,
      isBodyData ? _config.data : _config,
      isBodyData ? { ..._config, data: undefined } : undefined
    );
  }

  commonThen(response, attaches) {
    const { config, data: result } = response;
    const {
      successRequestAssert,
      requestAssert,
    } = this.option;

    const _requestAssert = (attaches && attaches.requestAssert) || requestAssert
    const _successRequestAssert = (attaches && attaches.successRequestAssert) || successRequestAssert

    // close loading
    Loading.close(attaches);
      
    const finalResponse = {
      ...result,
      attaches
    }

    // repeated requests
    CancelQueue.cancel(config.url, attaches);

    // success
    if (
      _successRequestAssert &&
      typeof _successRequestAssert === "function" &&
      _successRequestAssert(result)
    ) {
      Toast.success(attaches)
      return Promise.resolve(finalResponse)
    }

    if (_requestAssert && isFunction(_requestAssert)) {
      if (isFunction(_requestAssert)) {
        _requestAssert(finalResponse)
      }
    }

    return Promise.reject(finalResponse)
  }

  commonCatch(error, attaches) {
    if (axios.isCancel(error)) {
      return new Promise(() => {})
    }
    const isResponseReject = error.success !== undefined
    const finalError = isResponseReject ? error : {
      attaches,
      error,
      message: error.message || error.msg,
      success: false,
      code: error.code
    }
    Toast.error(finalError)
    Loading.close(attaches);
    return Promise.reject(finalError)
  }

  get(url, data, attaches, axiosConfig) {
    return this.request("get", url, data, attaches, axiosConfig)
      .then((response) => {
        return this.commonThen(response, attaches);
      })
      .catch((error) => {
        return this.commonCatch(error, attaches);
      });
  }

  post(url, data, attaches, axiosConfig) {
    return this.request("post", url, data, attaches, axiosConfig)
      .then((response) => {
        return this.commonThen(response, attaches);
      })
      .catch((error) => {
        return this.commonCatch(error, attaches);
      });
  }
}
