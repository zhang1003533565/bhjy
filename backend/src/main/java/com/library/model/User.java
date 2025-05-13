package com.library.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * 用户实体类
 * 对应数据库中的users表，存储系统用户信息
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    /**
     * 用户ID，主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 用户名，唯一，用于登录
     */
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 50, message = "用户名长度必须在3到50个字符之间")
    @Column(unique = true, nullable = false, length = 50)
    private String username;

    /**
     * 密码，加密存储
     */
    @NotBlank(message = "密码不能为空")
    @Column(nullable = false)
    private String password;

    /**
     * 用户真实姓名
     */
    @NotBlank(message = "姓名不能为空")
    @Column(nullable = false)
    private String name;

    /**
     * 电子邮箱，唯一
     */
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    @Column(unique = true, nullable = false)
    private String email;

    /**
     * 电话号码
     */
    @Column(length = 20)
    private String phone;

    /**
     * 用户角色：管理员、图书管理员或读者
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.READER;

    /**
     * 创建时间
     */
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * 用户角色枚举：管理员、图书管理员、读者
     */
    public enum UserRole {
        ADMIN,      // 系统管理员
        LIBRARIAN,  // 图书管理员
        READER      // 普通读者
    }
} 