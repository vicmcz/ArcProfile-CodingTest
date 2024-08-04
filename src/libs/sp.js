/* eslint-disable no-console */
/**
 * @description 错误日志记录、监控方法
 * @param {Error} err
 */
// eslint-disable-next-line import/prefer-default-export
export const trackError = (err) => {
  // 模拟错误日志、监控报警的方法
  console.error(err);
};

/**
 * @description 日志请求记录
 */
export const trackReqAction = (data) => {
  const name = '--------模拟请求日志记录--------';
  console.group(name);
  console.log(data);
  console.groupEnd(name);
};

/**
 * @description 日志响应记录
 */
export const trackResAction = (data) => {
  // 模拟日志记录，这里再次区分成功 、 失败的响应进行不同的记录、报警功能
  const name = '--------模拟响应日志记录--------';
  console.group(name);
  console.log(data);
  console.groupEnd(name);
};
