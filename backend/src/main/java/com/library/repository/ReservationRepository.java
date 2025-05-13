package com.library.repository;

import com.library.model.Book;
import com.library.model.Reservation;
import com.library.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 图书预约数据访问层
 * 提供对预约表(reservations)的CRUD操作和查询功能
 */
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    /**
     * 查询用户的所有预约记录
     * @param user 用户对象
     * @return 预约记录列表
     */
    List<Reservation> findByUser(User user);
    
    /**
     * 分页查询用户的预约记录
     * @param user 用户对象
     * @param pageable 分页信息
     * @return 分页后的预约记录
     */
    Page<Reservation> findByUser(User user, Pageable pageable);
    
    /**
     * 查询图书的所有预约记录
     * @param book 图书对象
     * @return 预约记录列表
     */
    List<Reservation> findByBook(Book book);
    
    /**
     * 根据预约状态查询记录
     * @param status 预约状态（等待处理、已完成、已取消）
     * @return 符合状态的预约记录列表
     */
    List<Reservation> findByStatus(Reservation.ReservationStatus status);
    
    /**
     * 统计图书待处理的预约数量
     * @param book 图书对象
     * @return 待处理预约数量
     */
    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.book = :book AND r.status = 'PENDING'")
    long countPendingReservationsByBook(Book book);
    
    /**
     * 查询图书的待处理预约，按预约时间排序
     * @param book 图书对象
     * @return 按预约时间排序的待处理预约列表
     */
    @Query("SELECT r FROM Reservation r WHERE r.book = :book AND r.status = 'PENDING' ORDER BY r.reservationDate ASC")
    List<Reservation> findPendingReservationsByBookOrderByDate(Book book);
} 