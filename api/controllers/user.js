const logger = require('../libs/logger');
const { asyncDb } = require('../models/user');

/**
 * @description 根据 key, value 获取用户记录
 * @param {String} did
 */
const findUserByValue = async (key, value) => {
  const data = await asyncDb.findOne({
    [key]: value,
  });
  return data;
};

/**
 * @description 根据用户DID获取用户记录
 * @param {String} did
 */
const findUserByDID = async (did) => {
  return await findUserByValue('user.did', did);
};

/**
 * @description 根据账户获取用户记录
 * @param {String} account
 */
const findUserByAccount = async (account) => {
  return await findUserByValue('data.account', account);
};

/**
 * @description 获取用户
 */
const getUser = async (req, res, next) => {
  try {
    const { user } = req;
    const data = await findUserByDID(user.did);
    if (!data) {
      return res.json({ success: false, message: '用户不存在' });
    } else {
      return res.json({
        success: true,
        message: '获取用户信息成功',
        data,
      });
    }
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

/**
 * @description 创建用户
 */
const createUser = async (req, res, next) => {
  try {
    const { user, body } = req;
    // 判断该DID用户是否注册过
    const data = await findUserByDID(user.did);
    if (data) {
      // 已注册，返回错误信息
      return res.json({
        success: false,
        message: '用户已存在',
        data,
      });
    } else {
      // 未注册，则创建新用户
      const data = await findUserByAccount(body.account);
      if (data) {
        // 存在相同账号
        return res.json({
          success: false,
          message: '该账号已注册，请更换账号名',
          data,
        });
      } else {
        // 不存在相同账号
        const data = await asyncDb.insert({
          user,
          data: body,
        });
        return res.json({
          success: true,
          message: '用户创建成功',
          data,
        });
      }
    }
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

/**
 * @description 更新用户信息
 */
const updateUser = async (req, res, next) => {
  try {
    const { user, body } = req;
    const data = await findUserByDID(user.did);
    if (!data) {
      // 未注册
      return res.json({
        success: false,
        message: '用户尚未注册，请先注册用户',
      });
    } else {
      // 已注册
      const data = await findUserByAccount(body.account);
      if (data && data.user.did !== user.did) {
        // 存在相同账号，且did用户不同，不允许重复账号名
        return res.json({
          success: false,
          message: '账号名不允许重复，请更换账号名',
          data,
        });
      } else {
        // 不存在相同账号
        // 用户存在，调用db方法更新用户信息
        const [code] = await asyncDb.update(
          {
            'user.did': user.did,
          },
          {
            $set: {
              data: body,
            },
          },
        );
        if (code === 1) {
          // 更新用户信息成功
          const doc = await findUserByDID(user.did);
          // 返回更新后的用户信息
          return res.json({
            success: true,
            message: '用户信息更新成功',
            data: doc,
          });
        } else {
          // 更新用户信息失败
          return res.json({
            success: false,
            message: '用户信息更新失败',
          });
        }
      }
    }
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

module.exports = { getUser, createUser, updateUser };
