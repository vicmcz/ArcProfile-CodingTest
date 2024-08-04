import { createAxios } from '@blocklet/js-sdk';
import { message } from 'antd';
import { guid } from './util';
import { trackReqAction, trackResAction } from './sp';

// axios api 实例
const api = createAxios({
  baseURL: window?.blocklet?.prefix || '/',
});

// 获取默认入参数据
const getDefaultData = () => {
  return {};
};

// 取消请求的列表
const abortControllerList = [];
/**
 * @description: 取消请求的拦截器函数
 * 取消请求的拦截器函数，该函数不是纯函数，会修改options对象的值，动态添加一个 sinal 属性，用于标识请求
 * @param  {Object} options
 */
const abortControllerRequestInterceptors = (options) => {
  const { url = '', method = 'get', isAbort = true } = options;
  if (!isAbort) {
    return;
  }
  // 请求发起前查询取消请求列表中是否有相同的请求信息
  const abortControllerIndex = abortControllerList.findIndex((item) => {
    return item.url === url;
  });
  // 在abortControllerList取消请求列表中查询是否还有为完成的请求，如果有则找出来进行取消请求
  if (abortControllerIndex !== -1) {
    const abortController = abortControllerList[abortControllerIndex];
    abortController.controller.abort();
    abortControllerList.splice(abortControllerIndex, 1);
  }
  /**
   * 取消请求 校验条件
   * 如果不符合上述取消请求的条件，则进行取消请求校验函数来判断该请求是否进行取消请求的操作
   * 默认将所有get请求都进行取消请求的处理
   */
  if (method.toLowerCase() === 'get') {
    const controller = new AbortController(); // 创建一个控制器
    const { signal } = controller; // 返回一个 AbortSignal 对象实例，它可以用来 with/abort 一个 DOM 请求。
    options.signal = signal;
    abortControllerList.push({
      url,
      controller,
    });
  }
};

// 全局的请求拦截器
api.interceptors.request.use((options) => {
  const {
    method = 'GET',
    params = {},
    data = {},
    isDefaultData = true, // 是否需要默认参数
  } = options;

  // 请求默认入参
  const defaultData = isDefaultData ? getDefaultData() : {};

  if (method.toUpperCase() === 'GET') {
    options.params = Object.assign(defaultData, params);
  } else {
    options.data = Object.assign(defaultData, data);
  }

  /**
   * 自定义header头
   * 作用：
   * 1. id 用来进行日志全链路跟踪
   */
  options.headers = { ...options.headers, id: guid() };

  // 取消请求拦截器
  abortControllerRequestInterceptors(options);

  // 记录前端日志
  trackReqAction(options);

  return options;
});

// 定义响应拦截器 -->token值无效时,清空token,并强制跳转登录页
api.interceptors.response.use(
  (response) => {
    // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”
    const { config } = response;
    const { isError = true } = config;

    if (response.data?.success) {
      // 请求成功
    } else {
      // 请求失败
      const { message: errorMessage } = response.data;

      if (isError && errorMessage) {
        if (typeof errorMessage === 'string') {
          message.error(errorMessage);
        } else if (Array.isArray(errorMessage)) {
          // 正常情况下取出第一个错误信息报错就好
          message.error(errorMessage?.[0]);
        }
      }
    }

    // 响应日志记录
    trackResAction(response);

    // 仅返回 body 响应体，其余内容在请求拦截器中处理掉
    return response.data;
  },
  (error) => {
    // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
    const errorMsg =
      {
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限（令牌、用户名、密码错误）。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        405: '请求方法不被允许。',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
      }[error.status] || '';

    // 通用错误报错提示
    if (errorMsg) {
      message.error(errorMsg);
    }

    // 错误日志记录
    trackResAction(error);
    return Promise.reject(error);
  },
);

export default api;

/**
 * @description axios get请求
 * @param {String} [url = ''] - 请求地址
 * @param {Object} [params = {}] - 请求参数
 * @param {Object} [configs = {}] - 请求配置
 * @return {Promise} request promise对象
 */
export const get = (url = '', params = {}, configs = {}) => {
  const { cache = false } = configs;
  if (cache) {
    params._r = Math.random();
  }
  return api.get(url, params, configs);
};

/**
 * @description axios post请求
 * @param {String} [url = ''] - 请求地址
 * @param {Object} [data = {}] - 请求参数
 * @param {Object} [configs = {}] - 请求配置
 * @return {Promise} request promise对象
 */
export const post = (url = '', data = {}, configs = {}) => {
  return api.post(url, data, configs);
};
