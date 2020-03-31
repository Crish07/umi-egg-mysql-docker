/*
 * @Descripttion: 权限路由
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-03-09 16:08:04
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-09 16:20:52
 */

import router from "umi/router";

export default (props) => {
  const token = localStorage.getItem('token');
  if(!token) {
    router.push('/login');
    return null
  }
  return <>{props.children}</>
}
