/*
 * @Descripttion: swagger-doc 默认请求、返回例子
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-01 17:35:05
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-03 17:52:02
 */


module.exports = {
  baseRequest: {
    id: { type: 'string', description: 'id 唯一键', required: true, example: '1' }
  },
  baseResponse: {
    code: { type: 'integer', required: true, example: 0 },
    data: { type: 'string', example: '请求成功' },
    message: { type: 'string', example: '请求成功' }
  }
}