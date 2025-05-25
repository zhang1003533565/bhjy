package com.library.service.impl;

import com.library.model.LoginRequest;
import com.library.model.LoginResponse;
import com.library.model.User;
import com.library.repository.UserRepository;
import com.library.service.UserService;
import com.library.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public LoginResponse login(LoginRequest request) {
        // 根据学号查找用户
        User user = userRepository.findByStudentId(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        // 验证密码
        if (!user.getPassword().equals(request.getPassword())) {
            return LoginResponse.builder()
                    .message("密码错误")
                    .build();
        }

        // 生成 token
        String token = jwtUtil.generateToken(user.getStudentId());

        // 返回登录成功响应
        return LoginResponse.builder()
                .token(token)
                .studentId(user.getStudentId())
                .name(user.getRealName())
                .role(user.getRole().getRoleName())
                .message("登录成功")
                .build();
    }
} 