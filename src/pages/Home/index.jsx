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
import api from './api';

function Demo(props) {
  // #region props ----------------
  // eslint-disable-next-line no-unused-vars
  const { key } = props;
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
  const isLogin = !!session.user;
  const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  // #endregion const -----------

  // #region state -----------
  // 是否允许编辑
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  // #endregion state -----------

  // #region memo -----------

  // #endregion memo -----------

  // #region function -----------

  // 获取用户信息
  const getUser = async () => {
    const { data } = await api.get();
    const userInfo = {
      ...(data.data || {}),
      id: data._id,
    };
    setUserInfo(userInfo);
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

  // 监听提交用户信息
  const submitUserInfo = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const values = await form.validateFields();
      // 根据是否存在用户id来判断是新增还是编辑用户
      const isEdit = !!userInfo.id;
      const request = isEdit ? api.update : api.create;
      const { data, message: msg } = await request(values);
      const newUserInfo = {
        ...(data.data || {}),
        id: data._id,
      };
      setUserInfo(newUserInfo);
      form.setFieldsValue(newUserInfo);
      message.success(msg);
      setIsEdit(false);
    } catch (error) {
      // catch 会导致日志自动补货失效
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
        <Form form={form} {...formItemLayout} colon size="large" disabled={!isEdit}>
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

        <Form.Item>
          <Row justify="center" className="profile-btns">
            {isEdit ? (
              <>
                <Button onClick={cancelEditUserInfo}>取消</Button>
                <Button type="primary" htmlType="submit" loading={loading} onClick={submitUserInfo}>
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

export default Demo;
