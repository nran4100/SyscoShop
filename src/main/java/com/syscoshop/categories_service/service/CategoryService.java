// service/CategoryService.java
package com.syscoshop.categories_service.service;

import com.syscoshop.categories_service.dto.*;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest request);
    List<CategoryResponse> getAllCategories();
}
