/*
 * 全局布局
 * @Author Crish<714415473@qq.com>
 * @Date 2020-02-28 11:14:23
 */

import React, { Component } from 'react'
import Router from "umi/router";
import { connect } from 'dva'
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Button, message } from 'antd';
import UserEditModal from '../pages/_user/edit'
import styles from './index.less'

const { Header, Content, Footer } = Layout;

@connect()
class Layouts extends Component {
  constructor(props) {
    super(props)

    const selfMenu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="edit">修改个人信息</Menu.Item>
        <Menu.Item key="logout">退出系统</Menu.Item>
      </Menu>
    );

    this.state = {
      selfMenu,
      visible: false,
      confirmLoading: false,
    }
  }

  /**
   * 个人中心点击事件
   * @param {*} key  
   */
  onClick = ({ key }) => {
    if(key == 'edit') {
      this.showModal()
    } else {
      this.props.dispatch({ type: 'user/logout' })
    }
  }

  /**
   * 显示模态框
   */
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  /**
   * 模态框--确定
   */
  handleOk = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if(err) {
        return;
      }
      this.setState({
        confirmLoading: true,
      });
      let params = {
        id: JSON.parse(localStorage.getItem('userInfo')).userId,
        values
      }
      this.props.dispatch({
        type: "user/update", payload: params, callback: (res) => {
          if(res.code == '0') {
            form.resetFields(); // 清空信息
            this.setState({
              visible: false,
              confirmLoading: false,
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
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render () {
    const location = this.props.location;
    if(location.pathname == '/login') {
      return <>{this.props.children}</>
    }

    if(!localStorage.getItem('token')) { // 权限验证
      Router.push('/login')
      return null
    }

    const { selfMenu, visible, confirmLoading } = this.state;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let username = userInfo.realname.substring(0, 1)
    return (
      <>
        <Layout className={styles.layout}>
          <Header className={styles.headerBox}>
            <div className={styles.logo} />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['systemHome']}
              style={{ lineHeight: '64px', flex: 1 }}
            >
              <Menu.Item key="systemHome">用户管理</Menu.Item>
            </Menu>
            <div>
              <Dropdown overlay={selfMenu} placement="bottomRight">
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}>{username}</Avatar>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.siteContent}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>UMI_DVA ©2020 Created By Crish</Footer>
        </Layout>

        {/* 修改个人信息模态框 */}
        <UserEditModal
          wrappedComponentRef={this.saveFormRef}
          title="修改个人信息"
          visible={visible}
          confirmLoading={confirmLoading}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          userInfo={userInfo} />
      </>
    )
  }
}

export default Layouts