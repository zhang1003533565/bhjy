package com.library.model;

import lombok.Data;

@Data
public class LoginRequest {
    private String account;  // 用户名或学号
    private String password;
} 