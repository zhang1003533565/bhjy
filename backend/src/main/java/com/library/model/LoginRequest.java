package com.library.model;

import lombok.Data;

@Data
public class LoginRequest {
    private String studentId;  // 改为学号
    private String password;
} 