# Docker Compose 一键启动指南

## 前置条件

- 已安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- 确保本地 3306 和 8080 端口未被占用

## 一键启动

在项目根目录执行：

```bash
docker compose up -d
```

该命令会自动完成：
1. 拉取 MySQL 8.0 镜像
2. 用 `sql/create_table.sql` 初始化数据库和表结构
3. 用项目 Dockerfile 构建后端镜像（首次较慢，约 2-5 分钟）
4. 等待 MySQL 健康检查通过后再启动后端

## 验证启动成功

```bash
# 查看容器状态（两个容器都应为 Up）
docker compose ps

# 测试接口是否正常响应
curl http://localhost:8080/api/user/current
```

## 常用命令

```bash
# 查看实时日志
docker compose logs -f

# 只看后端日志
docker compose logs -f backend

# 停止并移除容器（数据库数据保留在 volume 中）
docker compose down

# 停止并删除所有数据（包括数据库数据）
docker compose down -v

# 重新构建后端镜像（修改代码后）
docker compose up -d --build backend
```

## 配置说明

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| MySQL Root 密码 | `123456` | 可在 `docker-compose.yml` 中修改 `MYSQL_ROOT_PASSWORD` |
| 数据库名 | `yupi` | 对应 `MYSQL_DATABASE` |
| 后端端口 | `8080` | 接口前缀为 `/api` |
| MySQL 端口 | `3306` | 宿主机映射端口 |

## 注意事项

- 数据库数据持久化在 Docker Volume `mysql_data` 中，`docker compose down` 不会丢失数据
- 后端容器使用环境变量覆盖 `application.yml` 中的数据库配置，无需修改配置文件
- 首次启动 MySQL 初始化需要约 10-20 秒，后端会等待 MySQL 健康检查通过后再启动
