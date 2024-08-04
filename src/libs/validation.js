export const VALIDATE_REG = {
  // 手机号码校验
  mobilePhone: /^(0(10|2\d|[3-9]\d\d)[- ]{0,3}\d{7,8}|0?1[3584]\d{9})$/,
  // 座机 福建0596-3888888 北京010-68803177
  tel: /^0\d{2,3}-\d{7,8}$/,
  // 正整数
  positiveInteger: /^[1-9]\d*$/,
  // 邮箱
  email: /^([a-z0-9A-Z]+[-|.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/,
  zipCode: /^[1-9]\d{5}$/,
  // 不含中文
  notContainChinese: /^[^\u4e00-\u9fa5]*$/,
  // 不含特殊字符
  notSpecialChar: /^[^\\/:*?"<>|.]*$/,
  // 两位小数(含0)
  positiveDecimal2: /^(0|([1-9]\d*))(\.\d{1,2})?$/,
  // ip 地址
  ipAddress:
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  // 正整数和0
  positiveInteger0: /^[0-9]\d*$/,
  // 整数和最多两位小数
  positive2Number: /(^([1-9]\d*)(\.\d{1,2})?$)|(^0\.[1-9]\d?$)|(^0\.0[1-9]$)/,
  // 正数任意小数
  positive: /^[+]{0,1}[1-9]\d*$|^[+]{0,1}(0\.\d*[1-9])$|^[+]{0,1}([1-9]\d*\.\d*[0-9])$/,
  // 替换中文字符串
  // eslint-disable-next-line no-control-regex
  replaceCN: /[^\x00-\xff]/g,
  // 非0正整数替换
  replaceNonnegativeIntegerNo0: /^(0+)|[^\d]+/g,
  // 非负整数替换
  replaceNonnegativeInteger: /[^\d]/g,
  // 非数字+小数点
  replaceNotNumber: /[^\d.]/gi,
  // 非负数
  nonnegative: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
  // 整数16位，小数位不超过6位
  positive16_6Number: /(^([1-9]\d{0,14})(\.\d{1,6})?$)|(^0\.\d{1,6}?$)/,
  // 不超过10位数的 正整数
  positive10: /^[1-9][0-9]{0,9}$/,
  // 数字和英文
  inputCommon: /^[a-zA-Z0-9]+$/,
};

export const FORM_RULE = {
  required: {
    required: true,
    message: '请输入${label}',
    trigger: ['blur'],
  },
  phone: {
    pattern: VALIDATE_REG.mobilePhone,
    message: '请输入正确的手机号码格式！',
    trigger: ['blur'],
  },
  email: {
    type: 'email',
    message: '请输入合法的邮箱',
    trigger: ['blur'],
  },
};
