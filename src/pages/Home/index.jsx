import React, { useState, useEffect } from 'react';
import './index.less';
import Header from '@blocklet/ui-react/lib/Header';
import Footer from '@blocklet/ui-react/lib/Footer';
import DidAvatar from '@arcblock/did-connect/lib/Avatar';
import { Layout, Form, Input, Button, Alert, Row, message, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { trackError } from '@/libs/sp';
import { FORM_RULE } from '@/libs/validation';
import { useSessionContext } from '@/libs/session';
import { debounce } from '@/libs/util';
import api from './api';

/**
 * 编码说明：
 * 1. css 模块化 —— 内容较少，采用BEM规范
 * 2. JS 模块化 —— 内容较少，无需hooks业务逻辑封装
 */
function Home(props) {
  // #region props ----------------
  // eslint-disable-next-line  no-empty-pattern
  const {} = props;
  // #endregion props ----------------

  // #region redux -----------

  // #endregion redux -----------

  // #region context  -----------
  const { session } = useSessionContext();
  // #endregion context  -----------

  // #region ref  -----------
  const [form] = Form.useForm();
  // #endregion ref  -----------

  // #region const -----------
  // 是否DID用户登录
  const isLogin = !!session.user;
  // formItem layout数据
  const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 24 } };
  // #endregion const -----------

  // #region state -----------
  // 是否允许编辑
  const [isEdit, setIsEdit] = useState(false);
  // 提交用户信息loading
  const [loading, setLoading] = useState(false);
  // 当前DID用户对应的用户信息
  const [userInfo, setUserInfo] = useState({});
  // #endregion state -----------

  // #region memo -----------

  // #endregion memo -----------

  // #region function -----------

  // 获取用户信息
  // 获取用户信息的异步函数
  const getUser = async () => {
    // 等待 API 获取数据
    const { data } = await api.get();
    // 从数据对象中提取必要信息，构建用户信息对象 userInfo
    const userInfo = {
      // 解构 data 对象中的所有属性
      ...(data.data || {}),
      // 添加或覆盖 id 属性，其值为 data 对象中的 _id 属性
      id: data._id,
    };
    // 更新组件状态，设置用户信息
    setUserInfo(userInfo);
    // 设置表单字段的值，用于自动填充表单
    form.setFieldsValue(userInfo);
  };

  // 编辑用户信息
  const eidtUserInfo = () => {
    setIsEdit(true);
  };

  // 取消编辑用户信息
  const cancelEditUserInfo = () => {
    setIsEdit(false);
    form.setFieldsValue(userInfo);
  };

  // 提交用户信息
  const submitUserInfo = async () => {
    try {
      // loading 请求拦截
      if (loading) return;
      setLoading(true);
      // 表单校验
      const values = await form.validateFields();
      // 根据是否存在用户id来判断是新增还是编辑用户
      const isEdit = !!userInfo.id;
      const request = isEdit ? api.update : api.create;
      const { data, message: msg } = await request(values);
      // 写入新用户信息
      const newUserInfo = {
        ...(data.data || {}),
        id: data._id,
      };
      setUserInfo(newUserInfo);
      form.setFieldsValue(newUserInfo);
      message.success(msg);
      setIsEdit(false);
    } catch (error) {
      // catch 会导致自动异常捕获失效
      trackError(error);
    } finally {
      setLoading(false);
    }
  };

  // #endregion function -----------

  // #region effect -----------
  useEffect(() => {
    if (isLogin) {
      // 登录成功，获取最新用户信息
      getUser();
    } else {
      // 退出登录，恢复默认值
      form.resetFields();
    }
    // getUser 与 form 不依赖其他项，因此不作为依赖项传入
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  // #endregion effect -----------

  return (
    <Layout id="Profile" className="profile">
      {/* ------------ Header ------------ */}
      <Layout.Header className="profile-header">
        <Header />
      </Layout.Header>
      {/* ------------ Header ------------ */}

      <div className="profile-alert">
        {!isLogin && <Alert type="info" message="请先登录DID钱包用户"></Alert>}
      </div>

      {/* ------------ Content ------------ */}
      <Layout.Content className="profile-content">
        <Form
          form={form}
          {...formItemLayout}
          colon
          size="large"
          layout="vertical"
          disabled={!isEdit}
        >
          {/* 表单内容 */}
          <div className="profile-avatar flex-center">
            {isLogin ? (
              <DidAvatar did={session?.user?.did} />
            ) : (
              <Avatar size={64} icon={<UserOutlined />} />
            )}
          </div>
          <Form.Item label="用户名" name="account" rules={[FORM_RULE.required]}>
            <Input minLength={1} maxLength={26} />
          </Form.Item>
          <Form.Item label="手机号" name="phone" rules={[FORM_RULE.required, FORM_RULE.phone]}>
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[FORM_RULE.required, FORM_RULE.email]}>
            <Input />
          </Form.Item>
        </Form>

        {/* 表单按钮 */}
        <Form.Item>
          <Row justify="center" className="profile-btns">
            {isEdit ? (
              <>
                <Button onClick={cancelEditUserInfo}>取消</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  onClick={debounce(submitUserInfo, 100)}
                >
                  保存
                </Button>
              </>
            ) : (
              <Button type="primary" onClick={eidtUserInfo} disabled={!isLogin}>
                修改个人信息
              </Button>
            )}
          </Row>
        </Form.Item>
      </Layout.Content>
      {/* ------------ Content ------------ */}

      {/* ------------ Footer ------------ */}
      <Layout.Footer className="profile-footer">
        <Footer />
      </Layout.Footer>
      {/* ------------ Footer ------------ */}
    </Layout>
  );
}

export default Home;
