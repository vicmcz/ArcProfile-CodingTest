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
 * @description: 判断对象是否为 ArrayBuffer 对象
 */
export const isArrayBuffer = (obj) => {
  return obj && obj instanceof ArrayBuffer;
};
