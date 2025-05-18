package com.library.service;

import com.library.model.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;

@Service
public class DataInitializationService implements CommandLineRunner {

    private final EntityManager entityManager;

    public DataInitializationService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // 检查是否已经存在角色
        Long roleCount = entityManager.createQuery("SELECT COUNT(r) FROM Role r", Long.class)
                .getSingleResult();
                
        if (roleCount == 0) {
            // 创建超级管理员角色
            Role superAdmin = Role.builder()
                    .roleName("SUPER_ADMIN")
                    .description("超级管理员 - 拥有系统所有权限")
                    .canManageBooks(true)
                    .canManageUsers(true)
                    .canManageRoles(true)
                    .canBorrowBooks(true)
                    .canReserveSeats(true)
                    .maxBorrowDays(60)
                    .maxBorrowBooks(20)
                    .build();
            entityManager.persist(superAdmin);

            // 创建图书管理员角色
            Role librarian = Role.builder()
                    .roleName("LIBRARIAN")
                    .description("图书管理员 - 负责图书管理和借阅服务")
                    .canManageBooks(true)
                    .canManageUsers(false)
                    .canManageRoles(false)
                    .canBorrowBooks(true)
                    .canReserveSeats(true)
                    .maxBorrowDays(60)
                    .maxBorrowBooks(15)
                    .build();
            entityManager.persist(librarian);

            // 创建教师角色
            Role teacher = Role.builder()
                    .roleName("TEACHER")
                    .description("教师 - 拥有较高的借阅权限")
                    .canManageBooks(false)
                    .canManageUsers(false)
                    .canManageRoles(false)
                    .canBorrowBooks(true)
                    .canReserveSeats(true)
                    .maxBorrowDays(45)
                    .maxBorrowBooks(10)
                    .build();
            entityManager.persist(teacher);

            // 创建学生角色
            Role student = Role.builder()
                    .roleName("STUDENT")
                    .description("学生 - 基本的借阅和座位预约权限")
                    .canManageBooks(false)
                    .canManageUsers(false)
                    .canManageRoles(false)
                    .canBorrowBooks(true)
                    .canReserveSeats(true)
                    .maxBorrowDays(30)
                    .maxBorrowBooks(5)
                    .build();
            entityManager.persist(student);
        }
    }
} 