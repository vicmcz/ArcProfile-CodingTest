const router = require('express').Router();
const middleware = require('@blocklet/sdk/lib/middlewares');
const { createUser, updateUser, getUser } = require('../controllers/user');
const { userBaseValidation, auth } = require('../validations/user');

/**
 * @description 获取DID钱包用户
 */
router.use('/getDidUser', middleware.user(), (req, res) => res.json(req.user || {}));

/**
 * @description 获取用户
 */
router.get('/get', [auth], getUser);

/**
 * @description 创建用户
 */
router.post('/create', [auth, userBaseValidation()], createUser);

/**
 * @description 更新用户信息
 */
router.post('/update', [auth, userBaseValidation()], updateUser);

module.exports = router;
