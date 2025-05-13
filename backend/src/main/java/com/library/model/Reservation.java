package com.library.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * 图书预约实体类
 * 对应数据库中的reservations表，记录图书预约信息
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reservations")
public class Reservation {

    /**
     * 预约记录ID，主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 预约用户
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 预约的图书
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    /**
     * 预约日期
     */
    @Column(name = "reservation_date")
    private LocalDateTime reservationDate = LocalDateTime.now();

    /**
     * 预约状态：等待处理、已完成、已取消
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationStatus status = ReservationStatus.PENDING;

    /**
     * 通知是否已发送，当图书可借时通知用户
     */
    @Column(name = "notification_sent")
    private Boolean notificationSent = false;

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
     * 预约状态枚举
     */
    public enum ReservationStatus {
        PENDING,    // 等待处理
        FULFILLED,  // 已完成（用户已借阅预约的图书）
        CANCELLED   // 已取消
    }
} 