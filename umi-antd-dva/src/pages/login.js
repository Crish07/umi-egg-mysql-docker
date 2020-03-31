/*
 * 登陆页
 * @Author Crish<714415473@qq.com>
 * @Date 2020-02-28 18:27:07
 */

import React, { Component } from 'react';
import { Card, Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'dva';
import styles from './login.css';
import UserEditModal from './_user/edit'

@Form.create()
@connect()
export default class LoginPage extends Component {
  constructor(props) {
    super(props)

    const userInfo = {
      realname: '',
      mobile: ''
    }
    this.state = {
      visible: false,
      confirmLoading: false,
      userInfo
    }
  }

  /**
   * 登陆
   */
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        this.props.dispatch({ type: "user/login", payload: values });
      }
    });
  };

  /**
   * 用户注册
   */
  createUser = () => {
    this.setState({
      visible: true
    });
  }

  /**
   * 模态框--确定
   */
  handleOk = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if(err) return;
      this.setState({
        confirmLoading: true,
      });
      this.props.dispatch({
        type: "user/create", payload: values, callback: (res) => {
          if(res.code == '0') {
            form.resetFields(); // 清空信息
            this.setState({
              visible: false,
              confirmLoading: false,
              userInfo: {}
            });
            message.success(res.data);
          }
        }
      })
    });
  };

  /**
   * 关闭模态框
   */
  handleCancel = () => {
    this.setState({
      visible: false,
      confirmLoading: false,
      userInfo: {}
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render () {
    const { visible, confirmLoading, userInfo } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.login} >
        {/* 登录表单 */}
        <Card className={styles.loginBox}>
          <Form onSubmit={this.onSubmit} className={styles.loginForm}>
            <Form.Item>
              {getFieldDecorator('mobile', {
                rules: [{ required: true, message: '请输入手机号!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="17358659107"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="123456"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>登陆</Button>
              <Button onClick={this.createUser} block>立即注册</Button>
            </Form.Item>
          </Form>
        </Card>

        {/* 修改个人信息模态框 */}
        <UserEditModal
          wrappedComponentRef={this.saveFormRef}
          title="注册用户"
          visible={visible}
          confirmLoading={confirmLoading}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          userInfo={userInfo} />
      </div>
    );
  }
}
