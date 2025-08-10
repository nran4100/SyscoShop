package com.syscoshop.user_service.service;

import com.syscoshop.user_service.dto.*;
import com.syscoshop.user_service.exception.UserNotFoundException;
import com.syscoshop.user_service.model.User;
import com.syscoshop.user_service.repository.UserRepository;
import com.syscoshop.user_service.util.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserServiceInterface {

    private final UserRepository repository;

    @Override
    public UserResponse saveUser(UserRequest request) {
        var saved = repository.save(UserMapper.mapToUser(request));
        return UserMapper.mapToUserResponse(saved);
    }

    @Override
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return repository.findAll(pageable).map(UserMapper::mapToUserResponse);
    }

    @Override
    public UserResponse getUserById(Long id) {
        return repository.findById(id)
                .map(UserMapper::mapToUserResponse)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public void deleteUser(Long id) {
        if (!repository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        repository.deleteById(id);
    }

    @Override
    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        User user = repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        UserMapper.updateUserFromDto(request, user);

        User updatedUser = repository.save(user);
        return UserMapper.mapToUserResponse(updatedUser);
    }
}
