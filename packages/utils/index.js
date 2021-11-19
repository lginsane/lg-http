// 合并请求参数，处理data和params
export const mergeConfig = (
    isBodyData,
    data,
    config
  ) => {
    let mergeConfig
    if (config && typeof config === 'object') {
      mergeConfig = { ...config }
    }
    if (data && typeof data === 'object') {
      if (!mergeConfig) {
        mergeConfig = {}
      }
      if (isBodyData) {
        mergeConfig.data = {
          ...(mergeConfig.data || {}),
          ...data
        }
      } else {
        mergeConfig.params = {
          ...(mergeConfig.params || {}),
          ...data
        }
      }
    }
    return mergeConfig
  }
