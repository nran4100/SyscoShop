package com.syscoshop.categories_service.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCategoryRequest {
    private String name;
    private String imageUrl;  // Add this line
}

