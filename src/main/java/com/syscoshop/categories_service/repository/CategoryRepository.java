// repository/CategoryRepository.java
package com.syscoshop.categories_service.repository;

import com.syscoshop.categories_service.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
