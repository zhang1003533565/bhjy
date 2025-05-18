package com.library.service;

import com.library.model.LoginRequest;
import com.library.model.LoginResponse;

public interface UserService {
    LoginResponse login(LoginRequest request);
} 