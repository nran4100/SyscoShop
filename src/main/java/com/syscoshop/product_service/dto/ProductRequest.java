package com.syscoshop.product_service.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be non-negative")
    private Double price;

    @NotNull(message = "Stock count is required")
    @Min(value = 0, message = "Stock count must be non-negative")
    private Integer stockCount;

    @NotNull(message = "Supplier ID is required")
    private Long supplierID;

    @NotNull(message = "Category ID is required")
    private Long categoryId;
}
