// controller/CategoryController.java
package com.syscoshop.categories_service.controller;

import com.syscoshop.categories_service.dto.*;
import com.syscoshop.categories_service.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest request) {
        return new ResponseEntity<>(service.createCategory(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(service.getAllCategories());
    }

    @PatchMapping("/{categoryID}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable Long categoryID,
            @RequestBody UpdateCategoryRequest request) {
        CategoryResponse updated = service.updateCategory(categoryID, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{categoryID}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryID) {
        service.deleteCategory(categoryID);
        return ResponseEntity.noContent().build();
    }
}
