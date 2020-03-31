/*
 * @Descripttion: 用户管理
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-01 17:28:55
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-09 10:37:39
 */

'use strict';
const Controller = require('egg').Controller
/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router post /createUser
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create () {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用Service进行业务处理
    await service.user.create(payload)
    // 设置响应内容和响应状态码
    let res = "创建成功"
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 查询用户列表
   * @description 查询用户列表
   * @router post /api/user/list
   * @request body baseRequest *body
   * @response 200 baseResponse 请求成功
   */
  async list () {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    let res = ''
    if(Object.keys(payload).length == 0) {
      res = await service.user.list()
    } else {
      if(payload.searchKey == '') {
        res = await service.user.list()
      } else {
        let searchKey = [];
        searchKey.push('%' + payload.searchKey + '%');
        searchKey = searchKey.concat(searchKey);
        res = await service.user.findByLike(searchKey);
      }
    }
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 模糊查询
   * @description 模糊查询
   * @router post /api/user/search
   * @request body baseRequest *body
   * @response 200 baseResponse 查询成功
   */
  async findByLike () {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    let searchKey = [];
    searchKey.push('%' + payload.searchKey + '%');
    searchKey = searchKey.concat(searchKey);
    const res = await service.user.findByLike(searchKey);
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 删除单个用户
   * @description 删除单个用户
   * @router delete /api/user/{id}
   * @request path string *id
   * @response 200 baseResponse 删除成功
   */
  async destroy () {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用service进行业务处理
    await service.user.destoy(id)
    // 设置响应内容和响应状态码
    let res = '删除成功'
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 修改用户
   * @description 获取用户信息
   * @router put /api/user/{id}
   * @request url baseRequest
   * @reponse 200 baseResponse 修改成功
   */
  async update () {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用service进行业务处理
    const result = await service.user.update(id, payload)
    // console.log(result)
    // 设置响应内容和响应状态码
    let res = '修改成功'
    ctx.helper.success({ ctx, res })
  }
}

module.exports = UserController