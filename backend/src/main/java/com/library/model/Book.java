package com.library.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * 图书实体类
 * 对应数据库中的books表，存储图书信息
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books")
public class Book {

    /**
     * 图书ID，主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 图书标题
     */
    @NotBlank(message = "书名不能为空")
    @Column(nullable = false)
    private String title;

    /**
     * 图书作者
     */
    @NotBlank(message = "作者不能为空")
    @Column(nullable = false)
    private String author;

    /**
     * 出版社
     */
    private String publisher;

    /**
     * 国际标准书号(ISBN)，唯一标识
     */
    @NotBlank(message = "ISBN不能为空")
    @Size(max = 20, message = "ISBN长度不能超过20个字符")
    @Column(unique = true, nullable = false, length = 20)
    private String isbn;

    /**
     * 出版年份
     */
    @Column(name = "publication_year")
    private Integer publicationYear;

    /**
     * 图书所属分类
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    /**
     * 图书总数量
     */
    @Min(value = 0, message = "总数量不能小于0")
    @Column(name = "total_copies", nullable = false)
    private Integer totalCopies = 0;

    /**
     * 当前可用数量
     */
    @Min(value = 0, message = "可用数量不能小于0")
    @Column(name = "available_copies", nullable = false)
    private Integer availableCopies = 0;

    /**
     * 图书馆内位置（书架编号等）
     */
    private String location;

    /**
     * 图书详细描述
     */
    @Column(columnDefinition = "TEXT")
    private String description;

    /**
     * 图书封面图片路径
     */
    @Column(name = "cover_image")
    private String coverImage;

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
} 