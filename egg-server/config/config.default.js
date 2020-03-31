/*
 * @Descripttion: 
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-01 16:54:28
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-05 11:37:26
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583052825854_6140';

  // add your middleware config here
  config.middleware = [];

  // 接口文档插件
  config.swaggerdoc = {
    dirScanner: './app/controller',
    appInfo: {
      title: 'crish接口',
      description: 'crish接口 swagger-ui for egg',
      version: '1.0.0'
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false,
    routerMap: true,
    enable: true,
  }

  // 异常处理中间件
  config.middleware = ['errorHandler']

  // mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '0.0.0.0',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'umiEggTest',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  // 用户鉴权模块
  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: /^\/api/, // optional
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
