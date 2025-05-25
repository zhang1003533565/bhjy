package com.library.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    @Value("${jwt.secret:your-default-secret-key}")
    private String secret;

    @Value("${jwt.expiration:86400000}") // 24小时，以毫秒为单位
    private Long expiration;

    public String getSecret() {
        return secret;
    }

    public Long getExpiration() {
        return expiration;
    }
} 