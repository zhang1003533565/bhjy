package com.library.repository;

import com.library.model.Book;
import com.library.model.Borrow;
import com.library.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 借阅记录数据访问层
 * 提供对借阅表(borrows)的CRUD操作和查询功能
 */
@Repository
public interface BorrowRepository extends JpaRepository<Borrow, Long> {
    /**
     * 查询用户的所有借阅记录
     * @param user 用户对象
     * @return 借阅记录列表
     */
    List<Borrow> findByUser(User user);
    
    /**
     * 分页查询用户的借阅记录
     * @param user 用户对象
     * @param pageable 分页信息
     * @return 分页后的借阅记录
     */
    Page<Borrow> findByUser(User user, Pageable pageable);
    
    /**
     * 查询图书的所有借阅记录
     * @param book 图书对象
     * @return 借阅记录列表
     */
    List<Borrow> findByBook(Book book);
    
    /**
     * 根据借阅状态查询记录
     * @param status 借阅状态（已借出、已归还、逾期、丢失）
     * @return 符合状态的借阅记录列表
     */
    List<Borrow> findByStatus(Borrow.BorrowStatus status);
    
    /**
     * 查询所有逾期未还的借阅记录
     * @param now 当前时间
     * @return 逾期未还的借阅记录列表
     */
    @Query("SELECT b FROM Borrow b WHERE b.status = 'BORROWED' AND b.dueDate < :now")
    List<Borrow> findOverdueBooks(LocalDateTime now);
    
    /**
     * 统计用户当前借阅的图书数量
     * @param user 用户对象
     * @return 当前借阅数量
     */
    @Query("SELECT COUNT(b) FROM Borrow b WHERE b.user = :user AND b.status = 'BORROWED'")
    long countBorrowedBooksByUser(User user);
} 