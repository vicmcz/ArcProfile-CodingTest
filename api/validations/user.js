const { checkSchema, validationResult } = require('express-validator');

/**
 * @description 请求权限校验
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns
 */
// 定义一个名为 auth 的中间件函数，用于验证用户是否登录
const auth = (req, res, next) => {
  // 从请求对象中获取 cookies 对象
  const { cookies } = req;
  // 从 cookies 对象中获取 login_token 值
  const { login_token } = cookies;

  // 如果不存在 login_token，则表示用户未登录，返回 401 状态码和错误信息
  if (!login_token) {
    return res.status(401).json({ code: 'forbidden', error: 'not allowed' });
  }
  // 用户已经登录，调用 next() 函数继续执行后续中间件或路由处理函数
  return next();
};

// 用户schem校验规则
const userSchema = {
  // 基础校验规则， 可以将里面的具体schema提取出来复用，因为目前仅有一个校验规则，因此先放里面
  base: checkSchema({
    account: {
      isString: {
        errorMessage: '账号必须为字符串',
      },
      exists: {
        errorMessage: '账号为必填项',
      },
      isLength: {
        errorMessage: '账号必须大于1个字符，小于26个字符',
        options: {
          min: 1,
          max: 26,
        },
      },
    },
    email: {
      isEmail: { errorMessage: '请提供合法的邮箱地址' },
    },
    phone: {
      isString: {
        errorMessage: '手机号必须为字符串',
      },
      exists: {
        errorMessage: '手机号为必填项',
      },
      isLength: {
        errorMessage: '请提供合法的手机号',
        options: {
          min: 11,
          max: 11,
        },
      },
    },
  }),
};

/**
 * @description user用户校验器
 * 作用：
 * 1. 请求入参拦截
 * 2. 请求响应拦截，自定义响应行为
 */
const userValidator = async (req, res, next) => {
  const result = await validationResult(req);
  if (!result.isEmpty()) {
    // 这里返回200，而不是4XX，客户端通过 succes 来判断请求是否正常执行，有更好的用户错误提示
    return res.status(200).json({
      success: false,
      message: result.array().map((err) => err.msg),
    });
  } else {
    return next();
  }
};

/**
 * @description 用户基础信息验证器，用于请求入参校验拦截
 */
const userBaseValidation = () => [userSchema.base, userValidator];

module.exports = {
  auth,
  userBaseValidation,
};
