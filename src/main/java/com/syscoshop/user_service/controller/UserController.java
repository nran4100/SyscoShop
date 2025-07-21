package com.syscoshop.user_service.controller;

import com.syscoshop.user_service.dto.*;
import com.syscoshop.user_service.service.UserServiceInterface;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceInterface service;

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest request) {
        return new ResponseEntity<>(service.saveUser(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<UserResponse>> getAllUsers(Pageable pageable) {
        return ResponseEntity.ok(service.getAllUsers(pageable));
    }

    @GetMapping("/{UserID}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long UserID) {
        return ResponseEntity.ok(service.getUserById(UserID));
    }

    @DeleteMapping("/{userID}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userID) {
        service.deleteUser(userID);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{userID}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long userID,
            @Valid @RequestBody UpdateUserRequest updateRequest) {
        return ResponseEntity.ok(service.updateUser(userID, updateRequest));
    }

}
