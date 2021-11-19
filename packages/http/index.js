import axios from "axios";
import CancelQueue from "./cancel";
import RefreshQueue from "./refresh";
import Loading from "./loading";
import Toast from "./toast";
import { defaultOptions } from "../types/index";
import { mergeConfig } from "../utils/index";
import { isFunction } from '../utils/is'

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
    this.instance = axios.create({
      baseURL,
      timeout,
      headers,
    });
    Loading.init(this.option);
    Toast.init(this.option);
    CancelQueue.init(this.option);
    RefreshQueue.init(this.option);
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
    if (_attaches.isOptimization || _attaches.isRefreshToken) {
      config.cancelToken = new CancelQueue.CancelToken(function executor(c) {
        CancelQueue.add(path, c);
      });
    }
    
    // refresh token
    RefreshQueue.add(path, { method, url, data, attaches, axiosConfig });

    // open loading
    Loading.open(attaches);

    return this.instance[method](
      path,
      isBodyData ? _config.data : _config,
      isBodyData ? { ..._config, data: undefined } : undefined
    );
  }
  async commonThen(response, attaches) {
    const { config, data: result, status } = response;
    const {
      successRequestAssert,
      isRefreshToken,
      refreshRequestAssert,
      requestAssert,
    } = attaches;
    const _requestAssert = requestAssert || this.option.requestAssert

    // close loading
    Loading.close(config.url, attaches);
      
    // refresh token
    if (isRefreshToken && refreshRequestAssert &&
      typeof refreshRequestAssert === "function" &&
      refreshRequestAssert(result)
    ) {
      CancelQueue.clear()
      try {
        // Check whether the refresh is successful.
        const isRefreshSuccess = await RefreshQueue.refreshToken()
        if (isRefreshSuccess) {
          RefreshQueue.requestAll()
        }
      } catch (error) {
        return Promise.reject(error)
      }
      return
    } else {
      const finalResponse = {
        ...result,
        attaches
      }
      // repeated requests
      CancelQueue.remove(config.url, attaches);

      // success
      if (
        successRequestAssert &&
        typeof successRequestAssert === "function" &&
        successRequestAssert(result)
      ) {
        Toast.success(attaches)
        return Promise.resolve(finalResponse)
      }
      if (_requestAssert && isFunction(_requestAssert)) {
        if (isFunction(_requestAssert)) {
          _requestAssert(finalResponse)
        }
      }
      Toast.error(attaches)
      return Promise.reject(finalResponse)
    }
  }
  commonCatch(error, attaches) {
    if (axios.isCancel(error)) {
      console.log('Request canceled')
      return Promise.reject(error)
    }

    Loading.close(attaches);
  }

  get(url, data, attaches, axiosConfig) {
    return this.request("get", url, data, attaches, axiosConfig)
      .then((response) => {
        this.commonThen(response, attaches);
      })
      .catch((error) => {
        this.commonCatch(error, attaches);
      });
  }

  post(url, data, attaches, axiosConfig) {
    return this.request("post", url, data, attaches, axiosConfig)
      .then((response) => {
        this.then(response, _attaches);
      })
      .catch((error) => {
        this.catch(error, _attaches);
      });
  }
}
