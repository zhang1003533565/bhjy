package com.library.model;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class LoginResponse {
    private String token;
    private String studentId;
    private String name;
    private String role;
    private String message;
} 