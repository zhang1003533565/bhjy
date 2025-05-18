package com.library.model;

import lombok.Data;
import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import java.time.LocalDateTime;

/**
 * 角色实体类
 */
@Data
@Entity
@Table(name = "roles")
@SQLDelete(sql = "UPDATE roles SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Role {
    /**
     * 角色ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT COMMENT '角色ID'")
    private Long id;

    /**
     * 角色名称
     */
    @Column(name = "role_name", nullable = false, unique = true, columnDefinition = "VARCHAR(50) COMMENT '角色名称'")
    private String roleName;

    /**
     * 角色描述
     */
    @Column(columnDefinition = "VARCHAR(200) COMMENT '角色描述'")
    private String description;

    /**
     * 图书管理权限
     */
    @Column(name = "can_manage_books", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE COMMENT '图书管理权限'")
    private Boolean canManageBooks = false;

    /**
     * 用户管理权限
     */
    @Column(name = "can_manage_users", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE COMMENT '用户管理权限'")
    private Boolean canManageUsers = false;

    /**
     * 角色管理权限
     */
    @Column(name = "can_manage_roles", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE COMMENT '角色管理权限'")
    private Boolean canManageRoles = false;

    /**
     * 借书权限
     */
    @Column(name = "can_borrow_books", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE COMMENT '借书权限'")
    private Boolean canBorrowBooks = true;

    /**
     * 座位预约权限
     */
    @Column(name = "can_reserve_seats", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE COMMENT '座位预约权限'")
    private Boolean canReserveSeats = true;

    /**
     * 最大借书天数
     */
    @Column(name = "max_borrow_days", nullable = false, columnDefinition = "INT DEFAULT 30 COMMENT '最大借书天数'")
    private Integer maxBorrowDays = 30;

    /**
     * 最大借书数量
     */
    @Column(name = "max_borrow_books", nullable = false, columnDefinition = "INT DEFAULT 5 COMMENT '最大借书数量'")
    private Integer maxBorrowBooks = 5;

    /**
     * 创建时间
     */
    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'")
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'")
    private LocalDateTime updatedAt;

    /**
     * 软删除标记
     */
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE COMMENT '是否删除'")
    private Boolean deleted = false;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // 构建者模式，方便创建角色
    public static RoleBuilder builder() {
        return new RoleBuilder();
    }

    public static class RoleBuilder {
        private final Role role;

        public RoleBuilder() {
            role = new Role();
        }

        public RoleBuilder roleName(String roleName) {
            role.setRoleName(roleName);
            return this;
        }

        public RoleBuilder description(String description) {
            role.setDescription(description);
            return this;
        }

        public RoleBuilder canManageBooks(Boolean canManageBooks) {
            role.setCanManageBooks(canManageBooks);
            return this;
        }

        public RoleBuilder canManageUsers(Boolean canManageUsers) {
            role.setCanManageUsers(canManageUsers);
            return this;
        }

        public RoleBuilder canManageRoles(Boolean canManageRoles) {
            role.setCanManageRoles(canManageRoles);
            return this;
        }

        public RoleBuilder canBorrowBooks(Boolean canBorrowBooks) {
            role.setCanBorrowBooks(canBorrowBooks);
            return this;
        }

        public RoleBuilder canReserveSeats(Boolean canReserveSeats) {
            role.setCanReserveSeats(canReserveSeats);
            return this;
        }

        public RoleBuilder maxBorrowDays(Integer maxBorrowDays) {
            role.setMaxBorrowDays(maxBorrowDays);
            return this;
        }

        public RoleBuilder maxBorrowBooks(Integer maxBorrowBooks) {
            role.setMaxBorrowBooks(maxBorrowBooks);
            return this;
        }

        public Role build() {
            return role;
        }
    }
} 