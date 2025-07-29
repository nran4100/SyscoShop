package com.syscoshop.product_service.util;

import com.syscoshop.product_service.dto.ProductRequest;
import com.syscoshop.product_service.dto.ProductResponse;
import com.syscoshop.product_service.model.Product;
import com.syscoshop.product_service.model.ProductStatus;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class ProductMapper {

    public static ProductResponse mapToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .stockCount(product.getStockCount())
                .price(product.getPrice())
                .supplierID(product.getSupplierID())
                .categoryId(product.getCategoryId())
                .imageUrl(product.getImageUrl())
                .status(product.getStatus())  // Map enum to enum
                .unit(product.getUnit())
                .extraFields(Optional.ofNullable(product.getExtraFields()).orElseGet(HashMap::new))
                .build();
    }

    public static Product mapToProduct(ProductRequest dto) {
        return Product.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .stockCount(dto.getStockCount())
                .supplierID(dto.getSupplierID())
                .categoryId(dto.getCategoryId())
                .imageUrl(dto.getImageUrl())
                .status(dto.getStatus())  // Map enum to enum
                .unit(dto.getUnit())
                .extraFields(Optional.ofNullable(dto.getExtraFields()).orElseGet(HashMap::new))
                .build();
    }

    public static void updateProductFromRequest(Product product, ProductRequest request) {
        if (request.getName() != null) {
            product.setName(request.getName());
        }
        if (request.getPrice() != null) {
            product.setPrice(request.getPrice());
        }
        if (request.getStockCount() != null) {
            product.setStockCount(request.getStockCount());
        }
        if (request.getSupplierID() != null) {
            product.setSupplierID(request.getSupplierID());
        }
        if (request.getCategoryId() != null) {
            product.setCategoryId(request.getCategoryId());
        }
        if (request.getImageUrl() != null) {
            product.setImageUrl(request.getImageUrl());
        }
        if (request.getStatus() != null) {
            product.setStatus(request.getStatus());
        }
        if (request.getUnit() != null) {
            product.setUnit(request.getUnit());
        }

        Map<String, Object> currentExtraFields = Optional.ofNullable(product.getExtraFields())
                .orElseGet(HashMap::new);

        if (request.getExtraFields() != null) {
            currentExtraFields.putAll(request.getExtraFields());
        }
        product.setExtraFields(currentExtraFields);
    }

}
