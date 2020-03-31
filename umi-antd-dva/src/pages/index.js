/*
 * 用户管理首页
 * @Author Crish<714415473@qq.com>
 * @Date 2020-02-28 18:26:49
 * 
 * 
 * 
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Icon, Button, Table, Tag, message, Modal } from 'antd';
import UserEditModal from './_user/edit'
import styles from './index.css';

const { confirm } = Modal;

@Form.create()
@connect(
  state => {
    return {
      data: state.user.tableData
    }
  }
)
class SystemHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchKey: {}, // 查询条件
      visible: false,
      confirmLoading: false,
      userInfo: {}
    }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'user/list', payload: this.state.searchKey })
  }

  /**
   * 查询
   */
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err) return;
      this.setState({
        searchKey: values
      })
      this.props.dispatch({ type: 'user/list', payload: values })
    });
  }

  /**
   * @name: 编辑用户
   * @param {object} row
   */
  rowEdit = (row) => {
    this.setState({
      visible: true, // 显示模态框
      userInfo: row
    })
  }

  /**
   * @name: 删除用户
   * @param {object} row
   */
  rowDelete = (row) => {
    let that = this;
    confirm({
      title: '确定要删除该用户?',
      // content: 'Some descriptions',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk () {
        that.props.dispatch({
          type: 'user/destroy', payload: row.id, callback: (res) => {
            if(res.code == '0') {
              message.success(res.data);
              that.props.dispatch({ type: 'user/list', payload: that.state.searchKey })
            }
          }
        })
      },
      onCancel () {
        // console.log('Cancel');
      },
    });
  }

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
        id: this.state.userInfo.id,
        values
      }
      this.props.dispatch({
        type: "user/update", payload: params, callback: (res) => {
          if(res.code == '0') {
            form.resetFields(); // 清空信息
            this.setState({
              visible: false,
              confirmLoading: false,
              userInfo: {}
            });
            message.success(res.data);
            this.props.dispatch({ type: 'user/list', payload: this.state.searchKey })
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
    const { form, data } = this.props;
    const { getFieldDecorator } = form;
    const columns = [
      {
        title: '用户名',
        dataIndex: 'realname',
        render: value => <a>{value}</a>,
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
      },
      {
        title: '权限',
        dataIndex: 'tags',
        render: (value, row) => {
          let color = row.mobile == '17358659107' ? 'volcano' : 'green'
          let tag = row.mobile == '17358659107' ? 'admin' : 'user'
          return (
            <span>
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            </span >
          )
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (value, row) => (
          <span>
            <Button type="primary" size="small" style={{ marginRight: '6px' }} onClick={() => this.rowEdit(row)}>编辑</Button>
            <Button type="danger" size="small" onClick={() => this.rowDelete(row)}>删除</Button>
          </span>
        ),
      },
    ];

    return (
      <>
        <Form layout="inline" onSubmit={this.handleSearch}>
          <Form.Item>
            {getFieldDecorator('searchKey', {
              /* rules: [
                {
                  required: true,
                  message: '请输入查询内容!',
                },
              ], */
            })(<Input
              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
        </Form>

        <Table columns={columns} dataSource={data} />

        {/* 修改个人信息模态框 */}
        <UserEditModal
          wrappedComponentRef={this.saveFormRef}
          title="修改用户信息"
          visible={visible}
          confirmLoading={confirmLoading}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          userInfo={userInfo} />
      </>
    );
  }
}

export default SystemHome
