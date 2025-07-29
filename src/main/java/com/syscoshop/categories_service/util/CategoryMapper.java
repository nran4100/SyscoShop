// mapper/CategoryMapper.java
package com.syscoshop.categories_service.util;

import com.syscoshop.categories_service.dto.*;
import com.syscoshop.categories_service.model.Category;

public class CategoryMapper {
    public static Category toEntity(CategoryRequest request) {
        return Category.builder()
                .name(request.getName())
                .imageUrl(request.getImageUrl())  // Add this line
                .build();
    }

    public static CategoryResponse toResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .imageUrl(category.getImageUrl())  // Add this line
                .build();
    }

    public static void updateCategoryFromDto(Category category, UpdateCategoryRequest request) {
        if (request.getName() != null) {
            category.setName(request.getName());
        }
        if (request.getImageUrl() != null) {
            category.setImageUrl(request.getImageUrl());  // Add this line
        }
    }
}

