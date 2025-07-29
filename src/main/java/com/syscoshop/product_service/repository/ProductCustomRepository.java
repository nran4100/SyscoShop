// repository/ProductCustomRepository.java
package com.syscoshop.product_service.repository;

import com.syscoshop.product_service.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductCustomRepository {
    Page<Product> findProductsByAllOptionalFilters(
            String status,
            String supplierID,
            Long categoryId,
            String name,
            Double minPrice,
            Double maxPrice,
            Integer minStock,
            Integer maxStock,
            Pageable pageable
    );
}
