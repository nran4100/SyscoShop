package com.syscoshop.product_service.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Product {
    @Id
    private Long id;
    private String name;
    private double price;
    private int stockCount;
    private Long supplierID;
    private Long categoryId;
}
