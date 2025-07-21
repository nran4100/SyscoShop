// service/CategoryServiceImpl.java
package com.syscoshop.categories_service.service;

import com.syscoshop.categories_service.dto.*;
import com.syscoshop.categories_service.util.CategoryMapper;
import com.syscoshop.categories_service.repository.CategoryRepository;
import com.syscoshop.categories_service.model.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        Category category = CategoryMapper.toEntity(request);
        return CategoryMapper.toResponse(repository.save(category));
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        return repository.findAll()
                .stream()
                .map(CategoryMapper::toResponse)
                .collect(Collectors.toList());
    }
}
