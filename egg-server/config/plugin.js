/*
 * @Descripttion: 
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-01 16:54:28
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-05 09:46:54
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  swaggerdoc: { // 接口文档
    enable: true,
    package: 'egg-swagger-doc-feat',
  },
  validate: { // 接口校验
    enable: true,
    package: 'egg-validate',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  bcrypt: { // 哈希依赖
    enable: true,
    package: 'egg-bcrypt'
  },
  jwt: { // 鉴权模块
    enable: true,
    package: 'egg-jwt',
  }
};
