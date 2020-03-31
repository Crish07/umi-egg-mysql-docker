<!--
 * @Descripttion: docker 里面启动 mysql
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-02-27 20:30:55
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-03-31 10:26:25
 -->

# docker 里面启动 mysql

## 初始化启动

```bash
docker run --name cmysql -v /umi-egg-mysql-docker/mysql/db:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```

## 初始化完成后 停止/再次启动

```bash
docker stop 容器 id
docker start 容器 id
```

## 查询容器 id

```bash
docker ps -a // 全部的容器
docker ps // 正在运行的容器
```
