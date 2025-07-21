package com.syscoshop.user_service.util;

import com.syscoshop.user_service.dto.*;
import com.syscoshop.user_service.model.User;

public class UserMapper {
    public static User mapToUser(UserRequest dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setRole(dto.getRole());
        return user;
    }

    public static UserResponse mapToUserResponse(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}
