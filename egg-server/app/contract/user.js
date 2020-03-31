/*
 * @Descripttion: swagger-doc 创建用户 参数模板
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-01 17:39:02
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-03 17:37:25
 */

module.exports = {
  createUserRequest: {
    mobile: { type: 'string', required: true, description: '手机号', example: '17358659107', format: /^1[345789]\d{9}$/, },
    password: { type: 'string', required: true, description: '密码', example: '123456' },
    realname: { type: 'string', required: true, description: '姓名', example: 'Crish' }
  },
}