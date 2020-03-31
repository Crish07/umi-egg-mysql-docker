/*
 * @Descripttion: 拦截异常状态响应
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-01 15:47:38
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-08 11:52:38
 */
import axios from 'axios';
import { notification } from 'antd';

const codeMessage = {
  202: "一个请求已经进入后台排队（异步任务）。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  500: "服务器发生错误，请检查服务器。"
};

axios.interceptors.response.use(null, ({ response }) => {
  if(codeMessage[response.status]) {
    notification.error({
      message: `请求错误 ${response.status}: ${response.config.url}`,
      description: codeMessage[response.status]
    })
  }
  return Promise.reject(err);
})

axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if(token) {
      // 判断是否存在token,如果存在的话, 则每个http header 都加上token
      // Bearer是JWT都认证头部信息
      config.headers.common["Authorization"] = "Bearer " + token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)