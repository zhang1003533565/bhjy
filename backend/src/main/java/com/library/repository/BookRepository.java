package com.library.repository;

import com.library.model.Book;
import com.library.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 图书数据访问层
 * 提供对图书表(books)的CRUD操作和查询功能
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    /**
     * 根据ISBN查找图书
     * @param isbn 国际标准书号
     * @return 图书信息
     */
    Optional<Book> findByIsbn(String isbn);
    
    /**
     * 根据分类查找图书列表
     * @param category 图书分类
     * @return 属于该分类的所有图书
     */
    List<Book> findByCategory(Category category);
    
    /**
     * 根据标题模糊查询并分页
     * @param title 图书标题（部分匹配）
     * @param pageable 分页信息
     * @return 分页后的图书列表
     */
    Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    
    /**
     * 根据作者模糊查询并分页
     * @param author 作者名（部分匹配）
     * @param pageable 分页信息
     * @return 分页后的图书列表
     */
    Page<Book> findByAuthorContainingIgnoreCase(String author, Pageable pageable);
    
    /**
     * 全文搜索图书（标题、作者、出版社、ISBN）
     * @param query 搜索关键词
     * @param pageable 分页信息
     * @return 匹配的图书分页列表
     */
    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.publisher) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.isbn) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Book> search(String query, Pageable pageable);
    
    /**
     * 检查ISBN是否已存在
     * @param isbn 国际标准书号
     * @return 存在返回true，不存在返回false
     */
    boolean existsByIsbn(String isbn);
} 