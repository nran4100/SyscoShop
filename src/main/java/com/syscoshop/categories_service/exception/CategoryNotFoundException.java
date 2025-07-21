// exception/CategoryNotFoundException.java
package com.syscoshop.categories_service.exception;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(String message) {
        super(message);
    }
}
