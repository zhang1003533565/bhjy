package com.library.service.impl;

import com.library.model.LoginRequest;
import com.library.model.LoginResponse;
import com.library.model.User;
import com.library.repository.UserRepository;
import com.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public LoginResponse login(LoginRequest request) {
        // 尝试通过用户名查找用户
        Optional<User> userByUsername = userRepository.findByUsername(request.getAccount());
        // 如果用户名未找到，尝试通过学号查找
        Optional<User> user = userByUsername.isPresent() ? 
            userByUsername : userRepository.findByStudentId(request.getAccount());

        if (user.isEmpty()) {
            return LoginResponse.builder()
                    .message("用户不存在")
                    .build();
        }

        // 直接比较密码
        if (!user.get().getPassword().equals(request.getPassword())) {
            return LoginResponse.builder()
                    .message("密码错误")
                    .build();
        }

        // TODO: 这里需要生成JWT token
        String token = "JWT_TOKEN"; // 实际项目中需要替换为真实的JWT token生成逻辑

        return LoginResponse.builder()
                .token(token)
                .user(user.get())
                .message("登录成功")
                .build();
    }
} 