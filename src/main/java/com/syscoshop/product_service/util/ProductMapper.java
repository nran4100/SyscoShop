package com.syscoshop.product_service.util;

import com.syscoshop.product_service.dto.ProductRequest;
import com.syscoshop.product_service.dto.ProductResponse;
import com.syscoshop.product_service.model.Product;

public class ProductMapper {

    public static ProductResponse mapToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .stockCount(product.getStockCount())
                .price(product.getPrice())
                .supplierID(product.getSupplierID())
                .categoryId(product.getCategoryId())
                .build();
    }


    public static Product mapToProduct(ProductRequest dto) {
        return Product.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .stockCount(dto.getStockCount())
                .supplierID(dto.getSupplierID())
                .categoryId(dto.getCategoryId())
                .build();
    }

    public static void updateProductFromRequest(Product product, ProductRequest request) {
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setStockCount(request.getStockCount());
        product.setSupplierID(request.getSupplierID());
        product.setCategoryId(request.getCategoryId());
    }


}
