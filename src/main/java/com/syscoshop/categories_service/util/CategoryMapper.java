// mapper/CategoryMapper.java
package com.syscoshop.categories_service.util;

import com.syscoshop.categories_service.dto.*;
import com.syscoshop.categories_service.model.Category;

public class CategoryMapper {
    public static Category toEntity(CategoryRequest request) {
        return Category.builder()
                .name(request.getName())
                .build();
    }

    public static CategoryResponse toResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}
