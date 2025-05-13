# 图书馆管理系统

一个基于Java 21 + Spring Boot + Vue 3 + MySQL 8.0 + Docker的现代图书馆管理系统。

## 技术栈

- **后端**：Java 21, Spring Boot 3.1.0, Spring Data JPA
- **前端**：Vue 3, Element Plus
- **数据库**：MySQL 8.0
- **容器化**：Docker, Docker Compose

## 系统架构

```
library-management-system/
├── backend/                  # Spring Boot 后端
│   ├── src/                  # 源代码
│   │   ├── main/
│   │   │   ├── java/com/library/
│   │   │   │   ├── controller/    # 控制器层
│   │   │   │   ├── model/         # 数据模型
│   │   │   │   ├── repository/    # 数据访问层
│   │   │   │   ├── service/       # 业务逻辑层
│   │   │   │   └── config/        # 配置文件
│   │   │   └── resources/         # 资源文件
│   │   │       ├── application.properties
│   │   │       └── schema.sql
│   │   └── test/                  # 测试代码
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                 # Vue 3 前端
│   ├── src/                  # 源代码
│   ├── public/               # 静态资源
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
├── docker-compose.yml       # Docker Compose 配置文件
└── README.md
```

## 功能特性

- 用户管理（注册、登录、权限控制）
- 图书管理（添加、编辑、删除、查询）
- 借阅管理（借书、还书、续借、预约）
- 分类管理
- 搜索功能
- 数据统计与分析

## 快速开始

### 前提条件

- Docker 和 Docker Compose
- Java 21（开发时需要）
- Node.js（开发时需要）
- Maven 3.9+（开发时需要）

### 启动项目

1. 克隆仓库：

```bash
git clone https://github.com/yourusername/library-management-system.git
cd library-management-system
```

2. 使用Docker Compose启动：

```bash
docker-compose up --build -d
```

3. 访问应用：
   - 前端：http://localhost:3000
   - 后端API：http://localhost:8080
   - 数据库：localhost:3306

### 开发模式

#### 后端开发

```bash
cd backend
mvn spring-boot:run
```

#### 前端开发

```bash
cd frontend
npm install
npm run dev
```

## API文档

启动后端服务后，可通过以下地址访问API文档：
- Swagger UI: http://localhost:8080/swagger-ui.html

## 数据库设计

系统使用MySQL 8.0数据库，主要包含以下表：
- 用户表（users）
- 图书表（books）
- 借阅记录表（borrows）
- 分类表（categories）
- 预约表（reservations）

### 数据库配置

- 数据库名称：library_database
- 用户名：root
- 密码：123456

## 部署

### 生产环境配置

1. 修改 `backend/src/main/resources/application-prod.properties` 文件中的配置
2. 修改 `docker-compose.prod.yml` 中的环境变量

### 部署命令

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件 