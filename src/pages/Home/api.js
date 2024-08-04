import { get, post } from '../../libs/api';

export default {
  // 根据DID用户获取app用户信息
  get: (data) => get('/user/get', data),
  // 创建用户请求
  create: (data) => post('/user/create', data),
  // 编辑用户请求
  update: (data) => post('/user/update', data),
};
