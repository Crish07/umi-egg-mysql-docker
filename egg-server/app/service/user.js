/*
 * @Descripttion: 用户管理
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-03 14:21:11
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-09 09:30:29
 */

const Service = require('egg').Service

class UserService extends Service {
  /**
   * 创建用户
   * 
   * @param {*} payload
   */
  async create (payload) {
    const { ctx } = this
    payload.password = await ctx.genHash(payload.password)  // 哈希处理
    const result = await this.app.mysql.insert("user", payload)
    return result
  }

  /**
   * 获取用户列表
   */
  async list () {
    const result = await this.app.mysql.select("user")
    // 整理数据源
    let data = result.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i;
      jsonObject.id = e.id;
      jsonObject.realname = e.realname;
      jsonObject.mobile = e.mobile;
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { list: data }
  }

  /**
   * 查找用户
   * @param {*} id 
   */
  async find (id) {
    const { ctx } = this
    const user = await this.app.mysql.get("user", { id: id })
    return user
  }

  /**
   * 通过手机号查找用户
   * @param {*} mobile 
   */
  async findByMobile (mobile) {
    const { ctx } = this
    const user = await this.app.mysql.select("user", {
      where: { mobile: mobile }
    })
    return user
  }

  /**
   * 修改用户
   * @param {*} _id
   * @param {*} payload 
   */
  async update (_id, payload) {
    const { ctx, service } = this
    const user = ctx.service.user.find(_id)
    if(user.length == 0) {
      ctx.throw(404, 'user not found')
    }
    payload.id = _id
    payload.password = await ctx.genHash(payload.password)  // 哈希处理
    return await this.app.mysql.update('user', payload)
  }

  /**
   * 模糊查询
   * @param {*} key
   */
  async findByLike (key) {
    const { ctx } = this
    const result = await this.app.mysql.query("SELECT * FROM user WHERE realname LIKE ? OR mobile LIKE ?", key)
    // 整理数据源
    let data = result.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i;
      jsonObject.id = e.id;
      jsonObject.realname = e.realname;
      jsonObject.mobile = e.mobile;
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { list: data }
  }

  /**
   * 删除用户
   * @param {*} _id 
   */
  async destoy (_id) {
    const { ctx, service } = this
    const user = ctx.service.user.find(_id)
    if(user.length == 0) {
      ctx.throw(404, 'user not found')
    }
    return await this.app.mysql.delete("user", { id: _id })
  }
}

module.exports = UserService