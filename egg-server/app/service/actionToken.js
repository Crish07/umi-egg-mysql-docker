/*
 * @Descripttion: 创建token
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-03 16:49:49
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-03 17:24:39
 */

'use strict'
const Service = require('egg').Service

class ActionTokenService extends Service {
  async apply (_id) {
    const { ctx } = this
    return ctx.app.jwt.sign({
      data: {
        _id: _id
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
    }, ctx.app.config.jwt.secret)
  }
}

module.exports = ActionTokenService