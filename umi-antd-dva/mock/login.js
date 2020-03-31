/*
 * @Descripttion: 模拟登陆数据
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-01 15:29:54
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-05 09:51:55
 */
export default {
  "post /api/login" (req, res, next) {
    const { username, password } = req.body;
    if(username == "crish" && password == "123") {
      return res.send({
        code: 0,
        data: {
          username: "crish"
        }
      })
    }
    if(username == "admin" && password == "123") {
      return res.json({
        code: 0,
        data: {
          username: "admin"
        }
      })
    }
    return res.status(401).json({
      code: -1,
      msg: "密码错误"
    })
  }
}