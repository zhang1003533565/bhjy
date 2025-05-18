package com.library.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * 用户实体类
 */
@Data
@Entity
@Table(name = "users")
public class User {
    /**
     * 用户ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT COMMENT '用户ID'")
    private Long id;

    /**
     * 用户名
     */
    @Column(nullable = false, columnDefinition = "VARCHAR(50) COMMENT '用户名'")
    private String username;

    /**
     * 密码
     */
    @Column(nullable = false, columnDefinition = "VARCHAR(255) COMMENT '密码'")
    private String password;

    /**
     * 用户真实姓名
     */
    @Column(nullable = false, columnDefinition = "VARCHAR(50) COMMENT '真实姓名'")
    private String realName;

    /**
     * 学号
     */
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(20) COMMENT '学号'")
    private String studentId;

    /**
     * 学院
     */
    @Column(nullable = false, columnDefinition = "VARCHAR(100) COMMENT '学院'")
    private String college;

    /**
     * 专业
     */
    @Column(nullable = false, columnDefinition = "VARCHAR(100) COMMENT '专业'")
    private String major;

    /**
     * 班级
     */
    @Column(nullable = false, columnDefinition = "VARCHAR(50) COMMENT '班级'")
    private String className;

    /**
     * 手机号
     */
    @Column(nullable = false, columnDefinition = "VARCHAR(20) COMMENT '手机号'")
    private String phone;

    /**
     * 年龄
     */
    @Column(nullable = false, columnDefinition = "INT COMMENT '年龄'")
    private Integer age;

    /**
     * 邮箱
     */
    @Column(nullable = false, columnDefinition = "VARCHAR(100) COMMENT '邮箱'")
    private String email;

    /**
     * 身份证号
     */
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(18) COMMENT '身份证号'")
    private String idCard;

    /**
     * 头像URL
     */
    @Column(columnDefinition = "VARCHAR(500) COMMENT '头像URL'")
    private String avatar;

    /**
     * 出生年月
     */
    @Column(nullable = false, columnDefinition = "DATE COMMENT '出生日期'")
    private LocalDate birthDate;

    /**
     * 借书数量
     */
    @Column(nullable = false, columnDefinition = "INT DEFAULT 0 COMMENT '借书数量'")
    private Integer borrowedBooks = 0;

    /**
     * 阅览室积分
     */
    @Column(nullable = false, columnDefinition = "INT DEFAULT 0 COMMENT '阅览室积分'")
    private Integer readingRoomPoints = 0;

    /**
     * 座位积分
     */
    @Column(nullable = false, columnDefinition = "INT DEFAULT 0 COMMENT '座位积分'")
    private Integer seatPoints = 0;

    /**
     * 账号是否激活
     */
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE COMMENT '是否激活'")
    private Boolean isActive = true;

    /**
     * 创建时间
     */
    @Column(nullable = false, columnDefinition = "DATE DEFAULT (CURRENT_DATE()) COMMENT '创建时间'")
    private LocalDate createTime = LocalDate.now();

    /**
     * 用户角色
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false, columnDefinition = "BIGINT COMMENT '角色ID'")
    private Role role;

    // 可以根据需要添加更多字段
} 