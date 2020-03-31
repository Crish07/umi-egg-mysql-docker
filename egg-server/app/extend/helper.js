/*
 * @Descripttion: 响应模板
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-02 17:44:48
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-03 17:19:10
 */

const moment = require('moment')

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }
  ctx.status = 200
}