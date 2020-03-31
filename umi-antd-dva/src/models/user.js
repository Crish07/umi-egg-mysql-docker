/*
 * @Descripttion: 验证用户
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-01 10:00:57
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-09 11:55:16
 */

import axios from 'axios';
import router from 'umi/router';
import { notification } from 'antd';

const token = localStorage.getItem('token') || ''
const userinfo = JSON.parse(localStorage.getItem('userinfo')) || {
  realname: '',
  mobile: '',
  userId: ''
}

// api
function create (payload) {
  return axios.post('/app/createUser', payload);
}
function login (payload) {
  return axios.post("/app/auth/jwt/login", payload);
}
function list (payload) {
  return axios.post('/app/api/user/list', payload)
}
function update (payload) {
  return axios.put("/app/api/user/" + payload.id, payload.values)
}
function destroy (payload) {
  return axios.delete('/app/api/user/' + payload)
}
function logout () {
  return axios.post('/app/auth/jwt/logout')
}

export default {
  namespaced: 'user',
  state: {// 初始状态
    token,
    userinfo,
    tableData: []
  },
  reducers: { // 更新state
    init (state, action) {
      return {
        ...state,
        token: action.payload.token,
        userinfo: {
          realname: action.payload.realname,
          mobile: action.payload.mobile,
          userId: action.payload.userId,
        }
      };
    },
    tableList (state, action) {
      return {
        ...state,
        tableData: action.payload
      }
    }
  },
  effects: { // 异步操作
    // action: user/create
    *create ({ payload, callback }, { call }) {
      try {
        const { data } = yield call(create, payload)
        if(callback && typeof callback === 'function') {
          callback(data) // 返回结果
        }
      } catch(error) {

      }
    },
    *login ({ payload }, { call, put }) {
      try {
        const {
          data: { code, data: res, error }
        } = yield call(login, payload);
        if(code == 0) {
          // 登陆成功: 缓存用户信息
          localStorage.setItem("token", res.token);
          localStorage.setItem("userInfo", JSON.stringify({
            realname: res.realname,
            mobile: res.mobile,
            userId: res.userId
          }))
          yield put({ type: "init", payload: res });
          router.push("/");
        } else {
          notification.error({
            message: `请求错误 ${code}`,
            description: error
          })
        }
      } catch(error) {
        //console.log(error)
      }
    },
    *list ({ payload }, { call, put }) {
      try {
        const { data: { code, data: res, msg } } = yield call(list, payload)
        if(code == '0') {
          yield put({ type: 'tableList', payload: res.list })
        } else {
          notification.error({
            message: `请求错误 ${code}`,
            description: error
          })
        }
      } catch(error) {

      }
    },
    *update ({ payload, callback }, { call }) {
      try {
        const { data } = yield call(update, payload)
        if(data.code == '0') {
          if(callback && typeof callback === 'function') {
            callback(data) // 返回结果
          }
        }
      } catch(error) {

      }
    },
    *destroy ({ payload, callback }, { call }) {
      try {
        const { data } = yield call(destroy, payload)
        if(data.code == '0') {
          if(callback && typeof callback === 'function') {
            callback(data) // 返回结果
          }
        }
      } catch(error) {

      }
    },
    *logout ({ }, { call }) {
      try {
        const {
          data: { code, error }
        } = yield call(logout);
        if(code == '0') {
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          router.push("/login");
        }
      } catch(error) {

      }
    }
  }
}