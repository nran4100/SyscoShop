package com.syscoshop.product_service.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private String id;
    private String name;
    private double price;
    private int stockCount;
    private Long supplierID;
    private Long categoryId;
}
