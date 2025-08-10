package com.syscoshop.categories_service.service;

import com.syscoshop.categories_service.dto.*;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest request);
    List<CategoryResponse> getAllCategories();
    CategoryResponse updateCategory(Long id, UpdateCategoryRequest request);
    void deleteCategory(Long id);

}
