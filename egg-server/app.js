/*
 * @Descripttion: 全局定义--生命周期
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-03 14:57:24
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-03 17:20:15
 */

class AppBootHook {
  constructor(app) {
    this.app = app;
    app.root_path = __dirname;
  }

  configWillLoad () {
    // 配置文件即将加载
  }

  configDidLoad () {
    // 配置文件加载完成
  }

  async didiLoad () {
    // 文件加载完成
  }

  async willReady () {
    // 插件启动完毕
  }

  async didReady () {
    // worker准备就绪
  }

  async serverDidReady () {
    // 应用启动完成
  }

  async beforeClose () {
    // 应用即将关闭
  }
}

module.exports = AppBootHook