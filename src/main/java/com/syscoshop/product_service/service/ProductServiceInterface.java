package com.syscoshop.product_service.service;

import com.syscoshop.product_service.dto.ProductRequest;
import com.syscoshop.product_service.dto.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductServiceInterface {
    void saveProduct(ProductRequest dto);
    Page<ProductResponse> getAllProducts(Pageable pageable);
    ProductResponse getProductById(String id);
}
