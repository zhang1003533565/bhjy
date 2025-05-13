package com.library.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 借阅记录实体类
 * 对应数据库中的borrows表，记录图书的借阅信息
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "borrows")
public class Borrow {

    /**
     * 借阅记录ID，主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 借阅用户
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 借阅的图书
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    /**
     * 借阅日期
     */
    @Column(name = "borrow_date")
    private LocalDateTime borrowDate = LocalDateTime.now();

    /**
     * 应归还日期
     */
    @NotNull(message = "归还日期不能为空")
    @Column(name = "due_date", nullable = false)
    private LocalDateTime dueDate;

    /**
     * 实际归还日期，为null表示尚未归还
     */
    @Column(name = "return_date")
    private LocalDateTime returnDate;

    /**
     * 借阅状态：已借出、已归还、逾期、丢失
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BorrowStatus status = BorrowStatus.BORROWED;

    /**
     * 罚款金额，针对逾期或丢失情况
     */
    @Column(precision = 10, scale = 2)
    private BigDecimal fine = BigDecimal.ZERO;

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
     * 借阅状态枚举
     */
    public enum BorrowStatus {
        BORROWED,  // 已借出
        RETURNED,  // 已归还
        OVERDUE,   // 逾期未还
        LOST       // 图书丢失
    }
} 