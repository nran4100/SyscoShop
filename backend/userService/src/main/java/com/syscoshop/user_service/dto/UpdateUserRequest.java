package com.syscoshop.user_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserRequest {

    @Size(min = 2, max = 100)
    private String name;

    @Email
    private String email;

    private String role;
}
