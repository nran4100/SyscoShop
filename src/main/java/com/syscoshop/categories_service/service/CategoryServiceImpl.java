package com.syscoshop.categories_service.service;

import com.syscoshop.categories_service.dto.*;
import com.syscoshop.categories_service.exception.CategoryNotFoundException;
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
    @Override
    public CategoryResponse updateCategory(Long id, UpdateCategoryRequest request) {
        Category category = repository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        CategoryMapper.updateCategoryFromDto(category, request);
        Category updated = repository.save(category);
        return CategoryMapper.toResponse(updated);
    }

    @Override
    public void deleteCategory(Long id) {
        if (!repository.existsById(id)) {
            throw new CategoryNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
