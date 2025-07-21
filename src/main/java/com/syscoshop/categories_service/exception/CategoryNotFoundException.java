package com.syscoshop.categories_service.exception;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(Long message) {
        super(String.valueOf(message));
    }
}
