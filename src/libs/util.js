/**
 * @description: guid 生成器
 * @return {String} - guid 全局唯一标识符
 */
export const guid = () => {
  const hexChars = '0123456789abcdef';
  let guid = '';
  for (let i = 0; i < 32; i++) {
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      guid += '-';
    }
    guid += hexChars[Math.floor(Math.random() * 16)];
  }
  return guid;
};

/**
 * @description 防抖
 * @param {Function} fn - 回调函数
 * @param {Number} wait - 延迟时间
 * @param {Boolean} immediate - 是否立即执行
 */
// eslint-disable-next-line default-param-last
export function debounce(fn, wait = 50, immediate) {
  let timer = null;
  // eslint-disable-next-line func-names
  return function (...args) {
    // this保存给context
    const context = this;
    if (timer) clearTimeout(timer); // immediate 为 true 表示第一次触发后执行
    // timer 为空表示首次触发
    if (immediate && !timer) {
      fn.apply(context, args);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
