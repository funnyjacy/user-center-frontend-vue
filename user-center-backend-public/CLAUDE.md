# CLAUDE.md

This file provides guidance to Claude (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Spring Boot 2.6.4 + MyBatis-Plus 的用户中心后端项目，提供用户注册、登录、管理等基础功能。Java 版本为 1.8。

## 常用命令

```bash
# 启动开发服务器
mvn spring-boot:run

# 打包构建
mvn clean package -DskipTests

# 运行所有测试
mvn test

# 运行单个测试类
mvn test -Dtest=UserServiceTest

# 运行单个测试方法
mvn test -Dtest=UserServiceTest#testUserRegister
```

## 架构说明

### 分层结构
- **controller** (`UserController`): 接收 HTTP 请求，做基础参数校验，调用 service
- **service / service/impl**: 核心业务逻辑（注册校验、密码加密、用户脱敏、登录态管理）
- **mapper**: MyBatis-Plus Mapper 接口，继承 `BaseMapper<User>`，对应 `resources/mapper/*.xml`
- **model/domain**: 实体类 `User`（Lombok + MyBatis-Plus 注解），`model/domain/request` 存放请求 DTO
- **common**: 统一响应体 `BaseResponse<T>`、错误码枚举 `ErrorCode`、工具类 `ResultUtils`
- **exception**: 自定义业务异常 `BusinessException` + 全局异常处理器 `GlobalExceptionHandler`
- **contant**: 常量定义，如 `USER_LOGIN_STATE`（session key）、`ADMIN_ROLE`

### 关键设计决策
- **密码加密**: MD5 + 固定盐值 `"yupi"`（`DigestUtils.md5DigestAsHex`）
- **登录态**: 基于 HttpSession，key 为 `USER_LOGIN_STATE`，session 超时 86400 秒
- **用户脱敏**: `getSafetyUser()` 方法过滤敏感字段（密码等），所有对外接口只返回脱敏用户
- **逻辑删除**: MyBatis-Plus 全局配置，`isDelete` 字段，1 表示删除，0 表示未删除
- **驼峰映射**: `map-underscore-to-camel-case: false`（关闭自动下划线转驼峰）
- **管理员鉴权**: `isAdmin()` 私有方法从 session 读取用户角色，`userRole == 1` 为管理员

### API 路径
所有接口统一前缀 `/api/user`（server context-path = `/api`）：
- `POST /api/user/register` - 用户注册
- `POST /api/user/login` - 用户登录
- `POST /api/user/logout` - 用户注销
- `GET  /api/user/current` - 获取当前登录用户
- `GET  /api/user/search` - 搜索用户（管理员）
- `POST /api/user/delete` - 删除用户（管理员）

## 配置说明

- 开发环境配置: `application.yml`（数据库默认 `localhost:3306/yupi`，账号 root/123456）
- 生产环境配置: `application-prod.yml`（通过 `spring.profiles.active=prod` 激活）
- 数据库初始化 SQL: `sql/create_table.sql`

## Docker 部署

项目根目录有 `Dockerfile`，可直接构建镜像部署。
