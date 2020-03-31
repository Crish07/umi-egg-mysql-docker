/*
 * @Descripttion: 用户鉴权
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-03 17:43:42
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-08 15:23:07
 */

'use strict'

const Controller = require('egg').Controller
/**
 * @Controller 用户鉴权
 */
class UserAccessController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 用户登陆
   * @description 用户登陆
   * @router post /auth/jwt/login
   * @request body loginRequest *body
   * @response 200 baseResponse 创建成功
   */
  async login () {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.loginRequest)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用Service进行业务处理
    const res = await service.userAccess.login(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 用户登出
   * @description 用户登出
   * @router post /auth/jwt/logout
   * @request body loginRequest *body
   * @response 200 baseResponse 退出成功
   */
  async logout () {
    const { ctx, service } = this
    // 调用service进行业务处理
    await service.userAccess.logout()
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx })
  }
}

module.exports = UserAccessController