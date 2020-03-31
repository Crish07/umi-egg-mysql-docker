/*
 * @Descripttion: 用户鉴权
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-03 17:32:32
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-03 17:43:22
 */

module.exports = {
  loginRequest: {
    mobile: { type: 'string', required: true, description: '手机号', example: '17358659107', format: /^1[345789]\d{9}$/ },
    password: { type: 'string', required: true, description: '密码', example: '123456' }
  }
}