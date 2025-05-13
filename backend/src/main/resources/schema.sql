-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID，主键',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名，用于登录，唯一',
    password VARCHAR(100) NOT NULL COMMENT '密码，加密存储',
    name VARCHAR(100) NOT NULL COMMENT '用户真实姓名',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT '电子邮箱，唯一',
    phone VARCHAR(20) COMMENT '电话号码',
    role ENUM('ADMIN', 'LIBRARIAN', 'READER') NOT NULL DEFAULT 'READER' COMMENT '用户角色：管理员、图书管理员或读者',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT='用户表 - 存储系统用户信息';

-- 创建图书分类表
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '分类ID，主键',
    name VARCHAR(100) NOT NULL UNIQUE COMMENT '分类名称，唯一',
    description TEXT COMMENT '分类描述',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT='图书分类表 - 存储图书分类信息';

-- 创建图书表
CREATE TABLE IF NOT EXISTS books (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '图书ID，主键',
    title VARCHAR(255) NOT NULL COMMENT '图书标题',
    author VARCHAR(255) NOT NULL COMMENT '图书作者',
    publisher VARCHAR(255) COMMENT '出版社',
    isbn VARCHAR(20) NOT NULL UNIQUE COMMENT '国际标准书号(ISBN)，唯一标识',
    publication_year INT COMMENT '出版年份',
    category_id BIGINT COMMENT '图书所属分类ID',
    total_copies INT NOT NULL DEFAULT 0 COMMENT '图书总数量',
    available_copies INT NOT NULL DEFAULT 0 COMMENT '当前可用数量',
    location VARCHAR(100) COMMENT '图书馆内位置（书架编号等）',
    description TEXT COMMENT '图书详细描述',
    cover_image VARCHAR(255) COMMENT '图书封面图片路径',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (category_id) REFERENCES categories(id)
) COMMENT='图书表 - 存储图书信息';

-- 创建借阅记录表
CREATE TABLE IF NOT EXISTS borrows (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '借阅记录ID，主键',
    user_id BIGINT NOT NULL COMMENT '借阅用户ID',
    book_id BIGINT NOT NULL COMMENT '借阅的图书ID',
    borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '借阅日期',
    due_date TIMESTAMP NOT NULL COMMENT '应归还日期',
    return_date TIMESTAMP COMMENT '实际归还日期，为null表示尚未归还',
    status ENUM('BORROWED', 'RETURNED', 'OVERDUE', 'LOST') NOT NULL DEFAULT 'BORROWED' COMMENT '借阅状态：已借出、已归还、逾期、丢失',
    fine DECIMAL(10, 2) DEFAULT 0.00 COMMENT '罚款金额，针对逾期或丢失情况',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
) COMMENT='借阅记录表 - 记录图书的借阅信息';

-- 创建预约表
CREATE TABLE IF NOT EXISTS reservations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '预约记录ID，主键',
    user_id BIGINT NOT NULL COMMENT '预约用户ID',
    book_id BIGINT NOT NULL COMMENT '预约的图书ID',
    reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '预约日期',
    status ENUM('PENDING', 'FULFILLED', 'CANCELLED') NOT NULL DEFAULT 'PENDING' COMMENT '预约状态：等待处理、已完成、已取消',
    notification_sent BOOLEAN DEFAULT FALSE COMMENT '通知是否已发送，当图书可借时通知用户',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
) COMMENT='预约表 - 记录图书预约信息';

-- 创建默认管理员用户（如果不存在）
INSERT INTO users (username, password, name, email, role)
VALUES ('admin', '$2a$10$QP4fGH5kQqV5XEy9W7WH8ufvZm1aS6TJZmMk/u88o6OxR0Pj8gJV2', '系统管理员', 'admin@library.com', 'ADMIN')
ON DUPLICATE KEY UPDATE username=username;

-- 创建默认图书分类（如果不存在）
INSERT INTO categories (name, description)
VALUES 
('小说', '各类文学小说作品'),
('科技', '科学技术相关书籍'),
('历史', '历史类书籍'),
('教育', '教育学习相关书籍'),
('艺术', '艺术相关书籍')
ON DUPLICATE KEY UPDATE name=name; 