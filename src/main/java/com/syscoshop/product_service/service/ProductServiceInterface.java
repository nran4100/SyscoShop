package com.syscoshop.product_service.service;

import com.syscoshop.product_service.dto.ProductRequest;
import com.syscoshop.product_service.dto.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductServiceInterface {
    void saveProduct(ProductRequest dto);
    Page<ProductResponse> getAllProducts(
            Pageable pageable,
            String status,
            String supplierID,
            Long categoryId,
            String name,
            Double minPrice,
            Double maxPrice,
            Integer minStock,
            Integer maxStock
    );

    ProductResponse getProductById(String id);
    void deleteProductById(String id);
    ProductResponse updateProduct(String id, ProductRequest request);


}
