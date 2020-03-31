/*
 * 修改用户信息
 * @Author Crish<714415473@qq.com>
 * @Date 2020-03-07 11:32:34
 */
import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd';
import styles from './edit.css';

const formLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

@Form.create()
class UserEditModal extends Component {
  render () {
    const { title, visible, confirmLoading, handleOk, handleCancel, form, userInfo } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        title={title}
        okText="确定"
        cancelText="取消"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...formLayout}
          name="userEdit"
        >
          <Form.Item label="用户名">
            {getFieldDecorator('realname', {
              initialValue: userInfo.realname,
              rules: [{ required: true, message: '请输入用户名!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('mobile', {
              initialValue: userInfo.mobile,
              rules: [
                {
                  pattern: /^1[345789]\d{9}$/,
                  message: '手机号格式不正确!',
                },
                {
                  required: true,
                  message: '请输入手机号!'
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(<Input.Password />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default UserEditModal