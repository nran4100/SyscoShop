package com.syscoshop.user_service.service;

import com.syscoshop.user_service.dto.*;
import org.springframework.data.domain.*;

public interface UserServiceInterface {
    UserResponse saveUser(UserRequest request);
    Page<UserResponse> getAllUsers(Pageable pageable);
    UserResponse getUserById(Long id);
}
