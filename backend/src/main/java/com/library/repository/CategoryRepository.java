package com.library.repository;

import com.library.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 图书分类数据访问层
 * 提供对分类表(categories)的CRUD操作
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    /**
     * 根据分类名称查找分类
     * @param name 分类名称
     * @return 分类信息
     */
    Optional<Category> findByName(String name);
    
    /**
     * 检查分类名称是否已存在
     * @param name 分类名称
     * @return 存在返回true，不存在返回false
     */
    boolean existsByName(String name);
} 