/*
 * @Descripttion: 用户鉴权
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-03 16:58:39
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-08 15:01:54
 */

'use strict'
const Service = require('egg').Service
class UserAccessService extends Service {
  async login (payload) {
    const { ctx, service } = this
    const user = await service.user.findByMobile(payload.mobile)
    if(user.length == 0) {
      ctx.throw(404, 'user not found')
    }
    let verifyPsw = await ctx.compare(payload.password, user[0].password)
    if(!verifyPsw) {
      ctx.throw(404, 'user password is error')
    }

    // 生成Token令牌
    return {
      token: await service.actionToken.apply(user[0].id),
      realname: user[0].realname,
      mobile: user[0].mobile,
      userId: user[0].id,
    }
  }

  async logout () {
    // 清除token

  }

  async current () {
    const { ctx, service } = this
    // ctx.state.user 可以提取到JWT编码的data
    const _id = ctx.state.user.data._id
    const user = await service.user.find(_id)
    if(!user) {
      ctx.throw(404, 'user is not found')
    }
    user.password = 'How old are you?'
    return user
  }
}

module.exports = UserAccessService